import { Search, BookOpen, ArrowRight, Clock, ChevronRight, Star } from 'lucide-react';
import PageLayout from '../components/PageLayout';

const products = [
  { id: 'finance', name: 'Flowza Finance', color: '#10b981', icon: '💼', desc: 'Accounting, inventory, payroll, HR, VAT & GST.', articles: 42 },
  { id: 'spamaster', name: 'Flowza Spa Master', color: '#f43f5e', icon: '💆', desc: 'Bookings, staff, loyalty, and payment flows.', articles: 38 },
  { id: 'logispro', name: 'Flowza LogisPro', color: '#38bdf8', icon: '🚚', desc: 'Routes, tracking, warehousing, and delivery SLAs.', articles: 35 },
  { id: 'qrforge', name: 'Flowza QRForge', color: '#f59e0b', icon: '📱', desc: 'QR campaigns, analytics, and dynamic links.', articles: 28 },
  { id: 'pos', name: 'Flowza POS', color: '#0ea5e9', icon: '🛒', desc: 'Point of sale, inventory, and multi-branch ops.', articles: 31 },
  { id: 'fleetza', name: 'Flowza Fleetza', color: '#06b6d4', icon: '🚗', desc: 'Fleet tracking, maintenance, and driver management.', articles: 29 },
  { id: 'club', name: 'Flowza Club', color: '#9333ea', icon: '⛳', desc: 'Membership, billing, POS, and zero-double-book bookings.', articles: 24 },
];

const quickStart = [
  { step: '01', title: 'Create your account', description: 'Sign up and verify your organization details. Takes less than 5 minutes.' },
  { step: '02', title: 'Choose your product', description: 'Select one or more Flowza platforms that match your business needs.' },
  { step: '03', title: 'Import your data', description: 'Use our guided migration tools to bring in existing data with zero downtime.' },
  { step: '04', title: 'Configure your AI', description: 'Set your preferences, workflows, and AI automation rules for your specific context.' },
  { step: '05', title: 'Go live', description: 'Invite your team, test your setup, and launch. Support is available 24/7 to help.' },
];

const recentArticles = [
  { title: 'Setting up automated VAT reporting in Flowza Finance', product: 'Finance', time: '8 min', updated: '2 days ago' },
  { title: 'How to configure multi-branch inventory in Flowza POS', product: 'Flowza POS', time: '6 min', updated: '4 days ago' },
  { title: 'Creating dynamic QR campaigns with custom analytics', product: 'Flowza QRForge', time: '5 min', updated: '1 week ago' },
  { title: 'Flowza LogisPro webhook setup for real-time delivery tracking', product: 'Flowza LogisPro', time: '10 min', updated: '1 week ago' },
  { title: 'Flowza Spa Master staff scheduling: advanced configuration', product: 'Flowza Spa Master', time: '7 min', updated: '2 weeks ago' },
];

export default function Documentation() {
  return (
    <PageLayout>
      <section className="relative pt-20 pb-24 px-6 overflow-hidden">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-sky-200 bg-sky-50 text-xs font-semibold uppercase tracking-widest text-sky-700 mb-6">
            Documentation
          </span>
          <h1 className="font-display font-bold text-5xl md:text-6xl text-gray-900 leading-[1.1] mb-6">
            How can we <span className="text-gradient-violet">help you?</span>
          </h1>
          <p className="text-lg text-gray-600 mb-10">
            Find guides, API references, tutorials, and troubleshooting articles for all Flowza AI products.
          </p>
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search documentation..."
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-gray-200 text-gray-900 placeholder-gray-400 text-sm shadow-sm focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition-all"
            />
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-white/40 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-display font-bold text-3xl text-gray-900">Browse by Product</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {products.map((p) => (
              <div key={p.id} className="group p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200 transition-all duration-200 cursor-pointer">
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                    style={{ background: `${p.color}18`, border: `1px solid ${p.color}40` }}
                  >
                    {p.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm group-hover:text-sky-700 transition-colors">{p.name}</h3>
                    <p className="text-xs text-gray-400">{p.articles} articles</p>
                  </div>
                </div>
                <p className="text-gray-500 text-xs leading-relaxed mb-3">{p.desc}</p>
                <span className="text-xs text-sky-600 font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                  Browse docs <ChevronRight size={12} />
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-sky-600 mb-3 block">New Here?</span>
              <h2 className="font-display font-bold text-3xl text-gray-900 mb-8">Getting Started</h2>
              <div className="space-y-6">
                {quickStart.map((s) => (
                  <div key={s.step} className="flex gap-4">
                    <span className="text-xs font-bold text-sky-600 font-mono w-8 shrink-0 mt-0.5">{s.step}</span>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1 text-sm">{s.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{s.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-sky-600 mb-3 block">Just Updated</span>
              <h2 className="font-display font-bold text-3xl text-gray-900 mb-8">Recent Articles</h2>
              <div className="space-y-3">
                {recentArticles.map((a, i) => (
                  <div key={i} className="group flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-sky-200 transition-all duration-200 cursor-pointer">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs px-2 py-0.5 rounded-full bg-sky-50 text-sky-700 font-medium">{a.product}</span>
                        <span className="text-xs text-gray-400">{a.updated}</span>
                      </div>
                      <h4 className="text-gray-700 text-sm group-hover:text-gray-900 transition-colors leading-snug">{a.title}</h4>
                    </div>
                    <div className="flex items-center gap-1 text-gray-400 text-xs ml-4 shrink-0">
                      <Clock size={11} />
                      <span>{a.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-white/40 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-white rounded-2xl border border-gray-100 text-center shadow-sm">
              <BookOpen size={28} className="text-sky-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">API Reference</h3>
              <p className="text-gray-500 text-sm mb-4">Full REST API documentation for developers building integrations.</p>
              <a href="/api-reference" className="text-sm text-sky-600 font-medium flex items-center justify-center gap-1 hover:gap-2 transition-all">
                Explore API <ArrowRight size={13} />
              </a>
            </div>
            <div className="p-6 bg-white rounded-2xl border border-gray-100 text-center shadow-sm">
              <Star size={28} className="text-sky-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Help Center</h3>
              <p className="text-gray-500 text-sm mb-4">FAQs, troubleshooting guides, and support for common issues.</p>
              <a href="/help" className="text-sm text-sky-600 font-medium flex items-center justify-center gap-1 hover:gap-2 transition-all">
                Get Help <ArrowRight size={13} />
              </a>
            </div>
            <div className="p-6 bg-white rounded-2xl border border-gray-100 text-center shadow-sm">
              <Search size={28} className="text-sky-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Community Forum</h3>
              <p className="text-gray-500 text-sm mb-4">Connect with other Flowza users, share tips, and get peer support.</p>
              <a href="#" className="text-sm text-sky-600 font-medium flex items-center justify-center gap-1 hover:gap-2 transition-all">
                Join Forum <ArrowRight size={13} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
