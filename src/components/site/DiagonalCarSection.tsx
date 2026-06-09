import { useEffect, useRef } from "react";
import heroCar from "@/assets/hero-car.jpg";

const reasons = [
  { n: "01", title: "Paint Depth Analysis",   desc: "We measure every panel before touching it." },
  { n: "02", title: "Certified Technicians",  desc: "Thousands of hours. Zero shortcuts." },
  { n: "03", title: "Premium-Grade Products", desc: "Only the coatings your paint deserves." },
  { n: "04", title: "Multi-Light Inspection", desc: "Nothing leaves without a flawless sign-off." },
];

export function DiagonalCarSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const carRef     = useRef<HTMLDivElement>(null);
  const linesRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const car     = carRef.current;
    const lines   = linesRef.current;
    if (!section || !car) return;

    let raf = 0;

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect     = section.getBoundingClientRect();
        const vh       = window.innerHeight;
        const total    = rect.height - vh;
        const scrolled = Math.max(0, -rect.top);
        const p        = Math.min(1, scrolled / total);

        // Ease-out so car decelerates as it parks
        const ease = 1 - Math.pow(1 - p, 1.8);

        // Car anchor is at left: 68% (center of dark half).
        // Travel: translateX +55vw (off right edge) → -15vw (settled in dark half)
        // At final position: 68% - 15% = 53% center — right on the diagonal line
        const tx = 55 - 70 * ease;

        // Micro-bounce while moving (road feel), fades as car slows
        const moving = Math.max(0, 1 - ease * 2.5);
        const bounce = Math.sin(p * Math.PI * 8) * 6 * moving;

        // Slight nose-up at speed, flattens as it parks
        const rz = (1 - ease) * 2;

        car.style.transform = `translateX(${tx}vw) translateY(${bounce}px) rotateZ(${rz}deg)`;

        if (lines) {
          lines.style.opacity = String(Math.max(0, moving * 0.45));
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      data-diagonal-section
      style={{ minHeight: "240vh" }}
      className="relative"
    >
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* ── Background split ─────────────────────────────────────── */}
        <div className="absolute inset-0" style={{ background: "#F0EDEA" }} />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(170deg, #161616 0%, #0c0c0c 100%)",
            clipPath: "polygon(52% 0%, 100% 0%, 100% 100%, 18% 100%)",
          }}
        />
        {/* Diagonal edge depth */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(133deg, transparent 49%, rgba(0,0,0,0.25) 50%, transparent 52%)",
          }}
        />

        {/* Spotlight — where the car parks */}
        <div
          className="pointer-events-none absolute"
          style={{
            left: "55%",
            top: "45%",
            width: "600px",
            height: "400px",
            transform: "translate(-50%, -50%)",
            background:
              "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(212,137,10,0.07) 0%, transparent 70%)",
          }}
        />

        {/* ── Speed lines (fade with velocity) ─────────────────────── */}
        <div
          ref={linesRef}
          className="pointer-events-none absolute"
          style={{ right: "2%", top: "22%", width: "42%", height: "56%", overflow: "hidden", opacity: 0 }}
        >
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="absolute"
              style={{
                height: "1px",
                width: `${42 + i * 6}%`,
                right: 0,
                top: `${7 + i * 9.5}%`,
                background:
                  "linear-gradient(to left, transparent 0%, rgba(255,255,255,0.65) 50%, transparent 100%)",
                animation: `speed-line ${0.52 + i * 0.06}s linear ${i * 0.07}s infinite`,
              }}
            />
          ))}
        </div>

        {/* ── Text — light side ─────────────────────────────────────── */}
        <div className="absolute left-10 top-1/2 z-20 -translate-y-1/2 max-w-xs lg:left-16 lg:max-w-sm">
          <div
            className="mb-4 text-[10px] font-black uppercase tracking-[0.35em]"
            style={{ color: "#C8861A" }}
          >
            Our Advantage
          </div>
          <h2
            className="font-display text-5xl font-extrabold leading-[1.05] lg:text-6xl"
            style={{ color: "#111111" }}
          >
            Why is it{" "}
            <span style={{ color: "#D4890A" }}>worth it?</span>
          </h2>
          <p className="mt-4 text-sm leading-relaxed" style={{ color: "#666666" }}>
            Premium detailing is not a wash — it's a precision process.
          </p>
          <ul className="mt-7 space-y-5">
            {reasons.map((r) => (
              <li key={r.n} className="flex items-start gap-4">
                <span
                  className="mt-0.5 shrink-0 font-mono text-[10px] font-black"
                  style={{ color: "#D4890A" }}
                >
                  {r.n}
                </span>
                <div>
                  <div
                    className="text-sm font-bold uppercase tracking-wide"
                    style={{ color: "#111111" }}
                  >
                    {r.title}
                  </div>
                  <div className="mt-0.5 text-xs" style={{ color: "#888888" }}>
                    {r.desc}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Car — drives in from the right across the dark half ────── */}
        {/*
         * Two-div structure:
         *   outer: static anchor for centering (no will-change, no blend)
         *   carRef: receives scroll-driven translateX (will-change: transform)
         *
         * Background removal: CSS mask-image radial gradient vignettes the
         * dark studio background away, leaving only the car silhouette.
         * This is more reliable than mix-blend-mode which conflicts with
         * will-change: transform GPU compositing layers.
         */}
        <div
          className="absolute"
          style={{
            left: "68%",
            top: "52%",
            transform: "translateX(-50%) translateY(-50%)",
          }}
        >
          <div
            ref={carRef}
            style={{
              willChange: "transform",
              transform: "translateX(55vw)",
            }}
          >
            <img
              src={heroCar}
              alt="Premium detailing"
              draggable={false}
              style={{
                width: "820px",
                maxWidth: "none",
                userSelect: "none",
                display: "block",
                filter:
                  "brightness(1.12) contrast(1.08) drop-shadow(0 30px 60px rgba(0,0,0,0.9)) drop-shadow(0 0 80px rgba(212,137,10,0.12))",
                // Radial mask: transparent edges → only car body remains
                // The ellipse covers the car body; studio edges fade to transparent
                maskImage:
                  "radial-gradient(ellipse 88% 80% at 50% 52%, black 28%, rgba(0,0,0,0.95) 42%, rgba(0,0,0,0.5) 58%, transparent 72%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse 88% 80% at 50% 52%, black 28%, rgba(0,0,0,0.95) 42%, rgba(0,0,0,0.5) 58%, transparent 72%)",
              }}
            />
          </div>
        </div>

        {/* ── Brand stamp ───────────────────────────────────────────── */}
        <div
          className="absolute bottom-8 right-10 z-20 text-right"
          style={{ color: "rgba(255,255,255,0.15)" }}
        >
          <div className="font-display text-[10px] font-bold uppercase tracking-[0.35em]">
            Polish Station
          </div>
          <div className="mt-0.5 text-[9px] tracking-[0.25em]">Premium Detailing Studio</div>
        </div>
      </div>
    </section>
  );
}
