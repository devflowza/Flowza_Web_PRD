import { useState } from 'react';
import { Check, Sparkles, Crown, Play, ShoppingCart, FileText, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

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
  buttonText: string;
  buttonStyle: 'outline' | 'disabled' | 'filled';
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
    buttonText: 'Downgrade',
    buttonStyle: 'outline',
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
    buttonText: 'Most Popular',
    buttonStyle: 'disabled',
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
    buttonText: 'Upgrade',
    buttonStyle: 'filled',
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
  if (type === 'sparkle') {
    return <Sparkles className={className} />;
  }
  return <Crown className={className} />;
}

function DualActionButtons({ plan }: { plan: PricingPlan }) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <button
        onClick={() => window.open(plan.trialUrl, '_blank')}
        className="flex-1 py-3 px-4 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-all duration-200 border border-gray-300 text-gray-700 hover:bg-gray-50"
      >
        <Play size={16} />
        Start Trial
      </button>
      <button
        onClick={() => window.open(plan.purchaseUrl, '_blank')}
        className="flex-1 py-3 px-4 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-all duration-200 bg-teal-600 text-white hover:bg-teal-700"
      >
        <ShoppingCart size={16} />
        Buy Now
      </button>
    </div>
  );
}

export default function Pricing() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

  const getDisplayPrice = (monthlyPrice: number) => {
    if (billingPeriod === 'yearly') {
      return calculateYearlyPrice(monthlyPrice);
    }
    return monthlyPrice;
  };

  return (
    <section id="pricing" className="py-24 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-center mb-12">
          <div className="inline-flex items-center p-1 bg-white rounded-full border border-gray-200 shadow-sm">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-6 py-2.5 text-sm font-medium rounded-full transition-all duration-200 ${
                billingPeriod === 'monthly'
                  ? 'bg-white text-gray-900 shadow-sm border border-gray-200'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod('yearly')}
              className={`px-6 py-2.5 text-sm font-medium rounded-full transition-all duration-200 flex items-center gap-2 ${
                billingPeriod === 'yearly'
                  ? 'bg-white text-gray-900 shadow-sm border border-gray-200'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Yearly
              <span className="text-xs text-teal-600 font-medium">Save {YEARLY_DISCOUNT_PERCENT}%</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          {plans.map((plan) => (
            <div key={plan.id} className="relative">
              {plan.isHighlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                  <span className="px-4 py-1.5 rounded-full text-xs font-medium text-white bg-teal-500 shadow-sm">
                    Most Popular
                  </span>
                </div>
              )}
              <div
                className={`relative p-6 rounded-2xl border bg-white transition-all duration-300 ${
                  plan.isHighlighted
                    ? 'border-teal-200 shadow-lg'
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                }`}
              >
                <div className="flex items-center gap-2 mb-4">
                  <PlanIcon
                    type={plan.iconType}
                    className="w-5 h-5 text-teal-600"
                  />
                  <span className="text-base font-semibold text-gray-900">{plan.name}</span>
                </div>

                <div className="mb-3">
                  <span className="text-4xl font-bold text-gray-900">
                    ${getDisplayPrice(plan.monthlyPrice)}
                  </span>
                  <span className="text-gray-500 text-sm ml-1">/mo</span>
                </div>

                <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                  {plan.description}
                </p>

                <div className="mb-6">
                  <DualActionButtons plan={plan} />
                </div>

                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature.id} className="flex items-start gap-2.5">
                      <Check size={16} className="text-teal-500 shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">{feature.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-white rounded-2xl border border-gray-200 p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
                <FileText className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Enterprise Plus</h3>
                <p className="text-sm text-gray-500">Tailored for your Enterprise Needs</p>
              </div>
            </div>
            <div className="flex-shrink-0">
              <div className="border border-gray-200 rounded-xl p-6 text-center bg-white">
                <p className="text-xs text-gray-500 mb-1">Custom Pricing</p>
                <p className="text-xl font-bold text-gray-900 mb-4">Let's Talk</p>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-slate-800 text-white text-sm font-medium rounded-lg hover:bg-slate-700 transition-colors"
                >
                  <Mail size={16} />
                  Contact Sales
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
