import { Link } from 'react-router-dom';
import { Zap, DollarSign, MessageCircle } from 'lucide-react';
import SectionHeading from '../SectionHeading';
import Reveal from '../Reveal';
import { WHATSAPP_URL } from '../data';

const actions = [
  {
    icon: Zap,
    title: 'Start Free Trial',
    description: 'Spin up your workspace and see your operation in flow — before you pay anything.',
    badge: 'No Card Required',
    gradient: 'from-blue-600 to-blue-700',
    href: '/get-started',
    external: false,
  },
  {
    icon: DollarSign,
    title: 'View Pricing',
    description: 'Transparent plans from $15/mo — save 25% when you pay yearly.',
    badge: 'No Hidden Fees',
    gradient: 'from-emerald-500 to-emerald-700',
    href: '/#pricing',
    external: false,
  },
  {
    icon: MessageCircle,
    title: 'Talk to Us',
    description: 'Chat directly with our team on WhatsApp for immediate assistance.',
    badge: 'Fastest Response',
    gradient: 'from-purple-500 to-purple-700',
    href: WHATSAPP_URL,
    external: true,
  },
];

/** Three gradient action cards — the reference's "How Would You Like to Proceed?" pattern. */
export default function ActionTrio() {
  return (
    <section className="py-20 sm:py-24 px-4 sm:px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          badge="Get Started Today"
          title="How Would You Like to Begin?"
          subtitle="Choose what works best for you — free trial, transparent pricing, or talk to us directly."
        />

        <div className="grid sm:grid-cols-3 gap-5">
          {actions.map((a, i) => {
            const Icon = a.icon;
            const inner = (
              <span
                className={`flex h-full flex-col items-center text-center rounded-2xl bg-gradient-to-b ${a.gradient} p-8 shadow-[0_14px_38px_rgba(15,23,42,0.18)] hover:shadow-[0_20px_50px_rgba(15,23,42,0.28)] hover:-translate-y-1 transition-all duration-300`}
              >
                <span className="w-14 h-14 rounded-xl bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white mb-5">
                  <Icon size={22} />
                </span>
                <span className="font-bold text-white text-xl mb-2.5">{a.title}</span>
                <span className="text-white/80 text-sm leading-relaxed flex-1">{a.description}</span>
                <span className="mt-6 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 px-4 py-1.5 text-xs font-semibold text-white">
                  {a.badge}
                </span>
              </span>
            );
            return (
              <Reveal key={a.title} delay={i * 100}>
                {a.external ? (
                  <a href={a.href} target="_blank" rel="noopener noreferrer" className="block h-full">
                    {inner}
                  </a>
                ) : (
                  <Link to={a.href} className="block h-full">
                    {inner}
                  </Link>
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
