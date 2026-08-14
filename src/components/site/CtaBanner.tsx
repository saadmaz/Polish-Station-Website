import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import bg from "@/assets/cta-banner.jpg";
import { Reveal } from "@/components/ui/reveal";

export function CtaBanner() {
  const imgRef = useRef<HTMLImageElement>(null);

  /* Parallax - bg image drifts opposite to scroll within the section */
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = imgRef.current;
        if (!el) return;
        const section = el.closest("section") as HTMLElement | null;
        if (!section) return;
        const rect = section.getBoundingClientRect();
        const cx = rect.top + rect.height / 2;
        const vc = window.innerHeight / 2;
        const offset = (cx - vc) * 0.22;
        el.style.transform = `translateY(${offset}px) scale(1.12)`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="px-6 py-20">
      <Reveal variant="scale">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-4xl border border-border depth-shadow-lift">
          {/* Parallax background */}
          <img
            ref={imgRef}
            src={bg}
            alt="Detailing close-up"
            width={1920}
            height={800}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ willChange: "transform" }}
          />
          <div className="absolute inset-0 bg-linear-to-r from-background/95 via-background/70 to-background/40" />
          <div className="absolute -right-20 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-primary/30 blur-[120px]" />

          {/* Gloss sweep across the whole banner */}
          <div className="absolute inset-0 overflow-hidden rounded-4xl pointer-events-none">
            <div
              className="absolute inset-y-0 w-32 bg-linear-to-r from-transparent via-white/05 to-transparent"
              style={{ animation: "gloss-sweep 6s ease-in-out 1.5s infinite" }}
            />
          </div>

          {/* Top metallic edge */}
          <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />

          <div className="relative grid gap-10 p-10 md:grid-cols-2 md:p-20">
            <div>
              <div className="eyebrow mb-4">
                <span className="h-px w-8 bg-primary" /> Reserve a slot
              </div>
              <h2 className="font-display text-4xl font-bold uppercase leading-tight md:text-6xl">
                Your car deserves <span className="text-gradient-primary">better.</span>
              </h2>
            </div>
            <div className="flex flex-col justify-center gap-6 md:items-end">
              <p className="max-w-sm text-muted-foreground md:text-right">
                Book a professional detailing session today. Limited weekly bays ensure each car
                gets undivided attention.
              </p>
              <a
                href="/book"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold uppercase tracking-wider text-primary-foreground shadow-glow-primary transition-transform hover:scale-105"
              >
                Book Appointment
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
