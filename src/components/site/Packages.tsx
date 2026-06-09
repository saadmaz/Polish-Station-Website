import { Check } from "lucide-react";

const packages = [
  {
    name: "Basic Detail",
    price: "149",
    desc: "Essential refresh for daily drivers.",
    features: ["Exterior hand wash", "Wheel & tire dressing", "Interior vacuum", "Window cleaning", "Tire shine"],
  },
  {
    name: "Premium Detail",
    price: "349",
    desc: "Deep care for enthusiasts.",
    popular: true,
    features: ["Full decontamination", "Single-stage polish", "Interior shampoo", "Leather conditioning", "6-month sealant", "Engine bay clean"],
  },
  {
    name: "Ultimate Protection",
    price: "899",
    desc: "Showroom-grade ceramic protection.",
    features: ["Multi-stage correction", "9H ceramic coating", "Interior protection", "Wheel coating", "Glass coating", "5-year warranty"],
  },
];

export function Packages() {
  return (
    <section id="packages" className="section-padding relative">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 max-w-2xl">
          <div className="eyebrow mb-4">
            <span className="h-px w-8 bg-primary" /> Packages
          </div>
          <h2 className="font-display text-4xl font-bold uppercase leading-tight md:text-6xl">
            Choose your <span className="text-gradient-primary">level.</span>
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {packages.map((p) => (
            <div
              key={p.name}
              className={`relative overflow-hidden rounded-3xl p-8 transition-transform hover:-translate-y-2 ${
                p.popular
                  ? "bg-gradient-to-b from-primary/15 to-card border border-primary/40 shadow-glow-primary"
                  : "glass"
              }`}
            >
              {p.popular && (
                <span className="absolute right-6 top-6 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary-foreground">
                  Most Popular
                </span>
              )}

              <h3 className="font-display text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground">
                {p.name}
              </h3>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="font-display text-5xl font-bold text-gradient-silver">
                  ${p.price}
                </span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>

              <div className="my-8 h-px bg-border" />

              <ul className="space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <span className="mt-0.5 grid h-5 w-5 flex-none place-items-center rounded-full bg-primary/20 text-primary">
                      <Check className="h-3 w-3" />
                    </span>
                    <span className="text-foreground/90">{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={`mt-10 inline-flex w-full items-center justify-center rounded-full px-6 py-3.5 text-sm font-semibold uppercase tracking-wider transition-all hover:scale-[1.02] ${
                  p.popular
                    ? "bg-primary text-primary-foreground shadow-glow-primary"
                    : "bg-secondary text-foreground hover:bg-secondary/70"
                }`}
              >
                Book Now
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
