import { createFileRoute } from "@tanstack/react-router";
import { Award, Users, MapPin } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

export const Route = createFileRoute("/_layout/about")({
  head: () => ({
    meta: [
      { title: "About - Polish Station" },
      {
        name: "description",
        content:
          "Polish Station is an independent automotive detailing studio in Dehiwala, Sri Lanka - here's the standard we hold every car to.",
      },
      { property: "og:url", content: "https://www.polishstation.lk/about" },
    ],
    links: [{ rel: "canonical", href: "https://www.polishstation.lk/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <section className="section-padding relative pt-32">
        <div className="mx-auto max-w-3xl px-6">
          <Reveal variant="up">
            <div className="eyebrow mb-4">
              <span className="h-px w-8 bg-primary" /> About Polish Station
            </div>
            <h1 className="font-display text-4xl font-bold uppercase leading-tight md:text-6xl">
              Independent. <span className="text-gradient-primary">Obsessive.</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              {/*
                TODO(content): replace with the actual founder/studio story -
                who started it, why, and what makes this studio's standard
                different. Real, specific detail here is a genuine differentiator
                against franchise competitors; generic copy is not.
              */}
              Polish Station is an independent detailing studio based in Dehiwala, built on the idea
              that a car's finish deserves the same rigor as a precision workshop - not just a wash
              and a wax. Every car that comes through the bay is inspected under multiple light
              sources, corrected in stages, and finished to a standard we'd want on our own cars.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative">
        <div className="mx-auto max-w-3xl px-6 pb-8">
          <Reveal variant="up">
            <h2 className="font-display text-2xl font-bold uppercase tracking-wide">
              Our approach
            </h2>
            <p className="mt-4 leading-relaxed text-foreground/90">
              Being independent means we're not optimizing for volume the way a franchise chain does
              - we take on what one studio can genuinely give full attention to, and we say no to
              jobs we don't have time to do properly. That's the trade-off: fewer cars a day, more
              time on each one.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-padding relative">
        <div className="mx-auto max-w-5xl px-6">
          <Reveal variant="up">
            <div className="grid gap-6 sm:grid-cols-3">
              <div className="rounded-2xl glass p-8 text-center">
                <Award className="mx-auto h-8 w-8 text-primary" strokeWidth={1.5} />
                <div className="mt-4 font-display text-sm font-bold uppercase tracking-widest">
                  Certified Products
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  We only apply coatings and compounds we'd stand behind.
                </p>
              </div>
              <div className="rounded-2xl glass p-8 text-center">
                <Users className="mx-auto h-8 w-8 text-primary" strokeWidth={1.5} />
                <div className="mt-4 font-display text-sm font-bold uppercase tracking-widest">
                  One Studio, One Standard
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Every car is worked on by the same team, to the same checklist.
                </p>
              </div>
              <div className="rounded-2xl glass p-8 text-center">
                <MapPin className="mx-auto h-8 w-8 text-primary" strokeWidth={1.5} />
                <div className="mt-4 font-display text-sm font-bold uppercase tracking-widest">
                  Dehiwala, Sri Lanka
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  22C, Saranankara Road - visit the studio or book online.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-padding relative">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <Reveal variant="scale">
            <a
              href="/book"
              className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-4 text-sm font-semibold uppercase tracking-wider text-primary-foreground shadow-glow-primary transition-transform hover:scale-105"
            >
              Book an Appointment
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
