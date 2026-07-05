import { useState, useEffect, useRef } from 'react';
import { Send, CheckCircle, Loader2, MapPin, MessageCircle, Clock, ArrowUpRight, Linkedin, Youtube } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import PageLayout from '../components/PageLayout';

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
  'Flowza Finance',
  'Flowza QRForge',
  'Flowza Fleetza',
  'Flowza LogisPro',
  'Flowza Spa Master',
  'Flowza POS',
  'Flowza PMS',
];

const contactCards = [
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: 'Chat with us on WhatsApp',
    href: 'https://web.whatsapp.com/send?phone=96892107562&text=Hello! Flowza',
    iconBg: '#22c55e22',
    iconColor: '#22c55e',
    borderColor: '#22c55e33',
  },
  {
    icon: MapPin,
    label: 'Office Address',
    value: 'Ghala, Muscat, Oman',
    href: null,
    iconBg: '#f9731622',
    iconColor: '#f97316',
    borderColor: '#f9731633',
  },
  {
    icon: Clock,
    label: 'Business Hours',
    value: 'Sun – Thu: 9:00 AM – 6:00 PM GST',
    href: null,
    iconBg: '#f9731622',
    iconColor: '#f97316',
    borderColor: '#f9731633',
  },
];

const quickLinks = [
  { label: 'General Inquiry', service: 'General Inquiry' },
  { label: 'Sales', service: 'Sales Inquiry' },
];

