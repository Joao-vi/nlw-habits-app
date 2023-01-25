import { CreateHabitForm } from '../create-habit-form';
import datesIcons from '/favicon.svg';

export const Header = () => {
  return (
    <>
      <header className="max-w-[45rem] w-full flex items-center justify-between">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-1 sm:gap-2">
            <img src={datesIcons} className="object-contain h-7" alt="Habit logo." />
          </div>

          <h1 className="bold text-3xl">Habits</h1>
        </div>

        <CreateHabitForm />
      </header>
    </>
  );
};
