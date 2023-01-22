import { Plus } from 'phosphor-react';
import { DateBox } from '../date-box';

const array = Array(6).fill(1);
const status: Record<number, any> = {
  0: '0-15',
  1: '15-30',
  2: '30-45',
  3: '45-60',
  4: '60-75',
  5: '75-100',
};

export const Header = () => {
  return (
    <header className="max-w-[45rem] w-full flex items-center justify-between">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-1 sm:gap-2">
          {array.map((i, index) => (
            <DateBox key={i} className="w-5 h-5 sm:w-8 sm:h-8 rounded-md" status={status[index]} />
          ))}
        </div>

        <h1 className="bold text-3xl">Habits</h1>
      </div>

      <button className="py-2 px-4 sm:py-3 sm:px-5 rounded-md font-semibold flex items-center gap-2 border border-violet-500 hover:border-violet-400 transition">
        <Plus className="flex-shrink-0 text-violet-500" weight="bold" />
        <span>
          Novo <span className="hidden sm:inline">hábito</span>
        </span>
      </button>
    </header>
  );
};
