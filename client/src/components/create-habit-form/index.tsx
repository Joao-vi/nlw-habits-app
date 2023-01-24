import { Plus, X, Check, CircleNotch } from 'phosphor-react';
import { FormEvent, useState } from 'react';
import { useCreateHabit } from '../../mutations/use-create-habit';
import { Checkbox } from '../checkbox';
import { Modal } from '../modal';

const WEEK_DAYS_PORTUGUESE = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

export const CreateHabitForm = () => {
  const [formError, setFormError] = useState<string>();
  const [isOpen, setIsOpen] = useState(false);
  const { mutate, isLoading } = useCreateHabit();

  const createNewHabit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const title = formData.get('title') as string;
    const weekDays = formData.getAll('weekDay') as Array<any | number>;

    if (!title || !weekDays.length) {
      setFormError('Ops! É necessário selecionar pelo menos um dia da semana.');

      return;
    }

    mutate({ title, weekDays });
  };

  const onClose = () => {
    setFormError(undefined);
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="py-2 px-4 sm:py-3 sm:px-5 rounded-md font-semibold flex items-center gap-2 border border-violet-500 hover:border-violet-400 transition"
      >
        <Plus className="flex-shrink-0 text-violet-500" weight="bold" />
        <span>
          Novo <span className="hidden sm:inline">hábito</span>
        </span>
      </button>

      <Modal isOpen={isOpen} onClickOutside={onClose}>
        <form
          onSubmit={createNewHabit}
          className="relative flex flex-col items-center gap-6 p-10 rounded-2xl bg-zinc-900"
        >
          <button
            onClick={onClose}
            type="button"
            className="absolute right-4 top-4 p-2 transition hover:bg-zinc-800 border border-zinc-700 rounded-full"
          >
            <X weight="bold" />
          </button>

          <h1 className="font-bold text-3xl">Criar hábito</h1>

          <div className="flex flex-col gap-3 [&>div]:flex [&>div]:flex-col [&>div]:gap-2">
            <div>
              <label htmlFor="new-habit" className="font-medium">
                Qual o seu compromentimento ?
              </label>

              <input
                required
                type="text"
                name="title"
                autoFocus
                id="title"
                placeholder="Exercícios, dormir bem, malhar, etc..."
                className="py-2 px-3 rounded-lg bg-zinc-800 placeholder:text-zinc-400 ring-effect"
              />
            </div>

            <div>
              <h2 className="font-medium">Qual a recorrência ?</h2>

              <div className="flex flex-col gap-2">
                {WEEK_DAYS_PORTUGUESE.map((day, i) => (
                  <div key={day} className="flex items-center gap-2">
                    <Checkbox name="weekDay" id={day} value={i} />
                    <label htmlFor={day} className="cursor-pointer">
                      {day}
                    </label>
                  </div>
                ))}
              </div>

              {!!formError && <span className="text-yellow-300 text-sm">{formError}</span>}
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full flex items-center justify-center py-2 gap-1 bg-green-600 rounded-lg transition hover:bg-green-800 ring-effect 
            ${isLoading ? 'bg-green-800' : ''}`}
          >
            {!isLoading ? (
              <>
                <Check weight="bold" />

                <span className="font-medium">Confirmar</span>
              </>
            ) : (
              <CircleNotch size={18} weight="bold" className="animate-spin" />
            )}
          </button>
        </form>
      </Modal>
    </>
  );
};
