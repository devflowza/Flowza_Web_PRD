import { Linkedin, Youtube, MessageCircle, Layers, Sun, Cloud } from 'lucide-react';
import { Link } from 'react-router-dom';

const productLinks = [
  { label: 'Flowza Finance', to: '/products/finance' },
  { label: 'Flowza Spa Master', to: '/products/spamaster' },
  { label: 'Flowza LogisPro', to: '/products/logispro' },
  { label: 'Flowza QRForge', to: '/products/qrforge' },
  { label: 'Flowza POS', to: '/products/pos' },
  { label: 'Flowza Fleetza', to: '/products/fleetza' },
  { label: 'Flowza Club', to: '/products/club' },
];

const footerLinks: Record<string, { label: string; to: string }[]> = {
  Company: [
    { label: 'About Us', to: '/about' },
    { label: 'Locations', to: '/locations' },
    { label: 'Contact Us', to: '/contact' },
  ],
  Resources: [
    { label: 'Documentation – Coming Soon', to: '/docs' },
    { label: 'Help Center', to: '/help' },
    { label: 'Status', to: '/status' },
  ],
  Legal: [
    { label: 'Privacy Policy', to: '/privacy' },
    { label: 'Terms of Service', to: '/terms' },
    { label: 'Cookie Policy', to: '/cookies' },
  ],
};

const socials = [
  { icon: Linkedin, href: 'https://linkedin.com/company/flowzaai', label: 'LinkedIn', hoverColor: '#0a66c2' },
  { icon: Youtube, href: 'https://youtube.com/@flowzaai', label: 'YouTube', hoverColor: '#ff0000' },
  { icon: MessageCircle, href: 'https://web.whatsapp.com/send?phone=96892107562&text=Hello! Flowza', label: 'WhatsApp', hoverColor: '#25d366' },
];

export default function Footer() {
  return (
    <footer className="border-t border-sky-100 bg-white/80 backdrop-blur-sm py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-14">
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-4 group">
              <div className="relative w-8 h-8 rounded-xl overflow-hidden shadow-[0_0_16px_rgba(14,165,233,0.3)] group-hover:shadow-[0_0_24px_rgba(14,165,233,0.5)] transition-all duration-300">
                <img
                  src="/Logo_Final_-_Focused.jpeg"
                  alt="Flowza"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-display font-bold text-gray-900 text-sm tracking-tight">
                Flowza<span className="text-gradient-dark"> AI</span>
              </span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed max-w-[200px] mb-6">
              All products are purpose-built platforms. One unified vision. Transforming businesses across the world.
            </p>
            <div className="flex items-center gap-2">
              {socials.map(({ icon: Icon, href, label, hoverColor }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 rounded-lg border border-sky-100 bg-white flex items-center justify-center text-gray-400 transition-all duration-200"
                  style={{ '--hover-color': hoverColor } as React.CSSProperties}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.color = hoverColor;
                    el.style.borderColor = `${hoverColor}50`;
                    el.style.backgroundColor = `${hoverColor}10`;
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.color = '';
                    el.style.borderColor = '';
                    el.style.backgroundColor = '';
                  }}
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-gray-400 text-xs font-semibold uppercase tracking-widest mb-4">Products</p>
            <ul className="space-y-2.5">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-gray-500 text-sm hover:text-sky-700 transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <p className="text-gray-400 text-xs font-semibold uppercase tracking-widest mb-4">{group}</p>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-gray-500 text-sm hover:text-sky-700 transition-colors duration-150"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-sky-100 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-xs">
            © {new Date().getFullYear()} Flowza AI. All rights reserved.
          </p>
          <div className="flex items-center gap-3 bg-sky-50 border border-sky-100 rounded-full px-3.5 py-1.5">
            <span className="flex items-center gap-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
              </span>
              <span className="text-gray-500 text-xs font-medium">7 AI engines live</span>
            </span>
            <span className="w-px h-3 bg-sky-200" />
            <span className="text-gray-400 text-xs">99.9% uptime</span>
            <span className="w-px h-3 bg-sky-200" />
            <span className="text-gray-400 text-xs">100+ businesses served</span>
          </div>
        </div>
      </div>

      <div className="border-t border-sky-100 mt-2" style={{ background: 'linear-gradient(135deg, #f0f9ff 0%, #fafafa 50%, #fffbeb 100%)' }}>
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex flex-col items-center gap-6">
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-gradient-to-r from-transparent to-sky-200" />
              <p className="text-[11px] uppercase tracking-[0.2em] text-gray-400 font-semibold">
                A venture by
              </p>
              <span className="h-px w-10 bg-gradient-to-l from-transparent to-sky-200" />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {[
                {
                  icon: Layers,
                  name: 'Manchi Group',
                  tagline: 'Diversified Holdings',
                  subTagline: undefined as string | undefined,
                  accentColor: '#0284c7',
                  gradientFrom: '#e0f2fe',
                  gradientTo: '#f0f9ff',
                  borderColor: '#bae6fd',
                  dotColor: '#38bdf8',
                },
                {
                  icon: Sun,
                  name: 'SolarTek LLC',
                  tagline: 'SaaS Division',
                  subTagline: 'Clean Energy Solutions',
                  accentColor: '#d97706',
                  gradientFrom: '#fef3c7',
                  gradientTo: '#fffbeb',
                  borderColor: '#fde68a',
                  dotColor: '#fbbf24',
                },
                {
                  icon: Cloud,
                  name: 'CloudValley Solutions',
                  tagline: 'OPC Pvt Ltd',
                  subTagline: undefined as string | undefined,
                  accentColor: '#0369a1',
                  gradientFrom: '#dbeafe',
                  gradientTo: '#eff6ff',
                  borderColor: '#bfdbfe',
                  dotColor: '#60a5fa',
                },
              ].map(({ icon: Icon, name, tagline, subTagline, accentColor, gradientFrom, gradientTo, borderColor, dotColor }) => (
                <div
                  key={name}
                  className="group relative flex items-center gap-3.5 px-5 py-3.5 rounded-2xl border cursor-default transition-all duration-300"
                  style={{
                    background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
                    borderColor,
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.transform = 'translateY(-3px)';
                    el.style.boxShadow = `0 8px 24px ${accentColor}25, 0 2px 8px ${accentColor}15`;
                    el.style.borderColor = accentColor + '80';
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.transform = '';
                    el.style.boxShadow = '';
                    el.style.borderColor = borderColor;
                  }}
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300"
                    style={{ backgroundColor: accentColor + '18', border: `1.5px solid ${accentColor}30` }}
                  >
                    <Icon size={16} style={{ color: accentColor }} strokeWidth={2} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[14px] font-bold leading-tight text-gray-800 whitespace-nowrap">
                      {name}
                    </span>
                    <span className="text-[11px] font-semibold leading-tight mt-0.5 whitespace-nowrap" style={{ color: accentColor + 'dd' }}>
                      {tagline}
                    </span>
                    {subTagline && (
                      <span className="text-[10px] font-medium leading-tight mt-0.5 whitespace-nowrap text-gray-400">
                        {subTagline}
                      </span>
                    )}
                  </div>
                  <span
                    className="absolute top-2.5 right-2.5 w-1.5 h-1.5 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ backgroundColor: dotColor }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
