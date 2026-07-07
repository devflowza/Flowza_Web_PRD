import {
  DollarSign, QrCode, Truck, Flower2, Car, ShoppingCart, Crown,
  Sparkles, Shield, Zap, type LucideIcon,
} from 'lucide-react';
import { productImages } from '../assets/productImages';

/* ——— Contact & company constants ——— */

export const WHATSAPP_URL = 'https://web.whatsapp.com/send?phone=96892107562&text=Hello! FlowZa';
export const WHATSAPP_DISPLAY = '+968 9210 7562';
export const CONTACT_EMAIL = 'sales@flowza.ai';
export const OFFICE_ADDRESS = 'Ghala, Muscat, Oman';
export const BUSINESS_HOURS = 'Sun – Thu: 9:00 AM – 6:00 PM GST';

/* ——— Platforms ——— */

export interface LandingProduct {
  id: string;
  index: string;
  name: string;
  short: string;
  tagline: string;
  description: string;
  color: string;
  icon: LucideIcon;
  image: string;
  badges: string[];
  live: boolean;
}

export const landingProducts: LandingProduct[] = [
  {
    id: 'finance',
    index: '01',
    name: 'FlowZa Finance',
    short: 'Finance',
    tagline: 'All-in-one finance & ERP',
    description: 'Accounting, inventory, payroll, HR and multi-country compliance — unified in one platform.',
    color: '#10b981',
    icon: DollarSign,
    image: productImages.finance,
    badges: ['Payroll & HR', 'Inventory', 'India + Gulf tax'],
    live: true,
  },
  {
    id: 'logispro',
    index: '02',
    name: 'FlowZa LogisPro',
    short: 'LogisPro',
    tagline: 'Smart logistics platform',
    description: 'Route optimization, live shipment tracking and warehouse management.',
    color: '#38bdf8',
    icon: Truck,
    image: productImages.logispro,
    badges: ['Route optimization', 'Live tracking', 'Warehouse WMS'],
    live: false,
  },
  {
    id: 'spamaster',
    index: '03',
    name: 'FlowZa Spa Master',
    short: 'Spa Master',
    tagline: 'Spa & wellness management',
    description: 'Bookings, staff scheduling, inventory and customer loyalty — unified.',
    color: '#f43f5e',
    icon: Flower2,
    image: productImages.spamaster,
    badges: ['Online booking', 'Scheduling', 'Loyalty'],
    live: false,
  },
  {
    id: 'fleetza',
    index: '04',
    name: 'FlowZa Fleetza',
    short: 'Fleetza',
    tagline: 'Fleet intelligence system',
    description: 'GPS tracking, driver behaviour scoring and predictive maintenance.',
    color: '#06b6d4',
    icon: Car,
    image: productImages.fleetza,
    badges: ['GPS tracking', 'Driver scoring', 'Maintenance'],
    live: false,
  },
  {
    id: 'qrforge',
    index: '05',
    name: 'FlowZa QRForge',
    short: 'QRForge',
    tagline: 'Dynamic QR code engine',
    description: 'Dynamic QR codes at scale — redirects, scan analytics and bulk generation.',
    color: '#f59e0b',
    icon: QrCode,
    image: productImages.qrforge,
    badges: ['Dynamic redirect', 'Analytics', 'Bulk generation'],
    live: false,
  },
  {
    id: 'pos',
    index: '06',
    name: 'FlowZa POS',
    short: 'POS',
    tagline: 'Next-gen point of sale',
    description: 'Blazing-fast point of sale with offline mode and deep customer analytics.',
    color: '#0ea5e9',
    icon: ShoppingCart,
    image: productImages.pos,
    badges: ['Offline mode', 'Multi-location', 'Analytics'],
    live: false,
  },
  {
    id: 'club',
    index: '07',
    name: 'FlowZa Club',
    short: 'Club',
    tagline: 'Club & membership management',
    description: 'Membership, billing, POS and zero-double-book booking for clubs — unified.',
    color: '#9333ea',
    icon: Crown,
    image: productImages.club,
    badges: ['Membership', 'Booking', 'Two-way WhatsApp'],
    live: true,
  },
];

/* ——— Home page stats & value props ——— */

export const heroStats = [
  { value: '100+', label: 'Active businesses' },
  { value: '4+', label: 'Regions — MEA & India' },
  { value: '94%', label: 'Automation rate' },
  { value: '99.9%', label: 'Uptime SLA' },
];

