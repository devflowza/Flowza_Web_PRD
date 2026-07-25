import type { LucideIcon } from 'lucide-react';

interface ProductCoverProps {
  name: string;
  icon: LucideIcon;
  index?: string;
  /** Local asset path ("/..."). External URLs are ignored in favour of the designed cover. */
  image?: string;
  alt?: string;
  className?: string;
  imgClassName?: string;
}

const isLocal = (src?: string) => Boolean(src && src.startsWith('/'));

/** Product artwork: local screenshot when available, designed ink cover otherwise. */
export default function ProductCover({ name, icon: Icon, index, image, alt, className = '', imgClassName = '' }: ProductCoverProps) {
  if (isLocal(image)) {
    return (
      <img
        src={image}
        alt={alt ?? `${name} interface`}
        loading="lazy"
        className={imgClassName || 'absolute inset-0 h-full w-full object-cover'}
      />
    );
  }
  return (
    <div className={`absolute inset-0 overflow-hidden bg-ink grain ${className}`} aria-label={alt ?? name} role="img">
      <div className="pointer-events-none absolute inset-0 wash-ink" aria-hidden="true" />
      {index && (
        <span
          aria-hidden="true"
          className="absolute -right-3 -top-7 select-none font-display text-[9rem] font-extrabold leading-none tracking-tightest text-white/[0.05]"
        >
          {index}
        </span>
      )}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-20 w-20 items-center justify-center rounded-[1.6rem] bg-white/[0.07] text-white/80 ring-1 ring-white/15 backdrop-blur-sm">
          <Icon size={32} strokeWidth={1.4} />
        </span>
      </div>
    </div>
  );
}
