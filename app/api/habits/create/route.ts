import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/shared/lib';
import { auth } from '@/shared/lib/auth.server';

import { NextHabit } from '@/entities/habit/model';

export async function POST(req: NextRequest) {
  const { name, goal, categoryId } = (await req.json()) as NextHabit;

  const session = await auth.api.getSession({ headers: req.headers });

  if (!session) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized' },
      {
        status: 401,
      },
    );
  }

  if (!name || !goal || !categoryId) {
    return NextResponse.json(
      { success: false, message: 'Invalid request' },
      {
        status: 400,
      },
    );
  }

  if (goal < 1 || goal > 7) {
    return NextResponse.json(
      { success: false, message: 'Invalid goal' },
      {
        status: 400,
      },
    );
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const habit = await prisma.habit.create({
    data: {
      name,
      goal,
      categoryId,
      userId: session.user.id,
      logs: {
        create: { date: today },
      },
    },
    include: {
      logs: true,
    },
  });

  if (!habit) {
    return NextResponse.json(
      { success: false, message: 'Failed to create habit' },
      {
        status: 500,
      },
    );
  }

  return NextResponse.json(
    { success: true, data: habit },
    {
      status: 200,
    },
  );
}
