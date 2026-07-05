import { Link } from 'react-router-dom';
import { MessageCircle, Mail, Clock, MapPin } from 'lucide-react';
import { WHATSAPP_URL, WHATSAPP_DISPLAY, CONTACT_EMAIL, BUSINESS_HOURS, OFFICE_ADDRESS } from './data';

/** Dark utility bar above the main nav — contact channels left, live status right. */
export default function TopBar() {
  return (
    <div className="bg-navy-950 text-white text-[13px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-9 flex items-center justify-between gap-4">
        <div className="flex items-center gap-5 min-w-0">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-cyan-300 transition-colors whitespace-nowrap"
          >
            <MessageCircle size={13} className="shrink-0" />
            {WHATSAPP_DISPLAY}
          </a>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="hidden sm:inline-flex items-center gap-1.5 hover:text-cyan-300 transition-colors whitespace-nowrap"
          >
            <Mail size={13} className="shrink-0" />
            {CONTACT_EMAIL}
          </a>
          <span className="hidden lg:inline-flex items-center gap-1.5 text-slate-300 whitespace-nowrap">
            <Clock size={13} className="shrink-0" />
            {BUSINESS_HOURS}
          </span>
          <span className="hidden xl:inline-flex items-center gap-1.5 text-slate-300 whitespace-nowrap">
            <MapPin size={13} className="shrink-0" />
            {OFFICE_ADDRESS}
          </span>
        </div>
        <Link
          to="/status"
          className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-0.5 hover:border-emerald-400/60 transition-colors whitespace-nowrap"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
          </span>
          <span className="hidden sm:inline">All systems operational</span>
          <span className="sm:hidden">Status</span>
        </Link>
      </div>
    </div>
  );
}
