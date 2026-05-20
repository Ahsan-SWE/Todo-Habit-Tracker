export default function App() {
  return (
    <div className="App">
      <Header />
    </div>
  );
}




function Header() {
  return (
    <header className="flex items-center justify-between">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl">Habit Tracker</h1>
        <span>1/1 Done Today</span>
      </div>
      <div></div>
    </header>
  )
}


































