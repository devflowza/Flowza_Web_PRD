import { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { gsap, ScrollTrigger } from '../gsapSetup';
import { landingProducts } from '../data';

/*
 * Desktop: the section pins and the card track scrubs horizontally with scroll.
 * Mobile / reduced motion: a native scroll-snap row — same markup, no pin.
 */
export default function ProductsRail() {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!section || !viewport || !track) return;

    const mm = gsap.matchMedia();

    mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
      viewport.classList.add('is-pinned');
      viewport.scrollLeft = 0;

      const distance = () => track.scrollWidth - viewport.clientWidth;

      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => '+=' + distance(),
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progressRef.current) progressRef.current.style.transform = `scaleX(${self.progress})`;
          },
        },
      });

      // gentle parallax inside each card image as it crosses the screen
      const parallaxes = gsap.utils.toArray<HTMLElement>('.fz-card-media img', section).map((img) =>
        gsap.fromTo(
          img,
          { xPercent: -7 },
          {
            xPercent: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: img.closest('.fz-card') as HTMLElement,
              containerAnimation: tween,
              start: 'left right',
              end: 'right left',
              scrub: true,
            },
          }
        )
      );

      return () => {
        viewport.classList.remove('is-pinned');
        parallaxes.forEach((p) => p.kill());
      };
    });

    // header reveal (all sizes)
    const ctx = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      gsap.from('[data-rail-head] > *', {
        y: 36,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 72%' },
      });
    }, section);

    return () => {
      mm.revert();
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <section id="platforms" ref={sectionRef} className="relative" style={{ background: 'var(--fz-ink)' }}>
      <div className="min-h-[100svh] md:h-screen flex flex-col justify-center py-20 md:py-0">
        <div data-rail-head className="max-w-[1440px] w-full mx-auto px-5 sm:px-10 mb-10 md:mb-12">
          <p className="fz-eyebrow mb-5">The platform family</p>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="fz-display font-bold text-white leading-[1.02]" style={{ fontSize: 'clamp(38px, 5.6vw, 76px)' }}>
              Seven systems.
              <br />
              One <em className="fz-serif fz-grad-text">fabric.</em>
            </h2>
            <div className="flex items-center gap-5 w-full max-w-[300px]">
              <span className="fz-display text-xs font-semibold tracking-[0.2em]" style={{ color: 'var(--fz-faint)' }}>
                01 — 07
              </span>
              <div className="fz-rail-progress">
                <span ref={progressRef} />
              </div>
            </div>
          </div>
        </div>

        <div ref={viewportRef} className="fz-rail-viewport">
          <div ref={trackRef} className="fz-rail-track">
            {landingProducts.map((p) => {
              const Icon = p.icon;
              return (
                <Link
                  key={p.id}
                  to={`/products/${p.id}`}
                  className="fz-card group"
                  style={{ '--card-accent': p.color } as React.CSSProperties}
                  data-cursor
                  aria-label={`${p.name} — ${p.tagline}`}
                >
                  <div className="fz-card-media">
                    <img src={p.image} alt="" loading="lazy" />
                    <span className="fz-card-index">{p.index}</span>
                    <span className={`fz-chip absolute top-4 left-4 z-[2] ${p.live ? 'fz-chip-live' : 'fz-chip-soon'}`}>
                      {p.live && <span className="fz-chip-dot" />}
                      {p.live ? 'Live' : 'Coming soon'}
                    </span>
                  </div>

                  <div className="flex flex-col flex-1 p-6 sm:p-7">
                    <div className="flex items-center gap-3 mb-3">
                      <span
                        className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                        style={{
                          background: `color-mix(in srgb, ${p.color} 14%, transparent)`,
                          border: `1px solid color-mix(in srgb, ${p.color} 38%, transparent)`,
                          color: p.color,
                        }}
                      >
                        <Icon size={15} />
                      </span>
                      <div>
                        <h3 className="fz-display font-bold text-[17px] text-white leading-tight">{p.name}</h3>
                        <p className="text-xs mt-0.5" style={{ color: 'var(--fz-faint)' }}>
                          {p.tagline}
                        </p>
                      </div>
                    </div>

                    <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--fz-muted)' }}>
                      {p.description}
                    </p>

                    <div className="mt-auto flex items-center justify-between gap-3">
                      <div className="flex flex-wrap gap-1.5">
                        {p.badges.map((b) => (
                          <span key={b} className="fz-badge">
                            {b}
                          </span>
                        ))}
                      </div>
                      <span
                        className="shrink-0 w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-300 group-hover:rotate-45"
                        style={{ borderColor: 'var(--fz-line)', color: p.color }}
                      >
                        <ArrowUpRight size={15} />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        <p className="md:hidden text-center mt-6 text-[11px] uppercase tracking-[0.25em]" style={{ color: 'var(--fz-faint)' }}>
          Swipe to explore →
        </p>
      </div>
    </section>
  );
}
