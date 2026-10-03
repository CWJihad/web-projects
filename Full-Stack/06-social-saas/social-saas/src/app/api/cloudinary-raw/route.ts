import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

const tinyPng =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";

export async function GET() {
  const timestamp = Math.floor(Date.now() / 1000);
  const signature = cloudinary.utils.api_sign_request(
    { timestamp },
    process.env.CLOUDINARY_API_SECRET!,
  );

  const body = new FormData();
  body.append("file", tinyPng);
  body.append("api_key", process.env.CLOUDINARY_API_KEY!);
  body.append("timestamp", String(timestamp));
  body.append("signature", signature);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
    { method: "POST", body },
  );

  return NextResponse.json({
    status: res.status,
    body: await res.text(),
  });
}