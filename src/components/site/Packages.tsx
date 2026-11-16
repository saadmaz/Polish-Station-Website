import { ArrowRight, Check, ShieldCheck } from "lucide-react";
import { TiltCard } from "@/components/ui/tilt-card";
import { Reveal } from "@/components/ui/reveal";
import { packages, formatLkr, type Package } from "@/lib/data/pricing";

export function Packages({
  slugs,
  hideHeading = false,
  showViewAll = false,
}: {
  /** When given, shows only these packages (in this order) as one flat grid - no category grouping. */
  slugs?: string[];
  hideHeading?: boolean;
  showViewAll?: boolean;
}) {
  const teaser = slugs
    ? slugs.map((slug) => packages.find((p) => p.slug === slug)).filter((p): p is Package => !!p)
    : null;
  const detailingPackages = packages.filter((p) => p.category === "detailing");
  const coatingPackages = packages.filter((p) => p.category === "coating");

  return (
    <section id="packages" className="section-padding relative">
      <div className="mx-auto max-w-7xl px-6">
        {!hideHeading && (
          <Reveal variant="up">
            <div className="mb-16 max-w-2xl">
              <div className="eyebrow mb-4">
                <span className="h-px w-8 bg-primary" /> Packages & Pricing
              </div>
              <h2 className="font-display text-4xl font-bold uppercase leading-tight md:text-6xl">
                Choose your <span className="text-gradient-primary">level.</span>
              </h2>
              <p className="mt-4 text-muted-foreground">
                Prices include paint preparation and professional application. Every coating
                application includes professional paint correction before it goes on.
              </p>
            </div>
          </Reveal>
        )}

        {teaser ? (
          <PackageGrid items={teaser} offset={0} />
        ) : (
          <>
            <Reveal variant="up" delay={60}>
              <h3 className="font-display text-sm font-bold uppercase tracking-[0.25em] text-muted-foreground">
                Cut & Polish and Interior
              </h3>
            </Reveal>
            <PackageGrid items={detailingPackages} offset={0} />

            <Reveal variant="up" delay={60}>
              <h3 className="mt-16 font-display text-sm font-bold uppercase tracking-[0.25em] text-muted-foreground">
                Protective Coatings
              </h3>
            </Reveal>
            <PackageGrid items={coatingPackages} offset={detailingPackages.length} />
          </>
        )}

        {showViewAll && (
          <div className="mt-12 flex justify-center">
            <a
              href="/services"
              className="group inline-flex items-center gap-2 rounded-full glass px-7 py-3.5 text-sm font-semibold uppercase tracking-wider transition-all hover:bg-primary hover:text-primary-foreground"
            >
              See full pricing
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}

function PackageGrid({ items, offset }: { items: Package[]; offset: number }) {
  return (
    <div className="mt-6 grid gap-6 lg:grid-cols-3">
      {items.map((p, i) => (
        <Reveal key={p.slug} variant="scale" delay={(offset + i) * 130}>
          <TiltCard
            intensity={7}
            className={`relative overflow-hidden rounded-3xl depth-shadow h-full ${
              p.popular
                ? "bg-linear-to-b from-primary/15 to-card border border-primary/40 shadow-glow-primary"
                : "glass"
            }`}
          >
            {/* Shine overlay */}
            <div
              data-shine
              className="absolute inset-0 pointer-events-none opacity-0 rounded-3xl"
              style={{ transition: "opacity 0.4s ease" }}
            />
            {/* Metallic edge */}
            <div
              className={`absolute inset-x-0 top-0 h-px bg-linear-to-r ${
                p.popular
                  ? "from-transparent via-primary/70 to-transparent"
                  : "from-transparent via-white/25 to-transparent"
              }`}
            />
            {/* Gloss sweep */}
            <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
              <div
                className="absolute inset-y-0 w-20 bg-linear-to-r from-transparent via-white/06 to-transparent"
                style={{ animation: `gloss-sweep 6s ease-in-out ${i * 2}s infinite` }}
              />
            </div>
            {/* Top bloom */}
            <div
              className={`absolute -top-24 left-1/2 -translate-x-1/2 h-48 w-48 rounded-full blur-3xl pointer-events-none ${
                p.popular ? "bg-primary/20" : "bg-white/4"
              }`}
            />

            <div className="relative p-8">
              {p.popular && (
                <span className="absolute right-6 top-6 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary-foreground">
                  Most Popular
                </span>
              )}

              <h3 className="font-display text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground">
                {p.name}
              </h3>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="font-display text-4xl font-bold text-gradient-silver">
                  {formatLkr(p.priceLkr)}
                </span>
                <span className="text-xs font-medium text-muted-foreground">/ car</span>
              </div>
              {p.priceLkrSuv != null && (
                <div className="mt-1 text-xs font-medium text-muted-foreground">
                  SUV: {formatLkr(p.priceLkrSuv)}
                </div>
              )}
              <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
              {p.durability && (
                <div className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                  <ShieldCheck className="h-3.5 w-3.5" /> {p.durability}
                </div>
              )}

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
                href={`/book?package=${p.slug}`}
                className={`mt-10 inline-flex w-full items-center justify-center rounded-full px-6 py-3.5 text-sm font-semibold uppercase tracking-wider transition-all hover:scale-[1.02] ${
                  p.popular
                    ? "bg-primary text-primary-foreground shadow-glow-primary"
                    : "bg-secondary text-foreground hover:bg-secondary/70"
                }`}
              >
                Book Now
              </a>
            </div>
          </TiltCard>
        </Reveal>
      ))}
    </div>
  );
}
