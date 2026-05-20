import { Button } from "./Button";

export default function Header() {
  return (
    <header className="flex items-center justify-between">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl">Habit Tracker</h1>
        <span className="text-zinc-400">1/1 Done Today</span>
      </div>

      <div className="flex flex-col gap-1 items-end">
        <span className="text-zinc-400 text-sm">May 20 - May 27</span>

        <div className="flex items-center gap-3">
    
          
          <Button>Prev</Button>
          <Button>Next</Button>
        </div>
      </div>
    </header>
  );
}
