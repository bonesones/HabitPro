import { HabitLog } from "../types/api";

export const calculateStreak = (logs: HabitLog[]) => {
  const mappedLogs = logs.map((log) => ({ ...log, date: new Date(log.date) }));

  const sortedLogs = mappedLogs.sort(
    (a, b) => b.date.getTime() - a.date.getTime()
  );

  let streak = 0;

  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  for (const log of sortedLogs) {
    if (!log.done) {
      break;
    }
    if (isSameDay(log.date, currentDate)) {
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    } else if (log.date.getTime() < currentDate.getTime()) {
      break;
    }
  }

  return streak;
};

const isSameDay = (a: Date, b: Date) => a.getTime() === b.getTime();
