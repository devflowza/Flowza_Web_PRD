import { useState, useEffect } from 'react';
import { FileText, Users, CreditCard, Code, AlertTriangle, Gavel, Mail } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import usePageMeta from '../lib/usePageMeta';

const sections = [
  {
    id: 'acceptance',
    title: 'Acceptance of Terms',
    icon: FileText,
    content: 'By using any FlowZa AI platform or service, you agree to these Terms. If you are acting on behalf of an organization, you confirm you have authority to bind that organization. Continued use after updates constitutes acceptance of revised terms.',
  },
  {
    id: 'services',
    title: 'Our Services',
    icon: Code,
    points: [
      { label: 'FlowZa Finance', detail: 'Accounting, inventory, payroll, HR, and multi-country tax compliance.' },
      { label: 'FlowZa Spa Master', detail: 'Spa and wellness business management.' },
      { label: 'FlowZa LogisPro', detail: 'Logistics, routing, and fleet management.' },
      { label: 'FlowZa QRForge', detail: 'Dynamic QR code creation and analytics.' },
      { label: 'FlowZa POS', detail: 'Point of sale and inventory management.' },
      { label: 'FlowZa Fleetza', detail: 'Fleet tracking and predictive maintenance.' },
    ],
  },
  {
    id: 'accounts',
    title: 'Accounts & Registration',
    icon: Users,
    points: [
      { label: 'Accurate information', detail: 'You agree to provide current, complete details during registration.' },
      { label: 'Account security', detail: 'You are responsible for all activity under your account. Notify us immediately of unauthorized access.' },
      { label: 'Team members', detail: 'You may invite team members. You are responsible for their compliance with these Terms.' },
      { label: 'Termination', detail: 'We reserve the right to suspend accounts that violate these Terms or pose a security risk.' },
    ],
  },
  {
    id: 'acceptable-use',
    title: 'Acceptable Use',
    icon: AlertTriangle,
    content: 'You agree to use our services only for lawful purposes. You must not reverse-engineer our software, upload malicious code, send unsolicited communications, attempt unauthorized access to our systems, or resell the services without written permission.',
  },
  {
    id: 'payment',
    title: 'Payment & Billing',
    icon: CreditCard,
    points: [
      { label: 'Billing cycle', detail: 'Paid services are billed monthly or annually in advance.' },
      { label: 'Refunds', detail: 'Annual plans include a 30-day money-back guarantee. Monthly plans are non-refundable except where required by law.' },
      { label: 'Price changes', detail: 'We provide at least 30 days\' notice of price changes for existing subscribers.' },
      { label: 'Taxes', detail: 'Prices exclude applicable taxes including UAE VAT (5%).' },
    ],
  },
  {
    id: 'intellectual-property',
    title: 'Intellectual Property',
    icon: Code,
    points: [
      { label: 'Our IP', detail: 'All software, AI models, interfaces, and documentation are owned by FlowZa AI FZ-LLC. These Terms grant only a limited license to use our services.' },
      { label: 'Your data', detail: 'You retain all rights to your business data. We process it solely to provide and improve the services.' },
      { label: 'Feedback', detail: 'Any suggestions or feedback you share may be used by FlowZa without obligation.' },
    ],
  },
  {
    id: 'liability',
    title: 'Liability & Disclaimers',
    icon: AlertTriangle,
    points: [
      { label: 'Service warranty', detail: 'We warrant that the services will perform materially as documented under normal use.' },
      { label: 'AI outputs', detail: 'AI-generated results may contain errors. Review outputs before relying on them for critical decisions.' },
      { label: 'Liability cap', detail: 'Our total liability for any claim shall not exceed the amounts you paid in the 12 months preceding the claim.' },
    ],
  },
  {
    id: 'termination',
    title: 'Termination',
    icon: FileText,
    content: 'Either party may terminate at any time. You retain access through your current billing period. You may export your data at any time. We retain your data for 90 days after termination before permanent deletion. We may terminate immediately for material breaches.',
  },
  {
    id: 'governing-law',
    title: 'Governing Law',
    icon: Gavel,
    content: 'These Terms are governed by the laws of the United Arab Emirates and the Dubai International Financial Centre (DIFC). Disputes shall first be resolved through good-faith negotiation, then binding arbitration via the Dubai International Arbitration Centre (DIAC).',
  },
];

