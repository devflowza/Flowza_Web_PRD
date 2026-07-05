import { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowRight, TrendingUp, Users, Globe, Activity, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import PortalOverlay, { type PortalState } from './PortalOverlay';
import ProductOrbit from './ProductOrbit';

const stats = [
  { value: 100, suffix: '+', label: 'Active Businesses', icon: Users },
  { value: 4, suffix: '+', label: 'MEA region & India', icon: Globe },
  { value: 94, suffix: '%', label: 'Automation Rate', icon: TrendingUp },
  { value: 99.9, suffix: '%', label: 'Uptime SLA', icon: Activity },
];

const defaultPortal: PortalState = {
  active: false,
  url: '',
  productName: '',
  tagline: '',
  color: '#0ea5e9',
  colorSecondary: '#0c4a8a',
  originX: 0,
  originY: 0,
  phase: 'idle',
};

export default function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [countersVisible, setCountersVisible] = useState(false);
  const [counts, setCounts] = useState(stats.map(() => 0));
  const [portal, setPortal] = useState<PortalState>(defaultPortal);
  const statsRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      setMousePos({
        x: ((e.clientX - rect.left) / rect.width - 0.5) * 30,
        y: ((e.clientY - rect.top) / rect.height - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCountersVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!countersVisible) return;
    const targets = stats.map((s) => s.value);
    const duration = 1800;
    const start = performance.now();

    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCounts(targets.map((t) => parseFloat((t * ease).toFixed(1))));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [countersVisible]);

  const handlePortalComplete = useCallback(() => {
    setPortal((prev) => ({ ...prev, phase: 'idle' }));
    setTimeout(() => setPortal(defaultPortal), 100);
  }, []);

  return (
    <>
      <PortalOverlay portal={portal} onComplete={handlePortalComplete} />

      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-28 pb-16 overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #f4faff 0%, #ffffff 55%, #ffffff 100%)' }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(14,165,233,0.16) 0%, rgba(56,189,248,0.08) 40%, transparent 70%)',
          }}
        />
        <div className="absolute inset-0 dot-grid-light pointer-events-none opacity-60" />

        <div
          className="absolute inset-x-0 bottom-0 h-48 pointer-events-none z-[1]"
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, #ffffff 100%)',
          }}
        />

        <div
          className="absolute inset-0 pointer-events-none transition-transform duration-700 ease-out"
          style={{
            background: `radial-gradient(ellipse 40% 40% at ${50 + mousePos.x * 0.5}% ${50 + mousePos.y * 0.5}%, rgba(14,165,233,0.08) 0%, transparent 70%)`,
          }}
        />

        <div className="relative z-10 flex flex-col items-center gap-6 max-w-5xl mx-auto">
          <div
            className="flex flex-col items-center gap-3"
            style={{ animation: 'fadeIn 0.8s ease-out forwards' }}
          >
            <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(14,165,233,0.28)] border border-sky-100 ring-1 ring-sky-100/60">
              <img
                src="/Logo_Final_-_Focused.jpeg"
                alt="Flowza AI"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-sky-200 bg-sky-50 backdrop-blur-sm text-sm font-medium text-sky-700"
            style={{ animation: 'fadeIn 0.8s ease-out 0.1s both' }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
            </span>
            <span>AI-Powered Business Operating Systems</span>
          </div>

          <h1
            className="font-display font-extrabold text-gray-900 tracking-tight"
            style={{ perspective: '600px', transformStyle: 'preserve-3d' }}
          >
            <div className="text-5xl sm:text-6xl md:text-7xl lg:text-[84px] leading-[1.0] tracking-[-0.02em]">
              <span className="hero-word" style={{ animationDelay: '0.05s' }}>One Platform</span>
            </div>
            <div className="text-3xl sm:text-4xl md:text-5xl lg:text-[60px] leading-[1.05] mt-1.5 flex flex-col items-center">
              <span className="text-gradient-hero hero-word font-black tracking-[-0.02em]" style={{ animationDelay: '0.32s' }}>Every Business Need</span>
              <span
                className="hero-underline mt-3 h-[5px] w-[58%] rounded-full"
                style={{ background: 'linear-gradient(90deg, transparent, #0ea5e9 22%, #06b6d4 78%, transparent)' }}
              />
            </div>
          </h1>

          <p
            className="text-lg sm:text-xl text-gray-600 max-w-4xl leading-relaxed"
            style={{ animation: 'slideUp 0.7s ease-out 0.2s both' }}
          >
            Flowza delivers purpose-built platforms — from Finance, Logistics, Hospitality/Wellness, Fleet, QR, POS, Rent Management to People Management Solution (PMS) — empowering 100+ businesses across the world.
          </p>

          <div
            className="flex flex-col sm:flex-row items-center gap-3 mt-2"
            style={{ animation: 'slideUp 0.7s ease-out 0.3s both' }}
          >
            <a
              href="#products"
              className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-semibold text-white transition-all duration-300 shadow-[0_6px_20px_rgba(14,165,233,0.28)] hover:-translate-y-0.5 hover:shadow-[0_10px_36px_rgba(14,165,233,0.45)]"
              style={{ background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 50%, #0369a1 100%)' }}
            >
              <span className="flex items-center gap-2.5">
                Explore Products
                <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </a>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-gray-700 bg-white border border-gray-300 hover:border-sky-300 hover:text-sky-700 hover:bg-sky-50 transition-all duration-300 hover:-translate-y-0.5"
            >
              Contact Us
            </Link>
          </div>

          <div
            className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mt-1"
            style={{ animation: 'fadeIn 0.8s ease-out 0.5s both' }}
          >
            {['No credit card required', 'Setup in minutes', '100+ businesses trust Flowza'].map((item) => (
              <span key={item} className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500">
                <span className="flex items-center justify-center w-4 h-4 rounded-full bg-emerald-100">
                  <Check size={10} className="text-emerald-600" strokeWidth={3} />
                </span>
                {item}
              </span>
            ))}
          </div>
        </div>

        <div
          className="relative z-10 mt-10"
          style={{ animation: 'fadeIn 0.9s ease-out 0.6s both' }}
        >
          <ProductOrbit />
        </div>

        <div
          ref={statsRef}
          className="relative z-10 mt-10 w-full max-w-3xl mx-auto"
          style={{ animation: 'slideUp 0.7s ease-out 0.4s both' }}
        >
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-6">
            {stats.map((stat, i) => (
              <div key={stat.label} className="flex flex-col items-start">
                <div className="font-display font-extrabold text-3xl text-gray-900 leading-none">
                  {countersVisible ? (
                    <span>
                      {stat.value % 1 === 0 ? Math.round(counts[i]) : counts[i].toFixed(1)}
                      {stat.suffix}
                    </span>
                  ) : (
                    <span>0{stat.suffix}</span>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1 leading-tight">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
