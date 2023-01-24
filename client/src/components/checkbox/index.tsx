import { Check } from 'phosphor-react';

type IProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Checkbox = (props: IProps) => (
  <div className="relative checkbox group">
    <input
      {...props}
      type="checkbox"
      className={`opacity-0 absolute inset-0 ${props.disabled ? '' : 'cursor-pointer'}`}
    />
    <div className="group-focus-within:ring group-focus-within:ring-violet-500 pointer-events-none flex items-center justify-center bg-zinc-900 rounded-lg border-2 border-zinc-800 w-8 h-8 transition">
      <Check weight="bold" className="transition scale-50 opacity-0 translate-y-1" />
    </div>
  </div>
);
