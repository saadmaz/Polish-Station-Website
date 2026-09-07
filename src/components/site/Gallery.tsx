import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { TiltCard } from "@/components/ui/tilt-card";
import { Reveal } from "@/components/ui/reveal";
import items from "@/lib/data/gallery-images";

const cats = ["All", "Sports", "SUV", "Sedan", "4x4", "Interior", "Detail"];

export function Gallery({
  limit,
  hideFilters = false,
  hideHeading = false,
  showViewAll = false,
}: {
  limit?: number;
  hideFilters?: boolean;
  hideHeading?: boolean;
  showViewAll?: boolean;
}) {
  const [active, setActive] = useState("All");
  const source = active === "All" || hideFilters ? items : items.filter((i) => i.cat === active);
  const filtered = limit ? source.slice(0, limit) : source;

  return (
    <section id="gallery" className="section-padding relative">
      <div className="mx-auto max-w-7xl px-6">
        {(!hideHeading || !hideFilters) && (
          <Reveal variant="up">
            <div className="mb-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
              {!hideHeading && (
                <div className="max-w-2xl">
                  <div className="eyebrow mb-4">
                    <span className="h-px w-8 bg-primary" /> Gallery
                  </div>
                  <h2 className="font-display text-4xl font-bold uppercase leading-tight md:text-6xl">
                    Recent <span className="text-gradient-primary">work.</span>
                  </h2>
                </div>
              )}
              {!hideFilters && (
                <div className="flex flex-wrap gap-2">
                  {cats.map((c) => (
                    <button
                      key={c}
                      onClick={() => setActive(c)}
                      className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all ${
                        active === c
                          ? "bg-primary text-primary-foreground"
                          : "glass text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </Reveal>
        )}

        <div className="grid auto-rows-[220px] grid-cols-2 gap-4 md:grid-cols-3">
          {filtered.map((it, i) => (
            <Reveal key={i} variant="scale" delay={i * 60} className={it.h}>
              <TiltCard
                intensity={5}
                className="group relative h-full overflow-hidden rounded-2xl depth-shadow"
              >
                {/* Metallic edge */}
                <div className="absolute inset-x-0 top-0 z-10 h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />

                <img
                  src={it.src}
                  alt={it.label}
                  width={it.w}
                  height={it.h_}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-background via-background/30 to-transparent opacity-60 transition-opacity group-hover:opacity-90" />

                {/* Gloss sweep on hover - runs once then stops via animation-iteration-count trick */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <div
                    className="absolute inset-y-0 w-20 bg-linear-to-r from-transparent via-white/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100"
                    style={{ animation: `gloss-sweep 1.2s ease-out` }}
                  />
                </div>

                <div className="absolute inset-x-0 bottom-0 p-5 translate-y-2 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                    {it.cat}
                  </div>
                  <div className="mt-1 font-display text-base font-bold">{it.label}</div>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        {showViewAll && (
          <div className="mt-12 flex justify-center">
            <a
              href="/gallery"
              className="group inline-flex items-center gap-2 rounded-full glass px-7 py-3.5 text-sm font-semibold uppercase tracking-wider transition-all hover:bg-primary hover:text-primary-foreground"
            >
              View full gallery
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
