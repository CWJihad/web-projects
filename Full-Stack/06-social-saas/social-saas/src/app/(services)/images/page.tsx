"use client";

import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import {
  Image as ImageIcon,
  Upload,
  Trash2,
  Download,
  Crop,
  Minimize2,
  Eraser,
} from "lucide-react";
import { getCldImageUrl } from "next-cloudinary";

type ImageItem = {
  id: number;
  title: string | null;
  publicId: string;
  originalSize: string | null;
  createdAt: string;
};

const IMAGES_PER_PAGE = 20;

const ImagesPage = () => {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const fetchImages = useCallback(async (currentPage: number) => {
    try {
      setLoading(true);
      setError(null);

      const res = await axios.get(
        `/api/images?page=${currentPage}&limit=${IMAGES_PER_PAGE}`,
      );

      if (Array.isArray(res.data.images)) {
        setImages(res.data.images);
        setHasMore(res.data.hasMore);
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (error) {
      console.error("Failed to fetch images:", error);
      setError("Failed to fetch images");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchImages(page);
  }, [page, fetchImages]);

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this image?",
    );

    if (!confirmed) return;

    try {
      await axios.delete(`/api/images?id=${id}`);

      setImages((currentImages) =>
        currentImages.filter((image) => image.id !== id),
      );
    } catch (error) {
      console.error("Failed to delete image:", error);
      setError("Failed to delete image");
    }
  };

  const handleDownload = async (image: ImageItem) => {
    try {
      const res = await axios.get(`/api/image-download?id=${image.id}`, {
        responseType: "blob",
      });

      const blobUrl = window.URL.createObjectURL(res.data);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `${image.title || "image"}.png`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download failed:", error);
      setError("Failed to download image");
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-100 items-center justify-center">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <ImageIcon size={28} className="text-primary" />

            <h1 className="text-3xl font-bold">My Images</h1>
          </div>

          <p className="mt-1 text-base-content/60">
            Manage and process your uploaded images.
          </p>
        </div>

        <div className="flex gap-2">
          {/* <Link href="/images/resize" className="btn btn-secondary">
        <Crop size={18}/>
          Resize Image
        </Link> */}

          <Link href="/social-share" className="btn btn-primary">
            <Upload size={18} />
            Upload Image
          </Link>
        </div>
      </div>

      {/* Error */}
      {error ? (
        <div className="alert alert-error">
          <span>{error}</span>
        </div>
      ) : images.length === 0 ? (
        /* Empty State */
        <div className="rounded-box border border-base-300 bg-base-100 p-10 text-center">
          <ImageIcon size={48} className="mx-auto mb-4 text-base-content/30" />

          <h2 className="text-xl font-semibold">No images yet</h2>

          <p className="mt-1 text-sm text-base-content/60">
            Upload your first image to start using image services.
          </p>

          <Link href="/social-share" className="btn btn-primary btn-sm mt-5">
            <Upload size={16} />
            Upload Image
          </Link>
        </div>
      ) : (
        <>
          {/* Images */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {images.map((image) => (
              <div
                key={image.id}
                className="overflow-hidden rounded-box border border-base-300 bg-base-100"
              >
                <img
                  src={getCldImageUrl({
                    src: image.publicId,
                    width: 600,
                    height: 600,
                    crop: "fill",
                    gravity: "auto",
                  })}
                  alt={image.title || "Uploaded image"}
                  className="aspect-square w-full object-cover"
                />

                <div className="p-3">
                  <p className="truncate text-sm font-semibold">
                    {image.title || "Untitled image"}
                  </p>

                  <button
                    type="button"
                    className="btn btn-ghost btn-sm text-error"
                    onClick={() => handleDelete(image.id)}
                    title="Delete image"
                  >
                    <Trash2 size={16} />
                  </button>

                  <button
                    type="button"
                    className="btn btn-ghost btn-sm hover:text-blue-500"
                    onClick={() => handleDownload(image)}
                    title="Download image"
                  >
                    <Download size={16} />
                  </button>

                  <Link
                    href={`/images/${image.id}/resize`}
                    className="btn btn-ghost btn-sm hover:text-primary"
                    title="Resize image"
                  >
                    <Crop size={16} />
                  </Link>

                  <Link
                    href={`/images/${image.id}/compress`}
                    className="btn btn-ghost btn-sm hover:text-primary"
                    title="Compress image"
                  >
                    <Minimize2 size={16} />
                  </Link>

                  <Link
                    href={`/images/${image.id}/remove-background`}
                    className="btn btn-ghost btn-sm hover:text-primary"
                    title="Remove background"
                  >
                    <Eraser size={16} />
                  </Link>

                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-3">
            <button
              className="btn btn-outline"
              disabled={page === 1}
              onClick={() => setPage((current) => current - 1)}
            >
              Previous
            </button>

            <span className="px-3 font-medium">Page {page}</span>

            <button
              className="btn btn-outline"
              disabled={!hasMore}
              onClick={() => setPage((current) => current + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ImagesPage;
