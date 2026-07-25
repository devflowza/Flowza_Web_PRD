import { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight, MessageCircle, Star, Play } from 'lucide-react';
import SiteLayout from '../site/SiteLayout';
import SectionHeading from '../site/SectionHeading';
import Reveal from '../site/Reveal';
import ProductCover from '../site/ProductCover';
import Pricing from '../components/Pricing';
import ClosingCta from '../site/ClosingCta';
import productDetailsMap from '../data/productDetails';
import { productImages } from '../assets/productImages';
import { landingProducts, whatsappUrl } from '../site/data';
import usePageMeta from '../lib/usePageMeta';

export default function ProductDetail() {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();

  const product = productId ? productDetailsMap[productId] : null;
  const isLive = product ? landingProducts.find((p) => p.id === product.id)?.live ?? false : false;

  useEffect(() => {
    if (!product) navigate('/', { replace: true });
  }, [product, navigate]);

  usePageMeta({
    title: product ? `${product.name} — ${product.tagline} | FlowZa AI` : 'FlowZa AI',
    description: product?.description,
    ogImage: product ? productImages[product.id] || undefined : undefined,
  });

  if (!product) return null;

  const shortName = product.name.replace('FlowZa ', '');
  const image = productImages[product.id];

  const productJsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: product.name,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    description: product.description,
    url: `https://flowza.ai/products/${product.id}`,
    offers:
      product.id === 'finance'
        ? { '@type': 'Offer', price: '15', priceCurrency: 'USD', description: 'Starter plan, per month' }
        : undefined,
  });

  return (
    <SiteLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: productJsonLd }} />
      {/* Hero */}
      <section className="relative overflow-hidden wash-top">
        <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-10 sm:px-6 lg:pb-24 lg:pt-14">
          <Link
            to="/#platforms"
            className="group mb-10 inline-flex items-center gap-2 text-sm font-medium text-ink-400 transition-colors hover:text-ink"
          >
            <ArrowLeft size={15} className="transition-transform duration-300 ease-swift group-hover:-translate-x-0.5" />
            All platforms
          </Link>

          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
            <div>
              <span className="eyebrow">
                {product.tagline}
                {!isLive && (
                  <span className="ml-2 rounded-full bg-accent-wash px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-accent-deep normal-case">
                    Rolling out
                  </span>
                )}
              </span>

              <h1 className="display-hero mt-6 text-[42px] text-ink sm:text-5xl lg:text-[62px]">{product.name}</h1>

              <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-500">{product.description}</p>

              <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2.5">
                {product.badges.map((b) => (
                  <li key={b} className="flex items-center gap-2 text-sm font-medium text-ink-500">
                    <span className="h-1 w-1 rounded-full" style={{ background: product.color }} aria-hidden="true" />
                    {b}
                  </li>
                ))}
              </ul>

              <div className="mt-9 flex flex-col gap-3.5 sm:flex-row sm:flex-wrap">
                {isLive ? (
                  <a href={product.href} target="_blank" rel="noopener noreferrer" className="btn-primary btn-lg group">
                    Launch {shortName}
                    <span className="btn-orb bg-white/15 group-hover:translate-x-0.5">
                      <ArrowUpRight size={14} />
                    </span>
                  </a>
                ) : (
                  <Link to={`/contact?service=${encodeURIComponent(product.name)}`} className="btn-primary btn-lg group">
                    Get early access
                    <span className="btn-orb bg-white/15 group-hover:translate-x-0.5">
                      <ArrowRight size={14} />
                    </span>
                  </Link>
                )}
                <Link to="/contact" className="btn-secondary btn-lg">
                  Talk to sales
                </Link>
                {product.id === 'finance' && (
                  <Link to="/finance-demo" className="btn-secondary btn-lg group">
                    <Play size={14} className="text-accent" />
                    Try the live demo
                  </Link>
                )}
              </div>
              <a
                href={whatsappUrl(`Hello! I'm interested in ${product.name}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 py-2 text-sm font-medium text-ink-400 transition-colors duration-300 hover:text-ink"
              >
                <MessageCircle size={14} />
                or ask us anything on WhatsApp
              </a>
            </div>

            {/* Visual — opacity never gated: this is the page's LCP element */}
            <div className="rise-block-media relative" style={{ animationDelay: '80ms' }}>
              <div className="bezel shadow-frame">
                <div className="bezel-inner relative h-[300px] sm:h-[400px]">
                  <ProductCover
                    name={product.name}
                    icon={product.icon}
                    image={image}
                    priority
                    imgClassName="absolute inset-0 h-full w-full object-cover object-left-top"
                  />
                </div>
              </div>
              {isLive && (
              <div className="absolute -bottom-5 left-8 rounded-2xl bg-white/90 px-5 py-4 shadow-lift ring-1 ring-ink/[0.06] backdrop-blur-md">
                <span className="tabular block font-display text-xl font-bold leading-none text-ink">
                  {product.stats[0].value}
                </span>
                <span className="mt-1 block max-w-[18ch] text-xs text-ink-400">{product.stats[0].label}</span>
              </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Stats — editorial numbers, hairline separated (live products only) */}
      {isLive && (
      <section className="border-y border-ink/[0.06] bg-white px-4 py-14 sm:px-6 sm:py-16" aria-label={`${product.name} in numbers`}>
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-10 lg:grid-cols-3">
          {product.stats.slice(1).map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 80}
              className={`px-6 text-center sm:px-10 ${i % 2 === 1 ? 'border-l border-ink/[0.07]' : ''} ${
                i === 2 ? 'border-t border-ink/[0.07] pt-10 lg:border-l lg:border-ink/[0.07] lg:border-t-0 lg:pt-0' : ''
              }`}
            >
              <p className="tabular font-display text-4xl font-extrabold leading-none tracking-tightest text-ink sm:text-5xl">
                {s.value}
              </p>
              <p className="mt-3 text-[13px] font-medium text-ink-400">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </section>
      )}

      {/* Features */}
      <section className="bg-mist px-4 py-24 sm:px-6 sm:py-32">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            badge="Capabilities"
            title={`Everything ${shortName} does for you.`}
            subtitle={product.longDescription}
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {product.features.map((f, i) => {
              const Icon = f.icon;
              return (
                <Reveal key={f.title} delay={(i % 3) * 80}>
                  <article className="card-line h-full bg-white p-7 hover:-translate-y-1">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-mist text-ink-500 ring-1 ring-ink/[0.05]">
                      <Icon size={18} strokeWidth={1.7} />
                    </span>
                    <h3 className="mt-5 font-display text-lg font-bold tracking-snug text-ink">{f.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-500">{f.description}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Steps — editorial rows */}
      <section className="bg-white px-4 py-24 sm:px-6 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1fr_1.4fr] lg:gap-24">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Reveal>
              <span className="eyebrow">How it works</span>
              <h2 className="display-title mt-5 text-[2rem] text-ink sm:text-[2.6rem]">
                Up and running in three steps.
              </h2>
            </Reveal>
          </div>
          <div>
            {product.steps.map((step, i) => (
              <Reveal key={step.number} delay={i * 100}>
                <article
                  className={`group flex gap-7 border-t border-ink/[0.08] py-10 sm:gap-10 sm:py-12 ${
                    i === product.steps.length - 1 ? 'border-b' : ''
                  }`}
                >
                  <span aria-hidden="true" className="font-display text-4xl font-extrabold leading-none tracking-tightest text-ink-100 sm:text-6xl">
                    {String(step.number).padStart(2, '0')}
                  </span>
                  <div className="pt-1">
                    <h3 className="font-display text-xl font-bold tracking-snug text-ink sm:text-2xl">{step.title}</h3>
                    <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-ink-500">{step.description}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial — live products only */}
      {isLive && (
      <section className="bg-mist px-4 py-24 sm:px-6 sm:py-28">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <figure className="relative overflow-hidden rounded-[2rem] bg-white p-8 shadow-soft ring-1 ring-ink/[0.06] sm:p-12">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -top-6 right-8 select-none font-display text-[10rem] font-extrabold leading-none text-ink/[0.04]"
              >
                ”
              </span>
              <span className="relative flex gap-1" aria-label="Rated 5 out of 5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={15} className="fill-ink text-ink" />
                ))}
              </span>
              <blockquote className="relative mt-6">
                <p className="display-title text-xl leading-[1.35] text-ink sm:text-2xl">
                  “{product.testimonial.quote}”
                </p>
              </blockquote>
              <figcaption className="relative mt-8 flex items-center gap-4">
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-2xl text-sm font-bold text-white"
                  style={{ background: product.color }}
                >
                  {product.testimonial.initials}
                </span>
                <span>
                  <span className="block font-semibold text-ink">{product.testimonial.name}</span>
                  <span className="block text-sm text-ink-400">
                    {product.testimonial.role}, {product.testimonial.company}
                  </span>
                </span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>
      )}

      {/* Pricing — plans are FlowZa Finance plans */}
      {product.id === 'finance' && <Pricing />}

      {/* Related platforms */}
      <section className="bg-white px-4 py-24 sm:px-6 sm:py-32">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            badge="One fabric"
            title="Works better together."
            subtitle="Every FlowZa platform shares the same operating fabric — customers, inventory and ledger data flow between systems without manual re-entry."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {product.related.slice(0, 3).map((r, i) => (
              <Reveal key={r.id} delay={i * 80}>
                <Link
                  to={`/products/${r.id}`}
                  className="group relative block h-[240px] overflow-hidden rounded-[1.75rem] bg-ink shadow-soft transition-all duration-500 ease-swift hover:-translate-y-1 hover:shadow-lift"
                >
                  <ProductCover
                    name={r.name}
                    icon={productDetailsMap[r.id]?.icon ?? product.icon}
                    image={productImages[r.id]}
                    imgClassName="absolute inset-0 h-full w-full object-cover opacity-80 transition-all duration-700 ease-swift group-hover:scale-[1.04] group-hover:opacity-60"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-ink/10" aria-hidden="true" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <p className="font-display text-lg font-bold tracking-snug text-white">{r.name}</p>
                    <p className="mt-1 text-sm text-white/65">{r.tagline}</p>
                    <span className="mt-3 inline-flex -translate-x-1 items-center gap-1.5 text-[13px] font-semibold text-white opacity-0 transition-all duration-300 ease-swift group-hover:translate-x-0 group-hover:opacity-100">
                      Explore platform <ArrowRight size={13} />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ClosingCta
        title="See your operation"
        accent="in flow."
        subtitle={`Try ${shortName} with your own data — guided setup, no card required, and a real person on WhatsApp when you need one.`}
      />
    </SiteLayout>
  );
}
