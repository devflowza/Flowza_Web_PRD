import { Globe, Users, Zap, Target, Heart, TrendingUp, Shield } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import PageHero from '../components/PageHero';

const stats = [
  { value: '100+', label: 'Businesses Served' },
  { value: 'MEA', label: 'Region & India' },
  { value: '7', label: 'AI Platforms' },
  { value: '99.9%', label: 'Uptime SLA' },
];

const values = [
  { icon: Target, title: 'Purpose-Driven', description: 'Every product we build solves a real, tangible business problem. No fluff, no filler.' },
  { icon: Zap, title: 'Speed & Reliability', description: 'Enterprise-grade infrastructure that moves at startup speed — always on, always fast.' },
  { icon: Heart, title: 'Customer Obsession', description: 'We treat every client\'s success as our own. Their wins are our proudest moments.' },
  { icon: Shield, title: 'Trust & Transparency', description: 'We earn trust through honest communication, clear SLAs, and accountable execution.' },
  { icon: Globe, title: 'Global Thinking', description: 'Built for businesses in the Middle East and beyond, with local nuance in every feature.' },
  { icon: TrendingUp, title: 'Continuous Improvement', description: 'AI is never finished. We iterate every week based on real-world feedback and data.' },
];


export default function About() {
  return (
    <PageLayout>
      <PageHero
        label="Our Story"
        title="Built to Transform"
        titleHighlight="Every Business"
        subtitle="Flowza AI was founded on the belief that powerful AI tools shouldn't be reserved for enterprises with nine-figure budgets. We build for the rest."
        imageUrl="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1400"
      />

      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center p-6 rounded-2xl bg-white border border-gray-200 shadow-sm">
              <p className="font-display font-bold text-4xl text-gray-900 mb-1">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-sky-600 mb-3 block">Our Mission</span>
              <h2 className="font-display font-bold text-4xl text-gray-900 mb-6 leading-tight">
                AI that works the way your business does
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Most software is built for an imaginary average customer. We build for real people — the spa owner managing 12 staff, the logistics company tracking 400 vehicles, the restaurant running a distributed POS network.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                Seven purpose-built platforms. One unified vision. Flowza AI is the operating system for businesses that refuse to stay behind.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Flowza team"
                className="w-full h-80 object-cover rounded-2xl shadow-[0_1px_3px_rgba(15,23,42,0.06),0_10px_30px_rgba(15,23,42,0.12)]"
              />
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl p-4 shadow-[0_1px_3px_rgba(15,23,42,0.06),0_10px_30px_rgba(15,23,42,0.05)] border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center">
                    <Users size={18} className="text-sky-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Growing Fast</p>
                    <p className="text-xs text-gray-500">50+ team members across 6 cities</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs font-semibold uppercase tracking-widest text-sky-600 mb-3 block">What We Stand For</span>
            <h2 className="font-display font-bold text-4xl text-gray-900">Our Values</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {values.map(({ icon: Icon, title, description }) => (
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

      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display font-bold text-4xl text-gray-900 mb-4">Ready to transform your business?</h2>
          <p className="text-gray-600 text-lg mb-8">Join 100+ businesses already using Flowza AI to work smarter.</p>
          <a
            href="mailto:sales@flowza.ai"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold text-white bg-violet-gradient hover:shadow-[0_0_28px_rgba(14,165,233,0.55)] transition-all duration-300 hover:-translate-y-0.5"
          >
            Get in Touch
          </a>
        </div>
      </section>
    </PageLayout>
  );
}
