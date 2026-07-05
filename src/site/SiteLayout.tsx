import type { ReactNode } from 'react';
import TopBar from './TopBar';
import SiteNav from './SiteNav';
import SiteFooter from './SiteFooter';
import WhatsAppFloat from './WhatsAppFloat';

interface SiteLayoutProps {
  children: ReactNode;
}

/** Public-page shell: sticky TopBar + nav, content, dark footer, floating WhatsApp. */
export default function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <div className="min-h-screen bg-white overflow-x-clip">
      <header className="sticky top-0 z-50">
        <TopBar />
        <SiteNav />
      </header>
      <main>{children}</main>
      <SiteFooter />
      <WhatsAppFloat />
    </div>
  );
}
