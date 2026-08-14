import { useEffect, useRef } from "react";
import { ArrowRight, Play, Star } from "lucide-react";
import heroCar from "@/assets/hero-car.jpg";
import { useCountUp } from "@/hooks/use-count-up";

/* ── Speed lines config ────────────────────────────────────────────────── */
const SPEED_LINES = [
  { top: "12%", width: 340, opacity: 0.13, dur: 1.4, delay: 0, h: 1 },
  { top: "24%", width: 200, opacity: 0.2, dur: 0.9, delay: 0.55, h: 0.5 },
  { top: "36%", width: 580, opacity: 0.07, dur: 2.3, delay: 0.2, h: 1.5 },
  { top: "47%", width: 160, opacity: 0.22, dur: 0.75, delay: 1.1, h: 1 },
  { top: "60%", width: 440, opacity: 0.11, dur: 1.7, delay: 0.35, h: 0.5 },
  { top: "70%", width: 250, opacity: 0.17, dur: 1.1, delay: 0.8, h: 1 },
  { top: "80%", width: 500, opacity: 0.08, dur: 2.0, delay: 0.95, h: 2 },
  { top: "20%", width: 290, opacity: 0.15, dur: 1.3, delay: 1.55, h: 0.5 },
];

/* ── Spinning wheel SVG ────────────────────────────────────────────────── */
function WheelRim({ size }: { size: number }) {
  const spokes = [0, 30, 60, 90, 120, 150];
  return (
    <svg viewBox="0 0 100 100" fill="none" width={size} height={size}>
      <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="2" opacity="0.8" />
      <circle cx="50" cy="50" r="28" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <circle cx="50" cy="50" r="8" fill="currentColor" opacity="0.5" />
      {spokes.map((a) => {
        const rad = (a * Math.PI) / 180;
        return (
          <line
            key={a}
            x1={50 + 9 * Math.cos(rad)}
            y1={50 + 9 * Math.sin(rad)}
            x2={50 + 44 * Math.cos(rad)}
            y2={50 + 44 * Math.sin(rad)}
            stroke="currentColor"
            strokeWidth="1.5"
            opacity="0.6"
          />
        );
      })}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => {
        const rad = (a * Math.PI) / 180;
        return (
          <line
            key={`t${a}`}
            x1={50 + 43 * Math.cos(rad)}
            y1={50 + 43 * Math.sin(rad)}
            x2={50 + 48 * Math.cos(rad)}
            y2={50 + 48 * Math.sin(rad)}
            stroke="currentColor"
            strokeWidth="2"
            opacity="0.5"
          />
        );
      })}
    </svg>
  );
}

