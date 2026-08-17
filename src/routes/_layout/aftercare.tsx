import { createFileRoute } from "@tanstack/react-router";
import {
  Droplets,
  Sun,
  TreeDeciduous,
  Bug,
  Check,
  X,
  Clock,
  CalendarCheck,
  CalendarClock,
  Sparkles,
} from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const ceramicAvoid = [
  { icon: Droplets, text: "Washing the vehicle - do not wash for at least two weeks after application." },
  { icon: Sun, text: "Exposure to water and rain, including sprinklers and foggy conditions - can cause water spotting." },
  { icon: TreeDeciduous, text: "Parking under trees - sap, leaves, and branches can etch or scratch the coating." },
  { icon: Bug, text: "Letting bird droppings, bug splatter, sap, or pollen sit on the car for more than a few days." },
];

const ceramicDos = [
  "Hand wash using the two-bucket washing technique.",
  "Use touchless methods - high-pressure hose, foam cannon, or foam gun.",
  "Use a dedicated coating-safe detail spray between full washes.",
  "Wash with a pH-neutral soap formulated for coated surfaces (or a rinseless wash).",
  "Use a coating-safe drying aid on a still-wet surface, never on a dry one.",
  "Use microfiber wash mitts and towels; compressed-air drying is fine too.",
  "Wash in the shade, a garage, or a covered area - early morning or late afternoon is ideal.",
];

const ceramicDonts = [
  "Use an automatic car wash with brushes, mitts, or other material that touches the surface.",
  "Wash the vehicle in direct sunlight or when any surface is warm to the touch.",
  "Use soaps with wax or petroleum distillates, or a pH under 5.0 or above 9.0.",
  "Apply wax or paint sealant after washing.",
  "Use boost or enhancement sprays other than one designed specifically for your coating.",
  "Wipe debris off a dry surface with a towel - this can scratch the coating.",
];

const grapheneTimeline = [
  { when: "First 24-48 hours", detail: "Do not wash the vehicle or expose it to water. Park indoors or under cover, away from trees and bird activity." },
  { when: "First week", detail: "Avoid soap or detergent-based washes. If contaminated, rinse with plain water from a hose and dry with a clean microfiber towel only." },
  { when: "After 7 days", detail: "Normal washing with a pH-neutral, coating-safe soap can resume." },
];

const faqAccordion = [
  {
    q: "Water is no longer beading or sheeting off the surface - is my coating ruined?",
    a: "No - this is the most common sign your coating needs a maintenance refresh, not that it has failed. Road grime, mineral deposits, and soap residue build up over time and block the hydrophobic effect. Wash with a pH-neutral coating soap using the two-bucket method, rinse and dry completely, then apply a coating-safe detailer to refresh the hydrophobic layer. Think of it like a glass shower door: once soap or mineral build-up sets in, water starts to stick - a simple wash restores performance, no recoat required. If beading still doesn't return, the coating may be due for an annual maintenance wash with your installer.",
  },
];

export const Route = createFileRoute("/_layout/aftercare")({
  head: () => ({
    meta: [
      { title: "Aftercare Guide - Polish Station" },
      {
        name: "description",
        content:
          "How to care for your ceramic or graphene coating: curing timelines, washing do's and don'ts, maintenance schedules, and troubleshooting.",
      },
      { property: "og:url", content: "https://www.polishstation.lk/aftercare" },
    ],
    links: [{ rel: "canonical", href: "https://www.polishstation.lk/aftercare" }],
  }),
  component: AftercarePage,
});

