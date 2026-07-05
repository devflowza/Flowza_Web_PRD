import { useCallback, useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger, prefersReducedMotion } from './gsapSetup';
import Cursor from './components/Cursor';
import Preloader from './components/Preloader';
import LandingNav from './components/LandingNav';
import HeroSection from './components/HeroSection';
import MarqueeBand from './components/MarqueeBand';
import ProductsRail from './components/ProductsRail';
import FinanceShowcase from './components/FinanceShowcase';
import Manifesto from './components/Manifesto';
import FinalCTA from './components/FinalCTA';
import LandingFooter from './components/LandingFooter';
import './landing.css';

export default function Landing() {
  const [introDone, setIntroDone] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  // Dark chrome while the landing is mounted (body is themed light for inner pages).
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const prev = {
      htmlBg: html.style.background,
      bodyBg: body.style.background,
      behavior: html.style.scrollBehavior,
    };
    html.style.background = '#02070d';
    body.style.background = '#02070d';
    html.style.scrollBehavior = 'auto'; // Lenis owns easing; CSS smooth scrolling would fight it
    return () => {
      html.style.background = prev.htmlBg;
      body.style.background = prev.bodyBg;
      html.style.scrollBehavior = prev.behavior;
    };
  }, []);

  // Smooth scrolling synced with ScrollTrigger.
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    lenisRef.current = lenis;
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Hold scroll until the preloader curtain lifts.
  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;
    if (introDone) lenis.start();
    else lenis.stop();
  }, [introDone]);

  const handleIntroComplete = useCallback(() => {
    setIntroDone(true);
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }, []);

  const scrollTo = useCallback((target: string) => {
    const el = document.querySelector(target);
    if (!el) return;
    if (lenisRef.current) {
      lenisRef.current.scrollTo(el as HTMLElement, { offset: 0, duration: 1.6 });
    } else {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleMenuToggle = useCallback((open: boolean) => {
    const lenis = lenisRef.current;
    if (!lenis) {
      document.body.style.overflow = open ? 'hidden' : '';
      return;
    }
    if (open) lenis.stop();
    else lenis.start();
  }, []);

  return (
    <div className="fz-landing min-h-screen">
      <Cursor />
      <div className="fz-grain" aria-hidden="true" />
      <Preloader onComplete={handleIntroComplete} />
      <LandingNav onAnchor={scrollTo} onMenuToggle={handleMenuToggle} />
      <main>
        <HeroSection play={introDone} onExplore={() => scrollTo('#platforms')} />
        <MarqueeBand />
        <ProductsRail />
        <FinanceShowcase />
        <Manifesto />
        <FinalCTA />
      </main>
      <LandingFooter />
    </div>
  );
}
