import { HabitPopover } from './components/habit-popover';
import { Header } from './components/header';
import { TableDates } from './components/table-dates';

function App() {
  return (
    <div className="max-w-[75rem] w-full h-full mx-auto flex flex-col items-center justify-center gap-12 p-4">
      <Header />
      <TableDates />
    </div>
  );
}

export default App;
