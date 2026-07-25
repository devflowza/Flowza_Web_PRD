import { Cookie, Mail, Settings, BarChart2, Megaphone, ShieldCheck } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import usePageMeta from '../lib/usePageMeta';

const cookieCategories = [
  {
    name: 'Essential',
    icon: ShieldCheck,
    required: true,
    color: 'emerald',
    description: 'Required for the platform to function. Cannot be disabled.',
    cookies: [
      { name: 'flowza_session', purpose: 'Maintains your authenticated session', duration: 'Session' },
      { name: 'flowza_csrf', purpose: 'Protects against cross-site request forgery', duration: 'Session' },
      { name: 'flowza_auth_token', purpose: 'Stores your authentication state', duration: '30 days' },
      { name: 'cookie_consent', purpose: 'Records your cookie preferences', duration: '1 year' },
    ],
  },
  {
    name: 'Analytics',
    icon: BarChart2,
    required: false,
    color: 'blue',
    description: 'Help us understand how visitors use our site. All data is anonymized.',
    cookies: [
      { name: '_ga', purpose: 'Website analytics (anonymized)', duration: '2 years' },
      { name: 'posthog_id', purpose: 'Product analytics and feature usage', duration: '1 year' },
    ],
  },
  {
    name: 'Functional',
    icon: Settings,
    required: false,
    color: 'amber',
    description: 'Enable personalization such as language preferences and UI state.',
    cookies: [
      { name: 'flowza_lang', purpose: 'Stores your preferred language', duration: '1 year' },
      { name: 'flowza_theme', purpose: 'Remembers your UI theme preference', duration: '1 year' },
      { name: 'flowza_sidebar', purpose: 'Saves your sidebar navigation state', duration: '30 days' },
    ],
  },
  {
    name: 'Marketing',
    icon: Megaphone,
    required: false,
    color: 'rose',
    description: 'Used to measure the effectiveness of our marketing campaigns.',
    cookies: [
      { name: '_fbp', purpose: 'Conversion tracking for paid campaigns', duration: '3 months' },
      { name: 'li_fat_id', purpose: 'LinkedIn conversion tracking', duration: '30 days' },
    ],
  },
];

const colorMap: Record<string, { bg: string; text: string; badge: string; badgeText: string; dot: string }> = {
  emerald: { bg: 'bg-emerald-50', text: 'text-emerald-600', badge: 'bg-emerald-100', badgeText: 'text-emerald-700', dot: 'bg-emerald-400' },
  blue:    { bg: 'bg-accent-wash', text: 'text-accent',      badge: 'bg-accent/10',   badgeText: 'text-accent',      dot: 'bg-accent' },
  amber:   { bg: 'bg-amber-50',   text: 'text-amber-600',   badge: 'bg-amber-100',   badgeText: 'text-amber-700',   dot: 'bg-amber-400' },
  rose:    { bg: 'bg-rose-50',    text: 'text-rose-600',    badge: 'bg-rose-100',    badgeText: 'text-rose-700',    dot: 'bg-rose-400' },
};

export default function CookiePolicy() {
  usePageMeta({
    title: 'Cookie policy — FlowZa AI',
    description: 'Which cookies FlowZa uses, why, and how to manage your preferences.',
  });

  return (
    <PageLayout>
      <div className="relative overflow-hidden wash-top pt-16 pb-20 px-6">
        <div className="relative max-w-4xl mx-auto">
          <span className="eyebrow mb-6">
            Legal
          </span>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-accent-wash flex items-center justify-center">
              <Cookie size={22} className="text-accent" />
            </div>
            <h1 className="display-hero text-4xl sm:text-5xl text-ink">Cookie Policy</h1>
          </div>
          <p className="text-ink-400 text-base mb-6">Last updated: <span className="text-ink font-medium">February 1, 2026</span></p>
          <p className="text-ink-500 text-sm leading-relaxed max-w-2xl">
            FlowZa AI uses cookies to keep you signed in, understand how our products are used, and personalize your experience. This page explains exactly what we set and why.
          </p>
        </div>
      </div>

      <div className="bg-white">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="bg-mist border border-ink/[0.08] rounded-2xl p-5 flex gap-4 items-start">
            <div className="w-8 h-8 rounded-lg bg-ink/[0.06] flex items-center justify-center shrink-0 mt-0.5">
              <Cookie size={14} className="text-ink-500" />
            </div>
            <p className="text-ink-500 text-sm leading-relaxed">
              <span className="font-semibold text-ink">What is a cookie?</span> A cookie is a small file stored on your device when you visit a website. It helps the site remember your preferences and session. Cookies do not store personal data unless you've provided it to the site.
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 pb-16">
          <div className="space-y-10">
            {cookieCategories.map((category) => {
              const Icon = category.icon;
              const c = colorMap[category.color];
              return (
                <div key={category.name}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-8 h-8 rounded-lg ${c.bg} flex items-center justify-center shrink-0`}>
                      <Icon size={15} className={c.text} />
                    </div>
                    <h2 className="font-display font-bold tracking-snug text-lg text-ink">{category.name} Cookies</h2>
                    <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${c.badge} ${c.badgeText}`}>
                      {category.required ? 'Always Active' : 'Optional'}
                    </span>
                  </div>
                  <p className="text-ink-400 text-sm mb-4">{category.description}</p>
                  <div className="border border-ink/[0.08] rounded-xl overflow-hidden">
                    <div className="grid grid-cols-3 gap-4 px-5 py-3 bg-mist border-b border-ink/[0.08]">
                      {['Cookie', 'Purpose', 'Duration'].map((h) => (
                        <span key={h} className="text-xs font-semibold uppercase tracking-wider text-ink-400">{h}</span>
                      ))}
                    </div>
                    <div className="divide-y divide-ink/[0.06]">
                      {category.cookies.map((cookie) => (
                        <div key={cookie.name} className="grid grid-cols-3 gap-4 px-5 py-3.5 hover:bg-mist transition-colors">
                          <code className={`text-xs font-mono ${c.text} break-all`}>{cookie.name}</code>
                          <span className="text-xs text-ink-500">{cookie.purpose}</span>
                          <span className="text-xs text-ink-400">{cookie.duration}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-12 pt-8 border-t border-ink/[0.08]">
            <h2 className="font-display font-bold tracking-snug text-lg text-ink mb-3">Managing Your Preferences</h2>
            <p className="text-ink-500 text-sm mb-6 leading-relaxed">
              You can disable optional cookies through your browser settings. Note that disabling cookies may affect how some features work. Essential cookies cannot be turned off — they are required for the platform to operate securely.
            </p>
            <div className="flex items-center gap-4 p-5 bg-mist rounded-2xl border border-ink/[0.08]">
              <div className="w-10 h-10 rounded-xl bg-ink/[0.06] flex items-center justify-center shrink-0">
                <Mail size={16} className="text-ink-500" />
              </div>
              <div>
                <p className="text-ink font-medium text-sm">Questions about cookies?</p>
                <p className="text-ink-500 text-sm">Contact our privacy team at <a href="mailto:privacy@flowza.ai" className="text-accent transition-colors font-medium hover:underline">privacy@flowza.ai</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
