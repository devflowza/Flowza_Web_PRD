import { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ExternalLink, MessageCircle, Star } from 'lucide-react';
import SiteLayout from '../site/SiteLayout';
import SectionHeading from '../site/SectionHeading';
import Reveal from '../site/Reveal';
import Pricing from '../components/Pricing';
import productDetailsMap from '../data/productDetails';
import { productImages } from '../assets/productImages';
import { WHATSAPP_URL } from '../site/data';

export default function ProductDetail() {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();

  const product = productId ? productDetailsMap[productId] : null;

  useEffect(() => {
    if (!product) navigate('/', { replace: true });
  }, [product, navigate]);

  useEffect(() => {
    if (product) document.title = `${product.name} — Flowza AI`;
    return () => {
      document.title = 'Flowza AI — Business Operating Systems';
    };
  }, [product]);

  if (!product) return null;

  const ProductIcon = product.icon;
  const image = productImages[product.id] ?? product.related[0]?.pexelsImage;

  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/70 via-slate-50 to-white">
        <div className="absolute inset-0 fx-grid fx-grid-fade pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-10 pb-16 lg:pt-14 lg:pb-24">
          <Link
            to="/#platforms"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors mb-8"
          >
            <ArrowLeft size={15} />
            All platforms
          </Link>

          <div className="grid lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-10 items-center">
            <div>
              <span
                className="inline-flex items-center gap-2.5 rounded-full bg-white border shadow-sm px-4 py-1.5 text-sm font-semibold mb-7"
                style={{ borderColor: `${product.color}44`, color: product.color }}
              >
                <span className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: `${product.color}18` }}>
                  <ProductIcon size={13} />
                </span>
                {product.tagline}
              </span>

              <h1 className="font-bold text-slate-900 text-4xl sm:text-5xl lg:text-[54px] leading-[1.08] tracking-tight mb-6">
                {product.name}
              </h1>

              <p className="text-lg text-gray-600 leading-relaxed max-w-xl mb-7">{product.description}</p>

              <div className="flex flex-wrap gap-2.5 mb-9">
                {product.badges.map((b) => (
                  <span
                    key={b}
                    className="inline-flex items-center gap-1.5 rounded-full bg-white border border-gray-200 px-3.5 py-1.5 text-[13px] font-medium text-slate-700 shadow-sm"
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: product.color }} />
                    {b}
                  </span>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row flex-wrap gap-3">
                <a
                  href={product.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl text-white text-sm font-semibold px-6 py-3.5 hover:-translate-y-px transition-all"
                  style={{
                    background: `linear-gradient(120deg, ${product.color}, ${product.colorSecondary})`,
                    boxShadow: `0 8px 24px ${product.color}59`,
                  }}
                >
                  Launch {product.name.replace('Flowza ', '')}
                  <ExternalLink size={15} />
                </a>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25d366] text-white text-sm font-semibold px-6 py-3.5 shadow-[0_6px_18px_rgba(37,211,102,0.35)] hover:shadow-[0_8px_24px_rgba(37,211,102,0.5)] hover:-translate-y-px transition-all"
                >
                  <MessageCircle size={16} />
                  Ask on WhatsApp
                </a>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white border border-gray-200 text-slate-800 text-sm font-semibold px-6 py-3.5 shadow-sm hover:border-blue-300 hover:text-blue-700 transition-all"
                >
                  Talk to Sales
                </Link>
              </div>
            </div>

            {/* Visual */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-[0_24px_70px_rgba(15,23,42,0.2)] ring-1 ring-slate-900/5 bg-white">
                <img
                  src={image}
                  alt={`${product.name} interface`}
                  className="w-full h-[300px] sm:h-[400px] object-cover object-left-top"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-950/85 via-navy-950/35 to-transparent pt-14 pb-4 px-5">
                  <p className="text-white font-bold text-lg leading-tight">{product.name}</p>
                  <p className="text-white/70 text-sm">{product.tagline}</p>
                </div>
              </div>
              <div className="absolute -top-5 -right-2 sm:-right-4 rounded-2xl bg-white shadow-[0_12px_36px_rgba(15,23,42,0.16)] border border-gray-100 px-4 py-3">
                <span className="block font-bold text-slate-900 text-lg leading-none">{product.stats[0].value}</span>
                <span className="block text-xs text-gray-500 mt-1 max-w-[16ch]">{product.stats[0].label}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats band */}
      <section
        className="relative overflow-hidden py-14 px-4 sm:px-6"
        style={{ background: `linear-gradient(110deg, ${product.colorSecondary}, ${product.color})` }}
      >
        <div className="relative max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
          {product.stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 80} className="text-center">
              <p className="font-bold text-white text-3xl sm:text-4xl tracking-tight">{s.value}</p>
              <span className="block w-8 h-0.5 bg-white/50 mx-auto mt-3 mb-3 rounded-full" />
              <p className="text-white/85 text-xs sm:text-sm font-semibold uppercase tracking-[0.12em]">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-20 sm:py-24 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            badge="Capabilities"
            title={`Everything ${product.name.replace('Flowza ', '')} Does for You`}
            subtitle={product.longDescription}
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {product.features.map((f, i) => {
              const Icon = f.icon;
              return (
                <Reveal key={f.title} delay={(i % 3) * 90}>
                  <article className="h-full rounded-2xl bg-white border border-gray-200 p-6 shadow-sm hover:shadow-[0_14px_36px_rgba(15,23,42,0.1)] hover:-translate-y-1 transition-all duration-300">
                    <span
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                      style={{ background: `${product.color}12`, border: `1px solid ${product.color}30`, color: product.color }}
                    >
                      <Icon size={20} />
                    </span>
                    <h3 className="font-bold text-slate-900 text-lg mb-2.5">{f.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{f.description}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20 sm:py-24 px-4 sm:px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <SectionHeading badge="How It Works" title="Up and Running in Three Steps" />
          <div className="relative grid sm:grid-cols-3 gap-10 sm:gap-6">
            <div
              className="hidden sm:block absolute top-9 left-[16%] right-[16%] h-px"
              style={{ background: `linear-gradient(90deg, ${product.color}33, ${product.color}66, ${product.color}33)` }}
            />
            {product.steps.map((step, i) => (
              <Reveal key={step.number} delay={i * 120} className="relative flex flex-col items-center text-center">
                <div className="relative mb-6">
                  <span
                    className="w-[72px] h-[72px] rounded-full flex items-center justify-center text-white font-bold text-xl"
                    style={{ background: product.color, boxShadow: `0 10px 26px ${product.color}4d` }}
                  >
                    {step.number}
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 text-lg mb-3">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed max-w-[38ch]">{step.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-20 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <figure className="rounded-2xl bg-white border border-gray-200 shadow-[0_14px_40px_rgba(15,23,42,0.08)] p-8 sm:p-10 text-center">
              <span className="flex justify-center gap-1 mb-6" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={18} className="text-amber-400 fill-amber-400" />
                ))}
              </span>
              <blockquote className="text-slate-800 text-lg sm:text-xl leading-relaxed font-medium">
                “{product.testimonial.quote}”
              </blockquote>
              <figcaption className="mt-8 flex items-center justify-center gap-3">
                <span
                  className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold text-white"
                  style={{ background: product.color }}
                >
                  {product.testimonial.initials}
                </span>
                <span className="text-left">
                  <span className="block font-semibold text-slate-900 text-sm">{product.testimonial.name}</span>
                  <span className="block text-xs text-gray-500">
                    {product.testimonial.role} · {product.testimonial.company}
                  </span>
                </span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* Pricing — plans are Flowza Finance plans */}
      {product.id === 'finance' && <Pricing />}

      {/* Related platforms */}
      <section className="py-20 sm:py-24 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            badge="One Fabric"
            title="Works Better Together"
            subtitle="Every Flowza platform shares the same operating fabric — customers, inventory and ledger data flow between systems without manual re-entry."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {product.related.slice(0, 3).map((r, i) => (
              <Reveal key={r.id} delay={i * 90}>
                <Link
                  to={`/products/${r.id}`}
                  className="group relative block rounded-2xl overflow-hidden bg-navy-900 shadow-[0_4px_20px_rgba(15,23,42,0.1)] hover:shadow-[0_16px_44px_rgba(15,23,42,0.22)] hover:-translate-y-1 transition-all duration-300 h-[220px]"
                >
                  <img
                    src={productImages[r.id] ?? r.pexelsImage}
                    alt={r.name}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-60 group-hover:scale-[1.04] transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/95 via-navy-950/35 to-navy-950/10" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <p className="text-white font-bold text-lg leading-tight">{r.name}</p>
                    <p className="text-white/70 text-sm mt-1">{r.tagline}</p>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-semibold text-cyan-300 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                      Explore platform <ArrowRight size={13} />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
