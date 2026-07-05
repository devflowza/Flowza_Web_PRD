import { createContext, useContext, useState, useCallback, useRef } from 'react';
import type { ReactNode } from 'react';

export interface CardSnapshot {
  rect: DOMRect;
  productId: string;
  productName: string;
  tagline: string;
  color: string;
  colorSecondary: string;
  imageSrc: string;
  badges: string[];
  iconComponent: React.ComponentType<{ size?: number; color?: string }>;
}

export type MorphPhase = 'idle' | 'expanding' | 'covering' | 'done';

interface TransitionState {
  phase: MorphPhase;
  snapshot: CardSnapshot | null;
  reducedMotion: boolean;
}

interface TransitionContextValue extends TransitionState {
  beginTransition: (snapshot: CardSnapshot) => void;
  advanceToPhase: (phase: MorphPhase) => void;
  reset: () => void;
  lastSnapshotRef: React.MutableRefObject<CardSnapshot | null>;
}

const TransitionContext = createContext<TransitionContextValue | null>(null);

export function TransitionProvider({ children }: { children: ReactNode }) {
  const reducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  const [state, setState] = useState<TransitionState>({
    phase: 'idle',
    snapshot: null,
    reducedMotion,
  });

  const lastSnapshotRef = useRef<CardSnapshot | null>(null);

  const beginTransition = useCallback((snapshot: CardSnapshot) => {
    lastSnapshotRef.current = snapshot;
    setState({ phase: 'expanding', snapshot, reducedMotion });
  }, [reducedMotion]);

  const advanceToPhase = useCallback((phase: MorphPhase) => {
    setState((prev) => ({ ...prev, phase }));
  }, []);

  const reset = useCallback(() => {
    setState((prev) => ({ ...prev, phase: 'idle', snapshot: null }));
  }, []);

  return (
    <TransitionContext.Provider value={{ ...state, beginTransition, advanceToPhase, reset, lastSnapshotRef }}>
      {children}
    </TransitionContext.Provider>
  );
}

export function useTransition() {
  const ctx = useContext(TransitionContext);
  if (!ctx) throw new Error('useTransition must be used within TransitionProvider');
  return ctx;
}
