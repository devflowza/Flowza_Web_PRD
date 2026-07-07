import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";
import * as jose from "npm:jose@5";
import { TOTP, Secret } from "npm:otpauth@9";
import * as qrcode from "npm:qrcode@1";

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

async function getAdminFromRequest(req: Request) {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader) return null;
  const token = authHeader.replace("Bearer ", "");
  const secret = new TextEncoder().encode(JWT_SECRET);
  try {
    const { payload } = await jose.jwtVerify(token, secret);
    if (payload.temp) {
      // Only allow 'generate', 'verify', 'complete' actions with temp tokens (for initial 2FA setup)
      // Other actions like 'reset-totp', 'get-backup-codes', 'regenerate-backup-codes' require full auth
      return { ...payload, _isTemp: true };
    }
    return payload;
  } catch {
    return null;
  }
}

function generateBackupCodes(count = 8): string[] {
  return Array.from({ length: count }, () => {
    const bytes = new Uint8Array(5);
    crypto.getRandomValues(bytes);
    return Array.from(bytes, (b) => b.toString(36).padStart(2, "0")).join("").slice(0, 8).toUpperCase();
  });
}

async function buildTotpQr(secretBase32: string, email: string) {
  const totp = new TOTP({
    issuer: "FlowZa Admin",
    label: email,
    algorithm: "SHA1",
    digits: 6,
    period: 30,
    secret: Secret.fromBase32(secretBase32),
  });
  const otpAuthUrl = totp.toString();
  const qrCodeUrl = await qrcode.toDataURL(otpAuthUrl);
  return { qrCodeUrl, otpAuthUrl };
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
    const payload = await getAdminFromRequest(req);
    if (!payload?.sub) return err("Unauthorized", 401);

    const body = await req.json();
    const { action } = body;
    const supabase = getSupabase();

    if (action === "generate") {
      const { data: admin } = await supabase
        .from("admin_users")
        .select("totp_secret, totp_setup_complete, email, backup_codes")
        .eq("id", payload.sub)
        .maybeSingle();

      if (!admin) return err("User not found", 404);

      if (admin.totp_secret && admin.totp_setup_complete) {
        const { qrCodeUrl } = await buildTotpQr(admin.totp_secret, admin.email);
        return ok({
          qrCodeUrl,
          secret: admin.totp_secret,
          backupCodes: admin.backup_codes || [],
          existing: true,
        });
      }

      const newSecret = new Secret();
      const backupCodes = generateBackupCodes(8);

      await supabase.from("admin_users").update({
        totp_secret: newSecret.base32,
        backup_codes: backupCodes,
      }).eq("id", payload.sub);

      const { qrCodeUrl } = await buildTotpQr(newSecret.base32, admin.email);

      return ok({
        qrCodeUrl,
        secret: newSecret.base32,
        backupCodes,
        existing: false,
      });
    }

    if (action === "reset-totp") {
      if ((payload as Record<string, unknown>)._isTemp) return err("Full authentication required for this action", 401);
      const { data: admin } = await supabase
        .from("admin_users")
        .select("email")
        .eq("id", payload.sub)
        .maybeSingle();

      if (!admin) return err("User not found", 404);

      const newSecret = new Secret();
      const backupCodes = generateBackupCodes(8);

      await supabase.from("admin_users").update({
        totp_secret: newSecret.base32,
        backup_codes: backupCodes,
        totp_enabled: false,
        totp_setup_complete: false,
      }).eq("id", payload.sub);

      const { qrCodeUrl } = await buildTotpQr(newSecret.base32, admin.email);

      return ok({
        qrCodeUrl,
        secret: newSecret.base32,
        backupCodes,
        existing: false,
      });
    }

    if (action === "verify") {
      const { code } = body;
      const { data: admin } = await supabase
        .from("admin_users")
        .select("totp_secret")
        .eq("id", payload.sub)
        .maybeSingle();

      if (!admin?.totp_secret) return err("No TOTP secret found");

      const totp = new TOTP({ secret: admin.totp_secret, algorithm: "SHA1", digits: 6, period: 30 });
      const valid = totp.validate({ token: code, window: 2 }) !== null;
      if (!valid) return err("Invalid code", 401);

      return ok({ success: true });
    }

    if (action === "complete") {
      await supabase.from("admin_users").update({
        totp_enabled: true,
        totp_setup_complete: true,
      }).eq("id", payload.sub);
      return ok({ success: true });
    }

    if (action === "get-backup-codes") {
      if ((payload as Record<string, unknown>)._isTemp) return err("Full authentication required for this action", 401);
      const { data: admin } = await supabase
        .from("admin_users")
        .select("backup_codes")
        .eq("id", payload.sub)
        .maybeSingle();
      return ok({ codes: admin?.backup_codes || [] });
    }

    if (action === "regenerate-backup-codes") {
      if ((payload as Record<string, unknown>)._isTemp) return err("Full authentication required for this action", 401);
      const codes = generateBackupCodes(8);
      await supabase.from("admin_users").update({ backup_codes: codes }).eq("id", payload.sub);
      return ok({ codes });
    }

    return err("Unknown action");
  } catch (e: unknown) {
    return err(e instanceof Error ? e.message : "Internal error", 500);
  }
});
