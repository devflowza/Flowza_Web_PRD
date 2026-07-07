import { Cookie, Mail, Settings, BarChart2, Megaphone, ShieldCheck } from 'lucide-react';
import PageLayout from '../components/PageLayout';

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
  blue:    { bg: 'bg-blue-50',    text: 'text-blue-600',    badge: 'bg-blue-100',    badgeText: 'text-blue-700',    dot: 'bg-blue-400' },
  amber:   { bg: 'bg-amber-50',   text: 'text-amber-600',   badge: 'bg-amber-100',   badgeText: 'text-amber-700',   dot: 'bg-amber-400' },
  rose:    { bg: 'bg-rose-50',    text: 'text-rose-600',    badge: 'bg-rose-100',    badgeText: 'text-rose-700',    dot: 'bg-rose-400' },
};

export default function CookiePolicy() {
  return (
    <PageLayout>
      <div
        className="relative pt-16 pb-20 px-6 overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, #f6f9fc 0%, #ffffff 70%)',
        }}
      >
        <img
          src="https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg"
          alt="Coding and privacy"
          className="absolute inset-0 w-full h-full object-cover mix-blend-luminosity opacity-5"
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(14,165,233,0.12) 0%, transparent 70%)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white" />
        <div className="relative max-w-4xl mx-auto">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-sky-200 bg-sky-50 text-xs font-semibold uppercase tracking-widest text-sky-700 mb-6">
            Legal
          </span>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-center">
              <Cookie size={22} className="text-sky-600" />
            </div>
            <h1 className="font-display font-bold text-5xl text-gray-900">Cookie Policy</h1>
          </div>
          <p className="text-gray-500 text-base mb-6">Last updated: <span className="text-gray-900 font-medium">February 1, 2026</span></p>
          <p className="text-gray-600 text-sm leading-relaxed max-w-2xl">
            FlowZa AI uses cookies to keep you signed in, understand how our products are used, and personalize your experience. This page explains exactly what we set and why.
          </p>
        </div>
      </div>

      <div className="bg-white">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 flex gap-4 items-start">
            <div className="w-8 h-8 rounded-lg bg-gray-200 flex items-center justify-center shrink-0 mt-0.5">
              <Cookie size={14} className="text-gray-600" />
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              <span className="font-semibold text-gray-900">What is a cookie?</span> A cookie is a small file stored on your device when you visit a website. It helps the site remember your preferences and session. Cookies do not store personal data unless you've provided it to the site.
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
                    <h2 className="font-display font-bold text-lg text-gray-900">{category.name} Cookies</h2>
                    <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${c.badge} ${c.badgeText}`}>
                      {category.required ? 'Always Active' : 'Optional'}
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm mb-4">{category.description}</p>
                  <div className="border border-gray-100 rounded-xl overflow-hidden">
                    <div className="grid grid-cols-3 gap-4 px-5 py-3 bg-gray-50 border-b border-gray-100">
                      {['Cookie', 'Purpose', 'Duration'].map((h) => (
                        <span key={h} className="text-xs font-semibold uppercase tracking-wider text-gray-400">{h}</span>
                      ))}
                    </div>
                    <div className="divide-y divide-gray-50">
                      {category.cookies.map((cookie) => (
                        <div key={cookie.name} className="grid grid-cols-3 gap-4 px-5 py-3.5 hover:bg-gray-50 transition-colors">
                          <code className={`text-xs font-mono ${c.text} break-all`}>{cookie.name}</code>
                          <span className="text-xs text-gray-600">{cookie.purpose}</span>
                          <span className="text-xs text-gray-400">{cookie.duration}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-12 pt-8 border-t border-gray-100">
            <h2 className="font-display font-bold text-lg text-gray-900 mb-3">Managing Your Preferences</h2>
            <p className="text-gray-500 text-sm mb-6 leading-relaxed">
              You can disable optional cookies through your browser settings. Note that disabling cookies may affect how some features work. Essential cookies cannot be turned off — they are required for the platform to operate securely.
            </p>
            <div className="flex items-center gap-4 p-5 bg-gray-50 rounded-2xl border border-gray-200">
              <div className="w-10 h-10 rounded-xl bg-gray-200 flex items-center justify-center shrink-0">
                <Mail size={16} className="text-gray-600" />
              </div>
              <div>
                <p className="text-gray-900 font-medium text-sm">Questions about cookies?</p>
                <p className="text-gray-500 text-sm">Contact our privacy team at <a href="mailto:privacy@flowza.ai" className="text-blue-600 hover:text-blue-700 transition-colors font-medium">privacy@flowza.ai</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
