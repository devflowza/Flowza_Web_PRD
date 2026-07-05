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

function statusLabel(status: string): string {
  const map: Record<string, string> = {
    new: "New",
    read: "Read",
    replied: "Replied",
    archived: "Archived",
  };
  return map[status] || status;
}

function statusBadgeColor(status: string): string {
  const map: Record<string, string> = {
    new: "#1d4ed8",
    read: "#6b7280",
    replied: "#059669",
    archived: "#9ca3af",
  };
  return map[status] || "#6b7280";
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

    const { submissionId } = await req.json();
    if (!submissionId) return err("submissionId is required");

    const supabase = getSupabase();

    const { data: submission } = await supabase
      .from("contact_submissions")
      .select("*")
      .eq("id", submissionId)
      .maybeSingle();
    if (!submission) return err("Submission not found", 404);

    const { data: smtpCfg } = await supabase.from("smtp_config").select("*").maybeSingle();
    if (!smtpCfg || !smtpCfg.host) return err("SMTP not configured. Please configure SMTP in Settings first.");

    const statusFlag = submission.status === "new" || submission.status === "read"
      ? "notify_on_new"
      : submission.status === "replied"
      ? "notify_on_replied"
      : null;

    let recipientsQuery = supabase
      .from("notification_recipients")
      .select("*")
      .eq("is_active", true);

    if (statusFlag) {
      recipientsQuery = recipientsQuery.eq(statusFlag, true);
    }

    const { data: recipients } = await recipientsQuery;
    if (!recipients || recipients.length === 0) {
      return err("No active forwarding recipients configured for this message status. Please add recipients in Settings.");
    }

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

    const submittedAt = new Date(submission.submitted_at).toLocaleString("en-US", {
      year: "numeric", month: "long", day: "numeric",
      hour: "2-digit", minute: "2-digit",
    });

    const badgeColor = statusBadgeColor(submission.status);
    const statusText = statusLabel(submission.status);

    const html = `
      <div style="font-family: Inter, system-ui, sans-serif; max-width: 640px; margin: 0 auto; color: #1a1a1a;">
        <div style="background: linear-gradient(135deg, #0ea5e9, #0369a1); padding: 28px 32px; border-radius: 12px 12px 0 0;">
          <h2 style="color: white; margin: 0 0 4px; font-size: 20px; font-weight: 600;">Flowza.ai</h2>
          <p style="color: rgba(255,255,255,0.8); margin: 0; font-size: 13px;">Contact Form Message — Forwarded from Admin Portal</p>
        </div>
        <div style="background: #ffffff; padding: 32px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px; padding-bottom: 20px; border-bottom: 1px solid #f3f4f6;">
            <div>
              <p style="margin: 0 0 2px; font-size: 13px; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.05em;">Status</p>
              <span style="display: inline-block; padding: 3px 10px; border-radius: 9999px; font-size: 12px; font-weight: 600; background: ${badgeColor}1a; color: ${badgeColor};">${statusText}</span>
            </div>
            <div style="text-align: right;">
              <p style="margin: 0 0 2px; font-size: 13px; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.05em;">Received</p>
              <p style="margin: 0; font-size: 13px; color: #374151;">${submittedAt}</p>
            </div>
          </div>

          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6; width: 100px;">
                <span style="font-size: 12px; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.05em;">From</span>
              </td>
              <td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6;">
                <span style="font-size: 14px; color: #111827; font-weight: 500;">${escapeHtml(submission.name)}</span>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6;">
                <span style="font-size: 12px; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.05em;">Email</span>
              </td>
              <td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6;">
                <a href="mailto:${escapeHtml(submission.email)}" style="font-size: 14px; color: #0ea5e9; text-decoration: none;">${escapeHtml(submission.email)}</a>
              </td>
            </tr>
            ${submission.phone ? `
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6;">
                <span style="font-size: 12px; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.05em;">Phone</span>
              </td>
              <td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6;">
                <span style="font-size: 14px; color: #374151;">${escapeHtml(submission.phone)}</span>
              </td>
            </tr>` : ""}
            <tr>
              <td style="padding: 8px 0;">
                <span style="font-size: 12px; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.05em;">Subject</span>
              </td>
              <td style="padding: 8px 0;">
                <span style="font-size: 14px; color: #111827; font-weight: 500;">${escapeHtml(submission.subject)}</span>
              </td>
            </tr>
          </table>

          <div style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
            <p style="margin: 0 0 10px; font-size: 12px; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.05em;">Message</p>
            <p style="margin: 0; font-size: 14px; color: #374151; line-height: 1.7; white-space: pre-wrap;">${escapeHtml(submission.message)}</p>
          </div>

          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 0 0 16px;" />
          <p style="margin: 0; font-size: 12px; color: #9ca3af;">This message was forwarded from the Flowza.ai admin portal. To manage forwarding settings, log in to the portal.</p>
        </div>
      </div>
    `;

    const subject = `[Forwarded] ${submission.subject} \u2014 from ${submission.name}`;
    const errors: string[] = [];

    for (const recipient of recipients) {
      try {
        await transport.sendMail({
          from: `"${smtpCfg.sender_name}" <${smtpCfg.sender_email}>`,
          to: recipient.email,
          subject,
          html,
        });
      } catch (sendErr: unknown) {
        errors.push(`${recipient.email}: ${sendErr instanceof Error ? sendErr.message : "Unknown error"}`);
      }
    }

    if (errors.length === recipients.length) {
      return err(`Failed to send to all recipients: ${errors.join("; ")}`);
    }

    return ok({
      success: true,
      sent: recipients.length - errors.length,
      total: recipients.length,
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (e: unknown) {
    return err(e instanceof Error ? e.message : "Internal error", 500);
  }
});
