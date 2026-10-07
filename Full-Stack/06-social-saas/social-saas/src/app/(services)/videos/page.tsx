"use client";

import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Link from "next/link";

import VideoCard from "@/components/VideoCard";
import { Video } from "@/types";
import { Video as VideoIcon, Upload } from "lucide-react";

const VIDEOS_PER_PAGE = 20;

const VideosPage = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const fetchVideos = useCallback(async (currentPage: number) => {
    try {
      setLoading(true);
      setError(null);

      const res = await axios.get(
        `/api/videos?page=${currentPage}&limit=${VIDEOS_PER_PAGE}`
      );

      if (Array.isArray(res.data)) {
        setVideos(res.data);
        setHasMore(res.data.length === VIDEOS_PER_PAGE);
      } else if (Array.isArray(res.data.videos)) {
        setVideos(res.data.videos);
        setHasMore(res.data.hasMore);
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (error) {
      console.error("Failed to fetch videos:", error);
      setError("Failed to fetch videos");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVideos(page);
  }, [page, fetchVideos]);

  const handleDownload = useCallback(
    async (url: string, title: string) => {
      try {
        const response = await axios.get(url, {
          responseType: "blob",
        });

        const blobUrl = window.URL.createObjectURL(response.data);

        if (!blobUrl) {
          throw new Error("Download URL not found");
        }

        const link = document.createElement("a");

        link.href = blobUrl;
        link.download = `${title}.mp4`;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        window.URL.revokeObjectURL(blobUrl);
      } catch (error) {
        console.error("Download failed:", error);
        alert("Failed to download video");
      }
    },
    []
  );

  if (loading) {
    return (
      <div className="flex min-h-100 items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <VideoIcon size={28} className="text-primary" />

            <h1 className="text-3xl font-bold">My Videos</h1>
          </div>

          <p className="mt-1 text-base-content/60">
            Manage and download your uploaded videos.
          </p>
        </div>

        <Link href="/video-upload" className="btn btn-primary">
          <Upload size={18} />
          Upload Video
        </Link>
      </div>

      {/* Error */}
      {error ? (
        <div className="alert alert-error">
          <span>{error}</span>
        </div>
      ) : videos.length === 0 ? (
        /* Empty State */
        <div className="rounded-box border border-base-300 bg-base-100 p-10 text-center">
          <VideoIcon
            size={48}
            className="mx-auto mb-4 text-base-content/30"
          />

          <h2 className="text-xl font-semibold">No videos yet</h2>

          <p className="mt-1 text-sm text-base-content/60">
            Upload your first video to start using video services.
          </p>

          <Link href="/video-upload" className="btn btn-primary btn-sm mt-5">
            <Upload size={16} />
            Upload Video
          </Link>
        </div>
      ) : (
        <>
          {/* Videos */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {videos.map((video) => (
              <VideoCard
                key={video.publicId}
                video={video}
                onDownload={handleDownload}
              />
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

            <span className="px-3 font-medium">
              Page {page}
            </span>

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

export default VideosPage;