import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { gsap, SplitText, prefersReducedMotion } from '../gsapSetup';
import { heroStats } from '../data';
import MagneticButton from './MagneticButton';

const HeroCanvas = lazy(() => import('./HeroCanvas'));

interface HeroSectionProps {
  play: boolean;
  onExplore: () => void;
}

export default function HeroSection({ play, onExplore }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [canvasOn, setCanvasOn] = useState(false);

  useEffect(() => {
    setCanvasOn(!prefersReducedMotion());
  }, []);

  // Entrance choreography — waits for the preloader and the display font.
  useEffect(() => {
    if (!play || !sectionRef.current) return;

    if (prefersReducedMotion()) {
      sectionRef.current.querySelectorAll<HTMLElement>('[data-hero-fade]').forEach((el) => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
      animateCounters(sectionRef.current, true);
      return;
    }

    let ctx: gsap.Context | undefined;
    let cancelled = false;

    document.fonts.ready.then(() => {
      if (cancelled || !sectionRef.current) return;
      ctx = gsap.context(() => {
        const splits: SplitText[] = [];
        const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

        tl.to('[data-hero-bg]', { opacity: 1, duration: 1.6, ease: 'power2.out' }, 0);
        tl.fromTo('[data-hero-pill]', { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, 0.25);

        gsap.utils.toArray<HTMLElement>('.fz-line-inner').forEach((line, i) => {
          gsap.set(line, { opacity: 1 });
          // Split only plain-text segments; the gradient serif word animates as
          // one unit (SplitText spans would orphan its background-clip gradient).
          const targets: Element[] = [];
          line.querySelectorAll<HTMLElement>('.fz-split').forEach((seg) => {
            const split = new SplitText(seg, { type: 'words,chars' });
            splits.push(split);
            targets.push(...split.chars);
          });
          const serif = line.querySelector('[data-hero-serif]');
          if (serif) targets.push(serif);
          tl.from(
            targets,
            { yPercent: 118, duration: 1.05, stagger: 0.022, ease: 'power4.out' },
            0.35 + i * 0.14
          );
        });

        tl.fromTo('[data-hero-sub]', { y: 26, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, 0.95);
        tl.fromTo('[data-hero-cta]', { y: 26, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, 1.08);
        tl.fromTo(
          '[data-hero-stats] > *',
          { y: 22, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.08 },
          1.2
        );
        tl.fromTo('[data-hero-hint]', { opacity: 0 }, { opacity: 1, duration: 0.8 }, 1.5);
        tl.add(() => animateCounters(sectionRef.current!, false), 1.25);
      }, sectionRef);
    });

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [play]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100svh] flex flex-col overflow-hidden"
      aria-label="Flowza — one platform, infinite flow"
    >
      {/* background: static gradient always; WebGL particle ocean when motion is allowed */}
      <div data-hero-bg data-hero-fade className="absolute inset-0 opacity-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 75% 55% at 50% 78%, rgba(10, 80, 130, 0.5) 0%, rgba(4, 22, 38, 0.45) 45%, transparent 75%)',
          }}
        />
        {canvasOn && (
          <Suspense fallback={null}>
            <HeroCanvas />
          </Suspense>
        )}
        <div className="absolute inset-0 fz-hero-vignette" />
      </div>

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-5 pt-32 pb-10">
        <div
          data-hero-pill
          data-hero-fade
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-[12px] font-medium tracking-wide mb-8 opacity-0"
          style={{
            border: '1px solid rgba(34, 211, 238, 0.25)',
            background: 'rgba(34, 211, 238, 0.06)',
            color: '#9bdcf0',
            backdropFilter: 'blur(8px)',
            transform: 'translateY(18px)',
          }}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-70" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
          </span>
          Systems online — seven AI platforms, one fabric
        </div>

        <h1 className="fz-hero-title text-white max-w-[14ch]">
          <span className="fz-line">
            <span className="fz-line-inner inline-block opacity-0" data-hero-fade>
              <span className="fz-split">One platform.</span>
            </span>
          </span>
          <span className="fz-line">
            <span className="fz-line-inner inline-block opacity-0" data-hero-fade>
              <span className="fz-split">Infinite</span>{' '}
              <em className="fz-serif" data-hero-serif>
                flow.
              </em>
            </span>
          </span>
        </h1>

        <p
          data-hero-sub
          data-hero-fade
          className="mt-7 max-w-[58ch] text-base sm:text-lg leading-relaxed opacity-0"
          style={{ color: 'var(--fz-muted)', transform: 'translateY(26px)' }}
        >
          Seven purpose-built AI systems for finance, logistics, wellness, fleet, retail, clubs and beyond —
          one operating fabric trusted by 100+ businesses across MEA &amp; India.
        </p>

        <div
          data-hero-cta
          data-hero-fade
          className="mt-10 flex flex-col sm:flex-row items-center gap-4 opacity-0"
          style={{ transform: 'translateY(26px)' }}
        >
          <MagneticButton>
            <button className="fz-btn fz-btn-primary group" onClick={onExplore} data-cursor>
              Explore the platforms
              <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </MagneticButton>
          <MagneticButton strength={0.22}>
            <Link to="/contact" className="fz-btn fz-btn-ghost no-underline" data-cursor>
              Talk to us
            </Link>
          </MagneticButton>
        </div>
      </div>

      {/* stats band */}
      <div className="relative z-10 px-5 sm:px-10 pb-8">
        <div
          data-hero-stats
          className="max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-7 border-t pt-7"
          style={{ borderColor: 'var(--fz-line)' }}
        >
          {heroStats.map((s) => (
            <div key={s.label} data-hero-fade className="flex flex-col items-start opacity-0" style={{ transform: 'translateY(22px)' }}>
              <span className="fz-display font-bold text-3xl sm:text-4xl text-white leading-none">
                <span data-count={s.value} data-decimals={s.decimals ?? 0}>
                  0
                </span>
                <span className="fz-grad-text">{s.suffix}</span>
              </span>
              <span className="mt-2 text-[11px] sm:text-xs uppercase tracking-[0.18em]" style={{ color: 'var(--fz-faint)' }}>
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div
        data-hero-hint
        data-hero-fade
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-3 opacity-0"
        aria-hidden="true"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]" style={{ color: 'var(--fz-faint)' }}>
          Scroll
        </span>
        <span className="fz-scroll-hint" />
        <ArrowDown size={12} style={{ color: 'var(--fz-faint)' }} />
      </div>
    </section>
  );
}

function animateCounters(root: HTMLElement, instant: boolean) {
  root.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
    const target = parseFloat(el.dataset.count || '0');
    const decimals = parseInt(el.dataset.decimals || '0', 10);
    if (instant) {
      el.textContent = target.toFixed(decimals);
      return;
    }
    const obj = { v: 0 };
    gsap.to(obj, {
      v: target,
      duration: 1.8,
      ease: 'power3.out',
      onUpdate: () => {
        el.textContent = obj.v.toFixed(decimals);
      },
    });
  });
}
