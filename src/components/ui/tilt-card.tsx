import { type ReactNode } from "react";
import { useTilt } from "@/hooks/use-tilt";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
}

export function TiltCard({ children, className, intensity }: TiltCardProps) {
  const { ref, onMouseMove, onMouseLeave } = useTilt(intensity);
  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={className}
      style={{ willChange: "transform" }}
    >
      {children}
    </div>
  );
}
