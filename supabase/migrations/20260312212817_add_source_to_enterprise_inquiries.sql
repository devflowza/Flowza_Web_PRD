/*
  # Add Source Column to Enterprise Inquiries

  1. Changes
    - Add `source` column to `enterprise_inquiries` table to track where inquiries originate from
    - Column values will be: 'enterprise_plus', 'hero', 'navbar', 'general'
    - Defaults to 'general' for backwards compatibility

  2. Purpose
    - Enables tracking of inquiry sources for analytics
    - Helps sales team understand customer journey
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'enterprise_inquiries' AND column_name = 'source'
  ) THEN
    ALTER TABLE enterprise_inquiries ADD COLUMN source text DEFAULT 'general';
  END IF;
END $$;