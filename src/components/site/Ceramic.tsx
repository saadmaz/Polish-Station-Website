import { Droplet, Sun, Sparkles, FlaskRound, Wand2, Shield } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { TiltCard } from "@/components/ui/tilt-card";

const benefits = [
  { icon: Droplet,    title: "Hydrophobic",         desc: "Water beads off, taking dirt with it." },
  { icon: Sun,        title: "UV Protection",        desc: "Stops paint fade from sun exposure." },
  { icon: Sparkles,   title: "High Gloss",           desc: "Glass-like depth and clarity." },
  { icon: FlaskRound, title: "Chemical Resistance",  desc: "Shrugs off bird droppings and bug acids." },
  { icon: Wand2,      title: "Easy Maintenance",     desc: "Wash less, look better, every time." },
  { icon: Shield,     title: "9H Hardness",          desc: "Guards against fine swirls and marring." },
];

export function Ceramic() {
  return (
    <section className="section-padding relative overflow-hidden">

      {/* ── Ambient glass orb - the signature ceramic shimmer ───────────── */}
      <div
        className="pointer-events-none absolute -left-20 top-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full animate-orb-drift hidden lg:block"
        style={{
          background: "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.06), rgba(210,11,11,0.04) 40%, transparent 70%)",
          boxShadow: "inset 0 0 80px rgba(255,255,255,0.04), 0 0 120px rgba(210,11,11,0.06)",
          border: "1px solid rgba(255,255,255,0.05)",
        }}
      />
      {/* Smaller orb - contrasting position */}
      <div
        className="pointer-events-none absolute right-10 bottom-10 h-64 w-64 rounded-full animate-orb-drift hidden lg:block"
        style={{
          animationDelay: "-6s",
          background: "radial-gradient(circle at 60% 40%, rgba(210,11,11,0.08), transparent 70%)",
          border: "1px solid rgba(210,11,11,0.06)",
        }}
      />

      {/* ── Water bead drops ────────────────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0">
        {Array.from({ length: 14 }).map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full border border-primary/40 bg-primary/5"
            style={{
              left:   `${(i * 71) % 95}%`,
              top:    `${(i * 53) % 95}%`,
              width:  `${20 + (i % 4) * 14}px`,
              height: `${20 + (i % 4) * 14}px`,
              animation: `water-drop ${4 + (i % 3)}s ease-out ${i * 0.4}s infinite`,
              filter: "blur(0.5px)",
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:items-center">

        {/* Left: headline + stats */}
        <Reveal variant="left">
          <div>
            <div className="eyebrow mb-4">
              <span className="h-px w-8 bg-primary" /> Featured Treatment
            </div>
            <h2 className="font-display text-4xl font-bold uppercase leading-tight md:text-6xl">
              Ceramic <span className="text-gradient-primary">coating.</span>
            </h2>
            <p className="mt-6 max-w-md text-muted-foreground">
              A liquid polymer that bonds chemically with your paint to create a
              permanent shield - years of unmatched gloss and protection in a
              single application.
            </p>

            {/* Stats box with gloss sweep */}
            <div className="relative mt-8 inline-flex items-center gap-6 overflow-hidden rounded-2xl glass depth-shadow px-6 py-4">
              <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/25 to-transparent" />
              {/* Gloss sweep */}
              <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
                <div
                  className="absolute inset-y-0 w-12 bg-linear-to-r from-transparent via-white/12 to-transparent"
                  style={{ animation: "gloss-sweep 4s ease-in-out 0.5s infinite" }}
                />
              </div>
              <div className="relative">
                <div className="font-display text-4xl font-bold text-gradient-primary">9H</div>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Hardness</div>
              </div>
              <div className="h-12 w-px bg-border" />
              <div className="relative">
                <div className="font-display text-4xl font-bold text-gradient-silver">5yr</div>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Warranty</div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Right: benefit cards */}
        <ul className="grid gap-3 sm:grid-cols-2">
          {benefits.map((b, i) => (
            <Reveal key={b.title} variant="right" delay={i * 80}>
              <TiltCard
                intensity={6}
                className="group flex items-start gap-4 rounded-2xl glass depth-shadow p-5 transition-all h-full"
              >
                <div
                  data-shine
                  className="absolute inset-0 pointer-events-none opacity-0 rounded-2xl"
                  style={{ transition: "opacity 0.4s ease" }}
                />
                <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/15 to-transparent" />
                <span className="relative grid h-10 w-10 flex-none place-items-center rounded-xl bg-primary/15 text-primary transition-transform group-hover:scale-110">
                  <b.icon className="h-5 w-5" strokeWidth={1.5} />
                </span>
                <div className="relative">
                  <div className="font-display text-sm font-bold uppercase tracking-wide">{b.title}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{b.desc}</div>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
