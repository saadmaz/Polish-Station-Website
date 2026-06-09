import { MapPin, Phone, Mail, Clock, Instagram, Facebook, MessageCircle } from "lucide-react";

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
              { icon: MapPin, label: "Location", value: "24 Velocity Lane, Studio Bay 3" },
              { icon: Phone, label: "Call", value: "+1 (555) 123-4567" },
              { icon: Mail, label: "Email", value: "studio@polishstation.com" },
              { icon: Clock, label: "Hours", value: "Mon–Sat · 8:00 — 19:00" },
            ].map((i) => (
              <div key={i.label} className="flex items-start gap-4 rounded-2xl glass p-5">
                <span className="grid h-10 w-10 flex-none place-items-center rounded-xl bg-primary/15 text-primary">
                  <i.icon className="h-5 w-5" strokeWidth={1.5} />
                </span>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                    {i.label}
                  </div>
                  <div className="mt-1 text-sm font-medium">{i.value}</div>
                </div>
              </div>
            ))}

            <div className="flex gap-2 sm:col-span-2 lg:col-span-1">
              {[Instagram, Facebook, MessageCircle].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="grid h-12 w-12 place-items-center rounded-xl glass hover:bg-primary hover:text-primary-foreground transition"
                  aria-label="Social"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl border border-border min-h-[420px]">
            <iframe
              title="Polish Station location"
              src="https://www.openstreetmap.org/export/embed.html?bbox=-0.1357%2C51.5044%2C-0.1207%2C51.5144&layer=mapnik"
              className="h-full w-full grayscale contrast-110"
              style={{ filter: "grayscale(1) invert(0.92) hue-rotate(180deg)" }}
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
