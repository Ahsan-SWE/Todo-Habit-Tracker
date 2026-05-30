import { format, isSameDay } from "date-fns";

import { useHabits } from "../context/useHabits";

export default function Header() {
  const { habits } = useHabits();

  const today = new Date();
  const doneTodayCount = habits.filter(h => h.completions.some(d => isSameDay(d, today))).length;

  const year = today.getFullYear();
  const start = new Date(year, 4, 20); // May 20
  const end = new Date(year, 4, 27); // May 27

  return (
    <header className="flex items-center justify-between">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl">Habit Tracker</h1>
        <span className="text-zinc-400">
          {doneTodayCount}/{habits.length} Done Today
        </span>
      </div>

      <div className="flex flex-col gap-1 items-end">
        <span className="text-zinc-400 text-sm">
          {format(start, "MMM d")} - {format(end, "MMM d")}
        </span>
      </div>
    </header>
  );
}

