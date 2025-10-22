import { create } from 'zustand';

import { Habit } from './types';

export const useHabitsStore = create<HabitsStore>(set => ({
  loading: false,
  error: null,
  updatingHabit: new Set<number>(),
  habits: [],
  setLoading: (loading: boolean) => set({ loading }),

  isHabitUpdating: (habitId: number): boolean =>
    useHabitsStore.getState().updatingHabit.has(habitId),

  setUpdatingHabit: (habitId: number) =>
    set(state => {
      const newSet = new Set(state.updatingHabit);
      newSet.add(habitId);

      return { updatingHabit: newSet };
    }),

  deleteUpdatingHabit: (habitId: number) =>
    set(state => {
      const newSet = new Set(state.updatingHabit);
      newSet.delete(habitId);

      return { updatingHabit: newSet };
    }),

  setError: (error: string | null) => set({ error }),
  setHabits: (habits: Habit[]) => set({ habits }),

  addHabit: (habit: Habit) =>
    set(state => ({ habits: [...state.habits, habit] })),
}));

type HabitsStore = {
  loading: boolean;
  error: string | null;
  updatingHabit: Set<number>;
  habits: Habit[];
  setLoading: (loading: boolean) => void;
  setUpdatingHabit: (habitId: number) => void;
  isHabitUpdating: (habitId: number) => boolean;
  deleteUpdatingHabit: (habitId: number) => void;
  setError: (error: string | null) => void;
  setHabits: (habits: Habit[]) => void;
  addHabit: (habit: Habit) => void;
};
