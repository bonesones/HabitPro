import { observer } from "mobx-react-lite";

import { habitsStore } from "@/shared/store";

import { HabitCard } from "./Habit/HabitCard";

export const Habits = observer(() => {
  const habits = habitsStore.habits;

  return (
    <div className="flex flex-col items-center gap-6 mt-8">
      {habits.map((habit) => (
        <HabitCard key={habit.id} habit={habit} />
      ))}
    </div>
  );
});
