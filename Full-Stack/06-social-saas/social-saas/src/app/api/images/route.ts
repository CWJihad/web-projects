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

    const images = await db.orm.public.Image
      .where({ userId })
      .orderBy((image) => image.createdAt.desc())
      .all();

    const start = (page - 1) * limit;
    const paginatedImages = images.slice(start, start + limit);

    return NextResponse.json({
      images: paginatedImages,
      page,
      limit,
      hasMore: start + limit < images.length,
    });
  } catch (error) {
    console.error("Error fetching images:", error);

    return NextResponse.json(
      { error: "Error fetching images" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
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
    const id = Number(searchParams.get("id"));

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

    await db.orm.public.Image
      .where({ id, userId })
      .delete();

    return NextResponse.json({
      message: "Image deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting image:", error);

    return NextResponse.json(
      { error: "Failed to delete image" },
      { status: 500 }
    );
  }
}