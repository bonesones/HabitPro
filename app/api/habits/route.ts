import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/shared/lib';
import { auth } from '@/shared/lib/auth.server';

export async function GET(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers });

  if (!session) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized' },
      {
        status: 401,
      },
    );
  }

  const habits = await prisma.habit.findMany({
    where: {
      userId: session.user.id,
    },
    select: {
      id: true,
      name: true,
      categoryId: true,
      goal: true,
      logs: {
        select: {
          date: true,
          done: true,
        },
      },
    },
  });

  if (!habits) {
    return NextResponse.json(
      { success: false, message: 'Error' },
      {
        status: 500,
      },
    );
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (const habit of habits) {
    const hasTodayLog = habit.logs.some(
      log => new Date(log.date).getTime() === today.getTime(),
    );

    if (!hasTodayLog) {
      await prisma.habitLog.create({
        data: {
          habitId: habit.id,
          date: today,
        },
      });
    }
  }

  const updatedHabits = await prisma.habit.findMany({
    where: {
      userId: session.user.id,
    },
    select: {
      id: true,
      name: true,
      goal: true,
      category: {
        select: {
          id: true,
          name: true,
        },
      },
      logs: {
        select: {
          date: true,
          done: true,
        },
      },
    },
  });

  return NextResponse.json({ success: true, data: updatedHabits });
}
