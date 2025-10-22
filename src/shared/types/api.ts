import type {
  Category as PrismaCategory,
  HabitLog as PrismaHabitLog,
} from '../generated/prisma';

export type HabitLog = Pick<PrismaHabitLog, 'date' | 'done'>;

export type ApiResponse<T> =
  | { success: true; data: T }
  | { success: false; message: string };

export type Category = Pick<PrismaCategory, 'id' | 'name'>;
