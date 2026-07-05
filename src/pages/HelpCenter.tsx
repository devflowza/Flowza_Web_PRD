import { useState } from 'react';
import { Search, MessageSquare, Mail, Phone, Play, ChevronDown, ChevronUp, BookOpen, Zap, Settings, CreditCard, Users, Shield } from 'lucide-react';
import PageLayout from '../components/PageLayout';

const topics = [
  { icon: Zap, label: 'Getting Started', count: 14 },
  { icon: Settings, label: 'Account & Settings', count: 22 },
  { icon: CreditCard, label: 'Billing & Plans', count: 18 },
  { icon: Users, label: 'Team Management', count: 11 },
  { icon: BookOpen, label: 'Product Guides', count: 47 },
  { icon: Shield, label: 'Security & Privacy', count: 9 },
];

const faqs: { question: string; answer: string; category: string }[] = [
  {
    category: 'Getting Started',
    question: 'How long does it take to get up and running with Flowza?',
    answer: 'Most businesses are fully operational within 24–48 hours. Our onboarding team will guide you through data import, team setup, and initial configuration. Complex enterprise setups with custom integrations may take 3–5 business days.',
  },
  {
    category: 'Getting Started',
    question: 'Can I use multiple Flowza products under one account?',
    answer: 'Yes. Your Flowza account is your unified workspace. You can activate any combination of our seven platforms — Finance, Flowza Spa Master, Flowza LogisPro, Flowza QRForge, Flowza POS, Flowza Fleetza, and Flowza Club — and they share a common data layer and reporting dashboard.',
  },
  {
    category: 'Billing & Plans',
    question: 'How does pricing work for multiple products?',
    answer: 'Each product is priced independently. Multi-product customers receive a 15% bundle discount automatically applied at checkout. Annual billing receives an additional 20% off compared to monthly plans.',
  },
  {
    category: 'Billing & Plans',
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit and debit cards (Visa, Mastercard, Amex), bank transfers, and local payment methods in UAE, KSA, Qatar, and Egypt including Mada and Knet.',
  },
  {
    category: 'Account & Settings',
    question: 'How do I invite team members to my Flowza workspace?',
    answer: 'Go to Settings → Team → Invite Members. You can send email invitations and assign role-based access permissions (Admin, Manager, Operator, Read-only) per product. There\'s no limit on team members.',
  },
  {
    category: 'Account & Settings',
    question: 'Can I export all my data from Flowza?',
    answer: 'Yes, full data export is available at any time. Go to Settings → Data Export and select the products and date ranges you want. Exports are delivered as CSV, Excel, or JSON within minutes.',
  },
  {
    category: 'Security & Privacy',
    question: 'Where is my data stored?',
    answer: 'Customer data is stored in ISO 27001-certified data centers in the UAE (primary) with encrypted backups in the EU. All data is encrypted at rest (AES-256) and in transit (TLS 1.3). GDPR and PDPL compliant.',
  },
  {
    category: 'Security & Privacy',
    question: 'Does Flowza support SSO / SAML?',
    answer: 'Yes, SAML 2.0 and OAuth 2.0 SSO is available on Professional and Enterprise plans. We support integration with Okta, Azure AD, Google Workspace, and any standard SAML provider.',
  },
];

