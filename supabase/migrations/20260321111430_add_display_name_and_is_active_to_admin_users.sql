/*
  # Add display_name and is_active to admin_users

  ## Changes
  - Adds `display_name` (text, nullable) to admin_users for friendly name display
  - Adds `is_active` (boolean, default true) to allow disabling accounts without deletion

  ## Notes
  - Existing rows get is_active = true by default (no disruption)
  - display_name is optional and defaults to NULL
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'admin_users' AND column_name = 'display_name'
  ) THEN
    ALTER TABLE admin_users ADD COLUMN display_name text;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'admin_users' AND column_name = 'is_active'
  ) THEN
    ALTER TABLE admin_users ADD COLUMN is_active boolean NOT NULL DEFAULT true;
  END IF;
END $$;
