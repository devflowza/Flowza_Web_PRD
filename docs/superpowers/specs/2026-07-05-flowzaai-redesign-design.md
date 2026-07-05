# FlowzaAI Website Overhaul — Design Spec

**Date:** 2026-07-05
**Status:** Approved-by-request (user explicitly commissioned the overhaul; session runs autonomously)

## Goal

Rebuild the public FlowzaAI website so it adopts the design system and UX of the
reference site (`http://localhost:4173/home` — the Space Recovery site) while keeping
all existing FlowzaAI content, branding, and functionality. The result must feel
premium, enterprise-grade, and purpose-built for FlowzaAI — not a clone of the
reference.

## Sources

- **Design reference:** localhost:4173/home (captured in scratchpad screenshots + CSS token extraction)
- **Content:** existing repo (`src/landing/data.ts`, `src/data/productDetails.ts`,
  `src/components/Pricing.tsx`, `src/components/Testimonials.tsx`, `src/pages/*`)
- flowza.ai returns 403 to bots; the repo is the same site's source, so content parity holds.

## Approaches considered

1. **Restyle in place (chosen).** Keep the React 18 + Vite + Tailwind + Supabase codebase.
   Replace the public-facing UI layer (landing, nav, footer, pages) with a new design
   system. Keeps the admin portal, contact-form → Supabase plumbing, routing, and data
   files intact. Lowest risk, complete result.
2. **Greenfield rebuild.** New project, port everything. Rejected: throws away working
   admin portal + Supabase integration for zero design benefit.
3. **Parallel site directory.** New `src/site/` tree beside the old one. Rejected:
   equivalent to (1) with more dead code left behind.

## Design system (adapted from reference)

The reference is a light, trust-forward, Tailwind-based services site. Its DNA:

| Token | Reference | FlowzaAI adaptation |
|---|---|---|
| Font | IBM Plex Sans (400–700) | Same — swaps out the current 4-font mix |
| Primary action | blue-600 `#2563eb` | Same blue-600; brand gradient shifts to Flowza cyan→blue (`#22d3ee → #2563eb`) |
| Hot accent (top CTA) | red gradient (red-500→600) | Flowza cyan→blue gradient (brand, not red) |
| WhatsApp green | `#25d366` / green-500 | Same (real CTA — Flowza's WhatsApp is +968 9210 7562) |
| Headings | slate-900, 700 weight, tight tracking | Same |
| Body | gray-600 on white / gray-50 | Same |
| Section tints | blue-50 / gray-50 / white alternation | Same |
| Dark surfaces | navy `#0b1120` footer | Same |
| Radii | pills full; buttons 12px; cards 16–20px | Same |
| Shadows | soft, color-tinted per button | Same |
| Per-product colors | n/a | Preserved from `landingProducts` data |

### Signature components to reproduce

- **Top utility bar** (dark navy for Flowza instead of red): WhatsApp number, email,
  business hours, location + "All systems operational" pill.
- **White sticky navbar:** logo block (icon + name + micro-subtitle), center links,
  Platforms dropdown (7 products), gradient CTA button.
- **Hero:** light grid-pattern background; left = live-dot pill badge, huge headline,
  blue dotted sub-line, feature pills, 3 CTAs (WhatsApp green / primary blue / outline),
  trusted-by pill row; right = rounded image card with floating stat badge + caption overlay.
- **Numbered process steps:** colored circles (blue/purple/green/orange) with number
  chips and a connecting line.
- **Feature cards:** white, rounded-2xl, image top with overlapping rounded-square icon.
- **Stats band:** blue gradient, big white numbers, uppercase tracked labels.
- **Image-tile grid** ("any device" pattern) → the 7 Flowza platforms.
- **Gradient action trio** (blue/green/purple cards) → Start Trial / Pricing / Contact.
- **Certification cards** with tinted borders → SOC 2, uptime, tax engines.
- **Testimonials:** stars header + white quote cards.
- **Dark navy footer:** brand + hours card + socials | Quick Links | Platforms | Contact
  Info, trust-badge pill row, copyright bar.
- **Floating WhatsApp pill** bottom-right.

## Page plan

| Route | Treatment |
|---|---|
| `/` | Full rebuild: TopBar → Navbar → Hero → trust marquee → Platforms grid → How It Works (3 steps) → Why Flowza (4 cards + manifesto line) → Stats band → Finance spotlight → Pricing → Testimonials → Action trio → FAQ → Footer |
| `/products/:id` | Rebuild with same system: product hero (accent color), 6 feature cards, 3 steps, stats band, testimonial, related products, CTA |
| `/contact` | Restyle: hero + contact cards + form (keep Supabase submit logic verbatim) |
| `/about` | Restyle with new primitives |
| `/pricing` (new anchor/section) | Existing plan data, restyled cards + toggle |
| `/locations`, `/docs`, `/help`, `/status`, legal pages | Restyle via shared `PageLayout`/`PageHero` |
| `/adm/*` | **Untouched** |

Content rules: all copy, stats, pricing, testimonials, product features/steps come from
the existing data files. FAQ items are assembled from existing facts only (14-day trial,
25% yearly discount, SOC 2, multi-country tax, onboarding-in-hours, WhatsApp support).

## Architecture

- New `src/site/` primitives: `TopBar`, `SiteNav`, `SiteFooter`, `SectionHeading`,
  `Buttons`, `WhatsAppFloat` — single design-system source used by every public page.
- Home sections live in `src/site/home/`.
- `tailwind.config.js` + `src/index.css` define tokens (IBM Plex Sans, brand colors,
  grid-pattern utility). `index.html` swaps font links and updates meta.
- Old dark landing (`src/landing/*`, GSAP/three.js/Lenis) is removed from the route
  graph and deleted once nothing imports it; heavy deps dropped from package.json if
  no longer referenced.
- Animations: CSS transitions + IntersectionObserver reveal (lightweight, matches the
  reference's subtle motion; no GSAP dependency).

## Error handling / testing

- `npm run typecheck` + `npm run build` must pass.
- QA via gstack browse: desktop + mobile screenshots of every route, console-error scan.
- Contact form logic untouched → no regression surface beyond styling.

## Out of scope

- Admin portal redesign, Supabase schema, blog/careers/press pages not in the route
  graph, Arabic localization (reference has a language toggle; Flowza has no AR content).
