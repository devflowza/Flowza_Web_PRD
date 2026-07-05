import { useRef, useEffect, useState } from 'react';
import { Quote, ArrowRight, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const clients = [
  { name: 'Gulf Drive', initials: 'GD', color: '#0ea5e9' },
  { name: 'NileDrive', initials: 'ND', color: '#10b981' },
  { name: 'AlNoor Retail', initials: 'AN', color: '#f59e0b' },
  { name: 'Swift Logistics', initials: 'SL', color: '#0ea5e9' },
  { name: 'TechStart Solutions', initials: 'TS', color: '#ef4444' },
  { name: 'Serenity Day Spa', initials: 'SS', color: '#f43f5e' },
  { name: 'EuroDrive', initials: 'ED', color: '#3b82f6' },
  { name: 'Pinnacle Finance', initials: 'PF', color: '#10b981' },
  { name: 'Root Projects', initials: 'RP', color: '#f59e0b' },
  { name: 'Dhofartec', initials: 'DH', color: '#14b8a6' },
  { name: 'Defenders LLC', initials: 'DL', color: '#14b8a6' },
  { name: 'Star Safe Solutions', initials: 'SS', color: '#ef4444' },
  { name: 'Future Space LLC', initials: 'FS', color: '#3b82f6' },
  { name: 'Suwaiq Modern', initials: 'SM', color: '#10b981' },
];

const tickerClients = [...clients, ...clients];

const testimonials = [
  {
    quote: "Flowza Finance cut our month-end close from 5 days to just 6 hours. The AI catches errors we used to miss entirely. It's not just software — it's a financial partner.",
    name: 'Khalid Al-Rashid',
    role: 'CFO',
    company: 'AlNoor Retail Group',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&dpr=2',
    productColor: '#10b981',
    product: 'Flowza Finance',
    industry: 'Finance',
    stats: [
      { value: '85%', label: 'Time Saved' },
      { value: '40%', label: 'Fewer Errors' },
      { value: '6hr', label: 'Monthly Close' },
    ],
  },
  {
    quote: "Flowza Spa Master transformed how we run our five locations. Online bookings went up 230% in the first month. Staff actually enjoy using it — that alone is priceless.",
    name: 'Lena Voss',
    role: 'Operations Director',
    company: 'Serenity Wellness',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&dpr=2',
    productColor: '#f43f5e',
    product: 'Flowza Spa Master',
    industry: 'Hospitality',
    stats: [
      { value: '230%', label: 'More Bookings' },
      { value: '5', label: 'Locations Unified' },
      { value: '4.9★', label: 'Customer NPS' },
    ],
  },
  {
    quote: "Flowza Fleetza gave us visibility we didn't know we were missing. Fuel costs dropped 22% within 90 days just from the route and behavior insights. The ROI was immediate.",
    name: 'Omar Hassan',
    role: 'Fleet Manager',
    company: 'Swift Logistics MENA',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&dpr=2',
    productColor: '#0ea5e9',
    product: 'Flowza Fleetza',
    industry: 'Logistics',
    stats: [
      { value: '22%', label: 'Fuel Reduction' },
      { value: '180', label: 'Vehicles Tracked' },
      { value: '99%', label: 'Uptime' },
    ],
  },
];

const filters = ['All', 'Finance', 'Hospitality', 'Logistics'];

export default function Testimonials() {
  const [visible, setVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const sectionRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const filtered = activeFilter === 'All'
    ? testimonials
    : testimonials.filter(t => t.industry === activeFilter);

  const hero = filtered[0];
  const supporting = filtered.slice(1);

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="py-28 px-6 border-t border-gray-200 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #f6f9ff 0%, #ffffff 60%)' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(2, 132, 199, 0.05) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="max-w-6xl mx-auto relative">

        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gray-200 bg-white text-xs text-gray-500 uppercase tracking-widest mb-5 font-semibold shadow-sm">
            Customer Stories
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight mb-4">
            Trusted by Leaders.{' '}
            <span className="text-gradient-dark">Loved by Teams.</span>
          </h2>

          <div className="flex items-center justify-center gap-3 mt-5">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-sm font-semibold text-gray-800">4.9 / 5</span>
            <span className="text-gray-300">·</span>
            <span className="text-sm text-gray-500">300+ reviews on</span>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-gray-700 bg-gray-100 px-2 py-0.5 rounded">G2</span>
              <span className="text-xs font-bold text-gray-700 bg-gray-100 px-2 py-0.5 rounded">Capterra</span>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden mb-12 py-3">
          <div
            className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to right, #f6f9ff, transparent)' }}
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to left, #f6f9ff, transparent)' }}
          />
          <div
            className="flex gap-4 whitespace-nowrap"
            style={{ animation: 'ticker 32s linear infinite', width: 'max-content' }}
          >
            {tickerClients.map((client, i) => (
              <div
                key={`${client.name}-${i}`}
                className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl border border-gray-200 bg-white shadow-sm text-sm text-gray-600 font-medium"
              >
                <div
                  className="w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold text-white shrink-0"
                  style={{ background: client.color }}
                >
                  {client.initials}
                </div>
                {client.name}
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 mb-10">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className="px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200"
              style={
                activeFilter === f
                  ? { background: '#0f172a', color: '#fff', boxShadow: '0 2px 8px rgba(15,23,42,0.18)' }
                  : { background: '#fff', color: '#6b7280', border: '1px solid #e5e7eb' }
              }
            >
              {f}
            </button>
          ))}
        </div>

        {hero && (
          <div
            className="relative rounded-2xl bg-white border border-gray-200 overflow-hidden mb-5 group"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.6s ease, transform 0.6s ease',
              boxShadow: '0 4px 24px rgba(15,23,42,0.08)',
            }}
          >
            <div
              className="absolute top-0 left-0 right-0 h-1"
              style={{ background: `linear-gradient(90deg, ${hero.productColor}, ${hero.productColor}88)` }}
            />
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ background: `radial-gradient(ellipse at 80% 50%, ${hero.productColor}08 0%, transparent 70%)` }}
            />

            <div className="relative p-8 md:p-10">
                <div className="flex items-start gap-4 mb-7">
                  <Quote size={28} className="shrink-0 mt-1 opacity-30" style={{ color: hero.productColor }} />
                  <p className="text-gray-800 text-xl md:text-2xl font-medium leading-relaxed tracking-tight">
                    {hero.quote}
                  </p>
                </div>

                <div className="flex items-center gap-6 mb-7 flex-wrap">
                  {hero.stats.map(s => (
                    <div key={s.label} className="flex flex-col">
                      <span className="text-3xl font-extrabold tracking-tight leading-none" style={{ color: hero.productColor }}>
                        {s.value}
                      </span>
                      <span className="text-xs text-gray-400 font-medium mt-1 uppercase tracking-wide">{s.label}</span>
                    </div>
                  ))}
                  <div className="h-10 w-px bg-gray-100 mx-2 hidden md:block" />
                </div>

                <div className="flex items-center gap-4 pt-5 border-t border-gray-100">
                  <img
                    src={hero.avatar}
                    alt={hero.name}
                    className="w-11 h-11 rounded-full object-cover border-2 border-gray-200"
                    loading="lazy"
                  />
                  <div className="flex-1">
                    <p className="text-gray-900 font-semibold text-sm">{hero.name}</p>
                    <p className="text-gray-400 text-xs mt-0.5">{hero.role} · {hero.company}</p>
                  </div>
                  <span
                    className="text-xs font-semibold px-3 py-1 rounded-full"
                    style={{ background: `${hero.productColor}14`, color: hero.productColor, border: `1px solid ${hero.productColor}30` }}
                  >
                    {hero.product}
                  </span>
                </div>
            </div>
          </div>
        )}

        {supporting.length > 0 && (
          <div className={`grid grid-cols-1 gap-4 ${supporting.length === 1 ? 'md:grid-cols-1 max-w-lg mx-auto' : 'md:grid-cols-2'}`}>
            {supporting.map((t, i) => (
              <div
                key={t.name}
                className="relative rounded-2xl bg-white border border-gray-200 p-7 overflow-hidden group hover:-translate-y-1 transition-all duration-300"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(24px)',
                  transition: `opacity 0.6s ease ${(i + 1) * 0.12}s, transform 0.6s ease ${(i + 1) * 0.12}s`,
                  boxShadow: '0 1px 6px rgba(15,23,42,0.06)',
                }}
              >
                <div
                  className="absolute top-0 left-0 bottom-0 w-0.5 rounded-full"
                  style={{ background: t.productColor }}
                />
                <div
                  className="absolute -bottom-12 -right-12 w-36 h-36 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `${t.productColor}18` }}
                />

                <div className="relative pl-3">
                  <div className="flex items-start gap-3 mb-5">
                    <Quote size={18} className="shrink-0 mt-0.5 opacity-30" style={{ color: t.productColor }} />
                    <p className="text-gray-700 text-sm leading-relaxed">{t.quote}</p>
                  </div>

                  <div className="flex items-end gap-5 mb-5 pb-5 border-b border-gray-100">
                    {t.stats.map(s => (
                      <div key={s.label} className="flex flex-col">
                        <span className="text-2xl font-extrabold tracking-tight leading-none" style={{ color: t.productColor }}>
                          {s.value}
                        </span>
                        <span className="text-[10px] text-gray-400 font-medium mt-0.5 uppercase tracking-wide">{s.label}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-3">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-9 h-9 rounded-full object-cover border border-gray-200"
                      loading="lazy"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-900 text-sm font-semibold leading-tight">{t.name}</p>
                      <p className="text-gray-400 text-xs leading-tight mt-0.5">{t.role} · {t.company}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <button
            onClick={() => navigate('/customer-stories')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-700 hover:border-gray-300 hover:shadow-md transition-all duration-200"
          >
            Explore all customer stories
            <ArrowRight size={15} />
          </button>
        </div>

      </div>
    </section>
  );
}
