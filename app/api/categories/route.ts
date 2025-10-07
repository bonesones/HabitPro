import { NextResponse } from "next/server";

import { prisma } from "@/shared/lib";

export async function GET() {
  const categories = await prisma.category.findMany({
    select: {
      id: true,
      name: true,
    },
  });

  if (!categories) {
    return NextResponse.json(
      { success: false, message: "Error" },
      {
        status: 500,
      }
    );
  }

  return NextResponse.json({ success: true, data: categories });
}
