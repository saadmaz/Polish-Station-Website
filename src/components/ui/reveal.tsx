import { type ReactNode } from "react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

type RevealVariant = "up" | "left" | "right" | "scale";

const variantClass: Record<RevealVariant, string> = {
  up:    "reveal",
  left:  "reveal-left",
  right: "reveal-right",
  scale: "reveal-scale",
};

interface RevealProps {
  children: ReactNode;
  variant?: RevealVariant;
  delay?: number;
  className?: string;
}

export function Reveal({ children, variant = "up", delay = 0, className }: RevealProps) {
  const ref = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`${variantClass[variant]}${className ? ` ${className}` : ""}`}
      style={delay > 0 ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
