import { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { WHATSAPP_URL } from './data';

/** Quiet WhatsApp orb, bottom-right — appears past the hero, label unfolds on hover. */
export default function WhatsAppFloat() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > 480);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      aria-hidden={!shown}
      tabIndex={shown ? 0 : -1}
      className={`group fixed bottom-6 right-6 z-40 flex h-[52px] items-center rounded-full bg-ink px-[15px] text-white shadow-lift transition-all duration-500 ease-swift hover:shadow-frame active:scale-[0.97] ${
        shown ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      <MessageCircle size={21} strokeWidth={1.8} className="shrink-0 text-emerald-400" />
      <span className="grid grid-cols-[0fr] items-center transition-[grid-template-columns] duration-500 ease-swift group-hover:grid-cols-[1fr] group-focus-visible:grid-cols-[1fr]">
        <span className="overflow-hidden whitespace-nowrap">
          <span className="pl-2.5 pr-1 text-sm font-semibold">WhatsApp us</span>
        </span>
      </span>
    </a>
  );
}
