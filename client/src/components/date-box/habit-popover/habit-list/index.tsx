import dayjs from 'dayjs';
import { CircleNotch, WarningCircle } from 'phosphor-react';
import { TDateHabits, THabit } from '../../../../data/habit-service/types';
import { useToggleHabit } from '../../../../mutations/use-toggle-habit';
import { Checkbox } from '../../../checkbox';

interface IHabitItem extends THabit {
  isCompleted: boolean;
  onChange: () => void;
  isLoading: boolean;
  isExpired: boolean;
}

interface IHabitList extends Partial<TDateHabits> {
  isLoading: boolean;
  date: string;
}

const today = dayjs();

export const HabitList = ({ completedHabits, possibleHabits, isLoading, date }: IHabitList) => {
  const toggleHabit = useToggleHabit();

  const renderHabitList = () => {
    if (!possibleHabits?.length)
      return (
        <div className="flex flex-col justify-center items-center gap-2 text-zinc-400">
          <WarningCircle size={32} />
          <span className="text-sm">Ops, nenhum hábito foi encontrado para este dia.</span>
        </div>
      );

    return possibleHabits.map((habit) => {
      const isCompleted = !!completedHabits?.includes(habit.id);

      return (
        <HabitItem
          isLoading={toggleHabit.isLoading}
          key={habit.id}
          {...habit}
          onChange={() => toggleHabit.mutate({ id: habit.id, date })}
          isCompleted={isCompleted}
          isExpired={today.isAfter(dayjs(date), 'date')}
        />
      );
    });
  };

  const renderLoading = () => (
    <div className="flex flex-col gap-1 items-center text-zinc-400">
      <CircleNotch size={32} className="animate-spin" />
      <span className="text-sm">Buscando hábitos...</span>
    </div>
  );

  return (
    <div className="flex flex-col gap-2 p-2 max-h-[10rem] overflow-auto">
      {isLoading ? renderLoading() : renderHabitList()}
    </div>
  );
};

const HabitItem = (props: IHabitItem) => (
  <div className="flex items-center gap-2">
    <Checkbox
      disabled={props.isLoading || props.isExpired}
      onChange={props.onChange}
      id={props.id}
      defaultChecked={props.isCompleted}
    />
    <label
      htmlFor={props.id}
      className={`${props.isExpired ? 'text-zinc-400 italic line-through' : 'cursor-pointer'}`}
    >
      {props.title}
    </label>
  </div>
);
