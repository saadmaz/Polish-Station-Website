import { useEffect, useRef } from "react";
import heroCar from "@/assets/hero-car.jpg";

// Pure palette: #FF6600 orange · #000000 black · #FFFFFF white
const ORANGE = "#FF6600";

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

        const ease  = 1 - Math.pow(1 - p, 2.2);
        const rotX  = 52  * (1 - ease);
        const ty    = -vh * 0.62 * (1 - ease);
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
      <div
        className="sticky top-0 h-screen overflow-hidden"
        style={{ perspective: "1100px", perspectiveOrigin: "50% 60%" }}
      >

        {/* WHITE left */}
        <div className="absolute inset-0" style={{ background: "#FFFFFF" }} />

        {/* BLACK right */}
        <div
          className="absolute inset-0"
          style={{
            background: "#000000",
            clipPath: "polygon(54% 0%, 100% 0%, 100% 100%, 20% 100%)",
          }}
        />

        {/* Orange glow behind car */}
        <div
          className="pointer-events-none absolute"
          style={{
            left: "68%", top: "52%",
            width: "700px", height: "420px",
            transform: "translate(-50%,-50%)",
            background:
              "radial-gradient(ellipse 60% 50% at 50% 55%, rgba(255,102,0,0.10) 0%, rgba(255,102,0,0.03) 50%, transparent 70%)",
          }}
        />

        {/* Diagonal shadow depth */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(134deg, transparent 49%, rgba(0,0,0,0.4) 50%, transparent 51.5%)",
          }}
        />

        {/* Orange diagonal stripe — perpendicular to the clip-path boundary */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `linear-gradient(134deg, transparent 49.5%, ${ORANGE} 49.8%, ${ORANGE} 50.2%, transparent 50.5%)`,
          }}
        />

        {/* ── TEXT LEFT ─────────────────────────────────────────── */}
        <div
          className="absolute top-1/2 z-20 -translate-y-1/2"
          style={{ left: "clamp(2rem, 5vw, 5rem)", maxWidth: "380px" }}
        >
          {/* Eyebrow */}
          <div className="mb-6 flex items-center gap-3">
            <span className="block h-px w-8" style={{ background: ORANGE }} />
            <span
              className="text-[10px] font-black uppercase tracking-[0.4em]"
              style={{ color: ORANGE }}
            >
              Our Advantage
            </span>
          </div>

          {/* Headline */}
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

          <p
            className="mt-5 text-sm leading-relaxed"
            style={{ color: "#333333", maxWidth: "290px" }}
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
                    background: "rgba(255,102,0,0.10)",
                    color: ORANGE,
                    border: `1.5px solid ${ORANGE}`,
                    minWidth: "24px",
                  }}
                >
                  {r.n}
                </span>
                <div>
                  <p
                    className="text-[13px] font-bold uppercase tracking-wide leading-tight"
                    style={{ color: "#000000" }}
                  >
                    {r.title}
                  </p>
                  <p
                    className="mt-[3px] text-[12px] leading-snug"
                    style={{ color: "#444444" }}
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
              style={{ background: ORANGE }}
            />
            <span
              className="text-[9px] font-bold uppercase tracking-[0.35em]"
              style={{ color: ORANGE }}
            >
              Polish Station
            </span>
          </div>
        </div>

        {/* ── CAR IMAGE ────────────────────────────────────────── */}
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

        {/* Bottom-right stamp */}
        <div
          className="absolute bottom-8 right-10 z-20 text-right"
          style={{ color: "rgba(255,102,0,0.35)" }}
        >
          <div className="text-[10px] font-bold uppercase tracking-[0.38em]">
            Polish Station
          </div>
          <div
            className="mt-0.5 text-[9px] tracking-[0.25em]"
            style={{ color: "rgba(255,255,255,0.15)" }}
          >
            Premium Detailing
          </div>
        </div>

        {/* Corner dots */}
        <div className="absolute top-8 right-10 flex items-center gap-[6px]">
          {[1, 0.5, 0.2].map((o, i) => (
            <span
              key={i}
              className="block rounded-full"
              style={{
                width: "6px",
                height: "6px",
                background: `rgba(255,102,0,${o})`,
              }}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
