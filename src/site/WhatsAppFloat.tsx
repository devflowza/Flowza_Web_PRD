import { MessageCircle } from 'lucide-react';
import { WHATSAPP_URL } from './data';

/** Quiet WhatsApp orb, bottom-right — label unfolds on hover. */
export default function WhatsAppFloat() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="group fixed bottom-6 right-6 z-40 flex h-[52px] items-center gap-0 rounded-full bg-ink pl-[15px] pr-[15px] text-white shadow-lift transition-all duration-500 ease-swift hover:pr-5 hover:shadow-frame active:scale-[0.97]"
    >
      <MessageCircle size={21} strokeWidth={1.8} className="shrink-0 text-emerald-400" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold opacity-0 transition-all duration-500 ease-swift group-hover:ml-2.5 group-hover:max-w-[130px] group-hover:opacity-100">
        WhatsApp us
      </span>
    </a>
  );
}
