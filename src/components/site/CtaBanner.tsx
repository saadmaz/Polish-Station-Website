import { ArrowRight } from "lucide-react";
import bg from "@/assets/cta-banner.jpg";

export function CtaBanner() {
  return (
    <section className="px-6 py-20">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-border">
        <img
          src={bg}
          alt="Detailing close-up"
          width={1920}
          height={800}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-background/40" />
        <div className="absolute -right-20 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-primary/30 blur-[120px]" />

        <div className="relative grid gap-10 p-10 md:grid-cols-2 md:p-20">
          <div>
            <div className="eyebrow mb-4">
              <span className="h-px w-8 bg-primary" /> Reserve a slot
            </div>
            <h2 className="font-display text-4xl font-bold uppercase leading-tight md:text-6xl">
              Your car deserves <span className="text-gradient-primary">better.</span>
            </h2>
          </div>
          <div className="flex flex-col justify-center gap-6 md:items-end">
            <p className="max-w-sm text-muted-foreground md:text-right">
              Book a professional detailing session today. Limited weekly bays
              ensure each car gets undivided attention.
            </p>
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold uppercase tracking-wider text-primary-foreground shadow-glow-primary transition-transform hover:scale-105"
            >
              Book Appointment
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
