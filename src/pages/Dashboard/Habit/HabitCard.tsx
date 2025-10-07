import { observer } from "mobx-react-lite";

import { CheckMark } from "@/shared/icons";
import { calculateStreak } from "@/shared/lib";
import { habitsStore } from "@/shared/store";
import { Habit } from "@/shared/types";
import { Spinner } from "@/shared/ui";

import { ProgressBar } from "./ProgressBar";

export const HabitCard: React.FC<{ habit: Habit }> = observer(({ habit }) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const weekAgo = new Date();
  weekAgo.setDate(today.getDate() - 7);

  const isDoneToday = habit.logs.some(
    (log) => log.done && new Date(log.date).getTime() === today.getTime()
  );

  const doneCountThisWeek = habit.logs.filter(
    (log) =>
      log.done &&
      new Date(log.date).getTime() >= weekAgo.getTime() &&
      new Date(log.date).getTime() <= today.getTime()
  ).length;

  const streak = calculateStreak(habit.logs);

  const handleClickDone = async () => {
    await habitsStore.markHabitDone(habit.id);
  };

  return (
    <article className="w-96 bg-white px-4 py-6 rounded-lg shadow-sm border border-gray-200 flex flex-col gap-3">
      <div className="flex justify-between">
        <h2 className="font-semibold">{habit.name}</h2>
        <p className="text-gray-600">{habit.goal} times/week</p>
      </div>

      <ProgressBar progress={doneCountThisWeek} goal={habit.goal} />

      <div className="flex justify-between items-center">
        <span className="text-gray-600">🔥 {streak} day streak</span>

        {isDoneToday ? (
          <div className="flex gap-2 items-center">
            <span className="text-lime-500">
              <CheckMark />
            </span>
            Done
          </div>
        ) : (
          <button
            className="bg-lime-500 rounded-md p-2 text-white cursor-pointer"
            onClick={handleClickDone}
          >
            Mark done
            {habitsStore.loading && <Spinner />}
          </button>
        )}
      </div>
    </article>
  );
});
