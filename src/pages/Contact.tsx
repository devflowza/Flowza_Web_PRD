import { useState, useEffect, useRef } from 'react';
import { ArrowRight, CheckCircle2, Loader2, MapPin, MessageCircle, Clock, Linkedin, Youtube } from 'lucide-react';
import { useSearchParams, Link } from 'react-router-dom';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import PageLayout from '../components/PageLayout';
import { WHATSAPP_URL, OFFICE_ADDRESS, BUSINESS_HOURS } from '../site/data';

interface FormData {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  product: string;
  message: string;
}

const services = [
  'General Inquiry',
  'Sales Inquiry',
  'Technical Support',
  'FlowZa Finance',
  'FlowZa QRForge',
  'FlowZa Fleetza',
  'FlowZa LogisPro',
  'FlowZa Spa Master',
  'FlowZa POS',
  'FlowZa PMS',
];

const socials = [
  { icon: Linkedin, href: 'https://linkedin.com/company/flowzaai', label: 'LinkedIn' },
  { icon: Youtube, href: 'https://youtube.com/@flowzaai', label: 'YouTube' },
  { icon: MessageCircle, href: WHATSAPP_URL, label: 'WhatsApp' },
];

export default function Contact() {
  const [searchParams] = useSearchParams();
  const formRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    product: 'General Inquiry',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.title = 'Contact — FlowZa AI';
    return () => {
      document.title = 'FlowZa AI — Business Operating Systems';
    };
  }, []);

  useEffect(() => {
    const serviceParam = searchParams.get('service');
    if (serviceParam && services.includes(serviceParam)) {
      setFormData((prev) => ({ ...prev, product: serviceParam }));
    }
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSupabaseConfigured) {
      setError('The form is temporarily unavailable. Please reach us on WhatsApp instead.');
      return;
    }
    setIsSubmitting(true);
    setError(null);

    const { error: submitError } = await supabase
      .from('contact_submissions')
      .insert({
        name: formData.contactName,
        email: formData.email,
        phone: formData.phone || null,
        subject: formData.product || 'General Inquiry',
        message: formData.companyName
          ? `Company: ${formData.companyName}\n\n${formData.message || ''}`.trim()
          : formData.message || '',
      });

    setIsSubmitting(false);

    if (submitError) {
      setError('We couldn\'t send your message. Please try again, or reach us on WhatsApp.');
      return;
    }

    setIsSuccess(true);
  };

  const inputClass =
    'w-full h-12 px-4 rounded-xl bg-white text-[15px] text-ink placeholder:text-ink-300 ring-1 ring-ink/[0.12] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent hover:ring-ink/25';
  const labelClass = 'mb-2 block text-[13px] font-semibold text-ink-600';

  return (
    <PageLayout>
      <div className="relative overflow-hidden wash-top px-4 pb-24 pt-16 sm:px-6 sm:pt-20">
        <div className="relative mx-auto max-w-6xl">
          <div className="mb-14 text-center">
            <span className="eyebrow justify-center">Contact</span>
            <h1 className="display-hero mt-6 text-4xl text-ink sm:text-5xl lg:text-[60px]">
              Let's build something
              <span className="accent-word"> together.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-ink-500">
              Whether you're exploring a platform, ready to buy, or just have a question —
              we respond within one business day.
            </p>
          </div>

          <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-5">
            {/* Left rail */}
            <div className="space-y-5 lg:col-span-2">
              <div className="rounded-[1.5rem] bg-ink p-7 text-white shadow-lift grain relative overflow-hidden">
                <div className="pointer-events-none absolute inset-0 wash-ink" aria-hidden="true" />
                <div className="relative">
                  <h2 className="font-display text-lg font-bold tracking-snug">Prefer to talk now?</h2>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">
                    WhatsApp is our fastest channel — a real person, usually within minutes
                    during business hours.
                  </p>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-inverse btn-md group mt-6 w-full"
                  >
                    <MessageCircle size={15} className="text-emerald-600" />
                    Chat on WhatsApp
                  </a>
                </div>
              </div>

              <div className="rounded-[1.5rem] bg-white p-7 ring-1 ring-ink/[0.07]">
                <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-ink-400">Office</p>
                <ul className="mt-4 space-y-4">
                  <li className="flex items-start gap-3.5 text-sm text-ink-600">
                    <MapPin size={16} className="mt-0.5 shrink-0 text-ink-300" />
                    {OFFICE_ADDRESS}
                  </li>
                  <li className="flex items-start gap-3.5 text-sm text-ink-600">
                    <Clock size={16} className="mt-0.5 shrink-0 text-ink-300" />
                    {BUSINESS_HOURS}
                  </li>
                </ul>
                <div className="mt-6 border-t border-ink/[0.07] pt-5">
                  <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-ink-400">Follow us</p>
                  <div className="mt-3.5 flex items-center gap-2">
                    {socials.map(({ icon: Icon, href, label }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="flex h-10 w-10 items-center justify-center rounded-full text-ink-400 ring-1 ring-ink/[0.1] transition-all duration-300 ease-swift hover:bg-ink hover:text-white hover:ring-ink"
                      >
                        <Icon size={15} strokeWidth={1.8} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div
              ref={formRef}
              className="overflow-hidden rounded-[1.75rem] bg-white shadow-soft ring-1 ring-ink/[0.07] lg:col-span-3"
            >
              <div className="border-b border-ink/[0.06] px-8 py-6">
                <h2 className="font-display text-xl font-bold tracking-snug text-ink">Send us a message</h2>
                <p className="mt-1 text-sm text-ink-400">Tell us a little about your operation — we'll take it from there.</p>
              </div>

              {isSuccess ? (
                <div className="p-12 text-center">
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 ring-1 ring-emerald-200">
                    <CheckCircle2 className="h-8 w-8 text-emerald-600" strokeWidth={1.8} />
                  </div>
                  <h3 className="font-display text-2xl font-bold tracking-snug text-ink">Message received.</h3>
                  <p className="mx-auto mt-3 max-w-sm text-[15px] leading-relaxed text-ink-500">
                    Thanks for reaching out. A member of our team will get back to you within
                    one business day.
                  </p>
                  <Link to="/" className="btn-primary btn-md group mt-8 inline-flex">
                    Back to home
                    <span className="btn-orb bg-white/15 group-hover:translate-x-0.5">
                      <ArrowRight size={13} />
                    </span>
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 p-8">
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="contactName" className={labelClass}>
                        Full name <span className="text-accent">*</span>
                      </label>
                      <input
                        id="contactName"
                        type="text"
                        name="contactName"
                        value={formData.contactName}
                        onChange={handleChange}
                        required
                        autoComplete="name"
                        placeholder="Amina Al-Busaidi"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className={labelClass}>
                        Work email <span className="text-accent">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        autoComplete="email"
                        placeholder="amina@company.com"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="phone" className={labelClass}>Phone</label>
                      <input
                        id="phone"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        autoComplete="tel"
                        placeholder="+968 9210 0000"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="companyName" className={labelClass}>Company</label>
                      <input
                        id="companyName"
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        autoComplete="organization"
                        placeholder="Your company LLC"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="product" className={labelClass}>
                      What's this about? <span className="text-accent">*</span>
                    </label>
                    <select
                      id="product"
                      name="product"
                      value={formData.product}
                      onChange={handleChange}
                      className={`${inputClass} appearance-none bg-[url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%2366779E' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")] bg-[position:right_1rem_center] bg-no-repeat pr-10`}
                      style={{ colorScheme: 'light' }}
                    >
                      {services.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className={labelClass}>
                      Message <span className="text-accent">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      required
                      placeholder="Tell us about your operation — team size, locations, what you're running today…"
                      className={`${inputClass} h-auto resize-none py-3.5`}
                    />
                  </div>

                  {error && (
                    <div role="alert" className="rounded-xl bg-red-50 p-4 text-sm text-red-700 ring-1 ring-red-100">
                      {error}
                    </div>
                  )}

                  <button type="submit" disabled={isSubmitting} className="btn-primary btn-lg group w-full disabled:cursor-not-allowed disabled:opacity-60">
                    {isSubmitting ? (
                      <>
                        <Loader2 size={17} className="animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        Send message
                        <span className="btn-orb bg-white/15 group-hover:translate-x-0.5">
                          <ArrowRight size={13} />
                        </span>
                      </>
                    )}
                  </button>

                  <p className="text-center text-xs text-ink-400">
                    By submitting, you agree to our{' '}
                    <Link to="/privacy" className="font-medium text-ink-600 underline decoration-ink-200 underline-offset-2 transition-colors hover:text-accent">
                      privacy policy
                    </Link>
                    . We never share your data.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
