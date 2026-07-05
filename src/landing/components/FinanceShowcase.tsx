import { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, DollarSign } from 'lucide-react';
import { gsap } from '../gsapSetup';
import dashboardImg from '../../assets/01_Dashboard.png';

const features = [
  {
    title: 'One connected ledger',
    desc: 'Sales, purchases, inventory and accounting post automatically to a single double-entry ledger — no stitching tools together.',
  },
  {
    title: 'Payroll, HR & inventory',
    desc: 'Run compliant payroll, manage hire-to-retire HR and track perpetual stock — all inside the same platform.',
  },
  {
    title: 'Real-time & multi-country',
    desc: 'Live P&L and cash-flow with multi-currency, plus GST and Gulf VAT compliance built in.',
  },
];

const kpis = [
  { label: 'Invoice accuracy', value: '98%', className: 'fz-kpi-1' },
  { label: 'Saved per week', value: '12h', className: 'fz-kpi-2' },
  { label: 'Cost reduction', value: '40%', className: 'fz-kpi-3' },
];

export default function FinanceShowcase() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.from('[data-fin-copy] > *', {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.09,
        ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 68%' },
      });

      gsap.fromTo(
        '[data-fin-visual]',
        { y: 90, opacity: 0, rotateX: 8 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 62%' },
        }
      );

      // slow drift while the section is in view
      gsap.fromTo(
        '[data-fin-visual]',
        { yPercent: 4 },
        {
          yPercent: -6,
          ease: 'none',
          scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 1.2 },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="flagship"
      ref={sectionRef}
      className="relative overflow-hidden py-28 sm:py-36 fz-hairline-t"
      style={{
        background:
          'radial-gradient(ellipse 70% 55% at 85% 30%, rgba(16, 185, 129, 0.1) 0%, transparent 60%), linear-gradient(180deg, var(--fz-ink) 0%, #03100c 50%, var(--fz-ink) 100%)',
      }}
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 grid lg:grid-cols-2 gap-16 lg:gap-12 items-center">
        <div data-fin-copy>
          <p className="fz-eyebrow mb-6" style={{ color: '#4ade80' }}>
            Flagship — live now
          </p>

          <h2 className="fz-display font-bold text-white leading-[1.02] mb-6" style={{ fontSize: 'clamp(38px, 5.4vw, 72px)' }}>
            Flowza{' '}
            <em className="fz-serif" style={{ color: '#34d399' }}>
              Finance
            </em>
          </h2>

          <p className="text-base sm:text-lg leading-relaxed max-w-[52ch] mb-10" style={{ color: 'var(--fz-muted)' }}>
            The all-in-one finance operating system for SMEs to enterprises — accounting, inventory,
            payroll, HR and compliance in one platform, with real-time data and none of the enterprise price tag.
          </p>

          <div className="flex flex-col gap-6 mb-11">
            {features.map((f) => (
              <div key={f.title} className="flex gap-4">
                <span
                  className="w-px shrink-0 mt-1"
                  style={{ background: 'linear-gradient(180deg, #10b981, transparent)', minHeight: '44px' }}
                />
                <div>
                  <h3 className="fz-display font-semibold text-white text-[15px] mb-1">{f.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--fz-muted)' }}>
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <Link
            to="/products/finance"
            className="fz-btn no-underline group"
            data-cursor
            style={{
              color: '#021c12',
              background: 'linear-gradient(120deg, #6ee7b7 0%, #34d399 40%, #10b981 100%)',
              boxShadow: '0 0 0 1px rgba(110, 231, 183, 0.3), 0 10px 44px rgba(16, 185, 129, 0.3)',
            }}
          >
            Explore Flowza Finance
            <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="relative" style={{ perspective: '1200px' }}>
          <div data-fin-visual className="relative">
            {kpis.map((k) => (
              <div key={k.label} className={`fz-kpi ${k.className}`}>
                <span className="fz-display font-bold text-xl" style={{ color: '#34d399' }}>
                  {k.value}
                </span>
                <span className="text-[10px] uppercase tracking-[0.18em]" style={{ color: 'var(--fz-muted)' }}>
                  {k.label}
                </span>
              </div>
            ))}

            <div className="fz-finance-frame">
              <div
                className="flex items-center gap-1.5 px-4 py-3"
                style={{ borderBottom: '1px solid rgba(16,185,129,0.18)', background: 'rgba(16,185,129,0.05)' }}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
                <span className="ml-3 inline-flex items-center gap-1.5 text-[11px] font-medium" style={{ color: 'var(--fz-muted)' }}>
                  <DollarSign size={11} style={{ color: '#34d399' }} />
                  finance.flowza.ai
                </span>
              </div>
              <img src={dashboardImg} alt="Flowza Finance dashboard — live P&L, invoices and cash-flow reporting" loading="lazy" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
