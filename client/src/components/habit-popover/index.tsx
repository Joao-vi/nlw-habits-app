import { Popover } from '@headlessui/react';
import { ReactNode, useState } from 'react';
import { usePopper } from 'react-popper';

import { HabitList } from './habit-list';
import { Header } from './header';

interface IHabitPopoverContainer {
  children: ReactNode;
  content: ReactNode;
  isDisabled?: boolean;
}

export const HabitPopover = () => {
  return (
    <div className="z-50 flex flex-col gap-4 p-6 bg-zinc-900 rounded-2xl">
      <Header />

      <HabitList />
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
