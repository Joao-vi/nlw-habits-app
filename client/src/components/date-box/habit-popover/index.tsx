import { Popover } from '@headlessui/react';
import { ReactNode, useState } from 'react';
import { CircleNotch } from 'phosphor-react';
import { usePopper } from 'react-popper';

import { HabitList } from './habit-list';
import { TSummary } from '../../../data/habit-service/types';
import { Header } from './header';
import { useDateHabits } from '../../../queries/use-date-habits';

interface IHabitPopoverContainer {
  children: ReactNode;
  content: ReactNode;
  isDisabled?: boolean;
}

export const HabitPopover = (props: { date: string }) => {
  const { data, isLoading, isFetching } = useDateHabits(props.date);

  return (
    <div className="z-50 flex flex-col gap-4 p-6 bg-zinc-900 rounded-2xl">
      <Header
        date={props.date}
        amount={data?.possibleHabits?.length || 0}
        completed={data?.completedHabits?.length || 0}
        isLoading={isLoading}
      />

      <HabitList isLoading={isLoading} date={props.date} {...data} />

      {isFetching && <CircleNotch className="absolute top-4 right-4 animate-spin" size={20} />}
    </div>
  );
};

export const HabitPopoverContainer = (props: IHabitPopoverContainer) => {
  const { children, content, isDisabled = false } = props;
  const [refEl, setRefEl] = useState<any>(null);
  const [popperEl, setPopperEl] = useState<any>(null);

  const { styles, attributes } = usePopper(refEl, popperEl, {
    modifiers: [{ name: 'offset', options: { offset: [10, 10] } }],
  });

  return (
    <Popover>
      <Popover.Button disabled={isDisabled} ref={setRefEl} className="ring-effect rounded-lg">
        {children}
      </Popover.Button>

      <Popover.Panel
        className="z-50"
        ref={setPopperEl}
        style={styles.popper}
        {...attributes.popper}
      >
        {content}
      </Popover.Panel>
    </Popover>
  );
};
