import { MapPin, Phone, Mail } from 'lucide-react';

interface LocationCardProps {
  company: string;
  city: string;
  country: string;
  address: string;
  companyHighlight?: string;
  phone?: string;
  email?: string;
  description?: string;
}

export default function LocationCard({
  company,
  city,
  country,
  address,
  companyHighlight,
  phone,
  email,
  description,
}: LocationCardProps) {
  const renderAddressWithFormatting = (addr: string) => {
    const lines = addr.split('\n').filter((line) => line.trim());
    return lines.map((line, index) => {
      const highlightText = companyHighlight ? companyHighlight.trim() : '';
      if (highlightText && line.includes(highlightText)) {
        const parts = line.split(new RegExp(`(${highlightText})`));
        return (
          <div key={index} className="whitespace-pre-wrap">
            {parts.map((part, idx) =>
              part === highlightText ? (
                <span key={idx} className="font-semibold text-ink">
                  {part}
                </span>
              ) : (
                <span key={idx}>{part}</span>
              )
            )}
          </div>
        );
      }
      return (
        <div key={index} className="whitespace-pre-wrap">
          {line}
        </div>
      );
    });
  };

  return (
    <div className="card-line h-full p-8 hover:-translate-y-1">
      <div className="mb-6 flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-mist text-ink-500 ring-1 ring-ink/[0.05]">
          <MapPin size={18} strokeWidth={1.7} />
        </div>
        <div className="flex-1">
          <h3 className="font-display text-lg font-bold leading-tight tracking-snug text-ink">{company}</h3>
          <p className="mt-1 text-sm text-ink-400">
            {city}, {country}
          </p>
        </div>
      </div>

      {description && <p className="mb-4 text-sm leading-relaxed text-ink-500">{description}</p>}

      <div className="mb-2 text-sm leading-relaxed text-ink-600">
        <span className="mb-2.5 block text-[11px] font-bold uppercase tracking-[0.18em] text-ink-300">Address</span>
        <div className="space-y-1">{renderAddressWithFormatting(address)}</div>
      </div>

      {(phone || email) && (
        <div className="mt-5 space-y-2 border-t border-ink/[0.07] pt-4">
          {phone && (
            <a href={`tel:${phone}`} className="flex items-center gap-3 text-sm text-ink-500 transition-colors hover:text-ink">
              <Phone size={15} className="shrink-0 text-ink-300" />
              <span>{phone}</span>
            </a>
          )}
          {email && (
            <a href={`mailto:${email}`} className="flex items-center gap-3 text-sm text-ink-500 transition-colors hover:text-ink">
              <Mail size={15} className="shrink-0 text-ink-300" />
              <span>{email}</span>
            </a>
          )}
        </div>
      )}
    </div>
  );
}
