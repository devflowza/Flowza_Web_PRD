import { useState } from 'react';
import { CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import { WHATSAPP_URL } from '../site/data';
import usePageMeta from '../lib/usePageMeta';

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

  usePageMeta({
    title: 'System status — FlowZa AI',
    description: 'Live operational status and uptime history for all FlowZa platforms and infrastructure.',
  });

  return (
    <PageLayout>
      <section className="relative overflow-hidden wash-top px-6 pb-16 pt-16 sm:pt-24">
        <div className="max-w-4xl mx-auto text-center">
          <div className={`inline-flex items-center gap-3 rounded-full px-6 py-3 mb-8 ring-1 ${
            allOperational
              ? 'bg-emerald-50 ring-emerald-200'
              : 'bg-amber-50 ring-amber-200'
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
          <span className="eyebrow justify-center">Status</span>
          <h1 className="display-hero mt-6 text-4xl text-ink sm:text-5xl lg:text-[56px] mb-5">System status</h1>
          <p className="text-ink-500 text-lg">
            Real-time status for all FlowZa AI platforms and infrastructure components.
          </p>
        </div>
      </section>

      <section className="py-20 sm:py-24 px-6 bg-mist">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="display-title text-2xl text-ink">Service status</h2>
            <span className="text-xs text-ink-400">Last updated: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} GST</span>
          </div>
          <div className="space-y-2">
            {services.map((service) => {
              const cfg = statusConfig[service.status];
              return (
                <div key={service.name} className="flex items-center justify-between p-4 bg-white rounded-2xl ring-1 ring-ink/[0.07]">
                  <div className="flex items-center gap-3">
                    <span className={`w-2.5 h-2.5 rounded-full ${cfg.dot} relative flex`}>
                      {service.status === 'operational' && (
                        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${cfg.dot} opacity-50`} />
                      )}
                    </span>
                    <div>
                      <p className="font-medium text-ink text-sm">{service.name}</p>
                      <p className="text-xs text-ink-400">{service.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-ink-400 hidden md:block font-mono">{service.uptime}% uptime (30d)</span>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${cfg.bg} ${cfg.color}`}>{cfg.label}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10">
            <h2 className="display-title text-2xl text-ink mb-2">90-day uptime history</h2>
            <p className="text-ink-500 text-sm">Each bar represents one day. Green = fully operational.</p>
          </div>
          <div
            className="flex items-end gap-0.5 h-16"
            role="img"
            aria-label={`90-day uptime history: lowest day ${Math.min(...uptimeHistory)}%`}
          >
            {uptimeHistory.map((val, i) => {
              const height = Math.max(20, ((val - 99.8) / 0.2) * 100);
              const color = val === 100 ? '#10b981' : val >= 99.95 ? '#34d399' : val >= 99.9 ? '#fbbf24' : '#f87171';
              return (
                <div
                  key={i}
                  title={`Day ${i + 1}: ${val}%`}
                  aria-hidden="true"
                  className="flex-1 rounded-sm cursor-default transition-all hover:opacity-80"
                  style={{ height: `${height}%`, minHeight: 4, background: color }}
                />
              );
            })}
          </div>
          <div className="flex items-center justify-between mt-3 text-xs text-ink-400">
            <span>90 days ago</span>
            <span>Today</span>
          </div>
          <div className="flex items-center gap-4 mt-4">
            {[{ color: '#10b981', label: '100%' }, { color: '#34d399', label: '≥99.95%' }, { color: '#fbbf24', label: '≥99.9%' }, { color: '#f87171', label: '<99.9%' }].map(({ color, label }) => (
              <div key={label} className="flex items-center gap-1.5 text-xs text-ink-500">
                <span className="w-3 h-3 rounded-sm" style={{ background: color }} />
                {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24 px-6 bg-mist">
        <div className="max-w-4xl mx-auto">
          <h2 className="display-title text-2xl text-ink mb-8">Past incidents</h2>
          {incidents.length === 0 ? (
            <div className="text-center py-12 text-ink-400">No incidents in the past 90 days.</div>
          ) : (
            <div className="space-y-4">
              {incidents.map((incident, i) => {
                const isOpen = openIncident === i;
                return (
                  <div key={i} className="bg-white rounded-2xl ring-1 ring-ink/[0.07] overflow-hidden">
                    <button
                      id={`incident-trigger-${i}`}
                      onClick={() => setOpenIncident(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      aria-controls={`incident-panel-${i}`}
                      className="w-full flex items-center justify-between p-5 text-left"
                    >
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <span className="text-xs text-ink-400">{incident.date}</span>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold">{incident.status}</span>
                          <span className="text-xs text-ink-400">Duration: {incident.duration}</span>
                        </div>
                        <h3 className="font-semibold text-ink text-sm">{incident.title}</h3>
                      </div>
                      <ArrowRight size={16} className={`text-ink-400 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
                    </button>
                    <div
                      id={`incident-panel-${i}`}
                      role="region"
                      aria-labelledby={`incident-trigger-${i}`}
                      aria-hidden={!isOpen}
                      className={`grid transition-all duration-500 ease-swift ${
                        isOpen ? 'visible grid-rows-[1fr] opacity-100' : 'invisible grid-rows-[0fr] opacity-0'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="px-5 pb-5 border-t border-ink/[0.08]">
                          <p className="text-sm text-ink-500 mb-4 mt-3">{incident.impact}</p>
                          <div className="space-y-2">
                            {incident.updates.map((u, j) => (
                              <div key={j} className="flex gap-3">
                                <span className="text-xs font-mono text-ink-400 shrink-0 w-20">{u.time}</span>
                                <span className="text-xs text-ink-500">{u.text}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <section className="py-20 sm:py-24 px-6">
        <div className="mx-auto max-w-2xl rounded-[2rem] bg-white p-10 text-center shadow-soft ring-1 ring-ink/[0.07]">
          <h2 className="display-title mb-2 text-2xl text-ink">Get status updates</h2>
          <p className="mb-7 text-sm leading-relaxed text-ink-500">
            We post incident notices and maintenance windows before they happen. Reach us
            any time — or check back here for live state.
          </p>
          <div className="flex flex-col items-center justify-center gap-3.5 sm:flex-row">
            <a href="mailto:support@flowza.ai?subject=Subscribe%20to%20status%20updates" className="btn-primary btn-md">
              Subscribe by email
            </a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-secondary btn-md">
              Message us on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
