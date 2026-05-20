export function HabitList() {

    const habits = [
        { id: 1, name: "Hi" },
        { id: 2, name: "Hello" },
        { id: 3, name: "Hey" },

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

type HabitItemProps = {
  habit: { id: string; name: string }
}

function HabitItem({ habit }: HabitItemProps) {
  return (
    <div className="rounded-xl bg-zinc-800 p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="font-medium">{habit.name}</span>
        <span className="text-sm text-amber-400">🔥 3</span>
      </div>
    </div>
  )
}




































