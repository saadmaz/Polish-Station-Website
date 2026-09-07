import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/ui/reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/lib/data/faq";

export const Route = createFileRoute("/_layout/faq")({
  head: () => ({
    meta: [
      { title: "FAQ - Polish Station" },
      {
        name: "description",
        content:
          "Answers to common questions about booking, pricing, and detailing services at Polish Station.",
      },
      { property: "og:url", content: "https://www.polishstation.lk/faq" },
    ],
    links: [{ rel: "canonical", href: "https://www.polishstation.lk/faq" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  return (
    <section className="section-padding relative pt-32">
      <div className="mx-auto max-w-3xl px-6">
        <Reveal variant="up">
          <div className="eyebrow mb-4">
            <span className="h-px w-8 bg-primary" /> FAQ
          </div>
          <h1 className="font-display text-4xl font-bold uppercase leading-tight md:text-6xl">
            Common <span className="text-gradient-primary">questions.</span>
          </h1>
        </Reveal>

        <Reveal variant="up" delay={100}>
          <Accordion type="single" collapsible className="mt-12 rounded-3xl glass-strong px-8">
            {faqs.map((f) => (
              <AccordionItem key={f.q} value={f.q} className="border-border/60">
                <AccordionTrigger className="text-base font-semibold">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>

        <Reveal variant="up" delay={150}>
          <p className="mt-10 text-center text-sm text-muted-foreground">
            Still have a question?{" "}
            <a href="/contact" className="text-primary hover:underline">
              Get in touch
            </a>{" "}
            or{" "}
            <a
              href="https://wa.me/94711885252"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              WhatsApp us
            </a>
            .
          </p>
        </Reveal>
      </div>
    </section>
  );
}
