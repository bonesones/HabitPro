import Link from 'next/link';

import { calculateStreak } from '@/shared/lib';
import { Container } from '@/shared/ui';

import { markHabitDone } from '../model/actions';
import { Habit } from '../model/types';

import { HabitMarkDone } from './HabitMarkDone';
import { HabitProgressBar } from './HabitProgressBar';

export const HabitCard: React.FC<{ habit: Habit }> = ({ habit }) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const weekAgo = new Date();
  weekAgo.setDate(today.getDate() - 7);

  const countDoneThisWeek = habit.logs.filter(
    log =>
      log.done &&
      new Date(log.date).getTime() >= weekAgo.getTime() &&
      new Date(log.date).getTime() <= today.getTime(),
  ).length;

  const streak = calculateStreak(habit.logs);

  const handleClickDone = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await markHabitDone(habit.id);
  };

  return (
    <Link href={`/habit/${habit.id}`} className='w-full max-w-96'>
      <Container>
        <div className='flex justify-between'>
          <h2 className='font-semibold'>{habit.name}</h2>
          <p className='text-gray-600'>{habit.goal} times/week</p>
        </div>

        <HabitProgressBar progress={countDoneThisWeek} goal={habit.goal} />

        <div className='flex justify-between items-center'>
          <span className='text-gray-600'>🔥 {streak} day streak</span>

          <HabitMarkDone habit={habit} onClick={handleClickDone} />
        </div>
      </Container>
    </Link>
  );
};
