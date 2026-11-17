import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/ui/reveal";
import { Services } from "@/components/site/Services";
import { Packages } from "@/components/site/Packages";
import ogServices from "@/assets/og/og-services.jpg";
import { absoluteUrl } from "@/lib/seo";

export const Route = createFileRoute("/_layout/services/")({
  head: () => ({
    meta: [
      { title: "Services & Pricing - Polish Station" },
      {
        name: "description",
        content:
          "Paint correction, ceramic & graphene coating, interior and exterior detailing, engine bay cleaning and headlight restoration - full service catalogue and LKR pricing.",
      },
      { property: "og:title", content: "Services & Pricing - Polish Station" },
      {
        property: "og:description",
        content:
          "The full Polish Station service catalogue with package pricing for cars and SUVs.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.polishstation.lk/services" },
      { property: "og:image", content: absoluteUrl(ogServices) },
      { name: "twitter:image", content: absoluteUrl(ogServices) },
    ],
    links: [{ rel: "canonical", href: "https://www.polishstation.lk/services" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: "https://www.polishstation.lk/",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Services",
              item: "https://www.polishstation.lk/services",
            },
          ],
        }),
      },
    ],
  }),
  component: ServicesIndexPage,
});

function ServicesIndexPage() {
  return (
    <>
      <section className="section-padding relative pt-32 pb-0">
        <div className="mx-auto max-w-4xl px-6">
          <Reveal variant="up">
            <div className="eyebrow mb-4">
              <span className="h-px w-8 bg-primary" /> Services & Pricing
            </div>
            <h1 className="font-display text-4xl font-bold uppercase leading-tight md:text-6xl">
              Every service. <span className="text-gradient-primary">One studio.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
              From paint correction to graphene protection - a complete catalogue performed with
              surgical precision, plus the full package pricing below.
            </p>
          </Reveal>
        </div>
      </section>

      <Services hideHeading />
      <Packages />
    </>
  );
}
