import SiteLayout from '../site/SiteLayout';

interface PageLayoutProps {
  children: React.ReactNode;
}

/** Legacy alias kept so existing pages keep working — renders the new site shell. */
export default function PageLayout({ children }: PageLayoutProps) {
  return <SiteLayout>{children}</SiteLayout>;
}