const socials = [
  { icon: Linkedin, href: 'https://linkedin.com/company/flowzaai', label: 'LinkedIn' },
  { icon: Youtube, href: 'https://youtube.com/@flowzaai', label: 'YouTube' },
  { icon: MessageCircle, href: 'https://web.whatsapp.com/send?phone=96892107562&text=Hello! Flowza', label: 'WhatsApp' },
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
    const serviceParam = searchParams.get('service');
    if (serviceParam && services.includes(serviceParam)) {
      setFormData((prev) => ({ ...prev, product: serviceParam }));
    }
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleQuickLink = (service: string) => {
    setFormData((prev) => ({ ...prev, product: service }));
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
      setError('Failed to submit. Please try again or reach us on WhatsApp.');
      return;
    }

    setIsSuccess(true);
  };

  const inputClass =
    'w-full px-4 py-3 rounded-xl text-sm text-gray-900 placeholder-gray-400 outline-none transition-all focus:ring-2 focus:ring-blue-200 focus:border-blue-400';
  const inputStyle = {
    background: '#ffffff',
    border: '1px solid #d1d5db',
  };

  return (
    <PageLayout>
      <div
        className="min-h-screen pt-14 pb-20 px-6"
        style={{ background: 'linear-gradient(180deg, #f4faff 0%, #ffffff 70%)' }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(14,165,233,0.12) 0%, transparent 70%)',
          }}
        />

        <div className="relative max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-sm text-blue-600 mb-5 font-semibold">
              Get in Touch
            </div>
            <h1 className="font-bold text-4xl sm:text-5xl lg:text-[52px] text-slate-900 tracking-tight leading-[1.08] mb-4">
              Let's Build Something <span className="fx-gradient-text">Together</span>
            </h1>
            <p className="text-gray-600 text-base max-w-xl mx-auto leading-relaxed">
              Whether you're exploring a product, ready to buy, or just have a question — our team responds within one business day.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
            <div className="lg:col-span-2 space-y-4">
              <div
                className="rounded-2xl p-6"
                style={{
                  background: '#ffffff',
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 1px 3px rgba(15,23,42,0.06), 0 10px 30px rgba(15,23,42,0.05)',
                }}
              >
                <h2 className="text-gray-900 font-bold text-lg mb-1">Flowza.ai</h2>
                <p className="text-gray-400 text-xs uppercase tracking-widest font-semibold mb-5">Contact Information</p>

                <div className="space-y-3">
                  {contactCards.map(({ icon: Icon, label, value, href, iconBg, iconColor, borderColor }) => (
                    <div
                      key={label}
                      className="flex items-start gap-4 p-4 rounded-xl"
                      style={{ background: '#f9fafb', border: '1px solid #f3f4f6' }}
                    >
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: iconBg, border: `1.5px solid ${borderColor}` }}
                      >
                        <Icon size={16} style={{ color: iconColor }} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-gray-500 text-xs font-medium mb-0.5">{label}</p>
                        {href ? (
                          <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-900 text-sm font-medium hover:text-sky-600 transition-colors break-words"
                          >
                            {value}
                          </a>
                        ) : (
                          <p className="text-gray-900 text-sm font-medium break-words">{value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div
                className="rounded-2xl p-6"
                style={{
                  background: '#ffffff',
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 1px 3px rgba(15,23,42,0.06), 0 10px 30px rgba(15,23,42,0.05)',
                }}
              >
                <div className="space-y-2.5 mb-5">
                  {quickLinks.map(({ label, service }) => (
                    <button
                      key={label}
                      type="button"
                      onClick={() => handleQuickLink(service)}
                      className="flex items-center gap-2 text-sky-600 text-sm hover:text-sky-700 transition-colors w-full text-left"
                    >
                      <MessageCircle size={13} />
                      {label}
                    </button>
                  ))}
                </div>

                <div className="pt-5 border-t" style={{ borderColor: '#e5e7eb' }}>
                  <p className="text-gray-400 text-xs font-semibold uppercase tracking-widest mb-3">Follow Us</p>
                  <div className="flex items-center gap-2.5">
                    {socials.map(({ icon: Icon, href, label }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-400 hover:text-sky-600 transition-all"
                        style={{ background: '#f9fafb', border: '1px solid #e5e7eb' }}
                      >
                        <Icon size={14} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div
              ref={formRef}
              className="lg:col-span-3 rounded-2xl overflow-hidden"
              style={{
                background: '#ffffff',
                border: '1px solid #e5e7eb',
                boxShadow: '0 1px 3px rgba(15,23,42,0.06), 0 10px 30px rgba(15,23,42,0.05)',
              }}
            >
              <div className="px-8 py-6 border-b" style={{ borderColor: '#e5e7eb' }}>
                <h2 className="text-gray-900 font-bold text-xl">Send Us a Message</h2>
                <p className="text-gray-500 text-sm mt-1">Fill in the details below and we'll be in touch shortly.</p>
              </div>

              {isSuccess ? (
                <div className="p-12 text-center">
                  <div
                    className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center"
                    style={{ background: 'rgba(34,197,94,0.15)', border: '1.5px solid rgba(34,197,94,0.3)' }}
                  >
                    <CheckCircle className="w-10 h-10 text-emerald-400" />
                  </div>
                  <h3 className="font-display font-bold text-2xl text-gray-900 mb-3">Message Received!</h3>
                  <p className="text-gray-600 text-base max-w-sm mx-auto leading-relaxed">
                    Thank you for reaching out. A member of our team will get back to you within one business day.
                  </p>
                  <a
                    href="/"
                    className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-xl text-sm font-semibold text-white fx-gradient shadow-[0_6px_18px_rgba(37,99,235,0.35)] transition-all hover:-translate-y-0.5"
                  >
                    Back to Home
                    <ArrowUpRight size={14} />
                  </a>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="p-8 space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="contactName"
                        value={formData.contactName}
                        onChange={handleChange}
                        required
                        placeholder="John Doe"
                        className={inputClass}
                        style={inputStyle}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="john@company.com"
                        className={inputClass}
                        style={inputStyle}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+968 ..."
                        className={inputClass}
                        style={inputStyle}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                      <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        placeholder="Your Company Ltd"
                        className={inputClass}
                        style={inputStyle}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Service of Interest <span className="text-red-400">*</span>
                    </label>
                    <select
                      name="product"
                      value={formData.product}
                      onChange={handleChange}
                      className={inputClass}
                      style={{ ...inputStyle, colorScheme: 'light' }}
                    >
                      {services.map((s) => (
                        <option key={s} value={s} style={{ background: '#ffffff', color: '#0f172a' }}>{s}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      required
                      placeholder="Tell us about your project or requirements..."
                      className={`${inputClass} resize-none`}
                      style={inputStyle}
                    />
                  </div>

                  {error && (
                    <div
                      className="p-4 rounded-xl text-red-600 text-sm"
                      style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}
                    >
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-xl text-sm font-semibold text-white fx-gradient shadow-[0_6px_18px_rgba(37,99,235,0.35)] flex items-center justify-center gap-2.5 transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={17} className="animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={17} />
                        Send Message
                      </>
                    )}
                  </button>

                  <p className="text-center text-xs text-gray-400">
                    By submitting, you agree to our{' '}
                    <a href="/privacy" className="text-sky-600 hover:text-sky-700 transition-colors">Privacy Policy</a>.
                    We never share your data.
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
