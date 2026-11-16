import { useRef, useState, useCallback, useEffect } from "react";
import { Move } from "lucide-react";
import before from "@/assets/before.webp";
import after from "@/assets/after.webp";

const STEP = 3;

export function BeforeAfter() {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const [dragging, setDragging] = useState(false);

  const update = useCallback((clientX: number) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const p = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, p)));
  }, []);

  // Track the drag on window (not just the container) so it keeps tracking
  // even if the pointer briefly leaves the slider bounds while dragging.
  useEffect(() => {
    if (!dragging) return;

    const onMouseMove = (e: MouseEvent) => update(e.clientX);
    const onTouchMove = (e: TouchEvent) => {
      // preventDefault requires a non-passive listener - React's synthetic
      // touch handlers are passive by default and can't stop page scroll.
      e.preventDefault();
      update(e.touches[0].clientX);
    };
    const stop = () => setDragging(false);

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", stop);
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", stop);
    window.addEventListener("touchcancel", stop);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", stop);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", stop);
      window.removeEventListener("touchcancel", stop);
    };
  }, [dragging, update]);

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
        >
          <img
            src={after}
            alt="After detailing"
            width={1200}
            height={800}
            loading="lazy"
            decoding="async"
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
              decoding="async"
              className="h-full w-full object-cover"
            />
          </div>

          <span className="absolute left-5 top-5 rounded-full glass-strong px-3 py-1 text-[10px] font-bold uppercase tracking-widest">
            Before
          </span>
          <span className="absolute right-5 top-5 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary-foreground">
            After
          </span>

          <div
            role="slider"
            tabIndex={0}
            aria-label="Before/after comparison position"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(pos)}
            aria-orientation="horizontal"
            className="group absolute inset-y-0 w-1 cursor-ew-resize touch-none bg-primary focus-visible:outline-none"
            style={{ left: `${pos}%`, transform: "translateX(-50%)" }}
            onMouseDown={() => setDragging(true)}
            onTouchStart={() => setDragging(true)}
            onKeyDown={(e) => {
              if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - STEP));
              else if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + STEP));
              else if (e.key === "Home") setPos(0);
              else if (e.key === "End") setPos(100);
            }}
          >
            <div className="absolute top-1/2 left-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-primary text-primary-foreground shadow-glow-primary outline-offset-2 group-focus-visible:outline-2 group-focus-visible:outline-white">
              <Move className="h-5 w-5" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
