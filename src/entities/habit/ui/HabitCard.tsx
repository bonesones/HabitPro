import dayjs from 'dayjs';
import Link from 'next/link';
import React from 'react';

import { Container } from '@/shared/ui';

import { markHabitDone } from '../model/actions';
import { Habit } from '../model/types';

import { HabitMarkDone } from './HabitMarkDone';
import { HabitProgressBar } from './HabitProgressBar';

export const HabitCard: React.FC<{ habit: Habit }> = React.memo(({ habit }) => {
  const today = dayjs().startOf('day');
  const weekAgo = dayjs().subtract(7, 'day').startOf('day');

  const countDoneThisWeek = habit.logs.filter(log => {
    const date = dayjs(log.date).startOf('day');
    return (
      log.done &&
      (date.isSame(weekAgo) || date.isAfter(weekAgo)) &&
      (date.isSame(today) || date.isBefore(today))
    );
  }).length;

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
          <span className='text-gray-600'>
            🔥 {habit.currentStreak} day streak
          </span>

          <HabitMarkDone habit={habit} onClick={handleClickDone} />
        </div>
      </Container>
    </Link>
  );
});

HabitCard.displayName = 'HabitCard';
