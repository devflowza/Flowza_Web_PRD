import { MessagesSquare, Settings2, Rocket, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionHeading from '../SectionHeading';
import Reveal from '../Reveal';

const steps = [
  {
    icon: MessagesSquare,
    color: '#2563eb',
    title: 'Tell Us About Your Business',
    description:
      'Pick your platform and share how you operate. We map your workflows — companies, teams, catalogs, facilities — before anything goes live.',
  },
  {
    icon: Settings2,
    color: '#9333ea',
    title: 'Guided Setup & Migration',
    description:
      'Pre-built templates and setup wizards configure your organisation. Import contacts, items and history from Zoho or spreadsheets with the built-in migration tools.',
  },
  {
    icon: Rocket,
    color: '#10b981',
    title: 'Go Live & Grow with Insights',
    description:
      'Go live in hours, not weeks. Watch dashboards update in real time and act on AI insights that explain what the numbers mean.',
  },
];

/** Numbered process steps with colored circle icons and a connecting line. */
export default function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-28 py-20 sm:py-24 px-4 sm:px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          badge="How It Works"
          title="From First Call to Full Flow"
          subtitle="Zero-complexity onboarding — pre-built templates, guided setup and dedicated onboarding support included."
        />

        <div className="relative grid sm:grid-cols-3 gap-10 sm:gap-6">
          {/* Connecting line (desktop) */}
          <div className="hidden sm:block absolute top-9 left-[16%] right-[16%] h-px bg-gradient-to-r from-blue-200 via-purple-200 to-emerald-200" />

          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <Reveal key={step.title} delay={i * 120} className="relative flex flex-col items-center text-center">
                <div className="relative mb-6">
                  <span
                    className="w-[72px] h-[72px] rounded-full flex items-center justify-center text-white shadow-lg"
                    style={{ background: step.color, boxShadow: `0 10px 26px ${step.color}4d` }}
                  >
                    <Icon size={26} />
                  </span>
                  <span className="absolute -top-1 -right-2 w-7 h-7 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center text-[11px] font-bold text-slate-700">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 text-lg mb-3">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed max-w-[36ch]">{step.description}</p>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-14 text-center">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 text-white font-semibold px-8 py-4 shadow-[0_8px_24px_rgba(37,99,235,0.35)] hover:bg-blue-700 hover:shadow-[0_10px_30px_rgba(37,99,235,0.45)] hover:-translate-y-px transition-all"
          >
            Start Your Onboarding
            <ArrowRight size={17} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
