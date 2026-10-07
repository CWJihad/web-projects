import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

import { db } from "@/lib/prisma";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await auth.protect();

    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const imageId = Number(id);

    if (!Number.isInteger(imageId) || imageId <= 0) {
      return NextResponse.json({ error: "Invalid image ID" }, { status: 400 });
    }

    const image = await db.orm.public.Image
      .where({ id: imageId, userId })
      .first();

    if (!image) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }

    return NextResponse.json({ image });
  } catch (error) {
    console.error("Error fetching image:", error);

    return NextResponse.json(
      { error: "Error fetching image" },
      { status: 500 },
    );
  }
}