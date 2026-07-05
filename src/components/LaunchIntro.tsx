import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, X } from 'lucide-react';

const SESSION_KEY = 'flowza_launch_intro_seen';

type Phase = 'burst' | 'reveal' | 'exit' | 'done';

interface LaunchIntroProps {
  onComplete: () => void;
}

export default function LaunchIntro({ onComplete }: LaunchIntroProps) {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<Phase>('burst');
  const [mounted, setMounted] = useState(false);

  const dismiss = useCallback(() => {
    sessionStorage.setItem(SESSION_KEY, '1');
    setPhase('exit');
    setTimeout(() => {
      setPhase('done');
      onComplete();
    }, 700);
  }, [onComplete]);

  const goToFinance = useCallback(() => {
    sessionStorage.setItem(SESSION_KEY, '1');
    setPhase('exit');
    setTimeout(() => {
      setPhase('done');
      onComplete();
      navigate('/products/finance');
    }, 500);
  }, [navigate, onComplete]);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) {
      setPhase('done');
      onComplete();
      return;
    }

    setMounted(true);

    const t1 = setTimeout(() => setPhase('reveal'), 1400);
    const t2 = setTimeout(() => dismiss(), 5200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [dismiss, onComplete]);

  if (phase === 'done' || !mounted) return null;

  const isExiting = phase === 'exit';

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden select-none"
      style={{
        background: 'linear-gradient(180deg, #ffffff 0%, #f0fdf9 50%, #ecfdf5 100%)',
        animation: isExiting ? 'launchShred 0.7s cubic-bezier(0.22,1,0.36,1) forwards' : undefined,
        pointerEvents: isExiting ? 'none' : 'auto',
      }}
    >
      <button
        onClick={dismiss}
        className="absolute top-6 right-6 z-20 flex items-center gap-1.5 text-gray-400 hover:text-gray-700 transition-colors duration-200 text-xs font-medium tracking-widest uppercase"
        style={{ animation: 'fadeIn 0.5s ease-out 1s both' }}
      >
        <X size={12} />
        Skip
      </button>

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(16,185,129,0.08) 0%, transparent 70%)',
        }}
      />

      {phase === 'burst' && (
        <>
          <div
            className="absolute pointer-events-none"
            style={{
              left: '50%',
              top: '50%',
              width: '600px',
              height: '600px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(16,185,129,0.55) 0%, rgba(5,150,105,0.35) 30%, transparent 70%)',
              animation: 'launchBurst 1.4s cubic-bezier(0.22,1,0.36,1) forwards',
            }}
          />
          <div
            className="absolute pointer-events-none"
            style={{
              left: '50%',
              top: '50%',
              width: '800px',
              height: '800px',
              borderRadius: '50%',
              border: '2px solid rgba(16,185,129,0.6)',
              animation: 'launchRing 1.4s cubic-bezier(0.22,1,0.36,1) 0.1s forwards',
            }}
          />
          <div
            className="absolute pointer-events-none"
            style={{
              left: '50%',
              top: '50%',
              width: '500px',
              height: '500px',
              borderRadius: '50%',
              border: '1px solid rgba(16,185,129,0.4)',
              animation: 'launchRing 1.4s cubic-bezier(0.22,1,0.36,1) 0.2s forwards',
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'rgba(16,185,129,0.18)',
              animation: 'launchFlash 1.2s ease-out forwards',
            }}
          />
        </>
      )}

      {phase === 'reveal' && (
        <>
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 55% 55% at 50% 50%, rgba(16,185,129,0.14) 0%, rgba(5,150,105,0.06) 50%, transparent 75%)',
              animation: 'spotlightGlow 3s ease-in-out infinite',
            }}
          />

          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="absolute pointer-events-none rounded-full"
              style={{
                left: '50%',
                top: '50%',
                width: `${240 + i * 160}px`,
                height: `${240 + i * 160}px`,
                border: `1px solid rgba(16,185,129,${0.18 - i * 0.05})`,
                animation: `greenPulseRing 2.8s ease-out ${i * 0.5}s infinite`,
              }}
            />
          ))}

          <div
            className="relative z-10 flex flex-col items-center text-center gap-8 px-6 max-w-2xl"
            style={{ animation: 'launchTextIn 0.9s cubic-bezier(0.22,1,0.36,1) forwards' }}
          >
            <div className="flex flex-col items-center gap-4">
              <div
                className="flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-[0.25em] uppercase"
                style={{
                  background: 'rgba(16,185,129,0.15)',
                  border: '1px solid rgba(16,185,129,0.4)',
                  color: '#10b981',
                  boxShadow: '0 0 20px rgba(16,185,129,0.2)',
                }}
              >
                <span
                  className="relative flex h-1.5 w-1.5"
                >
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                </span>
                Now Live
              </div>

              <h1
                className="font-display font-black leading-none tracking-tight"
                style={{
                  fontSize: 'clamp(52px, 10vw, 96px)',
                  color: '#0f172a',
                }}
              >
                <span style={{ color: '#059669', textShadow: '0 0 50px rgba(16,185,129,0.25)' }}>
                  Flowza
                </span>{' '}
                Finance
              </h1>

              <p
                className="text-lg font-medium leading-relaxed"
                style={{ color: '#475569', maxWidth: '480px' }}
              >
                All-in-one accounting, inventory, payroll, HR & compliance — built for businesses that demand precision at scale.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={goToFinance}
                className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-bold transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  color: '#ffffff',
                  boxShadow: '0 0 32px rgba(16,185,129,0.45), 0 8px 24px rgba(16,185,129,0.3)',
                }}
              >
                Explore Flowza Finance
                <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              <button
                onClick={dismiss}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 bg-white hover:bg-gray-50"
                style={{
                  color: '#475569',
                  border: '1px solid #e2e8f0',
                }}
              >
                Continue to Flowza
              </button>
            </div>

            <div
              className="absolute bottom-0 left-0 right-0 mx-auto rounded-full overflow-hidden"
              style={{
                height: '1px',
                background: 'rgba(16,185,129,0.2)',
                maxWidth: '320px',
              }}
            >
              <div
                style={{
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, #10b981, transparent)',
                  animation: `introCountdown ${5200 - 1400}ms linear forwards`,
                }}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
