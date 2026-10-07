"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getCldImageUrl } from "next-cloudinary";
import { ArrowLeft, Crop, Download } from "lucide-react";
import { downloadFile, sanitizeFileName } from "@/helpers/downloadFile";

type ImageItem = {
  id: number;
  title: string | null;
  publicId: string;
  originalSize: string | null;
  createdAt: string;
};

type Selection = {
  name: string;
  label: string;
  w: number;
  h: number;
};

const PRESETS: Selection[] = [
  { name: "instagram-square", label: "Instagram Square", w: 1080, h: 1080 },
  { name: "instagram-portrait", label: "Instagram Portrait", w: 1080, h: 1350 },
  { name: "twitter-post", label: "Twitter Post", w: 1200, h: 675 },
  { name: "twitter-header", label: "Twitter Header", w: 1500, h: 500 },
  { name: "facebook-cover", label: "Facebook Cover", w: 820, h: 312 },
];

const MAX_DIMENSION = 5000;

const buildUrl = (publicId: string, w: number, h: number) =>
  getCldImageUrl({
    src: publicId,
    width: w,
    height: h,
    crop: "fill",
    gravity: "auto",
    format: "jpg",
    quality: "auto",
  });

const ImageResizePage = () => {
  const { id } = useParams<{ id: string }>();

  const [image, setImage] = useState<ImageItem | null>(null);
  const [width, setWidth] = useState("1080");
  const [height, setHeight] = useState("1080");
  const [selection, setSelection] = useState<Selection | null>(null);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  const selectSize = (next: Selection) => {
    setError(null);
    setPreviewLoading(true);
    setSelection(next);
  };

  const handleCustomPreview = () => {
    const w = Number(width);
    const h = Number(height);

    if (!w || !h || w > MAX_DIMENSION || h > MAX_DIMENSION) {
      setError(`Width and height must be between 1 and ${MAX_DIMENSION}`);
      return;
    }

    selectSize({ name: "custom", label: "Custom", w, h });
  };

  const handleDownload = async () => {
    if (!image || !selection) return;

    try {
      setDownloading(true);

      const response = await fetch(
        buildUrl(image.publicId, selection.w, selection.h),
      );

      if (!response.ok) throw new Error("Failed to download image");

      const blob = await response.blob();
      const downloadUrl = URL.createObjectURL(blob);

      downloadFile(
        downloadUrl,
        `${sanitizeFileName(image.title || "image")}-${selection.name}-${selection.w}x${selection.h}.jpg`,
      );

      URL.revokeObjectURL(downloadUrl);
      
    } catch (err) {
      console.error("Image resize error:", err);
      setError("Failed to download image");
    } finally {
      setDownloading(false);
    }
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

  const previewUrl = selection
    ? buildUrl(image.publicId, selection.w, selection.h)
    : null;

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div>
        <Link href="/images" className="btn btn-ghost btn-sm mb-2">
          <ArrowLeft size={16} />
          Back to images
        </Link>

        <div className="flex items-center gap-2">
          <Crop size={28} className="text-primary" />
          <h1 className="text-3xl font-bold">Image Resizer</h1>
        </div>
        <p className="mt-1 text-base-content/60">
          Pick a size, preview the result, then download.
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
            <h2 className="mb-4 text-xl font-bold">Social Media Presets</h2>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {PRESETS.map((preset) => (
                <button
                  key={preset.name}
                  className={`btn ${
                    selection?.name === preset.name
                      ? "btn-primary"
                      : "btn-outline"
                  }`}
                  onClick={() => selectSize(preset)}
                >
                  {preset.label}
                  <span className="text-xs opacity-60">
                    {preset.w} × {preset.h}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-box border border-base-300 bg-base-100 p-6">
            <h2 className="mb-4 text-xl font-bold">Custom Size</h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="form-control">
                <span className="mb-2 text-sm font-medium">Width</span>
                <input
                  type="number"
                  min="1"
                  max={MAX_DIMENSION}
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                  className="input input-bordered w-full outline-none"
                />
              </label>

              <label className="form-control">
                <span className="mb-2 text-sm font-medium">Height</span>
                <input
                  type="number"
                  min="1"
                  max={MAX_DIMENSION}
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="input input-bordered w-full outline-none"
                />
              </label>
            </div>

            <button
              className={`btn mt-4 ${
                selection?.name === "custom" ? "btn-primary" : "btn-outline"
              }`}
              onClick={handleCustomPreview}
            >
              Preview Custom Size
            </button>
          </div>
        </div>

        {/* Preview */}
        <div className="rounded-box border border-base-300 bg-base-100 p-6 lg:sticky lg:top-6 lg:self-start">
          <h2 className="mb-4 text-xl font-bold">Preview</h2>

          {selection && previewUrl ? (
            <div className="space-y-4">
              <div className="relative flex min-h-48 items-center justify-center rounded-box bg-base-200 p-2">
                {previewLoading && (
                  <span className="loading loading-spinner loading-lg absolute" />
                )}

                <img
                  key={previewUrl}
                  src={previewUrl}
                  alt={`${selection.label} preview`}
                  onLoad={() => setPreviewLoading(false)}
                  onError={() => {
                    setPreviewLoading(false);
                    setError("Failed to load preview");
                  }}
                  style={{ aspectRatio: `${selection.w} / ${selection.h}` }}
                  className={`max-h-96 max-w-full rounded object-contain transition-opacity ${
                    previewLoading ? "opacity-0" : "opacity-100"
                  }`}
                />
              </div>

              <div className="text-center text-sm text-base-content/70">
                <p className="font-semibold">{selection.label}</p>
                <p>
                  {selection.w} × {selection.h} px
                </p>
              </div>

              <button
                className="btn btn-primary w-full"
                onClick={handleDownload}
                disabled={downloading || previewLoading}
              >
                {downloading ? (
                  <span className="loading loading-spinner loading-sm" />
                ) : (
                  <Download size={18} />
                )}
                Download {selection.w} × {selection.h}
              </button>
            </div>
          ) : (
            <div className="flex min-h-48 items-center justify-center rounded-box border border-dashed border-base-300 p-6 text-center text-base-content/50">
              Select a preset or preview a custom size.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageResizePage;
