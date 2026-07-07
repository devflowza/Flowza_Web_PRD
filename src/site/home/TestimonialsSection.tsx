import { Star } from 'lucide-react';
import Reveal from '../Reveal';
import { homeTestimonials } from '../data';

/** Star-rated quote cards from operators running on FlowZa. */
export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="scroll-mt-28 py-20 sm:py-24 px-4 sm:px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <Reveal className="text-center mb-12 sm:mb-16">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold mb-5 bg-blue-50 text-blue-600">
            Customer Stories
          </span>
          <h2 className="font-bold text-3xl sm:text-4xl lg:text-[44px] leading-tight tracking-tight text-slate-900">
            What Our Clients Say
          </h2>
          <span className="mt-4 inline-flex items-center gap-2">
            <span className="flex gap-0.5" aria-label="5 out of 5 stars">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={18} className="text-amber-400 fill-amber-400" />
              ))}
            </span>
            <span className="text-gray-500 text-sm font-medium">Trusted by 100+ businesses across MEA &amp; India</span>
          </span>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-5">
          {homeTestimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 100}>
              <figure className="h-full flex flex-col rounded-2xl bg-white border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                <span className="flex gap-0.5 mb-4" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} size={14} className="text-amber-400 fill-amber-400" />
                  ))}
                </span>
                <blockquote className="text-slate-700 text-[15px] leading-relaxed flex-1">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-6 pt-5 border-t border-gray-100 flex items-center gap-3">
                  <span
                    className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                    style={{ background: t.color }}
                  >
                    {t.initials}
                  </span>
                  <span>
                    <span className="block font-semibold text-slate-900 text-sm">{t.name}</span>
                    <span className="block text-xs text-gray-500">
                      {t.role} · {t.company}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
