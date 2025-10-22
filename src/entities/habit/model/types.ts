import type { Habit as PrismaHabit } from '@/shared/generated/prisma';
import type { HabitLog } from '@/shared/types';

export type Habit = Pick<PrismaHabit, 'id' | 'name' | 'categoryId' | 'goal'> & {
  logs: HabitLog[];
};

export type NextHabit = Pick<Habit, 'name' | 'categoryId' | 'goal'>;
