import dayjs from 'dayjs';

import { HabitLog } from '../types';

export const calculateStreak = (habitLogs: HabitLog[]) => {
  const completionDates = habitLogs.filter(log => log.done);

  if (completionDates.length === 0) {
    return {
      currentStreak: 0,
      longestStreak: 0,
    };
  }

  let running = 1;
  let maxStreak = 1;

  let prevDate = dayjs(completionDates[0].date).startOf('day');

  for (let i = 1; i < completionDates.length; i++) {
    const date = dayjs(completionDates[i].date).startOf('day');
    const diff = prevDate.diff(date, 'day');

    if (diff === 1) {
      running++;
    } else {
      maxStreak = Math.max(maxStreak, running);
      running = 1;
    }

    prevDate = date;
  }

  const today = dayjs().startOf('day');
  const lastCompletionDate = dayjs(completionDates[0].date).startOf('day');

  const daysSinceLastCompletion = today.diff(lastCompletionDate, 'day');

  let currentStreak = 0;

  if (daysSinceLastCompletion > 1) {
    currentStreak = 0;
  } else {
    currentStreak = 1;
    let prevForCurrent = lastCompletionDate;

    for (let i = 1; i < completionDates.length; i++) {
      const date = dayjs(completionDates[i].date).startOf('day');
      const diff = prevForCurrent.diff(date, 'day');

      if (diff === 1) {
        currentStreak++;
        prevForCurrent = date;
      } else {
        break;
      }
    }
  }

  return {
    currentStreak: currentStreak,
    longestStreak: maxStreak,
  };
};
