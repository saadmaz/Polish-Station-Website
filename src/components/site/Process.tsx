const steps = [
  { n: "01", title: "Inspection", desc: "Paint depth measurement, defect mapping, surface assessment." },
  { n: "02", title: "Wash & Decontamination", desc: "Foam pre-wash, two-bucket method, clay decontamination." },
  { n: "03", title: "Paint Correction", desc: "Multi-stage machine polishing to remove defects." },
  { n: "04", title: "Protection", desc: "Application of ceramic, graphene, or premium wax." },
  { n: "05", title: "Final Inspection", desc: "Multi-light inspection and hand-finished delivery." },
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

        <ol className="relative space-y-px">
          <span className="absolute left-[3.25rem] top-0 bottom-0 hidden w-px bg-gradient-to-b from-primary via-border to-transparent md:block" />
          {steps.map((s) => (
            <li
              key={s.n}
              className="group relative grid grid-cols-[80px_1fr] items-center gap-6 rounded-2xl bg-card/40 p-6 transition-colors hover:bg-card md:grid-cols-[110px_180px_1fr] md:p-8"
            >
              <div className="relative z-10 grid h-16 w-16 place-items-center rounded-full bg-graphite font-display text-lg font-bold text-primary ring-1 ring-border transition-all group-hover:bg-primary group-hover:text-primary-foreground group-hover:ring-primary">
                {s.n}
              </div>
              <h3 className="font-display text-xl font-bold uppercase tracking-wide md:text-2xl">
                {s.title}
              </h3>
              <p className="col-span-2 text-sm text-muted-foreground md:col-span-1">
                {s.desc}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
