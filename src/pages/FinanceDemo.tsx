import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, TrendingUp, FileText, BarChart3, Package, CreditCard, Activity, ChevronLeft, ChevronRight, Check, Star, Play, ArrowRight, DollarSign, Shield, Globe, MessageCircle, FolderKanban, Ligature as FileSignature, Receipt, FileCheck, ShoppingCart, Truck, Boxes, BookOpen, Wallet, Users, PieChart, Hash, Mail, Fingerprint, Calendar, Download, ShieldCheck, KeyRound, Lock, ScrollText, RotateCcw, UserCheck, Layers, Repeat } from 'lucide-react';
import Dashboard1 from '../assets/01_Dashboard.png';
import Dashboard2 from '../assets/02_Dashboard.png';
import Items3 from '../assets/03_Items.png';
import PL4 from '../assets/04_p&l.png';
import Projects6 from '../assets/files_8036418-2026-03-19T09-45-44-330Z-06_Project_Management.png';
import Quotes7 from '../assets/07_Quotes.png';
import Invoices9 from '../assets/files_8036418-2026-03-19T09-44-19-018Z-09_Invoices_Management.webp';
import InvoiceStatus10 from '../assets/files_8036418-2026-03-19T09-42-49-663Z-10_Invoice_Workflow.png';
import PurchaseOrders15 from '../assets/files_8036418-2026-03-19T09-46-40-522Z-15_Purchase_Orders.webp';

const screenshots = [
  {
    id: 'dashboard',
    label: 'Financial Dashboard',
    description: 'Real-time overview of receivables, payables, income & expenses',
    image: Dashboard1,
    icon: BarChart3,
    color: '#10b981',
    features: ['Total Receivable tracking', 'Income & Expense charts', 'Top customers view', 'Cash flow monitoring'],
  },
  {
    id: 'pnl',
    label: 'Profit & Loss',
    description: 'Comprehensive P&L reports with financial performance analysis',
    image: PL4,
    icon: TrendingUp,
    color: '#06b6d4',
    features: ['Revenue breakdown', 'Gross profit margins', 'Operating expenses', 'Net profit analysis'],
  },
  {
    id: 'items',
    label: 'Items Catalog',
    description: 'Complete inventory management with pricing and stock levels',
    image: Items3,
    icon: Package,
    color: '#f59e0b',
    features: ['112+ item catalog', 'SKU management', 'Sale & purchase pricing', 'Stock level tracking'],
  },
  {
    id: 'dashboard2',
    label: 'Invoices & Expenses',
    description: 'Manage invoices, track expenses, monitor bank accounts',
    image: Dashboard2,
    icon: CreditCard,
    color: '#0ea5e9',
    features: ['Recent invoice management', 'Expense tracking', 'Bank account sync', 'Sales activity overview'],
  },
  {
    id: 'purchase-orders',
    label: 'Purchase Orders',
    description: 'Manage vendor purchase orders from issuance through billing and payment',
    image: PurchaseOrders15,
    icon: Receipt,
    color: '#f43f5e',
    features: ['PO to bill lifecycle', 'Vendor management', 'Billed / Received / Draft status', 'Payment status tracking'],
  },
  {
    id: 'projects',
    label: 'Project Management',
    description: 'Link projects to customers, quotes, and budgets in one view',
    image: Projects6,
    icon: FolderKanban,
    color: '#14b8a6',
    features: ['Project status pipeline', 'Budget vs actuals', 'Customer linkage', 'Draft to Completed workflow'],
  },
  {
    id: 'quotes',
    label: 'Quotes Pipeline',
    description: 'Convert quotes to sales orders with a single click',
    image: Quotes7,
    icon: FileSignature,
    color: '#f97316',
    features: ['22+ quote tracking', 'SO conversion status', 'Accepted / Declined / Expired', 'Expiry date alerts'],
  },
  {
    id: 'invoices',
    label: 'Invoices Management',
    description: 'End-to-end invoice tracking with real-time payment status',
    image: Invoices9,
    icon: FileText,
    color: '#3b82f6',
    features: ['17+ invoice management', 'Partial / Paid / Overdue flags', 'Balance outstanding view', 'Due date reminders'],
  },
  {
    id: 'invoice-detail',
    label: 'Invoice Workflow',
    description: 'Visual audit trail from quote to payment in one document view',
    image: InvoiceStatus10,
    icon: FileCheck,
    color: '#10b981',
    features: ['QT → SO → INV → PAY chain', 'Partially paid status', 'Document & Details tabs', 'Linked reference tracking'],
  },
];

