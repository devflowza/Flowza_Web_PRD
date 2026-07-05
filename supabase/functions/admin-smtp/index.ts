import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";
import * as jose from "npm:jose@5";
import nodemailer from "npm:nodemailer@6";

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
    if (payload.temp) return null;
    return payload;
  } catch {
    return null;
  }
}

function createTransport(cfg: Record<string, unknown>) {
  return nodemailer.createTransport({
    host: cfg.host as string,
    port: cfg.port as number,
    secure: cfg.encryption === "ssl",
    ...(cfg.encryption === "tls" ? { requireTLS: true } : {}),
    auth: {
      user: cfg.username as string,
      pass: cfg.password as string,
    },
  });
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

    if (action === "get") {
      const { data } = await supabase.from("smtp_config").select("*").maybeSingle();
      return ok({ config: data });
    }

    if (action === "save") {
      const { config } = body;
      const { data: existing } = await supabase.from("smtp_config").select("id").maybeSingle();
      if (existing) {
        await supabase.from("smtp_config").update({ ...config, updated_at: new Date().toISOString() }).eq("id", existing.id);
      } else {
        await supabase.from("smtp_config").insert({ ...config });
      }
      return ok({ success: true });
    }

    if (action === "test") {
      const { config } = body;
      const { data: admin } = await supabase.from("admin_users").select("email").eq("id", payload.sub).maybeSingle();
      if (!admin) return err("Admin not found");

      const transport = createTransport(config);
      await transport.sendMail({
        from: `"${config.sender_name}" <${config.sender_email}>`,
        to: admin.email,
        subject: "Flowza Admin — SMTP Test",
        html: `<p>Your SMTP configuration is working correctly.</p><p>Sent at ${new Date().toLocaleString()}</p>`,
      });

      return ok({ success: true });
    }

    return err("Unknown action");
  } catch (e: unknown) {
    return err(e instanceof Error ? e.message : "Internal error", 500);
  }
});
