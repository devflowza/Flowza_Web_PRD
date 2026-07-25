import { useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { clients } from '../data';

/* Alternating wordmark treatments so the strip reads like real logos, not chips. */
const markStyles = [
  'font-display font-bold tracking-snug',
  'font-sans font-semibold uppercase tracking-[0.22em] text-[12px]',
  'font-display font-extrabold italic tracking-snug',
  'font-sans font-bold tracking-tight',
];

function MarqueeRow({ hidden }: { hidden?: boolean }) {
  return (
    <ul className="flex items-center gap-14 pr-14" aria-hidden={hidden || undefined}>
      {clients.map((c, i) => (
        <li
          key={c.name}
          className={`whitespace-nowrap text-[17px] text-ink-400 transition-colors duration-300 hover:text-ink-600 ${
            markStyles[i % markStyles.length]
          }`}
        >
          {c.name}
        </li>
      ))}
    </ul>
  );
}

/** Quiet wordmark marquee — social proof without the fake-logo chips. */
export default function ClientsMarquee() {
  const [paused, setPaused] = useState(false);
  return (
    <section className="border-y border-ink/[0.06] bg-white py-12" aria-label="Companies running on FlowZa">
      <p className="mb-8 text-center text-[11px] font-bold uppercase tracking-[0.24em] text-ink-400">
        Powering operations for teams across MEA &amp; India
      </p>
      <div className={`fx-marquee-mask fx-marquee-paused overflow-hidden ${paused ? 'fx-marquee-stopped' : ''}`}>
        <div className="fx-marquee flex w-max">
          <MarqueeRow />
          <MarqueeRow hidden />
        </div>
      </div>
      <div className="mt-5 flex justify-center">
        <button
          onClick={() => setPaused((v) => !v)}
          aria-pressed={paused}
          className="flex h-9 w-9 items-center justify-center rounded-full text-ink-400 ring-1 ring-ink/[0.08] transition-all duration-300 ease-swift hover:text-ink hover:ring-ink/25"
          aria-label={paused ? 'Play client marquee' : 'Pause client marquee'}
        >
          {paused ? <Play size={13} /> : <Pause size={13} />}
        </button>
      </div>
    </section>
  );
}
