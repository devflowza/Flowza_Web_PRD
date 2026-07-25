import { ArrowRight, MessageCircle, TrendingUp, Clock3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { WHATSAPP_URL } from '../data';

/* Stable public URL (not a hashed import) so index.html can preload it. */
const dashboardImg = '/hero-dashboard.webp';

const headlineWords = ['Run', 'your', 'whole', 'business'];

const trustItems = ['SOC 2 compliant', '99.9% uptime SLA', 'GST & VAT ready', 'No lock-in'];

/** Centered editorial hero: word-rise headline, real product UI in a framed screen. */
export default function HomeHero() {
  return (
    <section className="relative overflow-hidden wash-top">
      <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-16 sm:px-6 sm:pt-24 lg:pb-28">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-8 inline-flex animate-fade-in items-center gap-2.5 text-[13px] font-medium text-ink-500">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Trusted by 100+ operators across MEA &amp; India
          </p>

          <h1 className="display-hero text-[44px] text-ink sm:text-6xl lg:text-[76px]">
            {headlineWords.map((word, i) => (
              <span key={word} className="word-rise" style={{ animationDelay: `${i * 70}ms` }}>
                {word}
                {' '}
              </span>
            ))}
            <span className="word-rise accent-word" style={{ animationDelay: `${headlineWords.length * 70}ms` }}>
              in flow.
            </span>
          </h1>

          <p
            className="rise-block mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-ink-500 sm:text-xl"
            style={{ animationDelay: '420ms' }}
          >
            Finance, logistics, wellness, fleet, retail and clubs — seven purpose-built
            systems that quietly automate the busywork, so a team of ten moves like a
            team of fifty.
          </p>

          <div
            className="rise-block mt-10 flex flex-col items-center justify-center gap-3.5 sm:flex-row"
            style={{ animationDelay: '520ms' }}
          >
            <Link to="/get-started" className="btn-primary btn-lg group w-full sm:w-auto">
              Start free trial
              <span className="btn-orb bg-white/15 group-hover:translate-x-0.5">
                <ArrowRight size={14} />
              </span>
            </Link>
            <a href="#platforms" className="btn-secondary btn-lg w-full sm:w-auto">
              Explore the platforms
            </a>
          </div>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rise-block mt-4 inline-flex items-center gap-2 py-2 text-sm font-medium text-ink-400 transition-colors duration-300 hover:text-ink"
            style={{ animationDelay: '600ms' }}
          >
            <MessageCircle size={14} />
            or chat with us on WhatsApp
          </a>
        </div>

        {/* Product screen */}
        <div className="relative mx-auto mt-16 max-w-5xl sm:mt-20">
          {/* Ambient glow behind the frame */}
          <div
            aria-hidden="true"
            className="absolute -inset-x-8 -top-10 bottom-0 rounded-[3rem] bg-[radial-gradient(60%_60%_at_50%_30%,rgba(46,91,255,0.10)_0%,transparent_70%)]"
          />

          <div className="rise-block-media relative" style={{ animationDelay: '80ms' }}>
            <div className="bezel shadow-frame">
              <div className="bezel-inner">
                {/* Browser chrome */}
                <div className="flex items-center gap-3 border-b border-ink/[0.06] bg-mist/70 px-5 py-3">
                  <span className="flex gap-1.5" aria-hidden="true">
                    <span className="h-2.5 w-2.5 rounded-full bg-ink/[0.10]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-ink/[0.10]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-ink/[0.10]" />
                  </span>
                  <span className="mx-auto flex items-center gap-1.5 rounded-full bg-white px-4 py-1 text-[12px] font-medium text-ink-400 ring-1 ring-ink/[0.06]">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    finance.flowza.ai
                  </span>
                  <span className="w-[52px]" aria-hidden="true" />
                </div>
                <img
                  src={dashboardImg}
                  alt="FlowZa Finance dashboard showing live receivables, payables, cash and income charts"
                  width="1510"
                  height="1013"
                  {...({ fetchpriority: 'high' } as React.ImgHTMLAttributes<HTMLImageElement>)}
                  className="block w-full"
                />
              </div>
            </div>

            {/* Floating KPI chips — outboard of the frame so they never cover data */}
            <div className="absolute top-[38%] hidden animate-float-slow rounded-2xl bg-white/95 px-5 py-4 shadow-lift ring-1 ring-ink/[0.06] lg:-left-12 lg:block">
              <div className="flex items-center gap-3.5">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <TrendingUp size={17} strokeWidth={1.8} />
                </span>
                <span>
                  <span className="tabular block font-display text-xl font-bold leading-none text-ink">Up to 85%</span>
                  <span className="mt-1 block text-xs text-ink-400">less manual work in 90 days</span>
                </span>
              </div>
            </div>
            <div
              className="absolute hidden animate-float-slow rounded-2xl bg-white/95 px-5 py-4 shadow-lift ring-1 ring-ink/[0.06] lg:-right-12 lg:-bottom-4 lg:block"
              style={{ animationDelay: '-3.5s' }}
            >
              <div className="flex items-center gap-3.5">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-wash text-accent">
                  <Clock3 size={17} strokeWidth={1.8} />
                </span>
                <span>
                  <span className="tabular block font-display text-xl font-bold leading-none text-ink">6 hrs</span>
                  <span className="mt-1 block text-xs text-ink-400">month-end close, was 5 days</span>
                </span>
              </div>
            </div>
          </div>

          {/* The same proof, statically, where the floating chips are hidden */}
          <div className="mx-auto mt-6 grid max-w-xl grid-cols-1 gap-3.5 sm:grid-cols-2 lg:hidden">
            <div className="flex items-center gap-3.5 rounded-2xl bg-white px-5 py-4 ring-1 ring-ink/[0.07]">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <TrendingUp size={17} strokeWidth={1.8} />
              </span>
              <span>
                <span className="tabular block font-display text-lg font-bold leading-none text-ink">Up to 85%</span>
                <span className="mt-1 block text-xs text-ink-400">less manual work in 90 days</span>
              </span>
            </div>
            <div className="flex items-center gap-3.5 rounded-2xl bg-white px-5 py-4 ring-1 ring-ink/[0.07]">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-wash text-accent">
                <Clock3 size={17} strokeWidth={1.8} />
              </span>
              <span>
                <span className="tabular block font-display text-lg font-bold leading-none text-ink">6 hrs</span>
                <span className="mt-1 block text-xs text-ink-400">month-end close, was 5 days</span>
              </span>
            </div>
          </div>
        </div>

        {/* Trust row */}
        <ul
          className="rise-block mx-auto mt-12 flex max-w-3xl flex-wrap items-center justify-center gap-x-8 gap-y-3"
          style={{ animationDelay: '800ms' }}
        >
          {trustItems.map((item) => (
            <li key={item} className="flex items-center gap-2 text-[13px] font-medium text-ink-400">
              <span className="h-1 w-1 rounded-full bg-ink-200" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
