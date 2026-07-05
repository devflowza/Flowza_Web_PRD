import { useState, useRef, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight, DollarSign, Flower2, Truck, QrCode, ShoppingCart, Car, Sparkles, Shield, Zap } from 'lucide-react';
import { productImages } from '../assets/productImages';
import { useTransition } from '../context/TransitionContext';

const products = [
  {
    id: 'finance',
    name: 'Flowza Finance',
    tagline: 'All-in-One Accounting & ERP',
    description: 'Accounting, invoicing, inventory, payroll, HR and compliance — unified in one cloud platform. Real-time data, multi-currency, and country-specific tax built in.',
    color: '#10b981',
    colorSecondary: '#059669',
    cardBg: 'linear-gradient(160deg, #0a1a12 0%, #0d1f16 50%, #071510 100%)',
    glowColor: 'rgba(16,185,129,0.18)',
    icon: DollarSign,
    href: 'https://finance.flowza.ai',
    badges: ['Payroll & HR', 'Inventory', 'India + Gulf tax'],
  },
  {
    id: 'qrforge',
    name: 'Flowza QRForge',
    tagline: 'Dynamic QR Code Engine',
    description: 'Create, manage, and track QR codes at scale. Dynamic redirects, scan analytics, branded codes, and bulk generation for campaigns.',
    color: '#f59e0b',
    colorSecondary: '#d97706',
    cardBg: 'linear-gradient(160deg, #1a1400 0%, #1f1800 50%, #120f00 100%)',
    glowColor: 'rgba(245,158,11,0.18)',
    icon: QrCode,
    href: 'https://qrforge.flowza.ai',
    badges: ['Dynamic Redirect', 'Scan Analytics', 'Bulk Generation'],
    comingSoon: true,
  },
  {
    id: 'logispro',
    name: 'Flowza LogisPro',
    tagline: 'Smart Logistics Platform',
    description: 'Intelligent route optimization, shipment tracking, and warehouse management. Reduce delivery costs by up to 30% with AI-driven logistics.',
    color: '#38bdf8',
    colorSecondary: '#0ea5e9',
    cardBg: 'linear-gradient(160deg, #03111e 0%, #041826 50%, #021018 100%)',
    glowColor: 'rgba(56,189,248,0.18)',
    icon: Truck,
    href: 'https://logispro.flowza.ai',
    badges: ['Route Optimization', 'Live Tracking', 'Warehouse WMS'],
    comingSoon: true,
  },
  {
    id: 'spamaster',
    name: 'Flowza Spa Master',
    tagline: 'Spa & Wellness Management',
    description: 'End-to-end platform for spas and wellness centers. Online booking, staff scheduling, inventory, and customer loyalty — all unified.',
    color: '#f43f5e',
    colorSecondary: '#e11d48',
    cardBg: 'linear-gradient(160deg, #1a030a 0%, #200510 50%, #16020b 100%)',
    glowColor: 'rgba(244,63,94,0.18)',
    icon: Flower2,
    href: 'https://spamaster.flowza.ai',
    badges: ['Online Booking', 'Staff Scheduling', 'Loyalty Programs'],
    comingSoon: true,
  },
  {
    id: 'fleetza',
    name: 'Flowza Fleetza',
    tagline: 'Fleet Intelligence System',
    description: 'Real-time GPS tracking, driver behavior scoring, predictive maintenance alerts, and fuel analytics for your entire fleet.',
    color: '#06b6d4',
    colorSecondary: '#0891b2',
    cardBg: 'linear-gradient(160deg, #021418 0%, #031b20 50%, #021014 100%)',
    glowColor: 'rgba(6,182,212,0.18)',
    icon: Car,
    href: 'https://fleetza.flowza.ai',
    badges: ['GPS Tracking', 'Driver Scoring', 'Predictive Maintenance'],
    comingSoon: true,
  },
  {
    id: 'pos',
    name: 'Flowza POS',
    tagline: 'Next-Gen Point of Sale',
    description: 'A blazing-fast POS system with offline mode, multi-location inventory, and deep customer analytics. Works on any device, anywhere.',
    color: '#0ea5e9',
    colorSecondary: '#0284c7',
    cardBg: 'linear-gradient(160deg, #021420 0%, #031a28 50%, #021018 100%)',
    glowColor: 'rgba(14,165,233,0.18)',
    icon: ShoppingCart,
    href: 'https://pos.flowza.ai',
    badges: ['Offline Mode', 'Multi-location', 'Deep Analytics'],
    comingSoon: true,
  },
];

