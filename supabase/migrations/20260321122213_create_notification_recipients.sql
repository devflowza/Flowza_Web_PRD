/*
  # Create Notification Recipients Table

  ## Summary
  Adds a table to store email addresses that receive forwarding notifications
  when new contact submissions arrive or when an admin sends a reply.

  ## New Tables
  - `notification_recipients`
    - `id` (uuid, primary key)
    - `email` (text, unique) - the recipient email address
    - `label` (text) - friendly display name (e.g. "Sales Team")
    - `notify_on_new` (boolean, default true) - receive alerts for new/unread submissions
    - `notify_on_replied` (boolean, default true) - receive alerts when a reply is sent
    - `is_active` (boolean, default true) - toggle recipient on/off without deleting
    - `created_at` (timestamptz)

  ## Security
  - RLS enabled; only service_role can read/write (accessed via edge functions)

  ## Seed
  - Pre-populates sales@flowza.ai as the default active recipient for both event types
*/

CREATE TABLE IF NOT EXISTS notification_recipients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  label text NOT NULL DEFAULT '',
  notify_on_new boolean NOT NULL DEFAULT true,
  notify_on_replied boolean NOT NULL DEFAULT true,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE notification_recipients ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role can select notification_recipients"
  ON notification_recipients
  FOR SELECT
  TO service_role
  USING (true);

CREATE POLICY "Service role can insert notification_recipients"
  ON notification_recipients
  FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY "Service role can update notification_recipients"
  ON notification_recipients
  FOR UPDATE
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role can delete notification_recipients"
  ON notification_recipients
  FOR DELETE
  TO service_role
  USING (true);

INSERT INTO notification_recipients (email, label, notify_on_new, notify_on_replied, is_active)
VALUES ('sales@flowza.ai', 'Sales Team', true, true, true)
ON CONFLICT (email) DO NOTHING;
