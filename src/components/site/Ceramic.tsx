import { Droplet, Sun, Sparkles, FlaskRound, Wand2, Shield } from "lucide-react";

const benefits = [
  { icon: Droplet, title: "Hydrophobic", desc: "Water beads off, taking dirt with it." },
  { icon: Sun, title: "UV Protection", desc: "Stops paint fade from sun exposure." },
  { icon: Sparkles, title: "High Gloss", desc: "Glass-like depth and clarity." },
  { icon: FlaskRound, title: "Chemical Resistance", desc: "Shrugs off bird droppings and bug acids." },
  { icon: Wand2, title: "Easy Maintenance", desc: "Wash less, look better, every time." },
  { icon: Shield, title: "9H Hardness", desc: "Guards against fine swirls and marring." },
];

export function Ceramic() {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Water drops */}
      <div className="pointer-events-none absolute inset-0">
        {Array.from({ length: 12 }).map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full border border-primary/40 bg-primary/5"
            style={{
              left: `${(i * 71) % 95}%`,
              top: `${(i * 53) % 95}%`,
              width: `${20 + (i % 4) * 10}px`,
              height: `${20 + (i % 4) * 10}px`,
              animation: `water-drop ${4 + (i % 3)}s ease-out ${i * 0.4}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:items-center">
        <div>
          <div className="eyebrow mb-4">
            <span className="h-px w-8 bg-primary" /> Featured Treatment
          </div>
          <h2 className="font-display text-4xl font-bold uppercase leading-tight md:text-6xl">
            Ceramic <span className="text-gradient-primary">coating.</span>
          </h2>
          <p className="mt-6 max-w-md text-muted-foreground">
            A liquid polymer that bonds chemically with your paint to create a
            permanent shield — years of unmatched gloss and protection in a
            single application.
          </p>

          <div className="mt-8 inline-flex items-center gap-6 rounded-2xl glass px-6 py-4">
            <div>
              <div className="font-display text-4xl font-bold text-gradient-primary">9H</div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Hardness</div>
            </div>
            <div className="h-12 w-px bg-border" />
            <div>
              <div className="font-display text-4xl font-bold text-gradient-silver">5yr</div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Warranty</div>
            </div>
          </div>
        </div>

        <ul className="grid gap-3 sm:grid-cols-2">
          {benefits.map((b) => (
            <li
              key={b.title}
              className="group flex items-start gap-4 rounded-2xl glass p-5 transition-all hover:border-primary/40"
            >
              <span className="grid h-10 w-10 flex-none place-items-center rounded-xl bg-primary/15 text-primary transition-transform group-hover:scale-110">
                <b.icon className="h-5 w-5" strokeWidth={1.5} />
              </span>
              <div>
                <div className="font-display text-sm font-bold uppercase tracking-wide">
                  {b.title}
                </div>
                <div className="mt-1 text-xs text-muted-foreground">{b.desc}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
