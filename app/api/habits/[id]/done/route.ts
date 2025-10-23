import { NextRequest, NextResponse } from 'next/server';

import { calculateStreak, prisma } from '@/shared/lib';
import { auth } from '@/shared/lib/auth.server';

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth.api.getSession({ headers: req.headers });
  const { id } = await params;

  if (!session) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized' },
      {
        status: 401,
      },
    );
  }

  if (!id || !Number.isInteger(Number(id))) {
    return NextResponse.json(
      { success: false, message: 'Invalid request' },
      {
        status: 400,
      },
    );
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const habitLog = await prisma.habitLog.update({
    where: {
      habitId_date: {
        habitId: Number(id),
        date: today,
      },
    },
    data: {
      done: true,
    },
  });

  if (!habitLog) {
    return NextResponse.json(
      { success: false, message: 'Failed to mark habit as done' },
      {
        status: 500,
      },
    );
  }

  const habit = await prisma.habit.findUnique({
    where: {
      id: Number(id),
    },
    select: {
      id: true,
      currentStreak: true,
      longestStreak: true,
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

  if (!habit) {
    return NextResponse.json(
      { success: false, message: 'Failed to find habit' },
      {
        status: 500,
      },
    );
  }

  const { currentStreak, longestStreak } = calculateStreak(habit.logs);

  const updatedHabit = await prisma.habit.update({
    where: {
      id: habit.id,
    },
    data: {
      currentStreak,
      longestStreak,
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
      currentStreak: true,
      longestStreak: true,
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

  if (!updatedHabit) {
    return NextResponse.json(
      { success: false, message: 'Failed to update habit' },
      {
        status: 500,
      },
    );
  }

  return NextResponse.json(
    { success: true, data: updatedHabit },
    {
      status: 200,
    },
  );
}
