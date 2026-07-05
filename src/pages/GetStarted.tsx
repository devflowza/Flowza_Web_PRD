import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink, MessageCircle, Clock } from 'lucide-react';
import SiteLayout from '../site/SiteLayout';
import Reveal from '../site/Reveal';
import { landingProducts, WHATSAPP_URL } from '../site/data';

/*
 * Only platforms with real trial infrastructure get a self-serve button here.
 * Everything else routes to /contact?service=… — the Contact form pre-selects
 * that product, so every "early access" click becomes a tagged lead.
 */
const liveTrials = [
  {
    id: 'finance',
    ctaLabel: 'Start Free Trial',
    trialUrl: 'https://finance.flowza.ai/trial',
    note: 'No card required · guided migration from Zoho or spreadsheets',
  },
  {
    id: 'club',
    ctaLabel: 'Start 14-Day Trial',
    trialUrl: 'https://club.flowza.ai',
    note: '14-day trial · six-step setup wizard, go live in hours',
  },
];

export default function GetStarted() {
  useEffect(() => {
    document.title = 'Get Started — Flowza AI';
    return () => {
      document.title = 'Flowza AI — Business Operating Systems';
    };
  }, []);

  const live = liveTrials
    .map((t) => ({ ...t, product: landingProducts.find((p) => p.id === t.id)! }))
    .filter((t) => t.product);
  const comingSoon = landingProducts.filter((p) => !p.live);

  return (
    <SiteLayout>
      {/* Header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/70 via-slate-50 to-white">
        <div className="absolute inset-0 fx-grid fx-grid-fade pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 pt-16 pb-12 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white border border-blue-100 shadow-sm px-4 py-1.5 text-sm font-semibold text-blue-700 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Get Started
          </span>
          <h1 className="font-bold text-slate-900 text-4xl sm:text-5xl lg:text-[52px] leading-[1.08] tracking-tight mb-5">
            Pick Your Platform. <span className="fx-gradient-text">Start in Minutes.</span>
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed max-w-2xl mx-auto">
            Flowza Finance and Flowza Club are live today with self-serve trials. The rest of
            the fabric is rolling out — tell us which one you need and we'll set you up first.
          </p>
        </div>
      </section>

      {/* Live trials */}
      <section className="relative bg-gradient-to-b from-white to-gray-50 px-4 sm:px-6 pb-20">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
          {live.map(({ product: p, ctaLabel, trialUrl, note }, i) => {
            const Icon = p.icon;
            return (
              <Reveal key={p.id} delay={i * 100}>
                <article className="h-full rounded-2xl bg-white border border-gray-200 shadow-[0_14px_40px_rgba(15,23,42,0.08)] overflow-hidden flex flex-col">
                  <div className="relative h-44 bg-navy-900">
                    <img
                      src={p.image}
                      alt={p.name}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/20 to-transparent" />
                    <span className="absolute top-4 right-4 inline-flex items-center gap-1.5 rounded-full bg-emerald-500/90 backdrop-blur-sm px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                      <span className="w-1.5 h-1.5 rounded-full bg-white" />
                      Live
                    </span>
                    <span
                      className="absolute bottom-4 left-4 w-11 h-11 rounded-xl flex items-center justify-center backdrop-blur-md border border-white/25 text-white"
                      style={{ background: `${p.color}55` }}
                    >
                      <Icon size={18} />
                    </span>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h2 className="font-bold text-slate-900 text-xl">{p.name}</h2>
                    <p className="text-sm font-medium mt-0.5" style={{ color: p.color }}>
                      {p.tagline}
                    </p>
                    <p className="text-gray-500 text-sm leading-relaxed mt-3 flex-1">{p.description}</p>
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {p.badges.map((b) => (
                        <span
                          key={b}
                          className="rounded-full bg-gray-50 border border-gray-200 px-2.5 py-0.5 text-[11px] font-medium text-slate-600"
                        >
                          {b}
                        </span>
                      ))}
                    </div>
                    <a
                      href={trialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl text-white text-sm font-semibold px-6 py-3.5 hover:-translate-y-px transition-all"
                      style={{
                        background: `linear-gradient(120deg, ${p.color}, ${p.color}cc)`,
                        boxShadow: `0 8px 24px ${p.color}59`,
                      }}
                    >
                      {ctaLabel}
                      <ExternalLink size={15} />
                    </a>
                    <p className="text-xs text-gray-400 text-center mt-3">{note}</p>
                    <Link
                      to={`/products/${p.id}`}
                      className="mt-3 inline-flex items-center justify-center gap-1.5 text-[13px] font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      Explore platform <ArrowRight size={13} />
                    </Link>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Coming soon — early access */}
      <section className="py-20 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <Reveal className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-5 bg-blue-50 text-blue-600">
              <Clock size={13} />
              Rolling Out
            </span>
            <h2 className="font-bold text-3xl sm:text-4xl leading-tight tracking-tight text-slate-900">
              Coming Soon — Get Early Access
            </h2>
            <p className="mt-4 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto text-gray-500">
              These platforms are in rollout. Tell us which one your business needs and
              we'll prioritise your onboarding.
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {comingSoon.map((p, i) => {
              const Icon = p.icon;
              return (
                <Reveal key={p.id} delay={(i % 3) * 90}>
                  <article className="h-full rounded-2xl bg-white border border-gray-200 p-6 shadow-sm hover:shadow-[0_14px_36px_rgba(15,23,42,0.1)] hover:-translate-y-1 transition-all duration-300 flex flex-col">
                    <span
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                      style={{ background: `${p.color}14`, border: `1px solid ${p.color}33`, color: p.color }}
                    >
                      <Icon size={20} />
                    </span>
                    <h3 className="font-bold text-slate-900 text-lg">{p.name}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed mt-2 flex-1">{p.description}</p>
                    <div className="mt-5 flex items-center gap-4">
                      <Link
                        to={`/contact?service=${encodeURIComponent(p.name)}`}
                        className="inline-flex items-center gap-2 rounded-xl bg-slate-900 text-white text-[13px] font-semibold px-4 py-2.5 hover:bg-slate-800 transition-colors"
                      >
                        Talk to us
                        <ArrowRight size={13} />
                      </Link>
                      <Link
                        to={`/products/${p.id}`}
                        className="text-[13px] font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                      >
                        Learn more
                      </Link>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* WhatsApp fallback */}
      <section className="py-16 px-4 sm:px-6 bg-white">
        <Reveal className="max-w-2xl mx-auto text-center">
          <h2 className="font-bold text-2xl sm:text-3xl text-slate-900 mb-3">Not sure which platform fits?</h2>
          <p className="text-gray-500 mb-7">
            Chat with us — we'll map your operation to the right system in one conversation.
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-[#25d366] text-white text-sm font-semibold px-6 py-3.5 shadow-[0_6px_18px_rgba(37,211,102,0.35)] hover:shadow-[0_8px_24px_rgba(37,211,102,0.5)] hover:-translate-y-px transition-all"
          >
            <MessageCircle size={16} />
            Chat With Us on WhatsApp
          </a>
        </Reveal>
      </section>
    </SiteLayout>
  );
}
