import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react';
import { landingProducts } from './data';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Pricing', to: '/#pricing' },
  { label: 'FAQ', to: '/#faq' },
  { label: 'Contact', to: '/contact' },
];

/** White sticky navbar: logo block, center links with Platforms dropdown, gradient CTA. */
export default function SiteNav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [platformsOpen, setPlatformsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
    setPlatformsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('[data-platforms-menu]')) setPlatformsOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  return (
    <nav className="bg-white border-b border-gray-100 shadow-[0_1px_3px_rgba(15,23,42,0.04)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-[72px] flex items-center justify-between gap-4">
        {/* Logo block */}
        <Link to="/" className="flex items-center gap-3 shrink-0 group" aria-label="Flowza AI — home">
          <span className="w-11 h-11 rounded-xl overflow-hidden ring-1 ring-blue-100 shadow-[0_2px_10px_rgba(37,99,235,0.18)] group-hover:shadow-[0_2px_16px_rgba(37,99,235,0.3)] transition-shadow">
            <img src="/Logo_Final_-_Focused.jpeg" alt="" className="w-full h-full object-cover" />
          </span>
          <span className="leading-tight">
            <span className="block font-bold text-lg text-slate-900 tracking-tight">
              Flowza <span className="fx-gradient-text">AI</span>
            </span>
            <span className="block text-[11px] text-gray-400 font-medium">Business Operating Systems</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-1">
          <Link
            to="/"
            className="px-3.5 py-2 text-[15px] text-slate-800 font-medium hover:text-blue-600 transition-colors"
          >
            Home
          </Link>

          <div data-platforms-menu className="relative">
            <button
              onClick={() => setPlatformsOpen((v) => !v)}
              className="flex items-center gap-1 px-3.5 py-2 text-[15px] text-slate-800 font-medium hover:text-blue-600 transition-colors"
              aria-expanded={platformsOpen}
            >
              Platforms
              <ChevronDown size={14} className={`transition-transform duration-200 ${platformsOpen ? 'rotate-180' : ''}`} />
            </button>
            {platformsOpen && (
              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-[560px] rounded-2xl border border-gray-100 bg-white shadow-[0_24px_60px_rgba(15,23,42,0.14)] overflow-hidden">
                <div className="p-3 grid grid-cols-2 gap-1">
                  {landingProducts.map((p) => {
                    const Icon = p.icon;
                    return (
                      <Link
                        key={p.id}
                        to={`/products/${p.id}`}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-blue-50/70 transition-colors group/item"
                        onClick={() => setPlatformsOpen(false)}
                      >
                        <span
                          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                          style={{ background: `${p.color}14`, border: `1px solid ${p.color}33`, color: p.color }}
                        >
                          <Icon size={17} />
                        </span>
                        <span>
                          <span className="flex items-center gap-2 text-sm font-semibold text-slate-900 group-hover/item:text-blue-600 transition-colors leading-tight">
                            {p.name}
                            {p.live && (
                              <span className="text-[10px] font-semibold uppercase tracking-wide text-emerald-600 bg-emerald-50 border border-emerald-200 rounded-full px-1.5 py-px">
                                Live
                              </span>
                            )}
                          </span>
                          <span className="block text-xs text-gray-500 leading-tight mt-0.5">{p.tagline}</span>
                        </span>
                      </Link>
                    );
                  })}
                </div>
                <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs text-gray-500">Seven systems. One operating fabric.</span>
                  <Link
                    to="/#platforms"
                    className="inline-flex items-center gap-1 text-xs text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                    onClick={() => setPlatformsOpen(false)}
                  >
                    All platforms <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            )}
          </div>

          {navLinks.slice(1).map((l) => (
            <Link
              key={l.label}
              to={l.to}
              className="px-3.5 py-2 text-[15px] text-slate-800 font-medium hover:text-blue-600 transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* CTA + mobile toggle */}
        <div className="flex items-center gap-3">
          <Link
            to="/get-started"
            className="hidden sm:inline-flex items-center gap-2 fx-gradient text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-[0_4px_14px_rgba(37,99,235,0.35)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.45)] hover:-translate-y-px transition-all"
          >
            Start Free Trial
          </Link>
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white max-h-[calc(100vh-110px)] overflow-y-auto">
          <div className="px-4 py-4">
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-widest px-2 mb-2">Platforms</p>
            <div className="grid grid-cols-1 gap-0.5 mb-4">
              {landingProducts.map((p) => {
                const Icon = p.icon;
                return (
                  <Link
                    key={p.id}
                    to={`/products/${p.id}`}
                    className="flex items-center gap-3 px-2 py-2.5 rounded-xl hover:bg-blue-50/70 transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    <span
                      className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: `${p.color}14`, border: `1px solid ${p.color}33`, color: p.color }}
                    >
                      <Icon size={15} />
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-slate-900">{p.name}</span>
                      <span className="block text-xs text-gray-500">{p.tagline}</span>
                    </span>
                  </Link>
                );
              })}
            </div>
            <div className="border-t border-gray-100 pt-3 grid grid-cols-2 gap-0.5">
              {navLinks.map((l) => (
                <Link
                  key={l.label}
                  to={l.to}
                  className="px-3 py-2.5 text-sm font-medium text-slate-800 hover:text-blue-600 rounded-xl hover:bg-blue-50/70 transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {l.label}
                </Link>
              ))}
            </div>
            <Link
              to="/get-started"
              className="mt-4 flex items-center justify-center gap-2 fx-gradient text-white text-sm font-semibold px-5 py-3 rounded-xl shadow-[0_4px_14px_rgba(37,99,235,0.35)]"
              onClick={() => setMobileOpen(false)}
            >
              Start Free Trial
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
