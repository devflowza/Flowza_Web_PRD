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

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
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

    const { submissionId, to, toName, subject, body } = await req.json();
    if (!to || !subject || !body) return err("Missing required fields");

    const supabase = getSupabase();

    const { data: smtpCfg } = await supabase.from("smtp_config").select("*").maybeSingle();
    if (!smtpCfg || !smtpCfg.host) return err("SMTP not configured. Please configure SMTP in Settings first.");

    const transport = nodemailer.createTransport({
      host: smtpCfg.host,
      port: smtpCfg.port,
      secure: smtpCfg.encryption === "ssl",
      ...(smtpCfg.encryption === "tls" ? { requireTLS: true } : {}),
      auth: {
        user: smtpCfg.username,
        pass: smtpCfg.password,
      },
    });

    const html = `
      <div style="font-family: Inter, system-ui, sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a1a;">
        <div style="background: linear-gradient(135deg, #0ea5e9, #0369a1); padding: 28px 32px; border-radius: 12px 12px 0 0;">
          <h2 style="color: white; margin: 0; font-size: 20px; font-weight: 600;">FlowZa.ai</h2>
        </div>
        <div style="background: #ffffff; padding: 32px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
          <p style="margin: 0 0 16px; color: #374151;">Hi ${escapeHtml(toName)},</p>
          <div style="color: #374151; line-height: 1.6;">${body}</div>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 28px 0;" />
          <p style="margin: 0; font-size: 13px; color: #9ca3af;">This email was sent by the FlowZa.ai support team.</p>
        </div>
      </div>
    `;

    await transport.sendMail({
      from: `"${smtpCfg.sender_name}" <${smtpCfg.sender_email}>`,
      to: `"${toName}" <${to}>`,
      subject,
      html,
    });

    return ok({ success: true });
  } catch (e: unknown) {
    return err(e instanceof Error ? e.message : "Internal error", 500);
  }
});
