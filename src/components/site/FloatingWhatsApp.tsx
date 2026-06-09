import { MessageCircle } from "lucide-react";

export function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/15551234567"
      target="_blank"
      rel="noreferrer"
      aria-label="WhatsApp booking"
      className="fixed bottom-6 right-6 z-40 group"
    >
      <span className="absolute inset-0 rounded-full bg-primary/40 blur-xl animate-orange-pulse" />
      <span className="relative grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-glow-primary transition-transform group-hover:scale-110">
        <MessageCircle className="h-6 w-6" />
      </span>
    </a>
  );
}
