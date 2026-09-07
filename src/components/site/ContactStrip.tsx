import { MapPin, Phone, Clock, ArrowRight } from "lucide-react";

const items = [
  {
    icon: MapPin,
    label: "Location",
    value: "22C, Saranankara Road, Dehiwala.",
    href: "https://www.google.com/maps/search/?api=1&query=22C+Saranankara+Road+Dehiwala",
  },
  { icon: Phone, label: "Call", value: "+94 71 188 5252", href: "tel:+94711885252" },
  { icon: Clock, label: "Hours", value: "Mon–Sat · 8:00 - 19:00", href: undefined },
];

export function ContactStrip() {
  return (
    <section className="relative border-t border-border/60 px-6 py-14">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 md:flex-row md:items-center">
        <div className="flex flex-1 flex-wrap gap-8">
          {items.map((i) => {
            const Tag = i.href ? "a" : "div";
            return (
              <Tag
                key={i.label}
                {...(i.href ? { href: i.href, target: "_blank", rel: "noopener noreferrer" } : {})}
                className="flex items-center gap-3 text-sm hover:text-primary"
              >
                <span className="grid h-9 w-9 flex-none place-items-center rounded-full bg-primary/15 text-primary">
                  <i.icon className="h-4 w-4" strokeWidth={1.5} />
                </span>
                <span>
                  <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                    {i.label}
                  </span>
                  <span className="mt-0.5 block font-medium">{i.value}</span>
                </span>
              </Tag>
            );
          })}
        </div>

        <a
          href="/contact"
          className="group inline-flex flex-none items-center gap-2 rounded-full glass px-6 py-3 text-sm font-semibold uppercase tracking-wider transition-all hover:bg-primary hover:text-primary-foreground"
        >
          Get in touch
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </section>
  );
}
