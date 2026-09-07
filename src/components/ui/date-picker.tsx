import { useState } from "react";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function toIso(y: number, m: number, d: number) {
  return `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

function parseIso(value: string) {
  const [y, m, d] = value.split("-").map(Number);
  return { y, m: m - 1, d };
}

function formatDisplay(value: string) {
  const { y, m, d } = parseIso(value);
  return new Date(y, m, d).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

interface DatePickerProps {
  value: string; // "" or "YYYY-MM-DD"
  onChange: (value: string) => void;
  min?: string; // "YYYY-MM-DD"
  placeholder?: string;
  disabled?: boolean;
}

export function DatePicker({
  value,
  onChange,
  min,
  placeholder = "Pick a date",
  disabled,
}: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const today = new Date();
  const selected = value ? parseIso(value) : null;
  const [viewYear, setViewYear] = useState(selected?.y ?? today.getFullYear());
  const [viewMonth, setViewMonth] = useState(selected?.m ?? today.getMonth());

  const minParsed = min ? parseIso(min) : null;
  const minTime = minParsed ? new Date(minParsed.y, minParsed.m, minParsed.d).getTime() : null;

  function goToMonth(delta: number) {
    let m = viewMonth + delta;
    let y = viewYear;
    if (m < 0) {
      m = 11;
      y -= 1;
    } else if (m > 11) {
      m = 0;
      y += 1;
    }
    setViewMonth(m);
    setViewYear(y);
  }

  const firstOfMonth = new Date(viewYear, viewMonth, 1);
  const startWeekday = firstOfMonth.getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const cells: Array<number | null> = [
    ...Array.from({ length: startWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  function isDisabled(day: number) {
    if (minTime === null) return false;
    return new Date(viewYear, viewMonth, day).getTime() < minTime;
  }

  function isSelected(day: number) {
    return !!selected && selected.y === viewYear && selected.m === viewMonth && selected.d === day;
  }

  function isToday(day: number) {
    return (
      today.getFullYear() === viewYear && today.getMonth() === viewMonth && today.getDate() === day
    );
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          disabled={disabled}
          className={cn(
            "flex h-9 w-full items-center gap-2 rounded-md border border-input bg-transparent px-3 py-1 text-left text-base shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            !value && "text-muted-foreground",
          )}
        >
          <CalendarDays className="h-4 w-4 flex-none text-muted-foreground" />
          {value ? formatDisplay(value) : placeholder}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[280px] p-4">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => goToMonth(-1)}
            className="grid h-8 w-8 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Previous month"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div className="font-display text-sm font-bold uppercase tracking-wide">
            {MONTH_NAMES[viewMonth]} {viewYear}
          </div>
          <button
            type="button"
            onClick={() => goToMonth(1)}
            className="grid h-8 w-8 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Next month"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-4 grid grid-cols-7 gap-y-1 text-center">
          {WEEKDAYS.map((w) => (
            <div
              key={w}
              className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground"
            >
              {w}
            </div>
          ))}
          {cells.map((day, i) =>
            day === null ? (
              <div key={`empty-${i}`} />
            ) : (
              <button
                key={day}
                type="button"
                disabled={isDisabled(day)}
                onClick={() => {
                  onChange(toIso(viewYear, viewMonth, day));
                  setOpen(false);
                }}
                className={cn(
                  "mx-auto grid h-8 w-8 place-items-center rounded-full text-sm transition-colors",
                  isDisabled(day) && "cursor-not-allowed text-muted-foreground/40",
                  !isDisabled(day) && !isSelected(day) && "hover:bg-muted",
                  isToday(day) && !isSelected(day) && "border border-primary/60 text-primary",
                  isSelected(day) && "bg-primary text-primary-foreground shadow-glow-primary",
                )}
              >
                {day}
              </button>
            ),
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
