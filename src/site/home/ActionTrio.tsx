import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle } from 'lucide-react';
import Reveal from '../Reveal';
import { WHATSAPP_URL } from '../data';

/** Closing CTA: one ink panel, one decision. */
export default function ActionTrio() {
  return (
    <section className="bg-mist px-4 pb-24 sm:px-6 sm:pb-32">
      <Reveal className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-ink px-6 py-20 text-center text-white shadow-frame sm:px-12 sm:py-28 grain">
          <div className="pointer-events-none absolute inset-0 wash-ink" aria-hidden="true" />

          <div className="relative mx-auto max-w-3xl">
            <span className="eyebrow eyebrow-light justify-center">Get started</span>
            <h2 className="display-hero mt-6 text-4xl text-white sm:text-6xl lg:text-[4.5rem]">
              Ready when
              <span className="accent-word text-accent-soft"> you are.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg">
              Spin up your workspace and see your operation in flow before you pay
              anything. Plans from $15/month — 25% off paid yearly, no hidden fees.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
              <Link to="/get-started" className="btn-inverse btn-lg group w-full sm:w-auto">
                Start free trial
                <span className="btn-orb bg-ink/[0.07] transition-transform group-hover:translate-x-0.5">
                  <ArrowRight size={14} />
                </span>
              </Link>
              <Link to="/contact" className="btn-outline-light btn-lg w-full sm:w-auto">
                Talk to sales
              </Link>
            </div>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-white/50 transition-colors hover:text-white"
            >
              <MessageCircle size={14} />
              Fastest response on WhatsApp
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
