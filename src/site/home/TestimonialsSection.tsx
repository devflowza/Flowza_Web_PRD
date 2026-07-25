import Reveal from '../Reveal';
import { homeTestimonials } from '../data';

/** Two voices, both from live platforms — one featured, one supporting. */
export default function TestimonialsSection() {
  const [featured, supporting] = homeTestimonials;

  return (
    <section id="testimonials" className="scroll-mt-24 bg-mist px-4 py-24 sm:px-6 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-14 flex flex-wrap items-end justify-between gap-6 sm:mb-16">
          <div>
            <span className="eyebrow">Customer stories</span>
            <h2 className="display-title mt-5 text-[2rem] text-ink sm:text-[2.6rem] lg:text-[3rem]">
              Operators, in their own words.
            </h2>
          </div>
          <p className="max-w-xs pb-2 text-sm leading-relaxed text-ink-500">
            From the people running FlowZa Finance and FlowZa Club in production today.
          </p>
        </Reveal>

        <div className="grid gap-5 lg:grid-cols-[1.5fr_1fr]">
          {/* Featured quote */}
          <Reveal>
            <figure className="relative flex h-full flex-col justify-between overflow-hidden rounded-[2rem] bg-white p-8 shadow-soft ring-1 ring-ink/[0.06] sm:p-12">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -top-7 right-6 select-none font-display text-[11rem] font-extrabold leading-none text-ink/[0.05]"
              >
                ”
              </span>
              <blockquote className="relative">
                <p className="display-title text-[1.55rem] leading-[1.25] text-ink sm:text-[2rem]">
                  {featured.quote}
                </p>
              </blockquote>
              <figcaption className="relative mt-10 flex items-center gap-4">
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-2xl text-sm font-bold text-white"
                  style={{ background: featured.color }}
                >
                  {featured.initials}
                </span>
                <span>
                  <span className="block font-semibold text-ink">{featured.name}</span>
                  <span className="block text-sm text-ink-400">
                    {featured.role}, {featured.company}
                  </span>
                </span>
              </figcaption>
            </figure>
          </Reveal>

          {/* Supporting quote */}
          <Reveal delay={120}>
            <figure className="flex h-full flex-col justify-between rounded-[2rem] bg-white p-8 ring-1 ring-ink/[0.07]">
              <blockquote>
                <p className="text-[15px] leading-relaxed text-ink-600 sm:text-base">“{supporting.quote}”</p>
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-3.5">
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-xl text-xs font-bold text-white"
                  style={{ background: supporting.color }}
                >
                  {supporting.initials}
                </span>
                <span>
                  <span className="block text-sm font-semibold text-ink">{supporting.name}</span>
                  <span className="block text-[13px] text-ink-400">
                    {supporting.role}, {supporting.company}
                  </span>
                </span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
