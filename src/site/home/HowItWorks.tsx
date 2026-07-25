import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Reveal from '../Reveal';

const steps = [
  {
    number: '01',
    title: 'Tell us how you operate',
    description:
      'Pick your platform and walk us through the way you work. We map your companies, teams, catalogs and facilities before anything goes live.',
  },
  {
    number: '02',
    title: 'Guided setup and migration',
    description:
      'Pre-built templates and setup wizards configure your organisation. Contacts, items and history import from Zoho or spreadsheets with the built-in migration tools.',
  },
  {
    number: '03',
    title: 'Go live and grow with insight',
    description:
      'Live in hours, not weeks. Dashboards update in real time, and the system explains what the numbers mean — not just what they are.',
  },
];

/** Editorial numbered rows with a sticky chapter heading. */
export default function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-24 bg-white px-4 py-24 sm:px-6 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1fr_1.4fr] lg:gap-24">
        {/* Sticky chapter heading */}
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Reveal>
            <span className="eyebrow">How it works</span>
            <h2 className="display-title mt-5 text-[2rem] text-ink sm:text-[2.6rem] lg:text-[3rem]">
              From first call to full flow.
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-ink-500 sm:text-lg">
              Zero-complexity onboarding — templates, guided setup and a dedicated
              onboarding engineer are part of every plan.
            </p>
            <Link to="/contact" className="btn-primary btn-md group mt-9 hidden lg:inline-flex">
              Start your onboarding
              <span className="btn-orb bg-white/15 group-hover:translate-x-0.5">
                <ArrowRight size={13} />
              </span>
            </Link>
          </Reveal>
        </div>

        {/* Numbered rows */}
        <div>
          {steps.map((step, i) => (
            <Reveal key={step.number} delay={i * 100}>
              <article
                className={`group flex gap-7 border-t border-ink/[0.08] py-10 transition-colors duration-500 sm:gap-10 sm:py-12 ${
                  i === steps.length - 1 ? 'border-b' : ''
                }`}
              >
                <span className="font-display text-4xl font-extrabold leading-none tracking-tightest text-ink-100 transition-colors duration-500 group-hover:text-accent sm:text-6xl">
                  {step.number}
                </span>
                <div className="pt-1">
                  <h3 className="font-display text-xl font-bold tracking-snug text-ink sm:text-2xl">{step.title}</h3>
                  <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-ink-500 sm:text-base">
                    {step.description}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
          <Reveal className="mt-10 lg:hidden">
            <Link to="/contact" className="btn-primary btn-md group">
              Start your onboarding
              <span className="btn-orb bg-white/15 group-hover:translate-x-0.5">
                <ArrowRight size={13} />
              </span>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
