import { MapPin, Clock, ChevronRight, Laptop, Globe, Heart, TrendingUp, Coffee, Zap } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import PageHero from '../components/PageHero';

const benefits = [
  { icon: Globe, title: 'Remote Friendly', description: 'Work from anywhere in the world. We\'re a distributed team with hubs in Dubai, Riyadh, and Cairo.' },
  { icon: TrendingUp, title: 'Equity for All', description: 'Every full-time employee receives meaningful equity. When Flowza wins, you win.' },
  { icon: Heart, title: 'Full Health Coverage', description: 'Premium health, dental, and vision insurance for you and your immediate family.' },
  { icon: Laptop, title: 'Top-Tier Equipment', description: '$3,000 equipment budget to get your ideal setup — MacBook Pro, monitors, keyboards, all of it.' },
  { icon: Coffee, title: 'Learning Budget', description: '$2,000 annually for courses, conferences, books, and certifications. Growth is a company priority.' },
  { icon: Zap, title: 'Async-First Culture', description: '30 days PTO, flexible hours, and no mandatory 9–5. Output matters more than presence.' },
];

const openRoles = [
  { id: 1, department: 'Engineering', title: 'Senior Backend Engineer (AI Infrastructure)', location: 'Remote · Dubai preferred', type: 'Full-time' },
  { id: 2, department: 'Engineering', title: 'Frontend Engineer (React / TypeScript)', location: 'Remote', type: 'Full-time' },
  { id: 3, department: 'Engineering', title: 'ML Engineer — NLP & Forecasting', location: 'Remote · Riyadh preferred', type: 'Full-time' },
  { id: 4, department: 'Product', title: 'Senior Product Manager — Flowza Finance', location: 'Dubai, UAE', type: 'Full-time' },
  { id: 5, department: 'Product', title: 'Product Designer (UX/UI)', location: 'Remote', type: 'Full-time' },
  { id: 6, department: 'Sales & Growth', title: 'Enterprise Account Executive — GCC', location: 'Riyadh or Dubai', type: 'Full-time' },
  { id: 7, department: 'Sales & Growth', title: 'Growth Marketing Manager', location: 'Remote', type: 'Full-time' },
  { id: 8, department: 'Customer Success', title: 'Customer Success Manager', location: 'Cairo, Egypt', type: 'Full-time' },
  { id: 9, department: 'Operations', title: 'Technical Support Engineer', location: 'Remote · MENA timezone', type: 'Full-time' },
];

const spotlights = [
  { name: 'Ahmad T.', role: 'Senior Engineer', quote: 'The problems we solve here are genuinely hard and genuinely important. I learn something new every single week.', image: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=200' },
  { name: 'Rania M.', role: 'Product Manager', quote: 'I\'ve never worked anywhere that ships this fast while actually caring about quality. The async culture is real — not just a marketing line.', image: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=200' },
  { name: 'James K.', role: 'Customer Success', quote: 'Coming from a traditional SaaS company, the autonomy here was shocking in the best way. You own your outcomes completely.', image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200' },
];

const departments = [...new Set(openRoles.map((r) => r.department))];

export default function Careers() {
  return (
    <PageLayout>
      <PageHero
        label="We're Hiring"
        title="Build the Future of"
        titleHighlight="AI-Powered Business"
        subtitle="Join a team of 50+ builders, thinkers, and problem-solvers who are redefining how businesses operate in the age of AI."
        imageUrl="https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=1400"
      />

      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[['50+', 'Team Members'], ['6', 'Cities Worldwide'], ['100%', 'Remote Eligible'], ['4.9/5', 'Glassdoor Rating']].map(([v, l]) => (
            <div key={l} className="p-5 rounded-2xl bg-white border border-gray-200">
              <p className="font-display font-bold text-3xl text-gray-900 mb-1">{v}</p>
              <p className="text-sm text-gray-500">{l}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs font-semibold uppercase tracking-widest text-sky-600 mb-3 block">Why Join Us</span>
            <h2 className="font-display font-bold text-4xl text-gray-900">What You'll Get</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {benefits.map(({ icon: Icon, title, description }) => (
              <div key={title} className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="w-11 h-11 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center mb-4">
                  <Icon size={20} className="text-sky-600" />
                </div>
                <h3 className="font-display font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs font-semibold uppercase tracking-widest text-sky-600 mb-3 block">Open Positions</span>
            <h2 className="font-display font-bold text-4xl text-gray-900">{openRoles.length} Roles Available</h2>
            <p className="text-gray-500 mt-3 text-lg">Find your place in the Flowza AI story.</p>
          </div>

          <div className="space-y-10">
            {departments.map((dept) => (
              <div key={dept}>
                <h3 className="font-display font-semibold text-gray-400 text-xs uppercase tracking-widest mb-4">{dept}</h3>
                <div className="space-y-3">
                  {openRoles.filter((r) => r.department === dept).map((role) => (
                    <div key={role.id} className="flex items-center justify-between p-5 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md hover:border-sky-200 transition-all duration-200 cursor-pointer group">
                      <div>
                        <h4 className="font-semibold text-gray-900 group-hover:text-sky-700 transition-colors mb-1">{role.title}</h4>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1.5"><MapPin size={13} /> {role.location}</span>
                          <span className="flex items-center gap-1.5"><Clock size={13} /> {role.type}</span>
                        </div>
                      </div>
                      <ChevronRight size={18} className="text-gray-300 group-hover:text-sky-500 group-hover:translate-x-1 transition-all duration-200 shrink-0" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs font-semibold uppercase tracking-widest text-sky-600 mb-3 block">Employee Spotlight</span>
            <h2 className="font-display font-bold text-4xl text-gray-900">Hear From the Team</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {spotlights.map((s) => (
              <div key={s.name} className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm">
                <p className="text-gray-600 text-sm leading-relaxed mb-6 italic">"{s.quote}"</p>
                <div className="flex items-center gap-3">
                  <img src={s.image} alt={s.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{s.name}</p>
                    <p className="text-sky-600 text-xs">{s.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto text-center bg-white border border-gray-200 rounded-3xl p-12 shadow-[0_1px_3px_rgba(15,23,42,0.06),0_10px_30px_rgba(15,23,42,0.05)]">
          <h2 className="font-display font-bold text-3xl text-gray-900 mb-3">Don't see your role?</h2>
          <p className="text-gray-600 mb-8">We're always looking for exceptional people. Send us your resume and tell us how you'd make Flowza better.</p>
          <a
            href="mailto:careers@flowza.ai"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold text-white bg-violet-gradient hover:shadow-[0_0_28px_rgba(14,165,233,0.55)] transition-all duration-300 hover:-translate-y-0.5"
          >
            Send Your Resume
          </a>
        </div>
      </section>
    </PageLayout>
  );
}
