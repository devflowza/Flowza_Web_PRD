import { Link } from 'react-router-dom';
import {
  Linkedin, Youtube, MessageCircle, Mail, MapPin, Clock, ChevronRight,
  ShieldCheck, Activity, Landmark, Globe2, Unlock,
} from 'lucide-react';
import {
  landingProducts, WHATSAPP_URL, WHATSAPP_DISPLAY, CONTACT_EMAIL,
  OFFICE_ADDRESS, BUSINESS_HOURS,
} from './data';

const quickLinks = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Locations', to: '/locations' },
  { label: 'Documentation', to: '/docs' },
  { label: 'Help Center', to: '/help' },
  { label: 'Status', to: '/status' },
  { label: 'Contact', to: '/contact' },
];

const policies = [
  { label: 'Privacy Policy', to: '/privacy' },
  { label: 'Terms of Service', to: '/terms' },
  { label: 'Cookie Policy', to: '/cookies' },
];

const socials = [
  { icon: Linkedin, href: 'https://linkedin.com/company/flowzaai', label: 'LinkedIn' },
  { icon: Youtube, href: 'https://youtube.com/@flowzaai', label: 'YouTube' },
  { icon: MessageCircle, href: WHATSAPP_URL, label: 'WhatsApp' },
];

const trustBadges = [
  { icon: ShieldCheck, label: 'SOC 2 Compliant' },
  { icon: Activity, label: '99.9% Uptime SLA' },
  { icon: Landmark, label: 'GST & VAT Ready' },
  { icon: Globe2, label: 'Multi-currency' },
  { icon: Unlock, label: 'No Lock-in' },
];

/** Dark navy footer: brand + hours card, quick links, platforms, contact info, trust badges. */
export default function SiteFooter() {
  return (
    <footer className="bg-navy-950 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.35fr_1fr_1fr_1.15fr] gap-10 lg:gap-12 pb-14">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-3 mb-4" aria-label="FlowZa AI — home">
              <span className="w-11 h-11 rounded-xl overflow-hidden ring-1 ring-cyan-400/25">
                <img src="/Logo_Final_-_Focused.jpeg" alt="" className="w-full h-full object-cover" />
              </span>
              <span className="leading-tight">
                <span className="block font-bold text-lg text-white tracking-tight">
                  FlowZa <span className="fx-gradient-text">AI</span>
                </span>
                <span className="block text-[11px] text-slate-400 font-medium">Business Operating Systems</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400 mb-6">
              AI-powered business operating systems for MEA &amp; India. Seven purpose-built platforms. One unified vision.
            </p>
            <div className="rounded-xl bg-white/[0.04] border border-white/10 p-4 mb-6">
              <p className="flex items-center gap-2 text-sm font-semibold text-white mb-2">
                <Clock size={14} className="text-cyan-300" />
                Working Hours
              </p>
              <p className="text-sm text-slate-300">{BUSINESS_HOURS}</p>
              <p className="text-sm text-rose-400 mt-1">Fri &amp; Sat: Closed</p>
              <p className="text-sm text-emerald-400 mt-1">Chat with us on WhatsApp</p>
            </div>
            <div className="flex items-center gap-2.5">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-slate-400 hover:text-cyan-300 hover:border-cyan-400/50 transition-colors"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <nav aria-label="Quick Links">
            <h3 className="font-bold text-white mb-5">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-cyan-300 transition-colors"
                  >
                    <ChevronRight size={13} className="text-slate-600" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Platforms */}
          <nav aria-label="Our Platforms">
            <h3 className="font-bold text-white mb-5">Our Platforms</h3>
            <ul className="space-y-3">
              {landingProducts.map((p) => (
                <li key={p.id}>
                  <Link
                    to={`/products/${p.id}`}
                    className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-cyan-300 transition-colors"
                  >
                    <ChevronRight size={13} className="text-slate-600" />
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact info + policies */}
          <div>
            <h3 className="font-bold text-white mb-5">Contact Info</h3>
            <ul className="space-y-4 mb-8">
              <li>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-sm text-slate-300 hover:text-cyan-300 transition-colors"
                >
                  <MessageCircle size={16} className="text-cyan-300 mt-0.5 shrink-0" />
                  {WHATSAPP_DISPLAY} (WhatsApp)
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="flex items-start gap-3 text-sm text-slate-300 hover:text-cyan-300 transition-colors"
                >
                  <Mail size={16} className="text-cyan-300 mt-0.5 shrink-0" />
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-300">
                <MapPin size={16} className="text-cyan-300 mt-0.5 shrink-0" />
                {OFFICE_ADDRESS}
              </li>
            </ul>
            <h3 className="font-bold text-white mb-4">Policies</h3>
            <ul className="space-y-2.5">
              {policies.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-sm text-slate-400 hover:text-cyan-300 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Trust badges */}
        <div className="border-t border-white/10 py-6 flex flex-wrap items-center justify-center gap-3">
          {trustBadges.map(({ icon: Icon, label }) => (
            <span
              key={label}
              className="inline-flex items-center gap-2 rounded-lg bg-white/[0.05] border border-white/10 px-3.5 py-1.5 text-xs font-medium text-slate-300"
            >
              <Icon size={13} className="text-cyan-300" />
              {label}
            </span>
          ))}
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} FlowZa AI. All Rights Reserved.</p>
          <Link to="/status" className="inline-flex items-center gap-2 hover:text-emerald-400 transition-colors">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
            All systems operational
          </Link>
        </div>
      </div>
    </footer>
  );
}
