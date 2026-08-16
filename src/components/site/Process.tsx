import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const steps = [
  { n: "01", title: "Pre Wash",               desc: "Active foam dissolves dirt and road grime before you physically touch the paint, preventing swirl marks and scratches." },
  { n: "02", title: "Paint Correction",       desc: "Safely polishing your paint to permanently remove swirl marks, scratches, and haze, restoring a smooth, mirror-like finish." },
  { n: "03", title: "Surface Preparation",    desc: "A deep-cleaning step that strips away leftover polishes, oils, and waxes so the coating can bond properly using a specialised cleaning agent." },
  { n: "04", title: "Coating Application",    desc: "The liquid ceramic or graphene coating is carefully spread over the paint, left to flash, and wiped flat to form a permanent protective barrier." },
  { n: "05", title: "Controlled Curing",      desc: "The critical waiting period where the coating is kept away from water, moisture, and harsh elements while it fully hardens and permanently bonds to the paint." },
];

/* ── Top-down car SVG ──────────────────────────────────────────────────── */
function TopDownCar() {
  return (
    <svg viewBox="0 0 24 44" fill="none" className="w-full h-auto drop-shadow-[0_0_6px_rgba(210,11,11,0.8)]">
      {/* Body */}
      <path
        d="M3 8 Q3 2 12 2 Q21 2 21 8 L22 34 Q22 42 12 43 Q2 42 2 34 Z"
        fill="var(--color-primary)"
      />
      {/* Windshield (front = bottom - car moves downward) */}
      <path
        d="M6 10 Q6 6 12 5 Q18 6 18 10 L18 17 Q12 18 6 17 Z"
        fill="rgba(180,220,255,0.4)"
      />
      {/* Rear window */}
      <path
        d="M6 27 L6 35 Q12 37 18 35 L18 27 Q12 28 6 27 Z"
        fill="rgba(180,220,255,0.22)"
      />
      {/* Left front wheel */}
      <rect x="0"    y="8"  width="3.5" height="9" rx="1.5" fill="#1B1B1B" stroke="var(--color-primary)" strokeWidth="0.5" />
      {/* Right front wheel */}
      <rect x="20.5" y="8"  width="3.5" height="9" rx="1.5" fill="#1B1B1B" stroke="var(--color-primary)" strokeWidth="0.5" />
      {/* Left rear wheel */}
      <rect x="0"    y="27" width="3.5" height="9" rx="1.5" fill="#1B1B1B" stroke="var(--color-primary)" strokeWidth="0.5" />
      {/* Right rear wheel */}
      <rect x="20.5" y="27" width="3.5" height="9" rx="1.5" fill="#1B1B1B" stroke="var(--color-primary)" strokeWidth="0.5" />
      {/* Headlights (bottom = front) */}
      <rect x="7"    y="41.5" width="3.5" height="1.5" rx="0.75" fill="rgba(255,210,60,0.95)" />
      <rect x="13.5" y="41.5" width="3.5" height="1.5" rx="0.75" fill="rgba(255,210,60,0.95)" />
      {/* Taillights (top = rear) */}
      <rect x="7"    y="1"    width="3.5" height="1.5" rx="0.75" fill="rgba(255,50,50,0.85)" />
      <rect x="13.5" y="1"    width="3.5" height="1.5" rx="0.75" fill="rgba(255,50,50,0.85)" />
    </svg>
  );
}

/* ── Step item with individual scroll reveal ───────────────────────────── */
function StepItem({ step, index }: { step: typeof steps[0]; index: number }) {
  const ref = useScrollReveal() as React.RefObject<HTMLDivElement>;

  return (
    <li>
      <div
        ref={ref}
        className="reveal-left group relative flex items-start gap-6 overflow-hidden rounded-2xl bg-card/40 depth-shadow p-6 transition-all duration-300 hover:bg-card hover:-translate-y-0.5 md:p-8"
        style={{ transitionDelay: `${index * 110}ms` }}
      >
        {/* Metallic top edge */}
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
        {/* Left glow bar on hover */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-0 rounded-r-full bg-primary/0 transition-all duration-400 group-hover:h-12 group-hover:bg-primary group-hover:shadow-[0_0_14px_var(--color-primary)]" />

        {/* Step circle */}
        <div className="relative z-10 flex-none">
          {/* Ghost large number behind circle */}
          <div className="absolute -left-1 -top-4 font-display text-[3.5rem] font-black leading-none select-none pointer-events-none text-white/[0.04]">
            {step.n}
          </div>
          <div className="relative grid h-16 w-16 place-items-center rounded-full bg-graphite font-display text-lg font-bold text-primary ring-1 ring-border depth-shadow transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:ring-primary group-hover:scale-110">
            {step.n}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 md:flex md:items-center md:gap-8">
          <h3 className="font-display text-xl font-bold uppercase tracking-wide md:w-48 md:flex-none md:text-2xl">
            {step.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:mt-0">{step.desc}</p>
        </div>
      </div>
    </li>
  );
}

export function Process() {
  return (
    <section id="process" className="section-padding relative">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 max-w-2xl">
          <div className="eyebrow mb-4">
            <span className="h-px w-8 bg-primary" /> Our Process
          </div>
          <h2 className="font-display text-4xl font-bold uppercase leading-tight md:text-6xl">
            A precise <span className="text-gradient-primary">5-step</span> ritual.
          </h2>
        </div>

        <div className="flex gap-6">
          {/* ── Road strip (desktop only) ──────────────────────────────── */}
          <div className="relative hidden w-12 flex-none md:block">
            {/* Road tarmac */}
            <div className="absolute inset-0 rounded-full bg-graphite depth-shadow" />
            {/* Road edge highlight - left */}
            <div className="absolute inset-y-0 left-0.5 w-px bg-linear-to-b from-transparent via-white/12 to-transparent" />
            {/* Road edge highlight - right */}
            <div className="absolute inset-y-0 right-0.5 w-px bg-linear-to-b from-transparent via-white/12 to-transparent" />

            {/* Animated center lane dashes */}
            <div
              className="absolute inset-0 rounded-full overflow-hidden"
              style={{
                backgroundImage: "repeating-linear-gradient(to bottom, transparent 0px, transparent 8px, rgba(210,11,11,0.55) 8px, rgba(210,11,11,0.55) 24px)",
                backgroundSize: "4px 24px",
                backgroundPosition: "center 0",
                animation: "road-dash-move 0.45s linear infinite",
              }}
            />

            {/* Traveling car container - positioned absolute for top animation */}
            <div
              className="absolute overflow-hidden"
              style={{
                left: "50%",
                transform: "translateX(-50%)",
                width: "38px",
                animation: "car-travel-down 8s linear infinite",
              }}
            >
              {/* Speed trail behind car */}
              <div
                style={{
                  position: "absolute",
                  bottom: "100%",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "3px",
                  height: "48px",
                  background: "linear-gradient(to top, rgba(210,11,11,0.5), transparent)",
                  borderRadius: "2px",
                }}
              />
              <TopDownCar />
            </div>

            {/* Road start/end caps */}
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 h-4 w-4 rounded-full bg-primary shadow-[0_0_12px_var(--color-primary)]" />
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-4 w-4 rounded-full border-2 border-primary bg-graphite" />
          </div>

          {/* ── Step list ─────────────────────────────────────────────── */}
          <ol className="flex-1 space-y-3">
            {steps.map((s, i) => (
              <StepItem key={s.n} step={s} index={i} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
