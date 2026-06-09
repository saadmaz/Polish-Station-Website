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

  useEffect(() => {
    const section = sectionRef.current;
    const car     = carRef.current;
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

        // Smooth ease — car spends real time in the dramatic entering pose
        const ease  = 1 - Math.pow(1 - p, 2.2);

        // rotateX: 52° (edge-on, looks like approaching from above)
        //        →  0° (flat, settled into scene)
        const rotX  = 52  * (1 - ease);
        // translateY: -62vh (car above viewport) → 0 (settled)
        const ty    = -vh * 0.62 * (1 - ease);
        // Scale up as it "arrives"
        const scale = 0.70 + 0.30 * ease;

        car.style.transform =
          `translateY(${ty}px) rotateX(${rotX}deg) rotateZ(-20deg) scale(${scale})`;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("scroll", onScroll); };
  }, []);

  return (
    <section
      ref={sectionRef}
      data-diagonal-section
      style={{ minHeight: "250vh" }}
      className="relative"
    >
      {/*
       * perspective on the CONTAINER gives children rotateX depth.
       * The car's 52° → 0° rotation looks like it's "falling into view from above".
       */}
      <div
        className="sticky top-0 h-screen overflow-hidden"
        style={{ perspective: "1100px", perspectiveOrigin: "50% 60%" }}
      >

        {/* ══ WHITE LEFT HALF ════════════════════════════════════ */}
        <div className="absolute inset-0 bg-white" />

        {/* ══ PURE BLACK RIGHT HALF ══════════════════════════════ */}
        <div
          className="absolute inset-0"
          style={{
            background: "#020202",
            clipPath: "polygon(54% 0%, 100% 0%, 100% 100%, 20% 100%)",
          }}
        />

        {/* Subtle orange glow pocket — atmosphere for the car */}
        <div
          className="pointer-events-none absolute"
          style={{
            left: "68%", top: "48%",
            width: "760px", height: "480px",
            transform: "translate(-50%,-50%)",
            background:
              "radial-gradient(ellipse 65% 55% at 52% 55%, rgba(212,137,10,0.11) 0%, rgba(160,80,0,0.05) 45%, transparent 70%)",
          }}
        />

        {/* ══ DIAGONAL LINE WITH ORANGE ACCENT ══════════════════ */}
        {/* Base shadow */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(134deg, transparent 49%, rgba(0,0,0,0.35) 50%, transparent 51.5%)",
          }}
        />
        {/* Orange stripe */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(134deg, transparent 49.5%, rgba(212,137,10,0.75) 49.9%, rgba(212,137,10,0.75) 50.1%, transparent 50.5%)",
          }}
        />

        {/* ══ TEXT — LEFT SIDE ═══════════════════════════════════ */}
        <div
          className="absolute top-1/2 z-20 -translate-y-1/2"
          style={{ left: "clamp(2rem, 5vw, 5rem)", maxWidth: "360px" }}
        >
          {/* Eyebrow */}
          <div className="mb-6 flex items-center gap-3">
            <span
              className="block h-px w-8"
              style={{ background: "#D4890A" }}
            />
            <span
              className="text-[10px] font-black uppercase tracking-[0.4em]"
              style={{ color: "#D4890A" }}
            >
              Our Advantage
            </span>
          </div>

          {/* Headline */}
          <h2
            className="font-display font-extrabold leading-[0.95]"
            style={{ fontSize: "clamp(3rem, 5vw, 4.2rem)" }}
          >
            <span style={{ color: "#0A0A0A" }}>Why</span>
            <br />
            <span
              style={{
                color: "#D4890A",
                textShadow: "0 2px 40px rgba(212,137,10,0.22)",
              }}
            >
              is it
            </span>
            <br />
            <span
              style={{
                color: "#D4890A",
                textShadow: "0 2px 40px rgba(212,137,10,0.22)",
              }}
            >
              worth it?
            </span>
          </h2>

          <p
            className="mt-5 text-sm leading-relaxed"
            style={{ color: "#555", maxWidth: "280px" }}
          >
            Because your paint deserves precision,
            not guesswork.
          </p>

          {/* Reason list */}
          <ul className="mt-8 space-y-[18px]">
            {reasons.map((r) => (
              <li key={r.n} className="flex items-start gap-[14px]">
                <span
                  className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[9px] font-black"
                  style={{
                    background: "rgba(212,137,10,0.12)",
                    color: "#D4890A",
                    border: "1.5px solid rgba(212,137,10,0.4)",
                    minWidth: "24px",
                  }}
                >
                  {r.n}
                </span>
                <div>
                  <p
                    className="text-[13px] font-bold uppercase tracking-wide leading-tight"
                    style={{ color: "#111" }}
                  >
                    {r.title}
                  </p>
                  <p
                    className="mt-[3px] text-[12px] leading-snug"
                    style={{ color: "#888" }}
                  >
                    {r.desc}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          {/* Bottom accent */}
          <div className="mt-10 flex items-center gap-3">
            <span
              className="block h-[2px] w-10 rounded-full"
              style={{ background: "linear-gradient(to right, #D4890A, #F5A623)" }}
            />
            <span
              className="text-[9px] font-bold uppercase tracking-[0.35em]"
              style={{ color: "#D4890A" }}
            >
              Polish Station
            </span>
          </div>
        </div>

        {/* ══ CAR IMAGE ══════════════════════════════════════════ */}
        {/*
         * The photo's outer edge pixels are rgb(2,2,2) — matches #020202 section.
         * CSS mask cuts the floor reflection (bottom 33%) and softens side edges.
         * This removes the visible rectangle completely.
         * rotateX perspective creates the autoklasa-style "falling into view" effect.
         *
         * IMPORTANT: mask goes on the IMG, rotateX goes on carRef div.
         * They operate at different stages: mask clips paint, rotateX happens at composite.
         */}
        <div
          className="absolute"
          style={{
            left: "66%",
            top: "50%",
            transform: "translateX(-50%) translateY(-50%)",
          }}
        >
          <div
            ref={carRef}
            style={{
              willChange: "transform",
              transform: "translateY(-62vh) rotateX(52deg) rotateZ(-20deg) scale(0.70)",
            }}
          >
            <img
              src={heroCar}
              alt="Premium car detailing"
              draggable={false}
              style={{
                width: "880px",
                maxWidth: "none",
                display: "block",
                userSelect: "none",
                filter: "brightness(1.08) contrast(1.06) saturate(1.1)",
                // Mask: aggressively cuts the floor reflection (bottom 33%)
                // and fades the outer 8% of each side edge
                maskImage: [
                  "linear-gradient(to right,  transparent 3%, black 10%, black 91%, transparent 98%)",
                  "linear-gradient(to bottom, black 0%,  black 60%, rgba(0,0,0,0.4) 70%, transparent 78%)",
                ].join(", "),
                WebkitMaskImage: [
                  "linear-gradient(to right,  transparent 3%, black 10%, black 91%, transparent 98%)",
                  "linear-gradient(to bottom, black 0%,  black 60%, rgba(0,0,0,0.4) 70%, transparent 78%)",
                ].join(", "),
                maskComposite: "intersect",
                WebkitMaskComposite: "destination-in",
              }}
            />
          </div>
        </div>

        {/* ══ BOTTOM-RIGHT STAMP ════════════════════════════════ */}
        <div
          className="absolute bottom-8 right-10 z-20 text-right"
          style={{ color: "rgba(212,137,10,0.35)" }}
        >
          <div className="text-[10px] font-bold uppercase tracking-[0.38em]">
            Polish Station
          </div>
          <div
            className="mt-0.5 text-[9px] tracking-[0.25em]"
            style={{ color: "rgba(255,255,255,0.14)" }}
          >
            Premium Detailing
          </div>
        </div>

        {/* Orange corner dots */}
        <div className="absolute top-8 right-10 flex items-center gap-[6px]">
          {[1, 0.5, 0.2].map((o, i) => (
            <span
              key={i}
              className="block rounded-full"
              style={{
                width: "6px",
                height: "6px",
                background: `rgba(212,137,10,${o})`,
              }}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
