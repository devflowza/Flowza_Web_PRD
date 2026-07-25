import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, ArrowRight, ArrowUpRight, MessageCircle, Mail } from 'lucide-react';
import { landingProducts, WHATSAPP_URL, WHATSAPP_DISPLAY, CONTACT_EMAIL } from './data';

const navLinks = [
  { label: 'Pricing', to: '/#pricing' },
  { label: 'About', to: '/about' },
  { label: 'FAQ', to: '/#faq' },
  { label: 'Contact', to: '/contact' },
];

/** Glass nav: wordmark, Platforms panel, quiet links, ink pill CTA. */
export default function SiteNav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [platformsOpen, setPlatformsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
    setPlatformsOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('[data-platforms-menu]')) setPlatformsOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setPlatformsOpen(false);
        setMobileOpen(false);
      }
    };
    document.addEventListener('mousedown', close);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', close);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const isActive = (to: string) => !to.includes('#') && location.pathname === to;

  return (
    <>
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ease-swift ${
        scrolled
          ? 'bg-white/85 backdrop-blur-xl shadow-[0_1px_0_rgba(11,18,33,0.07),0_8px_28px_-16px_rgba(11,18,33,0.14)]'
          : 'bg-white/70 backdrop-blur-md'
      }`}
    >
      <nav aria-label="Main" className="mx-auto flex h-[76px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        {/* Wordmark */}
        <Link to="/" className="group flex shrink-0 items-center gap-3" aria-label="FlowZa AI — home">
          <span className="h-10 w-10 overflow-hidden rounded-xl ring-1 ring-ink/[0.08] transition-transform duration-300 ease-swift group-hover:scale-105">
            <img src="/Logo_Final_-_Focused.jpeg" alt="" width="40" height="40" className="h-full w-full object-cover" />
          </span>
          <span className="font-display text-[21px] font-bold tracking-snug text-ink">
            FlowZa<span className="text-accent"> AI</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-0.5 lg:flex">
          <div data-platforms-menu className="relative">
            <button
              onClick={() => setPlatformsOpen((v) => !v)}
              className="flex items-center gap-1.5 rounded-full px-4 py-2 text-[15px] font-medium text-ink-600 transition-colors duration-300 hover:bg-mist hover:text-ink"
              aria-expanded={platformsOpen}
              aria-haspopup="true"
            >
              Platforms
              <ChevronDown
                size={14}
                className={`transition-transform duration-300 ease-swift ${platformsOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {platformsOpen && (
              <div className="absolute left-1/2 top-full mt-3 w-[600px] -translate-x-1/2 origin-top animate-slide-up-fast overflow-hidden rounded-[1.5rem] bg-white shadow-frame ring-1 ring-ink/[0.07]">
                <div className="grid grid-cols-2 gap-0.5 p-2.5">
                  {landingProducts.map((p) => {
                    const Icon = p.icon;
                    return (
                      <Link
                        key={p.id}
                        to={`/products/${p.id}`}
                        className="group/item flex items-center gap-3.5 rounded-2xl p-3.5 transition-colors duration-200 hover:bg-mist"
                        onClick={() => setPlatformsOpen(false)}
                      >
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-mist text-ink-500 ring-1 ring-ink/[0.05] transition-colors duration-200 group-hover/item:bg-white">
                          <Icon size={17} strokeWidth={1.8} />
                        </span>
                        <span className="min-w-0">
                          <span className="flex items-center gap-2 text-sm font-semibold leading-tight text-ink">
                            {p.short}
                            {p.live && (
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-emerald-600">
                                <span className="h-1 w-1 rounded-full bg-emerald-500" />
                                Live
                              </span>
                            )}
                          </span>
                          <span className="mt-0.5 block truncate text-[13px] leading-tight text-ink-400">{p.tagline}</span>
                        </span>
                      </Link>
                    );
                  })}
                </div>
                <div className="flex items-center justify-between border-t border-ink/[0.06] bg-mist/60 px-6 py-3.5">
                  <span className="text-[13px] text-ink-400">Seven systems, one operating fabric</span>
                  <Link
                    to="/#platforms"
                    className="group/all inline-flex items-center gap-1.5 text-[13px] font-semibold text-ink transition-colors hover:text-accent"
                    onClick={() => setPlatformsOpen(false)}
                  >
                    All platforms
                    <ArrowRight size={13} className="transition-transform duration-300 ease-swift group-hover/all:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            )}
          </div>

          {navLinks.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              aria-current={isActive(l.to) ? 'page' : undefined}
              className={`rounded-full px-4 py-2 text-[15px] font-medium transition-colors duration-300 ${
                isActive(l.to) ? 'text-ink bg-mist' : 'text-ink-600 hover:bg-mist hover:text-ink'
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* CTA cluster + mobile toggle */}
        <div className="flex items-center gap-2.5">
          <Link
            to="/contact"
            className="hidden text-[15px] font-medium text-ink-500 transition-colors duration-300 hover:text-ink md:inline-flex md:px-3"
          >
            Talk to sales
          </Link>
          <Link to="/get-started" className="btn-primary btn-md group hidden sm:inline-flex">
            Start free trial
            <span className="btn-orb bg-white/15 group-hover:translate-x-0.5">
              <ArrowRight size={13} />
            </span>
          </Link>
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="relative flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-300 hover:bg-mist lg:hidden"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            <span
              className={`absolute h-[1.5px] w-[18px] rounded-full bg-ink transition-all duration-300 ease-swift ${
                mobileOpen ? 'rotate-45' : '-translate-y-[3.5px]'
              }`}
            />
            <span
              className={`absolute h-[1.5px] w-[18px] rounded-full bg-ink transition-all duration-300 ease-swift ${
                mobileOpen ? '-rotate-45' : 'translate-y-[3.5px]'
              }`}
            />
          </button>
        </div>
      </nav>
    </header>

      {/* Mobile overlay — sibling of the blurred header: backdrop-filter would
          otherwise make the header the containing block and collapse this. */}
      <div
        className={`fixed inset-x-0 bottom-0 top-[76px] z-40 overflow-y-auto bg-white transition-all duration-500 ease-swift lg:hidden ${
          mobileOpen ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        <div className="flex min-h-full flex-col px-6 pb-10 pt-4">
          <p className="eyebrow mb-2 px-1 pt-2">Platforms</p>
          <div className="mb-6">
            {landingProducts.map((p, i) => {
              const Icon = p.icon;
              return (
                <Link
                  key={p.id}
                  to={`/products/${p.id}`}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-4 border-b border-ink/[0.06] py-4 transition-all duration-500 ease-swift ${
                    mobileOpen ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                  }`}
                  style={{ transitionDelay: mobileOpen ? `${80 + i * 40}ms` : '0ms' }}
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-mist text-ink-500 ring-1 ring-ink/[0.05]">
                    <Icon size={17} strokeWidth={1.8} />
                  </span>
                  <span className="flex-1">
                    <span className="flex items-center gap-2 text-[15px] font-semibold text-ink">
                      {p.short}
                      {p.live && <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-label="Live" />}
                    </span>
                    <span className="block text-[13px] text-ink-400">{p.tagline}</span>
                  </span>
                  <ArrowUpRight size={16} className="text-ink-300" />
                </Link>
              );
            })}
          </div>

          <div className="grid grid-cols-2 gap-x-4">
            {navLinks.map((l, i) => (
              <Link
                key={l.label}
                to={l.to}
                onClick={() => setMobileOpen(false)}
                className={`border-b border-ink/[0.06] py-4 text-[15px] font-semibold text-ink transition-all duration-500 ease-swift ${
                  mobileOpen ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                }`}
                style={{ transitionDelay: mobileOpen ? `${380 + i * 40}ms` : '0ms' }}
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div
            className={`mt-8 transition-all duration-500 ease-swift ${
              mobileOpen ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            }`}
            style={{ transitionDelay: mobileOpen ? '540ms' : '0ms' }}
          >
            <Link to="/get-started" onClick={() => setMobileOpen(false)} className="btn-primary btn-lg group w-full">
              Start free trial
              <span className="btn-orb bg-white/15 group-hover:translate-x-0.5">
                <ArrowRight size={13} />
              </span>
            </Link>
            <div className="mt-6 flex flex-col gap-3 text-sm text-ink-500">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5">
                <MessageCircle size={15} className="text-emerald-600" />
                {WHATSAPP_DISPLAY}
              </a>
              <a href={`mailto:${CONTACT_EMAIL}`} className="inline-flex items-center gap-2.5">
                <Mail size={15} className="text-ink-400" />
                {CONTACT_EMAIL}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
