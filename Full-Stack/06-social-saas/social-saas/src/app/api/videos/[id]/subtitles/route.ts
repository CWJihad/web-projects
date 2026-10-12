import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { v2 as cloudinary } from "cloudinary";
import { db } from "@/lib/prisma";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const LANGS = ["en-US", "bn-BD"];

async function getOwnedVideo(id: string) {
  const { userId } = await auth();
  const videoId = Number(id);
  if (!userId) return null;
  const video = await db.orm.public.Video.where({
    id: videoId,
    userId,
  }).first();
  //   return videos[0] ?? null;
  return video;
}

const srtUrl = (publicId: string, language: string) =>
  `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/raw/upload/${publicId}.${language}.srt`;

type Ctx = { params: Promise<{ id: string }> };

// Check status / read SRT
export async function GET(req: Request, { params }: Ctx) {
  const { id } = await params;
  const video = await getOwnedVideo(id);
  if (!video) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const language = new URL(req.url).searchParams.get("language") ?? "";
  if (!LANGS.includes(language))
    return NextResponse.json(
      { error: "Unsupported language" },
      { status: 400 },
    );

  try {
    const meta = await cloudinary.api.resource(`${video.publicId}.${language}.srt`, {
      resource_type: "raw"
    })
    const res = await fetch(meta.secure_url, {cache: "no-store"})
    if (!res.ok) return NextResponse.json({ready: false})
    return NextResponse.json({ready: true, srt: await res.text(), rev: meta.version})
    
  } catch {
    return NextResponse.json({ready: false})
  }

}

// Start generation
export async function POST(req: Request, { params }: Ctx) {
  const { id } = await params;
  const video = await getOwnedVideo(id);
  if (!video) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const { language } = await req.json();
  if (!LANGS.includes(language))
    return NextResponse.json(
      { error: "Unsupported language" },
      { status: 400 },
    );

  try {
    // Verify exact raw_convert format against the add-on docs ("Transcription languages")
    const result = await cloudinary.api.update(video.publicId, {
      resource_type: "video",
      type: "upload",
      raw_convert: `google_speech:srt:${language}`,
    });
    console.log("transcription: ", JSON.stringify(result.info ?? result, null, 2));
    return NextResponse.json({ started: true });
  } catch (e: any) {
    console.error("transcription error:", e?.error?.message ?? e);
    return NextResponse.json(
      { error: "Failed to start transcription" },
      { status: 500 },
    );
  }
}

// Save edited SRT
export async function PUT(req: Request, { params }: Ctx) {
  const { id } = await params;
  const video = await getOwnedVideo(id);
  if (!video) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const { srt, language } = await req.json();
  if (
    !LANGS.includes(language) ||
    typeof srt !== "string" ||
    !srt.trim() ||
    srt.length > 200_000
  )
    return NextResponse.json({ error: "Invalid subtitles" }, { status: 400 });

  try {
    const result: any = await new Promise((resolve, reject) =>
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: "raw",
            public_id: `${video.publicId}.${language}.srt`,
            overwrite: true,
            invalidate: true,
          },
          (err, r) => (err ? reject(err) : resolve(r)),
        )
        .end(Buffer.from(srt, "utf-8")),
    );
    return NextResponse.json({ saved: true, rev: result.version });
    
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to save subtitles" },
      { status: 500 },
    );
  }
}
