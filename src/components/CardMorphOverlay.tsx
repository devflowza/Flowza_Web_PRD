import { useEffect, useRef } from 'react';
import { useTransition } from '../context/TransitionContext';

export default function CardMorphOverlay() {
  const { phase, snapshot, advanceToPhase, reset, reducedMotion } = useTransition();
  const coverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const doneTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (phase === 'expanding' && snapshot) {
      coverTimerRef.current = setTimeout(() => {
        advanceToPhase('covering');
      }, reducedMotion ? 0 : 480);
    }

    if (phase === 'covering') {
      doneTimerRef.current = setTimeout(() => {
        advanceToPhase('done');
      }, reducedMotion ? 0 : 320);
    }

    if (phase === 'done') {
      reset();
    }

    return () => {
      if (coverTimerRef.current) clearTimeout(coverTimerRef.current);
      if (doneTimerRef.current) clearTimeout(doneTimerRef.current);
    };
  }, [phase, snapshot, advanceToPhase, reset, reducedMotion]);

  if (phase === 'idle' || phase === 'done' || !snapshot || reducedMotion) return null;

  const { rect, color, colorSecondary, imageSrc, productName, tagline, iconComponent: Icon, badges } = snapshot;

  const vw = window.innerWidth;
  const vh = window.innerHeight;

  const isExpanding = phase === 'expanding';
  const isCovering = phase === 'covering';

  const targetTop = 0;
  const targetLeft = 0;
  const targetWidth = vw;
  const targetHeight = vh;

  const currentTop = isExpanding ? rect.top : targetTop;
  const currentLeft = isExpanding ? rect.left : targetLeft;
  const currentWidth = isExpanding ? rect.width : targetWidth;
  const currentHeight = isExpanding ? rect.height : targetHeight;
  const currentRadius = isExpanding ? 16 : 0;
  const imageOverlayOpacity = isExpanding ? 0.85 : 0.3;
  const bgGradientOpacity = isExpanding ? 0 : 1;
  const contentOpacity = isCovering ? 1 : 0;

  const transition = 'top 0.55s cubic-bezier(0.76, 0, 0.24, 1), left 0.55s cubic-bezier(0.76, 0, 0.24, 1), width 0.55s cubic-bezier(0.76, 0, 0.24, 1), height 0.55s cubic-bezier(0.76, 0, 0.24, 1), border-radius 0.55s cubic-bezier(0.76, 0, 0.24, 1)';

  return (
    <div
      className="fixed inset-0 z-[9998] pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      <div
        className="absolute overflow-hidden"
        style={{
          top: currentTop,
          left: currentLeft,
          width: currentWidth,
          height: currentHeight,
          borderRadius: currentRadius,
          transition,
          willChange: 'top, left, width, height, border-radius',
          boxShadow: isExpanding ? `0 32px 80px ${color}40` : 'none',
        }}
      >
        <img
          src={imageSrc}
          alt={productName}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ pointerEvents: 'none' }}
        />

        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${color}99 0%, ${colorSecondary}cc 100%)`,
            mixBlendMode: 'multiply',
            opacity: imageOverlayOpacity,
            transition: 'opacity 0.55s ease',
          }}
        />

        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${colorSecondary}f0 0%, ${color}cc 40%, #0a0a1a 100%)`,
            opacity: bgGradientOpacity,
            transition: 'opacity 0.55s ease 0.2s',
          }}
        />

        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.55) 100%)',
            opacity: bgGradientOpacity,
            transition: 'opacity 0.4s ease 0.25s',
          }}
        />

        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 80% 60% at 20% 50%, ${color}20 0%, transparent 60%)`,
            opacity: bgGradientOpacity,
            transition: 'opacity 0.45s ease 0.3s',
          }}
        />

        {isExpanding && (
          <div className="absolute top-4 right-4 z-20">
            <div
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-white text-xs font-semibold backdrop-blur-sm"
              style={{ background: `${color}cc` }}
            >
              <Icon size={11} color="white" />
              {tagline}
            </div>
          </div>
        )}

        <div
          className="absolute bottom-0 left-0 right-0 z-20 max-w-6xl mx-auto px-6 pb-16 pt-32"
          style={{
            opacity: contentOpacity,
            transform: contentOpacity === 1 ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.35s ease, transform 0.35s ease',
          }}
        >
          <div className="flex flex-wrap items-center gap-3 mb-6">
            {badges.map((badge) => (
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

          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
            style={{
              background: 'rgba(255,255,255,0.15)',
              border: '1.5px solid rgba(255,255,255,0.25)',
              backdropFilter: 'blur(12px)',
            }}
          >
            <Icon size={26} color="white" />
          </div>

          <p
            className="text-sm font-semibold tracking-widest uppercase mb-3"
            style={{ color: `${color}dd` }}
          >
            {tagline}
          </p>
          <h1 className="font-display text-5xl sm:text-6xl font-extrabold text-white tracking-tight leading-none">
            {productName}
          </h1>
        </div>
      </div>
    </div>
  );
}
