import { Link } from 'react-router-dom';
import { Linkedin, Youtube, MessageCircle } from 'lucide-react';
import {
  landingProducts, WHATSAPP_URL, WHATSAPP_DISPLAY, CONTACT_EMAIL,
  OFFICE_ADDRESS, BUSINESS_HOURS,
} from './data';

const companyLinks = [
  { label: 'About', to: '/about' },
  { label: 'Locations', to: '/locations' },
  { label: 'Contact', to: '/contact' },
  { label: 'Get started', to: '/get-started' },
];

const resourceLinks = [
  { label: 'Documentation', to: '/docs' },
  { label: 'Help center', to: '/help' },
  { label: 'System status', to: '/status' },
];

const policies = [
  { label: 'Privacy', to: '/privacy' },
  { label: 'Terms', to: '/terms' },
  { label: 'Cookies', to: '/cookies' },
];

const socials = [
  { icon: Linkedin, href: 'https://linkedin.com/company/flowzaai', label: 'LinkedIn' },
  { icon: Youtube, href: 'https://youtube.com/@flowzaai', label: 'YouTube' },
  { icon: MessageCircle, href: WHATSAPP_URL, label: 'WhatsApp' },
];

/** Ink footer: brand + contact, quiet link columns, legal bar, ghost wordmark. */
export default function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-ink text-ink-300 grain">
      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-20 sm:px-6">
        <div className="grid grid-cols-1 gap-12 pb-16 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div className="max-w-xs">
            <Link to="/" className="flex items-center gap-3" aria-label="FlowZa AI — home">
              <span className="h-10 w-10 overflow-hidden rounded-xl ring-1 ring-white/10">
                <img src="/Logo_Final_-_Focused.jpeg" alt="" width="40" height="40" className="h-full w-full object-cover" />
              </span>
              <span className="font-display text-xl font-bold tracking-snug text-white">
                FlowZa<span className="text-accent-soft"> AI</span>
              </span>
            </Link>
            <p className="mt-5 text-[15px] leading-relaxed text-ink-300">
              Purpose-built operating systems for businesses across MEA and India. Seven platforms, one fabric.
            </p>
            <div className="mt-7 space-y-2.5 text-sm">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-ink-300 transition-colors hover:text-white"
              >
                {WHATSAPP_DISPLAY} · WhatsApp
              </a>
              <a href={`mailto:${CONTACT_EMAIL}`} className="block text-ink-300 transition-colors hover:text-white">
                {CONTACT_EMAIL}
              </a>
              <p className="text-ink-400">{OFFICE_ADDRESS}</p>
              <p className="text-ink-400">{BUSINESS_HOURS}</p>
            </div>
            <div className="mt-7 flex items-center gap-2">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full ring-1 ring-white/10 transition-all duration-300 ease-swift hover:bg-white hover:text-ink hover:ring-white"
                >
                  <Icon size={15} strokeWidth={1.8} />
                </a>
              ))}
            </div>
          </div>

          {/* Platforms */}
          <nav aria-label="Platforms">
            <h3 className="text-[12px] font-bold uppercase tracking-[0.18em] text-ink-400">Platforms</h3>
            <ul className="mt-5 space-y-3">
              {landingProducts.map((p) => (
                <li key={p.id}>
                  <Link
                    to={`/products/${p.id}`}
                    className="inline-flex items-center gap-2 text-[15px] text-ink-200 transition-colors hover:text-white"
                  >
                    {p.short}
                    {p.live && <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-label="Live" />}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Company */}
          <nav aria-label="Company">
            <h3 className="text-[12px] font-bold uppercase tracking-[0.18em] text-ink-400">Company</h3>
            <ul className="mt-5 space-y-3">
              {companyLinks.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-[15px] text-ink-200 transition-colors hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Resources */}
          <nav aria-label="Resources">
            <h3 className="text-[12px] font-bold uppercase tracking-[0.18em] text-ink-400">Resources</h3>
            <ul className="mt-5 space-y-3">
              {resourceLinks.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-[15px] text-ink-200 transition-colors hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              to="/status"
              className="mt-7 inline-flex items-center gap-2.5 rounded-full py-1 text-sm text-ink-300 transition-colors hover:text-emerald-300"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              All systems operational
            </Link>
          </nav>
        </div>

        {/* Legal bar */}
        <div className="flex flex-col items-start justify-between gap-4 border-t border-white/[0.08] py-7 text-[13px] text-ink-400 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} FlowZa AI. All rights reserved.</p>
          <div className="flex items-center gap-6">
            {policies.map((l) => (
              <Link key={l.label} to={l.to} className="transition-colors hover:text-white">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Ghost wordmark */}
      <div aria-hidden="true" className="pointer-events-none relative z-0 -mb-[3vw] select-none overflow-hidden">
        <p className="whitespace-nowrap text-center font-display text-[19.5vw] font-extrabold leading-[0.78] tracking-tightest text-white/[0.035]">
          FlowZa
        </p>
      </div>
    </footer>
  );
}
