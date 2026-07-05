interface PageHeroProps {
  label?: string;
  title: string;
  titleHighlight?: string;
  subtitle: string;
  imageUrl?: string;
  children?: React.ReactNode;
}

export default function PageHero({ label, title, titleHighlight, subtitle, imageUrl, children }: PageHeroProps) {
  const onImage = Boolean(imageUrl);
  return (
    <section className="relative pt-36 pb-24 px-6 overflow-hidden">
      {imageUrl ? (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${imageUrl})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628]/85 via-[#0c4a8a]/60 to-transparent" />
        </>
      ) : (
        <>
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(14,165,233,0.14) 0%, transparent 70%)' }}
          />
          <div className="absolute inset-0 dot-grid-light pointer-events-none opacity-60" />
        </>
      )}
      <div className="relative max-w-4xl mx-auto text-center">
        {label && (
          <span className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full backdrop-blur-sm text-xs font-semibold uppercase tracking-widest mb-6 ${
            onImage ? 'border border-white/20 bg-white/10 text-white/80' : 'border border-sky-200 bg-sky-50 text-sky-700'
          }`}>
            {label}
          </span>
        )}
        <h1 className={`font-display font-bold text-5xl md:text-6xl leading-[1.1] mb-6 ${onImage ? 'text-white' : 'text-gray-900'}`}>
          {title}
          {titleHighlight && (
            <> <span className="text-gradient-violet">{titleHighlight}</span></>
          )}
        </h1>
        <p className={`text-lg md:text-xl leading-relaxed max-w-2xl mx-auto ${onImage ? 'text-white/70' : 'text-gray-600'}`}>
          {subtitle}
        </p>
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