const videos = [
  { title: 'Complete Flowza Finance Setup in 20 Minutes', duration: '20:14', product: 'Finance', thumb: 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { title: 'Flowza Spa Master Booking Engine Walkthrough', duration: '15:42', product: 'Flowza Spa Master', thumb: '/product-spamaster-new.webp' },
  { title: 'Setting Up Flowza LogisPro Live Tracking', duration: '12:08', product: 'Flowza LogisPro', thumb: 'https://images.pexels.com/photos/1427541/pexels-photo-1427541.jpeg?auto=compress&cs=tinysrgb&w=400' },
];

export default function HelpCenter() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', ...new Set(faqs.map((f) => f.category))];
  const filtered = faqs.filter((f) => activeCategory === 'All' || f.category === activeCategory);

  return (
    <PageLayout>
      <section className="relative pt-20 pb-24 px-6 overflow-hidden">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-sky-200 bg-sky-50 text-xs font-semibold uppercase tracking-widest text-sky-700 mb-6">
            Help Center
          </span>
          <h1 className="font-display font-bold text-5xl md:text-6xl text-gray-900 leading-[1.1] mb-6">
            We're here to <span className="text-gradient-violet">help</span>
          </h1>
          <p className="text-lg text-gray-600 mb-10">Search our knowledge base or browse by topic below.</p>
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search for answers..."
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-gray-200 text-gray-900 placeholder-gray-400 text-sm shadow-sm focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition-all"
            />
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-white/40 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-display font-bold text-3xl text-gray-900">Browse by Topic</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {topics.map(({ icon: Icon, label, count }) => (
              <div key={label} className="group flex items-center gap-4 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-sky-200 transition-all duration-200 cursor-pointer">
                <div className="w-11 h-11 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center">
                  <Icon size={20} className="text-sky-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm group-hover:text-sky-700 transition-colors">{label}</p>
                  <p className="text-xs text-gray-400">{count} articles</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-sky-600 mb-3 block">Common Questions</span>
            <h2 className="font-display font-bold text-3xl text-gray-900">FAQ</h2>
          </div>
          <div className="flex items-center gap-2 mb-8 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-sky-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900 border border-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="space-y-3">
            {filtered.map((faq, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="font-medium text-gray-900 text-sm pr-4">{faq.question}</span>
                  {openFaq === i ? (
                    <ChevronUp size={16} className="text-sky-600 shrink-0" />
                  ) : (
                    <ChevronDown size={16} className="text-gray-400 shrink-0" />
                  )}
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5">
                    <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-white/40 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs font-semibold uppercase tracking-widest text-sky-600 mb-3 block">Video Tutorials</span>
            <h2 className="font-display font-bold text-3xl text-gray-900">Watch & Learn</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {videos.map((v) => (
              <div key={v.title} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-2xl mb-3">
                  <img src={v.thumb} alt={v.title} className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                      <Play size={18} className="text-sky-600 ml-0.5" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 rounded text-white text-xs font-mono">{v.duration}</div>
                </div>
                <span className="text-xs text-sky-600 font-semibold">{v.product}</span>
                <h3 className="font-semibold text-gray-900 text-sm mt-0.5 group-hover:text-sky-700 transition-colors">{v.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-sky-600 mb-3 block">Still Need Help?</span>
            <h2 className="font-display font-bold text-3xl text-gray-900">Contact Support</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-white border border-gray-200 rounded-2xl text-center shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center mx-auto mb-4">
                <MessageSquare size={22} className="text-sky-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Live Chat</h3>
              <p className="text-gray-600 text-sm mb-4">Chat with our support team directly in the app. Average response: under 3 minutes.</p>
              <span className="inline-flex items-center gap-1.5 text-xs text-emerald-600">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Online now
              </span>
            </div>
            <div className="p-6 bg-white border border-gray-200 rounded-2xl text-center shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center mx-auto mb-4">
                <Mail size={22} className="text-sky-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Email Support</h3>
              <p className="text-gray-600 text-sm mb-4">Send us a detailed request and we'll respond within 4 business hours.</p>
              <a href="mailto:support@flowza.ai" className="text-sm text-sky-600 hover:text-sky-700 transition-colors">support@flowza.ai</a>
            </div>
            <div className="p-6 bg-white border border-gray-200 rounded-2xl text-center shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center mx-auto mb-4">
                <Phone size={22} className="text-sky-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Phone Support</h3>
              <p className="text-gray-600 text-sm mb-4">Available for Professional and Enterprise plans. Call us Monday–Friday, 9AM–6PM GST.</p>
              <a href="tel:+97142000000" className="text-sm text-sky-600 hover:text-sky-700 transition-colors">+971 4 200 0000</a>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
