interface PageHeroProps {
  label?: string;
  title: string;
  titleHighlight?: string;
  subtitle: string;
  imageUrl?: string;
  children?: React.ReactNode;
}

/** Secondary-page hero: light grid backdrop (or image with navy overlay), pill label, bold heading. */
export default function PageHero({ label, title, titleHighlight, subtitle, imageUrl, children }: PageHeroProps) {
  const onImage = Boolean(imageUrl);
  return (
    <section className="relative pt-20 pb-20 px-4 sm:px-6 overflow-hidden">
      {imageUrl ? (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${imageUrl})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-950/90 via-navy-950/70 to-navy-950/40" />
        </>
      ) : (
        <>
          <div className="absolute inset-0 bg-gradient-to-b from-blue-50/80 via-slate-50 to-white" />
          <div className="absolute inset-0 fx-grid fx-grid-fade pointer-events-none" />
        </>
      )}
      <div className="relative max-w-4xl mx-auto text-center">
        {label && (
          <span
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-6 ${
              onImage
                ? 'border border-white/20 bg-white/10 backdrop-blur-sm text-white'
                : 'bg-blue-50 border border-blue-100 text-blue-600'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            {label}
          </span>
        )}
        <h1
          className={`font-bold text-4xl sm:text-5xl lg:text-[56px] leading-[1.08] tracking-tight mb-6 ${
            onImage ? 'text-white' : 'text-slate-900'
          }`}
        >
          {title}
          {titleHighlight && (
            <>
              {' '}
              <span className={onImage ? 'text-cyan-300' : 'fx-gradient-text'}>{titleHighlight}</span>
            </>
          )}
        </h1>
        <p
          className={`text-lg md:text-xl leading-relaxed max-w-2xl mx-auto ${
            onImage ? 'text-white/80' : 'text-gray-500'
          }`}
        >
          {subtitle}
        </p>
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
