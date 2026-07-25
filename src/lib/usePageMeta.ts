import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SITE = 'https://flowza.ai';
const DEFAULT_DESCRIPTION =
  'Seven purpose-built business systems on one operating fabric — finance, logistics, wellness, fleet, retail and clubs. FlowZa quietly automates the busywork for teams across MEA and India.';
const DEFAULT_OG_IMAGE = `${SITE}/og-card.webp`;

interface PageMeta {
  title: string;
  description?: string;
  /** Site-relative path (e.g. "/product-finance.webp") or absolute URL. */
  ogImage?: string;
  noindex?: boolean;
}

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

/**
 * Per-route document metadata for the SPA: title, description, canonical,
 * Open Graph/Twitter tags and robots. Every routed page should call this —
 * without it the route inherits the homepage's canonical and shares its
 * SERP snippet and social preview.
 */
export default function usePageMeta({ title, description, ogImage, noindex }: PageMeta) {
  const { pathname } = useLocation();

  useEffect(() => {
    const url = SITE + (pathname === '/' ? '/' : pathname);
    const desc = description ?? DEFAULT_DESCRIPTION;
    const image = ogImage ? (ogImage.startsWith('http') ? ogImage : SITE + ogImage) : DEFAULT_OG_IMAGE;

    document.title = title;

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);

    upsertMeta('name', 'description', desc);
    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', desc);
    upsertMeta('property', 'og:url', url);
    upsertMeta('property', 'og:image', image);
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', desc);

    const robots = document.head.querySelector<HTMLMetaElement>('meta[name="robots"]');
    if (noindex) {
      upsertMeta('name', 'robots', 'noindex, nofollow');
    } else if (robots) {
      robots.remove();
    }
  }, [pathname, title, description, ogImage, noindex]);
}