function AftercarePage() {
  return (
    <>
      <section className="section-padding relative pt-32">
        <div className="mx-auto max-w-3xl px-6">
          <Reveal variant="up">
            <div className="eyebrow mb-4">
              <span className="h-px w-8 bg-primary" /> Coating Aftercare
            </div>
            <h1 className="font-display text-4xl font-bold uppercase leading-tight md:text-6xl">
              Protect your <span className="text-gradient-primary">investment.</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              A ceramic or graphene coating creates a durable, hydrophobic layer over your factory
              clear coat, making your car easier to clean and more resistant to everyday
              contaminants. It's highly effective, but not indestructible - proper aftercare during
              curing and consistent maintenance afterward keeps your finish looking its best and
              keeps any applicable warranty valid.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Ceramic ─────────────────────────────────────────────────────── */}
      <section className="relative">
        <div className="mx-auto max-w-4xl px-6 pb-16">
          <Reveal variant="up">
            <h2 className="font-display text-3xl font-bold uppercase tracking-wide">
              Ceramic Coating
            </h2>
            <p className="mt-3 text-muted-foreground">
              Curing takes 2-3 weeks depending on humidity and temperature - the most important
              window, while the coating is chemically bonding to your clear coat.
            </p>
          </Reveal>

          <Reveal variant="up" delay={80}>
            <div className="mt-8 rounded-3xl glass-strong p-8">
              <div className="mb-5 flex items-center gap-2 font-display text-sm font-bold uppercase tracking-widest text-primary">
                <Clock className="h-4 w-4" /> During the first two weeks, avoid
              </div>
              <ul className="grid gap-4 sm:grid-cols-2">
                {ceramicAvoid.map((item) => (
                  <li key={item.text} className="flex items-start gap-3 text-sm">
                    <span className="mt-0.5 grid h-8 w-8 flex-none place-items-center rounded-full bg-primary/15 text-primary">
                      <item.icon className="h-4 w-4" strokeWidth={1.5} />
                    </span>
                    <span className="text-foreground/90">{item.text}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-xs text-muted-foreground">
                If your vehicle is exposed to any of the above during curing, don't try to remove
                it yourself - contact your installer for guidance on safe contaminant removal.
              </p>
            </div>
          </Reveal>

          <Reveal variant="up" delay={120}>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <div className="rounded-2xl glass p-6">
                <div className="mb-4 flex items-center gap-2 font-display text-sm font-bold uppercase tracking-widest">
                  <Check className="h-4 w-4 text-primary" /> Do
                </div>
                <ul className="space-y-2.5 text-sm text-foreground/90">
                  {ceramicDos.map((d) => (
                    <li key={d} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-3.5 w-3.5 flex-none text-primary" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl glass p-6">
                <div className="mb-4 flex items-center gap-2 font-display text-sm font-bold uppercase tracking-widest">
                  <X className="h-4 w-4 text-destructive" /> Don't
                </div>
                <ul className="space-y-2.5 text-sm text-foreground/90">
                  {ceramicDonts.map((d) => (
                    <li key={d} className="flex items-start gap-2">
                      <X className="mt-0.5 h-3.5 w-3.5 flex-none text-destructive" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>

          <Reveal variant="up" delay={160}>
            <div className="mt-8 rounded-2xl border border-border/60 bg-card/40 p-6">
              <div className="mb-3 flex items-center gap-2 font-display text-sm font-bold uppercase tracking-widest text-primary">
                <CalendarClock className="h-4 w-4" /> Recommended washing schedule
              </div>
              <ul className="space-y-2 text-sm text-foreground/90">
                <li>Wash at least every two weeks to prevent contaminant build-up.</li>
                <li>Use only pH-neutral, coating-safe soaps.</li>
                <li>
                  Foam cannons with a high-pressure hose are fine for regular washes, but a full
                  two-bucket hand wash is recommended at least every 60 days.
                </li>
                <li>
                  Spot-clean sticky contaminants (bird droppings, sap, pollen, tar) as soon as
                  possible with a coating-safe detail spray and a plush microfiber towel - or plain
                  water and two clean towels if no spray is on hand.
                </li>
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Graphene ────────────────────────────────────────────────────── */}
      <section className="relative border-t border-border/60">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <Reveal variant="up">
            <h2 className="font-display text-3xl font-bold uppercase tracking-wide">
              Graphene Coating
            </h2>
            <p className="mt-3 text-muted-foreground">
              Graphene cures faster than ceramic, but the early hours and first week still need
              care to lock in maximum protection and gloss.
            </p>
          </Reveal>

          <Reveal variant="up" delay={80}>
            <div className="mt-8 rounded-3xl glass-strong p-8">
              <div className="mb-5 flex items-center gap-2 font-display text-sm font-bold uppercase tracking-widest text-primary">
                <Clock className="h-4 w-4" /> Curing timeline
              </div>
              <ul className="space-y-5">
                {grapheneTimeline.map((t) => (
                  <li key={t.when} className="flex items-start gap-4">
                    <span className="mt-0.5 flex-none rounded-full bg-primary/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-primary">
                      {t.when}
                    </span>
                    <span className="text-sm text-foreground/90">{t.detail}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-xs text-muted-foreground">
                If you notice water spots, bird droppings, bugs, or tree sap during the first few
                days, remove them right away using a gentle spot-clean - the coating is still
                curing.
              </p>
            </div>
          </Reveal>

          <Reveal variant="up" delay={120}>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <div className="rounded-2xl glass p-6">
                <div className="mb-3 flex items-center gap-2 font-display text-sm font-bold uppercase tracking-widest">
                  <Sparkles className="h-4 w-4 text-primary" /> Maintenance & boost sprays
                </div>
                <p className="text-sm text-foreground/90">
                  A graphene-safe detail spray boosts the existing coating rather than replacing
                  it - restoring gloss, slickness, and water beading. Spray-on, wipe-off, no full
                  wash required, great for keeping the finish sharp between full details.
                </p>
              </div>
              <div className="rounded-2xl glass p-6">
                <div className="mb-3 flex items-center gap-2 font-display text-sm font-bold uppercase tracking-widest">
                  <CalendarCheck className="h-4 w-4 text-primary" /> Deep cleaning schedule
                </div>
                <p className="text-sm text-foreground/90">
                  Follow up with a thorough clean every four months to remove build-up from
                  everyday driving, finishing with a coating-safe detailer to rejuvenate the
                  hydrophobic layer.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Ongoing maintenance & inspections ──────────────────────────── */}
      <section className="relative border-t border-border/60">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <Reveal variant="up">
            <h2 className="font-display text-3xl font-bold uppercase tracking-wide">
              Ongoing Maintenance & Inspections
            </h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <div className="rounded-2xl glass p-6">
                <div className="font-display text-sm font-bold uppercase tracking-widest text-primary">
                  Maintenance plan
                </div>
                <p className="mt-3 text-sm text-foreground/90">
                  We recommend a minimum 4-weekly maintenance schedule so your coating is
                  properly cared for and regularly inspected. Skipping regular maintenance may
                  void your warranty. Prefer to maintain it yourself? Follow this guide as closely
                  as possible.
                </p>
              </div>
              <div className="rounded-2xl glass p-6">
                <div className="font-display text-sm font-bold uppercase tracking-widest text-primary">
                  Annual inspection
                </div>
                <p className="mt-3 text-sm text-foreground/90">
                  Schedule an inspection with an approved applicator within 30 days before the
                  anniversary of your last service, to confirm the coating is performing as
                  expected and to protect warranty validity.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Troubleshooting ─────────────────────────────────────────────── */}
      <section className="relative border-t border-border/60">
        <div className="mx-auto max-w-3xl px-6 py-16">
          <Reveal variant="up">
            <h2 className="font-display text-3xl font-bold uppercase tracking-wide">
              Troubleshooting
            </h2>
          </Reveal>
          <Reveal variant="up" delay={80}>
            <Accordion type="single" collapsible className="mt-8 rounded-3xl glass-strong px-8">
              {faqAccordion.map((f) => (
                <AccordionItem key={f.q} value={f.q} className="border-border/60">
                  <AccordionTrigger className="text-left text-base font-semibold">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </section>

      <section className="section-padding relative">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <Reveal variant="scale">
            <p className="mb-6 text-sm text-muted-foreground">
              Exposed to something during curing, or not sure which coating was applied? Check
              your service paperwork, or reach out directly.
            </p>
            <a
              href="/#contact"
              className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-4 text-sm font-semibold uppercase tracking-wider text-primary-foreground shadow-glow-primary transition-transform hover:scale-105"
            >
              Contact Us
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
