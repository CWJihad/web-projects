import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { userId } = await auth();
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
    const videoId = Number(id);

  const video = await db.orm.public.Video
    .where({ id: videoId, userId })
    .first();

  if (!video) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json(video);
}
