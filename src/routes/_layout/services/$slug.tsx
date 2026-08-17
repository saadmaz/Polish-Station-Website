import { createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { getServiceBySlug, services } from "@/lib/data/services";

export const Route = createFileRoute("/_layout/services/$slug")({
  loader: ({ params }) => {
    // Only the notFound() check happens here - the service object itself
    // (which includes a React icon component) must never end up in
    // loaderData, since TanStack Start serializes loader data for client
    // hydration and a component reference isn't serializable.
    if (!getServiceBySlug(params.slug)) throw notFound();
  },
  head: ({ params }) => {
    const service = getServiceBySlug(params.slug);
    if (!service) return {};
    const url = `https://www.polishstation.lk/services/${service.slug}`;
    return {
      meta: [
        { title: `${service.title} - Polish Station` },
        { name: "description", content: service.why },
        { property: "og:url", content: url },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            serviceType: service.title,
            description: service.why,
            provider: {
              "@type": "AutoBodyShop",
              name: "Polish Station",
              url: "https://www.polishstation.lk",
            },
            areaServed: "Dehiwala, Sri Lanka",
          }),
        },
      ],
    };
  },
  component: ServicePage,
});

function ServicePage() {
  const { slug } = Route.useParams();
  const service = getServiceBySlug(slug)!;
  const Icon = service.icon;

  return (
    <>
      <section className="section-padding relative pt-32">
        <div className="mx-auto max-w-4xl px-6">
          <Reveal variant="up">
            <div className="eyebrow mb-4">
              <span className="h-px w-8 bg-primary" /> Service
            </div>
            <div className="mb-6 grid h-16 w-16 place-items-center rounded-xl bg-graphite text-primary">
              <Icon className="h-7 w-7" strokeWidth={1.5} />
            </div>
            <h1 className="font-display text-4xl font-bold uppercase leading-tight md:text-6xl">
              {service.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">{service.shortDesc}</p>
          </Reveal>
        </div>
      </section>

      <section className="relative">
        <div className="mx-auto max-w-4xl px-6 pb-8">
          <Reveal variant="up">
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide">
              Why it matters
            </h2>
            <p className="mt-4 leading-relaxed text-foreground/90">{service.why}</p>
          </Reveal>
        </div>
      </section>

      <section className="relative">
        <div className="mx-auto max-w-4xl px-6 py-8">
          <Reveal variant="up">
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide">Our process</h2>
            <ul className="mt-6 space-y-4">
              {service.process.map((step, i) => (
                <li key={step} className="flex items-start gap-4 rounded-2xl glass p-5">
                  <span className="grid h-8 w-8 flex-none place-items-center rounded-full bg-primary/15 text-sm font-bold text-primary">
                    {i + 1}
                  </span>
                  <span className="text-sm text-foreground/90">{step}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal variant="up" delay={100}>
            <div className="mt-8 flex items-center gap-3 rounded-2xl border border-border/60 bg-card/40 px-6 py-4 text-sm text-muted-foreground">
              <Check className="h-4 w-4 flex-none text-primary" />
              Estimated turnaround: {service.timeEstimate}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-padding relative">
        <div className="mx-auto max-w-4xl px-6">
          <Reveal variant="scale">
            <div className="flex flex-col items-start justify-between gap-6 rounded-3xl glass-strong p-10 sm:flex-row sm:items-center">
              <div>
                <h2 className="font-display text-2xl font-bold uppercase tracking-wide">
                  Ready to book {service.title.toLowerCase()}?
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Tell us about your car and we'll confirm a slot.
                </p>
              </div>
              <a
                href={`/book?service=${service.slug}`}
                className="group inline-flex flex-none items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold uppercase tracking-wider text-primary-foreground shadow-glow-primary transition-transform hover:scale-105"
              >
                Book This Service
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </Reveal>

          <div className="mt-10 flex flex-wrap gap-3">
            {services
              .filter((s) => s.slug !== service.slug)
              .slice(0, 4)
              .map((s) => (
                <a
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="rounded-full glass px-4 py-2 text-xs font-semibold uppercase tracking-widest text-foreground/80 hover:bg-primary hover:text-primary-foreground transition"
                >
                  {s.title}
                </a>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
