import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Reveal from '../Reveal';
import dashboardImg from '../../assets/01_Dashboard.png';

const capabilities = [
  {
    title: 'One connected ledger',
    subtitle: 'Sales, purchases, inventory and accounting post automatically — nothing to stitch together.',
  },
  {
    title: 'Payroll, HR & inventory',
    subtitle: 'Compliant payroll, hire-to-retire HR and perpetual stock inside the same platform.',
  },
  {
    title: 'Real-time, multi-country',
    subtitle: 'Live P&L and cash flow with multi-currency, GST and Gulf VAT built in — not bolted on.',
  },
];

const kpis = [
  { value: '98%', label: 'invoice accuracy' },
  { value: '12 hrs', label: 'saved per week' },
  { value: '40%', label: 'lower admin cost' },
];

/** Flagship chapter: full-bleed ink section with the live dashboard in a glass frame. */
export default function FinanceSpotlight() {
  return (
    <section className="relative overflow-hidden bg-ink px-4 py-24 text-white sm:px-6 sm:py-32 grain">
      <div className="pointer-events-none absolute inset-0 wash-ink" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid items-end gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <Reveal>
            <span className="eyebrow eyebrow-light">Flagship · FlowZa Finance</span>
            <h2 className="display-title mt-6 text-[2rem] text-white sm:text-[2.6rem] lg:text-[3.2rem]">
              Your entire back office, live on one screen.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="max-w-md text-base leading-relaxed text-white/60 sm:text-lg">
              Accounting, invoicing, inventory, payroll, HR and compliance — unified in
              one cloud platform with real-time data and bank-grade security.
            </p>
            <Link
              to="/products/finance"
              className="group mt-7 inline-flex items-center gap-2.5 text-[15px] font-semibold text-white"
            >
              Explore FlowZa Finance
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 transition-all duration-300 ease-swift group-hover:translate-x-1 group-hover:bg-white group-hover:text-ink">
                <ArrowRight size={14} />
              </span>
            </Link>
          </Reveal>
        </div>

        {/* Dashboard in glass frame */}
        <Reveal className="mt-14 sm:mt-20">
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute -inset-x-10 -top-12 bottom-0 bg-[radial-gradient(55%_55%_at_50%_20%,rgba(92,129,255,0.16)_0%,transparent_70%)]"
            />
            <div className="bezel-dark relative shadow-frame">
              <div className="bezel-inner">
                <img
                  src={dashboardImg}
                  alt="FlowZa Finance dashboard — live P&L, receivables, payables and cash flow"
                  loading="lazy"
                  width="1510"
                  height="1013"
                  className="block w-full"
                />
              </div>
            </div>

            {/* KPI chips over the frame edge */}
            <div className="relative -mt-8 flex flex-wrap justify-center gap-3.5 px-4 sm:absolute sm:bottom-8 sm:left-1/2 sm:mt-0 sm:-translate-x-1/2 sm:px-0">
              {kpis.map((k) => (
                <div
                  key={k.label}
                  className="flex items-baseline gap-2 rounded-2xl bg-ink/85 px-5 py-3.5 ring-1 ring-white/15 backdrop-blur-xl"
                >
                  <span className="tabular font-display text-lg font-bold leading-none text-white">{k.value}</span>
                  <span className="text-[12px] font-medium text-white/60">{k.label}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Capability rows */}
        <div className="mt-16 grid gap-x-12 gap-y-10 sm:mt-20 md:grid-cols-3">
          {capabilities.map((c, i) => (
            <Reveal key={c.title} delay={i * 100}>
              <article className="border-t border-white/15 pt-6">
                <h3 className="font-display text-lg font-bold tracking-snug text-white">{c.title}</h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-white/55">{c.subtitle}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
