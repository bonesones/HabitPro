import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/shared/lib';
import { auth } from '@/shared/lib/auth.server';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth.api.getSession({ headers: req.headers });

  if (!session) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized' },
      {
        status: 401,
      },
    );
  }

  const { id } = await params;

  if (!id || !Number.isInteger(Number(id))) {
    return NextResponse.json(
      { success: false, message: 'Invalid request' },
      {
        status: 400,
      },
    );
  }

  const habit = await prisma.habit.findUnique({
    where: {
      id: Number(id),
    },
    select: {
      id: true,
      name: true,
      currentStreak: true,
      longestStreak: true,
      category: {
        select: {
          id: true,
          name: true,
        },
      },
      goal: true,
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
        status: 404,
      },
    );
  }

  return NextResponse.json({ success: true, data: habit });
}
