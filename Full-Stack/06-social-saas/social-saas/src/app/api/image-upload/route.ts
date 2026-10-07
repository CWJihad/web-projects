import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
});

interface CloudinaryUploadResult {
  public_id: string;
  [key: string]: any;
}

export async function POST(request: NextRequest) {
  await auth.protect();

  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const title = formData.get("title") as String | null;

    if (!file) {
      return NextResponse.json({ error: "File not found!" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await new Promise<{
      public_id: string;
      bytes: number;
    }>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: "image",
            asset_folder: "next-cloudinary-uploads",
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else if (result) {
              resolve({
                public_id: result.public_id,
                bytes: result.bytes,
              });
            } else {
              reject(new Error("Cloudinary upload failed"));
            }
          },
        )
        .end(buffer);
    });

    const image = await db.orm.public.Image.create({
      title: typeof title === "string" && title.trim() ? title.trim() : null,
      publicId: result.public_id,
      originalSize: String(result.bytes),
      userId,
    });


    return NextResponse.json(image , { status: 200 });
  } catch (error) {
    console.error("Image upload error:", error);

    return NextResponse.json(
      { error: "Failed to upload image" },
      { status: 500 }
    );
  }
}
