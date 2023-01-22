import { twMerge } from 'tailwind-merge';
import { cva, VariantProps } from 'class-variance-authority';

type Variants = VariantProps<typeof styles>;

interface IDateBox extends Variants {
  className?: string;
}

export const DateBox = ({ className = '', status }: IDateBox) => {
  return <div className={twMerge(styles({ status }), className)} />;
};

const styles = cva('aspect-square w-10 h-10 rounded-lg border-2', {
  variants: {
    status: {
      '0-15': 'border-zinc-800 bg-zinc-900',
      '15-30': 'border-violet-700 bg-violet-900',
      '30-45': 'border-violet-600 bg-violet-800',
      '45-60': 'border-violet-500 bg-violet-700',
      '60-75': 'border-violet-400 bg-violet-600',
      '75-100': 'border-violet-300 bg-violet-500',
    },
  },
  defaultVariants: {
    status: '0-15',
  },
});
