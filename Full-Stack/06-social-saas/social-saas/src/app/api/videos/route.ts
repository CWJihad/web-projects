import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    await auth.protect();

    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const searchParams = request.nextUrl.searchParams;

    const page = Math.max(
      Number(searchParams.get("page")) || 1,
      1
    );

    const limit = Math.min(
      Math.max(Number(searchParams.get("limit")) || 20, 1),
      50
    );

    const videos = await db.orm.public.Video
      .where({ userId })
      .orderBy((video) => video.createdAt.desc())
      .all();

    const start = (page - 1) * limit;
    const paginatedVideos = videos.slice(start, start + limit);

    return NextResponse.json({
      videos: paginatedVideos,
      page,
      limit,
      hasMore: start + limit < videos.length,
    });
  } catch (error) {
    console.error("Error fetching videos:", error);

    return NextResponse.json(
      { error: "Error fetching videos" },
      { status: 500 }
    );
  }
}