import { Reveal } from "@/components/ui/reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/lib/data/faq";

const TEASER_COUNT = 8;

export function FaqTeaser() {
  const items = faqs.slice(0, TEASER_COUNT);

  return (
    <section id="faq" className="section-padding relative">
      <div className="mx-auto max-w-3xl px-6">
        <Reveal variant="up">
          <div className="mb-12 max-w-2xl">
            <div className="eyebrow mb-4">
              <span className="h-px w-8 bg-primary" /> FAQ
            </div>
            <h2 className="font-display text-4xl font-bold uppercase leading-tight md:text-6xl">
              Common <span className="text-gradient-primary">questions.</span>
            </h2>
          </div>
        </Reveal>

        <Reveal variant="up" delay={100}>
          <Accordion type="single" collapsible className="rounded-3xl glass-strong px-8">
            {items.map((f) => (
              <AccordionItem key={f.q} value={f.q} className="border-border/60">
                <AccordionTrigger className="text-left text-base font-semibold">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>

        <Reveal variant="up" delay={150}>
          <p className="mt-8 text-center text-sm text-muted-foreground">
            <a href="/faq" className="text-primary hover:underline">
              See all frequently asked questions
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
