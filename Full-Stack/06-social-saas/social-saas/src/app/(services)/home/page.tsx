"use client";
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import VideoCard from "@/components/VideoCard";
import { Video } from "@/types";

const page = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchVideos = useCallback(async () => {
    try {
      const res = await axios.get("/api/videos");
      if (Array.isArray(res.data)) {
        setVideos(res.data);
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (error) {
      console.log(error);
      setError("Failed to fetch videos");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  const handleDownload = useCallback(async (url: string, title: string) => {
    try {
      const response = await axios.get(url);

      const downloadUrl = response.data.downloadUrl;

      if (!downloadUrl) {
        throw new Error("Download URL not found");
      }

      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute("download", `${title}.mp4`);
      link.setAttribute("target", "_blank");

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Download failed:", error);
      alert("Failed to download video");
    }
  }, []);

  if (loading) {
    return <div>Loading.....</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Videos</h1>
      {videos.length === 0 ? (
        <div className="text-center text-lg text-gray-500">
          No videos available
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <VideoCard
              onDownload={handleDownload}
              key={video.publicId}
              video={video}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default page;
