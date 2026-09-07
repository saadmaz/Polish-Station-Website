import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/site/Hero";
import { DiagonalCarSection } from "@/components/site/DiagonalCarSection";
import { WhyUs } from "@/components/site/WhyUs";
import { Services } from "@/components/site/Services";
import { Packages } from "@/components/site/Packages";
import { BeforeAfter } from "@/components/site/BeforeAfter";
import { Process } from "@/components/site/Process";
import { Gallery } from "@/components/site/Gallery";
import { FaqTeaser } from "@/components/site/FaqTeaser";
import { Reviews } from "@/components/site/Reviews";
import { CtaBanner } from "@/components/site/CtaBanner";
import { ContactStrip } from "@/components/site/ContactStrip";

// The 3 packages featured on the home teaser - the two "popular" tiers plus
// the flagship coating, spanning the price range. Full catalogue is /services.
const PACKAGE_TEASER_SLUGS = ["cut-polish-interior", "10h-ceramic-coating", "graphene-coating"];

export const Route = createFileRoute("/_layout/")({
  head: () => ({
    meta: [
      { title: "Polish Station - Premium Car Detailing & Ceramic Coating" },
      {
        name: "description",
        content:
          "Polish Station is a premium automotive detailing studio offering paint correction, ceramic & graphene coating, interior detailing and luxury vehicle protection.",
      },
      { property: "og:title", content: "Polish Station - Premium Car Detailing Studio" },
      {
        property: "og:description",
        content:
          "Paint correction, ceramic coating, and luxury automotive detailing. Restore. Protect. Perfect.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.polishstation.lk" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://www.polishstation.lk" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "AutoBodyShop",
          name: "Polish Station",
          description:
            "Premium automotive detailing studio specializing in paint correction, ceramic coating, and luxury vehicle care.",
          url: "https://www.polishstation.lk",
          telephone: "+94711885252",
          priceRange: "LKR 12,500 - LKR 145,000",
          address: {
            "@type": "PostalAddress",
            streetAddress: "22C, Saranankara Road",
            addressLocality: "Dehiwala",
            addressCountry: "LK",
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: 6.871447,
            longitude: 79.867224,
          },
          openingHoursSpecification: {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            opens: "08:00",
            closes: "19:00",
          },
          areaServed: "Dehiwala, Sri Lanka",
          openingHours: "Mo-Sa 08:00-19:00",
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <DiagonalCarSection />
      <WhyUs />
      <Services limit={6} showViewAll />
      <Packages slugs={PACKAGE_TEASER_SLUGS} showViewAll />
      <BeforeAfter />
      <Process />
      <Gallery limit={6} hideFilters showViewAll />
      <FaqTeaser />
      <Reviews />
      <CtaBanner />
      <ContactStrip />
    </>
  );
}
