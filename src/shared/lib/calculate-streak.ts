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

  let currentStreak = 1;
  let maxStreak = 1;

  let prevDate = dayjs(completionDates[0].date).startOf('day');

  for (let i = 1; i < completionDates.length; i++) {
    const date = dayjs(completionDates[i].date).startOf('day');
    const diff = prevDate.diff(date, 'day');

    if (diff === 1) {
      currentStreak++;
    } else {
      maxStreak = Math.max(maxStreak, currentStreak);
    }

    prevDate = date;
  }

  const today = dayjs().startOf('day');
  const lastCompletionDate = dayjs(completionDates[0].date).startOf('day');

  const daysSinceLastCompletion = today.diff(lastCompletionDate, 'day');

  let current = 0;

  if (daysSinceLastCompletion <= 1) {
    current = currentStreak;
  } else {
    current = 0;
  }

  return {
    currentStreak: current,
    longestStreak: maxStreak,
  };
};
