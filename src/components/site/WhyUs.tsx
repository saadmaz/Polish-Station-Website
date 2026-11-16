import { Award, FlaskConical, Cpu, ScanSearch } from "lucide-react";
import { TiltCard } from "@/components/ui/tilt-card";
import { Reveal } from "@/components/ui/reveal";

const items = [
  {
    icon: Award,
    title: "Expert Technicians",
    desc: "Certified detailers with thousands of hours of paint experience.",
  },
  {
    icon: FlaskConical,
    title: "Premium Products",
    desc: "Only the top-tier coatings and compounds make it to your car.",
  },
  {
    icon: Cpu,
    title: "Advanced Equipment",
    desc: "Calibrated polishers, paint gauges and controlled environments.",
  },
  {
    icon: ScanSearch,
    title: "Attention to Detail",
    desc: "We inspect under multiple light sources - nothing is missed.",
  },
];

export function WhyUs() {
  return (
    <section className="section-padding relative">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal variant="up">
          <div className="mb-14 grid items-end gap-8 md:grid-cols-2">
            <div>
              <div className="eyebrow mb-4">
                <span className="h-px w-8 bg-primary" /> Why Choose Us
              </div>
              <h2 className="font-display text-4xl font-bold uppercase leading-tight md:text-6xl">
                Engineered for <br />
                <span className="text-gradient-primary">perfection.</span>
              </h2>
            </div>
            <p className="text-muted-foreground md:text-right">
              We don't wash cars. We preserve and elevate automotive excellence with the rigor of a
              precision workshop.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {items.map((it, i) => (
            <Reveal key={it.title} variant="up" delay={i * 100}>
              <TiltCard
                intensity={9}
                className="group relative overflow-hidden rounded-2xl glass depth-shadow cursor-default h-full"
              >
                {/* Shine overlay */}
                <div
                  data-shine
                  className="absolute inset-0 pointer-events-none opacity-0 rounded-2xl"
                  style={{ transition: "opacity 0.4s ease" }}
                />
                {/* Metallic top edge */}
                <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />
                {/* Orange accent bar that sweeps full width on hover */}
                <span className="absolute left-0 top-0 h-px w-14 bg-primary transition-all duration-700 group-hover:w-full" />
                {/* Gloss sweep */}
                <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
                  <div
                    className="absolute inset-y-0 w-16 bg-linear-to-r from-transparent via-white/06 to-transparent"
                    style={{ animation: `gloss-sweep 8s ease-in-out ${i * 1.1}s infinite` }}
                  />
                </div>

                {/* Large ghost number */}
                <div className="absolute right-3 top-3 font-display text-[7rem] font-black leading-none select-none pointer-events-none text-white/[0.025]">
                  {String(i + 1).padStart(2, "0")}
                </div>

                <div className="relative p-8">
                  <div className="text-[10px] font-mono tracking-widest text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="relative mt-6 inline-block">
                    <div className="absolute inset-x-1 bottom-0 top-2 rounded-full bg-black/50 blur-lg" />
                    <it.icon className="relative h-8 w-8 text-primary" strokeWidth={1.4} />
                  </div>
                  <h3 className="mt-8 font-display text-lg font-bold uppercase tracking-wide">
                    {it.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{it.desc}</p>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
