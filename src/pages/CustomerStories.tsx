import { useState } from 'react';
import { Quote, Star, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const allStories = [
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
  {
    quote: "Root Projects went from spreadsheets to a fully automated project pipeline. Our delivery rate improved by 60% and we finally have real-time cost visibility across all sites.",
    name: 'Nasser Al-Balushi',
    role: 'Project Director',
    company: 'Root Projects',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&dpr=2',
    productColor: '#f59e0b',
    product: 'Flowza Finance',
    industry: 'Finance',
    stats: [
      { value: '60%', label: 'Faster Delivery' },
      { value: '100%', label: 'Cost Visibility' },
      { value: '3x', label: 'Team Efficiency' },
    ],
  },
  {
    quote: "Dhofartec integrated fleet tracking across our entire technical service division. Response times dropped by 35% and client satisfaction scores hit an all-time high.",
    name: 'Yousef Al-Kathiri',
    role: 'Operations Manager',
    company: 'Dhofartec',
    avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&dpr=2',
    productColor: '#0ea5e9',
    product: 'Flowza Fleetza',
    industry: 'Logistics',
    stats: [
      { value: '35%', label: 'Faster Response' },
      { value: '98%', label: 'Fleet Uptime' },
      { value: '4.8★', label: 'Client Score' },
    ],
  },
  {
    quote: "Defenders LLC manages security across 12 sites. With Flowza Fleetza we coordinate 80 patrol vehicles in real time. Incidents reduced by 40% in the first quarter alone.",
    name: 'Ibrahim Al-Maskari',
    role: 'Head of Operations',
    company: 'Defenders LLC',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&dpr=2',
    productColor: '#0ea5e9',
    product: 'Flowza Fleetza',
    industry: 'Logistics',
    stats: [
      { value: '40%', label: 'Fewer Incidents' },
      { value: '80', label: 'Patrol Vehicles' },
      { value: '12', label: 'Sites Covered' },
    ],
  },
  {
    quote: "Star Safe Solutions overhauled our field service scheduling with Flowza Spa Master's booking engine adapted for safety inspections. Our utilisation rate jumped from 58% to 91%.",
    name: 'Fatima Al-Rawahi',
    role: 'General Manager',
    company: 'Star Safe Solutions',
    avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&dpr=2',
    productColor: '#f43f5e',
    product: 'Flowza Spa Master',
    industry: 'Hospitality',
    stats: [
      { value: '91%', label: 'Utilisation Rate' },
      { value: '33%', label: 'Revenue Uplift' },
      { value: '2x', label: 'Team Output' },
    ],
  },
  {
    quote: "Future Space LLC launched three new co-working venues in six months. The finance automation handled everything from invoicing to reconciliation without adding a single headcount.",
    name: 'Ahmed Al-Siyabi',
    role: 'CEO',
    company: 'Future Space LLC',
    avatar: 'https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&dpr=2',
    productColor: '#10b981',
    product: 'Flowza Finance',
    industry: 'Finance',
    stats: [
      { value: '3', label: 'Venues Launched' },
      { value: '0', label: 'Extra Headcount' },
      { value: '78%', label: 'Admin Saved' },
    ],
  },
  {
    quote: "Suwaiq Modern runs one of the fastest-growing retail chains in the region. Flowza Finance gave us consolidated reporting across 18 branches with zero manual data entry.",
    name: 'Maryam Al-Habsi',
    role: 'Finance Controller',
    company: 'Suwaiq Modern',
    avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&dpr=2',
    productColor: '#10b981',
    product: 'Flowza Finance',
    industry: 'Finance',
    stats: [
      { value: '18', label: 'Branches Unified' },
      { value: '0', label: 'Manual Entry' },
      { value: '92%', label: 'Reporting Speed' },
    ],
  },
];

const filters = ['All', 'Finance', 'Hospitality', 'Logistics'];

export default function CustomerStories() {
  const [activeFilter, setActiveFilter] = useState('All');
  const navigate = useNavigate();

  const filtered = activeFilter === 'All'
    ? allStories
    : allStories.filter(s => s.industry === activeFilter);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors duration-150"
          >
            <ArrowLeft size={16} />
            Back to home
          </button>
          <span className="text-sm font-semibold text-gray-400 tracking-wide uppercase">Customer Stories</span>
          <div className="w-24" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 pt-16 pb-24">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gray-200 bg-white text-xs text-gray-500 uppercase tracking-widest mb-5 font-semibold shadow-sm">
            Customer Stories
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight mb-5">
            Real results from{' '}
            <span className="text-gradient-dark">real teams.</span>
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
            See how companies across logistics, finance, and hospitality use our products to save time, cut costs, and grow faster.
          </p>

          <div className="flex items-center justify-center gap-3 mt-7">
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

        <div className="flex items-center justify-center gap-2 mb-10">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className="px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200"
              style={
                activeFilter === f
                  ? { background: '#0284c7', color: '#fff', boxShadow: '0 2px 8px rgba(2,132,199,0.25)' }
                  : { background: '#fff', color: '#6b7280', border: '1px solid #e5e7eb' }
              }
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((story, i) => (
            <div
              key={`${story.name}-${i}`}
              className="relative rounded-2xl bg-white border border-gray-200 p-7 overflow-hidden group hover:-translate-y-1 transition-all duration-300"
              style={{ boxShadow: '0 1px 3px rgba(15,23,42,0.06), 0 10px 30px rgba(15,23,42,0.05)' }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl"
                style={{ background: `linear-gradient(90deg, ${story.productColor}, ${story.productColor}55)` }}
              />
              <div
                className="absolute -bottom-12 -right-12 w-36 h-36 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `${story.productColor}15` }}
              />

              <div className="relative">
                <div className="flex items-start gap-3 mb-6">
                  <Quote size={18} className="shrink-0 mt-0.5 opacity-25" style={{ color: story.productColor }} />
                  <p className="text-gray-700 text-sm leading-relaxed">{story.quote}</p>
                </div>

                <div className="flex items-end gap-5 mb-6 pb-6 border-b border-gray-100">
                  {story.stats.map(s => (
                    <div key={s.label} className="flex flex-col">
                      <span className="text-2xl font-extrabold tracking-tight leading-none" style={{ color: story.productColor }}>
                        {s.value}
                      </span>
                      <span className="text-[10px] text-gray-400 font-medium mt-0.5 uppercase tracking-wide">{s.label}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <img
                    src={story.avatar}
                    alt={story.name}
                    className="w-9 h-9 rounded-full object-cover border border-gray-200"
                    loading="lazy"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-900 text-sm font-semibold leading-tight">{story.name}</p>
                    <p className="text-gray-400 text-xs leading-tight mt-0.5">{story.role} · {story.company}</p>
                  </div>
                  <span
                    className="text-xs font-semibold px-2.5 py-1 rounded-full shrink-0"
                    style={{ background: `${story.productColor}14`, color: story.productColor, border: `1px solid ${story.productColor}30` }}
                  >
                    {story.product}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg font-medium">No stories found for this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
