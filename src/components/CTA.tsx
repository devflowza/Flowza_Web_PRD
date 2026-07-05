import { useRef, useEffect, useState } from 'react';
import { ArrowRight, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CTA() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-28 px-6 border-t border-sky-100">
      <div className="max-w-5xl mx-auto">
        <div
          className="relative rounded-3xl overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 45%, #0369a1 100%)',
            border: '1px solid rgba(255,255,255,0.15)',
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,255,255,0.12) 0%, rgba(125,211,252,0.14) 40%, transparent 70%)',
            }}
          />
          <div
            className="absolute inset-x-0 top-0 h-px"
            style={{
              background: 'radial-gradient(ellipse 50% 1px at 50% 0%, rgba(255,255,255,0.7) 0%, transparent 100%)',
            }}
          />
          <div className="absolute inset-0 dot-grid pointer-events-none opacity-30" />

          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)',
              animation: 'glowPulse 5s ease-in-out infinite',
            }}
          />

          <div
            className="relative z-10 p-14 md:p-20 text-center"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(24px)',
              transition: 'opacity 0.7s ease, transform 0.7s ease',
            }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/[0.08] text-xs text-white/80 uppercase tracking-widest mb-8 font-medium">
              Transform Your Business
            </div>

            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.05] mb-5">
              Ready to Join{' '}
              <span className="text-gradient-shimmer">100+ Businesses</span>
              <br />
              <span className="text-white/90">Powered by Flowza?</span>
            </h2>

            <p className="text-white/70 text-lg max-w-xl mx-auto leading-relaxed mb-10">
              Our team will scope your exact needs, recommend the right platform, and have you live within days — not months.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="#products"
                className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-semibold text-sky-700 bg-white hover:bg-white/90 hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] transition-all duration-300 hover:-translate-y-0.5 relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2.5">
                  Explore Products
                  <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-medium text-white border border-white/25 bg-white/[0.08] hover:bg-white/[0.15] hover:border-white/40 transition-all duration-300 hover:-translate-y-0.5"
              >
                <Mail size={15} />
                Contact Sales
              </Link>
            </div>

            <p className="mt-6 text-xs text-white/40">
              No credit card required · Setup in minutes · Cancel anytime
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
