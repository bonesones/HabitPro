import { NextResponse } from 'next/server';

import { calculateStreak, prisma } from '@/shared/lib';

export async function GET() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const habits = await prisma.habit.findMany({
    select: {
      id: true,
      logs: {
        orderBy: {
          date: 'desc',
        },
        select: {
          date: true,
          done: true,
        },
      },
    },
  });

  for (const habit of habits) {
    const exists = await prisma.habitLog.findFirst({
      where: {
        habitId: habit.id,
        date: today.toISOString(),
      },
    });

    if (!exists) {
      await prisma.habitLog.create({
        data: {
          habitId: habit.id,
          date: today,
        },
      });
    }

    const { currentStreak, longestStreak } = calculateStreak(habit.logs);

    await prisma.habit.update({
      where: {
        id: habit.id,
      },
      data: {
        currentStreak,
        longestStreak,
      },
    });
  }

  return NextResponse.json(
    { success: true },
    {
      status: 200,
    },
  );
}
