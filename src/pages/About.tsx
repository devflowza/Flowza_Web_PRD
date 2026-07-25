import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import Reveal from '../site/Reveal';
import { landingProducts } from '../site/data';
import usePageMeta from '../lib/usePageMeta';

const stats = [
  { value: '100+', label: 'Businesses served' },
  { value: '4+', label: 'Regions — MEA & India' },
  { value: '7', label: 'Purpose-built platforms' },
  { value: '99.9%', label: 'Uptime SLA' },
];

const values = [
  { title: 'Purpose-driven', description: 'Every product we build solves a real, tangible business problem. No fluff, no filler.' },
  { title: 'Speed and reliability', description: 'Enterprise-grade infrastructure that moves at startup speed — always on, always fast.' },
  { title: 'Customer obsession', description: "We treat every client's success as our own. Their wins are our proudest moments." },
  { title: 'Trust and transparency', description: 'We earn trust through honest communication, clear SLAs and accountable execution.' },
  { title: 'Local nuance', description: 'Built for businesses in the Middle East and India — tax regimes, currencies and workflows included.' },
  { title: 'Continuous improvement', description: 'Software is never finished. We iterate every week on real-world feedback and data.' },
];

export default function About() {
  usePageMeta({
    title: 'About — FlowZa AI',
    description:
      'FlowZa builds purpose-built operating systems for businesses across MEA and India — seven platforms sharing one operating fabric.',
  });

  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative overflow-hidden wash-top px-4 pb-16 pt-16 sm:px-6 sm:pb-20 sm:pt-24">
        <div className="relative mx-auto max-w-4xl text-center">
          <span className="eyebrow justify-center">Our story</span>
          <h1 className="display-hero mt-6 text-4xl text-ink sm:text-5xl lg:text-[64px]">
            Built for the businesses
            <span className="accent-word"> doing the work.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-500 sm:text-xl">
            FlowZa was founded on a simple belief: powerful operating software shouldn't be
            reserved for enterprises with nine-figure budgets. We build for the rest.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-ink/[0.06] bg-white px-4 py-14 sm:px-6 sm:py-16" aria-label="FlowZa in numbers">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-10 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 80}
              className={`px-6 text-center sm:px-10 ${i % 2 === 1 ? 'border-l border-ink/[0.07]' : ''} ${
                i === 2 ? 'lg:border-l lg:border-ink/[0.07]' : ''
              } ${i >= 2 ? 'border-t border-ink/[0.07] pt-10 lg:border-t-0 lg:pt-0' : ''}`}
            >
              <p className="tabular font-display text-4xl font-extrabold leading-none tracking-tightest text-ink sm:text-5xl">
                {s.value}
              </p>
              <p className="mt-3 text-[13px] font-medium text-ink-400">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className="bg-mist px-4 py-24 sm:px-6 sm:py-32">
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2 lg:gap-24">
          <Reveal>
            <span className="eyebrow">Our mission</span>
            <h2 className="display-title mt-5 text-[2rem] text-ink sm:text-[2.6rem]">
              Software that works the way your business does.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ink-500">
              Most software is built for an imaginary average customer. We build for real
              people — the spa owner managing twelve staff, the logistics company tracking
              four hundred vehicles, the retailer running a distributed POS network.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-ink-500">
              Seven purpose-built platforms. One operating fabric. FlowZa is the operating
              system for businesses that refuse to stay behind.
            </p>
          </Reveal>

          {/* The fabric — seven systems as a quiet grid */}
          <Reveal delay={120}>
            <div className="rounded-[2rem] bg-white p-3 shadow-soft ring-1 ring-ink/[0.06]">
              <div className="grid grid-cols-2 gap-1.5">
                {landingProducts.map((p) => {
                  const Icon = p.icon;
                  return (
                    <Link
                      key={p.id}
                      to={`/products/${p.id}`}
                      className="group flex items-center gap-3.5 rounded-[1.35rem] p-4 transition-colors duration-300 hover:bg-mist"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-mist text-ink-500 ring-1 ring-ink/[0.05] transition-colors duration-300 group-hover:bg-white">
                        <Icon size={16} strokeWidth={1.8} />
                      </span>
                      <span className="min-w-0">
                        <span className="flex items-center gap-1.5 truncate text-sm font-semibold text-ink">
                          {p.short}
                          {p.live && <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" aria-label="Live" />}
                        </span>
                        <span className="block truncate text-xs text-ink-400">{p.tagline}</span>
                      </span>
                    </Link>
                  );
                })}
                <div className="flex items-center justify-center rounded-[1.35rem] bg-ink p-4">
                  <p className="text-center font-display text-sm font-bold leading-snug tracking-snug text-white">
                    One operating
                    <br />
                    fabric.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Values — editorial rows */}
      <section className="bg-white px-4 py-24 sm:px-6 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1fr_1.5fr] lg:gap-24">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Reveal>
              <span className="eyebrow">What we stand for</span>
              <h2 className="display-title mt-5 text-[2rem] text-ink sm:text-[2.6rem]">
                The principles behind the product.
              </h2>
            </Reveal>
          </div>
          <div>
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 60}>
                <article className={`border-t border-ink/[0.08] py-7 sm:py-8 ${i === values.length - 1 ? 'border-b' : ''}`}>
                  <h3 className="flex items-baseline gap-4 font-display text-lg font-bold tracking-snug text-ink sm:text-xl">
                    <span aria-hidden="true" className="tabular font-display text-[13px] font-semibold text-ink-300">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {v.title}
                  </h3>
                  <p className="mt-2.5 pl-9 text-[15px] leading-relaxed text-ink-500">{v.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-mist px-4 pb-24 pt-4 sm:px-6 sm:pb-28">
        <Reveal className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-ink px-6 py-16 text-center text-white sm:px-12 sm:py-20 grain">
            <div className="pointer-events-none absolute inset-0 wash-ink" aria-hidden="true" />
            <div className="relative mx-auto max-w-2xl">
              <h2 className="display-title text-3xl text-white sm:text-4xl">Ready to run in flow?</h2>
              <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/60">
                Join 100+ businesses already running their operations on FlowZa.
              </p>
              <div className="mt-9 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
                <Link to="/get-started" className="btn-inverse btn-lg group">
                  Start free trial
                  <span className="btn-orb bg-ink/[0.07] group-hover:translate-x-0.5">
                    <ArrowRight size={14} />
                  </span>
                </Link>
                <Link to="/contact" className="btn-outline-light btn-lg">
                  Talk to us
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </PageLayout>
  );
}
