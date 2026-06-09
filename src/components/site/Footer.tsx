import { ArrowUp } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-charcoal/40">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-md bg-gradient-to-br from-primary to-primary/60 text-primary-foreground font-black">P</span>
              <span className="font-display text-sm font-bold tracking-[0.25em]">
                POLISH<span className="text-primary">·</span>STATION
              </span>
            </div>
            <p className="mt-5 max-w-sm text-sm text-muted-foreground">
              Premium automotive detailing studio. We preserve and elevate
              automotive excellence — one car at a time.
            </p>
          </div>

          <div>
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-foreground">Services</div>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li><a href="#services" className="hover:text-primary">Paint Correction</a></li>
              <li><a href="#services" className="hover:text-primary">Ceramic Coating</a></li>
              <li><a href="#services" className="hover:text-primary">Interior Detail</a></li>
              <li><a href="#services" className="hover:text-primary">Headlight Restore</a></li>
            </ul>
          </div>

          <div>
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-foreground">Studio</div>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li><a href="#gallery" className="hover:text-primary">Gallery</a></li>
              <li><a href="#packages" className="hover:text-primary">Packages</a></li>
              <li><a href="#process" className="hover:text-primary">Process</a></li>
              <li><a href="#contact" className="hover:text-primary">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-border pt-8 sm:flex-row sm:items-center">
          <div className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Polish Station. All rights reserved.
          </div>
          <a
            href="#top"
            className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs font-semibold uppercase tracking-widest hover:bg-primary hover:text-primary-foreground transition"
          >
            <ArrowUp className="h-3 w-3" /> Back to Top
          </a>
        </div>
      </div>
    </footer>
  );
}
