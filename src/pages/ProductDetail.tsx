import { useState, useCallback, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, ChevronRight, Cpu, LayoutGrid } from 'lucide-react';
import PortalOverlay, { type PortalState } from '../components/PortalOverlay';
import Footer from '../components/Footer';
import Pricing from '../components/Pricing';
import productDetailsMap from '../data/productDetails';
import { productImages } from '../assets/productImages';
import { useTransition } from '../context/TransitionContext';

const defaultPortal: PortalState = {
  active: false,
  url: '',
  productName: '',
  tagline: '',
  color: '#0ea5e9',
  colorSecondary: '#0369a1',
  originX: 0,
  originY: 0,
  phase: 'idle',
};

export default function ProductDetail() {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const [portal, setPortal] = useState<PortalState>(defaultPortal);
  const [heroVisible, setHeroVisible] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const [featuresVisible, setFeaturesVisible] = useState(false);
  const [stepsVisible, setStepsVisible] = useState(false);
  const [testimonialVisible, setTestimonialVisible] = useState(false);
  const [relatedVisible, setRelatedVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const statsRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const testimonialRef = useRef<HTMLDivElement>(null);
  const relatedRef = useRef<HTMLDivElement>(null);

  const { phase: morphPhase, reducedMotion } = useTransition();
  const isMorphing = morphPhase === 'expanding' || morphPhase === 'covering';

  const product = productId ? productDetailsMap[productId] : null;

  useEffect(() => {
    if (!product) {
      navigate('/', { replace: true });
    }
  }, [product, navigate]);

  useEffect(() => {
    if (product) {
      document.title = `${product.name} — Flowza AI`;
    }
    return () => {
      document.title = 'Flowza AI';
    };
  }, [product]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productId]);

  useEffect(() => {
    if (isMorphing && !reducedMotion) return;
    const timer = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(timer);
  }, [isMorphing, reducedMotion]);

  useEffect(() => {
    if (!isMorphing && !heroVisible && !reducedMotion) {
      const timer = setTimeout(() => setHeroVisible(true), 80);
      return () => clearTimeout(timer);
    }
  }, [isMorphing, heroVisible, reducedMotion]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const makeObserver = (
      ref: React.RefObject<HTMLDivElement>,
      setter: (v: boolean) => void,
      threshold = 0.15
    ) => {
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setter(true); },
        { threshold }
      );
      if (ref.current) observer.observe(ref.current);
      return observer;
    };

    const o1 = makeObserver(statsRef, setStatsVisible);
    const o2 = makeObserver(featuresRef, setFeaturesVisible);
    const o3 = makeObserver(stepsRef, setStepsVisible);
    const o4 = makeObserver(testimonialRef, setTestimonialVisible, 0.2);
    const o5 = makeObserver(relatedRef, setRelatedVisible);

    return () => {
      o1.disconnect(); o2.disconnect(); o3.disconnect();
      o4.disconnect(); o5.disconnect();
    };
  }, []);

  const launchPortal = useCallback((e: React.MouseEvent) => {
    if (!product) return;
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const originX = rect.left + rect.width / 2;
    const originY = rect.top + rect.height / 2;

    setPortal({
      active: true,
      url: product.href,
      productName: product.name,
      tagline: product.tagline,
      color: product.color,
      colorSecondary: product.colorSecondary,
      originX,
      originY,
      phase: 'expanding',
    });

    setTimeout(() => setPortal((p) => ({ ...p, phase: 'showing' })), 50);
    setTimeout(() => setPortal((p) => ({ ...p, phase: 'flashing' })), 1100);
  }, [product]);

  const handlePortalComplete = useCallback(() => {
    setPortal((p) => ({ ...p, phase: 'idle' }));
    setTimeout(() => setPortal(defaultPortal), 100);
  }, []);

  if (!product) return null;

  const Icon = product.icon;

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <PortalOverlay portal={portal} onComplete={handlePortalComplete} />

      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-2xl border-b border-gray-200/80 shadow-[0_4px_24px_rgba(14,165,233,0.10)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              to="/#products"
              className={`flex items-center gap-2 text-sm transition-colors duration-200 ${
                scrolled ? 'text-gray-500 hover:text-gray-900' : 'text-white/70 hover:text-white'
              }`}
            >
              <ArrowLeft size={15} />
              <span className="hidden sm:inline">Back</span>
            </Link>
            <div className={`w-px h-4 transition-colors duration-300 ${scrolled ? 'bg-gray-200' : 'bg-white/20'}`} />
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-7 h-7 rounded-lg bg-violet-gradient flex items-center justify-center shadow-[0_0_16px_rgba(14,165,233,0.4)]">
                <Cpu size={13} className="text-white" />
              </div>
              <span className={`font-display font-bold text-sm tracking-tight transition-colors duration-300 ${scrolled ? 'text-gray-900' : 'text-white'}`}>
                Flowza<span className="text-gradient-violet"> AI</span>
              </span>
            </Link>
            <ChevronRight size={13} className={`transition-colors duration-300 ${scrolled ? 'text-gray-400' : 'text-white/40'}`} />
            <span className={`text-sm font-medium transition-colors duration-300 ${scrolled ? 'text-gray-700' : 'text-white/90'}`}>
              {product.name}
            </span>
          </div>

          <button
            onClick={launchPortal}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            style={{
              background: `linear-gradient(135deg, ${product.color}, ${product.colorSecondary})`,
              boxShadow: `0 4px 20px ${product.color}40`,
            }}
          >
            <ExternalLink size={13} />
            <span className="hidden sm:inline">Open App</span>
          </button>
        </div>
      </header>

      <section className="relative min-h-[70vh] flex items-end pb-0 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${product.colorSecondary}f0 0%, ${product.color}cc 40%, #0a0a1a 100%)`,
          }}
        />
        <img
          src={productImages[product.id]}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover mix-blend-luminosity opacity-30"
        />
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 80% 60% at 20% 50%, ${product.color}20 0%, transparent 60%)`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/55" />

        <div className="relative max-w-6xl mx-auto px-6 pt-32 pb-16 w-full">
          <div
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'translateY(0)' : 'translateY(32px)',
              transition: 'opacity 0.7s ease, transform 0.7s ease',
            }}
          >
            <div className="flex flex-wrap items-center gap-3 mb-6">
              {product.badges.map((badge) => (
                <span
                  key={badge}
                  className="px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm text-white"
                  style={{
                    background: 'rgba(255,255,255,0.15)',
                    border: '1px solid rgba(255,255,255,0.35)',
                  }}
                >
                  {badge}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-4 mb-4">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
                style={{
                  background: 'rgba(255,255,255,0.15)',
                  border: '1px solid rgba(255,255,255,0.30)',
                  boxShadow: `0 0 40px ${product.color}40`,
                }}
              >
                <Icon size={26} className="text-white" />
              </div>
              <div>
                <p
                  className="text-sm font-semibold tracking-widest uppercase text-white/90"
                  style={{ textShadow: '0 1px 6px rgba(0,0,0,0.4)' }}
                >
                  {product.tagline}
                </p>
                <h1
                  className="font-display text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-none"
                  style={{ textShadow: '0 2px 16px rgba(0,0,0,0.35)' }}
                >
                  {product.name}
                </h1>
              </div>
            </div>

            <p
              className="text-white/95 text-lg max-w-2xl leading-relaxed mb-8"
              style={{ textShadow: '0 1px 8px rgba(0,0,0,0.45)' }}
            >
              {product.longDescription}
            </p>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={launchPortal}
                className="flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                style={{
                  background: `linear-gradient(135deg, ${product.color}, ${product.colorSecondary})`,
                  boxShadow: `0 8px 32px ${product.color}50`,
                }}
              >
                <span>Launch {product.name}</span>
                <ExternalLink size={15} />
              </button>
              {product.id === 'finance' && (
                <>
                  <Link
                    to="/finance-demo"
                    className="flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-white border backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
                    style={{ borderColor: 'rgba(255,255,255,0.5)', background: 'rgba(0,0,0,0.20)' }}
                  >
                    <LayoutGrid size={15} />
                    Features
                  </Link>
                  <button
                    onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                    className="flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-white border backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
                    style={{ borderColor: 'rgba(255,255,255,0.5)', background: 'rgba(0,0,0,0.20)' }}
                  >
                    Pricing Plans
                  </button>
                </>
              )}
              <Link
                to="/#products"
                className="flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-white border backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
                style={{ borderColor: 'rgba(255,255,255,0.5)', background: 'rgba(0,0,0,0.20)' }}
              >
                View All Products
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section ref={statsRef} className="relative py-14 px-6 border-b border-gray-100 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {product.stats.map((stat, i) => (
              <div
                key={stat.label}
                className="text-center py-7 px-4 rounded-2xl bg-white"
                style={{
                  opacity: statsVisible ? 1 : 0,
                  transform: statsVisible ? 'translateY(0)' : 'translateY(24px)',
                  transition: `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s`,
                  border: `1px solid ${product.color}20`,
                  borderTop: `3px solid ${product.color}`,
                  boxShadow: statsVisible ? `0 4px 24px ${product.color}10` : 'none',
                }}
              >
                <div
                  className="font-display text-3xl sm:text-4xl font-extrabold mb-2 tracking-tight"
                  style={{ color: product.colorSecondary }}
                >
                  {stat.value}
                </div>
                <p className="text-gray-600 text-xs leading-relaxed font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section ref={featuresRef} className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div
            className="text-center mb-14"
            style={{
              opacity: featuresVisible ? 1 : 0,
              transform: featuresVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.6s ease, transform 0.6s ease',
            }}
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs uppercase tracking-widest mb-5 font-semibold"
              style={{
                background: `${product.color}12`,
                border: `1px solid ${product.color}30`,
                color: product.color,
              }}
            >
              Core Capabilities
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
              Everything you need,<br />
              <span style={{ color: product.color }}>nothing you don't</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {product.features.map((feature, i) => {
              const FIcon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="p-6 rounded-2xl border border-gray-100 bg-white hover:border-opacity-50 transition-all duration-300 group"
                  style={{
                    opacity: featuresVisible ? 1 : 0,
                    transform: featuresVisible ? 'translateY(0)' : 'translateY(32px)',
                    transition: `opacity 0.6s ease ${0.1 + i * 0.07}s, transform 0.6s ease ${0.1 + i * 0.07}s, box-shadow 0.3s ease`,
                    boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 12px 40px ${product.color}18, 0 0 0 1px ${product.color}25`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 1px 4px rgba(0,0,0,0.04)';
                  }}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: `${product.color}15`,
                      border: `1px solid ${product.color}30`,
                    }}
                  >
                    <FIcon size={20} style={{ color: product.color }} />
                  </div>
                  <h3 className="font-display text-base font-bold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section
        ref={stepsRef}
        className="py-24 px-6"
        style={{ background: 'linear-gradient(135deg, #f8f9ff 0%, #f0f4ff 100%)' }}
      >
        <div className="max-w-5xl mx-auto">
          <div
            className="text-center mb-14"
            style={{
              opacity: stepsVisible ? 1 : 0,
              transform: stepsVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.6s ease, transform 0.6s ease',
            }}
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs uppercase tracking-widest mb-5 font-semibold"
              style={{
                background: `${product.color}12`,
                border: `1px solid ${product.color}30`,
                color: product.color,
              }}
            >
              How It Works
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
              Up and running in <span style={{ color: product.color }}>three steps</span>
            </h2>
          </div>

          <div className="relative">
            <div
              className="absolute left-8 top-10 bottom-10 w-px hidden lg:block"
              style={{ background: `linear-gradient(to bottom, ${product.color}40, ${product.color}10)` }}
            />
            <div className="space-y-8">
              {product.steps.map((step, i) => (
                <div
                  key={step.number}
                  className="flex gap-6 items-start"
                  style={{
                    opacity: stepsVisible ? 1 : 0,
                    transform: stepsVisible ? 'translateX(0)' : 'translateX(-24px)',
                    transition: `opacity 0.6s ease ${0.15 + i * 0.15}s, transform 0.6s ease ${0.15 + i * 0.15}s`,
                  }}
                >
                  <div
                    className="relative w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 font-display font-black text-lg z-10"
                    style={{
                      background: `linear-gradient(135deg, ${product.color}20, ${product.color}08)`,
                      border: `2px solid ${product.color}40`,
                      color: product.color,
                    }}
                  >
                    {step.number}
                  </div>
                  <div className="pt-3">
                    <h3 className="font-display text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-500 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section ref={testimonialRef} className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div
            style={{
              opacity: testimonialVisible ? 1 : 0,
              transform: testimonialVisible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.98)',
              transition: 'opacity 0.7s ease, transform 0.7s ease',
            }}
          >
            <div
              className="inline-block p-8 rounded-3xl border bg-white relative"
              style={{
                borderColor: `${product.color}25`,
                boxShadow: `0 20px 80px ${product.color}15, 0 0 0 1px ${product.color}10`,
              }}
            >
              <div
                className="absolute -top-4 left-1/2 -translate-x-1/2 text-5xl font-serif leading-none select-none"
                style={{ color: product.color }}
              >
                &ldquo;
              </div>
              <p className="text-gray-700 text-lg leading-relaxed mb-6 pt-2">
                {product.testimonial.quote}
              </p>
              <div className="flex items-center justify-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
                  style={{ background: `linear-gradient(135deg, ${product.color}, ${product.colorSecondary})` }}
                >
                  {product.testimonial.initials}
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-gray-900">{product.testimonial.name}</p>
                  <p className="text-xs text-gray-500">{product.testimonial.role}, {product.testimonial.company}</p>
                </div>
                <div
                  className="ml-2 px-2.5 py-1 rounded-full text-xs font-medium"
                  style={{
                    background: `${product.color}12`,
                    border: `1px solid ${product.color}25`,
                    color: product.color,
                  }}
                >
                  {product.name}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {product.id === 'finance' && <Pricing />}

      <section
        className="py-20 px-6 text-center"
        style={{
          background: `linear-gradient(135deg, ${product.colorSecondary}ee 0%, ${product.color}cc 100%)`,
        }}
      >
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Ready to transform your operations?
          </h2>
          <p className="text-white/90 text-lg mb-8 leading-relaxed">
            Join hundreds of businesses already running on {product.name}. Start today — no long contracts, no hidden fees.
          </p>
          <button
            onClick={launchPortal}
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-sm font-bold transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
            style={{
              background: 'rgba(255,255,255,0.15)',
              border: '1px solid rgba(255,255,255,0.3)',
              color: '#fff',
              backdropFilter: 'blur(12px)',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.25)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.15)';
            }}
          >
            <span>Open {product.name}</span>
            <ExternalLink size={15} />
          </button>
        </div>
      </section>


      <section ref={relatedRef} className="py-20 border-t border-gray-100 overflow-hidden" style={{ background: '#f7f8fa' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div
            className="mb-10"
            style={{
              opacity: relatedVisible ? 1 : 0,
              transform: relatedVisible ? 'translateY(0)' : 'translateY(16px)',
              transition: 'opacity 0.6s ease, transform 0.6s ease',
            }}
          >
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: product.color }}>More Products</p>
            <h3 className="font-display text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
              Explore More <span style={{ color: product.color }}>Flowza AI Solutions</span>
            </h3>
            <p className="text-gray-400 text-sm mt-2 max-w-sm leading-relaxed">
              Discover other powerful tools built to transform your business operations
            </p>
          </div>
        </div>

        <div
          className="relative overflow-hidden"
          style={{
            opacity: relatedVisible ? 1 : 0,
            transition: 'opacity 0.5s ease 0.2s',
          }}
          onMouseEnter={(e) => {
            const track = e.currentTarget.querySelector('.marquee-track') as HTMLElement | null;
            if (track) track.style.animationPlayState = 'paused';
          }}
          onMouseLeave={(e) => {
            const track = e.currentTarget.querySelector('.marquee-track') as HTMLElement | null;
            if (track) track.style.animationPlayState = 'running';
          }}
        >
          <div
            className="marquee-track flex gap-5 pb-4 w-max"
            style={{
              animation: 'marquee 32s linear infinite',
              paddingLeft: 'max(24px, calc((100vw - 1152px) / 2 + 24px))',
            }}
          >
            {[...product.related, ...product.related].map((rel, i) => (
              <Link
                key={`${rel.id}-${i}`}
                to={`/products/${rel.id}`}
                className="group shrink-0 flex flex-col rounded-2xl overflow-hidden bg-white"
                style={{
                  width: 260,
                  boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
                  transition: 'transform 0.35s cubic-bezier(.22,.68,0,1.2), box-shadow 0.25s ease',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.boxShadow = `0 16px 48px ${rel.color}28, 0 2px 12px rgba(0,0,0,0.07)`;
                  el.style.transform = 'translateY(-6px) translateX(0)';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.boxShadow = '0 2px 12px rgba(0,0,0,0.07)';
                  el.style.transform = 'translateY(0) translateX(0)';
                }}
              >
                <div className="relative overflow-hidden" style={{ height: 170, background: rel.lightBg ? '#f0ede8' : undefined }}>
                  <img
                    src={rel.pexelsImage}
                    alt={rel.name}
                    className={`w-full h-full transition-transform duration-500 group-hover:scale-105 ${rel.lightBg ? 'object-contain p-3' : 'object-cover'}`}
                    style={{ display: 'block' }}
                  />
                  {!rel.lightBg && (
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(135deg, ${rel.color}cc 0%, ${rel.colorSecondary}e6 100%)`,
                      mixBlendMode: 'multiply',
                    }}
                  />
                  )}
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 55%)' }} />
                  <p className="absolute bottom-3 left-4 text-white font-display font-bold text-base leading-tight" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.3)' }}>
                    {rel.name}
                  </p>
                </div>
                <div className="px-4 py-4 flex flex-col gap-3">
                  <p className="text-sm font-medium leading-snug" style={{ color: rel.color }}>{rel.tagline}</p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-800 group-hover:gap-2.5 transition-all duration-200">
                    Learn More <ChevronRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
