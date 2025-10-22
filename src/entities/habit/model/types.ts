import type { Habit as PrismaHabit, Category } from '@/shared/generated/prisma';
import type { HabitLog } from '@/shared/types';

export type Habit = Pick<PrismaHabit, 'id' | 'name' | 'goal'> & {
  logs: HabitLog[];
  category: Pick<Category, 'id' | 'name'>;
};

export type NextHabit = Pick<PrismaHabit, 'name' | 'categoryId' | 'goal'>;
