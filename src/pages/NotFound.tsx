import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import SiteLayout from '../site/SiteLayout';

/** Branded 404 — a dead end that still points somewhere useful. */
export default function NotFound() {
  useEffect(() => {
    document.title = 'Page not found — FlowZa AI';
    return () => {
      document.title = 'FlowZa AI — Business Operating Systems';
    };
  }, []);

  return (
    <SiteLayout>
      <section className="relative overflow-hidden wash-top px-4 py-28 sm:px-6 sm:py-36">
        <div className="relative mx-auto max-w-2xl text-center">
          <p
            aria-hidden="true"
            className="pointer-events-none select-none font-display text-[9rem] font-extrabold leading-none tracking-tightest text-ink/[0.05] sm:text-[13rem]"
          >
            404
          </p>
          <h1 className="display-title -mt-10 text-3xl text-ink sm:-mt-14 sm:text-4xl">
            This page has drifted out of flow.
          </h1>
          <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-ink-500 sm:text-lg">
            The page you're looking for doesn't exist or has moved. Let's get you back to
            somewhere useful.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
            <Link to="/" className="btn-primary btn-lg group">
              <ArrowLeft size={15} className="transition-transform duration-300 ease-swift group-hover:-translate-x-0.5" />
              Back to home
            </Link>
            <Link to="/#platforms" className="btn-secondary btn-lg group">
              Explore the platforms
              <ArrowRight size={15} className="transition-transform duration-300 ease-swift group-hover:translate-x-0.5" />
            </Link>
          </div>
          <p className="mt-8 text-sm text-ink-400">
            Still stuck?{' '}
            <Link to="/contact" className="font-semibold text-ink-600 underline decoration-ink-200 underline-offset-2 transition-colors hover:text-accent">
              Contact us
            </Link>{' '}
            and we'll point you the right way.
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}
