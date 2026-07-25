import { clients } from '../data';

/* Alternating wordmark treatments so the strip reads like real logos, not chips. */
const markStyles = [
  'font-display font-bold tracking-snug',
  'font-sans font-semibold uppercase tracking-[0.22em] text-[12px]',
  'font-display font-extrabold italic tracking-snug',
  'font-sans font-bold tracking-tight',
];

/** Quiet wordmark marquee — social proof without the fake-logo chips. */
export default function ClientsMarquee() {
  const row = [...clients, ...clients];
  return (
    <section className="border-y border-ink/[0.06] bg-white py-12" aria-label="Companies running on FlowZa">
      <p className="mb-8 text-center text-[11px] font-bold uppercase tracking-[0.24em] text-ink-300">
        Powering operations for teams across MEA &amp; India
      </p>
      <div className="fx-marquee-mask fx-marquee-paused overflow-hidden">
        <ul className="fx-marquee flex w-max items-center gap-14 pr-14">
          {row.map((c, i) => (
            <li
              key={`${c.name}-${i}`}
              className={`whitespace-nowrap text-[17px] text-ink-300 transition-colors duration-300 hover:text-ink-500 ${
                markStyles[i % markStyles.length]
              }`}
            >
              {c.name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
