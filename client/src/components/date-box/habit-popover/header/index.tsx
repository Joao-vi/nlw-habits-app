import dayjs from 'dayjs';
import { CircleNotch } from 'phosphor-react';
import { TSummary } from '../../../../data/habit-service/types';

interface IHeader extends Pick<TSummary, 'date' | 'completed' | 'amount'> {
  isLoading: boolean;
}

export const Header = (props: IHeader) => {
  const date = dayjs(props.date);
  const dayOfWeek = date.format('dddd');
  const dayAndMonth = date.format('DD/MM');
  const progress = (props.completed / props.amount) * 100;

  const renderAmountHabits = () => {
    return (
      <span className="border-2 border-zinc-700 px-2 rounded-lg">
        {props.isLoading ? <CircleNotch className="m-1" /> : `${props.completed} / ${props.amount}`}
      </span>
    );
  };

  return (
    <header className="w-full flex flex-col gap-2 [&>h1]:leading-[1] [&>span]:leading-[1]">
      <span className="text-zinc-400 font-medium">{dayOfWeek}</span>
      <h1 className="font-bold text-2xl">{dayAndMonth}</h1>

      <div className="flex items-center gap-2">
        <HabitsProgress progress={progress} />
        {renderAmountHabits()}
      </div>
    </header>
  );
};

const HabitsProgress = ({ progress }: { progress: number }) => {
  return (
    <div className="flex-1 w-[200px] relative h-2 rounded-2xl bg-zinc-700 overflow-hidden">
      <div
        style={{ width: `${progress}%` }}
        className="transition-all absolute h-full left-0 bg-violet-600"
      />
    </div>
  );
};
