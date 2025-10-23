'use client';

import dayjs from 'dayjs';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';

import { HabitLog } from '@/shared/types';
import { Container, LoadingFullscreen } from '@/shared/ui';

import {
  fetchHabit,
  markHabitDone,
  useHabitsStore,
} from '@/entities/habit/model';
import { HabitMarkDone } from '@/entities/habit/ui';

import { HabitPageProgressBar } from './HabitPageProgressBar';

export const HabitPage = () => {
  const params = useParams<{ id: string }>();

  const habitId = params ? Number(params.id) : -1;

  const habit = useHabitsStore(state => state.habit);
  const loading = useHabitsStore(state => state.loading);
  const initialized = useHabitsStore(state => state.initialized);

  useEffect(() => {
    fetchHabit(habitId);
  }, [habitId]);

  if (!initialized || loading) {
    return <LoadingFullscreen />;
  }

  if (!habit) {
    return <h2>Habit not found</h2>;
  }

  const completedLogs = habit.logs.filter(log => log.done);

  const handleClickDone = async () => {
    await markHabitDone(habit.id);
  };

  return (
    <div>
      <header className='flex justify-between border-b border-b-gray-200 px-4 py-3'>
        <div>
          <h2 className='font-semibold text-lg'>{habit.name}</h2>
          <span className='text-sm text-gray-500'>{habit.category.name}</span>
        </div>

        <HabitMarkDone habit={habit} onClick={handleClickDone} />
      </header>

      <div className='px-4 flex flex-col gap-6'>
        <Container>
          <h3 className='text-lg font-bold'>Current Streak</h3>

          <span className='text-3xl text-orange-500 font-bold  '>
            {habit.currentStreak} {habit.currentStreak === 1 ? 'day' : 'days'}
          </span>

          <span className='text-gray-500'>Keep it up! You are on fire!</span>
        </Container>

        <Container>
          <h3 className='text-lg font-bold'>Weekly Goal</h3>

          <span className='text-3xl text-blue-500 font-bold  '>
            {habit.goal} times
          </span>

          <HabitPageProgressBar
            progress={habit.currentStreak}
            goal={habit.goal}
          />
        </Container>

        <Container>
          <h3 className='text-lg font-bold'>Best Streak</h3>

          <span className='text-3xl text-yellow-500 font-bold  '>
            {habit.longestStreak} {habit.longestStreak === 1 ? 'day' : 'days'}
          </span>

          <span className='text-gray-500'>Your personal record</span>
        </Container>

        <Container>
          <h3 className='text-lg font-bold'>Completion Rate</h3>

          <span className='text-3xl text-green-500 font-bold  '>
            {calculateCompletionRate(habit.logs)}%
          </span>

          <span className='text-gray-500'>Last 30 days</span>
        </Container>

        <Container>
          <h3 className='text-lg font-bold'>Total completed</h3>

          <span className='text-3xl text-purple-500 font-bold'>
            {completedLogs.length} times
          </span>

          <span className='text-gray-500'>Since you started</span>
        </Container>
      </div>
    </div>
  );
};

const calculateCompletionRate = (logs: HabitLog[]) => {
  const today = dayjs().startOf('day');
  const monthAgo = dayjs().subtract(30, 'day').startOf('day');

  const lastMonthLogs = logs.filter(log => {
    const date = dayjs(log.date).startOf('day');

    return (
      (date.isSame(monthAgo) || date.isAfter(monthAgo)) &&
      (date.isSame(today) || date.isBefore(today))
    );
  });

  const lastMonthCompletedLogs = lastMonthLogs.filter(log => log.done);

  const totalRate =
    (lastMonthCompletedLogs.length / lastMonthLogs.length) * 100;

  return totalRate.toFixed(0);
};
