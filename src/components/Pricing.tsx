import { useState } from 'react';
import { Check, Sparkles, Crown, Play, ShoppingCart, Mail, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionHeading from '../site/SectionHeading';
import Reveal from '../site/Reveal';

interface PlanFeature {
  id: string;
  text: string;
}

interface PricingPlan {
  id: string;
  name: string;
  monthlyPrice: number;
  description: string;
  iconType: 'sparkle' | 'crown';
  isHighlighted: boolean;
  features: PlanFeature[];
  trialUrl: string;
  purchaseUrl: string;
}

const YEARLY_DISCOUNT_PERCENT = 25;

const plans: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    monthlyPrice: 15,
    description: 'For small businesses ready to streamline their finances',
    iconType: 'sparkle',
    isHighlighted: false,
    trialUrl: 'https://finance.flowza.ai/trial?plan=starter',
    purchaseUrl: 'https://finance.flowza.ai/checkout?plan=starter',
    features: [
      { id: '0', text: '1 company' },
      { id: '1', text: '2 team members' },
      { id: '2', text: '1,000 contacts' },
      { id: '3', text: '50 invoices/month' },
      { id: '4', text: '50 quotes/month' },
      { id: '5', text: '50 bills/month' },
      { id: '6', text: '1,000 catalog items' },
      { id: '7', text: 'Purchase management' },
      { id: '8', text: 'Banking & reconciliation' },
      { id: '9', text: 'Budget tracking' },
      { id: '10', text: 'Financial reports' },
      { id: '11', text: 'Multi-currency support' },
      { id: '12', text: 'Inventory tracking' },
      { id: '13', text: 'Recurring invoices' },
    ],
  },
  {
    id: 'professional',
    name: 'Professional',
    monthlyPrice: 40,
    description: 'For growing businesses that need the full toolkit',
    iconType: 'crown',
    isHighlighted: true,
    trialUrl: 'https://finance.flowza.ai/trial?plan=professional',
    purchaseUrl: 'https://finance.flowza.ai/checkout?plan=professional',
    features: [
      { id: '20', text: '3 companies' },
      { id: '14', text: '5 team members' },
      { id: '15', text: '3,000 contacts' },
      { id: '16', text: '125 invoices/month' },
      { id: '17', text: '125 quotes/month' },
      { id: '18', text: '125 bills/month' },
      { id: '19', text: '3,000 catalog items' },
      { id: '21', text: 'Purchase management' },
      { id: '22', text: 'Banking & reconciliation' },
      { id: '23', text: 'Budget tracking' },
      { id: '24', text: 'Financial reports' },
      { id: '25', text: 'Multi-currency support' },
      { id: '26', text: 'Inventory tracking' },
      { id: '27', text: 'Recurring invoices' },
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    monthlyPrice: 60,
    description: 'For established businesses with advanced requirements',
    iconType: 'crown',
    isHighlighted: false,
    trialUrl: 'https://finance.flowza.ai/trial?plan=enterprise',
    purchaseUrl: 'https://finance.flowza.ai/checkout?plan=enterprise',
    features: [
      { id: '34', text: '5 companies' },
      { id: '28', text: '10 team members' },
      { id: '29', text: '6,000 contacts' },
      { id: '30', text: '335 invoices/month' },
      { id: '31', text: '335 quotes/month' },
      { id: '32', text: '335 bills/month' },
      { id: '33', text: '6,000 catalog items' },
      { id: '35', text: 'Purchase management' },
      { id: '36', text: 'Banking & reconciliation' },
      { id: '37', text: 'Budget tracking' },
      { id: '38', text: 'Financial reports' },
      { id: '39', text: 'Multi-currency support' },
      { id: '40', text: 'Inventory tracking' },
      { id: '41', text: 'Recurring invoices' },
    ],
  },
];

function calculateYearlyPrice(monthlyPrice: number): number {
  const yearlyTotal = monthlyPrice * 12;
  const discount = yearlyTotal * (YEARLY_DISCOUNT_PERCENT / 100);
  return Math.round((yearlyTotal - discount) / 12);
}

function PlanIcon({ type, className }: { type: 'sparkle' | 'crown'; className?: string }) {
  if (type === 'sparkle') return <Sparkles className={className} />;
  return <Crown className={className} />;
}

