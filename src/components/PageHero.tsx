interface PageHeroProps {
  label?: string;
  title: string;
  titleHighlight?: string;
  subtitle: string;
  imageUrl?: string;
  children?: React.ReactNode;
}

/** Inner-page hero: eyebrow, display headline with accent close, measured subtitle. */
export default function PageHero({ label, title, titleHighlight, subtitle, imageUrl, children }: PageHeroProps) {
  const onImage = Boolean(imageUrl);
  return (
    <section className={`relative overflow-hidden px-4 pb-16 pt-16 sm:px-6 sm:pb-20 sm:pt-24 ${onImage ? 'bg-ink grain' : 'wash-top'}`}>
      {imageUrl && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-25"
            style={{ backgroundImage: `url(${imageUrl})` }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/40 to-ink" aria-hidden="true" />
        </>
      )}
      <div className="relative mx-auto max-w-4xl text-center">
        {label && (
          <span className="rise-block block" style={{ animationDelay: '40ms' }}>
            <span className={`eyebrow justify-center ${onImage ? 'eyebrow-light' : ''}`}>{label}</span>
          </span>
        )}
        <h1
          className={`rise-block-media display-hero mt-6 text-4xl sm:text-5xl lg:text-[64px] ${onImage ? 'text-white' : 'text-ink'}`}
          style={{ animationDelay: '80ms' }}
        >
          {title}
          {titleHighlight && (
            <>
              {' '}
              <span className={`accent-word ${onImage ? 'text-accent-soft' : ''}`}>{titleHighlight}</span>
            </>
          )}
        </h1>
        <p
          className={`rise-block mx-auto mt-6 max-w-2xl text-lg leading-relaxed sm:text-xl ${
            onImage ? 'text-white/65' : 'text-ink-500'
          }`}
          style={{ animationDelay: '180ms' }}
        >
          {subtitle}
        </p>
        {children && <div className="mt-9">{children}</div>}
      </div>
    </section>
  );
}
