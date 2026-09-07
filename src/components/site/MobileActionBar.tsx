import { Phone, MessageCircle, Calendar } from "lucide-react";

export function MobileActionBar() {
  return (
    <nav
      aria-label="Quick actions"
      className="fixed inset-x-0 bottom-0 z-40 flex h-16 border-t border-border/60 glass-strong md:hidden"
    >
      <a
        href="tel:+94711885252"
        className="flex flex-1 flex-col items-center justify-center gap-1 text-muted-foreground"
      >
        <Phone className="h-5 w-5" strokeWidth={1.5} />
        <span className="text-[10px] font-semibold uppercase tracking-wider">Call</span>
      </a>
      <a
        href="https://wa.me/94711885252"
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-1 flex-col items-center justify-center gap-1 text-muted-foreground"
      >
        <MessageCircle className="h-5 w-5" strokeWidth={1.5} />
        <span className="text-[10px] font-semibold uppercase tracking-wider">WhatsApp</span>
      </a>
      <a
        href="/book"
        className="flex flex-1 flex-col items-center justify-center gap-1 bg-primary text-primary-foreground"
      >
        <Calendar className="h-5 w-5" strokeWidth={1.5} />
        <span className="text-[10px] font-semibold uppercase tracking-wider">Book</span>
      </a>
    </nav>
  );
}
