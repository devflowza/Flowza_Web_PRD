import { Code2, Key, Zap, Package, ChevronRight, Copy } from 'lucide-react';
import PageLayout from '../components/PageLayout';

const endpoints = [
  {
    product: 'Finance API',
    color: '#10b981',
    base: '/api/v1/finance',
    routes: [
      { method: 'GET', path: '/transactions', desc: 'List all transactions with filters' },
      { method: 'POST', path: '/transactions', desc: 'Create a new transaction record' },
      { method: 'GET', path: '/reports/vat', desc: 'Generate VAT summary report' },
      { method: 'POST', path: '/invoices', desc: 'Create and send an invoice' },
    ],
  },
  {
    product: 'Flowza Spa Master API',
    color: '#f43f5e',
    base: '/api/v1/spamaster',
    routes: [
      { method: 'GET', path: '/bookings', desc: 'Retrieve upcoming bookings' },
      { method: 'POST', path: '/bookings', desc: 'Create a new booking' },
      { method: 'GET', path: '/staff/availability', desc: 'Check staff availability slots' },
      { method: 'POST', path: '/loyalty/points', desc: 'Award loyalty points to a customer' },
    ],
  },
  {
    product: 'Flowza LogisPro API',
    color: '#38bdf8',
    base: '/api/v1/logispro',
    routes: [
      { method: 'GET', path: '/shipments/:id', desc: 'Get shipment by ID with full tracking' },
      { method: 'POST', path: '/routes/optimize', desc: 'Run AI route optimization' },
      { method: 'GET', path: '/warehouses', desc: 'List all warehouse locations and stock' },
      { method: 'POST', path: '/webhooks', desc: 'Register a delivery event webhook' },
    ],
  },
  {
    product: 'Flowza QRForge API',
    color: '#f59e0b',
    base: '/api/v1/qrforge',
    routes: [
      { method: 'POST', path: '/codes', desc: 'Generate a new dynamic QR code' },
      { method: 'PATCH', path: '/codes/:id', desc: 'Update destination URL for existing QR' },
      { method: 'GET', path: '/codes/:id/analytics', desc: 'Get scan analytics for a QR code' },
      { method: 'POST', path: '/campaigns', desc: 'Create a QR marketing campaign' },
    ],
  },
];

const rateLimits = [
  { plan: 'Starter', requests: '1,000 / hour', burst: '50 / second', concurrent: '5' },
  { plan: 'Professional', requests: '10,000 / hour', burst: '200 / second', concurrent: '25' },
  { plan: 'Enterprise', requests: 'Unlimited', burst: 'Custom', concurrent: 'Custom' },
];

const sdks = [
  { lang: 'JavaScript / TypeScript', pkg: 'npm install @flowza/sdk', color: '#f7df1e' },
  { lang: 'Python', pkg: 'pip install flowza-sdk', color: '#3572A5' },
  { lang: 'PHP', pkg: 'composer require flowza/sdk', color: '#4F5D95' },
  { lang: 'Go', pkg: 'go get github.com/flowza/sdk-go', color: '#00ADD8' },
];

const methodColors: Record<string, string> = {
  GET: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  POST: 'bg-blue-50 text-blue-700 border-blue-200',
  PATCH: 'bg-amber-50 text-amber-700 border-amber-200',
  DELETE: 'bg-red-50 text-red-700 border-red-200',
};

