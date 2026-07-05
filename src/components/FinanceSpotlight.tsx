import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, DollarSign, TrendingUp, Clock, CheckCircle2 } from 'lucide-react';

const stats = [
  { value: 98, suffix: '%', label: 'Invoice Accuracy', icon: CheckCircle2 },
  { value: 12, suffix: 'h', label: 'Saved Per Week', icon: Clock },
  { value: 40, suffix: '%', label: 'Cost Reduction', icon: TrendingUp },
];

const floatingBadges = [
  { label: 'GST + VAT', x: '-14%', y: '18%', rot: '-6deg', delay: '0s' },
  { label: 'Multi-Currency', x: '102%', y: '12%', rot: '5deg', delay: '0.4s' },
  { label: 'Payroll & HR', x: '-12%', y: '68%', rot: '-4deg', delay: '0.8s' },
  { label: 'Inventory', x: '100%', y: '62%', rot: '7deg', delay: '1.2s' },
];

function AnimatedCounter({ target, suffix, active }: { target: number; suffix: string; active: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    const duration = 1600;
    const start = performance.now();

    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(parseFloat((target * ease).toFixed(0)));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [active, target]);

  return (
    <span>
      {active ? count : 0}{suffix}
    </span>
  );
}

export default function FinanceSpotlight() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 px-6 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #ffffff 0%, #f0fdf9 16%, #ecfdf5 50%, #f0fdf9 84%, #ffffff 100%)' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(16,185,129,0.12) 0%, rgba(5,150,105,0.06) 40%, transparent 70%)',
          animation: 'spotlightGlow 4s ease-in-out infinite',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(16,185,129,0.07) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div
        className="absolute left-1/2 top-0 w-px pointer-events-none"
        style={{
          height: '120px',
          background: 'linear-gradient(to bottom, rgba(16,185,129,0.6), transparent)',
          transform: 'translateX(-50%)',
        }}
      />
      <div
        className="absolute left-1/2 bottom-0 w-px pointer-events-none"
        style={{
          height: '120px',
          background: 'linear-gradient(to top, rgba(16,185,129,0.6), transparent)',
          transform: 'translateX(-50%)',
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        <div
          className="text-center mb-20"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(32px)',
            transition: 'opacity 0.8s cubic-bezier(0.22,1,0.36,1), transform 0.8s cubic-bezier(0.22,1,0.36,1)',
          }}
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-[0.2em] uppercase mb-8"
            style={{
              background: 'rgba(16,185,129,0.12)',
              border: '1px solid rgba(16,185,129,0.35)',
              color: '#10b981',
              boxShadow: '0 0 24px rgba(16,185,129,0.15)',
            }}
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
            </span>
            New Launch
          </div>

          <div className="overflow-hidden mb-4">
            <p
              className="text-base font-semibold tracking-[0.15em] uppercase"
              style={{
                color: '#64748b',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(100%)',
                transition: 'opacity 0.7s ease 0.1s, transform 0.7s cubic-bezier(0.22,1,0.36,1) 0.1s',
              }}
            >
              Introducing
            </p>
          </div>

          <h2
            className="font-display font-black leading-none tracking-tight mb-6"
            style={{
              fontSize: 'clamp(42px, 8vw, 88px)',
              color: '#0f172a',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(24px)',
              transition: 'opacity 0.8s ease 0.2s, transform 0.8s cubic-bezier(0.22,1,0.36,1) 0.2s',
            }}
          >
            <span
              style={{
                color: '#059669',
              }}
            >
              Flowza
            </span>{' '}
            Finance
          </h2>

          <p
            className="text-lg leading-relaxed max-w-2xl mx-auto"
            style={{
              color: '#475569',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.7s ease 0.35s, transform 0.7s cubic-bezier(0.22,1,0.36,1) 0.35s',
            }}
          >
            Accounting, invoicing, inventory, payroll, HR and compliance — unified in one platform. Real-time data and bank-grade security, built for SMEs to enterprises — without the enterprise price tag.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
          <div
            className="relative flex-1 w-full max-w-md lg:max-w-none flex items-center justify-center"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateX(0)' : 'translateX(-40px)',
              transition: 'opacity 0.9s cubic-bezier(0.22,1,0.36,1) 0.3s, transform 0.9s cubic-bezier(0.22,1,0.36,1) 0.3s',
            }}
          >
            {floatingBadges.map((badge) => (
              <div
                key={badge.label}
                className="absolute z-20 px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap"
                style={{
                  left: badge.x,
                  top: badge.y,
                  background: 'rgba(16,185,129,0.15)',
                  border: '1px solid rgba(16,185,129,0.4)',
                  color: '#10b981',
                  backdropFilter: 'blur(8px)',
                  boxShadow: '0 4px 16px rgba(16,185,129,0.15)',
                  animation: visible ? `badgeFloat 3.5s ease-in-out ${badge.delay} infinite` : undefined,
                }}
              >
                {badge.label}
              </div>
            ))}

            <div
              className="relative rounded-2xl overflow-hidden"
              style={{
                width: '320px',
                height: '420px',
                background: 'linear-gradient(145deg, #ffffff 0%, #f0fdf9 55%, #ecfdf5 100%)',
                border: '1px solid rgba(16,185,129,0.25)',
                boxShadow: '0 0 50px rgba(16,185,129,0.12), 0 30px 60px rgba(15,23,42,0.12), inset 0 1px 0 rgba(255,255,255,0.7)',
                animation: visible ? 'cardRock 6s ease-in-out infinite' : undefined,
                backdropFilter: 'blur(20px)',
              }}
            >
              <div
                className="absolute inset-0 pointer-events-none z-10"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 40%, rgba(16,185,129,0.04) 100%)',
                }}
              />
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(16,185,129,0.6), transparent)' }}
              />
              <div
                className="absolute top-0 left-0 bottom-0 w-px"
                style={{ background: 'linear-gradient(180deg, rgba(16,185,129,0.4), transparent 70%)' }}
              />
              <div
                className="absolute top-0 right-0 bottom-0 w-px"
                style={{ background: 'linear-gradient(180deg, rgba(16,185,129,0.4), transparent 70%)' }}
              />

              <div className="relative z-20 p-6 h-full flex flex-col">
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{
                      background: 'rgba(16,185,129,0.2)',
                      border: '1px solid rgba(16,185,129,0.35)',
                      boxShadow: '0 0 16px rgba(16,185,129,0.25)',
                    }}
                  >
                    <DollarSign size={18} style={{ color: '#10b981' }} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-900 tracking-wide">Flowza Finance</p>
                    <p className="text-xs" style={{ color: '#64748b' }}>All-in-One Accounting & ERP</p>
                  </div>
                </div>

                <div className="space-y-2.5 mb-6">
                  {[
                    { label: 'Revenue', value: 'AED 142,800', trend: '+12.4%', positive: true },
                    { label: 'Expenses', value: 'AED 38,200', trend: '-3.1%', positive: true },
                    { label: 'Net Profit', value: 'AED 104,600', trend: '+18.7%', positive: true },
                  ].map((row) => (
                    <div
                      key={row.label}
                      className="flex items-center justify-between px-3 py-2.5 rounded-lg"
                      style={{
                        background: 'rgba(16,185,129,0.06)',
                        border: '1px solid rgba(16,185,129,0.12)',
                      }}
                    >
                      <span className="text-xs" style={{ color: '#475569' }}>{row.label}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-gray-900">{row.value}</span>
                        <span
                          className="text-xs font-semibold px-1.5 py-0.5 rounded"
                          style={{
                            background: 'rgba(16,185,129,0.2)',
                            color: '#10b981',
                          }}
                        >
                          {row.trend}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div
                  className="rounded-xl p-4 flex-1"
                  style={{
                    background: 'rgba(16,185,129,0.06)',
                    border: '1px solid rgba(16,185,129,0.12)',
                  }}
                >
                  <p className="text-xs font-semibold mb-3" style={{ color: '#475569' }}>
                    Monthly Trend
                  </p>
                  <div className="flex items-end gap-1.5 h-16">
                    {[35, 52, 44, 68, 58, 75, 65, 82, 72, 88, 79, 95].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-sm"
                        style={{
                          height: `${h}%`,
                          background: i === 11
                            ? 'linear-gradient(to top, #10b981, #34d399)'
                            : `rgba(16,185,129,${0.2 + (h / 100) * 0.35})`,
                          boxShadow: i === 11 ? '0 0 8px rgba(16,185,129,0.5)' : undefined,
                          transition: 'height 0.4s ease',
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="flex-1 flex flex-col gap-10"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateX(0)' : 'translateX(40px)',
              transition: 'opacity 0.9s cubic-bezier(0.22,1,0.36,1) 0.45s, transform 0.9s cubic-bezier(0.22,1,0.36,1) 0.45s',
            }}
          >
            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="flex flex-col items-center text-center p-4 rounded-xl"
                    style={{
                      background: 'rgba(16,185,129,0.06)',
                      border: '1px solid rgba(16,185,129,0.15)',
                      opacity: visible ? 1 : 0,
                      transform: visible ? 'translateY(0)' : 'translateY(20px)',
                      transition: `opacity 0.6s ease ${0.5 + i * 0.1}s, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${0.5 + i * 0.1}s`,
                    }}
                  >
                    <Icon size={16} className="mb-2" style={{ color: '#10b981' }} />
                    <div
                      className="font-display font-black text-2xl leading-none mb-1"
                      style={{
                        color: '#10b981',
                        textShadow: '0 0 20px rgba(16,185,129,0.4)',
                      }}
                    >
                      <AnimatedCounter target={stat.value} suffix={stat.suffix} active={visible} />
                    </div>
                    <p className="text-xs font-medium" style={{ color: '#64748b' }}>
                      {stat.label}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="space-y-4">
              {[
                {
                  title: 'Accounting + Inventory',
                  desc: 'Double-entry books and perpetual inventory on one ledger — cost-of-goods, reconciliation and reporting happen automatically.',
                },
                {
                  title: 'Payroll & HR, Built In',
                  desc: 'Run compliant payroll and manage hire-to-retire HR — attendance, leave, recruitment and performance — without a second system.',
                },
                {
                  title: 'Multi-Country Compliance',
                  desc: 'GST for India and VAT plus Corporate Tax for the Gulf, with statutory payroll filings and country-specific accounts built in.',
                },
              ].map((item, i) => (
                <div
                  key={item.title}
                  className="flex gap-4"
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? 'translateX(0)' : 'translateX(20px)',
                    transition: `opacity 0.6s ease ${0.6 + i * 0.12}s, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${0.6 + i * 0.12}s`,
                  }}
                >
                  <div
                    className="w-1.5 rounded-full shrink-0 mt-1"
                    style={{
                      height: '100%',
                      minHeight: '48px',
                      background: 'linear-gradient(to bottom, #10b981, rgba(16,185,129,0.2))',
                    }}
                  />
                  <div>
                    <h3 className="font-display font-bold text-base text-gray-900 mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: '#475569' }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(16px)',
                transition: 'opacity 0.7s ease 0.9s, transform 0.7s cubic-bezier(0.22,1,0.36,1) 0.9s',
              }}
            >
              <Link
                to="/products/finance"
                className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-sm font-bold transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  color: '#ffffff',
                  boxShadow: '0 0 32px rgba(16,185,129,0.35), 0 8px 24px rgba(16,185,129,0.25)',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 0 48px rgba(16,185,129,0.55), 0 12px 32px rgba(16,185,129,0.35)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 0 32px rgba(16,185,129,0.35), 0 8px 24px rgba(16,185,129,0.25)';
                }}
              >
                Explore Flowza Finance
                <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
