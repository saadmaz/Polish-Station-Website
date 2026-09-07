import { useEffect, useRef } from "react";
import heroCar from "@/assets/hero-car.webp";

const ORANGE = "#D20B0B"; // Polish Station brand red, sampled from the logo

const reasons = [
  { n: "01", title: "Paint Depth Analysis",   desc: "We measure every panel before touching it." },
  { n: "02", title: "Certified Technicians",  desc: "Thousands of hours. Zero shortcuts." },
  { n: "03", title: "Premium-Grade Products", desc: "Only the coatings your paint deserves." },
  { n: "04", title: "Multi-Light Inspection", desc: "Nothing leaves without a flawless sign-off." },
];

export function DiagonalCarSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const carRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Below xl the diagonal split is replaced by a simple stacked layout (see JSX) — skip the scroll rig entirely.
    if (window.innerWidth < 1280) return;
    const section = sectionRef.current;
    const car     = carRef.current;
    if (!section || !car) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // Skip the drive-in scroll-jack; park the car in its resting position immediately.
      car.style.transform = "translateX(0vw) scale(1)";
      return;
    }
    let raf = 0;

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect     = section.getBoundingClientRect();
        const vh       = window.innerHeight;
        const total    = rect.height - vh;
        const scrolled = Math.max(0, -rect.top);
        const p        = Math.min(1, scrolled / total);

        // Smooth ease-out deceleration
        const ease  = 1 - Math.pow(1 - p, 2.6);

        // Car enters from the RIGHT side of the dark section → drives LEFT to park
        // Front of car (left side of image) leads the motion — correct direction
        const tx    = 55 * (1 - ease);  // vw: starts 55vw to the right, ends at 0
        const scale = 0.80 + 0.20 * ease;

        car.style.transform = `translateX(${tx}vw) scale(${scale})`;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("scroll", onScroll); };
  }, []);

  return (
    <>
      {/* ── Diagonal split — xl screens and up only; the fixed clip-path        ──
         percentages below only stay clear of the text/car at wide viewports. ── */}
      <section
        ref={sectionRef}
        data-diagonal-section
        style={{ minHeight: "250vh" }}
        className="relative hidden xl:block"
      >
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* ── WHITE left half ──────────────────────────────────── */}
        <div className="absolute inset-0" style={{ background: "#FFFFFF" }} />

        {/* ── BLACK right half ─────────────────────────────────── */}
        <div
          className="absolute inset-0"
          style={{
            background: "#000000",
            clipPath: "polygon(54% 0%, 100% 0%, 100% 100%, 20% 100%)",
          }}
        />

        {/* Orange glow pocket behind car */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            clipPath: "polygon(54% 0%, 100% 0%, 100% 100%, 20% 100%)",
            background:
              "radial-gradient(ellipse 55% 50% at 75% 55%, rgba(210,11,11,0.10) 0%, rgba(210,11,11,0.03) 50%, transparent 70%)",
          }}
        />

        {/* Orange diagonal stripe on the boundary */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: ORANGE,
            clipPath: "polygon(53.6% 0%, 54.4% 0%, 20.8% 100%, 19.8% 100%)",
          }}
        />

        {/* ── TEXT — left side ─────────────────────────────────── */}
        <div
          className="absolute top-1/2 z-20 -translate-y-1/2"
          style={{ left: "clamp(2rem, 5vw, 5rem)", maxWidth: "380px" }}
        >
          <div className="mb-6 flex items-center gap-3">
            <span className="block h-px w-8" style={{ background: ORANGE }} />
            <span className="text-[10px] font-black uppercase tracking-[0.4em]" style={{ color: ORANGE }}>
              Our Advantage
            </span>
          </div>

          <h2
            className="font-display font-extrabold leading-[0.95]"
            style={{ fontSize: "clamp(3rem, 5vw, 4.4rem)" }}
          >
            <span style={{ color: "#000000" }}>Why</span>
            <br />
            <span style={{ color: ORANGE }}>is it</span>
            <br />
            <span style={{ color: ORANGE }}>worth it?</span>
          </h2>

          <p className="mt-5 text-sm leading-relaxed" style={{ color: "#333333", maxWidth: "290px" }}>
            Because your paint deserves precision, not guesswork.
          </p>

          <ul className="mt-8 space-y-[18px]">
            {reasons.map((r) => (
              <li key={r.n} className="flex items-start gap-[14px]">
                <span
                  className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[9px] font-black"
                  style={{
                    background: "rgba(210,11,11,0.10)",
                    color: ORANGE,
                    border: `1.5px solid ${ORANGE}`,
                    minWidth: "24px",
                  }}
                >
                  {r.n}
                </span>
                <div>
                  <p className="text-[13px] font-bold uppercase tracking-wide leading-tight" style={{ color: "#000000" }}>
                    {r.title}
                  </p>
                  <p className="mt-[3px] text-[12px] leading-snug" style={{ color: "#444444" }}>
                    {r.desc}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex items-center gap-3">
            <span className="block h-[2px] w-10 rounded-full" style={{ background: ORANGE }} />
            <span className="text-[9px] font-bold uppercase tracking-[0.35em]" style={{ color: ORANGE }}>
              Polish Station
            </span>
          </div>
        </div>

        {/* ── CAR — clipped to the dark section polygon ────────── */}
        {/*
         * The clip-path on this wrapper matches the dark section exactly.
         * The car is physically impossible to show in the white area.
         * Car enters from the right (tx: 55vw → 0), front-facing-left leads.
         */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ clipPath: "polygon(54% 0%, 100% 0%, 100% 100%, 20% 100%)" }}
        >
          {/* Anchor: centred in the dark half */}
          <div
            className="absolute"
            style={{ left: "71%", top: "50%", transform: "translateX(-50%) translateY(-50%)" }}
          >
            <div
              ref={carRef}
              style={{
                willChange: "transform",
                transform: "translateX(55vw) scale(0.80)",
              }}
            >
              <img
                src={heroCar}
                alt="Premium car detailing"
                width={1920}
                height={1080}
                loading="lazy"
                decoding="async"
                draggable={false}
                style={{
                  width: "860px",
                  maxWidth: "none",
                  display: "block",
                  userSelect: "none",
                  filter: "brightness(1.08) contrast(1.06) saturate(1.1)",
                  maskImage: [
                    "linear-gradient(to right,  transparent 2%, black 8%, black 92%, transparent 98%)",
                    "linear-gradient(to bottom, black 0%,   black 60%, rgba(0,0,0,0.4) 70%, transparent 78%)",
                  ].join(", "),
                  WebkitMaskImage: [
                    "linear-gradient(to right,  transparent 2%, black 8%, black 92%, transparent 98%)",
                    "linear-gradient(to bottom, black 0%,   black 60%, rgba(0,0,0,0.4) 70%, transparent 78%)",
                  ].join(", "),
                  maskComposite: "intersect",
                  WebkitMaskComposite: "destination-in",
                }}
              />
            </div>
          </div>
        </div>

        {/* Bottom-right stamp */}
        <div
          className="absolute bottom-8 right-10 z-20 text-right"
          style={{ color: "rgba(210,11,11,0.35)" }}
        >
          <div className="text-[10px] font-bold uppercase tracking-[0.38em]">Polish Station</div>
          <div className="mt-0.5 text-[9px] tracking-[0.25em]" style={{ color: "rgba(255,255,255,0.15)" }}>
            Premium Detailing
          </div>
        </div>

        {/* Corner dots */}
        <div className="absolute top-8 right-10 flex items-center gap-[6px]">
          {[1, 0.5, 0.2].map((o, i) => (
            <span
              key={i}
              className="block rounded-full"
              style={{ width: "6px", height: "6px", background: `rgba(210,11,11,${o})` }}
            />
          ))}
        </div>

      </div>
      </section>

      {/* ── Stacked fallback — below xl, where the diagonal split has no room ── */}
      <section className="section-padding relative xl:hidden">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-8 bg-primary" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">
              Our Advantage
            </span>
          </div>

          <h2 className="font-display text-4xl font-extrabold uppercase leading-[0.95] sm:text-5xl">
            Why<br />
            <span className="text-primary">is it</span><br />
            <span className="text-primary">worth it?</span>
          </h2>

          <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
            Because your paint deserves precision, not guesswork.
          </p>

          <div className="mt-8 overflow-hidden rounded-2xl">
            <img
              src={heroCar}
              alt="Premium car detailing"
              width={1920}
              height={1080}
              loading="lazy"
              decoding="async"
              draggable={false}
              className="h-56 w-full object-cover sm:h-72"
              style={{ filter: "brightness(1.08) contrast(1.06) saturate(1.1)" }}
            />
          </div>

          <ul className="mt-8 grid gap-x-8 gap-y-5 sm:grid-cols-2">
            {reasons.map((r) => (
              <li key={r.n} className="flex items-start gap-[14px]">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[9px] font-black text-primary ring-1 ring-primary">
                  {r.n}
                </span>
                <div>
                  <p className="text-[13px] font-bold uppercase tracking-wide leading-tight">{r.title}</p>
                  <p className="mt-[3px] text-[12px] leading-snug text-muted-foreground">{r.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