export default function ApiReference() {
  return (
    <PageLayout>
      <section className="relative pt-36 pb-24 px-6 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-sky-200 bg-sky-50 text-xs font-semibold uppercase tracking-widest text-sky-700 mb-6">
            Developer Docs
          </span>
          <h1 className="font-display font-bold text-5xl md:text-6xl text-gray-900 leading-[1.1] mb-6">
            API <span className="text-gradient-violet">Reference</span>
          </h1>
          <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
            RESTful APIs for every Flowza platform. Build integrations, automate workflows, and embed AI intelligence into your own applications.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <div className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-600 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              API v1.4 — Current
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-600 shadow-sm">
              Base URL: <code className="text-sky-600 ml-1">api.flowza.ai</code>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-white/40 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <Key size={24} className="text-sky-600 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Authentication</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">All API requests require a Bearer token passed in the Authorization header.</p>
              <div className="bg-gray-50 rounded-xl p-3 font-mono text-xs text-gray-600 overflow-x-auto">
                Authorization: Bearer {'<YOUR_API_KEY>'}
              </div>
            </div>
            <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <Zap size={24} className="text-sky-600 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Response Format</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">All responses return JSON with a consistent envelope structure including status and data fields.</p>
              <div className="bg-gray-50 rounded-xl p-3 font-mono text-xs text-gray-600 overflow-x-auto">
                {`{ "status": "ok", "data": {...} }`}
              </div>
            </div>
            <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <Code2 size={24} className="text-sky-600 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Error Handling</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">HTTP status codes follow REST conventions. Error bodies include a machine-readable code field.</p>
              <div className="bg-gray-50 rounded-xl p-3 font-mono text-xs text-gray-600 overflow-x-auto">
                {`{ "error": "not_found", "message": "..." }`}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs font-semibold uppercase tracking-widest text-sky-600 mb-3 block">Endpoints</span>
            <h2 className="font-display font-bold text-4xl text-gray-900">API Endpoints</h2>
          </div>
          <div className="space-y-8">
            {endpoints.map((api) => (
              <div key={api.product} className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100">
                  <div className="w-3 h-3 rounded-full" style={{ background: api.color }} />
                  <h3 className="font-display font-semibold text-gray-900">{api.product}</h3>
                  <code className="text-xs text-gray-400 font-mono ml-auto">{api.base}</code>
                </div>
                <div className="divide-y divide-gray-100">
                  {api.routes.map((r, i) => (
                    <div key={i} className="flex items-center gap-4 px-6 py-3.5 hover:bg-gray-50 transition-colors cursor-pointer group">
                      <span className={`text-xs font-bold px-2 py-1 rounded border font-mono w-14 text-center ${methodColors[r.method] || 'bg-gray-100 text-gray-600'}`}>
                        {r.method}
                      </span>
                      <code className="text-sm text-sky-600 font-mono flex-1">{api.base}{r.path}</code>
                      <span className="text-gray-500 text-sm hidden md:block">{r.desc}</span>
                      <ChevronRight size={14} className="text-gray-300 group-hover:text-sky-500 transition-colors shrink-0" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-white/40 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs font-semibold uppercase tracking-widest text-sky-600 mb-3 block">Limits</span>
            <h2 className="font-display font-bold text-3xl text-gray-900">Rate Limits by Plan</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Plan</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Requests / Hour</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Burst Rate</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Concurrent Connections</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {rateLimits.map((r) => (
                  <tr key={r.plan} className="hover:bg-sky-50/50 transition-colors">
                    <td className="py-4 px-4 font-semibold text-gray-900 text-sm">{r.plan}</td>
                    <td className="py-4 px-4 text-gray-600 text-sm font-mono">{r.requests}</td>
                    <td className="py-4 px-4 text-gray-600 text-sm font-mono">{r.burst}</td>
                    <td className="py-4 px-4 text-gray-600 text-sm font-mono">{r.concurrent}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-sky-600 mb-3 block">SDKs</span>
            <h2 className="font-display font-bold text-3xl text-gray-900">Official Libraries</h2>
            <p className="text-gray-600 mt-3">Integrate faster with our maintained SDKs for popular languages.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {sdks.map((sdk) => (
              <div key={sdk.lang} className="group flex items-center justify-between p-5 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md hover:border-sky-200 transition-all cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 rounded-full" style={{ background: sdk.color }} />
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{sdk.lang}</p>
                    <code className="text-xs text-gray-500 font-mono">{sdk.pkg}</code>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-700">
                    <Copy size={14} />
                  </button>
                  <Package size={16} className="text-gray-300 group-hover:text-sky-500 transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
