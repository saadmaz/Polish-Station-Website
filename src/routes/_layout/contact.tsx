import { createFileRoute } from "@tanstack/react-router";
import { Contact } from "@/components/site/Contact";

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
      { property: "og:url", content: "https://www.polishstation.lk/contact" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://www.polishstation.lk/contact" }],
  }),
  component: Contact,
});
