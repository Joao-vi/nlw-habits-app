import { DateBox } from '../date-box';
import dayjs from 'dayjs';

const getAllDatesOfTheYear = () => {
  let firstDayOfTheYear = dayjs().startOf('year');
  const allDates: Array<Date> = [];

  Array.from({ length: 365 }, (_, i) => {
    allDates.push(firstDayOfTheYear.toDate());
    firstDayOfTheYear = firstDayOfTheYear.add(1, 'day');
  });

  return allDates;
};

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
const today = dayjs();
const allDates = getAllDatesOfTheYear();

export const TableDates = () => {
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

      <div style={{ overflow: 'overlay' }} className="table-dates-main ">
        {allDates.map((date) => (
          <DateBox
            key={date.toString()}
            className={`${today.isBefore(date) ? 'opacity-50 cursor-not-allowed' : ''}`}
          />
        ))}
      </div>
    </main>
  );
};
