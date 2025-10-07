import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/shared/lib";

export async function POST(req: NextRequest) {
  const { name } = await req.json();

  if (!name) {
    return NextResponse.json(
      { success: false, message: "Invalid request" },
      {
        status: 400,
      }
    );
  }

  const category = await prisma.category.create({
    data: {
      name,
    },
  });

  if (!category) {
    return NextResponse.json(
      { success: false, message: "Failed to create category" },
      {
        status: 500,
      }
    );
  }

  return NextResponse.json(
    { success: true, data: category },
    {
      status: 200,
    }
  );
}