const whyItems = [
  {
    icon: Sparkles,
    title: 'Purpose-Built AI',
    desc: 'Every product is trained on industry-specific data — not generic models. The AI understands your business context from day one.',
    color: '#0ea5e9',
  },
  {
    icon: Shield,
    title: 'Enterprise-Grade Security',
    desc: 'SOC 2 compliant infrastructure with end-to-end encryption, role-based access, and audit trails on every action.',
    color: '#10b981',
  },
  {
    icon: Zap,
    title: 'Zero Complexity Onboarding',
    desc: 'Go live in hours, not weeks. Pre-built templates, guided setup wizards, and dedicated onboarding support included.',
    color: '#f59e0b',
  },
  {
    icon: DollarSign,
    title: 'True Cost Savings',
    desc: 'Our customers report 40–85% reduction in manual operational work within the first 90 days of using Flowza products.',
    color: '#f43f5e',
  },
];

export default function Features() {
  const navigate = useNavigate();
  const { beginTransition, reducedMotion } = useTransition();
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const [whyVisible, setWhyVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const whyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = Number(entry.target.getAttribute('data-idx'));
          if (entry.isIntersecting) {
            setVisibleCards((prev) => new Set([...prev, idx]));
          }
        });
      },
      { threshold: 0.12 }
    );
    cardRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setWhyVisible(true); },
      { threshold: 0.2 }
    );
    if (whyRef.current) observer.observe(whyRef.current);
    return () => observer.disconnect();
  }, []);

  const handleProductClick = useCallback((e: React.MouseEvent, product: typeof products[0], index: number) => {
    e.preventDefault();
    const cardEl = cardRefs.current[index];
    if (cardEl && !reducedMotion) {
      const rect = cardEl.getBoundingClientRect();
      beginTransition({
        rect,
        productId: product.id,
        productName: product.name,
        tagline: product.tagline,
        color: product.color,
        colorSecondary: product.colorSecondary,
        imageSrc: productImages[product.id],
        badges: product.badges,
        iconComponent: product.icon,
      });
      setTimeout(() => navigate(`/products/${product.id}`), 180);
    } else {
      navigate(`/products/${product.id}`);
    }
  }, [navigate, beginTransition, reducedMotion]);

  return (
    <>
      <section id="products" className="relative py-32 px-6 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(180deg, #f0f7ff 0%, #e0f2fe 30%, #f0f9ff 60%, #ffffff 100%)',
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(rgba(14,165,233,0.06) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(14,165,233,0.1) 0%, transparent 70%)',
          }}
        />

        <div className="relative max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-sky-200 bg-sky-50 text-xs text-sky-700 uppercase tracking-widest mb-6 font-semibold">
              Our Platforms
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight mb-5">
              Purpose-Built for{' '}
              <span className="text-gradient-dark">Your Industry</span>
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
              All vertically are integrated with AI platforms, each designed to eliminate the manual overhead in a specific business domain.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {products.map((product, i) => {
              const Icon = product.icon;
              const isVisible = visibleCards.has(i);
              const isHovered = hoveredCard === i;
              return (
                <div
                  key={product.id}
                  ref={(el) => { cardRefs.current[i] = el; }}
                  data-idx={i}
                  className="group relative rounded-2xl overflow-hidden cursor-pointer"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.97)',
                    transition: `opacity 0.65s cubic-bezier(0.22,1,0.36,1) ${i * 0.1}s, transform 0.65s cubic-bezier(0.22,1,0.36,1) ${i * 0.1}s, box-shadow 0.35s ease`,
                    background: 'linear-gradient(160deg, #ffffff 0%, #f8fbff 100%)',
                    boxShadow: isHovered
                      ? `0 24px 64px ${product.color}26, 0 0 0 1.5px ${product.color}55, 0 12px 40px rgba(15,23,42,0.08)`
                      : `0 1px 3px rgba(15,23,42,0.06), 0 10px 30px rgba(15,23,42,0.05), 0 0 0 1px ${product.color}1f`,
                  }}
                  onMouseEnter={() => setHoveredCard(i)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onClick={(e) => handleProductClick(e, product, i)}
                >
                  <div
                    className="absolute top-0 left-0 right-0 h-[2px] z-20 transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(90deg, transparent 0%, ${product.color} 50%, transparent 100%)`,
                      opacity: isHovered ? 1 : 0.5,
                    }}
                  />

                  <div
                    className="absolute inset-0 pointer-events-none z-0 transition-opacity duration-500"
                    style={{
                      background: `radial-gradient(ellipse 80% 60% at 50% 100%, ${product.glowColor} 0%, transparent 70%)`,
                      opacity: isHovered ? 1 : 0.6,
                    }}
                  />

                  {product.id === 'finance' && (
                    <div
                      className="absolute top-3 left-3 z-30 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold"
                      style={{
                        background: 'rgba(16,185,129,0.15)',
                        border: '1.5px solid rgba(16,185,129,0.6)',
                        color: '#10b981',
                        backdropFilter: 'blur(10px)',
                        boxShadow: '0 0 14px rgba(16,185,129,0.4)',
                      }}
                    >
                      <span
                        className="inline-flex rounded-full"
                        style={{
                          width: '7px',
                          height: '7px',
                          background: '#10b981',
                          animation: 'liveLedBlink 1s ease-in-out infinite',
                          flexShrink: 0,
                        }}
                      />
                      Live
                    </div>
                  )}

                  {product.comingSoon && (
                    <>
                      <div
                        className="absolute top-3 left-3 z-30 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold"
                        style={{
                          backdropFilter: 'blur(10px)',
                          WebkitBackdropFilter: 'blur(10px)',
                          border: '1.5px solid',
                          animation: 'amberLedBadge 1.4s ease-in-out infinite',
                        }}
                      >
                        <span
                          className="inline-flex rounded-full"
                          style={{
                            width: '7px',
                            height: '7px',
                            flexShrink: 0,
                            animation: 'amberLedDot 1.4s ease-in-out infinite',
                          }}
                        />
                        Coming Soon
                      </div>

                      <div
                        className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none overflow-hidden"
                        style={{ borderRadius: 'inherit' }}
                      >
                        <span
                          className="font-black tracking-widest uppercase select-none"
                          style={{
                            fontSize: '2.4rem',
                            color: product.color,
                            opacity: 0.18,
                            transform: 'rotate(-30deg)',
                            whiteSpace: 'nowrap',
                            textShadow: `0 0 40px ${product.color}`,
                            letterSpacing: '0.15em',
                          }}
                        >
                          Coming Soon
                        </span>
                      </div>
                    </>
                  )}

                  <div className="relative w-full overflow-hidden" style={{ height: '210px' }}>
                    <img
                      src={productImages[product.id]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      style={{
                        transform: isHovered ? 'scale(1.08)' : 'scale(1.02)',
                        transition: 'transform 0.8s cubic-bezier(0.22,1,0.36,1)',
                        clipPath: isVisible ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)',
                        transitionProperty: 'transform, clip-path',
                        transitionDuration: isVisible ? '0.8s, 0.85s' : '0.8s, 0s',
                        transitionTimingFunction: 'cubic-bezier(0.22,1,0.36,1)',
                        transitionDelay: `0s, ${0.08 + i * 0.1}s`,
                      }}
                    />

                    <div
                      className="absolute inset-0 transition-opacity duration-500"
                      style={{
                        background: `linear-gradient(135deg, ${product.color}30 0%, ${product.colorSecondary}50 100%)`,
                        mixBlendMode: 'overlay',
                        opacity: isHovered ? 0.55 : 0.45,
                      }}
                    />

                    <div
                      className="absolute inset-0"
                      style={{
                        background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.25) 50%, rgba(0,0,0,0.72) 100%)',
                      }}
                    />

                    <div className="absolute top-4 right-4 z-20">
                      <div
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-white text-xs font-semibold backdrop-blur-md"
                        style={{
                          background: `${product.color}22`,
                          border: `1px solid ${product.color}55`,
                          boxShadow: `0 2px 12px ${product.color}30`,
                        }}
                      >
                        <Icon size={11} />
                        {product.tagline}
                      </div>
                    </div>

                    <div className="absolute bottom-3 left-4 z-20">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center backdrop-blur-md"
                        style={{
                          background: `${product.color}20`,
                          border: `1.5px solid ${product.color}50`,
                          boxShadow: `0 0 16px ${product.color}40`,
                        }}
                      >
                        <Icon size={16} style={{ color: product.color }} />
                      </div>
                    </div>
                  </div>

                  <div className="relative p-6 pt-5 z-10">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3
                          className="font-display text-lg font-bold leading-snug"
                          style={{ color: '#0f172a' }}
                        >
                          {product.name}
                        </h3>
                        {product.comingSoon && (
                          <span
                            className="text-xs font-semibold tracking-wide"
                            style={{ color: '#64748b' }}
                          >
                            (Coming Soon)
                          </span>
                        )}
                      </div>
                      <div
                        className="flex items-center gap-1 transition-all duration-300 shrink-0 ml-2"
                        style={{
                          color: product.color,
                          opacity: isHovered && !product.comingSoon ? 1 : 0,
                          transform: isHovered ? 'translateX(0)' : 'translateX(-8px)',
                        }}
                      >
                        <span className="text-xs font-semibold whitespace-nowrap">Explore</span>
                        <ArrowUpRight size={13} />
                      </div>
                    </div>

                    <p
                      className="text-sm leading-relaxed mb-4"
                      style={{ color: '#475569' }}
                    >
                      {product.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                      {product.badges.map((badge) => (
                        <span
                          key={badge}
                          className="px-2.5 py-1 rounded-full text-xs font-medium transition-all duration-300"
                          style={{
                            background: isHovered ? `${product.color}22` : `${product.color}12`,
                            border: `1px solid ${product.color}${isHovered ? '50' : '30'}`,
                            color: isHovered ? product.color : `${product.color}bb`,
                          }}
                        >
                          {badge}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="why-flowza" className="py-28 px-6 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(180deg, #ffffff 0%, #f0f9ff 50%, #e0f2fe 100%)',
          }}
        />

        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-sky-200 bg-sky-50 text-xs text-sky-700 uppercase tracking-widest mb-6 font-semibold">
              Why Flowza
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
              Built Different.{' '}
              <span className="text-gradient-dark">Built Better.</span>
            </h2>
          </div>

          <div
            ref={whyRef}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {whyItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="flex gap-5 p-6 rounded-2xl transition-all duration-300"
                  style={{
                    opacity: whyVisible ? 1 : 0,
                    transform: whyVisible ? 'translateY(0)' : 'translateY(24px)',
                    transition: `opacity 0.6s ease ${i * 0.12}s, transform 0.6s ease ${i * 0.12}s, box-shadow 0.3s ease, border-color 0.3s ease`,
                    background: 'linear-gradient(145deg, #ffffff 0%, #f8fbff 100%)',
                    border: `1px solid rgba(14,165,233,0.12)`,
                    boxShadow: '0 2px 12px rgba(14,165,233,0.06)',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.boxShadow = `0 12px 40px ${item.color}20`;
                    el.style.borderColor = `${item.color}40`;
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.boxShadow = '0 2px 12px rgba(14,165,233,0.06)';
                    el.style.borderColor = 'rgba(14,165,233,0.12)';
                  }}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                    style={{
                      background: `${item.color}12`,
                      border: `1.5px solid ${item.color}30`,
                    }}
                  >
                    <Icon size={18} style={{ color: item.color }} />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
