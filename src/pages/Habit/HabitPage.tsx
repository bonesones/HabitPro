'use client';

import { useParams } from 'next/navigation';

export const HabitPage = () => {
  const params = useParams<{ id: string }>();

  if (!params) {
    return null;
  }

  return <div>Habit {params.id}</div>;
};
