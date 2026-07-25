import { ArrowRight, ArrowUpRight, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import PageHero from '../components/PageHero';
import Reveal from '../site/Reveal';
import { landingProducts, WHATSAPP_URL } from '../site/data';
import usePageMeta from '../lib/usePageMeta';

const quickStart = [
  { step: '01', title: 'Create your account', description: 'Sign up and verify your organisation details. Takes less than five minutes.' },
  { step: '02', title: 'Choose your platform', description: 'Select one or more FlowZa systems that match your business needs.' },
  { step: '03', title: 'Import your data', description: 'Use the guided migration tools to bring in existing data with zero downtime.' },
  { step: '04', title: 'Configure your workflows', description: 'Set your preferences, approval flows and automation rules for your context.' },
  { step: '05', title: 'Go live', description: 'Invite your team, test your setup and launch. Support is a message away throughout.' },
];

export default function Documentation() {
  usePageMeta({
    title: 'Documentation — FlowZa AI',
    description: 'Guides, setup walkthroughs and product references for every FlowZa platform — written for operators, not engineers.',
  });

  return (
    <PageLayout>
      <PageHero
        label="Documentation"
        title="Learn your way around"
        titleHighlight="the fabric."
        subtitle="Guides, setup walkthroughs and product references for every FlowZa platform — written for operators, not engineers."
      />

      {/* Browse by product */}
      <section className="px-4 pb-24 sm:px-6" aria-label="Browse documentation by product">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {landingProducts.map((p, i) => {
              const Icon = p.icon;
              return (
                <Reveal key={p.id} delay={(i % 3) * 70}>
                  <Link
                    to={`/products/${p.id}`}
                    className="card-line group flex h-full flex-col p-6 hover:-translate-y-1"
                  >
                    <div className="flex items-start justify-between">
                      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-mist text-ink-500 ring-1 ring-ink/[0.05]">
                        <Icon size={18} strokeWidth={1.7} />
                      </span>
                      <ArrowUpRight
                        size={15}
                        className="text-ink-200 transition-all duration-300 ease-swift group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                      />
                    </div>
                    <h2 className="mt-5 font-display text-lg font-bold tracking-snug text-ink">{p.short}</h2>
                    <p className="mt-1.5 flex-1 text-sm leading-relaxed text-ink-500">{p.tagline} — platform overview &amp; setup guide</p>
                  </Link>
                </Reveal>
              );
            })}
            <Reveal delay={210}>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-ink p-6 text-white shadow-soft transition-all duration-500 ease-swift hover:-translate-y-1 hover:shadow-lift grain"
              >
                <div className="pointer-events-none absolute inset-0 wash-ink" aria-hidden="true" />
                <h2 className="relative font-display text-lg font-bold tracking-snug">Can't find a guide?</h2>
                <p className="relative mt-1.5 flex-1 text-sm leading-relaxed text-white/60">
                  Ask us directly on WhatsApp — a real person, usually within minutes.
                </p>
                <p className="relative mt-4 inline-flex items-center gap-1.5 text-sm font-semibold">
                  Start a chat
                  <ArrowUpRight size={13} className="transition-transform duration-300 ease-swift group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </p>
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Getting started */}
      <section className="bg-mist px-4 py-24 sm:px-6 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1fr_1.4fr] lg:gap-24">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Reveal>
              <span className="eyebrow">New here?</span>
              <h2 className="display-title mt-5 text-[2rem] text-ink sm:text-[2.6rem]">
                From signup to live in five steps.
              </h2>
              <p className="mt-5 max-w-sm text-base leading-relaxed text-ink-500">
                Every platform follows the same onboarding arc — and our team walks it
                with you.
              </p>
            </Reveal>
          </div>
          <div>
            {quickStart.map((s, i) => (
              <Reveal key={s.step} delay={i * 70}>
                <article className={`group flex gap-7 border-t border-ink/[0.08] py-8 sm:gap-10 ${i === quickStart.length - 1 ? 'border-b' : ''}`}>
                  <span aria-hidden="true" className="font-display text-3xl font-extrabold leading-none tracking-tightest text-ink-100 sm:text-5xl">
                    {s.step}
                  </span>
                  <div className="pt-0.5">
                    <h3 className="font-display text-lg font-bold tracking-snug text-ink sm:text-xl">{s.title}</h3>
                    <p className="mt-2 max-w-lg text-[15px] leading-relaxed text-ink-500">{s.description}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Support routes */}
      <section className="px-4 py-24 sm:px-6">
        <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-2">
          <Reveal>
            <Link to="/help" className="card-line group flex h-full flex-col p-8 hover:-translate-y-1">
              <h2 className="font-display text-xl font-bold tracking-snug text-ink">Help center</h2>
              <p className="mt-2 flex-1 text-[15px] leading-relaxed text-ink-500">
                FAQs, troubleshooting guides and answers to the questions operators ask most.
              </p>
              <p className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 transition-colors group-hover:text-accent">
                Browse help
                <ArrowRight size={14} className="transition-transform duration-300 ease-swift group-hover:translate-x-0.5" />
              </p>
            </Link>
          </Reveal>
          <Reveal delay={90}>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="card-line group flex h-full flex-col p-8 hover:-translate-y-1"
            >
              <h2 className="flex items-center gap-2.5 font-display text-xl font-bold tracking-snug text-ink">
                <MessageCircle size={18} className="text-emerald-600" />
                Ask us directly
              </h2>
              <p className="mt-2 flex-1 text-[15px] leading-relaxed text-ink-500">
                Can't find what you need? Our team answers fastest on WhatsApp — a real
                person, usually within minutes.
              </p>
              <p className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 transition-colors group-hover:text-accent">
                Start a chat
                <ArrowUpRight size={14} className="transition-transform duration-300 ease-swift group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </p>
            </a>
          </Reveal>
        </div>
      </section>
    </PageLayout>
  );
}
