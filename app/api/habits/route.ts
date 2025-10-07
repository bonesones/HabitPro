import { NextRequest, NextResponse } from "next/server";

import { auth, prisma } from "@/shared/lib";

export async function GET(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers });

  if (!session) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      {
        status: 401,
      }
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
      { success: false, message: "Error" },
      {
        status: 500,
      }
    );
  }

  return NextResponse.json({ success: true, data: habits });
}