const featureNodes = [
  { label: 'Smart Invoicing', sub: 'Auto-generate & send', icon: FileText, color: '#10b981', screenshotIdx: 0 },
  { label: 'P&L Reports', sub: 'Real-time analytics', icon: TrendingUp, color: '#0ea5e9', screenshotIdx: 1 },
  { label: 'Inventory', sub: '112+ items tracked', icon: Package, color: '#f59e0b', screenshotIdx: 2 },
  { label: 'Bank Sync', sub: 'Auto-reconciliation', icon: CreditCard, color: '#06b6d4', screenshotIdx: 3 },
  { label: 'Purchase Orders', sub: 'Vendor billing', icon: Receipt, color: '#f43f5e', screenshotIdx: 4 },
  { label: 'Projects', sub: 'Budget & status', icon: FolderKanban, color: '#14b8a6', screenshotIdx: 5 },
  { label: 'Quotes Pipeline', sub: 'Convert to SO', icon: FileSignature, color: '#f97316', screenshotIdx: 6 },
  { label: 'Invoices', sub: 'Track & collect', icon: Activity, color: '#3b82f6', screenshotIdx: 7 },
  { label: 'Invoice Workflow', sub: 'QT→SO→INV→PAY', icon: FileCheck, color: '#10b981', screenshotIdx: 8 },
];

const pricingPlans = [
  {
    name: 'Starter',
    price: '49',
    period: '/mo',
    description: 'For small businesses getting their books in order',
    features: ['Up to 50 invoices/month', 'Accounting & banking', '1 user · 1 bank account', 'Inventory — 50 items', 'GST / VAT returns', 'Email support'],
    cta: 'Start Free Trial',
    highlighted: false,
  },
  {
    name: 'Growth',
    price: '99',
    period: '/mo',
    description: 'Run sales, stock, payroll and HR on one ledger',
    features: ['Unlimited invoices & bills', 'Inventory, POs & 3-way matching', 'Payroll & HR (HRMS)', 'Multi-currency & multi-entity', 'Multi-country tax — India + Gulf', '40+ reports + AI insights', 'Priority support'],
    cta: 'Start Free Trial',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For groups with complex, consolidated operations',
    features: ['Everything in Growth', 'Consolidated multi-entity', 'Dedicated account manager', 'Custom integrations & SSO', 'SLA guarantee & audit support', 'Enterprise Plus — term discounts'],
    cta: 'Contact Sales',
    highlighted: false,
  },
];

const backOfficeModules = [
  {
    icon: ShoppingCart,
    color: '#10b981',
    title: 'Sales & Receivables',
    hook: 'From quote to cash, every step linked.',
    points: ['Quotes → Orders → Invoices → Delivery', 'Recurring, proforma & B2B/B2C invoicing', 'Credit notes & payment allocation', 'E-way bills & branded PDF templates'],
  },
  {
    icon: Truck,
    color: '#0ea5e9',
    title: 'Purchases & Payables',
    hook: 'Control every unit of spend.',
    points: ['Purchase orders with partial billing', '3-way matching (PO ↔ GRN ↔ Bill)', 'Vendor credits & recurring bills', 'Bills of entry for imports'],
  },
  {
    icon: Boxes,
    color: '#f59e0b',
    title: 'Inventory & Stock',
    hook: 'Stock and books, always in sync.',
    points: ['Perpetual inventory & automatic COGS', 'Weighted Average Cost (WAC)', 'Serial tracking & multi-location', 'Bundles, reorder alerts & warranty'],
  },
  {
    icon: BookOpen,
    color: '#06b6d4',
    title: 'Accounting & Banking',
    hook: 'Audit-ready books that check themselves.',
    points: ['Double-entry chart of accounts', 'Journals, divisions & period locks', 'Bank management & reconciliation', 'Nightly sub-ledger vs GL drift checks'],
  },
  {
    icon: Wallet,
    color: '#8b5cf6',
    title: 'Payroll',
    hook: 'Compliant payroll in minutes.',
    points: ['Salary structures & payslips', 'Form 16, ESI, PT, TDS & WPS files', 'Overtime, arrears & loans', 'Earned Wage Access (on-demand pay)'],
  },
  {
    icon: Users,
    color: '#f43f5e',
    title: 'HR Suite (HRMS)',
    hook: 'Hire-to-retire, all in one place.',
    points: ['Recruitment / ATS & onboarding', 'Leave, attendance & shift scheduling', 'Performance, engagement & timesheets', 'Employee self-service portal'],
  },
  {
    icon: PieChart,
    color: '#3b82f6',
    title: 'Reporting & Analytics',
    hook: 'Every number, one click away.',
    points: ['40+ financial & operational reports', 'Export to PDF, Excel, CSV & print', 'P&L, balance sheet, cash flow & aging', 'AI-powered dashboard narratives'],
  },
  {
    icon: FileText,
    color: '#14b8a6',
    title: 'Documents & PDF',
    hook: 'On-brand documents, no designer needed.',
    points: ['7-tab visual template editor', '9 presets incl. Tally Classic', 'Logos, watermarks & QR codes', 'Configurable email templates'],
  },
];

