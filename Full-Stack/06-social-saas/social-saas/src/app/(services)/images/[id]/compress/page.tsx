"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getCldImageUrl } from "next-cloudinary";
import { ArrowLeft, Download, Minimize2 } from "lucide-react";
import { downloadFile, sanitizeFileName } from "@/helpers/downloadFile";

type ImageItem = {
  id: number;
  title: string | null;
  publicId: string;
  originalSize: string | null;
  createdAt: string;
};

const QUALITY_PRESETS = [
  { label: "Low", value: 30 },
  { label: "Medium", value: 60 },
  { label: "High", value: 80 },
  { label: "Max", value: 95 },
];

const FORMATS = [
  { label: "Original", value: "" },
  { label: "JPG", value: "jpg" },
  { label: "PNG", value: "png" },
  { label: "WebP", value: "webp" },
];

const EXTENSIONS: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
  "image/avif": "avif",
};

const formatBytes = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
};

const ImageCompressPage = () => {
  const { id } = useParams<{ id: string }>();

  const [image, setImage] = useState<ImageItem | null>(null);
  const [quality, setQuality] = useState(60);
  const [format, setFormat] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [originalBytes, setOriginalBytes] = useState<number | null>(null);
  const [compressedBlob, setCompressedBlob] = useState<Blob | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  const previewUrlRef = useRef<string | null>(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(`/api/images/${id}`);

        if (!response.ok) {
          throw new Error(
            response.status === 404
              ? "Image not found"
              : "Failed to load image",
          );
        }

        const data = await response.json();
        setImage(data.image);
      } catch (err) {
        console.error("Failed to fetch image:", err);
        setError(err instanceof Error ? err.message : "Failed to load image");
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
  }, [id]);

  // Original size
  useEffect(() => {
    if (!image) return;

    const controller = new AbortController();

    fetch(getCldImageUrl({ src: image.publicId }), {
      signal: controller.signal,
    })
      .then((res) => res.blob())
      .then((blob) => setOriginalBytes(blob.size))
      .catch(() => {});

    return () => controller.abort();
  }, [image]);

  // Compressed preview (debounced)
  useEffect(() => {
    if (!image) return;

    const controller = new AbortController();
    setProcessing(true);

    const timeout = setTimeout(async () => {
      try {
        const response = await fetch(
          getCldImageUrl({
            src: image.publicId,
            quality,
            ...(format && { format }),
          }),
          { signal: controller.signal },
        );

        if (!response.ok) throw new Error("Failed to compress image");

        const blob = await response.blob();
        const objectUrl = URL.createObjectURL(blob);

        if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
        previewUrlRef.current = objectUrl;

        setCompressedBlob(blob);
        setPreviewUrl(objectUrl);
        setError(null);
        setProcessing(false);
      } catch (err) {
        if ((err as Error).name === "AbortError") return;
        console.error("Compression error:", err);
        setError("Failed to compress image");
        setProcessing(false);
      }
    }, 400);

    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, [image, quality]);

  useEffect(() => {
    return () => {
      if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
    };
  }, [image, quality, format]);

 const handleDownload = () => {
  if (!image || !compressedBlob || !previewUrl) return;

  const extension = EXTENSIONS[compressedBlob.type] || "jpg";

  downloadFile(
    previewUrl,
    `${sanitizeFileName(image.title || "image")}-q${quality}.${extension}`,
  );
};

  if (loading) {
    return (
      <div className="flex min-h-100 items-center justify-center">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  if (!image) {
    return (
      <div className="mx-auto max-w-5xl space-y-4">
        <div className="alert alert-error">
          <span>{error || "Image not found"}</span>
        </div>
        <Link href="/images" className="btn btn-outline btn-sm">
          <ArrowLeft size={16} />
          Back to images
        </Link>
      </div>
    );
  }

  const savedPercent =
    originalBytes && compressedBlob
      ? Math.round((1 - compressedBlob.size / originalBytes) * 100)
      : null;

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div>
        <Link href="/images" className="btn btn-ghost btn-sm mb-2">
          <ArrowLeft size={16} />
          Back to images
        </Link>

        <div className="flex items-center gap-2">
          <Minimize2 size={28} className="text-primary" />
          <h1 className="text-3xl font-bold">Image Compressor</h1>
        </div>
        <p className="mt-1 text-base-content/60">
          Choose a quality level, preview the result, then download.
        </p>
      </div>

      {error && (
        <div className="alert alert-error">
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Controls */}
        <div className="space-y-6">
          <div className="rounded-box border border-base-300 bg-base-100 p-6">
            <h2 className="mb-4 text-xl font-bold">Format</h2>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {FORMATS.map((f) => (
                <button
                  key={f.label}
                  className={`btn ${format === f.value ? "btn-primary" : "btn-outline"}`}
                  onClick={() => setFormat(f.value)}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {format === "png" && (
              <p className="mt-3 text-sm text-base-content/60">
                PNG is lossless, so quality has little effect. Use JPG or WebP
                for smaller files.
              </p>
            )}
          </div>

          <div className="rounded-box border border-base-300 bg-base-100 p-6">
            <h2 className="mb-4 text-xl font-bold">Quality</h2>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {QUALITY_PRESETS.map((preset) => (
                <button
                  key={preset.label}
                  className={`btn ${
                    quality === preset.value ? "btn-primary" : "btn-outline"
                  }`}
                  onClick={() => setQuality(preset.value)}
                >
                  {preset.label}
                  <span className="text-xs opacity-60">{preset.value}</span>
                </button>
              ))}
            </div>

            <div className="mt-6">
              <div className="mb-2 flex justify-between text-sm font-medium">
                <span>Custom quality</span>
                <span>{quality}</span>
              </div>

              <input
                type="range"
                min="1"
                max="100"
                value={quality}
                onChange={(e) => setQuality(Number(e.target.value))}
                className="range range-primary w-full"
              />
            </div>
          </div>

          <div className="rounded-box border border-base-300 bg-base-100 p-6">
            <h2 className="mb-4 text-xl font-bold">Size</h2>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-sm text-base-content/60">Original</p>
                <p className="font-semibold">
                  {originalBytes ? formatBytes(originalBytes) : "—"}
                </p>
              </div>

              <div>
                <p className="text-sm text-base-content/60">Compressed</p>
                <p className="font-semibold">
                  {compressedBlob && !processing
                    ? formatBytes(compressedBlob.size)
                    : "—"}
                </p>
              </div>

              <div>
                <p className="text-sm text-base-content/60">Saved</p>
                <p className="font-semibold">
                  {savedPercent !== null && !processing
                    ? `${savedPercent}%`
                    : "—"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="rounded-box border border-base-300 bg-base-100 p-6 lg:sticky lg:top-6 lg:self-start">
          <h2 className="mb-4 text-xl font-bold">Preview</h2>

          <div className="relative flex min-h-48 items-center justify-center rounded-box bg-base-200 p-2">
            {processing && (
              <span className="loading loading-spinner loading-lg absolute z-10" />
            )}

            {previewUrl && (
              <img
                src={previewUrl}
                alt="Compressed preview"
                className={`max-h-96 max-w-full rounded object-contain transition-opacity ${
                  processing ? "opacity-40" : "opacity-100"
                }`}
              />
            )}
          </div>

          <button
            className="btn btn-primary mt-4 w-full"
            onClick={handleDownload}
            disabled={processing || !compressedBlob}
          >
            <Download size={18} />
            Download Compressed
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageCompressPage;
