import { useState, useEffect, useRef, useCallback } from 'react';
import { DollarSign, Flower2, Truck, QrCode, ShoppingCart, Car } from 'lucide-react';

interface OrbitProduct {
  id: string;
  name: string;
  tagline: string;
  color: string;
  icon: React.ElementType;
  image: string;
  lightBg?: boolean;
}

const orbitProducts: OrbitProduct[] = [
  {
    id: 'finance',
    name: 'Flowza Finance',
    tagline: 'All-in-One Finance & ERP',
    color: '#10b981',
    icon: DollarSign,
    image: '/product-finance.webp',
  },
  {
    id: 'logispro',
    name: 'Flowza LogisPro',
    tagline: 'Smart Logistics',
    color: '#38bdf8',
    icon: Truck,
    image: '/product-logispro.webp',
  },
  {
    id: 'fleetza',
    name: 'Flowza Fleetza',
    tagline: 'Fleet Intelligence',
    color: '#06b6d4',
    icon: Car,
    image: '/Fleetza.png',
  },
  {
    id: 'pos',
    name: 'Flowza POS',
    tagline: 'Next-Gen Point of Sale',
    color: '#0ea5e9',
    icon: ShoppingCart,
    image: '/POS_image.png',
    lightBg: true,
  },
  {
    id: 'qrforge',
    name: 'Flowza QRForge',
    tagline: 'Dynamic QR Engine',
    color: '#f59e0b',
    icon: QrCode,
    image: '/product-qrforge.webp',
  },
  {
    id: 'spamaster',
    name: 'Flowza Spa Master',
    tagline: 'Wellness Management',
    color: '#f43f5e',
    icon: Flower2,
    image: '/Image1.png',
  },
];

const TOTAL = orbitProducts.length;
const STEP = 360 / TOTAL;
const INTERVAL = 3000;

function useOrbitRadius() {
  const [radius, setRadius] = useState(359);
  useEffect(() => {
    const update = () => setRadius(window.innerWidth < 768 ? 201 : 359);
    update();
    window.addEventListener('resize', update, { passive: true });
    return () => window.removeEventListener('resize', update);
  }, []);
  return radius;
}

export default function ProductOrbit() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [ringAngle, setRingAngle] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const ringAngleRef = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const radius = useOrbitRadius();

  const advance = useCallback(() => {
    ringAngleRef.current += STEP;
    setRingAngle(ringAngleRef.current);
    setActiveIndex((prev) => (prev - 1 + TOTAL) % TOTAL);
  }, []);

  useEffect(() => {
    if (isPaused) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(advance, INTERVAL);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isPaused, advance]);

  const jumpTo = (index: number) => {
    if (index === activeIndex) return;
    if (intervalRef.current) clearInterval(intervalRef.current);

    const diff = index - activeIndex;
    const shortest = ((diff % TOTAL) + TOTAL) % TOTAL <= TOTAL / 2
      ? diff % TOTAL
      : (diff % TOTAL) - TOTAL;

    ringAngleRef.current += shortest * STEP;
    setRingAngle(ringAngleRef.current);
    setActiveIndex(index);

    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 1200);
  };

  const active = orbitProducts[activeIndex];
  const TRANSITION = 'transform 1s cubic-bezier(0.4, 0, 0.2, 1)';

  return (
    <div
      className="relative flex flex-col items-center"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="orbit-container">
        <div className="orbit-track" />

        <div
          className="orbit-ring"
          style={{ transform: `rotate(${ringAngle}deg)`, transition: TRANSITION }}
        >
          {orbitProducts.map((product, i) => {
            const isActive = i === activeIndex;
            const Icon = product.icon;
            const staticAngle = i * STEP;

            return (
              <div
                key={product.id}
                className="orbit-chip-wrapper"
                style={{ transform: `rotate(${staticAngle}deg) translateY(-${radius}px)` }}
              >
                <button
                  onClick={() => jumpTo(i)}
                  className="orbit-chip"
                  style={{
                    transform: `rotate(-${staticAngle}deg) rotate(-${ringAngle}deg)`,
                    transition: `${TRANSITION}, opacity 0.5s ease, box-shadow 0.5s ease`,
                    opacity: isActive ? 1 : 0.6,
                    boxShadow: isActive
                      ? `0 0 0 1.5px ${product.color}55, 0 0 24px ${product.color}33, 0 8px 24px rgba(15,23,42,0.12)`
                      : '0 2px 10px rgba(15,23,42,0.08)',
                    border: `1px solid ${isActive ? product.color + '80' : 'rgba(2,132,199,0.16)'}`,
                  }}
                  aria-label={`View ${product.name}`}
                >
                  <div
                    className="orbit-chip-icon"
                    style={{ background: `${product.color}22`, border: `1px solid ${product.color}44` }}
                  >
                    <Icon size={30} style={{ color: product.color }} strokeWidth={1.8} />
                  </div>
                  <div className="orbit-chip-text">
                    <span className="orbit-chip-name" style={{ color: isActive ? '#0f172a' : 'rgba(15,23,42,0.6)' }}>
                      {product.name}
                    </span>
                    <span className="orbit-chip-tagline">{product.tagline}</span>
                  </div>
                  {isActive && <div className="orbit-chip-dot" style={{ background: product.color }} />}
                </button>
              </div>
            );
          })}
        </div>

        <div className="orbit-center">
          <div className="orbit-preview-card" key={active.id}>
            <div className="orbit-preview-image-wrap" style={active.lightBg ? { background: '#f0ede8' } : undefined}>
              <img src={active.image} alt={active.name} className={`orbit-preview-image${active.lightBg ? ' orbit-preview-image--contain' : ''}`} />
              <div
                className="orbit-preview-image-overlay"
                style={{ background: `linear-gradient(135deg, ${active.color}44 0%, transparent 55%)` }}
              />
            </div>
            <div className="orbit-preview-content">
              <div
                className="orbit-preview-icon-wrap"
                style={{ background: `${active.color}20`, border: `1px solid ${active.color}40` }}
              >
                <active.icon size={22} style={{ color: active.color }} strokeWidth={2} />
              </div>
              <div>
                <p className="orbit-preview-name" style={{ color: active.color }}>{active.name}</p>
                <p className="orbit-preview-tagline">{active.tagline}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="orbit-dots">
        {orbitProducts.map((product, i) => (
          <button
            key={product.id}
            onClick={() => jumpTo(i)}
            className="orbit-dot"
            style={{
              width: i === activeIndex ? '20px' : '6px',
              background: i === activeIndex ? product.color : 'rgba(15,23,42,0.18)',
              boxShadow: i === activeIndex ? `0 0 8px ${product.color}80` : 'none',
            }}
            aria-label={`Select ${product.name}`}
          />
        ))}
      </div>

      <a href="#products" className="orbit-explore-link">
        Explore all products
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="orbit-explore-arrow">
          <path d="M2.5 6h7M6.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>

      <div className="orbit-strip">
        {orbitProducts.map((product) => {
          const Icon = product.icon;
          return (
            <a key={product.id} href="#products" className="orbit-strip-chip" style={{ border: `1px solid ${product.color}40` }}>
              <div style={{ width: 22, height: 22, borderRadius: '50%', background: `${product.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon size={12} style={{ color: product.color }} strokeWidth={2} />
              </div>
              <span style={{ fontSize: 11, fontWeight: 600, color: 'rgba(15,23,42,0.75)' }}>{product.name}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
