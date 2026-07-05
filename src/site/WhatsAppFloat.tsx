import { MessageCircle } from 'lucide-react';
import { WHATSAPP_URL } from './data';

/** Floating WhatsApp pill, bottom-right on every public page. */
export default function WhatsAppFloat() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 rounded-full bg-[#25d366] text-white text-sm font-semibold pl-4 pr-5 py-3 shadow-[0_8px_24px_rgba(37,211,102,0.4)] hover:shadow-[0_10px_30px_rgba(37,211,102,0.55)] hover:-translate-y-0.5 transition-all"
    >
      <MessageCircle size={18} />
      <span className="hidden sm:inline">WhatsApp Us</span>
    </a>
  );
}
