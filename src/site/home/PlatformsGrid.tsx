import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import Reveal from '../Reveal';
import { landingProducts } from '../data';

/** The systems: featured flagship panel + editorial index grid. */
export default function PlatformsGrid() {
  const [featured, ...rest] = landingProducts;
  const FeaturedIcon = featured.icon;

  return (
    <section id="platforms" className="scroll-mt-24 bg-mist px-4 py-24 sm:px-6 sm:py-32">
      <div className="mx-auto max-w-7xl">
        {/* Editorial header row */}
        <Reveal className="mb-14 flex flex-wrap items-end justify-between gap-6 sm:mb-16">
          <div className="max-w-2xl">
            <span className="eyebrow">The systems</span>
            <h2 className="display-title mt-5 text-[2rem] text-ink sm:text-[2.6rem] lg:text-[3rem]">
              Seven systems.
              <br />
              One operating fabric.
            </h2>
          </div>
          <p className="max-w-sm pb-2 text-base leading-relaxed text-ink-500">
            Each one deep enough to run your operation on its own — all sharing the same
            customers, inventory and ledger underneath.
          </p>
        </Reveal>

        {/* Featured: FlowZa Finance */}
        <Reveal>
          <Link
            to={`/products/${featured.id}`}
            className="group grid overflow-hidden rounded-[2rem] bg-ink text-white shadow-lift transition-all duration-500 ease-swift hover:shadow-frame lg:grid-cols-[1fr_1.15fr]"
          >
            <div className="relative flex flex-col justify-between p-8 sm:p-12 grain">
              <div className="pointer-events-none absolute inset-0 wash-ink" aria-hidden="true" />
              <div className="relative">
                <p className="flex items-center gap-3 text-[12px] font-bold uppercase tracking-[0.2em] text-white/60">
                  <span aria-hidden="true" className="font-display text-white/30">01</span>
                  Flagship · Live
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                    <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  </span>
                </p>
                <h3 className="display-title mt-6 text-3xl text-white sm:text-4xl">{featured.name}</h3>
                <p className="mt-4 max-w-md text-[15px] leading-relaxed text-white/60 sm:text-base">
                  {featured.description}
                </p>
                <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                  {featured.badges.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-[13px] font-medium text-white/70">
                      <span className="h-1 w-1 rounded-full bg-emerald-400" aria-hidden="true" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
              <p className="relative mt-10 inline-flex items-center gap-2 text-[15px] font-semibold text-white">
                Explore {featured.short}
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 transition-all duration-300 ease-swift group-hover:translate-x-1 group-hover:bg-white group-hover:text-ink">
                  <ArrowRight size={14} />
                </span>
              </p>
              <span
                className="absolute right-8 top-8 flex h-11 w-11 items-center justify-center rounded-2xl bg-white/[0.08] text-white/80 ring-1 ring-white/10"
                aria-hidden="true"
              >
                <FeaturedIcon size={19} strokeWidth={1.6} />
              </span>
            </div>
            <div className="relative min-h-[280px] overflow-hidden bg-ink-800 lg:min-h-0">
              <img
                src={featured.image}
                alt={`${featured.name} interface`}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover object-left-top opacity-90 transition-transform duration-700 ease-swift group-hover:scale-[1.03]"
              />
              <div
                className="absolute inset-0 bg-gradient-to-r from-ink via-ink/20 to-transparent lg:bg-gradient-to-r"
                aria-hidden="true"
              />
            </div>
          </Link>
        </Reveal>

        {/* The remaining six */}
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((p, i) => {
            const Icon = p.icon;
            return (
              <Reveal key={p.id} delay={(i % 3) * 80}>
                <Link
                  to={`/products/${p.id}`}
                  className="card-line group flex h-full flex-col p-7 hover:-translate-y-1"
                >
                  <div className="flex items-start justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-mist text-ink-500 ring-1 ring-ink/[0.05] transition-colors duration-300 group-hover:text-ink">
                      <Icon size={18} strokeWidth={1.7} />
                    </span>
                    <span className="font-display text-sm font-semibold text-ink-200 transition-colors duration-300 group-hover:text-ink-300">
                      {p.index}
                    </span>
                  </div>
                  <h3 className="mt-6 flex items-center gap-2.5 font-display text-xl font-bold tracking-snug text-ink">
                    {p.short}
                    {p.live && (
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                        <span className="h-1 w-1 rounded-full bg-emerald-500" />
                        Live
                      </span>
                    )}
                  </h3>
                  <p className="mt-2 flex-1 text-[15px] leading-relaxed text-ink-500">{p.description}</p>
                  <p className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-ink-400 transition-colors duration-300 group-hover:text-accent">
                    {p.live ? 'Explore platform' : 'Preview platform'}
                    <ArrowUpRight
                      size={14}
                      className="transition-transform duration-300 ease-swift group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </p>
                </Link>
              </Reveal>
            );
          })}
        </div>

        {/* Quiet routing strip */}
        <Reveal delay={120}>
          <div className="mt-5 flex flex-col items-start justify-between gap-5 rounded-[1.5rem] bg-white p-7 ring-1 ring-ink/[0.07] sm:flex-row sm:items-center sm:px-9">
            <p className="text-[15px] text-ink-500">
              <span className="font-semibold text-ink">Not sure where to start?</span> Tell us how you
              operate — we'll map you to the right system in one conversation.
            </p>
            <Link to="/contact" className="btn-secondary btn-md group shrink-0">
              Talk to us
              <ArrowRight size={14} className="transition-transform duration-300 ease-swift group-hover:translate-x-0.5" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
