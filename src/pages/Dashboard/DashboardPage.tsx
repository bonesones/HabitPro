'use client';

import { useEffect } from 'react';

import { useSession } from '@/shared/lib';
import { LoadingFullscreen } from '@/shared/ui';

import { useHabitsStore } from '@/entities/habit/model';
import { fetchHabits } from '@/entities/habit/model/actions';

import { Habits } from './Habits';

export const DashboardPage = () => {
  const { data, isPending } = useSession();
  const isLoading = useHabitsStore(state => state.loading);

  const user = data?.user;

  useEffect(() => {
    if (user) {
      fetchHabits();
    }
  }, [user]);

  if (!isPending && !user) {
    return <div>Unauthorized</div>;
  }

  if (isPending || isLoading) {
    return <LoadingFullscreen />;
  }

  return (
    <div className='px-5 h-[calc(100vh-64px)]'>
      <h1 className='font-semibold text-2xl mt-7'>Your Habits</h1>

      <h2 className='mt-2'>
        Track your daily progress and build lasting habits
      </h2>

      <Habits />
    </div>
  );
};
