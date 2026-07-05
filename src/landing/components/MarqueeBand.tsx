const words = ['Finance', 'Logistics', 'Wellness', 'Fleet', 'QR', 'POS', 'People'];

export default function MarqueeBand() {
  const row = (key: string, hidden: boolean) => (
    <div key={key} className="fz-marquee-track" aria-hidden={hidden}>
      {words.map((w) => (
        <span key={w} className="flex items-center">
          <span className="fz-marquee-item">{w}</span>
          <span className="fz-marquee-dot" />
        </span>
      ))}
    </div>
  );

  return (
    <section className="fz-hairline-t fz-hairline-b py-6 sm:py-8" aria-label="Flowza verticals">
      <div className="fz-marquee">
        {row('a', false)}
        {row('b', true)}
      </div>
    </section>
  );
}
