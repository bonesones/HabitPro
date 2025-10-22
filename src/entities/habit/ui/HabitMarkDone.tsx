import { CheckMark } from '@/shared/icons';
import { Spinner } from '@/shared/ui';

import { useHabitsStore, type Habit } from '@/entities/habit/model';

export const HabitMarkDone: React.FC<{
  habit: Habit;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}> = ({ habit, onClick }) => {
  const isHabitUpdating = useHabitsStore(state =>
    state.isHabitUpdating(habit.id),
  );

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const isDoneToday = habit.logs.some(
    log => log.done && new Date(log.date).getTime() === today.getTime(),
  );

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
      {isHabitUpdating ? <Spinner className='bg-white' /> : 'Mark done'}
    </button>
  );
};
