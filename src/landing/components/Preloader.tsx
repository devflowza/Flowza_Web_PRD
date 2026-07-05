import { useEffect, useRef, useState } from 'react';
import { gsap, prefersReducedMotion } from '../gsapSetup';

const SESSION_KEY = 'fz_intro_seen';
const WORD = 'FLOWZA';

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const [skipped] = useState(() => !!sessionStorage.getItem(SESSION_KEY));
  const [done, setDone] = useState(false);
  const completeRef = useRef(onComplete);
  completeRef.current = onComplete;

  useEffect(() => {
    if (skipped) {
      completeRef.current();
      return;
    }

    sessionStorage.setItem(SESSION_KEY, '1');

    if (prefersReducedMotion()) {
      const t = setTimeout(() => {
        setDone(true);
        completeRef.current();
      }, 350);
      return () => clearTimeout(t);
    }

    const ctx = gsap.context(() => {
      const letters = rootRef.current!.querySelectorAll('.fz-preloader-word span');
      const counter = { v: 0 };

      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        onComplete: () => {
          setDone(true);
          completeRef.current();
        },
      });

      tl.from(letters, { yPercent: 120, duration: 0.9, stagger: 0.055, ease: 'power4.out' }, 0.15)
        .to(
          counter,
          {
            v: 100,
            duration: 1.7,
            ease: 'power2.inOut',
            onUpdate: () => {
              if (countRef.current) countRef.current.textContent = String(Math.round(counter.v)).padStart(3, '0');
            },
          },
          0.2
        )
        .to(barRef.current, { scaleX: 1, duration: 1.7, ease: 'power2.inOut' }, 0.2)
        .to(letters, { yPercent: -120, duration: 0.6, stagger: 0.04, ease: 'power3.in' }, '-=0.15')
        .to(countRef.current, { opacity: 0, duration: 0.3 }, '<')
        .to(rootRef.current, { yPercent: -100, duration: 0.85, ease: 'expo.inOut' }, '-=0.25');
    }, rootRef);

    return () => ctx.revert();
  }, [skipped]);

  if (skipped || done) return null;

  return (
    <div ref={rootRef} className="fz-preloader" aria-hidden="true">
      <div className="fz-preloader-word">
        {WORD.split('').map((ch, i) => (
          <span key={i}>{ch}</span>
        ))}
      </div>
      <span ref={countRef} className="fz-preloader-count">000</span>
      <span ref={barRef} className="fz-preloader-bar" />
    </div>
  );
}
