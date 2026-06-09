import { useState } from "react";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g5 from "@/assets/gallery-5.jpg";
import g6 from "@/assets/gallery-6.jpg";

const items = [
  { src: g1, cat: "Sports", label: "Silver Coupe — Cut & Polish", h: "row-span-2" },
  { src: g2, cat: "SUV", label: "Black SUV — Ceramic", h: "" },
  { src: g3, cat: "Interior", label: "Leather Detail", h: "" },
  { src: g4, cat: "Sedan", label: "White Sedan — Paint Correction", h: "row-span-2" },
  { src: g5, cat: "4x4", label: "Matte 4x4 Protection", h: "" },
  { src: g6, cat: "Detail", label: "Headlight Restoration", h: "" },
];

const cats = ["All", "Sports", "SUV", "Sedan", "4x4", "Interior", "Detail"];

export function Gallery() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? items : items.filter((i) => i.cat === active);

  return (
    <section id="gallery" className="section-padding relative">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <div className="eyebrow mb-4">
              <span className="h-px w-8 bg-primary" /> Gallery
            </div>
            <h2 className="font-display text-4xl font-bold uppercase leading-tight md:text-6xl">
              Recent <span className="text-gradient-primary">work.</span>
            </h2>
          </div>

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
        </div>

        <div className="grid auto-rows-[220px] grid-cols-2 gap-4 md:grid-cols-3">
          {filtered.map((it, i) => (
            <div
              key={i}
              className={`group relative overflow-hidden rounded-2xl ${it.h}`}
            >
              <img
                src={it.src}
                alt={it.label}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent opacity-60 transition-opacity group-hover:opacity-90" />
              <div className="absolute inset-x-0 bottom-0 p-5 translate-y-2 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                  {it.cat}
                </div>
                <div className="mt-1 font-display text-base font-bold">{it.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
