/*
  # Migrate enterprise_inquiries to contact_submissions

  ## Summary
  Copies all existing records from `enterprise_inquiries` into `contact_submissions`
  so that previously submitted contact form entries are visible in the ADM portal.

  ## Changes
  - Inserts all rows from `enterprise_inquiries` into `contact_submissions`
  - Maps fields:
    - contact_name → name
    - email → email
    - phone → phone
    - message → message (already contains "Service: ..." prefix from Contact.tsx)
    - message prefix used as subject fallback
    - status defaults to 'new'
    - submitted_at uses original created_at timestamp

  ## Notes
  - No data is deleted or modified in enterprise_inquiries (kept as audit trail)
  - Duplicate prevention: skips rows already present by matching email + submitted_at
*/

INSERT INTO contact_submissions (name, email, phone, subject, message, status, submitted_at, created_at, updated_at)
SELECT
  COALESCE(NULLIF(TRIM(contact_name), ''), 'Unknown') AS name,
  email,
  phone,
  CASE
    WHEN message LIKE 'Service: %' THEN TRIM(SPLIT_PART(message, E'\n', 1))
    ELSE 'General Inquiry'
  END AS subject,
  COALESCE(message, '') AS message,
  'new'::submission_status AS status,
  created_at AS submitted_at,
  created_at,
  created_at
FROM enterprise_inquiries
WHERE email NOT IN (
  SELECT email FROM contact_submissions
)
ON CONFLICT DO NOTHING;
