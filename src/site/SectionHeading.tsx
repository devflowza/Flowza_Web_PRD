import Reveal from './Reveal';

interface SectionHeadingProps {
  badge: string;
  title: string;
  subtitle?: string;
  align?: 'center' | 'left';
  tone?: 'light' | 'dark';
}

/** Section opener: quiet eyebrow → display heading → measured subtitle. */
export default function SectionHeading({ badge, title, subtitle, align = 'center', tone = 'light' }: SectionHeadingProps) {
  const centered = align === 'center';
  const dark = tone === 'dark';
  return (
    <Reveal className={`${centered ? 'text-center' : 'text-left'} mb-14 sm:mb-20`}>
      <span className={`eyebrow ${dark ? 'eyebrow-light' : ''}`}>{badge}</span>
      <h2
        className={`display-title mt-5 text-[2rem] sm:text-[2.6rem] lg:text-[3rem] ${
          dark ? 'text-white' : 'text-ink'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-5 max-w-2xl text-base sm:text-lg leading-relaxed ${centered ? 'mx-auto' : ''} ${
            dark ? 'text-white/60' : 'text-ink-500'
          }`}
        >
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