const complianceCountries = [
  { flag: '🇮🇳', name: 'India', items: ['GST — CGST / SGST / IGST / RCM', 'E-way bills & GST returns', 'TDS & ITC ledger tracking'] },
  { flag: '🇦🇪', name: 'UAE', items: ['VAT 5% engine', 'Corporate Tax 9%', 'WPS payroll bank files'] },
  { flag: '🇴🇲', name: 'Oman', items: ['VAT 5% engine', 'Social insurance payroll', 'Country-specific CoA pack'] },
  { flag: '🇸🇦', name: 'Saudi', items: ['GOSI payroll', 'Arabic / RTL documents', 'Roadmap-ready for more GCC'] },
];

const integrations = [
  { icon: CreditCard, label: 'Stripe' },
  { icon: Wallet, label: 'PayPal' },
  { icon: MessageCircle, label: 'WhatsApp Business' },
  { icon: Hash, label: 'Slack' },
  { icon: Mail, label: 'Email / SMTP' },
  { icon: Fingerprint, label: 'Biometric devices' },
  { icon: Download, label: 'Zoho import' },
  { icon: Calendar, label: 'Calendar sync' },
];

const securityFeatures = [
  { icon: ShieldCheck, label: 'MFA & AAL2', sub: 'Step-up auth for sensitive actions' },
  { icon: KeyRound, label: 'Role-based access', sub: 'Granular, custom permissions' },
  { icon: Lock, label: 'Row-level isolation', sub: 'Tenant data separated at the database' },
  { icon: ScrollText, label: 'Complete audit trail', sub: 'Append-only logs on every action' },
  { icon: RotateCcw, label: 'Soft-delete & recovery', sub: 'Nothing is ever silently lost' },
  { icon: UserCheck, label: 'GDPR tools', sub: 'Data export & deletion on request' },
];

function useCountUp(target: number, duration = 2000, start = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    const startTime = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, duration, start]);
  return value;
}

function StatCounter({
  value,
  suffix = '',
  prefix = '',
  label,
  start,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  start: boolean;
}) {
  const count = useCountUp(value, 2200, start);
  return (
    <div className="text-center">
      <div className="text-3xl md:text-4xl font-bold text-gray-900 font-display">
        {prefix}{count.toLocaleString()}{suffix}
      </div>
      <div className="text-sm text-gray-500 mt-1">{label}</div>
    </div>
  );
}

