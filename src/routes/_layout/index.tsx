import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/site/Hero";
import { DiagonalCarSection } from "@/components/site/DiagonalCarSection";
import { Services } from "@/components/site/Services";
import { BeforeAfter } from "@/components/site/BeforeAfter";
import { WhyUs } from "@/components/site/WhyUs";
import { Process } from "@/components/site/Process";
import { Gallery } from "@/components/site/Gallery";
import { Reviews } from "@/components/site/Reviews";
import { Ceramic } from "@/components/site/Ceramic";
import { CtaBanner } from "@/components/site/CtaBanner";
import { Contact } from "@/components/site/Contact";

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
          telephone: "+94741004296",
          address: {
            "@type": "PostalAddress",
            streetAddress: "22C, Saranankara Road",
            addressLocality: "Dehiwala",
            addressCountry: "LK",
          },
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
      <Services />
      <BeforeAfter />
      <WhyUs />
      <Process />
      <Gallery />
      <Reviews />
      <Ceramic />
      <CtaBanner />
      <Contact />
    </>
  );
}
