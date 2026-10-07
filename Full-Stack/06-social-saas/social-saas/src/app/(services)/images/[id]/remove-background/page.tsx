"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getCldImageUrl } from "next-cloudinary";
import { ArrowLeft, Download, Eraser } from "lucide-react";
import { downloadFile, sanitizeFileName } from "@/helpers/downloadFile";

type ImageItem = {
  id: number;
  title: string | null;
  publicId: string;
  originalSize: string | null;
  createdAt: string;
};

const MAX_ATTEMPTS = 10;
const RETRY_DELAY_MS = 2000;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const ImageRemoveBackgroundPage = () => {
  const { id } = useParams<{ id: string }>();

  const [image, setImage] = useState<ImageItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  const resultUrlRef = useRef<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

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

  useEffect(() => {
    return () => {
      abortRef.current?.abort();
      if (resultUrlRef.current) URL.revokeObjectURL(resultUrlRef.current);
    };
  }, []);

  const handleRemoveBackground = async () => {
    if (!image) return;

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setProcessing(true);
    setError(null);

    const url = getCldImageUrl({
      src: image.publicId,
      removeBackground: true,
      format: "png",
    });

    try {
      for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
        const response = await fetch(url, { signal: controller.signal });

        if (response.ok) {
          const blob = await response.blob();
          const objectUrl = URL.createObjectURL(blob);

          if (resultUrlRef.current) URL.revokeObjectURL(resultUrlRef.current);
          resultUrlRef.current = objectUrl;

          setResultUrl(objectUrl);
          setProcessing(false);
          return;
        }

        // 423 = Cloudinary is still processing the AI transformation
        if (response.status !== 423) {
          throw new Error(
            "Background removal failed. Make sure the Cloudinary AI Background Removal add-on is enabled.",
          );
        }

        await sleep(RETRY_DELAY_MS);
      }

      throw new Error("Processing took too long. Please try again.");
    } catch (err) {
      if ((err as Error).name === "AbortError") return;
      console.error("Background removal error:", err);
      setError(
        err instanceof Error ? err.message : "Background removal failed",
      );
      setProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!image || !resultUrl) return;

    downloadFile(
      resultUrl,
      `${sanitizeFileName(image.title || "image")}-no-bg.png`,
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

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div>
        <Link href="/images" className="btn btn-ghost btn-sm mb-2">
          <ArrowLeft size={16} />
          Back to images
        </Link>

        <div className="flex items-center gap-2">
          <Eraser size={28} className="text-primary" />
          <h1 className="text-3xl font-bold">Background Remover</h1>
        </div>
        <p className="mt-1 text-base-content/60">
          Remove the background and download a transparent PNG.
        </p>
      </div>

      {error && (
        <div className="alert alert-error">
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Original */}
        <div className="rounded-box border border-base-300 bg-base-100 p-6">
          <h2 className="mb-4 text-xl font-bold">Original</h2>

          <div className="flex min-h-48 items-center justify-center rounded-box bg-base-200 p-2">
            <img
              src={getCldImageUrl({
                src: image.publicId,
                width: 800,
                height: 600,
                crop: "fit",
              })}
              alt={image.title || "Original image"}
              className="max-h-96 max-w-full rounded object-contain"
            />
          </div>

          <button
            className="btn btn-primary mt-4 w-full"
            onClick={handleRemoveBackground}
            disabled={processing}
          >
            {processing ? (
              <>
                <span className="loading loading-spinner loading-sm" />
                Processing...
              </>
            ) : (
              <>
                <Eraser size={18} />
                {resultUrl ? "Run Again" : "Remove Background"}
              </>
            )}
          </button>
        </div>

        {/* Result */}
        <div className="rounded-box border border-base-300 bg-base-100 p-6 lg:sticky lg:top-6 lg:self-start">
          <h2 className="mb-4 text-xl font-bold">Result</h2>

          <div
            className="relative flex min-h-48 items-center justify-center rounded-box p-2"
            style={{
              backgroundColor: "#ffffff",
              backgroundImage:
                "linear-gradient(45deg,#d4d4d4 25%,transparent 25%,transparent 75%,#d4d4d4 75%),linear-gradient(45deg,#d4d4d4 25%,transparent 25%,transparent 75%,#d4d4d4 75%)",
              backgroundSize: "20px 20px",
              backgroundPosition: "0 0, 10px 10px",
            }}
          >
            {processing && (
              <span className="loading loading-spinner loading-lg absolute z-10" />
            )}

            {resultUrl ? (
              <img
                src={resultUrl}
                alt="Background removed"
                className={`max-h-96 max-w-full rounded object-contain transition-opacity ${
                  processing ? "opacity-40" : "opacity-100"
                }`}
              />
            ) : (
              !processing && (
                <p className="text-center text-black/50">
                  Click &quot;Remove Background&quot; to see the result.
                </p>
              )
            )}
          </div>

          <button
            className="btn btn-primary mt-4 w-full"
            onClick={handleDownload}
            disabled={!resultUrl || processing}
          >
            <Download size={18} />
            Download PNG
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageRemoveBackgroundPage;
