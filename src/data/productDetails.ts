import {
  DollarSign, Flower2, Truck, QrCode, ShoppingCart, Car,
  Globe, RefreshCw, BarChart2,
  Calendar, Users, Package, Star, Heart,
  MapPin, Navigation, Warehouse, AlertCircle, Clock, Layers,
  Link, Eye, Palette, Download, Target, Activity,
  Wifi, Monitor, CreditCard, Database, PieChart, ArrowUpRight,
  Radio, Wrench, Fuel, Shield, Map, Cpu,
  Crown, Scale, Receipt, CalendarCheck, LayoutGrid, MessageCircle,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface ProductFeature {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface ProductStep {
  number: string;
  title: string;
  description: string;
}

export interface ProductStat {
  value: string;
  label: string;
}

export interface ProductTestimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  initials: string;
}

export interface RelatedProduct {
  id: string;
  name: string;
  tagline: string;
  color: string;
  colorSecondary: string;
  imageKey: string;
  pexelsImage: string;
  lightBg?: boolean;
}

export interface ProductDetail {
  id: string;
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  color: string;
  colorSecondary: string;
  icon: LucideIcon;
  href: string;
  badges: string[];
  features: ProductFeature[];
  steps: ProductStep[];
  stats: ProductStat[];
  testimonial: ProductTestimonial;
  related: RelatedProduct[];
}

const productDetailsMap: Record<string, ProductDetail> = {
  finance: {
    id: 'finance',
    name: 'Flowza Finance',
    tagline: 'FinanceOS — All-in-One Accounting & ERP',
    description: 'The operating system for your business finances. Accounting, invoicing, inventory, payroll, HR and compliance — unified in one cloud platform with real-time data and bank-grade security.',
    longDescription: 'Flowza Finance is an all-in-one, multi-tenant accounting and ERP platform built for modern businesses. It combines sales, purchases, inventory, double-entry accounting, banking, payroll, a full HR suite and reporting in a single system — with multi-currency, multi-country tax compliance and audit-ready books. Run one entity or a whole group; FinanceOS scales without you stitching five separate tools together.',
    color: '#10b981',
    colorSecondary: '#059669',
    icon: DollarSign,
    href: 'https://finance.flowza.ai',
    badges: ['Accounting + Inventory', 'Payroll & HR', 'India + Gulf tax'],
    features: [
      {
        icon: Layers,
        title: 'One Platform, Every Function',
        description: 'Sales, purchases, inventory, accounting, banking, payroll, HR and reporting on a single connected ledger — no more stitching together five different tools.',
      },
      {
        icon: Package,
        title: 'Perpetual Inventory & Auto-COGS',
        description: 'Real-time stock with Weighted Average Cost, serial tracking, multi-location, bundles and reorder alerts. Cost-of-goods posts automatically — inventory and books always agree.',
      },
      {
        icon: Users,
        title: 'Payroll & HR, Built In',
        description: 'Run compliant payroll in minutes and manage hire-to-retire HR — recruitment, onboarding, attendance, leave and performance — all inside the same platform.',
      },
      {
        icon: Globe,
        title: 'Multi-Country Tax Engines',
        description: 'GST for India and VAT plus Corporate Tax for the Gulf, with country-specific chart-of-accounts packs and statutory payroll filings built in — not bolted on.',
      },
      {
        icon: RefreshCw,
        title: 'Self-Checking Books',
        description: 'Double-entry accounting with period locks, multi-currency revaluation and nightly sub-ledger vs GL reconciliation that detects drift and alerts you automatically.',
      },
      {
        icon: BarChart2,
        title: '40+ Reports + AI Insights',
        description: 'Trial balance, P&L, balance sheet, cash flow and aging — export to PDF, Excel or CSV, with plain-English AI summaries that explain what the numbers mean.',
      },
    ],
    steps: [
      {
        number: '01',
        title: 'Set Up Your Organisation',
        description: 'Add your company, chart of accounts and team, then import contacts, items and history from Zoho or spreadsheets with the built-in migration wizard.',
      },
      {
        number: '02',
        title: 'Run Your Whole Back Office',
        description: 'Invoice customers, raise purchase orders, track stock, run payroll and manage your people — every transaction posts to the ledger automatically.',
      },
      {
        number: '03',
        title: 'Live Reports & Compliance',
        description: 'Watch dashboards update in real time, file GST and VAT returns on schedule, and share audit-ready, role-based views with accountants and investors.',
      },
    ],
    stats: [
      { value: '40+', label: 'Functional modules in one platform' },
      { value: '85%', label: 'Less manual back-office work' },
      { value: '4', label: 'Countries compliant — India + Gulf' },
      { value: '99.8%', label: 'Transaction categorization accuracy' },
    ],
    testimonial: {
      quote: "Flowza Finance cut our monthly close from 5 days to 6 hours. The AI categorization is eerily accurate and the real-time dashboards have completely changed how our board reviews performance.",
      name: 'Amara Osei',
      role: 'CFO',
      company: 'Brightline Retail Group',
      initials: 'AO',
    },
    related: [
      { id: 'spamaster', name: 'Flowza Spa Master', tagline: 'Complete Wellness & Spa Management', color: '#f43f5e', colorSecondary: '#e11d48', imageKey: 'spamaster', pexelsImage: '/SpaMaster.png' },
      { id: 'logispro', name: 'Flowza LogisPro', tagline: 'Smart Logistics Platform', color: '#38bdf8', colorSecondary: '#0ea5e9', imageKey: 'logispro', pexelsImage: '/logispro-hero.png' },
      { id: 'qrforge', name: 'Flowza QRForge', tagline: 'Advanced QR Code Management Platform', color: '#f59e0b', colorSecondary: '#d97706', imageKey: 'qrforge', pexelsImage: 'https://images.pexels.com/photos/6592664/pexels-photo-6592664.jpeg?auto=compress&cs=tinysrgb&w=600' },
      { id: 'pos', name: 'Flowza POS', tagline: 'Complete Cloud ERP + Point of Sale', color: '#8b5cf6', colorSecondary: '#7c3aed', imageKey: 'pos', pexelsImage: '/POS_image.png', lightBg: true },
      { id: 'fleetza', name: 'Flowza Fleetza', tagline: 'Cloud ERP for Rental Car Companies', color: '#7c5ff5', colorSecondary: '#3730a3', imageKey: 'fleetza', pexelsImage: '/Fleetza.png' },
      { id: 'club', name: 'Flowza Club', tagline: 'Club & Membership Management', color: '#9333ea', colorSecondary: '#6b21a8', imageKey: 'club', pexelsImage: 'https://images.pexels.com/photos/1409004/pexels-photo-1409004.jpeg?auto=compress&cs=tinysrgb&w=600' },
    ],
  },

  spamaster: {
    id: 'spamaster',
    name: 'Flowza Spa Master',
    tagline: 'Spa & Wellness Management',
    description: 'End-to-end platform for spas and wellness centers. Online booking, staff scheduling, inventory, and customer loyalty — all unified.',
    longDescription: 'Flowza Spa Master is purpose-built for spas, wellness studios, and beauty centers that want to deliver exceptional client experiences while running a tight operation. From the moment a client books online to the moment they leave a review, every touchpoint is managed in one intelligent platform.',
    color: '#f43f5e',
    colorSecondary: '#e11d48',
    icon: Flower2,
    href: 'https://spamaster.flowza.ai',
    badges: ['Online Booking', 'Staff Scheduling', 'Loyalty Programs'],
    features: [
      {
        icon: Calendar,
        title: 'Smart Online Booking',
        description: 'A beautiful client-facing booking portal that shows real-time availability, service durations, and therapist preferences — accessible from any device, 24/7.',
      },
      {
        icon: Users,
        title: 'Staff Scheduling Engine',
        description: 'Build optimal rosters automatically based on staff availability, certifications, and client preferences. Reduce scheduling conflicts and overtime costs.',
      },
      {
        icon: Package,
        title: 'Inventory & Retail Management',
        description: 'Track product stock used in treatments and sold at reception. Auto-reorder alerts prevent stockouts and detailed COGS tracking protects your margins.',
      },
      {
        icon: Star,
        title: 'Customer Loyalty & Memberships',
        description: 'Create tiered loyalty programs, membership packages, and gift vouchers that keep clients coming back. Automated retention campaigns re-engage dormant customers.',
      },
      {
        icon: Heart,
        title: 'Client Profile & History',
        description: 'Every client visit, preference, treatment note, and purchase is stored in a rich profile. Therapists walk into every session fully prepared.',
      },
      {
        icon: BarChart2,
        title: 'Revenue & Performance Analytics',
        description: 'Track revenue per treatment room, therapist utilization, rebooking rates, and retail attach rates in real time to optimize your most profitable services.',
      },
    ],
    steps: [
      {
        number: '01',
        title: 'Set Up Your Space',
        description: 'Add your services, staff, treatment rooms, and operating hours. Import existing client records and configure your booking rules in under an hour.',
      },
      {
        number: '02',
        title: 'Go Live with Bookings',
        description: 'Share your branded booking link or embed it on your website. Clients self-book, staff receive automatic schedule updates, and reminders go out automatically.',
      },
      {
        number: '03',
        title: 'Grow with Insights',
        description: 'Use daily analytics to identify your highest-value clients, best-performing services, and peak demand windows — then act on them with targeted promotions.',
      },
    ],
    stats: [
      { value: '42%', label: 'Average increase in online bookings' },
      { value: '28%', label: 'Reduction in no-show rates with automated reminders' },
      { value: '3×', label: 'Faster front-desk check-in and checkout' },
      { value: '94%', label: 'Client satisfaction score average' },
    ],
    testimonial: {
      quote: "Flowza Spa Master transformed how we run our three locations. The staff scheduling alone saves us 10+ hours a week, and our clients love the seamless booking experience. Rebooking rates went up 35% in the first quarter.",
      name: 'Priya Nair',
      role: 'Owner',
      company: 'Serenity Wellness Studios',
      initials: 'PN',
    },
    related: [
      { id: 'finance', name: 'Flowza Finance', tagline: 'All-in-One Accounting & ERP', color: '#10b981', colorSecondary: '#059669', imageKey: 'finance', pexelsImage: 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=600' },
      { id: 'logispro', name: 'Flowza LogisPro', tagline: 'Smart Logistics Platform', color: '#38bdf8', colorSecondary: '#0ea5e9', imageKey: 'logispro', pexelsImage: '/logispro-hero.png' },
      { id: 'qrforge', name: 'Flowza QRForge', tagline: 'Advanced QR Code Management Platform', color: '#f59e0b', colorSecondary: '#d97706', imageKey: 'qrforge', pexelsImage: 'https://images.pexels.com/photos/6592664/pexels-photo-6592664.jpeg?auto=compress&cs=tinysrgb&w=600' },
      { id: 'pos', name: 'Flowza POS', tagline: 'Complete Cloud ERP + Point of Sale', color: '#8b5cf6', colorSecondary: '#7c3aed', imageKey: 'pos', pexelsImage: '/POS_image.png', lightBg: true },
      { id: 'fleetza', name: 'Flowza Fleetza', tagline: 'Cloud ERP for Rental Car Companies', color: '#7c5ff5', colorSecondary: '#3730a3', imageKey: 'fleetza', pexelsImage: '/Fleetza.png' },
      { id: 'club', name: 'Flowza Club', tagline: 'Club & Membership Management', color: '#9333ea', colorSecondary: '#6b21a8', imageKey: 'club', pexelsImage: 'https://images.pexels.com/photos/1409004/pexels-photo-1409004.jpeg?auto=compress&cs=tinysrgb&w=600' },
    ],
  },

  logispro: {
    id: 'logispro',
    name: 'Flowza LogisPro',
    tagline: 'Smart Logistics Platform',
    description: 'Intelligent route optimization, shipment tracking, and warehouse management. Reduce delivery costs by up to 30% with AI-driven logistics.',
    longDescription: 'Flowza LogisPro brings enterprise-grade logistics intelligence to growing businesses. With AI-optimized routes, real-time tracking, and a full warehouse management system, you gain the operational visibility and cost control that was previously only available to logistics giants.',
    color: '#38bdf8',
    colorSecondary: '#0ea5e9',
    icon: Truck,
    href: 'https://logispro.flowza.ai',
    badges: ['Route Optimization', 'Live Tracking', 'Warehouse WMS'],
    features: [
      {
        icon: Navigation,
        title: 'AI Route Optimization',
        description: 'Plan hundreds of deliveries in seconds. Our algorithm factors in traffic, time windows, vehicle capacity, and driver hours to build the lowest-cost routes automatically.',
      },
      {
        icon: MapPin,
        title: 'Real-time Shipment Tracking',
        description: 'Live GPS tracking for every vehicle and shipment. Customers get automated tracking links and ETAs, while your ops team sees the full picture on one map.',
      },
      {
        icon: Warehouse,
        title: 'Warehouse Management System',
        description: 'Manage putaway, picking, packing, and dispatch from a single WMS interface. Barcode and QR scanning support eliminates manual data entry and picking errors.',
      },
      {
        icon: AlertCircle,
        title: 'Proactive Delay Detection',
        description: 'AI monitors every active shipment and proactively flags delays before they happen — giving your team time to reroute or notify customers in advance.',
      },
      {
        icon: Clock,
        title: 'Driver & Fleet Management',
        description: 'Track driver hours, performance scores, and compliance. Assign jobs dynamically based on proximity, shift availability, and vehicle type.',
      },
      {
        icon: Layers,
        title: 'Multi-carrier Integration',
        description: 'Connect with third-party couriers, freight brokers, and last-mile partners. Rate-shop across carriers and book shipments without leaving the platform.',
      },
    ],
    steps: [
      {
        number: '01',
        title: 'Import Your Network',
        description: 'Add your depots, vehicles, drivers, and customer addresses. Connect your existing order management system or use our open API to push orders automatically.',
      },
      {
        number: '02',
        title: 'Optimize & Dispatch',
        description: 'Each morning, Flowza LogisPro builds optimized routes for your entire fleet. Review, adjust if needed, and dispatch with one click — drivers get routes on their mobile app.',
      },
      {
        number: '03',
        title: 'Track, Analyze & Improve',
        description: 'Monitor deliveries live, measure on-time performance, fuel usage, and cost per delivery. Use weekly AI reports to continuously reduce operational waste.',
      },
    ],
    stats: [
      { value: '30%', label: 'Average reduction in delivery costs' },
      { value: '98.2%', label: 'On-time delivery rate for customers' },
      { value: '22%', label: 'Fuel savings from optimized routing' },
      { value: '5×', label: 'Faster route planning vs. manual methods' },
    ],
    testimonial: {
      quote: "We were spending enormous time manually planning routes and still missing delivery windows. Flowza LogisPro automated the entire process, cut our fuel costs by a quarter, and our customer satisfaction scores have never been higher.",
      name: 'David Mensah',
      role: 'Operations Director',
      company: 'SwiftLink Logistics',
      initials: 'DM',
    },
    related: [
      { id: 'finance', name: 'Flowza Finance', tagline: 'All-in-One Accounting & ERP', color: '#10b981', colorSecondary: '#059669', imageKey: 'finance', pexelsImage: 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=600' },
      { id: 'spamaster', name: 'Flowza Spa Master', tagline: 'Complete Wellness & Spa Management', color: '#f43f5e', colorSecondary: '#e11d48', imageKey: 'spamaster', pexelsImage: '/SpaMaster.png' },
      { id: 'qrforge', name: 'Flowza QRForge', tagline: 'Advanced QR Code Management Platform', color: '#f59e0b', colorSecondary: '#d97706', imageKey: 'qrforge', pexelsImage: 'https://images.pexels.com/photos/6592664/pexels-photo-6592664.jpeg?auto=compress&cs=tinysrgb&w=600' },
      { id: 'pos', name: 'Flowza POS', tagline: 'Complete Cloud ERP + Point of Sale', color: '#8b5cf6', colorSecondary: '#7c3aed', imageKey: 'pos', pexelsImage: '/POS_image.png', lightBg: true },
      { id: 'fleetza', name: 'Flowza Fleetza', tagline: 'Cloud ERP for Rental Car Companies', color: '#7c5ff5', colorSecondary: '#3730a3', imageKey: 'fleetza', pexelsImage: '/Fleetza.png' },
      { id: 'club', name: 'Flowza Club', tagline: 'Club & Membership Management', color: '#9333ea', colorSecondary: '#6b21a8', imageKey: 'club', pexelsImage: 'https://images.pexels.com/photos/1409004/pexels-photo-1409004.jpeg?auto=compress&cs=tinysrgb&w=600' },
    ],
  },

  qrforge: {
    id: 'qrforge',
    name: 'Flowza QRForge',
    tagline: 'Dynamic QR Code Engine',
    description: 'Create, manage, and track QR codes at scale. Dynamic redirects, scan analytics, branded codes, and bulk generation for campaigns.',
    longDescription: 'Flowza QRForge is the professional QR code platform for marketing teams, retailers, and operations that need more than a static code. Create dynamic codes that can be updated after printing, track every scan in real time, and run sophisticated campaign analytics — all from one dashboard.',
    color: '#f59e0b',
    colorSecondary: '#d97706',
    icon: QrCode,
    href: 'https://qrforge.flowza.ai',
    badges: ['Dynamic Redirect', 'Scan Analytics', 'Bulk Generation'],
    features: [
      {
        icon: Link,
        title: 'Dynamic Redirects',
        description: 'Change the destination URL of any printed QR code at any time — without reprinting. Perfect for menus, packaging, and long-running campaigns that need flexibility.',
      },
      {
        icon: Eye,
        title: 'Real-time Scan Analytics',
        description: 'Track every scan with location, device type, operating system, and time data. Build audience profiles and measure campaign performance with precision.',
      },
      {
        icon: Palette,
        title: 'Branded Code Design',
        description: 'Create visually stunning QR codes with your brand colors, embedded logos, and custom frames. Multiple export formats including SVG for print-perfect quality.',
      },
      {
        icon: Download,
        title: 'Bulk Generation & Management',
        description: 'Generate thousands of unique QR codes from a CSV upload in seconds. Manage them in organized campaigns with folder structures and team permissions.',
      },
      {
        icon: Target,
        title: 'A/B Testing & Smart Routing',
        description: 'Split-test destinations, route users based on location or device type, and schedule time-based redirects — all from a single QR code.',
      },
      {
        icon: Activity,
        title: 'Campaign Performance Dashboards',
        description: 'Visualize scan heatmaps, conversion funnels, and campaign comparisons in beautiful dashboards that you can export or share with clients.',
      },
    ],
    steps: [
      {
        number: '01',
        title: 'Create Your Codes',
        description: 'Design a single branded code or upload a CSV to generate thousands at once. Set your destination URL, add your brand elements, and download in any format.',
      },
      {
        number: '02',
        title: 'Deploy & Track',
        description: 'Use your codes in print, digital, or product packaging. Every scan is captured in real time — you see who scanned, when, and where with full detail.',
      },
      {
        number: '03',
        title: 'Optimize & Update',
        description: 'Change destinations, run A/B tests, and adjust targeting rules on live codes without reprinting. Use scan data to continuously improve your campaigns.',
      },
    ],
    stats: [
      { value: '10M+', label: 'QR codes generated on the platform' },
      { value: '<0.3s', label: 'Average redirect time per scan' },
      { value: '60%', label: 'Higher engagement vs. static QR codes' },
      { value: '99.99%', label: 'Uptime SLA for redirect infrastructure' },
    ],
    testimonial: {
      quote: "We run hundreds of simultaneous marketing campaigns and Flowza QRForge is the backbone of all of them. The ability to update destinations after print saves us thousands in reprinting costs every month. The analytics are outstanding.",
      name: 'Fatima Al-Hassan',
      role: 'Head of Marketing',
      company: 'Urban Eats Group',
      initials: 'FA',
    },
    related: [
      { id: 'finance', name: 'Flowza Finance', tagline: 'All-in-One Accounting & ERP', color: '#10b981', colorSecondary: '#059669', imageKey: 'finance', pexelsImage: 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=600' },
      { id: 'spamaster', name: 'Flowza Spa Master', tagline: 'Complete Wellness & Spa Management', color: '#f43f5e', colorSecondary: '#e11d48', imageKey: 'spamaster', pexelsImage: '/SpaMaster.png' },
      { id: 'logispro', name: 'Flowza LogisPro', tagline: 'Smart Logistics Platform', color: '#38bdf8', colorSecondary: '#0ea5e9', imageKey: 'logispro', pexelsImage: '/logispro-hero.png' },
      { id: 'pos', name: 'Flowza POS', tagline: 'Complete Cloud ERP + Point of Sale', color: '#8b5cf6', colorSecondary: '#7c3aed', imageKey: 'pos', pexelsImage: '/POS_image.png', lightBg: true },
      { id: 'fleetza', name: 'Flowza Fleetza', tagline: 'Cloud ERP for Rental Car Companies', color: '#7c5ff5', colorSecondary: '#3730a3', imageKey: 'fleetza', pexelsImage: '/Fleetza.png' },
      { id: 'club', name: 'Flowza Club', tagline: 'Club & Membership Management', color: '#9333ea', colorSecondary: '#6b21a8', imageKey: 'club', pexelsImage: 'https://images.pexels.com/photos/1409004/pexels-photo-1409004.jpeg?auto=compress&cs=tinysrgb&w=600' },
    ],
  },

  pos: {
    id: 'pos',
    name: 'Flowza POS',
    tagline: 'Next-Gen Point of Sale',
    description: 'A blazing-fast POS system with offline mode, multi-location inventory, and deep customer analytics. Works on any device, anywhere.',
    longDescription: 'Flowza POS is the modern point-of-sale system built for businesses that cannot afford downtime. Lightning-fast transactions, seamless offline operation, and deep customer intelligence make it the most reliable and insightful POS platform for retail, food and beverage, and service businesses.',
    color: '#8b5cf6',
    colorSecondary: '#7c3aed',
    icon: ShoppingCart,
    href: 'https://pos.flowza.ai',
    badges: ['Offline Mode', 'Multi-location', 'Deep Analytics'],
    features: [
      {
        icon: Wifi,
        title: 'True Offline Mode',
        description: 'Process transactions, apply discounts, and manage inventory even without internet. All data syncs automatically when connectivity is restored — zero data loss guaranteed.',
      },
      {
        icon: Monitor,
        title: 'Works on Any Device',
        description: 'Run Flowza POS on iPad, Android tablet, Windows terminal, or a web browser. One license, every device. No proprietary hardware required.',
      },
      {
        icon: CreditCard,
        title: 'Universal Payment Acceptance',
        description: 'Accept cards, mobile wallets, QR payments, cash, and split payments in one tap. Integrated payment processing with next-day settlement and reconciliation.',
      },
      {
        icon: Database,
        title: 'Multi-location Inventory',
        description: 'Manage stock across unlimited locations from a central dashboard. Stock transfers, low-stock alerts, and purchase order management built in.',
      },
      {
        icon: PieChart,
        title: 'Deep Customer Analytics',
        description: 'Know your best customers, their purchase history, average spend, and preferred products. Use this data to drive loyalty programs and personalized promotions.',
      },
      {
        icon: ArrowUpRight,
        title: 'Seamless Integrations',
        description: 'Native connections to Flowza Finance for accounting, delivery platforms, eCommerce channels, and your existing CRM — all data flows without manual entry.',
      },
    ],
    steps: [
      {
        number: '01',
        title: 'Set Up in Minutes',
        description: 'Add your products, set your prices, and configure your payment methods. Flowza POS imports your existing product catalog and can be ready for your first transaction in under 30 minutes.',
      },
      {
        number: '02',
        title: 'Sell Faster, Smarter',
        description: 'Your staff processes transactions in seconds with an intuitive interface optimized for speed. Modifiers, combo deals, and discounts are applied with one tap.',
      },
      {
        number: '03',
        title: 'Analyze & Grow',
        description: 'Review hourly sales performance, peak periods, top products, and staff productivity. Use built-in AI recommendations to optimize your menu, pricing, and staffing.',
      },
    ],
    stats: [
      { value: '0.8s', label: 'Average transaction completion time' },
      { value: '100%', label: 'Offline reliability — no transactions lost' },
      { value: '35%', label: 'Increase in average basket size with AI upsells' },
      { value: '150+', label: 'Payment methods and gateways supported' },
    ],
    testimonial: {
      quote: "We have 12 locations across three cities and Flowza POS gives me a real-time view of every one of them from my phone. The offline mode saved us during a major outage last year. Not a single sale was lost.",
      name: 'Kwame Boateng',
      role: 'Managing Director',
      company: 'Harvest Kitchen Group',
      initials: 'KB',
    },
    related: [
      { id: 'finance', name: 'Flowza Finance', tagline: 'All-in-One Accounting & ERP', color: '#10b981', colorSecondary: '#059669', imageKey: 'finance', pexelsImage: 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=600' },
      { id: 'spamaster', name: 'Flowza Spa Master', tagline: 'Complete Wellness & Spa Management', color: '#f43f5e', colorSecondary: '#e11d48', imageKey: 'spamaster', pexelsImage: '/SpaMaster.png' },
      { id: 'logispro', name: 'Flowza LogisPro', tagline: 'Smart Logistics Platform', color: '#38bdf8', colorSecondary: '#0ea5e9', imageKey: 'logispro', pexelsImage: '/logispro-hero.png' },
      { id: 'qrforge', name: 'Flowza QRForge', tagline: 'Advanced QR Code Management Platform', color: '#f59e0b', colorSecondary: '#d97706', imageKey: 'qrforge', pexelsImage: 'https://images.pexels.com/photos/6592664/pexels-photo-6592664.jpeg?auto=compress&cs=tinysrgb&w=600' },
      { id: 'fleetza', name: 'Flowza Fleetza', tagline: 'Cloud ERP for Rental Car Companies', color: '#7c5ff5', colorSecondary: '#3730a3', imageKey: 'fleetza', pexelsImage: '/Fleetza.png' },
      { id: 'club', name: 'Flowza Club', tagline: 'Club & Membership Management', color: '#9333ea', colorSecondary: '#6b21a8', imageKey: 'club', pexelsImage: 'https://images.pexels.com/photos/1409004/pexels-photo-1409004.jpeg?auto=compress&cs=tinysrgb&w=600' },
    ],
  },

  fleetza: {
    id: 'fleetza',
    name: 'Flowza Fleetza',
    tagline: 'Fleet Intelligence System',
    description: 'Real-time GPS tracking, driver behavior scoring, predictive maintenance alerts, and fuel analytics for your entire fleet.',
    longDescription: 'Flowza Fleetza transforms how businesses manage their vehicles, drivers, and operational costs. By combining real-time GPS tracking with AI-driven predictive maintenance and driver behavior analytics, Flowza Fleetza gives fleet managers the visibility and control to run safer, leaner, and more compliant operations at any scale.',
    color: '#7c5ff5',
    colorSecondary: '#3730a3',
    icon: Car,
    href: 'https://fleetza.flowza.ai',
    badges: ['GPS Tracking', 'Driver Scoring', 'Predictive Maintenance'],
    features: [
      {
        icon: Radio,
        title: 'Real-time GPS Tracking',
        description: 'See every vehicle on a live map with 10-second refresh rates. Replay any route from history, set geofence alerts, and share live ETAs with dispatchers and clients.',
      },
      {
        icon: Shield,
        title: 'Driver Behavior Scoring',
        description: 'AI analyzes every trip for harsh braking, rapid acceleration, speeding, and phone usage. Automated coaching nudges and leaderboards improve safety culture without friction.',
      },
      {
        icon: Wrench,
        title: 'Predictive Maintenance',
        description: 'Flowza Fleetza monitors engine diagnostics, mileage, and usage patterns to predict component failures before they happen — eliminating costly breakdowns and unplanned downtime.',
      },
      {
        icon: Fuel,
        title: 'Fuel Analytics & Optimization',
        description: 'Track fuel consumption per vehicle, identify inefficient routes and idling patterns, and flag potential fuel fraud. Average customers reduce fuel spend by 18–25%.',
      },
      {
        icon: Map,
        title: 'Geofencing & Zone Management',
        description: 'Define operational zones and receive instant alerts when vehicles enter or exit. Automate time-on-site tracking for customer visits and job site compliance.',
      },
      {
        icon: Cpu,
        title: 'Fleet Cost Intelligence',
        description: 'Full lifecycle cost tracking per vehicle — acquisition, maintenance, fuel, insurance, and depreciation. Know your true cost-per-km and make data-driven replacement decisions.',
      },
    ],
    steps: [
      {
        number: '01',
        title: 'Install & Connect',
        description: 'Plug Flowza Fleetza\'s compact OBD-II tracker into any vehicle in seconds. No wiring, no downtime. The dashboard populates with live data within minutes of installation.',
      },
      {
        number: '02',
        title: 'Monitor & Alert',
        description: 'Your fleet ops team sees every vehicle live on the map. AI watches for safety events, maintenance needs, and policy violations — sending alerts before issues escalate.',
      },
      {
        number: '03',
        title: 'Optimize Costs & Safety',
        description: 'Weekly AI reports surface your highest-cost vehicles, riskiest drivers, and maintenance priorities. Take action on clear recommendations to reduce fleet TCO continuously.',
      },
    ],
    stats: [
      { value: '23%', label: 'Average reduction in total fleet operating costs' },
      { value: '41%', label: 'Decrease in accident-related incidents' },
      { value: '18%', label: 'Average fuel savings from behavior coaching' },
      { value: '4×', label: 'Faster maintenance response with predictive alerts' },
    ],
    testimonial: {
      quote: "Flowza Fleetza gave us visibility we never had before. Within two months, our accident rate dropped significantly, our fuel costs fell by nearly 20%, and our maintenance spend is now completely predictable. It pays for itself every month.",
      name: 'Nia Adjei',
      role: 'Fleet Manager',
      company: 'TransAfrica Freight',
      initials: 'NA',
    },
    related: [
      { id: 'finance', name: 'Flowza Finance', tagline: 'All-in-One Accounting & ERP', color: '#10b981', colorSecondary: '#059669', imageKey: 'finance', pexelsImage: 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=600' },
      { id: 'spamaster', name: 'Flowza Spa Master', tagline: 'Complete Wellness & Spa Management', color: '#f43f5e', colorSecondary: '#e11d48', imageKey: 'spamaster', pexelsImage: '/SpaMaster.png' },
      { id: 'logispro', name: 'Flowza LogisPro', tagline: 'Smart Logistics Platform', color: '#38bdf8', colorSecondary: '#0ea5e9', imageKey: 'logispro', pexelsImage: '/logispro-hero.png' },
      { id: 'qrforge', name: 'Flowza QRForge', tagline: 'Advanced QR Code Management Platform', color: '#f59e0b', colorSecondary: '#d97706', imageKey: 'qrforge', pexelsImage: 'https://images.pexels.com/photos/6592664/pexels-photo-6592664.jpeg?auto=compress&cs=tinysrgb&w=600' },
      { id: 'pos', name: 'Flowza POS', tagline: 'Complete Cloud ERP + Point of Sale', color: '#8b5cf6', colorSecondary: '#7c3aed', imageKey: 'pos', pexelsImage: '/POS_image.png', lightBg: true },
      { id: 'club', name: 'Flowza Club', tagline: 'Club & Membership Management', color: '#9333ea', colorSecondary: '#6b21a8', imageKey: 'club', pexelsImage: 'https://images.pexels.com/photos/1409004/pexels-photo-1409004.jpeg?auto=compress&cs=tinysrgb&w=600' },
    ],
  },

  club: {
    id: 'club',
    name: 'Flowza Club',
    tagline: 'Membership, Booking & Billing for Clubs',
    description: 'The operating system for modern clubs — membership, a true double-entry ledger, charge-to-account POS and zero-double-book booking, unified across every facility.',
    longDescription: 'Flowza Club is the multi-tenant operating system for country, golf, racquet, marina, fitness, dining and events clubs. One platform unifies membership and household billing, a true double-entry ledger, charge-to-account POS, and a booking engine that makes double-bookings structurally impossible — with two-way WhatsApp and a branded member portal on top. Run one club or a whole group, global from day one with per-club currency, tax and feature entitlements.',
    color: '#9333ea',
    colorSecondary: '#6b21a8',
    icon: Crown,
    href: 'https://club.flowza.ai',
    badges: ['Membership & Billing', 'Zero double-booking', 'Two-way WhatsApp'],
    features: [
      {
        icon: Users,
        title: 'Members & Households',
        description: 'Member directory, priced tiers with dues and initiation fees, household billing, and a full active-to-honorary lifecycle — with safe archive over delete to protect the ledger.',
      },
      {
        icon: Scale,
        title: 'Double-Entry Ledger',
        description: 'A true double-entry general ledger that rejects unbalanced entries, with A/R-to-GL reconciliation, drift alerts, audit-safe voids and multi-gateway payments.',
      },
      {
        icon: Receipt,
        title: 'Charge-to-Account POS',
        description: 'Multi-outlet F&B and pro-shop registers with tabs and chits, charge-to-member-account, service charge and tax — settled and posted straight to the ledger.',
      },
      {
        icon: CalendarCheck,
        title: 'Zero-Double-Book Booking',
        description: 'A booking engine where double-bookings are structurally impossible — timezone-correct availability, waitlists with auto-promotion, dynamic pricing and cancellation cutoffs.',
      },
      {
        icon: LayoutGrid,
        title: 'Six Facility Verticals',
        description: 'Golf, racquet, marina, fitness, dining and events run on one engine with a unified calendar and shared member history — each module licensed independently.',
      },
      {
        icon: MessageCircle,
        title: 'WhatsApp + Member Portal',
        description: 'Two-way WhatsApp with a natural-language AI agent for booking, reschedule and self-verify, plus a branded, passwordless member portal and digital membership card.',
      },
    ],
    steps: [
      {
        number: '01',
        title: 'Launch Your Club',
        description: 'Start a 14-day trial and complete the six-step setup wizard — branding, currency, tax, staff roles and facilities — then import your member directory and go live.',
      },
      {
        number: '02',
        title: 'Run Every Operation',
        description: 'Take bookings across golf, courts, marina and dining, run charge-to-account POS, and post dues and payments — every transaction lands in one balanced ledger automatically.',
      },
      {
        number: '03',
        title: 'Grow Your Membership',
        description: 'List your club on the public marketplace, turn request-to-join into members in one step, collect verified reviews, and track KPIs across every branch in real time.',
      },
    ],
    stats: [
      { value: '0', label: 'Double-bookings — enforced in the database' },
      { value: '6', label: 'Facility verticals on one engine' },
      { value: '10', label: 'Countries, 8 tax regimes, multi-currency' },
      { value: '2-way', label: 'WhatsApp booking with an AI agent' },
    ],
    testimonial: {
      quote: "We replaced four disconnected systems with Flowza Club. Members book courts and dining over WhatsApp, every charge flows to one ledger that actually ties out, and monthly reconciliation finally takes an afternoon instead of a week.",
      name: 'Rohan Mehta',
      role: 'General Manager',
      company: 'Whitefield Golf & Country Club',
      initials: 'RM',
    },
    related: [
      { id: 'finance', name: 'Flowza Finance', tagline: 'All-in-One Accounting & ERP', color: '#10b981', colorSecondary: '#059669', imageKey: 'finance', pexelsImage: 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=600' },
      { id: 'spamaster', name: 'Flowza Spa Master', tagline: 'Complete Wellness & Spa Management', color: '#f43f5e', colorSecondary: '#e11d48', imageKey: 'spamaster', pexelsImage: '/SpaMaster.png' },
      { id: 'logispro', name: 'Flowza LogisPro', tagline: 'Smart Logistics Platform', color: '#38bdf8', colorSecondary: '#0ea5e9', imageKey: 'logispro', pexelsImage: '/logispro-hero.png' },
      { id: 'qrforge', name: 'Flowza QRForge', tagline: 'Advanced QR Code Management Platform', color: '#f59e0b', colorSecondary: '#d97706', imageKey: 'qrforge', pexelsImage: 'https://images.pexels.com/photos/6592664/pexels-photo-6592664.jpeg?auto=compress&cs=tinysrgb&w=600' },
      { id: 'pos', name: 'Flowza POS', tagline: 'Complete Cloud ERP + Point of Sale', color: '#8b5cf6', colorSecondary: '#7c3aed', imageKey: 'pos', pexelsImage: '/POS_image.png', lightBg: true },
      { id: 'fleetza', name: 'Flowza Fleetza', tagline: 'Cloud ERP for Rental Car Companies', color: '#7c5ff5', colorSecondary: '#3730a3', imageKey: 'fleetza', pexelsImage: '/Fleetza.png' },
    ],
  },
};

export default productDetailsMap;
