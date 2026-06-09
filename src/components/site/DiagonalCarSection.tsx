import { useEffect, useRef } from "react";

// ─── Top-down luxury sedan SVG ───────────────────────────────────────────────
// Transparent background — pure car silhouette, no photo artifacts.
// Modelled after a modern luxury SUV-sedan, viewed from directly above.
function TopDownCar({ style }: { style?: React.CSSProperties }) {
  const spokes = [0, 60, 120, 180, 240, 300];
  const Wheel = ({ cx, cy }: { cx: number; cy: number }) => (
    <g>
      <ellipse cx={cx} cy={cy} rx={24} ry={27} fill="#1A1A1A" />
      <ellipse cx={cx} cy={cy} rx={14} ry={16} fill="#4A4A4A" />
      <ellipse cx={cx} cy={cy} rx={5}  ry={6}  fill="#333" />
      {spokes.map((a) => {
        const rad = (a * Math.PI) / 180;
        return (
          <line
            key={a}
            x1={cx + Math.cos(rad) * 5.5} y1={cy + Math.sin(rad) * 6.5}
            x2={cx + Math.cos(rad) * 13}  y2={cy + Math.sin(rad) * 15.5}
            stroke="#888" strokeWidth="2" strokeLinecap="round"
          />
        );
      })}
    </g>
  );

  return (
    <svg
      viewBox="0 0 300 560"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
    >
      {/* ── Ground shadow ─────────────────────────────────────────── */}
      <ellipse cx="150" cy="290" rx="138" ry="250"
        fill="rgba(0,0,0,0.22)"
        style={{ filter: "blur(18px)" }}
      />

      {/* ── Body ──────────────────────────────────────────────────── */}
      <path
        d="M105 22 Q150 10 195 22 L212 64 L220 170 L220 390
           L208 462 Q150 478 92 462 L80 390 L80 170 L88 64 Z"
        fill="#EAEAEC"
      />
      {/* Body side shading */}
      <path
        d="M80 170 L80 390 L92 462 Q76 450 76 390 L76 170 Z"
        fill="rgba(0,0,0,0.06)"
      />
      <path
        d="M220 170 L220 390 L208 462 Q224 450 224 390 L224 170 Z"
        fill="rgba(0,0,0,0.04)"
      />

      {/* ── Front hood ───────────────────────────────────────────── */}
      <path
        d="M105 22 Q150 10 195 22 L210 62 L90 62 Z"
        fill="#DCDCDE"
      />
      {/* Hood crease */}
      <path
        d="M118 34 Q150 26 182 34 L188 62 L112 62 Z"
        fill="#D4D4D6" opacity="0.7"
      />
      <line x1="150" y1="22" x2="150" y2="62"
        stroke="#C8C8CA" strokeWidth="1" opacity="0.5" />

      {/* Headlights */}
      <path
        d="M88 32 Q100 26 113 30 L114 56 L90 56 Q86 50 86 40 Z"
        fill="#C8DDEF" opacity="0.92"
      />
      <path
        d="M187 30 Q200 26 212 32 L214 40 Q214 50 210 56 L186 56 Z"
        fill="#C8DDEF" opacity="0.92"
      />
      {/* Headlight inner DRL */}
      <path d="M93 34 Q104 30 113 33 L113 45 L93 45 Z" fill="white" opacity="0.35"/>
      <path d="M187 33 Q196 30 207 34 L207 45 L187 45 Z" fill="white" opacity="0.35"/>

      {/* Front grille */}
      <path
        d="M117 24 Q150 18 183 24 L180 36 L120 36 Z"
        fill="#181818"
      />
      <line x1="150" y1="18" x2="150" y2="36" stroke="#2A2A2A" strokeWidth="1.2"/>

      {/* ── Windshield ───────────────────────────────────────────── */}
      <path
        d="M92 66 Q150 60 208 66 L213 98 L87 98 Z"
        fill="#1E2840" opacity="0.88"
      />
      <path
        d="M102 66 Q150 62 198 66 L196 80 L104 80 Z"
        fill="white" opacity="0.04"
      />

      {/* ── A-Pillars ────────────────────────────────────────────── */}
      <path d="M92 66 L85 98 L93 98 L98 66 Z" fill="#C0C0C2"/>
      <path d="M208 66 L215 98 L207 98 L202 66 Z" fill="#C0C0C2"/>

      {/* ── Panoramic Glass Roof / Cabin ─────────────────────────── */}
      <rect x="87" y="100" width="126" height="228" rx="4" fill="#16192A" opacity="0.95"/>
      {/* Chrome roof frame */}
      <rect x="87" y="100" width="126" height="228" rx="4"
        fill="none" stroke="#B8BBC4" strokeWidth="2.5"/>

      {/* ── Interior (visible through glass) ─────────────────────── */}
      {/* Dashboard */}
      <rect x="94" y="106" width="112" height="24" rx="3" fill="#22202E"/>
      <rect x="98" y="110" width="38" height="14" rx="2" fill="#17151F"/>
      <circle cx="117" cy="117" r="5" fill="none" stroke="#444" strokeWidth="1.5"/>
      <rect x="144" y="110" width="26" height="14" rx="2" fill="#0E1520"/>

      {/* Steering wheel */}
      <circle cx="115" cy="142" r="17" fill="none" stroke="#7B6545" strokeWidth="5"/>
      <line x1="115" y1="125" x2="115" y2="159" stroke="#7B6545" strokeWidth="3"/>
      <line x1="98"  y1="142" x2="132" y2="142" stroke="#7B6545" strokeWidth="3"/>
      <circle cx="115" cy="142" r="4.5" fill="#7B6545"/>

      {/* Center console */}
      <rect x="135" y="133" width="32" height="76" rx="4" fill="#1E1C2A"/>
      <rect x="139" y="138" width="24" height="9" rx="2" fill="#15131E"/>
      <circle cx="151" cy="185" r="7" fill="#15131E"/>

      {/* Front left seat */}
      <path
        d="M93 132 Q93 127 98 125 L127 125 Q132 127 132 132
           L132 205 Q132 210 127 212 L98 212 Q93 210 93 205 Z"
        fill="#D0C4AE"
      />
      <rect x="95" y="125" width="35" height="10" rx="3" fill="#C0B49E"/>

      {/* Front right seat */}
      <path
        d="M168 132 Q168 127 173 125 L202 125 Q207 127 207 132
           L207 205 Q207 210 202 212 L173 212 Q168 210 168 205 Z"
        fill="#D0C4AE"
      />
      <rect x="170" y="125" width="35" height="10" rx="3" fill="#C0B49E"/>

      {/* Rear seat headrests */}
      <rect x="95"  y="218" width="28" height="9" rx="3.5" fill="#C0B49E"/>
      <rect x="177" y="218" width="28" height="9" rx="3.5" fill="#C0B49E"/>

      {/* Rear seat bench */}
      <path
        d="M92 227 L92 300 Q92 308 99 310 L201 310 Q208 308 208 300 L208 227 Z"
        fill="#D0C4AE"
      />
      <rect x="92" y="227" width="116" height="12" rx="3" fill="#C0B49E"/>
      <line x1="150" y1="227" x2="150" y2="300" stroke="#B8ACA0" strokeWidth="1"/>

      {/* ── C-Pillars ────────────────────────────────────────────── */}
      <path d="M87 328 L93 328 L96 308 L89 308 Z" fill="#C0C0C2"/>
      <path d="M213 328 L207 328 L204 308 L211 308 Z" fill="#C0C0C2"/>

      {/* ── Rear Windshield ──────────────────────────────────────── */}
      <path
        d="M90 330 L87 356 L213 356 L210 330 Z"
        fill="#1E2840" opacity="0.84"
      />

      {/* ── Trunk ────────────────────────────────────────────────── */}
      <path
        d="M87 358 L87 454 Q88 462 102 466 Q150 472 198 466
           Q212 462 213 454 L213 358 Z"
        fill="#DCDCDE"
      />
      {/* Trunk crease lines */}
      <path d="M102 374 Q150 366 198 374" fill="none"
        stroke="#CACACC" strokeWidth="1.5"/>
      <path d="M97 428 Q150 418 203 428" fill="none"
        stroke="#CACACC" strokeWidth="1.5"/>
      {/* License plate recess */}
      <rect x="126" y="452" width="48" height="14" rx="2" fill="#CACACE"/>

      {/* Taillights */}
      <path d="M79 378 L88 373 L88 438 L79 432 Z" fill="#FF2424"/>
      <path d="M80 380 L87 376 L87 412 L80 409 Z" fill="#FF7070" opacity="0.45"/>
      <path d="M221 373 L212 378 L212 432 L221 438 Z" fill="#FF2424"/>
      <path d="M220 376 L213 380 L213 409 L220 412 Z" fill="#FF7070" opacity="0.45"/>

      {/* Rear bumper */}
      <path
        d="M87 462 Q150 476 213 462 L211 478 Q150 492 89 478 Z"
        fill="#D0D0D2"
      />

      {/* ── Side mirrors ─────────────────────────────────────────── */}
      <path d="M56 124 Q64 116 77 120 L79 138 Q66 143 56 136 Z" fill="#DCDCDE"/>
      <ellipse cx="67" cy="129" rx="7" ry="5" fill="#1E2840" opacity="0.5"/>
      <path d="M244 124 Q236 116 223 120 L221 138 Q234 143 244 136 Z" fill="#DCDCDE"/>
      <ellipse cx="233" cy="129" rx="7" ry="5" fill="#1E2840" opacity="0.5"/>

      {/* ── Wheels ───────────────────────────────────────────────── */}
      <Wheel cx={66}  cy={155} />
      <Wheel cx={234} cy={155} />
      <Wheel cx={66}  cy={400} />
      <Wheel cx={234} cy={400} />
    </svg>
  );
}

