import { useState } from 'react';
import { Check, ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionHeading from '../site/SectionHeading';
import Reveal from '../site/Reveal';

interface PricingPlan {
  id: string;
  name: string;
  monthlyPrice: number;
  description: string;
  isHighlighted: boolean;
  limits: { value: string; label: string }[];
  trialUrl: string;
  purchaseUrl: string;
}

const YEARLY_DISCOUNT_PERCENT = 25;

const plans: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    monthlyPrice: 15,
    description: 'For small businesses ready to streamline their finances.',
    isHighlighted: false,
    trialUrl: 'https://finance.flowza.ai/trial?plan=starter',
    purchaseUrl: 'https://finance.flowza.ai/checkout?plan=starter',
    limits: [
      { value: '1', label: 'company' },
      { value: '2', label: 'team members' },
      { value: '1,000', label: 'contacts' },
      { value: '50', label: 'invoices / month' },
      { value: '50', label: 'quotes & bills / month' },
      { value: '1,000', label: 'catalog items' },
    ],
  },
  {
    id: 'professional',
    name: 'Professional',
    monthlyPrice: 40,
    description: 'For growing businesses that need the full toolkit.',
    isHighlighted: true,
    trialUrl: 'https://finance.flowza.ai/trial?plan=professional',
    purchaseUrl: 'https://finance.flowza.ai/checkout?plan=professional',
    limits: [
      { value: '3', label: 'companies' },
      { value: '5', label: 'team members' },
      { value: '3,000', label: 'contacts' },
      { value: '125', label: 'invoices / month' },
      { value: '125', label: 'quotes & bills / month' },
      { value: '3,000', label: 'catalog items' },
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    monthlyPrice: 60,
    description: 'For established businesses with advanced requirements.',
    isHighlighted: false,
    trialUrl: 'https://finance.flowza.ai/trial?plan=enterprise',
    purchaseUrl: 'https://finance.flowza.ai/checkout?plan=enterprise',
    limits: [
      { value: '5', label: 'companies' },
      { value: '10', label: 'team members' },
      { value: '6,000', label: 'contacts' },
      { value: '335', label: 'invoices / month' },
      { value: '335', label: 'quotes & bills / month' },
      { value: '6,000', label: 'catalog items' },
    ],
  },
];

const sharedFeatures = [
  'Purchase management',
  'Banking & reconciliation',
  'Budget tracking',
  'Financial reports',
  'Multi-currency support',
  'Inventory tracking',
  'Recurring invoices',
];

function calculateYearlyPrice(monthlyPrice: number): number {
  const yearlyTotal = monthlyPrice * 12;
  const discount = yearlyTotal * (YEARLY_DISCOUNT_PERCENT / 100);
  return Math.round((yearlyTotal - discount) / 12);
}

