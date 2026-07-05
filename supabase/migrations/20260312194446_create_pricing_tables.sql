/*
  # Create Pricing Tables for Flowza.ai

  This migration creates the database schema for the dynamic pricing system.

  1. New Tables
    - `pricing_plans` - Stores the main pricing tiers (Starter, Professional, Enterprise)
      - `id` (uuid, primary key)
      - `name` (text) - Plan name
      - `monthly_price` (integer) - Price in dollars
      - `description` (text) - Plan tagline
      - `icon_type` (text) - 'sparkle' or 'crown'
      - `display_order` (integer) - For sorting plans
      - `is_highlighted` (boolean) - Whether to show "Current Plan" badge
      - `button_text` (text) - CTA button text
      - `button_style` (text) - 'outline', 'disabled', or 'filled'
      - `created_at` (timestamptz)

    - `plan_features` - Stores features for each pricing plan
      - `id` (uuid, primary key)
      - `plan_id` (uuid, foreign key)
      - `feature_text` (text) - Feature description
      - `display_order` (integer) - For ordering features
      - `is_enabled` (boolean) - Whether feature is included
      - `created_at` (timestamptz)

    - `pricing_config` - Global pricing configuration
      - `id` (uuid, primary key)
      - `yearly_discount_percent` (integer) - Discount for yearly billing
      - `updated_at` (timestamptz)

    - `enterprise_inquiries` - Contact form submissions for Enterprise Plus
      - `id` (uuid, primary key)
      - `company_name` (text)
      - `contact_name` (text)
      - `email` (text)
      - `phone` (text, optional)
      - `message` (text, optional)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Public read access for pricing_plans, plan_features, pricing_config
    - Public insert access for enterprise_inquiries
*/

-- Create pricing_plans table
CREATE TABLE IF NOT EXISTS pricing_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  monthly_price integer NOT NULL,
  description text NOT NULL,
  icon_type text NOT NULL DEFAULT 'sparkle',
  display_order integer NOT NULL DEFAULT 0,
  is_highlighted boolean NOT NULL DEFAULT false,
  button_text text NOT NULL DEFAULT 'Select Plan',
  button_style text NOT NULL DEFAULT 'outline',
  created_at timestamptz DEFAULT now()
);

-- Create plan_features table
CREATE TABLE IF NOT EXISTS plan_features (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  plan_id uuid NOT NULL REFERENCES pricing_plans(id) ON DELETE CASCADE,
  feature_text text NOT NULL,
  display_order integer NOT NULL DEFAULT 0,
  is_enabled boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Create pricing_config table
CREATE TABLE IF NOT EXISTS pricing_config (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  yearly_discount_percent integer NOT NULL DEFAULT 25,
  updated_at timestamptz DEFAULT now()
);

-- Create enterprise_inquiries table
CREATE TABLE IF NOT EXISTS enterprise_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name text NOT NULL,
  contact_name text NOT NULL,
  email text NOT NULL,
  phone text,
  message text,
  created_at timestamptz DEFAULT now()
);

-- Create index for faster feature lookups
CREATE INDEX IF NOT EXISTS idx_plan_features_plan_id ON plan_features(plan_id);
CREATE INDEX IF NOT EXISTS idx_plan_features_display_order ON plan_features(display_order);
CREATE INDEX IF NOT EXISTS idx_pricing_plans_display_order ON pricing_plans(display_order);

-- Enable Row Level Security
ALTER TABLE pricing_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE plan_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE pricing_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE enterprise_inquiries ENABLE ROW LEVEL SECURITY;

-- RLS Policies for pricing_plans (public read)
CREATE POLICY "Anyone can read pricing plans"
  ON pricing_plans
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- RLS Policies for plan_features (public read)
CREATE POLICY "Anyone can read plan features"
  ON plan_features
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- RLS Policies for pricing_config (public read)
CREATE POLICY "Anyone can read pricing config"
  ON pricing_config
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- RLS Policies for enterprise_inquiries (public insert only)
CREATE POLICY "Anyone can submit enterprise inquiry"
  ON enterprise_inquiries
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);