export default function FinanceDemo() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [progressKey, setProgressKey] = useState(0);
  const [heroVisible, setHeroVisible] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const [nodesVisible, setNodesVisible] = useState(false);
  const [featuresVisible, setFeaturesVisible] = useState(false);
  const [activeFlyIn, setActiveFlyIn] = useState<number[]>([]);
  const statsRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStatsVisible(true);
      },
      { threshold: 0.4 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNodesVisible(true);
          featureNodes.forEach((_, i) => {
            setTimeout(() => setActiveFlyIn((prev) => [...prev, i]), i * 180);
          });
        }
      },
      { threshold: 0.2 }
    );
    if (canvasRef.current) observer.observe(canvasRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setFeaturesVisible(true);
      },
      { threshold: 0.1 }
    );
    if (featuresRef.current) observer.observe(featuresRef.current);
    return () => observer.disconnect();
  }, []);

  const goTo = useCallback((idx: number) => {
    setActiveIndex(idx);
    setProgressKey((k) => k + 1);
  }, []);

  const goNext = useCallback(() => {
    setActiveIndex((i) => (i + 1) % screenshots.length);
    setProgressKey((k) => k + 1);
  }, []);

  const goPrev = useCallback(() => {
    setActiveIndex((i) => (i - 1 + screenshots.length) % screenshots.length);
    setProgressKey((k) => k + 1);
  }, []);

  useEffect(() => {
    if (autoRef.current) clearInterval(autoRef.current);
    if (!isAutoPlaying) return;
    autoRef.current = setInterval(() => {
      setActiveIndex((i) => (i + 1) % screenshots.length);
      setProgressKey((k) => k + 1);
    }, 5000);
    return () => {
      if (autoRef.current) clearInterval(autoRef.current);
    };
  }, [isAutoPlaying, activeIndex]);

  const current = screenshots[activeIndex];

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #f6fbff 0%, #ffffff 45%, #ffffff 100%)' }}>
      <FinanceDemoNav />

      {/* HERO */}
      <section className="relative min-h-[80vh] flex flex-col items-center justify-center overflow-hidden pt-16 pb-16 px-6">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full opacity-[0.10]"
            style={{ background: 'radial-gradient(ellipse, #10b981 0%, transparent 65%)' }}
          />
          <div
            className="absolute bottom-0 left-1/4 w-[500px] h-[400px] rounded-full opacity-[0.07]"
            style={{ background: 'radial-gradient(ellipse, #0ea5e9 0%, transparent 65%)' }}
          />
          <div
            className="absolute bottom-0 right-1/4 w-[400px] h-[350px] rounded-full opacity-[0.07]"
            style={{ background: 'radial-gradient(ellipse, #06b6d4 0%, transparent 65%)' }}
          />
          <svg className="absolute inset-0 w-full h-full opacity-[0.10]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#10b981" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="relative z-10 text-center max-w-5xl mx-auto">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-sm font-medium mb-8"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'none' : 'translateY(16px)',
              transition: 'all 0.6s ease-out',
            }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            Live · FinanceOS — All-in-One Accounting & ERP
          </div>

          <h1
            className="font-display text-5xl md:text-7xl font-bold text-gray-900 leading-[1.05] mb-6"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'none' : 'translateY(32px)',
              transition: 'all 0.8s cubic-bezier(0.22,1,0.36,1) 0.1s',
            }}
          >
            The operating system for your{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #10b981 0%, #06b6d4 50%, #0ea5e9 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              business finances
            </span>
          </h1>

          <p
            className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'none' : 'translateY(24px)',
              transition: 'all 0.8s cubic-bezier(0.22,1,0.36,1) 0.25s',
            }}
          >
            Accounting, invoicing, inventory, payroll, HR and compliance — unified on one
            cloud platform. Real-time data, multi-currency, and country-specific tax built in,
            wrapped in bank-grade security.
          </p>

          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'none' : 'translateY(20px)',
              transition: 'all 0.8s cubic-bezier(0.22,1,0.36,1) 0.4s',
            }}
          >
            <a
              href="https://finance.flowza.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center gap-2.5 px-8 py-4 rounded-full font-semibold text-white text-base overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(16,185,129,0.5)]"
              style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}
            >
              <span className="relative z-10">Start Free Trial</span>
              <ArrowRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-white/15 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </a>
            <a
              href="#showcase"
              className="flex items-center gap-2.5 px-8 py-4 rounded-full font-semibold text-gray-700 text-base border border-gray-200 hover:border-emerald-500/50 hover:text-gray-900 hover:bg-gray-50 transition-all duration-300"
            >
              <Play size={15} />
              Watch Demo
            </a>
          </div>

          <div
            ref={statsRef}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-12 border-t border-gray-200 max-w-2xl mx-auto"
            style={{ opacity: heroVisible ? 1 : 0, transition: 'all 0.8s ease-out 0.6s' }}
          >
            <StatCounter value={40} suffix="+" label="Functional modules" start={statsVisible} />
            <StatCounter value={85} suffix="%" label="Less manual work" start={statsVisible} />
            <StatCounter value={4} suffix="" label="Countries compliant" start={statsVisible} />
            <StatCounter value={99} suffix="%" label="Uptime SLA" start={statsVisible} />
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-gray-400 text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-gray-300 to-transparent" />
        </div>
      </section>

      {/* FEATURES FLYING IN CANVAS */}
      <section id="showcase" className="relative py-24 px-6 overflow-hidden" ref={canvasRef}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-[0.04] border border-emerald-500" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.06] border border-emerald-500/50" />
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2
              className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-4"
              style={{
                opacity: nodesVisible ? 1 : 0,
                transform: nodesVisible ? 'none' : 'translateY(24px)',
                transition: 'all 0.7s ease-out',
              }}
            >
              Everything Your Business Needs
            </h2>
            <p
              className="text-gray-500 text-lg max-w-xl mx-auto"
              style={{
                opacity: nodesVisible ? 1 : 0,
                transform: nodesVisible ? 'none' : 'translateY(16px)',
                transition: 'all 0.7s ease-out 0.15s',
              }}
            >
              Ten powerful modules, unified in one intelligent platform
            </p>
          </div>

          {/* CENTRAL CANVAS */}
          <div
            className="relative flex items-center justify-center"
            style={{ minHeight: 860 }}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            {/* Left nodes — spaced to align within the screenshot frame */}
            {featureNodes.filter((_, i) => i % 2 === 0).map((node, idx) => {
              const realIdx = idx * 2;
              const Icon = node.icon;
              const topOffsets = [80, 200, 320, 440, 560];
              return (
                <div
                  key={node.label}
                  className="absolute left-0 z-20"
                  style={{
                    top: topOffsets[idx],
                    opacity: activeFlyIn.includes(realIdx) ? 1 : 0,
                    transform: activeFlyIn.includes(realIdx) ? 'translateX(0)' : 'translateX(-120px)',
                    transition: 'all 0.7s cubic-bezier(0.22,1,0.36,1)',
                  }}
                >
                  <div
                    className="group relative flex items-center gap-3 px-4 py-3 rounded-2xl border cursor-pointer transition-all duration-300 hover:-translate-y-1"
                    style={{
                      background: `linear-gradient(135deg, ${node.color}15, ${node.color}08)`,
                      borderColor: `${node.color}40`,
                    }}
                    onClick={() => goTo(node.screenshotIdx)}
                  >
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: `${node.color}20`, border: `1px solid ${node.color}40` }}
                    >
                      <Icon size={16} style={{ color: node.color }} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 leading-tight">{node.label}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{node.sub}</p>
                    </div>
                    <div
                      className="absolute left-full top-1/2 -translate-y-px pointer-events-none"
                      style={{
                        width: 'clamp(40px, 8vw, 120px)',
                        height: 1,
                        background: `linear-gradient(to right, ${node.color}60, ${node.color}20)`,
                      }}
                    />
                  </div>
                </div>
              );
            })}

            {/* Right nodes — spaced to align within the screenshot frame */}
            {featureNodes.filter((_, i) => i % 2 === 1).map((node, idx) => {
              const realIdx = idx * 2 + 1;
              const Icon = node.icon;
              const topOffsets = [80, 200, 320, 440, 560];
              return (
                <div
                  key={node.label}
                  className="absolute right-0 z-20"
                  style={{
                    top: topOffsets[idx],
                    opacity: activeFlyIn.includes(realIdx) ? 1 : 0,
                    transform: activeFlyIn.includes(realIdx) ? 'translateX(0)' : 'translateX(120px)',
                    transition: 'all 0.7s cubic-bezier(0.22,1,0.36,1)',
                  }}
                >
                  <div
                    className="group relative flex items-center gap-3 px-4 py-3 rounded-2xl border cursor-pointer transition-all duration-300 hover:-translate-y-1"
                    style={{
                      background: `linear-gradient(135deg, ${node.color}15, ${node.color}08)`,
                      borderColor: `${node.color}40`,
                    }}
                    onClick={() => goTo(node.screenshotIdx)}
                  >
                    <div
                      className="absolute right-full top-1/2 -translate-y-px pointer-events-none"
                      style={{
                        width: 'clamp(40px, 8vw, 120px)',
                        height: 1,
                        background: `linear-gradient(to left, ${node.color}60, ${node.color}20)`,
                      }}
                    />
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: `${node.color}20`, border: `1px solid ${node.color}40` }}
                    >
                      <Icon size={16} style={{ color: node.color }} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 leading-tight">{node.label}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{node.sub}</p>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Central Device Frame */}
            <div
              className="relative z-10 mx-auto w-full"
              style={{
                maxWidth: 620,
                marginLeft: 260,
                marginRight: 260,
                alignSelf: 'flex-start',
                marginTop: 60,
                opacity: nodesVisible ? 1 : 0,
                transform: nodesVisible ? 'none' : 'scale(0.92)',
                transition: 'all 0.9s cubic-bezier(0.22,1,0.36,1) 0.3s',
              }}
            >
              <div
                className="rounded-2xl overflow-hidden border"
                style={{
                  borderColor: `${current.color}30`,
                  boxShadow: `0 0 60px ${current.color}12, 0 1px 3px rgba(15,23,42,0.06), 0 12px 36px rgba(15,23,42,0.08)`,
                  transition: 'border-color 0.5s, box-shadow 0.5s',
                }}
              >
                <div
                  className="flex items-center gap-2 px-4 py-3 border-b"
                  style={{ background: '#ffffff', borderColor: `${current.color}20`, transition: 'border-color 0.5s' }}
                >
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <div className="flex-1 mx-4">
                    <div
                      className="h-6 rounded-lg flex items-center justify-center text-gray-500 text-xs"
                      style={{ background: '#f1f5f9', border: '1px solid #e2e8f0' }}
                    >
                      finance.flowza.ai · {current.label}
                    </div>
                  </div>
                  <div
                    className="w-6 h-6 rounded-md flex items-center justify-center"
                    style={{ background: `${current.color}20`, transition: 'background 0.5s' }}
                  >
                    <current.icon size={12} style={{ color: current.color, transition: 'color 0.5s' }} />
                  </div>
                </div>

                <div className="relative" style={{ background: '#f8f9fa' }}>
                  {screenshots.map((s, i) => (
                    <img
                      key={s.id}
                      src={s.image}
                      alt={s.label}
                      className="w-full h-auto block"
                      style={{
                        opacity: i === activeIndex ? 1 : 0,
                        position: i === activeIndex ? 'relative' : 'absolute',
                        top: 0,
                        left: 0,
                        transition: 'opacity 0.7s cubic-bezier(0.4,0,0.2,1)',
                      }}
                    />
                  ))}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: `linear-gradient(to top, ${current.color}08, transparent 30%)`,
                      transition: 'background 0.5s',
                    }}
                  />
                </div>

                <div className="h-0.5 w-full" style={{ background: 'rgba(15,23,42,0.06)' }}>
                  {isAutoPlaying && (
                    <div
                      key={`${progressKey}-${activeIndex}`}
                      className="h-full"
                      style={{
                        background: `linear-gradient(to right, ${current.color}, ${current.color}80)`,
                        animation: 'fdProgress 5s linear forwards',
                      }}
                    />
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between mt-4 px-2">
                <button
                  onClick={goPrev}
                  className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:border-gray-300 transition-all duration-200"
                >
                  <ChevronLeft size={16} />
                </button>

                <div className="flex items-center gap-2">
                  {screenshots.map((s, i) => (
                    <button
                      key={s.id}
                      onClick={() => goTo(i)}
                      className="transition-all duration-300 rounded-full"
                      style={{
                        width: i === activeIndex ? 24 : 8,
                        height: 8,
                        background: i === activeIndex ? current.color : 'rgba(15,23,42,0.15)',
                      }}
                    />
                  ))}
                </div>

                <button
                  onClick={goNext}
                  className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:border-gray-300 transition-all duration-200"
                >
                  <ChevronRight size={16} />
                </button>
              </div>

              <div className="text-center mt-3">
                <p className="text-sm font-semibold" style={{ color: current.color, transition: 'color 0.5s' }}>
                  {current.label}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">{current.description}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SCROLL FEATURE DEEP DIVE */}
      <section className="py-24 px-6" ref={featuresRef}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2
              className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-4"
              style={{
                opacity: featuresVisible ? 1 : 0,
                transform: featuresVisible ? 'none' : 'translateY(24px)',
                transition: 'all 0.7s ease-out',
              }}
            >
              Deep Dive Into Every Feature
            </h2>
            <p
              className="text-gray-500 text-lg"
              style={{ opacity: featuresVisible ? 1 : 0, transition: 'all 0.7s ease-out 0.15s' }}
            >
              Real screens from the product — nine core modules in action
            </p>
          </div>

          <div className="space-y-32">
            {screenshots.map((s, i) => {
              const Icon = s.icon;
              const isEven = i % 2 === 0;
              return (
                <div
                  key={s.id}
                  className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-16`}
                  style={{
                    opacity: featuresVisible ? 1 : 0,
                    transform: featuresVisible ? 'none' : 'translateY(40px)',
                    transition: `all 0.8s cubic-bezier(0.22,1,0.36,1) ${0.1 + i * 0.12}s`,
                  }}
                >
                  <div className="flex-1 w-full">
                    <div
                      className="relative rounded-2xl overflow-hidden"
                      style={{
                        border: `1px solid ${s.color}20`,
                        boxShadow: `0 0 60px ${s.color}10, 0 1px 3px rgba(15,23,42,0.06), 0 12px 36px rgba(15,23,42,0.08)`,
                      }}
                    >
                      <div
                        className="flex items-center gap-1.5 px-3 py-2.5 border-b"
                        style={{ background: '#ffffff', borderColor: `${s.color}20` }}
                      >
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                        <span className="ml-2 text-xs text-gray-500">{s.label}</span>
                      </div>
                      <img
                        src={s.image}
                        alt={s.label}
                        className="w-full h-auto block"
                        style={{ background: '#f8f9fa' }}
                      />
                      <div
                        className="absolute inset-0 pointer-events-none rounded-2xl"
                        style={{ background: `linear-gradient(135deg, ${s.color}05, transparent)` }}
                      />
                    </div>
                  </div>

                  <div className="flex-1 w-full">
                    <div
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-medium mb-4"
                      style={{ borderColor: `${s.color}40`, background: `${s.color}10`, color: s.color }}
                    >
                      <Icon size={14} />
                      {s.label}
                    </div>
                    <h3 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                      {s.description}
                    </h3>
                    <ul className="space-y-3 mb-8">
                      {s.features.map((f) => (
                        <li key={f} className="flex items-center gap-3 text-gray-600">
                          <div
                            className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                            style={{ background: `${s.color}20`, border: `1px solid ${s.color}40` }}
                          >
                            <Check size={11} style={{ color: s.color }} />
                          </div>
                          <span className="text-sm">{f}</span>
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={() => {
                        goTo(i);
                        document.getElementById('showcase')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-200 hover:gap-3"
                      style={{ color: s.color }}
                    >
                      View in demo
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* BACK-OFFICE BREADTH */}
      <section className="py-24 px-6 border-t border-gray-200 bg-[#f8fafc]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 text-xs font-semibold mb-5">
              <Layers size={13} />
              The whole back office
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Far more than accounting
            </h2>
            <p className="text-gray-500 text-lg">
              FinanceOS replaces the five tools you're stitching together — sales, purchases,
              inventory, accounting, payroll and HR, unified on one ledger.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {backOfficeModules.map((m) => {
              const Icon = m.icon;
              return (
                <div
                  key={m.title}
                  className="group bg-white rounded-2xl p-6 border transition-all duration-300 hover:-translate-y-1"
                  style={{ borderColor: `${m.color}20`, boxShadow: '0 1px 3px rgba(15,23,42,0.04)' }}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: `${m.color}15`, border: `1px solid ${m.color}30` }}
                  >
                    <Icon size={20} style={{ color: m.color }} />
                  </div>
                  <h3 className="font-display text-lg font-bold text-gray-900">{m.title}</h3>
                  <p className="text-sm font-medium mb-4" style={{ color: m.color }}>{m.hook}</p>
                  <ul className="space-y-2.5">
                    {m.points.map((p) => (
                      <li key={p} className="flex items-start gap-2.5 text-sm text-gray-600">
                        <Check size={14} className="mt-0.5 shrink-0" style={{ color: m.color }} />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* MULTI-COUNTRY COMPLIANCE */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 text-xs font-semibold mb-5">
              <Globe size={13} />
              Built-in compliance
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Compliant in India and the Gulf — out of the box
            </h2>
            <p className="text-gray-500 text-lg">
              Country-specific tax engines, chart-of-accounts packs and statutory payroll.
              Not bolt-ons — built in.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {complianceCountries.map((c) => (
              <div
                key={c.name}
                className="rounded-2xl p-6 border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/40"
                style={{ boxShadow: '0 1px 3px rgba(15,23,42,0.04)' }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-3xl leading-none">{c.flag}</span>
                  <span className="font-display text-xl font-bold text-gray-900">{c.name}</span>
                </div>
                <ul className="space-y-2.5">
                  {c.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-gray-600">
                      <Check size={14} className="mt-0.5 shrink-0 text-emerald-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INTEGRATIONS */}
      <section className="py-24 px-6 border-y border-gray-200 bg-[#f8fafc]">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 text-xs font-semibold mb-5">
            <Repeat size={13} />
            Integrations & automation
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Connect the tools you already use
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto mb-12">
            Stripe, PayPal, WhatsApp, Slack, email and biometric devices — plus a one-click
            wizard to migrate from Zoho. Then let automation handle the routine.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {integrations.map((i) => {
              const Icon = i.icon;
              return (
                <div
                  key={i.label}
                  className="inline-flex items-center gap-2.5 px-5 py-3 rounded-full bg-white border border-gray-200 text-sm font-medium text-gray-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-500/40 hover:text-gray-900"
                >
                  <Icon size={16} className="text-emerald-500" />
                  {i.label}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECURITY & TRUST */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 text-xs font-semibold mb-5">
              <Shield size={13} />
              Security & trust
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Bank-grade security on every action
            </h2>
            <p className="text-gray-500 text-lg">
              MFA, granular permissions, complete audit logs and tenant-isolated data —
              your books are safe.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {securityFeatures.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.label}
                  className="flex items-start gap-4 rounded-2xl p-6 border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/40"
                  style={{ boxShadow: '0 1px 3px rgba(15,23,42,0.04)' }}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: '#10b98115', border: '1px solid #10b98130' }}
                  >
                    <Icon size={20} className="text-emerald-500" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{s.label}</p>
                    <p className="text-sm text-gray-500 mt-0.5">{s.sub}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center gap-1 mb-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={18} fill="#10b981" style={{ color: '#10b981' }} />
            ))}
          </div>
          <blockquote className="text-2xl md:text-3xl font-display font-semibold text-gray-900 leading-relaxed mb-8">
            "FlowZa Finance transformed our entire accounting workflow. What used to take our team
            a full week every month now completes automatically in hours."
          </blockquote>
          <div className="flex items-center justify-center gap-3">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold text-white"
              style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}
            >
              AO
            </div>
            <div className="text-left">
              <p className="font-semibold text-gray-900 text-sm">Amara Osei</p>
              <p className="text-gray-500 text-xs">CFO, Brightline Retail Group</p>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="py-24 px-6 border-t border-gray-200 bg-[#f8fafc]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 text-xs font-semibold mb-5">
              <DollarSign size={13} />
              Pricing
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Simple plans that scale with you
            </h2>
            <p className="text-gray-500 text-lg">
              Start free. Upgrade when you're ready. Cancel anytime.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
                className="relative rounded-2xl p-8 bg-white border transition-all duration-300 hover:-translate-y-1"
                style={{
                  borderColor: plan.highlighted ? '#10b981' : '#e5e7eb',
                  boxShadow: plan.highlighted
                    ? '0 0 0 1px #10b981, 0 20px 40px rgba(16,185,129,0.12)'
                    : '0 1px 3px rgba(15,23,42,0.04)',
                }}
              >
                {plan.highlighted && (
                  <div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-semibold text-white"
                    style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}
                  >
                    Most Popular
                  </div>
                )}
                <h3 className="font-display text-xl font-bold text-gray-900">{plan.name}</h3>
                <p className="text-sm text-gray-500 mt-1 mb-5 min-h-[40px]">{plan.description}</p>
                <div className="flex items-baseline gap-1 mb-6">
                  {plan.price === 'Custom' ? (
                    <span className="font-display text-4xl font-bold text-gray-900">Custom</span>
                  ) : (
                    <>
                      <span className="text-2xl font-semibold text-gray-900">$</span>
                      <span className="font-display text-5xl font-bold text-gray-900">{plan.price}</span>
                      <span className="text-gray-500">{plan.period}</span>
                    </>
                  )}
                </div>
                <a
                  href={plan.price === 'Custom' ? 'https://web.whatsapp.com/send?phone=96892107562&text=Hello! FlowZa' : 'https://finance.flowza.ai'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5 mb-6"
                  style={
                    plan.highlighted
                      ? { background: 'linear-gradient(135deg, #10b981, #059669)', color: '#fff' }
                      : { background: '#f1f5f9', color: '#0f172a', border: '1px solid #e2e8f0' }
                  }
                >
                  {plan.cta}
                </a>
                <ul className="space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-gray-600">
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                        style={{ background: '#10b98120', border: '1px solid #10b98140' }}
                      >
                        <Check size={11} className="text-emerald-600" />
                      </div>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="text-center text-sm text-gray-500 mt-10">
            Need more? <span className="font-semibold text-gray-700">Enterprise Plus</span> offers
            custom quotes, term discounts and dedicated pricing.
          </p>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full opacity-[0.08]"
            style={{ background: 'radial-gradient(ellipse, #10b981 0%, transparent 65%)' }}
          />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h2 className="font-display text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Ready to run your<br />whole back office?
          </h2>
          <p className="text-lg text-gray-600 mb-10">
            Join 100+ businesses running accounting, inventory, payroll and HR on one platform.
            No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://finance.flowza.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center gap-2.5 px-10 py-4 rounded-full font-bold text-white text-base overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_60px_rgba(16,185,129,0.6)]"
              style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}
            >
              <span className="relative z-10">Get Started Free</span>
              <ArrowRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-white/15 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </a>
            <a
              href="https://web.whatsapp.com/send?phone=96892107562&text=Hello! FlowZa"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-emerald-400 text-base border border-emerald-500/30 hover:border-emerald-500/60 hover:bg-emerald-500/10 transition-all duration-300"
            >
              <MessageCircle size={16} />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      <FinanceDemoFooter />

      <style>{`
        @keyframes fdProgress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
}

function FinanceDemoNav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4">
      <nav
        className={`w-full max-w-6xl rounded-2xl border px-5 py-3 flex items-center justify-between transition-all duration-500 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-2xl border-emerald-200/70 shadow-[0_4px_24px_rgba(16,185,129,0.12)]'
            : 'bg-white/70 backdrop-blur-md border-gray-200/80'
        }`}
      >
        <div className="flex items-center gap-3">
          <a href="https://flowza.ai/products/finance" className="flex items-center gap-1.5 text-gray-500 hover:text-gray-900 transition-colors text-sm">
            <ArrowLeft size={14} />
            <span>FlowZa</span>
          </a>
          <span className="text-gray-300">/</span>
          <div className="flex items-center gap-2">
            <div
              className="w-5 h-5 rounded-md flex items-center justify-center"
              style={{ background: '#10b98120', border: '1px solid #10b98140' }}
            >
              <DollarSign size={11} style={{ color: '#10b981' }} />
            </div>
            <span className="text-sm font-semibold text-gray-900">FlowZa Finance</span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <a href="#showcase" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
            Product Tour
          </a>
        </div>

        <a
          href="https://finance.flowza.ai"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]"
          style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}
        >
          Start Free
          <ArrowRight size={13} />
        </a>
      </nav>
    </header>
  );
}

function FinanceDemoFooter() {
  return (
    <footer
      className="border-t py-10 px-6"
      style={{ borderColor: '#e2e8f0', background: '#f8fafc' }}
    >
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-xl overflow-hidden">
            <img src="/Logo_Final_-_Focused.jpeg" alt="FlowZa" className="w-full h-full object-cover" />
          </div>
          <span className="text-gray-700 text-sm font-semibold">FlowZa Finance</span>
          <span className="text-gray-400 text-sm">· By FlowZa AI</span>
        </div>
        <div className="flex items-center gap-6">
          <Link to="/privacy" className="text-xs text-gray-500 hover:text-gray-900 transition-colors">
            Privacy
          </Link>
          <Link to="/terms" className="text-xs text-gray-500 hover:text-gray-900 transition-colors">
            Terms
          </Link>
          <Link to="/" className="text-xs text-gray-500 hover:text-gray-900 transition-colors">
            All Products
          </Link>
        </div>
        <p className="text-xs text-gray-400">© {new Date().getFullYear()} FlowZa AI. All rights reserved.</p>
      </div>
    </footer>
  );
}
