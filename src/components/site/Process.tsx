const steps = [
  { n: "01", title: "Inspection",              desc: "Paint depth measurement, defect mapping, surface assessment." },
  { n: "02", title: "Wash & Decontamination",  desc: "Foam pre-wash, two-bucket method, clay decontamination." },
  { n: "03", title: "Paint Correction",        desc: "Multi-stage machine polishing to remove defects." },
  { n: "04", title: "Protection",              desc: "Application of ceramic, graphene, or premium wax." },
  { n: "05", title: "Final Inspection",        desc: "Multi-light inspection and hand-finished delivery." },
];

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

        {/* perspective on container gives depth to hover translateZ */}
        <ol className="relative space-y-3" style={{ perspective: "1200px" }}>
          {/* Connector rail */}
          <span className="absolute left-13 top-0 bottom-0 hidden w-px bg-linear-to-b from-primary/70 via-primary/20 to-transparent md:block" />

          {steps.map((s, i) => (
            <li
              key={s.n}
              className="group relative grid grid-cols-[80px_1fr] items-center gap-6 overflow-hidden rounded-2xl bg-card/40 depth-shadow p-6 transition-all duration-300 hover:bg-card hover:-translate-y-1 md:grid-cols-[110px_200px_1fr] md:p-8"
              style={{ transitionProperty: "transform, background-color, box-shadow" }}
            >
              {/* Metallic top edge */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              {/* Left accent glow bar on hover */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-0 rounded-r-full bg-primary/0 transition-all duration-400 group-hover:h-10 group-hover:bg-primary group-hover:shadow-[0_0_14px_var(--color-primary)]" />
              {/* Subtle bloom */}
              <div className="absolute -left-8 top-1/2 -translate-y-1/2 h-24 w-24 rounded-full bg-primary/0 blur-3xl transition-all duration-500 group-hover:bg-primary/15 pointer-events-none" />

              {/* Step number */}
              <div className="relative z-10 flex-none">
                {/* Ghost large number behind circle */}
                <div className="absolute -left-1 -top-4 font-display text-[3.5rem] font-black leading-none select-none pointer-events-none text-white/[0.04]">
                  {s.n}
                </div>
                <div className="relative grid h-16 w-16 place-items-center rounded-full bg-graphite font-display text-lg font-bold text-primary ring-1 ring-border depth-shadow transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:ring-primary group-hover:scale-110">
                  {s.n}
                </div>
              </div>

              <h3 className="font-display text-xl font-bold uppercase tracking-wide md:text-2xl">
                {s.title}
              </h3>
              <p className="col-span-2 text-sm leading-relaxed text-muted-foreground md:col-span-1">
                {s.desc}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
