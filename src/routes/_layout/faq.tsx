import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/ui/reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Do I need an appointment, or can I walk in?",
    a: "Appointments are strongly recommended - each car gets undivided attention and bays are limited, so walk-ins may need to wait or be rebooked. Use the Book page or WhatsApp us to reserve a slot.",
  },
  {
    q: "How long does ceramic coating protection last?",
    a: "It depends on the coating tier and how the car is maintained afterward. We'll go through the specific warranty terms for your chosen coating when you book - ask us directly for exact coverage.",
  },
  {
    q: "Do you offer pickup and drop-off?",
    a: "Message us on WhatsApp with your location and we'll confirm whether pickup/drop-off is available for your area.",
  },
  {
    q: "What payment methods do you accept?",
    a: "Cash and standard card payment are accepted in-studio. Ask us directly if you need another arrangement.",
  },
  {
    q: "Can I get a price before booking?",
    a: "Yes - package pricing is listed on the homepage, and each service page includes an estimated turnaround. For anything custom (e.g. a multi-stage correction on a heavily swirled car), tell us in the booking notes and we'll confirm a price before starting any work.",
  },
  {
    q: "What's the difference between ceramic and graphene coating?",
    a: "Both bond to the clear coat for long-term hydrophobic protection. Graphene adds better heat dissipation and slightly more flexibility, which matters most on dark-colored cars and on wraps/PPF. See the Ceramic Coating and Graphene Coating service pages for more detail.",
  },
  {
    q: "How soon can I wash my car after a coating is applied?",
    a: "Ceramic needs at least two weeks before its first wash, with the full cure taking 2-3 weeks. Graphene is quicker - no water for the first 24-48 hours, no soap for the first week, then normal washing resumes. See our full Aftercare Guide for the complete curing timeline and dos/don'ts.",
  },
  {
    q: "Water isn't beading on my car anymore - is the coating ruined?",
    a: "No - that's the most common sign your coating needs a maintenance refresh, not that it has failed. A wash with a pH-neutral coating soap and a coating-safe detailer usually restores it. Full troubleshooting steps are in our Aftercare Guide.",
  },
];

export const Route = createFileRoute("/_layout/faq")({
  head: () => ({
    meta: [
      { title: "FAQ - Polish Station" },
      {
        name: "description",
        content:
          "Answers to common questions about booking, pricing, and detailing services at Polish Station.",
      },
    ],
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
            <a href="/#contact" className="text-primary hover:underline">
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
