'use client';

import { useParams } from 'next/navigation';
import { useEffect } from 'react';

import { Spinner } from '@/shared/ui';

import {
  fetchHabit,
  markHabitDone,
  useHabitsStore,
} from '@/entities/habit/model';
import { HabitMarkDone } from '@/entities/habit/ui';

export const HabitPage = () => {
  const params = useParams<{ id: string }>();

  const habitId = params ? Number(params.id) : -1;

  const habit = useHabitsStore(state => state.habit);
  const loading = useHabitsStore(state => state.loading);

  useEffect(() => {
    fetchHabit(habitId);
  }, [habitId]);

  if (loading) {
    return (
      <div>
        <Spinner className='bg-blue-500' />
      </div>
    );
  }

  if (!habit) {
    return <h2>Habit not found</h2>;
  }

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
    </div>
  );
};
