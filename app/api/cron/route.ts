import { NextResponse } from "next/server";

import { prisma } from "@/shared/lib";

export async function GET() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const habits = await prisma.habit.findMany();

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
  }

  return NextResponse.json(
    { success: true },
    {
      status: 200,
    }
  );
}
