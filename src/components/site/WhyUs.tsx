import { Award, FlaskConical, Cpu, ScanSearch } from "lucide-react";

const items = [
  { icon: Award, title: "Expert Technicians", desc: "Certified detailers with thousands of hours of paint experience." },
  { icon: FlaskConical, title: "Premium Products", desc: "Only the top-tier coatings and compounds make it to your car." },
  { icon: Cpu, title: "Advanced Equipment", desc: "Calibrated polishers, paint gauges and controlled environments." },
  { icon: ScanSearch, title: "Attention to Detail", desc: "We inspect under multiple light sources — nothing is missed." },
];

export function WhyUs() {
  return (
    <section className="section-padding relative">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 grid items-end gap-8 md:grid-cols-2">
          <div>
            <div className="eyebrow mb-4">
              <span className="h-px w-8 bg-primary" /> Why Choose Us
            </div>
            <h2 className="font-display text-4xl font-bold uppercase leading-tight md:text-6xl">
              Engineered for <br />
              <span className="text-gradient-primary">perfection.</span>
            </h2>
          </div>
          <p className="text-muted-foreground md:text-right">
            We don't wash cars. We preserve and elevate automotive excellence
            with the rigor of a precision workshop.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {items.map((it, i) => (
            <div
              key={it.title}
              className="group relative overflow-hidden rounded-2xl glass p-8 transition-transform hover:-translate-y-2"
            >
              <span className="absolute left-0 top-0 h-px w-12 bg-primary transition-all duration-500 group-hover:w-full" />
              <div className="text-[10px] font-mono text-muted-foreground">
                0{i + 1}
              </div>
              <it.icon className="mt-6 h-8 w-8 text-primary" strokeWidth={1.4} />
              <h3 className="mt-8 font-display text-lg font-bold uppercase tracking-wide">
                {it.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {it.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
