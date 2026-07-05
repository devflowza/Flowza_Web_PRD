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
  accentColor: string;
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
  accentColor,
}: LocationCardProps) {
  const renderAddressWithFormatting = (addr: string) => {
    const lines = addr.split('\n').filter(line => line.trim());
    return lines.map((line, index) => {
      const highlightText = companyHighlight ? companyHighlight.trim() : '';
      if (highlightText && line.includes(highlightText)) {
        const parts = line.split(new RegExp(`(${highlightText})`));
        return (
          <div key={index} className="whitespace-pre-wrap">
            {parts.map((part, idx) =>
              part === highlightText ? (
                <span key={idx} className="font-semibold text-gray-900">
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
    <div className="group p-8 rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-lg hover:border-sky-200 transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-start gap-4 mb-6">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
          style={{
            backgroundColor: `${accentColor}18`,
            border: `1.5px solid ${accentColor}40`,
          }}
        >
          <MapPin size={20} style={{ color: accentColor }} strokeWidth={2} />
        </div>
        <div className="flex-1">
          <h3 className="font-display font-bold text-lg text-gray-900 leading-tight">
            {company}
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            {city}, {country}
          </p>
        </div>
      </div>

      {description && (
        <p className="text-sm text-gray-600 mb-4 leading-relaxed">{description}</p>
      )}

      <div className="space-y-3 mb-6">
        <div className="text-sm text-gray-700 leading-relaxed">
          <span className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">
            Address
          </span>
          <div className="space-y-1">
            {renderAddressWithFormatting(address)}
          </div>
        </div>
      </div>

      {(phone || email) && (
        <div className="border-t border-gray-100 pt-4 space-y-2">
          {phone && (
            <a
              href={`tel:${phone}`}
              className="flex items-center gap-3 text-sm text-gray-600 hover:text-sky-700 transition-colors group/link"
            >
              <Phone size={16} className="shrink-0" />
              <span>{phone}</span>
            </a>
          )}
          {email && (
            <a
              href={`mailto:${email}`}
              className="flex items-center gap-3 text-sm text-gray-600 hover:text-sky-700 transition-colors group/link"
            >
              <Mail size={16} className="shrink-0" />
              <span>{email}</span>
            </a>
          )}
        </div>
      )}
    </div>
  );
}
