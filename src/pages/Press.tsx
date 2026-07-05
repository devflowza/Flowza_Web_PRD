import { Download, ExternalLink, Mail, Phone } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import PageHero from '../components/PageHero';

const coverage = [
  { outlet: 'TechCrunch', headline: 'Flowza AI raises $8M to bring enterprise AI to GCC\'s underserved SME market', date: 'March 2024', url: '#', logo: 'TC' },
  { outlet: 'Forbes Middle East', headline: 'The 10 AI Startups Redefining Business Software in the Arab World', date: 'January 2024', url: '#', logo: 'FM' },
  { outlet: 'Wamda', headline: 'How Flowza AI became the most-deployed AI platform for UAE hospitality businesses', date: 'November 2023', url: '#', logo: 'WA' },
  { outlet: 'Gulf Business', headline: 'Flowza\'s unified AI approach is disrupting traditional ERP in the Gulf', date: 'September 2023', url: '#', logo: 'GB' },
  { outlet: 'Sifted', headline: 'Meet the Dubai startup making AI affordable for every business', date: 'July 2023', url: '#', logo: 'SF' },
  { outlet: 'Arab Startup', headline: 'Flowza AI hits 100 enterprise clients, eyes Southeast Asia expansion', date: 'May 2023', url: '#', logo: 'AS' },
];

const releases = [
  {
    date: 'February 14, 2026',
    title: 'Flowza AI Launches Finance 3.0 with Real-Time AI Bookkeeping Engine',
    summary: 'New release brings automated VAT compliance, multi-currency AI categorization, and a natural language financial assistant to all Finance subscribers.',
  },
  {
    date: 'January 10, 2026',
    title: 'Flowza AI Introduces Unified AI Core Across All Six Product Lines',
    summary: 'The Flowza Unified AI Core enables shared intelligence, cross-platform data insights, and dramatically reduced onboarding time for multi-product customers.',
  },
  {
    date: 'October 22, 2025',
    title: 'Flowza AI Expands to Egypt and Qatar, Reaching 100+ Enterprise Clients',
    summary: 'The company opens regional offices in Cairo and Doha, supporting Arabic-language AI models and localized compliance requirements.',
  },
  {
    date: 'June 5, 2025',
    title: 'Flowza AI Raises $8M Series A Led by BECO Capital and Saudi Aramco Ventures',
    summary: 'Funding will accelerate product development across all six platforms and support regional hiring of 30+ engineers and product managers.',
  },
  {
    date: 'February 20, 2025',
    title: 'Flowza AI Launches Flowza Fleetza — AI-Powered Fleet Intelligence Platform',
    summary: 'Flowza Fleetza uses predictive maintenance AI and real-time routing optimization to reduce fleet operating costs by up to 23% on average.',
  },
];

const assets = [
  { name: 'Flowza AI Logo Pack (SVG, PNG)', size: '2.4 MB', type: 'Brand Assets' },
  { name: 'Product Screenshots Bundle', size: '18 MB', type: 'Product Images' },
  { name: 'Executive Headshots', size: '8.6 MB', type: 'Team Photos' },
  { name: 'Flowza AI Brand Guidelines', size: '4.1 MB', type: 'Brand Guide' },
  { name: 'Company Fact Sheet 2026', size: '512 KB', type: 'One-Pager' },
];

export default function Press() {
  return (
    <PageLayout>
      <PageHero
        label="Newsroom"
        title="Flowza AI in the"
        titleHighlight="News"
        subtitle="Press releases, media coverage, and brand resources for journalists and media professionals covering the future of AI-powered business software."
        imageUrl="https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1400"
      />

      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-sky-600 mb-3 block">Featured In</span>
            <h2 className="font-display font-bold text-3xl text-gray-900">Media Coverage</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {coverage.map((item) => (
              <a key={item.outlet} href={item.url} className="group block p-6 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md hover:border-sky-200 transition-all duration-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                    <span className="text-xs font-bold text-gray-500">{item.logo}</span>
                  </div>
                  <ExternalLink size={14} className="text-gray-300 group-hover:text-sky-500 transition-colors" />
                </div>
                <p className="text-xs font-semibold text-sky-600 mb-2">{item.outlet}</p>
                <h3 className="font-semibold text-gray-900 text-sm leading-snug mb-3 group-hover:text-sky-700 transition-colors line-clamp-3">{item.headline}</h3>
                <p className="text-xs text-gray-400">{item.date}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-sky-600 mb-3 block">Announcements</span>
            <h2 className="font-display font-bold text-3xl text-gray-900">Press Releases</h2>
          </div>
          <div className="space-y-4">
            {releases.map((r, i) => (
              <div key={i} className="group bg-white border border-gray-200 shadow-sm rounded-2xl p-6 hover:shadow-md transition-all duration-200 cursor-pointer">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <p className="text-xs text-sky-600 font-medium mb-2">{r.date}</p>
                    <h3 className="font-display font-semibold text-gray-900 mb-2 leading-snug group-hover:text-sky-700 transition-colors">{r.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{r.summary}</p>
                  </div>
                  <ExternalLink size={16} className="text-gray-300 group-hover:text-sky-500 transition-colors shrink-0 mt-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-sky-600 mb-3 block">Downloads</span>
              <h2 className="font-display font-bold text-3xl text-gray-900 mb-8">Press Kit & Brand Assets</h2>
              <div className="space-y-3">
                {assets.map((asset) => (
                  <div key={asset.name} className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200 hover:border-sky-200 transition-all duration-200 group cursor-pointer">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{asset.name}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{asset.type} · {asset.size}</p>
                    </div>
                    <Download size={16} className="text-gray-300 group-hover:text-sky-600 transition-colors" />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-sky-600 mb-3 block">Media Inquiries</span>
              <h2 className="font-display font-bold text-3xl text-gray-900 mb-6">Contact Press Team</h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-8">
                For interview requests, media briefings, product demonstrations, or fact-checking, please reach out to our communications team. We typically respond within one business day.
              </p>
              <div className="space-y-4">
                <a href="mailto:press@flowza.ai" className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-200 hover:border-sky-200 transition-all duration-200 group">
                  <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center">
                    <Mail size={18} className="text-sky-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Email</p>
                    <p className="text-sm text-sky-600">press@flowza.ai</p>
                  </div>
                </a>
                <a href="tel:+97142000000" className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-200 hover:border-sky-200 transition-all duration-200 group">
                  <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center">
                    <Phone size={18} className="text-sky-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Phone</p>
                    <p className="text-sm text-sky-600">+971 4 200 0000 (UAE)</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