// ─── Reasons list ────────────────────────────────────────────────────────────
const reasons = [
  { n: "01", title: "Paint Depth Analysis",   desc: "We measure every panel before touching it." },
  { n: "02", title: "Certified Technicians",  desc: "Thousands of hours. Zero shortcuts." },
  { n: "03", title: "Premium-Grade Products", desc: "Only the coatings your paint deserves." },
  { n: "04", title: "Multi-Light Inspection", desc: "Nothing leaves without a flawless sign-off." },
];

// ─── Section component ───────────────────────────────────────────────────────
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

        // Smooth ease — car spends time in both the "entering" and "settled" states
        const ease   = 1 - Math.pow(1 - p, 2.2);

        // rotateX: 58° (edge-on, foreshortened = "from below") → 0° (flat top-down)
        const rotX   = 58  * (1 - ease);
        // translateY: -65vh (above viewport) → 0 (settled in scene)
        const ty     = -vh * 0.65 * (1 - ease);
        // scale: grows as it approaches
        const scale  = 0.70 + 0.30 * ease;

        // rotateZ is constant — keeps the car on the diagonal like autoklasa.pl
        car.style.transform =
          `translateY(${ty}px) rotateX(${rotX}deg) rotateZ(-28deg) scale(${scale})`;
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
      {/*
       * Sticky inner — perspective on the CONTAINER propagates to children
       * so the car's rotateX creates the "falling into view" depth effect.
       */}
      <div
        className="sticky top-0 h-screen overflow-hidden"
        style={{ perspective: "1100px", perspectiveOrigin: "50% 58%" }}
      >

        {/* ── Background split ──────────────────────────────────── */}
        {/* Light half */}
        <div className="absolute inset-0" style={{ background: "#F4F3F0" }} />
        {/* Dark half */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(160deg, #141414 0%, #0a0a0a 100%)",
            clipPath: "polygon(55% 0%, 100% 0%, 100% 100%, 22% 100%)",
          }}
        />
        {/* Diagonal edge shadow */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(134deg, transparent 49.2%, rgba(0,0,0,0.22) 50%, transparent 51.8%)",
          }}
        />

        {/* ── Text — light side ─────────────────────────────────── */}
        <div className="absolute left-10 top-1/2 z-20 -translate-y-1/2 max-w-xs lg:left-14 lg:max-w-sm">
          <div
            className="mb-4 text-[10px] font-black uppercase tracking-[0.38em]"
            style={{ color: "#C8861A" }}
          >
            Our Advantage
          </div>
          <h2
            className="font-display leading-[1.05]"
            style={{ color: "#111111", fontSize: "clamp(2.4rem, 4vw, 3.6rem)", fontWeight: 800 }}
          >
            Why{" "}
            <span style={{ color: "#D4890A" }}>is it</span>
            <br />
            <span style={{ color: "#D4890A" }}>worth it?</span>
          </h2>
          <ul className="mt-8 space-y-5">
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

        {/* ── Car — SVG top-down, straddling the diagonal ───────── */}
        {/*
         * Outer div: static centering anchor (no will-change, no transform conflicts)
         * carRef div: receives the scroll-driven rotateX/translateY/scale
         * SVG: transparent background — no photo artifacts, pure car shape
         */}
        <div
          className="absolute"
          style={{ left: "60%", top: "52%", transform: "translateX(-50%) translateY(-50%)" }}
        >
          <div
            ref={carRef}
            style={{
              willChange: "transform",
              transform: "translateY(-65vh) rotateX(58deg) rotateZ(-28deg) scale(0.70)",
            }}
          >
            <TopDownCar style={{ width: "520px", height: "auto", display: "block" }} />
          </div>
        </div>

        {/* ── Brand stamp ───────────────────────────────────────── */}
        <div
          className="absolute bottom-8 right-10 z-20 text-right"
          style={{ color: "rgba(255,255,255,0.15)" }}
        >
          <div className="font-display text-[10px] font-bold uppercase tracking-[0.38em]">
            Polish Station
          </div>
          <div className="mt-0.5 text-[9px] tracking-[0.28em]">Premium Detailing Studio</div>
        </div>
      </div>
    </section>
  );
}