export const whyItems = [
  {
    icon: Sparkles,
    title: 'Purpose-built AI',
    desc: 'Every system is trained on industry-specific data — not generic models. It understands your business from day one.',
    color: '#06b6d4',
  },
  {
    icon: Shield,
    title: 'Enterprise-grade security',
    desc: 'SOC 2 compliant infrastructure with end-to-end encryption, role-based access and audit trails on every action.',
    color: '#10b981',
  },
  {
    icon: Zap,
    title: 'Zero-complexity onboarding',
    desc: 'Go live in hours, not weeks. Pre-built templates, guided setup and dedicated onboarding support included.',
    color: '#f59e0b',
  },
  {
    icon: DollarSign,
    title: 'True cost savings',
    desc: 'Customers report 40–85% less manual operational work within the first 90 days of running on FlowZa.',
    color: '#f43f5e',
  },
];

export const MANIFESTO =
  'We believe software should disappear into the work. FlowZa quietly automates the busywork — invoices, routes, rosters, stock — so a team of ten can move like a team of fifty.';

/* ——— Clients & testimonials ——— */

export const clients = [
  { name: 'Gulf Drive', initials: 'GD', color: '#0ea5e9' },
  { name: 'NileDrive', initials: 'ND', color: '#10b981' },
  { name: 'AlNoor Retail', initials: 'AN', color: '#f59e0b' },
  { name: 'Swift Logistics', initials: 'SL', color: '#0ea5e9' },
  { name: 'TechStart Solutions', initials: 'TS', color: '#ef4444' },
  { name: 'Serenity Day Spa', initials: 'SS', color: '#f43f5e' },
  { name: 'EuroDrive', initials: 'ED', color: '#3b82f6' },
  { name: 'Pinnacle Finance', initials: 'PF', color: '#10b981' },
  { name: 'Root Projects', initials: 'RP', color: '#f59e0b' },
  { name: 'Dhofartec', initials: 'DH', color: '#14b8a6' },
  { name: 'Defenders LLC', initials: 'DL', color: '#14b8a6' },
  { name: 'Star Safe Solutions', initials: 'SS', color: '#ef4444' },
  { name: 'Future Space LLC', initials: 'FS', color: '#3b82f6' },
  { name: 'Suwaiq Modern', initials: 'SM', color: '#10b981' },
];

export const homeTestimonials = [
  {
    quote:
      "FlowZa Finance cut our month-end close from 5 days to just 6 hours. The AI catches errors we used to miss entirely. It's not just software — it's a financial partner.",
    name: 'Khalid Al-Rashid',
    role: 'CFO',
    company: 'AlNoor Retail Group',
    initials: 'KA',
    color: '#10b981',
  },
  {
    quote:
      'FlowZa Spa Master transformed how we run our five locations. Online bookings went up 230% in the first month. Staff actually enjoy using it — that alone is priceless.',
    name: 'Lena Voss',
    role: 'Operations Director',
    company: 'Serenity Wellness',
    initials: 'LV',
    color: '#f43f5e',
  },
  {
    quote:
      "FlowZa Fleetza gave us visibility we didn't know we were missing. Fuel costs dropped 22% within 90 days just from the route and behavior insights. The ROI was immediate.",
    name: 'Omar Hassan',
    role: 'Fleet Manager',
    company: 'Swift Logistics MENA',
    initials: 'OH',
    color: '#06b6d4',
  },
];

/* ——— FAQ (assembled from existing site facts) ——— */

export const faqItems = [
  {
    q: 'How long does it take to go live on FlowZa?',
    a: 'Hours, not weeks. Every platform ships with pre-built templates, a guided setup wizard and dedicated onboarding support. FlowZa Finance includes a migration wizard that imports contacts, items and history from Zoho or spreadsheets.',
  },
  {
    q: 'Which countries and tax regimes do you support?',
    a: 'FlowZa is built for MEA & India. FlowZa Finance ships with GST for India and VAT plus Corporate Tax for the Gulf, with country-specific chart-of-accounts packs and statutory payroll filings built in — not bolted on.',
  },
  {
    q: 'Is there a free trial?',
    a: 'Yes — every plan can be started as a free trial before you buy. FlowZa Club offers a 14-day trial with a six-step setup wizard covering branding, currency, tax, staff roles and facilities.',
  },
  {
    q: 'Do you offer yearly billing discounts?',
    a: 'Yes. Paying yearly saves 25% compared to monthly billing across Starter, Professional and Enterprise plans.',
  },
  {
    q: 'How secure is my business data?',
    a: 'FlowZa runs on SOC 2 compliant infrastructure with end-to-end encryption, role-based access control and audit trails on every action, backed by a 99.9% uptime SLA.',
  },
  {
    q: 'Can the platforms work together?',
    a: 'Yes — that is the point. Seven purpose-built systems share one operating fabric: FlowZa POS posts straight into FlowZa Finance, and every platform shares customer, inventory and ledger data without manual re-entry.',
  },
];

/* ——— Trust badges (footer & hero) ——— */

export const trustBadges = [
  'SOC 2 Compliant',
  '99.9% Uptime SLA',
  'GST & VAT Ready',
  'Multi-currency',
  'No Lock-in',
];
