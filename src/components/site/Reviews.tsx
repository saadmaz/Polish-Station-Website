import { useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const reviews = [
  { name: "Marcus Holloway", car: "Porsche 911 Turbo S", text: "Picked up my car looking better than the day I bought it. The ceramic coating depth is unreal — water beads off like glass marbles. Worth every cent.", initials: "MH" },
  { name: "Selena Cortez", car: "Mercedes G63 AMG", text: "Polish Station treats your car like it's their own. Total transparency throughout the process and the finish is flawless under any light.", initials: "SC" },
  { name: "Devon Pierce", car: "Tesla Model S Plaid", text: "Paint correction removed swirls I'd lived with for years. The car looks deeper, wetter, and the orange ambient glow of their studio is something else.", initials: "DP" },
  { name: "Anya Reyes", car: "BMW M4 Competition", text: "These guys are obsessed in the best way. Multiple lighting inspections, photos at every stage. The standard is just on a different level.", initials: "AR" },
];

export function Reviews() {
  const [idx, setIdx] = useState(0);
  const r = reviews[idx];

  return (
    <section className="section-padding relative">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-12 text-center">
          <div className="eyebrow mb-4 justify-center">
            <span className="h-px w-8 bg-primary" /> Reviews
          </div>
          <h2 className="font-display text-4xl font-bold uppercase leading-tight md:text-6xl">
            From <span className="text-gradient-primary">enthusiasts.</span>
          </h2>
        </div>

        <div className="relative overflow-hidden rounded-3xl glass-strong p-10 md:p-14">
          <Quote className="absolute -right-4 -top-4 h-40 w-40 text-primary/10" strokeWidth={1} />

          <div className="flex gap-0.5 text-primary">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-current" />
            ))}
          </div>

          <p className="relative mt-8 font-display text-2xl leading-snug text-foreground md:text-3xl">
            "{r.text}"
          </p>

          <div className="mt-10 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-primary to-primary/40 font-display font-bold text-primary-foreground">
                {r.initials}
              </div>
              <div>
                <div className="font-display font-bold uppercase tracking-wide">
                  {r.name}
                </div>
                <div className="text-xs text-muted-foreground">{r.car}</div>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setIdx((i) => (i - 1 + reviews.length) % reviews.length)}
                className="grid h-11 w-11 place-items-center rounded-full glass hover:bg-primary hover:text-primary-foreground transition"
                aria-label="Previous"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => setIdx((i) => (i + 1) % reviews.length)}
                className="grid h-11 w-11 place-items-center rounded-full glass hover:bg-primary hover:text-primary-foreground transition"
                aria-label="Next"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="mt-8 flex justify-center gap-1.5">
            {reviews.map((_, i) => (
              <span
                key={i}
                className={`h-1 rounded-full transition-all ${
                  i === idx ? "w-8 bg-primary" : "w-2 bg-border"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
