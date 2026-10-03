import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const tinyPng =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";

export async function GET() {
  try {
    const result = await cloudinary.uploader.upload(tinyPng, {
      resource_type: "image",
    });
    return NextResponse.json({ ok: true, public_id: result.public_id });
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, message: error?.message, http_code: error?.http_code },
      { status: 500 },
    );
  }
}