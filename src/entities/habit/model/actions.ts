import { aFetch } from '@/shared/api';

import { useHabitsStore } from './store';
import { Habit, NextHabit } from './types';

export const fetchHabits = async () => {
  const store = useHabitsStore.getState();
  store.setLoading(true);

  try {
    const response = await aFetch<Habit[]>('/api/habits');

    if (response.success) {
      store.setHabits(response.data);
      store.setError(null);
    } else {
      store.setError(response.message);
    }
  } catch (error) {
    store.setError(error instanceof Error ? error.message : 'Unknown error');
  } finally {
    store.setLoading(false);
  }
};

export const fetchHabit = async (habitId: number) => {
  const store = useHabitsStore.getState();
  store.setLoading(true);

  try {
    const response = await aFetch<Habit>(`/api/habits/${habitId}`);

    if (response.success) {
      store.setError(null);
      store.setHabit(response.data);
    } else {
      store.setError(response.message);
    }
  } catch (error) {
    store.setError(error instanceof Error ? error.message : 'Unknown error');
  } finally {
    store.setLoading(false);
  }
};

export const createHabit = async (data: NextHabit) => {
  const store = useHabitsStore.getState();
  store.setLoading(true);

  try {
    const response = await aFetch<Habit>('/api/habits/create', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (response.success) {
      store.addHabit(response.data);
      store.setError(null);
    } else {
      store.setError(response.message);
    }
  } catch (error) {
    store.setError(error instanceof Error ? error.message : 'Unknown error');
  } finally {
    store.setLoading(false);
  }
};

export const markHabitDone = async (habitId: number) => {
  const store = useHabitsStore.getState();
  store.setUpdatingHabit(habitId);

  try {
    const response = await aFetch<Habit>(`/api/habits/${habitId}/done`, {
      method: 'PATCH',
    });

    if (response.success) {
      const newHabits = store.habits.map(habit => {
        if (habit.id === habitId) {
          return response.data;
        }

        return habit;
      });

      store.setError(null);
      store.setHabits(newHabits);

      if (store.habit) {
        store.setHabit(response.data);
      }
    } else {
      store.setError(response.message);
    }
  } catch (error) {
    store.setError(error instanceof Error ? error.message : 'Unknown error');
  } finally {
    store.deleteUpdatingHabit(habitId);
  }
};
