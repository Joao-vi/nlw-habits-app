import { DateBox } from '../date-box';
import dayjs from 'dayjs';
import { useSummary } from '../../queries/use-summary';
import { TSummary } from '../../data/habit-service/types';

interface IDateList {
  summary?: TSummary[];
}

const getAllDatesOfTheYear = () => {
  let firstDayOfTheYear = dayjs().startOf('year');
  const allDates: Array<Date> = [];

  Array.from({ length: 365 }, (_, i) => {
    allDates.push(firstDayOfTheYear.toDate());
    firstDayOfTheYear = firstDayOfTheYear.add(1, 'day');
  });

  return allDates;
};

const getStatus = (qtd: number) => {
  if (qtd <= 15) return '0-15';
  if (qtd > 15 && qtd <= 30) return '15-30';
  if (qtd > 30 && qtd <= 45) return '30-45';
  if (qtd > 45 && qtd <= 60) return '45-60';
  if (qtd > 60 && qtd <= 75) return '60-75';

  return '75-100';
};

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
const today = dayjs();
const allDates = getAllDatesOfTheYear();

export const TableDates = () => {
  const summary = useSummary();

  return (
    <main className="w-full h-max flex gap-4 flex-col sm:flex-row">
      <div className="table-dates-header">
        {weekDays.map((weekDay, i) => (
          <span
            key={i}
            className="flex items-center justify-center w-10 h-10 font-bold text-xl text-zinc-400"
          >
            {weekDay}
          </span>
        ))}
      </div>

      <div style={{ overflow: 'overlay' }} className="table-dates-main">
        <DateList summary={summary.data} />
      </div>
    </main>
  );
};

const DateList = ({ summary }: IDateList) => {
  return (
    <>
      {allDates.map((date) => {
        const dayInfo = summary?.find((info) => dayjs(info.date).isSame(date, 'day')) || {
          date: date.toString(),
          amount: 0,
          completed: 0,
          id: '',
        };

        const progress = (dayInfo.completed / dayInfo.amount) * 100 || 0;
        let status = getStatus(progress) as any;

        return (
          <DateBox
            key={date.toString()}
            date={dayInfo.date}
            disabled={today.isBefore(date)}
            status={status}
          />
        );
      })}
    </>
  );
};
