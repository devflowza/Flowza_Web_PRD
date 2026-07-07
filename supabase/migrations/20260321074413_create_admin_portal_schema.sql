/*
  # Admin Portal Schema

  ## Summary
  Creates all tables needed for the FlowZa Admin Portal including:
  
  1. New Tables
    - `admin_users` - Admin accounts with TOTP secrets and backup codes
    - `contact_submissions` - Customer contact form submissions
    - `contact_replies` - Admin replies to contact submissions
    - `smtp_config` - SMTP email configuration stored in DB
    - `admin_audit_log` - Login attempts and action log

  2. Security
    - RLS enabled on all tables
    - Only service_role can access admin_users secrets
    - Authenticated admins can read/write contacts and replies
    - SMTP config protected by service_role only

  3. Enums
    - submission_status: new, read, replied, archived
*/

-- Submission status enum
DO $$ BEGIN
  CREATE TYPE submission_status AS ENUM ('new', 'read', 'replied', 'archived');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- Admin users table
CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  role text NOT NULL DEFAULT 'super_admin',
  totp_secret text,
  totp_enabled boolean NOT NULL DEFAULT false,
  totp_setup_complete boolean NOT NULL DEFAULT false,
  backup_codes text[],
  last_login_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role full access to admin_users"
  ON admin_users
  FOR SELECT
  TO service_role
  USING (true);

CREATE POLICY "Service role insert admin_users"
  ON admin_users
  FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY "Service role update admin_users"
  ON admin_users
  FOR UPDATE
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Contact submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  subject text NOT NULL,
  message text NOT NULL,
  status submission_status NOT NULL DEFAULT 'new',
  submitted_at timestamptz NOT NULL DEFAULT now(),
  replied_at timestamptz,
  admin_note text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can insert contact submissions"
  ON contact_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Service role can read contact submissions"
  ON contact_submissions
  FOR SELECT
  TO service_role
  USING (true);

CREATE POLICY "Service role can update contact submissions"
  ON contact_submissions
  FOR UPDATE
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Contact replies table
CREATE TABLE IF NOT EXISTS contact_replies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  submission_id uuid NOT NULL REFERENCES contact_submissions(id) ON DELETE CASCADE,
  subject text NOT NULL,
  body text NOT NULL,
  sent_at timestamptz NOT NULL DEFAULT now(),
  admin_id uuid REFERENCES admin_users(id),
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE contact_replies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role can read contact replies"
  ON contact_replies
  FOR SELECT
  TO service_role
  USING (true);

CREATE POLICY "Service role can insert contact replies"
  ON contact_replies
  FOR INSERT
  TO service_role
  WITH CHECK (true);

-- SMTP configuration table (single row)
CREATE TABLE IF NOT EXISTS smtp_config (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  host text NOT NULL DEFAULT '',
  port integer NOT NULL DEFAULT 587,
  encryption text NOT NULL DEFAULT 'tls',
  username text NOT NULL DEFAULT '',
  password text NOT NULL DEFAULT '',
  sender_name text NOT NULL DEFAULT '',
  sender_email text NOT NULL DEFAULT '',
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE smtp_config ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role can read smtp_config"
  ON smtp_config
  FOR SELECT
  TO service_role
  USING (true);

CREATE POLICY "Service role can insert smtp_config"
  ON smtp_config
  FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY "Service role can update smtp_config"
  ON smtp_config
  FOR UPDATE
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Admin audit log
CREATE TABLE IF NOT EXISTS admin_audit_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type text NOT NULL,
  admin_email text,
  ip_address text,
  details jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE admin_audit_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role can insert audit log"
  ON admin_audit_log
  FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY "Service role can read audit log"
  ON admin_audit_log
  FOR SELECT
  TO service_role
  USING (true);
