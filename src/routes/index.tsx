import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { DiagonalCarSection } from "@/components/site/DiagonalCarSection";
import { Services } from "@/components/site/Services";
import { BeforeAfter } from "@/components/site/BeforeAfter";
import { WhyUs } from "@/components/site/WhyUs";
import { Process } from "@/components/site/Process";
import { Packages } from "@/components/site/Packages";
import { Gallery } from "@/components/site/Gallery";
import { Reviews } from "@/components/site/Reviews";
import { Ceramic } from "@/components/site/Ceramic";
import { CtaBanner } from "@/components/site/CtaBanner";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { FloatingWhatsApp } from "@/components/site/FloatingWhatsApp";
import { ScrollProgress } from "@/components/site/ScrollProgress";

export const Route = createFileRoute("/")({
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
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "AutoBodyShop",
          name: "Polish Station",
          description:
            "Premium automotive detailing studio specializing in paint correction, ceramic coating, and luxury vehicle care.",
          priceRange: "$$$",
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
      <ScrollProgress />
      <Header />
      <main>
        <Hero />
        <DiagonalCarSection />
        <Services />
        <BeforeAfter />
        <WhyUs />
        <Process />
        <Packages />
        <Gallery />
        <Reviews />
        <Ceramic />
        <CtaBanner />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
