import { useEffect, useRef } from 'react';
import { ExternalLink } from 'lucide-react';

interface PortalState {
  active: boolean;
  url: string;
  productName: string;
  tagline: string;
  color: string;
  colorSecondary: string;
  originX: number;
  originY: number;
  phase: 'expanding' | 'showing' | 'flashing' | 'idle';
}

interface PortalOverlayProps {
  portal: PortalState;
  onComplete: () => void;
}

export type { PortalState };

export default function PortalOverlay({ portal, onComplete }: PortalOverlayProps) {
  const hasOpenedRef = useRef(false);

  useEffect(() => {
    if (!portal.active || portal.phase === 'idle') {
      hasOpenedRef.current = false;
      return;
    }

    if (portal.phase === 'flashing' && !hasOpenedRef.current) {
      hasOpenedRef.current = true;
      const timer = setTimeout(() => {
        window.open(portal.url, '_blank', 'noopener,noreferrer');
        onComplete();
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [portal.phase, portal.active, portal.url, onComplete]);

  if (!portal.active) return null;

  const originXPct = (portal.originX / window.innerWidth) * 100;
  const originYPct = (portal.originY / window.innerHeight) * 100;

  const diagonal = Math.sqrt(window.innerWidth ** 2 + window.innerHeight ** 2) * 2;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
      style={{ pointerEvents: 'all' }}
    >
      <div
        className="absolute rounded-full"
        style={{
          width: portal.phase === 'expanding' ? '0px' : `${diagonal}px`,
          height: portal.phase === 'expanding' ? '0px' : `${diagonal}px`,
          left: `${originXPct}%`,
          top: `${originYPct}%`,
          transform: 'translate(-50%, -50%)',
          background: `radial-gradient(circle at center, ${portal.color} 0%, ${portal.colorSecondary} 40%, #000614 100%)`,
          transition: 'width 0.85s cubic-bezier(0.4, 0, 0.2, 1), height 0.85s cubic-bezier(0.4, 0, 0.2, 1)',
          willChange: 'width, height',
        }}
      />

      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: portal.phase === 'expanding' ? '0px' : `${diagonal * 0.6}px`,
          height: portal.phase === 'expanding' ? '0px' : `${diagonal * 0.6}px`,
          left: `${originXPct}%`,
          top: `${originYPct}%`,
          transform: 'translate(-50%, -50%)',
          background: `radial-gradient(circle at center, ${portal.color}40 0%, transparent 70%)`,
          transition: 'width 0.85s cubic-bezier(0.4, 0, 0.2, 1) 0.1s, height 0.85s cubic-bezier(0.4, 0, 0.2, 1) 0.1s',
        }}
      />

      {portal.phase !== 'expanding' && (
        <div
          className="relative z-10 text-center"
          style={{
            animation: portal.phase === 'flashing' ? 'none' : 'portalTextIn 0.45s ease-out 0.35s both',
            opacity: portal.phase === 'flashing' ? 0 : undefined,
            transition: portal.phase === 'flashing' ? 'opacity 0.3s ease' : undefined,
          }}
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <div
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: portal.phase === 'flashing' ? '#fff' : portal.color }}
            />
            <span
              className="text-xs font-medium tracking-[0.2em] uppercase"
              style={{ color: portal.phase === 'flashing' ? '#fff' : `${portal.color}cc` }}
            >
              Opening Platform
            </span>
            <ExternalLink size={11} style={{ color: portal.phase === 'flashing' ? '#fff' : `${portal.color}cc` }} />
          </div>

          <h2
            className="text-4xl sm:text-5xl font-display font-bold text-white mb-2 tracking-tight"
            style={{
              textShadow: `0 0 60px ${portal.color}80`,
            }}
          >
            {portal.productName}
          </h2>
          <p className="text-white/60 text-base font-light tracking-wide">
            {portal.tagline}
          </p>

          <div className="mt-8 flex items-center justify-center gap-2">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="rounded-full"
                style={{
                  width: i === 2 ? '20px' : '6px',
                  height: '4px',
                  background: i === 2 ? portal.color : `${portal.color}40`,
                  animation: `pulse ${0.8 + i * 0.15}s ease-in-out infinite`,
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            ))}
          </div>
        </div>
      )}

      {portal.phase === 'flashing' && (
        <div
          className="absolute inset-0 bg-white pointer-events-none"
          style={{ animation: 'portalFlash 0.35s ease-out forwards' }}
        />
      )}

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 100% 60% at ${originXPct}% ${originYPct}%, ${portal.color}08 0%, transparent 60%)`,
          animation: 'pulse 2s ease-in-out infinite',
        }}
      />
    </div>
  );
}
