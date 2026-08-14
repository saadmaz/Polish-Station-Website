import { useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import generatedReviews from "@/lib/data/reviews.generated.json";

type Review = { name: string; rating: number; text: string; relativeTime: string };

const reviews = generatedReviews as Review[];

const GOOGLE_REVIEWS_URL =
  "https://www.google.com/maps/search/?api=1&query=Polish+Station+Dehiwala";

export function Reviews() {
  const [idx, setIdx] = useState(0);

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

        {reviews.length === 0 ? (
          <div className="rounded-3xl glass-strong p-10 text-center md:p-14">
            <p className="text-muted-foreground">
              Our Google reviews are being synced - in the meantime, see them directly.
            </p>
            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-wider text-primary-foreground shadow-glow-primary transition-transform hover:scale-105"
            >
              Read our reviews on Google
            </a>
          </div>
        ) : (
          <div
            className="relative overflow-hidden rounded-3xl glass-strong p-10 md:p-14"
            aria-live="polite"
          >
            <Quote className="absolute -right-4 -top-4 h-40 w-40 text-primary/10" strokeWidth={1} />

            <div className="flex gap-0.5 text-primary">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${i < reviews[idx].rating ? "fill-current" : "fill-none opacity-30"}`}
                />
              ))}
            </div>

            <p className="relative mt-8 font-display text-2xl leading-snug text-foreground md:text-3xl">
              "{reviews[idx].text}"
            </p>

            <div className="mt-10 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-primary to-primary/40 font-display font-bold text-primary-foreground">
                  {reviews[idx].name
                    .split(" ")
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join("")}
                </div>
                <div>
                  <div className="font-display font-bold uppercase tracking-wide">
                    {reviews[idx].name}
                  </div>
                  <div className="text-xs text-muted-foreground">{reviews[idx].relativeTime}</div>
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

            <div className="mt-6 text-center">
              <a
                href={GOOGLE_REVIEWS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold uppercase tracking-widest text-primary hover:underline"
              >
                See all reviews on Google
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
