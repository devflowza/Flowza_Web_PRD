import { useState } from 'react';
import { ChevronDown, MessageCircle } from 'lucide-react';
import SectionHeading from '../SectionHeading';
import Reveal from '../Reveal';
import { faqItems, WHATSAPP_URL } from '../data';

/** Accordion FAQ assembled from existing site facts. */
export default function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-28 py-20 sm:py-24 px-4 sm:px-6 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <SectionHeading
          badge="FAQ"
          title="Frequently Asked Questions"
          subtitle="Everything you need to know about running your business on Flowza."
        />

        <div className="flex flex-col gap-3">
          {faqItems.map((item, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={item.q} delay={i * 60}>
                <div
                  className={`rounded-2xl border bg-white transition-all duration-300 ${
                    isOpen ? 'border-blue-200 shadow-[0_10px_30px_rgba(37,99,235,0.1)]' : 'border-gray-200 shadow-sm'
                  }`}
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-4 text-left px-6 py-5"
                    aria-expanded={isOpen}
                  >
                    <span className="font-semibold text-slate-900">{item.q}</span>
                    <span
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                        isOpen ? 'bg-blue-600 text-white rotate-180' : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      <ChevronDown size={16} />
                    </span>
                  </button>
                  <div
                    className={`grid transition-all duration-300 ${
                      isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-6 text-gray-500 text-sm leading-relaxed">{item.a}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-10 text-center">
          <p className="text-gray-500 text-sm mb-4">Still have questions?</p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-[#25d366] text-white text-sm font-semibold px-6 py-3.5 shadow-[0_6px_18px_rgba(37,211,102,0.35)] hover:shadow-[0_8px_24px_rgba(37,211,102,0.5)] hover:-translate-y-px transition-all"
          >
            <MessageCircle size={16} />
            Chat With Us on WhatsApp
          </a>
        </Reveal>
      </div>
    </section>
  );
}
