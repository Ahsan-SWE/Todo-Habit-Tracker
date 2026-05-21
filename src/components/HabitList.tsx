import { Button } from "./Button";
import { eachDayOfInterval, endOfWeek, format, isFuture, startOfWeek } from "date-fns"

export function HabitList() {

    const habits = [
        { id: 1, name: "Hi" },
    ];
    if (habits.length === 0) {
        return (
            <div className="text-center text-zinc-400 py-10">
                No habits yet. Add a habit to get started!
            </div>
        )
    }

return (
  <div className="flex flex-col gap-3">
    {habits.map(habit => (
      <HabitItem key={habit.id} habit={habit} />
    ))}
  </div>
)
}

function HabitItem({ habit }: HabitItemProps) {

  const visibleDates = eachDayOfInterval({ 
    start: startOfWeek(new Date(), { weekStartsOn: 1 }),
    end: endOfWeek(new Date(), { weekStartsOn: 1 })
  });

  return (
    <div className="rounded-xl bg-zinc-800 p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex gap-3 items-center">
          <span className="font-medium">{habit.name}</span>
          <span className="text-sm text-amber-400">🔥</span>
        </div>
        <Button variant="ghost-destructive">Delete</Button>
      </div>

<div className="flex gap-1.5">

{visibleDates.map(date => (
  <Button className="flex flex-1 flex-col"
  key={date.toISOString()} disabled={isFuture(date)}> 
  <span className="font-medium">{format(date, "EEE")}</span>
  <span>{format(date, "d")}</span>
  
  </Button>
))}


</div>



    </div>
  );
}





































