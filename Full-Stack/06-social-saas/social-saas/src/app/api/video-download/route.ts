import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import { getCldVideoUrl } from "next-cloudinary";

export async function GET(request: NextRequest) {
  try {
    await auth.protect();

    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const publicId = request.nextUrl.searchParams.get("publicId");

    if (!publicId) {
      return NextResponse.json(
        { error: "Video publicId is required" },
        { status: 400 },
      );
    }

    const video = await db.orm.public.Video.where({
      publicId,
      userId,
    }).first();

    if (!video) {
      return NextResponse.json({ error: "Video not found" }, { status: 404 });
    }

    const downloadUrl = getCldVideoUrl({
      src: video.publicId,
      width: 1920,
      height: 1080,
    });

    const videoRes = await fetch(downloadUrl);

    if (!videoRes.ok) {
      throw new Error("Failed to fetch video from Cloudinary");
    }

    const videoBuffer = await videoRes.arrayBuffer();

    const safeTitle = video.title.replace(/[<>:"/\\|?*]/g, "").trim();

    return new NextResponse(videoBuffer, {
      headers: {
        "Content-Type": "video/mp4",
        "Content-Disposition": `attachment; filename="${safeTitle}.mp4"`,
      },
    });

  } catch (error) {
    console.error("Video download error:", error);

    return NextResponse.json(
      { error: "Failed to prepare video download" },
      { status: 500 },
    );
  }
}
