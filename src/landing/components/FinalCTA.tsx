import { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { gsap } from '../gsapSetup';
import { WHATSAPP_URL } from '../data';
import MagneticButton from './MagneticButton';

export default function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.from('[data-cta-stage] > *', {
        y: 48,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 70%' },
      });

      gsap.fromTo(
        '[data-cta-glow]',
        { scale: 0.7, opacity: 0.4 },
        {
          scale: 1.15,
          opacity: 1,
          ease: 'none',
          scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 1 },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-32 sm:py-44 fz-hairline-t"
      style={{ background: 'var(--fz-ink)' }}
    >
      <div
        data-cta-glow
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(14, 165, 233, 0.16) 0%, rgba(34, 211, 238, 0.06) 40%, transparent 68%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{
          backgroundImage: 'radial-gradient(rgba(148, 184, 210, 0.1) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
          maskImage: 'radial-gradient(ellipse 60% 60% at 50% 50%, black 0%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse 60% 60% at 50% 50%, black 0%, transparent 75%)',
        }}
      />

      <div data-cta-stage className="relative z-10 max-w-[1000px] mx-auto px-5 text-center flex flex-col items-center">
        <p className="fz-eyebrow mb-8" style={{ justifyContent: 'center' }}>
          Ready when you are
        </p>

        <h2 className="fz-cta-title text-white mb-7">
          Find your <em className="fz-serif fz-grad-text">flow.</em>
        </h2>

        <p className="max-w-[46ch] text-base sm:text-lg leading-relaxed mb-12" style={{ color: 'var(--fz-muted)' }}>
          Tell us how your business runs today. We'll scope the right platform and have you live in
          days — not months. No credit card, no lock-in.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <MagneticButton>
            <Link to="/contact" className="fz-btn fz-btn-primary no-underline group" data-cursor>
              Start the conversation
              <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </MagneticButton>
          <MagneticButton strength={0.22}>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="fz-btn fz-btn-ghost no-underline" data-cursor>
              <MessageCircle size={15} className="text-emerald-400" />
              WhatsApp us
            </a>
          </MagneticButton>
        </div>

        <p className="mt-9 text-xs" style={{ color: 'var(--fz-faint)' }}>
          No credit card required · Setup in minutes · Cancel anytime
        </p>
      </div>
    </section>
  );
}
