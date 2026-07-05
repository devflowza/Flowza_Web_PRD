import { MessageCircle, ArrowRight, ShieldCheck, Activity, Zap, ShoppingCart, Truck, Flower2, Crown, TrendingUp } from 'lucide-react';
import { WHATSAPP_URL, TRIAL_URL } from '../data';
import { productImages } from '../../assets/productImages';

const featurePills = [
  { icon: ShieldCheck, label: 'SOC 2 Compliant' },
  { icon: Activity, label: '99.9% Uptime SLA' },
  { icon: Zap, label: 'Go live in hours' },
];

const industries = [
  { icon: ShoppingCart, label: 'Retail' },
  { icon: Truck, label: 'Logistics' },
  { icon: Flower2, label: 'Wellness' },
  { icon: Crown, label: 'Clubs' },
];

/** Home hero: left copy + CTAs, right product screenshot card with floating stat badge. */
export default function HomeHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/70 via-slate-50 to-white">
      <div className="absolute inset-0 fx-grid fx-grid-fade pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-14 pb-16 lg:pt-20 lg:pb-24 grid lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-10 items-center">
        {/* Copy */}
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-white border border-blue-100 shadow-sm px-4 py-1.5 text-sm font-medium text-blue-700 mb-7">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            Trusted by 100+ businesses across MEA &amp; India
          </span>

          <h1 className="font-bold text-slate-900 text-[42px] sm:text-5xl lg:text-[58px] leading-[1.06] tracking-tight">
            One Platform.
            <br />
            <span className="fx-gradient-text">Infinite Flow.</span>
          </h1>

          <p className="mt-5 text-lg font-semibold text-blue-600">
            Finance · Logistics · Wellness · Fleet · Retail · Clubs
          </p>

          <p className="mt-4 max-w-xl text-gray-600 leading-relaxed">
            Seven purpose-built AI systems on one operating fabric. Flowza quietly automates
            the busywork — invoices, routes, rosters, stock — so a team of ten can move like
            a team of fifty.
          </p>

          <div className="mt-6 flex flex-wrap gap-2.5">
            {featurePills.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 rounded-full bg-white border border-gray-200 px-3.5 py-1.5 text-[13px] font-medium text-slate-700 shadow-sm"
              >
                <Icon size={13} className="text-blue-600" />
                {label}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-3">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25d366] text-white text-sm font-semibold px-6 py-3.5 shadow-[0_6px_18px_rgba(37,211,102,0.35)] hover:shadow-[0_8px_24px_rgba(37,211,102,0.5)] hover:-translate-y-px transition-all"
            >
              <MessageCircle size={16} />
              WhatsApp
            </a>
            <a
              href={TRIAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 text-white text-sm font-semibold px-6 py-3.5 shadow-[0_6px_18px_rgba(37,99,235,0.35)] hover:bg-blue-700 hover:shadow-[0_8px_24px_rgba(37,99,235,0.45)] hover:-translate-y-px transition-all"
            >
              Start Free Trial
              <ArrowRight size={15} />
            </a>
            <a
              href="#platforms"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white border border-gray-200 text-slate-800 text-sm font-semibold px-6 py-3.5 shadow-sm hover:border-blue-300 hover:text-blue-700 transition-all"
            >
              Explore Platforms
            </a>
          </div>

          <div className="mt-9 pt-6 border-t border-gray-200/80">
            <p className="text-xs font-medium text-gray-400 mb-3">Trusted across industries:</p>
            <div className="flex flex-wrap gap-2.5">
              {industries.map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-2 rounded-lg bg-white border border-gray-200 px-3.5 py-2 text-[13px] font-medium text-slate-700 shadow-sm"
                >
                  <Icon size={14} className="text-blue-600" />
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Visual */}
        <div className="relative lg:pl-4">
          <div className="relative rounded-2xl overflow-hidden shadow-[0_24px_70px_rgba(15,23,42,0.22)] ring-1 ring-slate-900/5 bg-white">
            <img
              src={productImages.finance}
              alt="Flowza Finance live dashboard"
              className="w-full h-[320px] sm:h-[420px] object-cover object-left-top"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-950/85 via-navy-950/40 to-transparent pt-16 pb-4 px-5">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 px-3 py-1 text-[11px] font-semibold text-white mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Live Platform
              </span>
              <p className="text-white font-bold text-lg leading-tight">Flowza Finance</p>
              <p className="text-white/70 text-sm">Real-time dashboards · Accounting, payroll &amp; compliance</p>
            </div>
          </div>

          {/* Floating stat badge */}
          <div className="absolute -top-5 -right-2 sm:-right-5 rounded-2xl bg-white shadow-[0_12px_36px_rgba(15,23,42,0.16)] border border-gray-100 px-4 py-3 flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center">
              <TrendingUp size={17} className="text-emerald-500" />
            </span>
            <span>
              <span className="block font-bold text-slate-900 text-lg leading-none">94%</span>
              <span className="block text-xs text-gray-500 mt-1">Automation rate</span>
            </span>
          </div>

          {/* Floating uptime badge */}
          <div className="absolute -bottom-5 -left-2 sm:-left-5 rounded-2xl bg-white shadow-[0_12px_36px_rgba(15,23,42,0.16)] border border-gray-100 px-4 py-3 flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center">
              <Activity size={17} className="text-blue-600" />
            </span>
            <span>
              <span className="block font-bold text-slate-900 text-lg leading-none">99.9%</span>
              <span className="block text-xs text-gray-500 mt-1">Uptime SLA</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
