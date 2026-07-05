import Reveal from './Reveal';

interface SectionHeadingProps {
  badge: string;
  title: string;
  subtitle?: string;
  align?: 'center' | 'left';
  tone?: 'light' | 'dark';
}

/** Pill badge → bold heading → muted subtitle. The section-opener pattern used across the site. */
export default function SectionHeading({ badge, title, subtitle, align = 'center', tone = 'light' }: SectionHeadingProps) {
  const centered = align === 'center';
  const dark = tone === 'dark';
  return (
    <Reveal className={`${centered ? 'text-center' : 'text-left'} mb-12 sm:mb-16`}>
      <span
        className={`inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold mb-5 ${
          dark ? 'bg-white/10 text-cyan-300' : 'bg-blue-50 text-blue-600'
        }`}
      >
        {badge}
      </span>
      <h2
        className={`font-bold text-3xl sm:text-4xl lg:text-[44px] leading-tight tracking-tight ${
          dark ? 'text-white' : 'text-slate-900'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-base sm:text-lg leading-relaxed max-w-2xl ${centered ? 'mx-auto' : ''} ${
            dark ? 'text-slate-300' : 'text-gray-500'
          }`}
        >
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
