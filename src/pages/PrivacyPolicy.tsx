import { useState, useEffect } from 'react';
import { Shield, Lock, Eye, Trash2, Download, Mail, Globe, UserCheck } from 'lucide-react';
import PageLayout from '../components/PageLayout';

const sections = [
  {
    id: 'overview',
    title: 'Overview',
    icon: Eye,
    content: 'Flowza AI operates seven AI-powered business platforms. This policy explains how we collect, use, and protect your personal data when you use any of our services. By using our platforms, you agree to the practices described here.',
  },
  {
    id: 'data-we-collect',
    title: 'Data We Collect',
    icon: UserCheck,
    points: [
      { label: 'Account Information', detail: 'Name, email, company, and billing address when you register.' },
      { label: 'Usage Data', detail: 'Log data including IP address, browser type, pages visited, and in-app behavior.' },
      { label: 'Business Data', detail: 'Data you upload into our platforms (transactions, bookings, records). This belongs to you.' },
      { label: 'Payment Information', detail: 'Processed by Stripe (PCI-DSS compliant). We store only the last 4 digits of your card.' },
      { label: 'Support Communications', detail: 'Messages you send us via support, email, or chat.' },
    ],
  },
  {
    id: 'how-we-use',
    title: 'How We Use Your Data',
    icon: Shield,
    points: [
      { label: 'To provide the Services', detail: 'Operate your account, process transactions, and deliver features.' },
      { label: 'To improve our products', detail: 'Analyze anonymized usage patterns to enhance quality and reliability.' },
      { label: 'To communicate with you', detail: 'Send invoices, security alerts, and (with consent) product updates.' },
      { label: 'To ensure security', detail: 'Monitor for fraud, unauthorized access, and abuse.' },
      { label: 'AI model improvement', detail: 'Aggregated, de-identified data only. We never use identifiable data to train external models.' },
    ],
  },
  {
    id: 'sharing',
    title: 'Data Sharing',
    icon: Globe,
    content: 'We do not sell your personal data. We share data only with trusted service providers (cloud infrastructure, payment processing, email delivery) under strict data processing agreements. In the event of a merger or acquisition, we will notify you before your data becomes subject to a different policy.',
  },
  {
    id: 'security',
    title: 'Data Security',
    icon: Lock,
    points: [
      { label: 'Encryption', detail: 'All data encrypted in transit (TLS 1.3) and at rest (AES-256).' },
      { label: 'Access Controls', detail: 'Role-based access with full audit logs. Employees access only what they need.' },
      { label: 'Infrastructure', detail: 'ISO 27001-certified data center in the UAE with encrypted backups in the EU.' },
      { label: 'Penetration Testing', detail: 'Annual third-party security audits with critical findings addressed within 30 days.' },
    ],
  },
  {
    id: 'rights',
    title: 'Your Rights',
    icon: UserCheck,
    points: [
      { label: 'Access', detail: 'Request a copy of the personal data we hold about you.' },
      { label: 'Rectification', detail: 'Request correction of inaccurate or incomplete data.' },
      { label: 'Erasure', detail: 'Request deletion of your data, subject to legal retention requirements.' },
      { label: 'Portability', detail: 'Receive your data in a structured, machine-readable format.' },
      { label: 'Withdraw Consent', detail: 'Opt out of marketing communications at any time.' },
    ],
  },
  {
    id: 'retention',
    title: 'Retention & Deletion',
    icon: Trash2,
    points: [
      { label: 'Account data', detail: 'Retained for the duration of your subscription plus 90 days for account recovery.' },
      { label: 'Financial data', detail: 'Retained up to 7 years to comply with UAE tax regulations.' },
      { label: 'Marketing data', detail: 'Retained for 3 years, or until you withdraw consent.' },
    ],
  },
];

export default function PrivacyPolicy() {
  const [activeSection, setActiveSection] = useState('overview');

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
      <div
        className="relative pt-32 pb-20 px-6 overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, #f0f7ff 0%, #ffffff 70%)',
        }}
      >
        <img
          src="https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg"
          alt="Data security"
          className="absolute inset-0 w-full h-full object-cover mix-blend-luminosity opacity-5"
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(14,165,233,0.12) 0%, transparent 70%)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white" />
        <div className="relative max-w-4xl mx-auto">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-sky-200 bg-sky-50 text-xs font-semibold uppercase tracking-widest text-sky-700 mb-6">
            Legal
          </span>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-center">
              <Shield size={22} className="text-sky-600" />
            </div>
            <h1 className="font-display font-bold text-5xl text-gray-900">Privacy Policy</h1>
          </div>
          <p className="text-gray-500 text-base">Last updated: <span className="text-gray-900 font-medium">February 1, 2026</span></p>
        </div>
      </div>

      <div className="bg-white">
        <div className="max-w-5xl mx-auto px-6 py-16 flex gap-12 items-start">
          <aside className="hidden lg:block w-52 shrink-0 sticky top-28">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">Contents</p>
            <nav className="space-y-0.5">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className={`block text-sm py-2 px-3 rounded-lg transition-all duration-150 ${
                    activeSection === s.id
                      ? 'bg-blue-50 text-blue-700 font-medium'
                      : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
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
                    <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-100">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                        <Icon size={15} className="text-blue-600" />
                      </div>
                      <h2 className="font-display font-bold text-lg text-gray-900">{section.title}</h2>
                    </div>
                    {'content' in section && (
                      <p className="text-gray-600 text-sm leading-relaxed">{section.content}</p>
                    )}
                    {'points' in section && section.points && (
                      <ul className="space-y-3">
                        {section.points.map((p) => (
                          <li key={p.label} className="flex gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0" />
                            <p className="text-sm text-gray-600 leading-relaxed">
                              <span className="font-semibold text-gray-800">{p.label}:</span>{' '}
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

            <div className="mt-12 pt-8 border-t border-gray-100">
              <div className="flex items-center gap-4 p-5 bg-blue-50 rounded-2xl border border-blue-100">
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                  <Mail size={16} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-gray-900 font-medium text-sm">Questions about your privacy?</p>
                  <p className="text-gray-500 text-sm">Email our data protection team at <a href="mailto:privacy@flowza.ai" className="text-blue-600 hover:text-blue-700 transition-colors font-medium">privacy@flowza.ai</a></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 py-10 px-6 border-t border-gray-100">
        <div className="max-w-5xl mx-auto flex flex-wrap gap-6 items-center justify-between">
          <div className="flex items-center gap-3">
            <Download size={15} className="text-gray-400" />
            <p className="text-sm text-gray-500">To export or delete your data, contact us at <a href="mailto:privacy@flowza.ai" className="text-blue-600 hover:underline">privacy@flowza.ai</a></p>
          </div>
          <p className="text-xs text-gray-400">© 2026 Flowza AI FZ-LLC · Dubai Internet City, UAE</p>
        </div>
      </div>
    </PageLayout>
  );
}
