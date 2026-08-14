import { MapPin, Phone, Mail, Clock } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="section-padding relative">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 max-w-2xl">
          <div className="eyebrow mb-4">
            <span className="h-px w-8 bg-primary" /> Visit the Studio
          </div>
          <h2 className="font-display text-4xl font-bold uppercase leading-tight md:text-6xl">
            Get in <span className="text-gradient-primary">touch.</span>
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {[
              {
                icon: MapPin,
                label: "Location",
                value: "22C, Saranankara Road, Dehiwala.",
                href: "https://www.google.com/maps/search/?api=1&query=22C+Saranankara+Road+Dehiwala",
              },
              { icon: Phone, label: "Call", value: "+94 74 100 4296", href: "tel:+94741004296" },
              { icon: Mail, label: "Email", value: "studio@polishstation.com", href: "mailto:studio@polishstation.com" },
              { icon: Clock, label: "Hours", value: "Mon–Sat · 8:00 - 19:00", href: undefined },
            ].map((i) => {
              const Tag = i.href ? "a" : "div";
              return (
                <Tag
                  key={i.label}
                  {...(i.href ? { href: i.href, target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="flex items-start gap-4 rounded-2xl glass p-5 transition-colors hover:bg-primary/5"
                >
                  <span className="grid h-10 w-10 flex-none place-items-center rounded-xl bg-primary/15 text-primary">
                    <i.icon className="h-5 w-5" strokeWidth={1.5} />
                  </span>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                      {i.label}
                    </div>
                    <div className="mt-1 text-sm font-medium">{i.value}</div>
                  </div>
                </Tag>
              );
            })}
          </div>

          {/* Map centred on Saranankara Road, Dehiwala, Sri Lanka */}
          <div className="overflow-hidden rounded-3xl border border-border min-h-[420px]">
            <iframe
              title="Polish Station location"
              src="https://www.openstreetmap.org/export/embed.html?bbox=79.855%2C6.848%2C79.878%2C6.866&layer=mapnik&marker=6.857%2C79.866"
              className="h-full w-full"
              style={{ filter: "grayscale(1) invert(0.92) hue-rotate(180deg)" }}
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
