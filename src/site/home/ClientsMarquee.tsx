import { clients } from '../data';

/** Scrolling strip of client pills — social proof directly under the hero. */
export default function ClientsMarquee() {
  const row = [...clients, ...clients];
  return (
    <section className="py-10 bg-white border-y border-gray-100" aria-label="Our clients">
      <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-gray-400 mb-6">
        Powering operations for teams across MEA &amp; India
      </p>
      <div className="overflow-hidden fx-marquee-mask">
        <div className="flex w-max gap-4 fx-marquee">
          {row.map((c, i) => (
            <span
              key={`${c.name}-${i}`}
              className="inline-flex items-center gap-2.5 rounded-full bg-white border border-gray-200 pl-1.5 pr-4 py-1.5 shadow-sm whitespace-nowrap"
            >
              <span
                className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                style={{ background: c.color }}
              >
                {c.initials}
              </span>
              <span className="text-sm font-medium text-slate-700">{c.name}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
