import { create } from 'zustand';

import { Habit } from './types';

export const useHabitsStore = create<HabitsStore>((set, get) => ({
  loading: false,
  initialized: false,
  error: null,
  updatingHabit: new Set<number>(),
  habits: [],
  habit: null,
  setLoading: (loading: boolean) => set({ loading }),
  setInitialized: (initialized: boolean) => set({ initialized }),

  isHabitUpdating: (habitId: number) => get().updatingHabit.has(habitId),

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

  getHabit: (habitId: number) =>
    get().habits.find(habit => habit.id === habitId),

  setError: (error: string | null) => set({ error }),
  setHabits: (habits: Habit[]) => set({ habits }),
  setHabit: (habit: Habit) => set({ habit }),

  addHabit: (habit: Habit) =>
    set(state => ({ habits: [...state.habits, habit] })),
}));

type HabitsStore = {
  loading: boolean;
  initialized: boolean;
  error: string | null;
  updatingHabit: Set<number>;
  habits: Habit[];
  habit: Habit | null;
  setLoading: (loading: boolean) => void;
  setInitialized: (initialized: boolean) => void;
  setUpdatingHabit: (habitId: number) => void;
  isHabitUpdating: (habitId: number) => boolean;
  deleteUpdatingHabit: (habitId: number) => void;
  setError: (error: string | null) => void;
  setHabits: (habits: Habit[]) => void;
  setHabit: (habit: Habit) => void;
  getHabit: (habitId: number) => Habit | undefined;
  addHabit: (habit: Habit) => void;
};
