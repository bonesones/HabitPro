import { makeAutoObservable, runInAction } from "mobx";

import { aFetch } from "../api";
import { Habit } from "../types";

export class HabitsStore {
  habits: Habit[] = [];
  loading = false;
  updatingHabit = new Set<number>();
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
    this.fetchHabits();
  }

  addHabit(habit: Habit) {
    this.habits.push(habit);
  }

  async markHabitDone(habitId: number) {
    this.updatingHabit.add(habitId);

    try {
      const response = await aFetch<Habit>(`/api/habits/${habitId}/done`, {
        method: "PATCH",
      });

      runInAction(() => {
        if (response.success) {
          this.habits = this.habits.map((habit) => {
            if (habit.id === habitId) {
              return response.data;
            }

            return habit;
          });
          this.error = null;
        } else {
          this.error = response.message;
        }
      });
    } catch (error) {
      runInAction(() => {
        if (error instanceof Error) {
          this.error = error.message;
        } else {
          this.error = "Unknown error";
        }
      });
    } finally {
      runInAction(() => {
        this.updatingHabit.delete(habitId);
      });
    }
  }

  async fetchHabits() {
    this.loading = true;

    try {
      const response = await aFetch<Habit[]>("/api/habits");

      runInAction(() => {
        if (response.success) {
          this.habits = response.data;
          this.error = null;
        } else {
          this.error = response.message;
        }
      });
    } catch (error) {
      runInAction(() => {
        if (error instanceof Error) {
          this.error = error.message;
        } else {
          this.error = "Unknown error";
        }
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  isHabitUpdating(habitId: number) {
    return this.updatingHabit.has(habitId);
  }
}

export const habitsStore = new HabitsStore();
