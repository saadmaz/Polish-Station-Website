import { ArrowRight, Play, Star } from "lucide-react";
import heroCar from "@/assets/hero-car.jpg";

export function Hero() {
  return (
    <section id="top" className="relative min-h-screen overflow-hidden">
      {/* Background image — very slight scale-up so perspective crop doesn't show edges */}
      <div className="absolute inset-0">
        <img
          src={heroCar}
          alt="Luxury sports car under studio lights"
          width={1920}
          height={1080}
          className="h-full w-full object-cover opacity-65"
          style={{ transform: "scale(1.06)", transformOrigin: "center 40%" }}
        />
        <div className="absolute inset-0 bg-linear-to-b from-background/60 via-background/40 to-background" />
        <div className="absolute inset-0 bg-linear-to-r from-background via-background/20 to-transparent" />
      </div>

      {/* Angled light beam — skewed plane of light across the scene */}
      <div
        className="pointer-events-none absolute inset-y-0 left-1/3 w-px bg-linear-to-b from-primary/0 via-primary/12 to-primary/0 blur-2xl"
        style={{ transform: "skewX(-18deg) scaleX(60)" }}
      />

      {/* Primary orange atmospheric glow */}
      <div className="pointer-events-none absolute -right-32 top-1/3 h-[400px] w-[600px] rounded-full bg-primary/30 blur-[120px] animate-orange-pulse" />
      <div className="pointer-events-none absolute left-1/4 bottom-1/4 h-[300px] w-[300px] rounded-full bg-primary/10 blur-[100px]" />

      {/* Depth-layered particles — varying sizes & colours for Z illusion */}
      <div className="pointer-events-none absolute inset-0">
        {Array.from({ length: 22 }).map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${(i * 53) % 100}%`,
              top: `${(i * 37) % 100}%`,
              width:  `${1.5 + (i % 3) * 1.5}px`,
              height: `${1.5 + (i % 3) * 1.5}px`,
              background: i % 4 === 0 ? "rgba(255,106,0,0.55)" : "rgba(255,255,255,0.25)",
              filter: i % 5 === 0 ? "blur(1px)" : "none",
              animation: `float-particle ${6 + (i % 5)}s ease-in-out ${i * 0.3}s infinite`,
            }}
          />
        ))}
      </div>

      {/* ── Floating 3D badge (top-right) ─────────────────────────────────── */}
      <div className="pointer-events-none absolute right-8 top-32 hidden lg:block animate-float-3d">
        <div className="glass depth-shadow-lift rounded-2xl p-5 w-48">
          {/* Metallic edge */}
          <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/30 to-transparent rounded-t-2xl" />
          <div className="flex items-center gap-2 mb-3">
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-primary/20 text-primary">
              <Star className="h-3.5 w-3.5 fill-primary" />
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
              Top Rated
            </span>
          </div>
          <div className="font-display text-3xl font-black text-gradient-silver leading-none">
            5.0
          </div>
          <div className="mt-1.5 flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-3 w-3 fill-primary text-primary" />
            ))}
          </div>
          <div className="mt-2.5 text-[10px] leading-snug text-muted-foreground">
            98% client satisfaction
          </div>
        </div>
      </div>

      {/* ── Main content ──────────────────────────────────────────────────── */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 pt-28 pb-20">
        <div className="max-w-3xl animate-fade-up">
          <div className="eyebrow mb-6">
            <span className="h-px w-8 bg-primary" />
            Premium Automotive Studio
          </div>

          <h1 className="font-display text-5xl font-bold uppercase leading-[0.95] tracking-tight md:text-7xl lg:text-8xl">
            <span className="text-gradient-silver">Restore.</span>
            <br />
            <span className="text-gradient-silver">Protect.</span>
            <br />
            <span className="text-gradient-primary">Perfect.</span>
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Premium automotive detailing engineered to keep your vehicle
            showroom ready — every panel, every surface, every detail.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 text-sm font-semibold uppercase tracking-wider text-primary-foreground shadow-glow-primary transition-all hover:scale-105"
            >
              Book Appointment
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#services"
              className="group inline-flex items-center gap-3 rounded-full glass px-7 py-4 text-sm font-semibold uppercase tracking-wider text-foreground transition-all hover:bg-card/80"
            >
              <span className="grid h-6 w-6 place-items-center rounded-full bg-primary/20">
                <Play className="h-3 w-3 fill-primary text-primary" />
              </span>
              View Services
            </a>
          </div>
        </div>

        {/* ── Stats — individual 3D cards ─────────────────────────────────── */}
        <div className="relative mt-20 grid grid-cols-2 gap-3 md:grid-cols-4">
          {[
            { value: "500+", label: "Cars Detailed" },
            { value: "98%",  label: "Satisfaction" },
            { value: "5★",   label: "Average Rating" },
            { value: "5+",   label: "Years Experience" },
          ].map((s, i) => (
            <div
              key={s.label}
              className="group relative overflow-hidden rounded-xl glass depth-shadow px-6 py-7 transition-all duration-300 hover:-translate-y-1.5 cursor-default"
              style={{ animationDelay: `${0.6 + i * 0.1}s` }}
            >
              {/* Metallic edge */}
              <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />
              {/* Subtle bloom on hover */}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 h-20 w-20 rounded-full bg-primary/0 blur-2xl transition-all duration-500 group-hover:bg-primary/20 pointer-events-none" />
              <div className="relative font-display text-3xl font-bold text-gradient-primary md:text-4xl">
                {s.value}
              </div>
              <div className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-muted-foreground">
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <span className="relative h-10 w-px bg-border overflow-hidden">
          <span className="absolute inset-x-0 top-0 h-3 bg-primary animate-[shimmer_2s_ease-in-out_infinite]" />
        </span>
      </div>
    </section>
  );
}
