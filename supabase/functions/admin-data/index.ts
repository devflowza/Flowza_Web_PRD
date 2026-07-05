import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";
import * as jose from "npm:jose@5";
import bcrypt from "npm:bcryptjs@2";

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

    if (action === "get-stats") {
      const [
        { count: total },
        { count: newCount },
        { count: replied },
        { count: archived },
        { count: read },
      ] = await Promise.all([
        supabase.from("contact_submissions").select("*", { count: "exact", head: true }),
        supabase.from("contact_submissions").select("*", { count: "exact", head: true }).eq("status", "new"),
        supabase.from("contact_submissions").select("*", { count: "exact", head: true }).eq("status", "replied"),
        supabase.from("contact_submissions").select("*", { count: "exact", head: true }).eq("status", "archived"),
        supabase.from("contact_submissions").select("*", { count: "exact", head: true }).eq("status", "read"),
      ]);
      return ok({ total: total || 0, new: newCount || 0, replied: replied || 0, archived: archived || 0, read: read || 0 });
    }

    if (action === "get-recent") {
      const { data } = await supabase
        .from("contact_submissions")
        .select("*")
        .order("submitted_at", { ascending: false })
        .limit(5);
      return ok({ submissions: data || [] });
    }

    if (action === "get-unread-count") {
      const { count } = await supabase
        .from("contact_submissions")
        .select("*", { count: "exact", head: true })
        .eq("status", "new");
      return ok({ count: count || 0 });
    }

    if (action === "list-submissions") {
      const { status, search } = body;
      const page = Math.max(1, Math.floor(Number(body.page) || 1));
      const perPage = Math.min(100, Math.max(1, Math.floor(Number(body.perPage) || 10)));

      let query = supabase
        .from("contact_submissions")
        .select("*", { count: "exact" })
        .order("submitted_at", { ascending: false });

      if (status && status !== "all") query = query.eq("status", status);
      if (search) {
        const sanitized = search.replace(/[%_\\,()]/g, "");
        if (sanitized.length > 0) {
          query = query.or(`name.ilike.%${sanitized}%,email.ilike.%${sanitized}%,subject.ilike.%${sanitized}%`);
        }
      }

      const from = (page - 1) * perPage;
      query = query.range(from, from + perPage - 1);

      const { data, count } = await query;
      return ok({ submissions: data || [], total: count || 0 });
    }

    if (action === "get-submission") {
      const { id } = body;
      const { data } = await supabase
        .from("contact_submissions")
        .select("*")
        .eq("id", id)
        .maybeSingle();
      return ok({ submission: data });
    }

    if (action === "get-replies") {
      const { submissionId } = body;
      const { data } = await supabase
        .from("contact_replies")
        .select("*")
        .eq("submission_id", submissionId)
        .order("sent_at", { ascending: true });
      return ok({ replies: data || [] });
    }

    if (action === "update-submission") {
      const { id, updates } = body;
      const { data } = await supabase
        .from("contact_submissions")
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq("id", id)
        .select()
        .maybeSingle();
      return ok({ submission: data });
    }

    if (action === "save-reply") {
      const { submissionId, subject, replyBody, adminId } = body;
      const now = new Date().toISOString();
      const { data: reply } = await supabase
        .from("contact_replies")
        .insert({ submission_id: submissionId, subject, body: replyBody, admin_id: adminId })
        .select()
        .maybeSingle();

      await supabase
        .from("contact_submissions")
        .update({ status: "replied", replied_at: now, updated_at: now })
        .eq("id", submissionId);

      return ok({ reply });
    }

    // ── User Management (super_admin only for mutating actions) ─────────────

    if (action === "list-admin-users") {
      const { data } = await supabase
        .from("admin_users")
        .select("id, email, role, display_name, is_active, totp_enabled, totp_setup_complete, last_login_at, created_at")
        .order("created_at", { ascending: true });
      return ok({ users: data || [] });
    }

    if (action === "create-admin-user") {
      if (payload.role !== "super_admin") return err("Only super admins can create users", 403);
      const { email, password, role = "admin", display_name } = body;
      if (!email || !password) return err("Email and password are required");
      if (password.length < 8) return err("Password must be at least 8 characters");

      const { data: existing } = await supabase
        .from("admin_users")
        .select("id")
        .eq("email", email)
        .maybeSingle();
      if (existing) return err("An admin with this email already exists");

      const hash = await bcrypt.hash(password, 12);
      const { data, error } = await supabase
        .from("admin_users")
        .insert({ email, password_hash: hash, role, display_name: display_name || null })
        .select("id, email, role, display_name, is_active, totp_enabled, totp_setup_complete, last_login_at, created_at")
        .maybeSingle();
      if (error) return err(error.message);
      return ok({ user: data });
    }

    if (action === "update-admin-user") {
      if (payload.role !== "super_admin") return err("Only super admins can update users", 403);
      const { id, email, role, display_name, is_active } = body;
      if (!id) return err("User ID is required");

      const updates: Record<string, unknown> = {};
      if (email !== undefined) updates.email = email;
      if (role !== undefined) updates.role = role;
      if (display_name !== undefined) updates.display_name = display_name || null;
      if (is_active !== undefined) updates.is_active = is_active;

      const { data, error } = await supabase
        .from("admin_users")
        .update(updates)
        .eq("id", id)
        .select("id, email, role, display_name, is_active, totp_enabled, totp_setup_complete, last_login_at, created_at")
        .maybeSingle();
      if (error) return err(error.message);
      return ok({ user: data });
    }

    if (action === "reset-admin-password") {
      if (payload.role !== "super_admin") return err("Only super admins can reset passwords", 403);
      const { id, newPassword } = body;
      if (!id || !newPassword) return err("User ID and new password are required");
      if (newPassword.length < 8) return err("Password must be at least 8 characters");

      const hash = await bcrypt.hash(newPassword, 12);
      const { error } = await supabase
        .from("admin_users")
        .update({ password_hash: hash })
        .eq("id", id);
      if (error) return err(error.message);
      return ok({ success: true });
    }

    if (action === "reset-admin-2fa") {
      if (payload.role !== "super_admin") return err("Only super admins can reset 2FA", 403);
      const { id } = body;
      if (!id) return err("User ID is required");

      const { error } = await supabase
        .from("admin_users")
        .update({
          totp_secret: null,
          backup_codes: null,
          totp_enabled: false,
          totp_setup_complete: false,
        })
        .eq("id", id);
      if (error) return err(error.message);
      return ok({ success: true });
    }

    if (action === "delete-admin-user") {
      if (payload.role !== "super_admin") return err("Only super admins can delete users", 403);
      const { id } = body;
      if (!id) return err("User ID is required");
      if (id === payload.sub) return err("You cannot delete your own account");

      const { error } = await supabase.from("admin_users").delete().eq("id", id);
      if (error) return err(error.message);
      return ok({ success: true });
    }

    return err("Unknown action");
  } catch (e: unknown) {
    return err(e instanceof Error ? e.message : "Internal error", 500);
  }
});
