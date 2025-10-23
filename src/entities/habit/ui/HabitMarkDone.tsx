import dayjs from 'dayjs';

import { CheckMark } from '@/shared/icons';
import { Loading } from '@/shared/ui';

import { useHabitsStore, type Habit } from '@/entities/habit/model';

export const HabitMarkDone: React.FC<{
  habit: Habit;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}> = ({ habit, onClick }) => {
  const isHabitUpdating = useHabitsStore(state =>
    state.isHabitUpdating(habit.id),
  );

  const today = dayjs().startOf('day');
  const doneLogs = habit.logs.filter(log => log.done);

  const lastDoneLogDate =
    doneLogs.length > 0 ? dayjs(doneLogs[0].date).startOf('day') : null;

  const isDoneToday = lastDoneLogDate ? today.isSame(lastDoneLogDate) : false;

  return isDoneToday ? (
    <div className='flex gap-2 items-center'>
      <span className='text-lime-500'>
        <CheckMark />
      </span>
      Done
    </div>
  ) : (
    <button
      className='bg-lime-500 rounded-md w-24 h-10 text-white cursor-pointer'
      onClick={onClick}
    >
      {isHabitUpdating ? <Loading className='bg-white' /> : 'Mark done'}
    </button>
  );
};