export default function TermsOfService() {
  const [activeSection, setActiveSection] = useState('acceptance');

  usePageMeta({
    title: 'Terms of service — FlowZa AI',
    description: 'The terms that govern your use of FlowZa platforms and services.',
  });

  useEffect(() => {
    const handleScroll = () => {
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140) setActiveSection(section.id);
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <PageLayout>
      <div className="relative overflow-hidden wash-top pt-16 pb-20 px-6">
        <div className="relative max-w-4xl mx-auto">
          <span className="eyebrow mb-6">
            Legal
          </span>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-accent-wash flex items-center justify-center">
              <FileText size={22} className="text-accent" />
            </div>
            <h1 className="display-hero text-4xl sm:text-5xl text-ink">Terms of Service</h1>
          </div>
          <p className="text-ink-400 text-base">Last updated: <span className="text-ink font-medium">February 1, 2026</span> · Version 3.2</p>
        </div>
      </div>

      <div className="bg-white">
        <div className="max-w-5xl mx-auto px-6 py-16 flex gap-12 items-start">
          <aside className="hidden lg:block w-52 shrink-0 sticky top-28">
            <p className="text-xs font-semibold uppercase tracking-widest text-ink-400 mb-4">Contents</p>
            <nav className="space-y-0.5">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className={`block text-sm py-2 px-3 rounded-lg transition-all duration-150 ${
                    activeSection === s.id
                      ? 'bg-accent-wash text-accent font-medium'
                      : 'text-ink-400 hover:text-ink hover:bg-mist'
                  }`}
                >
                  {s.title}
                </a>
              ))}
            </nav>
          </aside>

          <div className="flex-1 min-w-0">
            <div className="space-y-12">
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <div key={section.id} id={section.id} className="scroll-mt-32">
                    <div className="flex items-center gap-3 mb-4 pb-3 border-b border-ink/[0.08]">
                      <div className="w-8 h-8 rounded-lg bg-accent-wash flex items-center justify-center shrink-0">
                        <Icon size={15} className="text-accent" />
                      </div>
                      <h2 className="font-display font-bold tracking-snug text-lg text-ink">{section.title}</h2>
                    </div>
                    {'content' in section && (
                      <p className="text-ink-500 text-sm leading-relaxed">{section.content}</p>
                    )}
                    {'points' in section && section.points && (
                      <ul className="space-y-3">
                        {section.points.map((p) => (
                          <li key={p.label} className="flex gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                            <p className="text-sm text-ink-500 leading-relaxed">
                              <span className="font-semibold text-ink">{p.label}:</span>{' '}
                              {p.detail}
                            </p>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-12 pt-8 border-t border-ink/[0.08]">
              <div className="bg-mist rounded-2xl border border-ink/[0.08] p-5 mb-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-ink-400 mb-3">Version History</p>
                <div className="space-y-2">
                  {[
                    { version: 'v3.2', date: 'Feb 1, 2026', note: 'Added AI output disclaimer; updated liability caps.' },
                    { version: 'v3.1', date: 'Sep 15, 2025', note: 'Updated governing law; added DIAC arbitration.' },
                    { version: 'v3.0', date: 'Mar 1, 2025', note: 'Major rewrite aligning with UAE PDPL requirements.' },
                  ].map((v) => (
                    <div key={v.version} className="flex items-center gap-4 text-sm">
                      <span className="font-mono text-accent w-10 shrink-0">{v.version}</span>
                      <span className="text-ink-400 w-24 shrink-0 text-xs">{v.date}</span>
                      <span className="text-ink-500 text-xs">{v.note}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4 p-5 bg-accent-wash rounded-2xl border border-accent/10">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                  <Mail size={16} className="text-accent" />
                </div>
                <div>
                  <p className="text-ink font-medium text-sm">Legal questions?</p>
                  <p className="text-ink-500 text-sm">Contact our legal team at <a href="mailto:legal@flowza.ai" className="text-accent transition-colors font-medium hover:underline">legal@flowza.ai</a></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
