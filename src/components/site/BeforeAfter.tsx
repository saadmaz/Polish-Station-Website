import { useRef, useState, useCallback } from "react";
import { Move } from "lucide-react";
import before from "@/assets/before.jpg";
import after from "@/assets/after.jpg";

export function BeforeAfter() {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);

  const update = useCallback((clientX: number) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const p = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, p)));
  }, []);

  return (
    <section className="section-padding relative">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 max-w-2xl">
          <div className="eyebrow mb-4">
            <span className="h-px w-8 bg-primary" /> Transformation
          </div>
          <h2 className="font-display text-4xl font-bold uppercase leading-tight md:text-6xl">
            See the <span className="text-gradient-primary">difference.</span>
          </h2>
          <p className="mt-5 text-muted-foreground">
            Drag the slider to reveal the transformation - same paint, restored to perfection.
          </p>
        </div>

        <div
          ref={ref}
          className="relative aspect-[16/9] w-full select-none overflow-hidden rounded-3xl border border-border shadow-elegant"
          onMouseMove={(e) => dragging.current && update(e.clientX)}
          onMouseUp={() => (dragging.current = false)}
          onMouseLeave={() => (dragging.current = false)}
          onTouchMove={(e) => update(e.touches[0].clientX)}
        >
          <img
            src={after}
            alt="After detailing"
            width={1200}
            height={800}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
          >
            <img
              src={before}
              alt="Before detailing"
              width={1200}
              height={800}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>

          <span className="absolute left-5 top-5 rounded-full glass-strong px-3 py-1 text-[10px] font-bold uppercase tracking-widest">Before</span>
          <span className="absolute right-5 top-5 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary-foreground">After</span>

          <div
            className="absolute inset-y-0 w-1 bg-primary cursor-ew-resize"
            style={{ left: `${pos}%`, transform: "translateX(-50%)" }}
            onMouseDown={() => (dragging.current = true)}
            onTouchStart={() => (dragging.current = true)}
          >
            <div className="absolute top-1/2 left-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-primary text-primary-foreground shadow-glow-primary">
              <Move className="h-5 w-5" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
