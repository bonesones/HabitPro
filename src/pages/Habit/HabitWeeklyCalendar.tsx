import dayjs, { Dayjs } from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';

import { HabitLog } from '@/shared/types';

dayjs.extend(isoWeek);

export const HabitWeeklyCalendar: React.FC<{ logs: HabitLog[] }> = ({
  logs,
}) => {
  const startOfWeek = dayjs().startOf('isoWeek');

  const daysOfWeek = Array.from({ length: 7 }, (_, i) =>
    startOfWeek.add(i, 'day').startOf('day'),
  );

  const isDone = (day: Dayjs) => {
    const log = logs.find(log => dayjs(log.date).startOf('day').isSame(day));

    return log ? log.done : false;
  };

  return (
    <div className='flex gap-2'>
      {daysOfWeek.map(day => {
        const done = isDone(day);
        const isToday = day.isSame(dayjs(), 'day');

        return (
          <div
            key={day.format('YYYY-MM-DD')}
            className={`w-full h-10 flex items-center justify-center rounded-lg ${
              done
                ? !isToday
                  ? 'bg-lime-500'
                  : ''
                : !isToday
                  ? 'bg-gray-200'
                  : ''
            } ${isToday ? 'border border-blue-500 bg-blue-300' : ''}`}
          >
            {day.format('ddd')}
          </div>
        );
      })}
    </div>
  );
};
