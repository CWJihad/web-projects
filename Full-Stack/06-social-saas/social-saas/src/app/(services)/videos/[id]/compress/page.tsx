"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import {
  VIDEO_PRESETS,
  buildVideoUrl,
  formatBytes,
  VideoPresetKey,
} from "@/helpers/videoPresets";

type VideoData = { id: string; title: string; publicId: string };

export default function CompressVideoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [video, setVideo] = useState<VideoData | null>(null);
  const [preset, setPreset] = useState<VideoPresetKey>("medium");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [size, setSize] = useState<number | null>(null);
  const [sizeState, setSizeState] = useState<"loading" | "ready" | "error">(
    "loading",
  );

  useEffect(() => {
    fetch(`/api/videos/${id}`)
      .then((r) =>
        r.ok ? r.json() : Promise.reject(new Error("Video not found")),
      )
      .then(setVideo)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (!video) return;
    const url = buildVideoUrl(video.publicId, preset);
    const ctrl = new AbortController();
    let cancelled = false;
    setSize(null);
    setSizeState("loading");

    (async () => {
      for (let i = 0; i < 15 && !cancelled; i++) {
        try {
          const r = await fetch(url, { method: "HEAD", signal: ctrl.signal });
          const len = r.headers.get("content-length");
          if (r.ok && len) {
            setSize(Number(len));
            setSizeState("ready");
            return;
          }
        } catch {
          if (ctrl.signal.aborted) return;
        }
        await new Promise((res) => setTimeout(res, 3000));
      }
      if (!cancelled) setSizeState("error");
    })();

    return () => {
      cancelled = true;
      ctrl.abort();
    };
  }, [video, preset]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (error || !video)
    return (
      <div className="p-6">
        <p className="text-error">{error ?? "Video not found"}</p>
        <Link href="/videos" className="btn btn-sm mt-4">
          Back to videos
        </Link>
      </div>
    );

  const previewUrl = buildVideoUrl(video.publicId, preset);
  const downloadUrl = buildVideoUrl(video.publicId, preset, {
    download: true,
    filename: video.title,
  });

  return (
    <div className="mx-auto max-w-3xl space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Compress: {video.title}</h1>
        <Link href="/videos" className="btn btn-ghost btn-sm">
          Back
        </Link>
      </div>

      <video
        key={previewUrl}
        src={previewUrl}
        controls
        className="w-full rounded-lg bg-black"
      />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {VIDEO_PRESETS.map((p) => (
          <button
            key={p.key}
            onClick={() => setPreset(p.key)}
            className={`btn ${preset === p.key ? "btn-primary" : "btn-outline"}`}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2 rounded-lg border border-base-300 p-3 text-sm">
        <span className="font-medium">Output size:</span>
        {sizeState === "loading" && (
          <>
            <span className="loading loading-spinner loading-xs" />
            <span className="opacity-70">Processing...</span>
          </>
        )}
        {sizeState === "ready" && size !== null && (
          <span>{formatBytes(size)}</span>
        )}
        {sizeState === "error" && (
          <span className="opacity-70">Size unavailable</span>
        )}
      </div>

      <a href={downloadUrl} className="btn btn-primary w-full">
        Download compressed video
      </a>
    </div>
  );
}
