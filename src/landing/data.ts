import { DollarSign, QrCode, Truck, Flower2, Car, ShoppingCart, Crown, Sparkles, Shield, Zap, type LucideIcon } from 'lucide-react';
import { productImages } from '../assets/productImages';

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
    name: 'Flowza Finance',
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
    name: 'Flowza LogisPro',
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
    name: 'Flowza Spa Master',
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
    name: 'Flowza Fleetza',
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
    name: 'Flowza QRForge',
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
    name: 'Flowza POS',
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
    name: 'Flowza Club',
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

export const heroStats = [
  { value: 100, suffix: '+', label: 'Active businesses' },
  { value: 4, suffix: '+', label: 'Regions — MEA & India' },
  { value: 94, suffix: '%', label: 'Automation rate' },
  { value: 99.9, suffix: '%', label: 'Uptime SLA', decimals: 1 },
];

export const whyItems = [
  {
    icon: Sparkles,
    title: 'Purpose-built AI',
    desc: 'Every system is trained on industry-specific data — not generic models. It understands your business from day one.',
    color: '#22d3ee',
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
    desc: 'Customers report 40–85% less manual operational work within the first 90 days of running on Flowza.',
    color: '#f43f5e',
  },
];

export const WHATSAPP_URL = 'https://web.whatsapp.com/send?phone=96892107562&text=Hello! Flowza';
