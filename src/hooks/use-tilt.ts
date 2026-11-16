import { useRef, useCallback } from "react";
import type { MouseEvent } from "react";

export function useTilt(intensity = 10) {
  const ref = useRef<HTMLDivElement>(null);
  const rafId = useRef<number>(0);

  const onMouseMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      cancelAnimationFrame(rafId.current);
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      rafId.current = requestAnimationFrame(() => {
        const el2 = ref.current;
        if (!el2) return;
        el2.style.transform = `perspective(900px) rotateY(${nx * intensity}deg) rotateX(${-ny * intensity}deg) translateZ(12px)`;
        el2.style.transition = "transform 0.08s linear";
        const shine = el2.querySelector<HTMLElement>("[data-shine]");
        if (shine) {
          shine.style.opacity = "1";
          shine.style.background = `radial-gradient(circle at ${(nx + 0.5) * 100}% ${(ny + 0.5) * 100}%, rgba(255,255,255,0.09) 0%, transparent 65%)`;
        }
      });
    },
    [intensity],
  );

  const onMouseLeave = useCallback(() => {
    cancelAnimationFrame(rafId.current);
    const el = ref.current;
    if (!el) return;
    el.style.transform = "";
    el.style.transition = "transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)";
    const shine = el.querySelector<HTMLElement>("[data-shine]");
    if (shine) {
      shine.style.opacity = "0";
      shine.style.transition = "opacity 0.4s ease";
    }
  }, []);

  return { ref, onMouseMove, onMouseLeave };
}
