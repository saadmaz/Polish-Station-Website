import {
  Sparkles, Droplets, Shield, Sofa, Car, Atom, Wrench, Lightbulb, ArrowUpRight,
} from "lucide-react";
import { TiltCard } from "@/components/ui/tilt-card";

const services = [
  { icon: Sparkles, title: "Paint Correction",       desc: "Multi-stage compounding to erase swirls, scratches and oxidation." },
  { icon: Droplets, title: "Cut & Polish",           desc: "Restore depth and clarity to factory paintwork." },
  { icon: Shield,   title: "Ceramic Coating",        desc: "9H hardness, hydrophobic, years of glass-like protection." },
  { icon: Sofa,     title: "Interior Detailing",     desc: "Deep extraction, leather conditioning, sanitization." },
  { icon: Car,      title: "Exterior Detailing",     desc: "Decontamination, clay treatment, finish refinement." },
  { icon: Atom,     title: "Graphene Coating",       desc: "Next-gen protection with extreme heat dissipation." },
  { icon: Wrench,   title: "Engine Bay Cleaning",    desc: "Safe degreasing and dressing for showroom engines." },
  { icon: Lightbulb,title: "Headlight Restoration",  desc: "Clarity, UV protection and brighter night vision." },
];

export function Services() {
  return (
    <section id="services" className="section-padding relative">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <div className="eyebrow mb-4">
              <span className="h-px w-8 bg-primary" /> Our Services
            </div>
            <h2 className="font-display text-4xl font-bold uppercase leading-tight md:text-6xl">
              Craft &nbsp;<span className="text-gradient-primary">obsessed</span><br />
              with every micron.
            </h2>
          </div>
          <p className="max-w-sm text-muted-foreground">
            From paint correction to ceramic protection — a complete catalogue of
            services performed with surgical precision.
          </p>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <TiltCard
              key={s.title}
              intensity={8}
              className="group relative overflow-hidden rounded-2xl glass depth-shadow cursor-pointer"
            >
              {/* Shine follows mouse via useTilt */}
              <div
                data-shine
                className="absolute inset-0 pointer-events-none opacity-0 rounded-2xl"
                style={{ transition: "opacity 0.4s ease" }}
              />
              {/* Metallic top edge */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
              {/* Hover glow bloom */}
              <div className="absolute -top-20 left-1/2 -translate-x-1/2 h-40 w-40 rounded-full bg-primary/20 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" />

              <div className="relative p-8">
                {/* Icon with cast shadow for depth */}
                <div className="relative mb-6 inline-block">
                  <div className="absolute inset-x-1 bottom-0 top-3 rounded-xl bg-black/60 blur-lg" />
                  <div className="relative grid h-14 w-14 place-items-center rounded-xl bg-graphite text-primary transition-all duration-500 group-hover:scale-110 group-hover:-rotate-6">
                    <s.icon className="h-6 w-6" strokeWidth={1.5} />
                  </div>
                </div>

                <h3 className="font-display text-xl font-bold uppercase tracking-wide">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {s.desc}
                </p>
                <div className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  Learn More <ArrowUpRight className="h-3 w-3" />
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