export default function Pricing() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

  const getDisplayPrice = (monthlyPrice: number) =>
    billingPeriod === 'yearly' ? calculateYearlyPrice(monthlyPrice) : monthlyPrice;

  return (
    <section id="pricing" className="scroll-mt-24 bg-white px-4 py-24 sm:px-6 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          badge="Pricing"
          title="Simple, transparent pricing."
          subtitle="Start free, scale as you grow. Plans differ only in capacity — every feature ships with every plan."
        />

        {/* Billing toggle */}
        <Reveal className="mb-14 flex justify-center">
          <div className="relative inline-flex items-center rounded-full bg-mist p-1 ring-1 ring-ink/[0.07]" role="group" aria-label="Billing period">
            <span
              aria-hidden="true"
              className={`absolute bottom-1 top-1 w-[calc(50%-4px)] rounded-full bg-ink shadow-pill transition-transform duration-500 ease-swift ${
                billingPeriod === 'yearly' ? 'translate-x-[calc(100%+0px)]' : 'translate-x-0'
              }`}
              style={{ left: '4px' }}
            />
            <button
              onClick={() => setBillingPeriod('monthly')}
              aria-pressed={billingPeriod === 'monthly'}
              className={`relative z-10 w-32 rounded-full py-2.5 text-sm font-semibold transition-colors duration-300 ${
                billingPeriod === 'monthly' ? 'text-white' : 'text-ink-500 hover:text-ink'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod('yearly')}
              aria-pressed={billingPeriod === 'yearly'}
              className={`relative z-10 w-32 rounded-full py-2.5 text-sm font-semibold transition-colors duration-300 ${
                billingPeriod === 'yearly' ? 'text-white' : 'text-ink-500 hover:text-ink'
              }`}
            >
              Yearly
              <span className={`ml-1.5 text-xs font-bold ${billingPeriod === 'yearly' ? 'text-emerald-300' : 'text-emerald-600'}`}>
                −25%
              </span>
            </button>
          </div>
        </Reveal>

        {/* Plan cards */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {plans.map((plan, i) => (
            <Reveal key={plan.id} delay={i * 90} className="h-full">
              <article
                className={`relative flex h-full flex-col rounded-[1.75rem] p-8 transition-all duration-500 ease-swift ${
                  plan.isHighlighted
                    ? 'bg-ink text-white shadow-frame grain overflow-hidden'
                    : 'bg-white ring-1 ring-ink/[0.08] hover:ring-ink/20 hover:shadow-soft'
                }`}
              >
                {plan.isHighlighted && (
                  <div className="pointer-events-none absolute inset-0 wash-ink" aria-hidden="true" />
                )}

                <div className="relative">
                  <div className="flex items-center justify-between">
                    <h3 className={`font-display text-xl font-bold tracking-snug ${plan.isHighlighted ? 'text-white' : 'text-ink'}`}>
                      {plan.name}
                    </h3>
                    {plan.isHighlighted && (
                      <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-white ring-1 ring-white/20">
                        Most popular
                      </span>
                    )}
                  </div>

                  <p className={`mt-2 text-sm leading-relaxed ${plan.isHighlighted ? 'text-white/60' : 'text-ink-400'}`}>
                    {plan.description}
                  </p>

                  <div className="mt-7 flex items-baseline gap-1.5">
                    <span className={`tabular font-display text-[3.25rem] font-extrabold leading-none tracking-tightest ${plan.isHighlighted ? 'text-white' : 'text-ink'}`}>
                      ${getDisplayPrice(plan.monthlyPrice)}
                    </span>
                    <span className={`text-sm font-medium ${plan.isHighlighted ? 'text-white/50' : 'text-ink-400'}`}>
                      /month
                    </span>
                  </div>
                  <p className={`mt-1.5 h-4 text-xs font-medium ${plan.isHighlighted ? 'text-emerald-300' : 'text-emerald-600'}`}>
                    {billingPeriod === 'yearly' ? `billed yearly — saving ${YEARLY_DISCOUNT_PERCENT}%` : ''}
                  </p>

                  <a
                    href={plan.trialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${plan.isHighlighted ? 'btn-inverse' : 'btn-primary'} btn-md group mt-6 w-full`}
                  >
                    Start free trial
                    <span className={`btn-orb ${plan.isHighlighted ? 'bg-ink/[0.07]' : 'bg-white/15'} group-hover:translate-x-0.5`}>
                      <ArrowRight size={13} />
                    </span>
                  </a>
                  <a
                    href={plan.purchaseUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group mt-3.5 inline-flex w-full items-center justify-center gap-1.5 text-sm font-semibold transition-colors ${
                      plan.isHighlighted ? 'text-white/70 hover:text-white' : 'text-ink-500 hover:text-ink'
                    }`}
                  >
                    or buy now
                    <ArrowUpRight size={13} className="transition-transform duration-300 ease-swift group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>

                  <ul className={`mt-7 border-t pt-6 ${plan.isHighlighted ? 'border-white/15' : 'border-ink/[0.07]'}`}>
                    {plan.limits.map((limit) => (
                      <li
                        key={limit.label}
                        className={`flex items-baseline justify-between py-1.5 text-sm ${
                          plan.isHighlighted ? 'text-white/60' : 'text-ink-500'
                        }`}
                      >
                        <span>{limit.label}</span>
                        <span className={`tabular font-semibold ${plan.isHighlighted ? 'text-white' : 'text-ink'}`}>
                          {limit.value}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Shared feature strip */}
        <Reveal delay={120} className="mt-5">
          <div className="rounded-[1.5rem] bg-mist px-7 py-7 ring-1 ring-ink/[0.06] sm:px-9">
            <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-ink-400">Every plan includes</p>
            <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-2.5">
              {sharedFeatures.map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-sm font-medium text-ink-600">
                  <Check size={14} className="text-emerald-600" strokeWidth={2.5} />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* Enterprise Plus */}
        <Reveal delay={160} className="mt-5">
          <div className="flex flex-col items-start justify-between gap-6 rounded-[1.5rem] px-7 py-7 ring-1 ring-ink/[0.08] sm:px-9 md:flex-row md:items-center">
            <div>
              <h3 className="font-display text-lg font-bold tracking-snug text-ink">Enterprise Plus</h3>
              <p className="mt-1 text-sm text-ink-400">
                Custom capacity, dedicated infrastructure and white-glove onboarding — priced for your scale.
              </p>
            </div>
            <Link to="/contact" className="btn-secondary btn-md group shrink-0">
              Contact sales
              <ArrowRight size={14} className="transition-transform duration-300 ease-swift group-hover:translate-x-0.5" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
