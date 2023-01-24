import { Checkbox } from '../../checkbox';

export const HabitList = () => {
  return (
    <div className="flex flex-col gap-2">
      <HabitItem />
    </div>
  );
};

const HabitItem = () => (
  <div className="flex items-center gap-2">
    <Checkbox />
    <label htmlFor="" className="cursor-pointer">
      2L de água
    </label>
  </div>
);
