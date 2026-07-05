/*
  # Seed Initial Pricing Data

  This migration populates the pricing tables with the initial plan data.

  1. Pricing Config
    - Sets yearly discount to 25%

  2. Pricing Plans (3 plans)
    - Starter: $15/mo - For small businesses
    - Professional: $40/mo - Highlighted as current plan
    - Enterprise: $60/mo - For advanced requirements

  3. Plan Features
    - Each plan has 13-14 features matching the screenshot design
    - Features include team members, contacts, invoices, quotes, bills, etc.

  Note: All features are enabled by default
*/

INSERT INTO pricing_config (yearly_discount_percent)
VALUES (25)
ON CONFLICT DO NOTHING;

INSERT INTO pricing_plans (id, name, monthly_price, description, icon_type, display_order, is_highlighted, button_text, button_style)
VALUES
  ('11111111-1111-1111-1111-111111111111', 'Starter', 15, 'For small businesses ready to streamline their finances', 'sparkle', 1, false, 'Downgrade', 'outline'),
  ('22222222-2222-2222-2222-222222222222', 'Professional', 40, 'For growing businesses that need the full toolkit', 'crown', 2, true, 'Current Plan', 'disabled'),
  ('33333333-3333-3333-3333-333333333333', 'Enterprise', 60, 'For established businesses with advanced requirements', 'crown', 3, false, 'Upgrade', 'filled')
ON CONFLICT (id) DO NOTHING;

INSERT INTO plan_features (plan_id, feature_text, display_order)
VALUES
  ('11111111-1111-1111-1111-111111111111', '2 team members', 1),
  ('11111111-1111-1111-1111-111111111111', '1,000 contacts', 2),
  ('11111111-1111-1111-1111-111111111111', '50 invoices/month', 3),
  ('11111111-1111-1111-1111-111111111111', '50 quotes/month', 4),
  ('11111111-1111-1111-1111-111111111111', '50 bills/month', 5),
  ('11111111-1111-1111-1111-111111111111', '1,000 catalog items', 6),
  ('11111111-1111-1111-1111-111111111111', 'Purchase management', 7),
  ('11111111-1111-1111-1111-111111111111', 'Banking & reconciliation', 8),
  ('11111111-1111-1111-1111-111111111111', 'Budget tracking', 9),
  ('11111111-1111-1111-1111-111111111111', 'Financial reports', 10),
  ('11111111-1111-1111-1111-111111111111', 'Multi-currency support', 11),
  ('11111111-1111-1111-1111-111111111111', 'Inventory tracking', 12),
  ('11111111-1111-1111-1111-111111111111', 'Recurring invoices', 13),

  ('22222222-2222-2222-2222-222222222222', '5 team members', 1),
  ('22222222-2222-2222-2222-222222222222', '3,000 contacts', 2),
  ('22222222-2222-2222-2222-222222222222', '125 invoices/month', 3),
  ('22222222-2222-2222-2222-222222222222', '125 quotes/month', 4),
  ('22222222-2222-2222-2222-222222222222', '125 bills/month', 5),
  ('22222222-2222-2222-2222-222222222222', '3,000 catalog items', 6),
  ('22222222-2222-2222-2222-222222222222', '3 companies', 7),
  ('22222222-2222-2222-2222-222222222222', 'Purchase management', 8),
  ('22222222-2222-2222-2222-222222222222', 'Banking & reconciliation', 9),
  ('22222222-2222-2222-2222-222222222222', 'Budget tracking', 10),
  ('22222222-2222-2222-2222-222222222222', 'Financial reports', 11),
  ('22222222-2222-2222-2222-222222222222', 'Multi-currency support', 12),
  ('22222222-2222-2222-2222-222222222222', 'Inventory tracking', 13),
  ('22222222-2222-2222-2222-222222222222', 'Recurring invoices', 14),

  ('33333333-3333-3333-3333-333333333333', '10 team members', 1),
  ('33333333-3333-3333-3333-333333333333', '6,000 contacts', 2),
  ('33333333-3333-3333-3333-333333333333', '335 invoices/month', 3),
  ('33333333-3333-3333-3333-333333333333', '335 quotes/month', 4),
  ('33333333-3333-3333-3333-333333333333', '335 bills/month', 5),
  ('33333333-3333-3333-3333-333333333333', '6,000 catalog items', 6),
  ('33333333-3333-3333-3333-333333333333', '5 companies', 7),
  ('33333333-3333-3333-3333-333333333333', 'Purchase management', 8),
  ('33333333-3333-3333-3333-333333333333', 'Banking & reconciliation', 9),
  ('33333333-3333-3333-3333-333333333333', 'Budget tracking', 10),
  ('33333333-3333-3333-3333-333333333333', 'Financial reports', 11),
  ('33333333-3333-3333-3333-333333333333', 'Multi-currency support', 12),
  ('33333333-3333-3333-3333-333333333333', 'Inventory tracking', 13),
  ('33333333-3333-3333-3333-333333333333', 'Recurring invoices', 14)
ON CONFLICT DO NOTHING;