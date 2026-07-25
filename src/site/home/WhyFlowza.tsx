import Reveal from '../Reveal';
import { whyItems, heroStats } from '../data';

/** Manifesto split: large pull-quote left, principle rows right; light stats band below. */
export default function WhyFlowza() {
  return (
    <>
      <section id="why-flowza" className="scroll-mt-24 bg-mist px-4 py-24 sm:px-6 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1.15fr_1fr] lg:gap-24">
          {/* Manifesto */}
          <Reveal>
            <span className="eyebrow">Why FlowZa</span>
            <blockquote className="mt-8">
              <p className="display-title text-[1.9rem] leading-[1.16] text-ink sm:text-[2.5rem] lg:text-[2.9rem]">
                “Software should{' '}
                <span className="accent-word">disappear</span> into the work.”
              </p>
              <p className="mt-7 max-w-lg text-base leading-relaxed text-ink-500 sm:text-lg">
                FlowZa quietly automates the busywork — invoices, routes, rosters,
                stock — so your team spends its day on judgement, not data entry.
                That's the whole point.
              </p>
            </blockquote>
          </Reveal>

          {/* Principle rows */}
          <div>
            {whyItems.map((item, i) => (
              <Reveal key={item.title} delay={i * 90}>
                <article
                  className={`border-t border-ink/[0.08] py-7 sm:py-8 ${
                    i === whyItems.length - 1 ? 'border-b' : ''
                  }`}
                >
                  <h3 className="flex items-baseline gap-4 font-display text-lg font-bold tracking-snug text-ink sm:text-xl">
                    <span aria-hidden="true" className="tabular font-display text-[13px] font-semibold text-ink-300">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {item.title}
                  </h3>
                  <p className="mt-2.5 pl-9 text-[15px] leading-relaxed text-ink-500">{item.desc}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stats band — editorial numbers on paper, hairline separated */}
      <section className="border-y border-ink/[0.06] bg-white px-4 py-16 sm:px-6 sm:py-20" aria-label="FlowZa in numbers">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-12 lg:grid-cols-4">
          {heroStats.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 80}
              className={`px-6 text-center sm:px-10 ${i % 2 === 1 ? 'border-l border-ink/[0.07]' : ''} ${
                i === 2 ? 'lg:border-l lg:border-ink/[0.07]' : ''
              } ${i >= 2 ? 'border-t border-ink/[0.07] pt-10 lg:border-t-0 lg:pt-0' : ''}`}
            >
              <p className="tabular font-display text-[2.6rem] font-extrabold leading-none tracking-tightest text-ink sm:text-6xl">
                {s.value}
              </p>
              <p className="mt-3.5 text-[13px] font-medium text-ink-400">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
