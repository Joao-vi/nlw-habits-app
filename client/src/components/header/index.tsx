import { DateBox } from '../date-box';
import { CreateHabitForm } from '../create-habit-form';

const array = Array(6).fill(1);
const STATUS: Record<number, any> = {
  0: '0-15',
  1: '15-30',
  2: '30-45',
  3: '45-60',
  4: '60-75',
  5: '75-100',
};

export const Header = () => {
  return (
    <>
      <header className="max-w-[45rem] w-full flex items-center justify-between">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-1 sm:gap-2">
            {array.map((_, index) => (
              <DateBox
                key={index}
                className="w-5 h-5 sm:w-8 sm:h-8 rounded-md"
                status={STATUS[index]}
                type="header"
              />
            ))}
          </div>

          <h1 className="bold text-3xl">Habits</h1>
        </div>

        <CreateHabitForm />
      </header>
    </>
  );
};
