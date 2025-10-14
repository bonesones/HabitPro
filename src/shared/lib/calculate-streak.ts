import { HabitLog } from "../types/api";

export const calculateStreak = (logs: HabitLog[]) => {
  const mappedLogs = logs.map((log) => ({ ...log, date: new Date(log.date) }));

  const sortedLogs = mappedLogs.sort(
    (a, b) => b.date.getTime() - a.date.getTime()
  );

  let streak = 0;

  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  const todayLog = sortedLogs.find((log) => isSameDay(log.date, currentDate));

  const startDate = new Date(currentDate);

  if (!todayLog?.done) {
    startDate.setDate(startDate.getDate() - 1);
  }

  for (const log of sortedLogs) {
    const logDate = new Date(log.date);
    if (isSameDay(logDate, startDate) && log.done) {
      streak++;

      startDate.setDate(startDate.getDate() - 1);
    } else if (logDate < startDate) {
      if (!log.done) {
        break;
      }
    }
  }

  return streak;
};

const isSameDay = (a: Date, b: Date) => a.getTime() === b.getTime();
