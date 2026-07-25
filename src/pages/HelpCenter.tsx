import { useState, useEffect } from 'react';
import { Plus, MessageCircle, Mail, ArrowUpRight } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import PageHero from '../components/PageHero';
import Reveal from '../site/Reveal';
import { WHATSAPP_URL } from '../site/data';

const faqs: { question: string; answer: string; category: string }[] = [
  {
    category: 'Getting started',
    question: 'How long does it take to get up and running with FlowZa?',
    answer: 'Most businesses are fully operational within 24–48 hours. Our onboarding team guides you through data import, team setup and initial configuration. Complex enterprise setups with custom integrations may take 3–5 business days.',
  },
  {
    category: 'Getting started',
    question: 'Can I use multiple FlowZa platforms under one account?',
    answer: 'Yes. Your FlowZa account is your unified workspace. You can activate any combination of the seven platforms — they share a common data layer, so customers, inventory and ledger data flow between systems without re-entry.',
  },
  {
    category: 'Billing & plans',
    question: 'How does pricing work for multiple platforms?',
    answer: 'Each platform is priced independently. Multi-platform customers receive a bundle discount applied at checkout, and yearly billing saves a further 25% compared to monthly plans.',
  },
  {
    category: 'Billing & plans',
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit and debit cards (Visa, Mastercard, Amex) and bank transfers, plus local payment methods across the Gulf and India.',
  },
  {
    category: 'Account & settings',
    question: 'How do I invite team members to my workspace?',
    answer: 'Go to Settings → Team → Invite members. You can send email invitations and assign role-based permissions (Admin, Manager, Operator, Read-only) per platform.',
  },
  {
    category: 'Account & settings',
    question: 'Can I export all my data from FlowZa?',
    answer: 'Yes, full data export is available at any time. Go to Settings → Data export and select the platforms and date ranges you want. Exports are delivered as CSV, Excel or JSON within minutes. Your data is yours — no lock-in.',
  },
  {
    category: 'Security & privacy',
    question: 'Where is my data stored?',
    answer: 'Customer data is stored in certified data centres with encrypted backups. All data is encrypted at rest (AES-256) and in transit (TLS 1.3), with role-based access control and audit trails on every action.',
  },
  {
    category: 'Security & privacy',
    question: 'Does FlowZa support SSO / SAML?',
    answer: 'Yes — SAML 2.0 and OAuth 2.0 SSO are available on Professional and Enterprise plans. We support Okta, Azure AD, Google Workspace and any standard SAML provider.',
  },
];

export default function HelpCenter() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    document.title = 'Help center — FlowZa AI';
    return () => {
      document.title = 'FlowZa AI — Business Operating Systems';
    };
  }, []);

  const categories = ['All', ...new Set(faqs.map((f) => f.category))];
  const filtered = faqs.filter((f) => activeCategory === 'All' || f.category === activeCategory);

  return (
    <PageLayout>
      <PageHero
        label="Help center"
        title="How can we"
        titleHighlight="help?"
        subtitle="Answers to the questions operators ask most — and a fast line to a real person when you need one."
      />

      {/* FAQ with category filter */}
      <section className="px-4 pb-24 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <Reveal className="mb-10 flex flex-wrap items-center gap-2" >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setOpenFaq(null);
                }}
                aria-pressed={activeCategory === cat}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 ease-swift ${
                  activeCategory === cat
                    ? 'bg-ink text-white shadow-pill'
                    : 'bg-white text-ink-500 ring-1 ring-ink/[0.1] hover:ring-ink/25 hover:text-ink'
                }`}
              >
                {cat}
              </button>
            ))}
          </Reveal>

          <div>
            {filtered.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={faq.question} className={`border-t border-ink/[0.09] ${i === filtered.length - 1 ? 'border-b' : ''}`}>
                  <h2>
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      className="group flex w-full items-center justify-between gap-6 py-6 text-left"
                      aria-expanded={isOpen}
                    >
                      <span
                        className={`font-display text-[17px] font-semibold tracking-snug transition-colors duration-300 ${
                          isOpen ? 'text-ink' : 'text-ink-600 group-hover:text-ink'
                        }`}
                      >
                        {faq.question}
                      </span>
                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-500 ease-swift ${
                          isOpen ? 'rotate-45 bg-ink text-white' : 'bg-white text-ink-400 ring-1 ring-ink/[0.09] group-hover:ring-ink/25'
                        }`}
                        aria-hidden="true"
                      >
                        <Plus size={15} />
                      </span>
                    </button>
                  </h2>
                  <div className={`grid transition-all duration-500 ease-swift ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                    <div className="overflow-hidden">
                      <p className="max-w-2xl pb-6 pr-14 text-[15px] leading-relaxed text-ink-500">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact support */}
      <section className="bg-mist px-4 py-24 sm:px-6 sm:py-28">
        <div className="mx-auto max-w-5xl">
          <Reveal className="mb-12 text-center">
            <span className="eyebrow justify-center">Still stuck?</span>
            <h2 className="display-title mt-5 text-[2rem] text-ink sm:text-[2.6rem]">Talk to a human.</h2>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-2">
            <Reveal>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="card-line group flex h-full flex-col bg-white p-8 hover:-translate-y-1"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                  <MessageCircle size={19} strokeWidth={1.8} />
                </span>
                <h3 className="mt-5 font-display text-lg font-bold tracking-snug text-ink">WhatsApp</h3>
                <p className="mt-2 flex-1 text-[15px] leading-relaxed text-ink-500">
                  Our fastest channel — a real person, usually within minutes during business hours.
                </p>
                <p className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute h-full w-full animate-ping rounded-full bg-emerald-500 opacity-70" />
                    <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  </span>
                  Online now
                  <ArrowUpRight size={13} className="text-ink-300 transition-transform duration-300 ease-swift group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </p>
              </a>
            </Reveal>
            <Reveal delay={90}>
              <a href="mailto:support@flowza.ai" className="card-line group flex h-full flex-col bg-white p-8 hover:-translate-y-1">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent-wash text-accent">
                  <Mail size={19} strokeWidth={1.8} />
                </span>
                <h3 className="mt-5 font-display text-lg font-bold tracking-snug text-ink">Email support</h3>
                <p className="mt-2 flex-1 text-[15px] leading-relaxed text-ink-500">
                  Send us a detailed request and we'll respond within four business hours.
                </p>
                <p className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-ink-600 transition-colors group-hover:text-accent">
                  support@flowza.ai
                  <ArrowUpRight size={13} className="transition-transform duration-300 ease-swift group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </p>
              </a>
            </Reveal>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
