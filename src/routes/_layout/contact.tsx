import { createFileRoute } from "@tanstack/react-router";
import { Contact } from "@/components/site/Contact";
import { SITE_URL } from "@/lib/seo";

export const Route = createFileRoute("/_layout/contact")({
  head: () => ({
    meta: [
      { title: "Contact - Polish Station" },
      {
        name: "description",
        content:
          "Get in touch with Polish Station in Dehiwala - address, phone, email, hours, and a contact form for questions and quotes.",
      },
      { property: "og:title", content: "Contact - Polish Station" },
      {
        property: "og:description",
        content: "Address, phone, email and hours for Polish Station in Dehiwala.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/contact` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/contact` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
            { "@type": "ListItem", position: 2, name: "Contact", item: `${SITE_URL}/contact` },
          ],
        }),
      },
    ],
  }),
  component: Contact,
});
