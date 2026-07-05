import { useLayoutEffect, useRef } from 'react';
import { gsap } from '../gsapSetup';
import { whyItems } from '../data';

const SENTENCE =
  'We believe software should disappear into the work. Flowza quietly automates the busywork — invoices, routes, rosters, stock — so a team of ten can move like a team of fifty.';

export default function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      // words brighten one by one as you scroll through the statement
      gsap.fromTo(
        '.fz-word',
        { opacity: 0.13 },
        {
          opacity: 1,
          stagger: 0.4,
          ease: 'none',
          scrollTrigger: {
            trigger: '[data-manifesto-text]',
            start: 'top 78%',
            end: 'bottom 45%',
            scrub: 0.6,
          },
        }
      );

      gsap.from('.fz-why-card', {
        y: 44,
        opacity: 0,
        duration: 0.85,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '[data-why-grid]', start: 'top 78%' },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="why" ref={sectionRef} className="relative py-28 sm:py-36 fz-hairline-t" style={{ background: 'var(--fz-ink)' }}>
      <div className="max-w-[1200px] mx-auto px-5 sm:px-10">
        <p className="fz-eyebrow mb-10">Why Flowza</p>

        <p data-manifesto-text className="fz-manifesto text-white mb-24">
          {SENTENCE.split(' ').map((w, i) => (
            <span key={i} className="fz-word">
              {w}
            </span>
          ))}
          <span className="fz-word fz-serif fz-grad-text">That's flow.</span>
        </p>

        <div data-why-grid className="grid sm:grid-cols-2 gap-4 sm:gap-5">
          {whyItems.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.title}
                className="fz-why-card"
                style={{ '--card-accent': item.color } as React.CSSProperties}
              >
                <span
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                  style={{
                    background: `color-mix(in srgb, ${item.color} 12%, transparent)`,
                    border: `1px solid color-mix(in srgb, ${item.color} 35%, transparent)`,
                    color: item.color,
                  }}
                >
                  <Icon size={17} />
                </span>
                <h3 className="fz-display font-bold text-white text-lg mb-2.5">{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--fz-muted)' }}>
                  {item.desc}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
