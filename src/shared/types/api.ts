import type {
  Category as PrismaCategory,
  Habit as PrismaHabit,
  HabitLog as PrismaHabitLog,
} from "../generated/prisma";

export type ApiResponse<T> =
  | { success: true; data: T }
  | { success: false; message: string };

export type Category = Pick<PrismaCategory, "id" | "name">;

export type Habit = Pick<PrismaHabit, "id" | "name" | "categoryId" | "goal"> & {
  logs: HabitLog[];
};

export type HabitLog = Pick<PrismaHabitLog, "date" | "done">;
