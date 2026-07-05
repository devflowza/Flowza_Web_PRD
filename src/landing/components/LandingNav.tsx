import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Menu, MessageCircle, ArrowUpRight } from 'lucide-react';
import { gsap, prefersReducedMotion } from '../gsapSetup';
import { WHATSAPP_URL } from '../data';

const anchors = [
  { label: 'Platforms', target: '#platforms' },
  { label: 'Flagship', target: '#flagship' },
  { label: 'Why Flowza', target: '#why' },
];

interface LandingNavProps {
  onAnchor: (target: string) => void;
  onMenuToggle: (open: boolean) => void;
}

export default function LandingNav({ onAnchor, onMenuToggle }: LandingNavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    onMenuToggle(menuOpen);
    if (menuOpen && menuRef.current && !prefersReducedMotion()) {
      const ctx = gsap.context(() => {
        gsap.from('.fz-menu-link', { yPercent: 60, opacity: 0, duration: 0.65, stagger: 0.07, ease: 'power3.out', delay: 0.1 });
        gsap.from('.fz-menu-meta', { opacity: 0, y: 16, duration: 0.5, delay: 0.45 });
      }, menuRef);
      return () => ctx.revert();
    }
  }, [menuOpen, onMenuToggle]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const go = (target: string) => {
    setMenuOpen(false);
    // wait a beat so the closing menu doesn't fight the scroll
    requestAnimationFrame(() => onAnchor(target));
  };

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? 'rgba(2, 7, 13, 0.72)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(148,184,210,0.1)' : '1px solid transparent',
        }}
      >
        <nav className="max-w-[1440px] mx-auto flex items-center justify-between px-5 sm:px-10 h-[72px]">
          <Link to="/" className="flex items-center gap-3 group" aria-label="Flowza AI — home">
            <span className="relative w-9 h-9 rounded-xl overflow-hidden ring-1 ring-cyan-400/30 shadow-[0_0_24px_rgba(14,165,233,0.35)] transition-shadow duration-300 group-hover:shadow-[0_0_36px_rgba(34,211,238,0.55)]">
              <img src="/Logo_Final_-_Focused.jpeg" alt="" className="w-full h-full object-cover" />
            </span>
            <span className="fz-display font-bold text-[15px] tracking-tight text-white">
              Flowza<span className="fz-grad-text"> AI</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {anchors.map((a) => (
              <button key={a.target} className="fz-nav-link" onClick={() => go(a.target)}>
                {a.label}
              </button>
            ))}
            <Link to="/contact" className="fz-nav-link no-underline">
              Contact
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              className="w-10 h-10 rounded-full border border-emerald-400/30 flex items-center justify-center text-emerald-400 hover:bg-emerald-400/10 hover:border-emerald-400/60 transition-colors duration-300"
            >
              <MessageCircle size={16} />
            </a>
            <Link
              to="/contact"
              className="fz-btn fz-btn-primary !py-[11px] !px-6 !text-[13px] no-underline"
              data-cursor
            >
              Start now
              <ArrowUpRight size={14} />
            </Link>
          </div>

          <button
            className="md:hidden w-11 h-11 rounded-full border border-white/15 flex items-center justify-center text-white"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </nav>
      </header>

      {menuOpen && (
        <div
          ref={menuRef}
          className="fixed inset-0 z-40 flex flex-col justify-between px-6 pt-28 pb-10"
          style={{ background: 'rgba(2, 7, 13, 0.97)', backdropFilter: 'blur(20px)' }}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
        >
          <div className="flex flex-col gap-5">
            {anchors.map((a, i) => (
              <button key={a.target} className="fz-menu-link" onClick={() => go(a.target)}>
                <span className="fz-menu-num">0{i + 1}</span>
                {a.label}
              </button>
            ))}
            <Link to="/contact" className="fz-menu-link" onClick={() => setMenuOpen(false)}>
              <span className="fz-menu-num">04</span>
              Contact
            </Link>
          </div>

          <div className="fz-menu-meta flex items-center justify-between border-t border-white/10 pt-6">
            <p className="text-sm" style={{ color: 'var(--fz-muted)' }}>
              MEA &amp; India · 100+ businesses
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-400"
            >
              <MessageCircle size={15} /> WhatsApp
            </a>
          </div>
        </div>
      )}
    </>
  );
}