export function Hero() {
  const imgRef = useRef<HTMLImageElement>(null);

  /* Parallax: background car drifts slower than scroll */
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (imgRef.current) {
          imgRef.current.style.transform = `scale(1.12) translateY(${window.scrollY * 0.28}px)`;
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Count-up stats */
  const s1 = useCountUp(500, 2000);
  const s2 = useCountUp(98, 1800);
  const s3 = useCountUp(5, 1400);
  const s4 = useCountUp(5, 1400);

  const stats = [
    { ref: s1.ref, count: s1.count, suffix: "+", label: "Cars Detailed" },
    { ref: s2.ref, count: s2.count, suffix: "%", label: "Satisfaction" },
    { ref: s3.ref, count: s3.count, suffix: "★", label: "Average Rating" },
    { ref: s4.ref, count: s4.count, suffix: "+", label: "Years Experience" },
  ];

  return (
    <section id="top" className="relative min-h-screen overflow-hidden">
      {/* ── Parallax background image ───────────────────────────────────── */}
      <div className="absolute inset-0">
        <img
          ref={imgRef}
          src={heroCar}
          alt="Luxury sports car under studio lights"
          width={1920}
          height={1080}
          fetchPriority="high"
          decoding="async"
          className="h-full w-full object-cover opacity-60"
          style={{ transformOrigin: "center 40%", willChange: "transform" }}
        />
        <div className="absolute inset-0 bg-linear-to-b from-background/60 via-background/35 to-background" />
        <div className="absolute inset-0 bg-linear-to-r from-background via-background/20 to-transparent" />
      </div>

      {/* ── Speed lines - motion-blur streaks ──────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {SPEED_LINES.map((l, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              top: l.top,
              left: 0,
              width: `${l.width}px`,
              height: `${l.h}px`,
              background: `linear-gradient(90deg, transparent, rgba(255,255,255,${l.opacity}), transparent)`,
              animation: `speed-line ${l.dur}s ease-in ${l.delay}s infinite`,
            }}
          />
        ))}
      </div>

      {/* ── Spinning wheel decorations ──────────────────────────────────── */}
      <div
        className="pointer-events-none absolute bottom-28 left-6 hidden text-primary opacity-20 lg:block"
        style={{ animation: "wheel-spin 6s linear infinite" }}
      >
        <WheelRim size={88} />
      </div>
      <div
        className="pointer-events-none absolute bottom-32 right-10 hidden text-primary opacity-12 lg:block"
        style={{ animation: "wheel-spin 4.5s linear infinite reverse" }}
      >
        <WheelRim size={64} />
      </div>

      {/* ── Atmospheric orange glows ────────────────────────────────────── */}
      <div className="pointer-events-none absolute -right-32 top-1/3 h-[400px] w-[600px] rounded-full bg-primary/28 blur-[120px] animate-orange-pulse" />
      <div className="pointer-events-none absolute left-1/4 bottom-1/4 h-[300px] w-[300px] rounded-full bg-primary/10 blur-[100px]" />

      {/* ── Angled light beam ───────────────────────────────────────────── */}
      <div
        className="pointer-events-none absolute inset-y-0 left-1/3 w-px bg-linear-to-b from-primary/0 via-primary/10 to-primary/0 blur-2xl"
        style={{ transform: "skewX(-18deg) scaleX(70)" }}
      />

      {/* ── Depth-layered particles ─────────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0">
        {Array.from({ length: 22 }).map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${(i * 53) % 100}%`,
              top: `${(i * 37) % 100}%`,
              width: `${1.5 + (i % 3) * 1.5}px`,
              height: `${1.5 + (i % 3) * 1.5}px`,
              background: i % 4 === 0 ? "rgba(210,11,11,0.55)" : "rgba(255,255,255,0.22)",
              filter: i % 5 === 0 ? "blur(1px)" : "none",
              animation: `float-particle ${6 + (i % 5)}s ease-in-out ${i * 0.3}s infinite`,
            }}
          />
        ))}
      </div>

      {/* ── Floating 3D rating badge ─────────────────────────────────────── */}
      <div className="pointer-events-none absolute right-8 top-32 hidden lg:block animate-float-3d">
        <div className="glass depth-shadow-lift rounded-2xl p-5 w-48">
          <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/30 to-transparent rounded-t-2xl" />
          {/* Periodic gloss sweep on the badge */}
          <div
            className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none"
            aria-hidden
          >
            <div
              className="absolute inset-y-0 w-12 bg-linear-to-r from-transparent via-white/15 to-transparent"
              style={{ animation: "gloss-sweep 5s ease-in-out 1s infinite" }}
            />
          </div>
          <div className="relative flex items-center gap-2 mb-3">
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-primary/20 text-primary">
              <Star className="h-3.5 w-3.5 fill-primary" />
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
              Top Rated
            </span>
          </div>
          <div className="relative font-display text-3xl font-black text-gradient-silver leading-none">
            5.0
          </div>
          <div className="relative mt-1.5 flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-3 w-3 fill-primary text-primary" />
            ))}
          </div>
          <div className="relative mt-2.5 text-[10px] leading-snug text-muted-foreground">
            98% client satisfaction
          </div>
        </div>
      </div>

      {/* ── Main content ────────────────────────────────────────────────── */}
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
            Premium automotive detailing engineered to keep your vehicle showroom ready - every
            panel, every surface, every detail.
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

        {/* ── Count-up stat cards ─────────────────────────────────────────── */}
        <div className="relative mt-20 grid grid-cols-2 gap-3 md:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={i}
              ref={s.ref as React.RefObject<HTMLDivElement>}
              className="group relative overflow-hidden rounded-xl glass depth-shadow px-6 py-7 transition-all duration-300 hover:-translate-y-1.5 cursor-default"
              style={{ animationDelay: `${0.5 + i * 0.1}s` }}
            >
              <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />
              <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
                <div
                  className="absolute inset-y-0 w-10 bg-linear-to-r from-transparent via-white/08 to-transparent"
                  style={{ animation: `gloss-sweep 6s ease-in-out ${i * 1.2}s infinite` }}
                />
              </div>
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 h-20 w-20 rounded-full bg-primary/0 blur-2xl transition-all duration-500 group-hover:bg-primary/18 pointer-events-none" />
              <div className="relative font-display text-3xl font-bold text-gradient-primary md:text-4xl">
                {s.count}
                {s.suffix}
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
