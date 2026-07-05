import { Link } from 'react-router-dom';
import { Linkedin, Youtube, MessageCircle } from 'lucide-react';
import { landingProducts, WHATSAPP_URL } from '../data';

const columns: { title: string; links: { label: string; to: string }[] }[] = [
  {
    title: 'Platforms',
    links: landingProducts.map((p) => ({ label: p.name, to: `/products/${p.id}` })),
  },
  {
    title: 'Company',
    links: [
      { label: 'About us', to: '/about' },
      { label: 'Locations', to: '/locations' },
      { label: 'Contact', to: '/contact' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Documentation', to: '/docs' },
      { label: 'Help center', to: '/help' },
      { label: 'Status', to: '/status' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy policy', to: '/privacy' },
      { label: 'Terms of service', to: '/terms' },
      { label: 'Cookie policy', to: '/cookies' },
    ],
  },
];

const socials = [
  { icon: Linkedin, href: 'https://linkedin.com/company/flowzaai', label: 'LinkedIn' },
  { icon: Youtube, href: 'https://youtube.com/@flowzaai', label: 'YouTube' },
  { icon: MessageCircle, href: WHATSAPP_URL, label: 'WhatsApp' },
];

export default function LandingFooter() {
  return (
    <footer className="relative fz-hairline-t overflow-hidden" style={{ background: '#010509' }}>
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 pt-16 sm:pt-20">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 pb-16">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-5" aria-label="Flowza AI — home">
              <span className="w-9 h-9 rounded-xl overflow-hidden ring-1 ring-cyan-400/30">
                <img src="/Logo_Final_-_Focused.jpeg" alt="" className="w-full h-full object-cover" />
              </span>
              <span className="fz-display font-bold text-[15px] text-white">
                Flowza<span className="fz-grad-text"> AI</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--fz-faint)' }}>
              AI-powered business operating systems for MEA &amp; India.
            </p>
            <div className="flex items-center gap-2.5">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full border flex items-center justify-center transition-colors duration-300 hover:border-cyan-400/60 hover:text-cyan-300"
                  style={{ borderColor: 'var(--fz-line)', color: 'var(--fz-muted)' }}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="fz-display text-[11px] font-semibold uppercase tracking-[0.28em] mb-4" style={{ color: 'var(--fz-faint)' }}>
                {col.title}
              </h3>
              <ul className="flex flex-col">
                {col.links.map((l) => (
                  <li key={l.to + l.label}>
                    <Link to={l.to} className="fz-footer-link">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-3 py-6 fz-hairline-t text-xs"
          style={{ color: 'var(--fz-faint)' }}
        >
          <p>© {new Date().getFullYear()} Flowza AI. All rights reserved.</p>
          <p className="inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
            All systems operational
          </p>
        </div>

        <div className="fz-footer-wordmark pb-2 -mb-[2vw]" aria-hidden="true">
          FLOWZA
        </div>
      </div>
    </footer>
  );
}
