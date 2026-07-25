import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import SiteLayout from '../site/SiteLayout';
import Reveal from '../site/Reveal';
import ProductCover from '../site/ProductCover';
import ClosingCta from '../site/ClosingCta';
import { landingProducts } from '../site/data';
import usePageMeta from '../lib/usePageMeta';

/*
 * Only platforms with real trial infrastructure get a self-serve button here.
 * Everything else routes to /contact?service=… — the Contact form pre-selects
 * that product, so every "early access" click becomes a tagged lead.
 */
const liveTrials = [
  {
    id: 'finance',
    ctaLabel: 'Start free trial',
    trialUrl: 'https://finance.flowza.ai/trial',
    note: 'No card required · guided migration from Zoho or spreadsheets',
  },
  {
    id: 'club',
    ctaLabel: 'Start 14-day trial',
    trialUrl: 'https://club.flowza.ai',
    note: '14-day trial · six-step setup wizard, live in hours',
  },
];

export default function GetStarted() {
  usePageMeta({
    title: 'Get started — FlowZa AI',
    description:
      'Start a self-serve trial of FlowZa Finance or FlowZa Club today, or get early access to the rest of the fabric. Live in hours, no card required.',
  });

  const live = liveTrials
    .map((t) => ({ ...t, product: landingProducts.find((p) => p.id === t.id)! }))
    .filter((t) => t.product);
  const comingSoon = landingProducts.filter((p) => !p.live);

  return (
    <SiteLayout>
      {/* Header */}
      <section className="relative overflow-hidden wash-top">
        <div className="relative mx-auto max-w-4xl px-4 pb-14 pt-16 text-center sm:px-6 sm:pt-24">
          <span className="eyebrow justify-center">Get started</span>
          <h1 className="display-hero mt-6 text-4xl text-ink sm:text-5xl lg:text-[64px]">
            Pick your platform.
            <br />
            <span className="accent-word">Start in minutes.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-500 sm:text-xl">
            FlowZa Finance and FlowZa Club are live today with self-serve trials. The rest
            of the fabric is rolling out — tell us which one you need and we'll set you up first.
          </p>
        </div>
      </section>

      {/* Live trials */}
      <section className="px-4 pb-24 sm:px-6" aria-label="Live platforms">
        <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-2">
          {live.map(({ product: p, ctaLabel, trialUrl, note }, i) => (
            <Reveal key={p.id} delay={i * 100}>
              <article className="flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-white shadow-lift ring-1 ring-ink/[0.07]">
                <div className="relative h-48 overflow-hidden bg-ink">
                  <ProductCover
                    name={p.name}
                    icon={p.icon}
                    index={p.index}
                    image={p.image}
                    imgClassName="absolute inset-0 h-full w-full object-cover opacity-85"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" aria-hidden="true" />
                  <span className="absolute right-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-700 backdrop-blur-sm">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute h-full w-full animate-ping rounded-full bg-emerald-500 opacity-70" />
                      <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    </span>
                    Live
                  </span>
                  <div className="absolute bottom-5 left-6">
                    <h2 className="font-display text-2xl font-bold tracking-snug text-white">{p.name}</h2>
                    <p className="text-sm text-white/70">{p.tagline}</p>
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <p className="flex-1 text-[15px] leading-relaxed text-ink-500">{p.description}</p>
                  <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
                    {p.badges.map((b) => (
                      <li key={b} className="flex items-center gap-2 text-[13px] font-medium text-ink-500">
                        <span className="h-1 w-1 rounded-full bg-accent" aria-hidden="true" />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={trialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary btn-lg group mt-7 w-full"
                  >
                    {ctaLabel}
                    <span className="btn-orb bg-white/15 group-hover:translate-x-0.5">
                      <ArrowRight size={14} />
                    </span>
                  </a>
                  <p className="mt-3 text-center text-xs text-ink-400">{note}</p>
                  <Link
                    to={`/products/${p.id}`}
                    className="group mt-4 inline-flex items-center justify-center gap-1.5 text-sm font-semibold text-ink-500 transition-colors hover:text-ink"
                  >
                    Explore the platform
                    <ArrowRight size={13} className="transition-transform duration-300 ease-swift group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Coming soon — early access */}
      <section className="bg-mist px-4 py-24 sm:px-6 sm:py-28" aria-label="Platforms in rollout">
        <div className="mx-auto max-w-5xl">
          <Reveal className="mb-14 text-center">
            <span className="eyebrow justify-center">Rolling out</span>
            <h2 className="display-title mt-5 text-[2rem] text-ink sm:text-[2.6rem]">
              Coming soon — get early access.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-ink-500 sm:text-lg">
              These platforms are in rollout. Tell us which one your business needs and
              we'll prioritise your onboarding.
            </p>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {comingSoon.map((p, i) => {
              const Icon = p.icon;
              return (
                <Reveal key={p.id} delay={(i % 3) * 80}>
                  <article className="card-line flex h-full flex-col bg-white p-7">
                    <div className="flex items-start justify-between">
                      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-mist text-ink-500 ring-1 ring-ink/[0.05]">
                        <Icon size={18} strokeWidth={1.7} />
                      </span>
                      <span className="font-display text-sm font-semibold text-ink-200">{p.index}</span>
                    </div>
                    <h3 className="mt-5 font-display text-lg font-bold tracking-snug text-ink">{p.short}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-500">{p.description}</p>
                    <div className="mt-6 flex items-center gap-5">
                      <Link to={`/contact?service=${encodeURIComponent(p.name)}`} className="btn-secondary btn-sm">
                        Get early access
                      </Link>
                      <Link
                        to={`/products/${p.id}`}
                        className="group inline-flex items-center gap-1 text-[13px] font-semibold text-ink-400 transition-colors hover:text-ink"
                      >
                        Learn more
                        <ArrowUpRight size={12} className="transition-transform duration-300 ease-swift group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </Link>
                    </div>
                  </article>
                </Reveal>
              );
            })}
            <Reveal delay={160}>
              <Link
                to="/contact"
                className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl bg-ink p-7 text-white shadow-soft transition-all duration-500 ease-swift hover:-translate-y-1 hover:shadow-lift grain"
              >
                <div className="pointer-events-none absolute inset-0 wash-ink" aria-hidden="true" />
                <h3 className="relative font-display text-lg font-bold tracking-snug">Something else?</h3>
                <p className="relative mt-2 flex-1 text-sm leading-relaxed text-white/60">
                  Running an operation none of these quite fit? Tell us how you work — the
                  fabric is built to stretch.
                </p>
                <p className="relative mt-6 inline-flex items-center gap-1.5 text-sm font-semibold">
                  Talk to us
                  <ArrowRight size={13} className="transition-transform duration-300 ease-swift group-hover:translate-x-0.5" />
                </p>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <ClosingCta
        title="Not sure which"
        accent="platform fits?"
        subtitle="Chat with us — we'll map your operation to the right system in one conversation."
        primaryLabel="Talk to us"
        primaryTo="/contact"
      />
    </SiteLayout>
  );
}
