import { useEffect, useRef } from "react";
import heroCar from "@/assets/hero-car.jpg";

const reasons = [
  { n: "01", title: "Paint Depth Analysis",    desc: "We measure every panel before touching it." },
  { n: "02", title: "Certified Technicians",   desc: "Thousands of hours. Zero shortcuts." },
  { n: "03", title: "Premium-Grade Products",  desc: "Only the coatings your paint deserves." },
  { n: "04", title: "Multi-Light Inspection",  desc: "Nothing leaves without a flawless sign-off." },
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
        const rect    = section.getBoundingClientRect();
        const vh      = window.innerHeight;
        const total   = rect.height - vh;
        const scrolled = Math.max(0, -rect.top);
        const p       = Math.min(1, scrolled / total); // 0 → 1

        /*
         * p = 0 : section just locked into sticky (car above viewport)
         * p = 1 : section about to unlock (car settled, starting to exit)
         *
         * rotateX  : 55° (entering, foreshortened = looks like undercarriage)
         *           → 0° (settled flat = top-down view)
         * translateY: -70vh → 0 (car falls into place)
         * scale    : 0.72 → 1.0 (grows as it approaches)
         * rotateZ  : constant -25° (the artistic diagonal tilt)
         */
        // Smoother ease so entry phase spans first 60% of scroll travel
        const ease    = 1 - Math.pow(1 - p, 1.6);
        const rotX    = 52  * (1 - ease);
        const ty      = -vh * 0.55 * (1 - ease);
        const scale   = 0.78 + 0.22 * ease;

        car.style.transform =
          `translateY(${ty}px) rotateX(${rotX}deg) rotateZ(-22deg) scale(${scale})`;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // initialize
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    /*
     * Outer wrapper is 230vh so the user spends real scroll-time on the section.
     * The inner container is sticky/full-screen — it locks in place while the
     * car animates through its travel arc.
     */
    <section
      ref={sectionRef}
      style={{ minHeight: "230vh" }}
      className="relative"
    >
      <div
        className="sticky top-0 h-screen overflow-hidden"
        /* perspective is on the CONTAINER so that the car's rotateX
           creates the dramatic "looking up at it from below" effect
           as it enters from the top of the viewport */
        style={{ perspective: "1000px", perspectiveOrigin: "52% 65%" }}
      >
        {/* ── Diagonal background ──────────────────────────────────────── */}

        {/* Light half — warm white */}
        <div className="absolute inset-0" style={{ background: "#F0EDEA" }} />

        {/* Dark half — charcoal, hard diagonal clip */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(160deg, #181818 0%, #0e0e0e 100%)",
            clipPath: "polygon(54% 0%, 100% 0%, 100% 100%, 20% 100%)",
          }}
        />

        {/* Diagonal shadow/depth line */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, transparent 49.5%, rgba(0,0,0,0.18) 50%, transparent 51.5%)",
          }}
        />

        {/* ── Text — lives on the light side ───────────────────────────── */}
        <div className="absolute left-10 top-1/2 z-20 -translate-y-1/2 max-w-sm lg:left-20 lg:max-w-md">
          <div
            className="mb-4 text-xs font-bold uppercase tracking-[0.3em]"
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

          <p className="mt-5 text-sm leading-relaxed" style={{ color: "#555555" }}>
            Premium detailing is not a wash — it's a precision process.
            Here's what sets Polish Station apart.
          </p>

          <ul className="mt-8 space-y-4">
            {reasons.map((r) => (
              <li key={r.n} className="flex items-start gap-4">
                <span
                  className="mt-0.5 shrink-0 text-[10px] font-black font-mono"
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
                  <div className="text-xs mt-0.5" style={{ color: "#777777" }}>
                    {r.desc}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Car — straddles the diagonal line ───────────────────────── */}
        <div
          className="absolute"
          style={{
            left: "54%",
            top: "54%",
            transform: "translateX(-50%) translateY(-50%)",
          }}
        >
          {/* Ambient glow pool under the car */}
          <div
            className="pointer-events-none absolute"
            style={{
              width: "700px",
              height: "200px",
              left: "50%",
              bottom: "-80px",
              transform: "translateX(-50%)",
              background: "radial-gradient(ellipse 60% 100% at 50% 100%, rgba(212,137,10,0.22) 0%, transparent 70%)",
              filter: "blur(18px)",
            }}
          />
          <div
            ref={carRef}
            style={{
              willChange: "transform",
              transform: "translateY(-55vh) rotateX(52deg) rotateZ(-22deg) scale(0.78)",
            }}
          >
            <img
              src={heroCar}
              alt="Premium detailing — car overview"
              draggable={false}
              style={{
                width: "780px",
                maxWidth: "none",
                userSelect: "none",
                filter:
                  "drop-shadow(0 50px 90px rgba(0,0,0,0.75)) drop-shadow(0 15px 30px rgba(0,0,0,0.55)) drop-shadow(0 0 40px rgba(212,137,10,0.15))",
              }}
            />
          </div>
        </div>

        {/* ── Bottom-right brand stamp (on dark half) ───────────────────── */}
        <div
          className="absolute bottom-10 right-10 z-20 text-right"
          style={{ color: "rgba(255,255,255,0.18)" }}
        >
          <div className="font-display text-xs font-bold uppercase tracking-[0.3em]">
            Polish Station
          </div>
          <div className="text-[10px] tracking-[0.2em] mt-0.5">Premium Detailing Studio</div>
        </div>
      </div>
    </section>
  );
}
