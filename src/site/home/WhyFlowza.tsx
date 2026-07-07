import SectionHeading from '../SectionHeading';
import Reveal from '../Reveal';
import { whyItems, heroStats, MANIFESTO } from '../data';

/** Value-prop cards + manifesto quote, followed by the blue gradient stats band. */
export default function WhyFlowza() {
  return (
    <>
      <section id="why-flowza" className="scroll-mt-28 py-20 sm:py-24 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            badge="Why FlowZa"
            title="Software That Disappears Into the Work"
            subtitle={MANIFESTO}
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {whyItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.title} delay={i * 90}>
                  <article className="h-full rounded-2xl bg-white border border-gray-200 p-6 shadow-sm hover:shadow-[0_14px_36px_rgba(15,23,42,0.1)] hover:-translate-y-1 transition-all duration-300">
                    <span
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                      style={{
                        background: `${item.color}14`,
                        border: `1px solid ${item.color}33`,
                        color: item.color,
                      }}
                    >
                      <Icon size={20} />
                    </span>
                    <h3 className="font-bold text-slate-900 text-lg mb-2.5">{item.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats band */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-600 py-16 px-4 sm:px-6">
        <div className="absolute inset-0 fx-grid opacity-40 pointer-events-none" style={{ filter: 'invert(1)' }} />
        <div className="relative max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
          {heroStats.map((s, i) => (
            <Reveal key={s.label} delay={i * 90} className="text-center">
              <p className="font-bold text-white text-4xl sm:text-5xl tracking-tight">{s.value}</p>
              <span className="block w-8 h-0.5 bg-cyan-300/80 mx-auto mt-3 mb-3 rounded-full" />
              <p className="text-blue-100 text-xs sm:text-sm font-semibold uppercase tracking-[0.15em]">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
