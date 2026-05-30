import { Button } from "./Button";
import { addDays, eachDayOfInterval, format, isFuture, isSameDay, subDays } from "date-fns";
import { useMemo, useState } from "react";

import { useHabits, type Habit } from "../context/useHabits";


const PAGE_SIZE = 5

export function HabitList() {
  const { habits } = useHabits()

  const [page, setPage] = useState(0)




  // Fixed 8-day window: May 20 - May 27 (year = current year)
  const { rangeStart, rangeEnd, visibleDates } = useMemo(() => {
    const year = new Date().getFullYear()
    const start = new Date(year, 4, 20) // months are 0-based: 4 => May
    start.setHours(0, 0, 0, 0)
    const end = addDays(start, 7)
    const dates = eachDayOfInterval({ start, end })
    return { rangeStart: start, rangeEnd: end, visibleDates: dates }
  }, [])

  const totalPages = Math.ceil(habits.length / PAGE_SIZE)
  const pageHabits = habits.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE)


  const [donePanelHabitId, setDonePanelHabitId] = useState<string | null>(null)






  if (habits.length === 0) {
    return (
      <div className="text-center text-zinc-400 py-10">
        No habits yet. Add a habit to get started!
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="text-sm text-zinc-400">
          {format(rangeStart, "MMM d")} - {format(rangeEnd, "MMM d")}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-xs text-zinc-500">
          Habits: {page * PAGE_SIZE + 1} - {Math.min((page + 1) * PAGE_SIZE, habits.length)} / {habits.length}
        </div>

        <div className="flex gap-2">
          <Button
            onClick={() => setPage(p => Math.max(0, p - 1))}
            disabled={page === 0}
            variant="secondary"
            className="text-sm"
          >
            Prev
          </Button>
          <Button
            onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
            disabled={page >= totalPages - 1}
            variant="secondary"
            className="text-sm"
          >
            Next
          </Button>
        </div>
      </div>

      {pageHabits.map(habit => (

        <HabitItem
          key={habit.id}
          habit={habit}
          visibleDates={visibleDates}
          donePanelOpen={donePanelHabitId === habit.id}
          onToggleDonePanel={() =>
            setDonePanelHabitId(prev => (prev === habit.id ? null : habit.id))
          }
        />
      ))}
    </div>
  )
}




type HabitItemProps = {
  habit: Habit;
  visibleDates: Date[];
  donePanelOpen: boolean;
  onToggleDonePanel: () => void;
};

function HabitItem({ habit, visibleDates, donePanelOpen, onToggleDonePanel }: HabitItemProps) {
  const { deleteHabit, toggleHabit } = useHabits()





  const streak = getStreak(habit.completions)

  return (
    <div className="rounded-xl bg-zinc-800 p-4 flex flex-col gap-3">

      <div className="flex items-center justify-between">
        <div className="flex gap-3 items-center">
          <span className="font-medium">{habit.name}</span>

          {streak !== 0 && (
            <span className="text-sm text-amber-400">🔥 {streak}</span>
          )}
        </div>

        <div className="flex gap-2 items-center">
          <Button
            onClick={onToggleDonePanel}
            variant={donePanelOpen ? "primary" : "secondary"}
            className="text-sm"
          >
            Done
          </Button>
          <Button onClick={() => deleteHabit(habit.id)} variant="ghost-destructive" className="text-sm">Delete</Button>
        </div>
      </div>


      <div className="flex gap-1.5">
        {visibleDates.map(date => {
          const isDone = habit.completions.some(d => isSameDay(date, d))

          return (
            <Button
              className="flex flex-1 flex-col items-center gap-0.5 rounded-lg text-xs"
              key={date.toISOString()}
              disabled={isFuture(date)}
              onClick={() => toggleHabit(habit.id, date)}
              variant={isDone ? "primary" : "secondary"}
            >
              <span className="font-medium">{format(date, "EEE")}</span>
              <span>{format(date, "d")}</span>
            </Button>
          )
        })}
      </div>

      {donePanelOpen && (
        <div className="flex flex-col gap-2">
          <div className="text-xs text-zinc-400">
            {getDoneCountToday(habit.completions)} Done Today
          </div>
          <div className="flex flex-wrap gap-2">
            {getDoneDatesInRange(habit.completions, visibleDates).map(d => (
              <div
                key={d.toISOString()}
                className="px-2 py-1 rounded-md bg-emerald-500/25 text-emerald-200 ring-1 ring-emerald-500/30 text-xs"
              >
                {format(d, "MMM d")}
              </div>
            ))}
            {getDoneDatesInRange(habit.completions, visibleDates).length === 0 && (
              <div className="text-xs text-zinc-500">No done dates yet</div>
            )}
          </div>
        </div>
      )}






    </div>
  );
}


function getStreak(completions: Date[]) {
  let streak = 0;
  let date = new Date();

  while (completions.some(c => isSameDay(c, date))) {
    streak++;
    date = subDays(date, 1);
  }

  return streak;
}

function getDoneCountToday(completions: Date[]) {
  const today = new Date()
  return completions.some(c => isSameDay(c, today)) ? 1 : 0
}

function getDoneDatesInRange(completions: Date[], visibleDates: Date[]) {
  return visibleDates.filter(d => completions.some(c => isSameDay(c, d)))
}






























