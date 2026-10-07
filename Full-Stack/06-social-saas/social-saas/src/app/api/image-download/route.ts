import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getCldImageUrl } from "next-cloudinary";

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

    const id = Number(request.nextUrl.searchParams.get("id"));

    if (!id) {
      return NextResponse.json(
        { error: "Image ID is required" },
        { status: 400 }
      );
    }

    const image = await db.orm.public.Image
      .where({ id, userId })
      .first();

    if (!image) {
      return NextResponse.json(
        { error: "Image not found" },
        { status: 404 }
      );
    }

    const downloadUrl = getCldImageUrl({
      src: image.publicId,
      width: 2000,
      quality: "auto",
      format: "png",
    });

    const imageResponse = await fetch(downloadUrl);

    if (!imageResponse.ok) {
      throw new Error("Failed to fetch image from Cloudinary");
    }

    const imageBuffer = await imageResponse.arrayBuffer();

    const safeTitle = (image.title || "image")
      .replace(/[<>:"/\\|?*]/g, "")
      .trim();

    return new NextResponse(imageBuffer, {
      headers: {
        "Content-Type": "image/png",
        "Content-Disposition": `attachment; filename="${safeTitle || "image"}.png"`,
      },
    });
  } catch (error) {
    console.error("Image download error:", error);

    return NextResponse.json(
      { error: "Failed to download image" },
      { status: 500 }
    );
  }
}