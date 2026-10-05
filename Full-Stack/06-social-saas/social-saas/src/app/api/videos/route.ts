import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function GET(request: NextRequest) {
  try {
    await auth.protect();

    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const videos = await db.orm.public.Video
    .where({userId})
    .orderBy((v) => v.createdAt.desc())
    .all()

    return NextResponse.json(videos);
  } catch (error) {
    console.error("Error fetching videos: ", error);
    
    return NextResponse.json(
      { error: "Error fetching videos" },
      { status: 500 },
    );
  }
}
