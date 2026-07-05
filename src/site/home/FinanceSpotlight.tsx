import { Link } from 'react-router-dom';
import { ArrowRight, BookOpenCheck, Users, Globe2 } from 'lucide-react';
import SectionHeading from '../SectionHeading';
import Reveal from '../Reveal';
import dashboardImg from '../../assets/01_Dashboard.png';

const capabilities = [
  {
    icon: BookOpenCheck,
    color: '#2563eb',
    title: 'One Connected Ledger',
    subtitle: 'Sales, purchases, inventory and accounting post automatically — no stitching tools together',
  },
  {
    icon: Users,
    color: '#9333ea',
    title: 'Payroll, HR & Inventory',
    subtitle: 'Compliant payroll, hire-to-retire HR and perpetual stock in the same platform',
  },
  {
    icon: Globe2,
    color: '#10b981',
    title: 'Real-time & Multi-country',
    subtitle: 'Live P&L and cash-flow with multi-currency, GST and Gulf VAT built in',
  },
];

const kpis = [
  { value: '98%', label: 'Invoice accuracy' },
  { value: '12h', label: 'Saved per week' },
  { value: '40%', label: 'Cost reduction' },
];

/** Flagship product deep-dive: dashboard screenshot + capability cards (the reference's lab section, adapted). */
export default function FinanceSpotlight() {
  return (
    <section className="py-20 sm:py-24 px-4 sm:px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          badge="Flagship Platform"
          title="Flowza Finance — Your Entire Back Office, Live"
          subtitle="The operating system for your business finances. Accounting, invoicing, inventory, payroll, HR and compliance — unified in one cloud platform with real-time data and bank-grade security."
        />

        <div className="grid lg:grid-cols-[1.3fr_1fr] gap-10 items-center">
          {/* Screenshot card */}
          <Reveal>
            <div className="relative rounded-2xl overflow-hidden shadow-[0_24px_70px_rgba(15,23,42,0.18)] ring-1 ring-slate-900/5">
              <img
                src={dashboardImg}
                alt="Flowza Finance dashboard — live P&L, cash flow and receivables"
                className="w-full object-cover"
                loading="lazy"
              />
              <div className="absolute bottom-4 left-4 flex gap-2.5">
                {kpis.map((k) => (
                  <span
                    key={k.label}
                    className="rounded-xl bg-white/95 backdrop-blur-sm shadow-lg border border-gray-100 px-3.5 py-2 text-center"
                  >
                    <span className="block font-bold text-slate-900 text-base leading-none">{k.value}</span>
                    <span className="block text-[10px] text-gray-500 mt-1 font-medium">{k.label}</span>
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Capability cards */}
          <div className="flex flex-col gap-4">
            {capabilities.map((c, i) => {
              const Icon = c.icon;
              return (
                <Reveal key={c.title} delay={i * 100}>
                  <div
                    className="flex items-start gap-4 rounded-2xl bg-white p-5 border transition-shadow hover:shadow-md"
                    style={{ borderColor: `${c.color}40` }}
                  >
                    <span
                      className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: `${c.color}12`, border: `1px solid ${c.color}30`, color: c.color }}
                    >
                      <Icon size={19} />
                    </span>
                    <span>
                      <span className="block font-bold text-slate-900">{c.title}</span>
                      <span className="block text-sm mt-1 font-medium" style={{ color: c.color }}>
                        {c.subtitle}
                      </span>
                    </span>
                  </div>
                </Reveal>
              );
            })}
            <Reveal delay={320}>
              <Link
                to="/products/finance"
                className="inline-flex items-center gap-2 text-blue-600 font-semibold text-sm hover:text-blue-700 transition-colors mt-1"
              >
                Explore Flowza Finance <ArrowRight size={15} />
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
