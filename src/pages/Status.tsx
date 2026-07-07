import { useState } from 'react';
import { CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';
import PageLayout from '../components/PageLayout';

type ServiceStatus = 'operational' | 'degraded' | 'outage';

const services: { name: string; status: ServiceStatus; uptime: number; description: string }[] = [
  { name: 'FlowZa Finance', status: 'operational', uptime: 99.98, description: 'Accounting, inventory, payroll & tax compliance engine' },
  { name: 'FlowZa Spa Master', status: 'operational', uptime: 99.95, description: 'Booking and wellness management platform' },
  { name: 'FlowZa LogisPro', status: 'operational', uptime: 99.91, description: 'Logistics and route optimization' },
  { name: 'FlowZa QRForge', status: 'operational', uptime: 100.00, description: 'Dynamic QR code generation and analytics' },
  { name: 'FlowZa POS', status: 'operational', uptime: 99.99, description: 'Point of sale and inventory management' },
  { name: 'FlowZa Fleetza', status: 'operational', uptime: 99.87, description: 'Fleet tracking and maintenance AI' },
  { name: 'Unified AI Core', status: 'operational', uptime: 99.97, description: 'Shared AI intelligence engine for all products' },
  { name: 'Authentication & API', status: 'operational', uptime: 99.99, description: 'OAuth, SSO, and API gateway' },
  { name: 'Data Storage', status: 'operational', uptime: 100.00, description: 'Primary database and backup systems' },
  { name: 'Email & Notifications', status: 'operational', uptime: 99.93, description: 'Transactional email, push, and SMS delivery' },
];

const incidents = [
  {
    date: 'Feb 8, 2026',
    title: 'Degraded performance on FlowZa LogisPro route optimization',
    status: 'Resolved',
    duration: '47 minutes',
    impact: 'Minor — route calculation times increased by ~3x. Live tracking unaffected.',
    updates: [
      { time: '14:23 GST', text: 'Investigating reports of slow route optimization responses.' },
      { time: '14:51 GST', text: 'Identified database query bottleneck under peak load. Fix deployed.' },
      { time: '15:10 GST', text: 'Performance fully restored. Post-mortem underway.' },
    ],
  },
  {
    date: 'Jan 15, 2026',
    title: 'Email notification delays for FlowZa Spa Master bookings',
    status: 'Resolved',
    duration: '1h 22min',
    impact: 'Moderate — booking confirmation emails delayed by 30–90 minutes. No data loss.',
    updates: [
      { time: '09:14 GST', text: 'Email queue backup detected. Third-party mail provider experiencing delays.' },
      { time: '10:06 GST', text: 'Switched to backup mail provider. Queue draining.' },
      { time: '10:36 GST', text: 'All delayed emails delivered. Primary provider restored.' },
    ],
  },
];

const uptimeHistory = [
  99.99, 100, 99.98, 100, 99.97, 99.99, 100, 99.95, 99.99, 100,
  99.98, 100, 100, 99.97, 99.99, 99.98, 100, 99.99, 100, 99.97,
  100, 99.99, 99.98, 100, 99.97, 99.99, 100, 99.91, 99.99, 100,
  100, 99.99, 99.98, 100, 99.97, 99.99, 100, 99.95, 99.99, 100,
  99.98, 100, 100, 99.97, 99.99, 99.98, 100, 99.99, 100, 99.97,
  100, 99.99, 99.98, 100, 99.97, 99.99, 100, 99.91, 99.99, 100,
  100, 99.99, 99.98, 100, 99.97, 99.99, 100, 99.95, 99.99, 100,
  99.98, 100, 100, 99.97, 99.99, 99.98, 100, 99.99, 100, 99.97,
  100, 99.99, 99.98, 100, 99.97, 99.99, 100, 99.91, 99.99, 100,
];

const statusConfig: Record<ServiceStatus, { label: string; color: string; bg: string; dot: string }> = {
  operational: { label: 'Operational', color: 'text-emerald-700', bg: 'bg-emerald-50', dot: 'bg-emerald-500' },
  degraded: { label: 'Degraded', color: 'text-amber-700', bg: 'bg-amber-50', dot: 'bg-amber-500' },
  outage: { label: 'Outage', color: 'text-red-700', bg: 'bg-red-50', dot: 'bg-red-500' },
};

const allOperational = services.every((s) => s.status === 'operational');

export default function Status() {
  const [openIncident, setOpenIncident] = useState<number | null>(null);
  const [email, setEmail] = useState('');

  return (
    <PageLayout>
      <section className="relative pt-20 pb-20 px-6 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center">
          <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-2xl mb-8 border ${
            allOperational
              ? 'bg-emerald-50 border-emerald-200'
              : 'bg-amber-50 border-amber-200'
          }`}>
            {allOperational ? (
              <>
                <CheckCircle size={20} className="text-emerald-600" />
                <span className="font-semibold text-emerald-700 text-lg">All Systems Operational</span>
              </>
            ) : (
              <>
                <AlertCircle size={20} className="text-amber-600" />
                <span className="font-semibold text-amber-700 text-lg">Some Systems Degraded</span>
              </>
            )}
          </div>
          <h1 className="font-display font-bold text-5xl text-gray-900 mb-4">System Status</h1>
          <p className="text-gray-600 text-lg">
            Real-time status for all FlowZa AI platforms and infrastructure components.
          </p>
        </div>
      </section>

      <section className="py-16 px-6 bg-white/40 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display font-bold text-2xl text-gray-900">Service Status</h2>
            <span className="text-xs text-gray-400">Last updated: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} GST</span>
          </div>
          <div className="space-y-2">
            {services.map((service) => {
              const cfg = statusConfig[service.status];
              return (
                <div key={service.name} className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100">
                  <div className="flex items-center gap-3">
                    <span className={`w-2.5 h-2.5 rounded-full ${cfg.dot} relative flex`}>
                      {service.status === 'operational' && (
                        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${cfg.dot} opacity-50`} />
                      )}
                    </span>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{service.name}</p>
                      <p className="text-xs text-gray-400">{service.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-gray-400 hidden md:block font-mono">{service.uptime}% uptime (30d)</span>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${cfg.bg} ${cfg.color}`}>{cfg.label}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10">
            <h2 className="font-display font-bold text-2xl text-gray-900 mb-2">90-Day Uptime History</h2>
            <p className="text-gray-500 text-sm">Each bar represents one day. Green = fully operational.</p>
          </div>
          <div className="flex items-end gap-0.5 h-16">
            {uptimeHistory.map((val, i) => {
              const height = Math.max(20, ((val - 99.8) / 0.2) * 100);
              const color = val === 100 ? '#10b981' : val >= 99.95 ? '#34d399' : val >= 99.9 ? '#fbbf24' : '#f87171';
              return (
                <div
                  key={i}
                  title={`Day ${i + 1}: ${val}%`}
                  className="flex-1 rounded-sm cursor-default transition-all hover:opacity-80"
                  style={{ height: `${height}%`, minHeight: 4, background: color }}
                />
              );
            })}
          </div>
          <div className="flex items-center justify-between mt-3 text-xs text-gray-400">
            <span>90 days ago</span>
            <span>Today</span>
          </div>
          <div className="flex items-center gap-4 mt-4">
            {[{ color: '#10b981', label: '100%' }, { color: '#34d399', label: '≥99.95%' }, { color: '#fbbf24', label: '≥99.9%' }, { color: '#f87171', label: '<99.9%' }].map(({ color, label }) => (
              <div key={label} className="flex items-center gap-1.5 text-xs text-gray-500">
                <span className="w-3 h-3 rounded-sm" style={{ background: color }} />
                {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-white/40 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display font-bold text-2xl text-gray-900 mb-8">Past Incidents</h2>
          {incidents.length === 0 ? (
            <div className="text-center py-12 text-gray-400">No incidents in the past 90 days.</div>
          ) : (
            <div className="space-y-4">
              {incidents.map((incident, i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                  <button
                    onClick={() => setOpenIncident(openIncident === i ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left"
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-xs text-gray-400">{incident.date}</span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold">{incident.status}</span>
                        <span className="text-xs text-gray-400">Duration: {incident.duration}</span>
                      </div>
                      <h3 className="font-semibold text-gray-900 text-sm">{incident.title}</h3>
                    </div>
                    <ArrowRight size={16} className={`text-gray-400 transition-transform ${openIncident === i ? 'rotate-90' : ''}`} />
                  </button>
                  {openIncident === i && (
                    <div className="px-5 pb-5 border-t border-gray-100">
                      <p className="text-sm text-gray-600 mb-4 mt-3">{incident.impact}</p>
                      <div className="space-y-2">
                        {incident.updates.map((u, j) => (
                          <div key={j} className="flex gap-3">
                            <span className="text-xs font-mono text-sky-600 shrink-0 w-20">{u.time}</span>
                            <span className="text-xs text-gray-600">{u.text}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-2xl mx-auto text-center bg-white border border-gray-200 rounded-3xl p-10 shadow-sm">
          <h2 className="font-display font-bold text-2xl text-gray-900 mb-2">Subscribe to Status Updates</h2>
          <p className="text-gray-600 text-sm mb-6">Get notified instantly when any FlowZa service is impacted.</p>
          <div className="flex gap-3 max-w-sm mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className="flex-1 px-4 py-3 rounded-full bg-white border border-gray-200 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition-colors"
            />
            <button className="px-5 py-3 rounded-full bg-violet-gradient text-white text-sm font-semibold hover:shadow-[0_0_20px_rgba(14,165,233,0.4)] transition-all duration-200">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
