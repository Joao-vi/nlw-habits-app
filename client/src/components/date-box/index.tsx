import { twMerge } from 'tailwind-merge';

import { HabitPopover, HabitPopoverContainer } from './habit-popover';
import { cva, VariantProps } from 'class-variance-authority';
interface IDateBox extends Variants {
  className?: string;
  date: string;
}

export const DateBox = ({ className, date, ...variants }: IDateBox) => {
  return (
    <HabitPopoverContainer
      isDisabled={variants.disabled || false || variants.type === 'header'}
      content={<HabitPopover date={date} />}
    >
      <div className={twMerge(styles(variants), className)} />
    </HabitPopoverContainer>
  );
};

export type Variants = VariantProps<typeof styles>;

export const styles = cva('aspect-square w-10 h-10 rounded-lg border-2', {
  variants: {
    status: {
      '0-15': 'border-zinc-800 bg-zinc-900',
      '15-30': 'border-violet-700 bg-violet-900',
      '30-45': 'border-violet-600 bg-violet-800',
      '45-60': 'border-violet-500 bg-violet-700',
      '60-75': 'border-violet-400 bg-violet-600',
      '75-100': 'border-violet-300 bg-violet-500',
    },

    disabled: {
      true: 'opacity-50 cursor-not-allowed',
    },

    type: {
      header: 'cursor-default',
      default: 'hover:border-violet-400',
    },
  },
  defaultVariants: {
    status: '0-15',
    type: 'default',
  },
});