export default function Pricing() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

  const getDisplayPrice = (monthlyPrice: number) =>
    billingPeriod === 'yearly' ? calculateYearlyPrice(monthlyPrice) : monthlyPrice;

  return (
    <section id="pricing" className="scroll-mt-28 py-20 sm:py-24 px-4 sm:px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          badge="Pricing"
          title="Simple, Transparent Pricing"
          subtitle="Start free, scale as you grow. Every plan includes purchase management, banking, reports and multi-currency support."
        />

        {/* Billing toggle */}
        <Reveal className="flex justify-center mb-12">
          <div className="inline-flex items-center p-1 bg-gray-100 rounded-full border border-gray-200">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-6 py-2.5 text-sm font-semibold rounded-full transition-all duration-200 ${
                billingPeriod === 'monthly' ? 'bg-white text-slate-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod('yearly')}
              className={`px-6 py-2.5 text-sm font-semibold rounded-full transition-all duration-200 flex items-center gap-2 ${
                billingPeriod === 'yearly' ? 'bg-white text-slate-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Yearly
              <span className="text-xs text-emerald-600 font-semibold">Save {YEARLY_DISCOUNT_PERCENT}%</span>
            </button>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          {plans.map((plan, i) => (
            <Reveal key={plan.id} delay={i * 90} className="relative h-full">
              {plan.isHighlighted && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
                  <span className="px-4 py-1.5 rounded-full text-xs font-bold text-white fx-gradient shadow-[0_4px_14px_rgba(37,99,235,0.4)]">
                    Most Popular
                  </span>
                </div>
              )}
              <div
                className={`relative h-full p-7 rounded-2xl border bg-white transition-all duration-300 ${
                  plan.isHighlighted
                    ? 'border-blue-200 shadow-[0_20px_50px_rgba(37,99,235,0.14)]'
                    : 'border-gray-200 shadow-sm hover:border-gray-300 hover:shadow-md'
                }`}
              >
                <div className="flex items-center gap-2 mb-4">
                  <span
                    className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                      plan.isHighlighted ? 'bg-blue-50 border border-blue-100' : 'bg-gray-50 border border-gray-100'
                    }`}
                  >
                    <PlanIcon type={plan.iconType} className="w-[18px] h-[18px] text-blue-600" />
                  </span>
                  <span className="text-lg font-bold text-slate-900">{plan.name}</span>
                </div>

                <div className="mb-3">
                  <span className="text-[42px] font-bold text-slate-900 tracking-tight">
                    ${getDisplayPrice(plan.monthlyPrice)}
                  </span>
                  <span className="text-gray-500 text-sm ml-1">/mo</span>
                  {billingPeriod === 'yearly' && (
                    <span className="ml-2 text-xs font-semibold text-emerald-600">billed yearly</span>
                  )}
                </div>

                <p className="text-sm text-gray-500 mb-6 leading-relaxed">{plan.description}</p>

                <div className="flex flex-col sm:flex-row gap-3 mb-7">
                  <a
                    href={plan.trialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 px-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 border border-gray-200 text-slate-700 hover:border-blue-300 hover:text-blue-700 transition-all"
                  >
                    <Play size={15} />
                    Start Trial
                  </a>
                  <a
                    href={plan.purchaseUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 text-white transition-all ${
                      plan.isHighlighted
                        ? 'fx-gradient shadow-[0_6px_18px_rgba(37,99,235,0.35)] hover:shadow-[0_8px_24px_rgba(37,99,235,0.45)]'
                        : 'bg-slate-900 hover:bg-slate-800'
                    }`}
                  >
                    <ShoppingCart size={15} />
                    Buy Now
                  </a>
                </div>

                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature.id} className="flex items-start gap-2.5">
                      <span className="w-[18px] h-[18px] rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0 mt-0.5">
                        <Check size={11} className="text-emerald-600" />
                      </span>
                      <span className="text-sm text-slate-700">{feature.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Enterprise Plus */}
        <Reveal className="mt-10">
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-center gap-4">
              <span className="w-12 h-12 rounded-xl bg-white border border-gray-200 flex items-center justify-center shadow-sm">
                <FileText className="w-5 h-5 text-blue-600" />
              </span>
              <span>
                <span className="block text-lg font-bold text-slate-900">Enterprise Plus</span>
                <span className="block text-sm text-gray-500">Tailored for your enterprise needs — custom pricing</span>
              </span>
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-slate-900 text-white text-sm font-semibold rounded-xl hover:bg-slate-800 transition-colors shrink-0"
            >
              <Mail size={15} />
              Contact Sales
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
