import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";
import bcrypt from "npm:bcryptjs@2";
import * as jose from "npm:jose@5";
import { TOTP } from "npm:otpauth@9";

const ALLOWED_ORIGINS = [
  Deno.env.get("SITE_URL") || "https://flowza.ai",
  "http://localhost:5173",
  "http://localhost:3000",
].filter(Boolean);

function getCorsHeaders(req: Request) {
  const origin = req.headers.get("Origin") || "";
  const allowedOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
    "Vary": "Origin",
  };
}

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const JWT_SECRET = Deno.env.get("JWT_SECRET");
if (!JWT_SECRET) throw new Error("JWT_SECRET environment variable is required");

function getSupabase() {
  return createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
}

async function signJwt(payload: Record<string, unknown>, expiresIn = "30m") {
  const secret = new TextEncoder().encode(JWT_SECRET);
  return await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(secret);
}

async function verifyJwt(token: string) {
  const secret = new TextEncoder().encode(JWT_SECRET);
  const { payload } = await jose.jwtVerify(token, secret);
  return payload;
}

async function logAudit(supabase: ReturnType<typeof createClient>, eventType: string, adminEmail: string, details: Record<string, unknown>) {
  await supabase.from("admin_audit_log").insert({ event_type: eventType, admin_email: adminEmail, details });
}

Deno.serve(async (req: Request) => {
  const corsHeaders = getCorsHeaders(req);

  function ok(data: unknown) {
    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  function err(msg: string, status = 400) {
    return new Response(JSON.stringify({ error: msg }), {
      status,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  if (req.method === "OPTIONS") return new Response(null, { status: 200, headers: corsHeaders });

  try {
    const body = await req.json();
    const { action } = body;
    const supabase = getSupabase();

    if (action === "login") {
      const { email, password } = body;
      if (!email || !password) return err("Email and password required");

      const { data: admin } = await supabase
        .from("admin_users")
        .select("*")
        .eq("email", email)
        .maybeSingle();

      if (!admin) {
        await logAudit(supabase, "login_failed", email, { reason: "user_not_found" });
        return err("Invalid credentials", 401);
      }

      if (!admin.is_active) {
        await logAudit(supabase, "login_failed", email, { reason: "account_disabled" });
        return err("Account is disabled. Contact a super admin.", 403);
      }

      const valid = await bcrypt.compare(password, admin.password_hash);
      if (!valid) {
        await logAudit(supabase, "login_failed", email, { reason: "wrong_password" });
        return err("Invalid credentials", 401);
      }

      if (!admin.totp_setup_complete) {
        const token = await signJwt({ sub: admin.id, email: admin.email, role: admin.role, temp: true });
        return ok({
          step: "setup",
          token,
          user: {
            id: admin.id,
            email: admin.email,
            role: admin.role,
            totp_enabled: admin.totp_enabled,
            totp_setup_complete: admin.totp_setup_complete,
            last_login_at: admin.last_login_at,
          },
        });
      }

      const tempToken = await signJwt({ sub: admin.id, email: admin.email, temp: true }, "5m");
      await logAudit(supabase, "login_step1_success", email, {});
      return ok({ step: "totp", tempToken });
    }

    if (action === "verify-totp") {
      const { tempToken, code } = body;
      if (!tempToken || !code) return err("Missing token or code");

      let payload: jose.JWTPayload;
      try {
        payload = await verifyJwt(tempToken);
      } catch {
        return err("Invalid or expired session", 401);
      }

      if (!payload.temp) return err("Invalid token type", 401);

      const { data: admin } = await supabase
        .from("admin_users")
        .select("*")
        .eq("id", payload.sub)
        .maybeSingle();

      if (!admin || !admin.totp_secret) return err("User not found", 401);

      const totp = new TOTP({ secret: admin.totp_secret, algorithm: "SHA1", digits: 6, period: 30 });
      const valid = totp.validate({ token: code, window: 2 }) !== null;

      if (!valid) {
        const isBackup = (admin.backup_codes || []).includes(code);
        if (!isBackup) {
          await logAudit(supabase, "totp_failed", admin.email, { reason: "wrong_code" });
          return err("Invalid authentication code", 401);
        }
        const newCodes = (admin.backup_codes || []).filter((c: string) => c !== code);
        await supabase.from("admin_users").update({ backup_codes: newCodes }).eq("id", admin.id);
      }

      const loginTime = new Date().toISOString();
      await supabase.from("admin_users").update({ last_login_at: loginTime }).eq("id", admin.id);
      await logAudit(supabase, "login_success", admin.email, {});

      const token = await signJwt({ sub: admin.id, email: admin.email, role: admin.role }, "30m");
      return ok({
        token,
        user: {
          id: admin.id,
          email: admin.email,
          role: admin.role,
          totp_enabled: admin.totp_enabled,
          totp_setup_complete: admin.totp_setup_complete,
          last_login_at: loginTime,
        },
      });
    }

    if (action === "complete-2fa-setup") {
      const authHeader = req.headers.get("Authorization");
      if (!authHeader) return err("Unauthorized", 401);
      const rawToken = authHeader.replace("Bearer ", "");
      let payload: jose.JWTPayload;
      try {
        payload = await verifyJwt(rawToken);
      } catch {
        return err("Invalid or expired token", 401);
      }

      await supabase.from("admin_users").update({
        totp_enabled: true,
        totp_setup_complete: true,
        last_login_at: new Date().toISOString(),
      }).eq("id", payload.sub);

      const { data: admin } = await supabase
        .from("admin_users")
        .select("id, email, role, totp_enabled, totp_setup_complete, last_login_at")
        .eq("id", payload.sub)
        .maybeSingle();

      if (!admin) return err("User not found", 401);

      await logAudit(supabase, "2fa_setup_complete", admin.email, {});

      const token = await signJwt({ sub: admin.id, email: admin.email, role: admin.role }, "30m");
      return ok({
        token,
        user: {
          id: admin.id,
          email: admin.email,
          role: admin.role,
          totp_enabled: admin.totp_enabled,
          totp_setup_complete: admin.totp_setup_complete,
          last_login_at: admin.last_login_at,
        },
      });
    }

    if (action === "create-admin") {
      const authHeader = req.headers.get("Authorization");
      if (!authHeader) return err("Unauthorized", 401);
      const rawToken = authHeader.replace("Bearer ", "");
      let adminPayload: jose.JWTPayload;
      try {
        adminPayload = await verifyJwt(rawToken);
      } catch {
        return err("Invalid or expired token", 401);
      }
      if (adminPayload.temp) return err("2FA verification required", 401);
      if (adminPayload.role !== "super_admin") return err("Only super admins can create accounts", 403);

      const { email, password } = body;
      if (!email || !password) return err("Email and password required");
      const hash = await bcrypt.hash(password, 12);
      const { error } = await supabase.from("admin_users").insert({ email, password_hash: hash, role: "admin" });
      if (error) return err(error.message);
      return ok({ success: true });
    }

    return err("Unknown action");
  } catch (e: unknown) {
    return err(e instanceof Error ? e.message : "Internal error", 500);
  }
});
