import { ArrowRight, ArrowUpRight } from "lucide-react";
import { TiltCard } from "@/components/ui/tilt-card";
import { Reveal } from "@/components/ui/reveal";
import { services } from "@/lib/data/services";

export function Services({
  limit,
  showViewAll = false,
  hideHeading = false,
}: {
  limit?: number;
  showViewAll?: boolean;
  hideHeading?: boolean;
}) {
  const items = limit ? services.slice(0, limit) : services;

  return (
    <section id="services" className="section-padding relative">
      <div className="mx-auto max-w-7xl px-6">
        {!hideHeading && (
          <Reveal variant="up">
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
              <div className="max-w-2xl">
                <div className="eyebrow mb-4">
                  <span className="h-px w-8 bg-primary" /> Our Services
                </div>
                <h2 className="font-display text-4xl font-bold uppercase leading-tight md:text-6xl">
                  Craft &nbsp;<span className="text-gradient-primary">obsessed</span>
                  <br />
                  with every micron.
                </h2>
              </div>
              <p className="max-w-sm text-muted-foreground">
                From paint correction to ceramic protection - a complete catalogue of services
                performed with surgical precision.
              </p>
            </div>
          </Reveal>
        )}

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((s, i) => (
            /* Drive-in: each card slides from the left like entering a garage */
            <Reveal key={s.slug} variant="left" delay={i * 70}>
              <a href={`/services/${s.slug}`} className="block h-full">
                <TiltCard
                  intensity={8}
                  className="group relative overflow-hidden rounded-2xl glass depth-shadow cursor-pointer h-full"
                >
                  {/* Shine overlay - updated by useTilt */}
                  <div
                    data-shine
                    className="absolute inset-0 pointer-events-none opacity-0 rounded-2xl"
                    style={{ transition: "opacity 0.4s ease" }}
                  />
                  {/* Metallic top edge */}
                  <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/25 to-transparent" />
                  {/* Gloss sweep - periodic sheen */}
                  <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
                    <div
                      className="absolute inset-y-0 w-16 bg-linear-to-r from-transparent via-white/06 to-transparent"
                      style={{ animation: `gloss-sweep 7s ease-in-out ${i * 0.9}s infinite` }}
                    />
                  </div>
                  {/* Hover glow bloom */}
                  <div className="absolute -top-20 left-1/2 -translate-x-1/2 h-40 w-40 rounded-full bg-primary/20 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" />

                  <div className="relative p-8">
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
                      {s.shortDesc}
                    </p>
                    <div className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary opacity-0 transition-opacity group-hover:opacity-100">
                      Learn More <ArrowUpRight className="h-3 w-3" />
                    </div>
                  </div>
                </TiltCard>
              </a>
            </Reveal>
          ))}
        </div>

        {showViewAll && (
          <div className="mt-12 flex justify-center">
            <a
              href="/services"
              className="group inline-flex items-center gap-2 rounded-full glass px-7 py-3.5 text-sm font-semibold uppercase tracking-wider transition-all hover:bg-primary hover:text-primary-foreground"
            >
              View all services
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
