import type { ReactNode } from 'react';
import SiteNav from './SiteNav';
import SiteFooter from './SiteFooter';
import WhatsAppFloat from './WhatsAppFloat';

interface SiteLayoutProps {
  children: ReactNode;
}

/** Public-page shell: skip link, floating nav, content, ink footer, WhatsApp orb. */
export default function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <div className="min-h-screen bg-white overflow-x-clip">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>
      <SiteNav />
      <main id="main-content">{children}</main>
      <SiteFooter />
      <WhatsAppFloat />
    </div>
  );
}
