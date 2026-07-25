import { useState } from 'react';
import { Plus, MessageCircle } from 'lucide-react';
import Reveal from '../Reveal';
import { faqItems, WHATSAPP_URL } from '../data';

/** Two-column FAQ: sticky heading + hairline list with plus-fold rows. */
export default function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-24 bg-mist px-4 py-24 sm:px-6 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1fr_1.5fr] lg:gap-24">
        {/* Sticky intro */}
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Reveal>
            <span className="eyebrow">FAQ</span>
            <h2 className="display-title mt-5 text-[2rem] text-ink sm:text-[2.6rem] lg:text-[3rem]">
              Questions, answered.
            </h2>
            <p className="mt-5 max-w-sm text-base leading-relaxed text-ink-500">
              Everything you need to know about running your business on FlowZa. Can't
              find it here? We answer fastest on WhatsApp.
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary btn-md group mt-8 inline-flex"
            >
              <MessageCircle size={15} className="text-emerald-600" />
              Chat with us
            </a>
          </Reveal>
        </div>

        {/* Fold list */}
        <div>
          {faqItems.map((item, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={item.q} delay={i * 50}>
                <div className={`border-t border-ink/[0.09] ${i === faqItems.length - 1 ? 'border-b' : ''}`}>
                  <h3>
                    <button
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="group flex w-full items-center justify-between gap-6 py-6 text-left sm:py-7"
                      aria-expanded={isOpen}
                    >
                      <span
                        className={`font-display text-lg font-semibold tracking-snug transition-colors duration-300 sm:text-xl ${
                          isOpen ? 'text-ink' : 'text-ink-600 group-hover:text-ink'
                        }`}
                      >
                        {item.q}
                      </span>
                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-500 ease-swift ${
                          isOpen ? 'rotate-45 bg-ink text-white' : 'bg-white text-ink-400 ring-1 ring-ink/[0.09] group-hover:ring-ink/25'
                        }`}
                        aria-hidden="true"
                      >
                        <Plus size={15} />
                      </span>
                    </button>
                  </h3>
                  <div
                    className={`grid transition-all duration-500 ease-swift ${
                      isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-2xl pb-7 pr-14 text-[15px] leading-relaxed text-ink-500">{item.a}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
