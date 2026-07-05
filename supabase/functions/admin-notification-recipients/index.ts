import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";
import * as jose from "npm:jose@5";

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

    if (action === "list") {
      const { data, error } = await supabase
        .from("notification_recipients")
        .select("*")
        .order("created_at", { ascending: true });
      if (error) return err(error.message);
      return ok({ recipients: data || [] });
    }

    if (action === "add") {
      const { email, label, notify_on_new, notify_on_replied } = body;
      if (!email) return err("Email is required");

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) return err("Invalid email address");

      const { data: existing } = await supabase
        .from("notification_recipients")
        .select("id")
        .eq("email", email.toLowerCase().trim())
        .maybeSingle();
      if (existing) return err("This email address is already configured");

      const { data, error } = await supabase
        .from("notification_recipients")
        .insert({
          email: email.toLowerCase().trim(),
          label: label?.trim() || "",
          notify_on_new: notify_on_new !== false,
          notify_on_replied: notify_on_replied !== false,
          is_active: true,
        })
        .select()
        .maybeSingle();
      if (error) return err(error.message);
      return ok({ recipient: data });
    }

    if (action === "update") {
      const { id, label, notify_on_new, notify_on_replied, is_active } = body;
      if (!id) return err("ID is required");

      const updates: Record<string, unknown> = {};
      if (label !== undefined) updates.label = label?.trim() || "";
      if (notify_on_new !== undefined) updates.notify_on_new = notify_on_new;
      if (notify_on_replied !== undefined) updates.notify_on_replied = notify_on_replied;
      if (is_active !== undefined) updates.is_active = is_active;

      const { data, error } = await supabase
        .from("notification_recipients")
        .update(updates)
        .eq("id", id)
        .select()
        .maybeSingle();
      if (error) return err(error.message);
      return ok({ recipient: data });
    }

    if (action === "delete") {
      const { id } = body;
      if (!id) return err("ID is required");

      const { error } = await supabase
        .from("notification_recipients")
        .delete()
        .eq("id", id);
      if (error) return err(error.message);
      return ok({ success: true });
    }

    return err("Unknown action");
  } catch (e: unknown) {
    return err(e instanceof Error ? e.message : "Internal error", 500);
  }
});
