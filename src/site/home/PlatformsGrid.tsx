import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SectionHeading from '../SectionHeading';
import Reveal from '../Reveal';
import { landingProducts } from '../data';

/** Image-tile grid of the seven platforms — the "recover from any device" pattern, adapted. */
export default function PlatformsGrid() {
  return (
    <section id="platforms" className="scroll-mt-28 py-20 sm:py-24 px-4 sm:px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          badge="Our Platforms"
          title="Seven Systems. One Operating Fabric."
          subtitle="Purpose-built AI platforms for every business vertical — each one deep enough to run your operation, all connected to the same fabric."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {landingProducts.map((p, i) => {
            const Icon = p.icon;
            return (
              <Reveal key={p.id} delay={(i % 3) * 90}>
                <Link
                  to={`/products/${p.id}`}
                  className="group relative block rounded-2xl overflow-hidden bg-navy-900 shadow-[0_4px_20px_rgba(15,23,42,0.1)] hover:shadow-[0_16px_44px_rgba(15,23,42,0.22)] hover:-translate-y-1 transition-all duration-300 h-[280px]"
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-60 group-hover:scale-[1.04] transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/95 via-navy-950/35 to-navy-950/10" />

                  {/* Icon badge */}
                  <span
                    className="absolute top-4 left-4 w-11 h-11 rounded-xl flex items-center justify-center backdrop-blur-md border border-white/25 text-white"
                    style={{ background: `${p.color}55` }}
                  >
                    <Icon size={18} />
                  </span>

                  {p.live && (
                    <span className="absolute top-5 right-4 inline-flex items-center gap-1.5 rounded-full bg-emerald-500/90 backdrop-blur-sm px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                      <span className="w-1.5 h-1.5 rounded-full bg-white" />
                      Live
                    </span>
                  )}

                  {/* Caption */}
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <p className="text-white font-bold text-xl leading-tight">{p.name}</p>
                    <p className="text-white/70 text-sm mt-1">{p.tagline}</p>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {p.badges.map((b) => (
                        <span
                          key={b}
                          className="rounded-full bg-white/12 backdrop-blur-sm border border-white/20 px-2.5 py-0.5 text-[11px] font-medium text-white/90"
                        >
                          {b}
                        </span>
                      ))}
                    </div>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-cyan-300 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                      Explore platform <ArrowRight size={13} />
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}

          {/* CTA tile to fill the 8th slot */}
          <Reveal delay={180}>
            <Link
              to="/contact"
              className="group flex flex-col items-center justify-center text-center rounded-2xl border-2 border-dashed border-blue-200 bg-blue-50/50 hover:bg-blue-50 hover:border-blue-300 transition-all duration-300 h-[280px] px-6"
            >
              <span className="w-12 h-12 rounded-xl fx-gradient flex items-center justify-center text-white mb-4 shadow-[0_6px_18px_rgba(37,99,235,0.35)]">
                <ArrowRight size={20} className="group-hover:translate-x-0.5 transition-transform" />
              </span>
              <p className="font-bold text-slate-900 text-lg">Not sure where to start?</p>
              <p className="text-gray-500 text-sm mt-2 max-w-[26ch]">
                Talk to us — we'll map your operation to the right platform.
              </p>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
