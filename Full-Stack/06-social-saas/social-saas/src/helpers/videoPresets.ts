export const VIDEO_PRESETS = [
  { key: "low", label: "Low (smallest)", quality: "auto:low", height: 480 },
  { key: "medium", label: "Medium", quality: "auto:good", height: 720 },
  { key: "high", label: "High", quality: "auto:best", height: 1080 },
  { key: "original", label: "Original size, optimized", quality: "auto", height: null },
] as const;

export type VideoPresetKey = (typeof VIDEO_PRESETS)[number]["key"];

export function buildVideoUrl(
  publicId: string,
  presetKey: VideoPresetKey,
  opts?: { download?: boolean; filename?: string }
) {
  const p = VIDEO_PRESETS.find((x) => x.key === presetKey)!;
  const t = [
    `q_${p.quality}`,
    "vc_auto",
    p.height ? `h_${p.height},c_limit` : null,
    opts?.download
      ? `fl_attachment:${encodeURIComponent((opts.filename || "video").replace(/[^\w\-]+/g, "_"))}`
      : null,
  ]
    .filter(Boolean)
    .join(",");
  return `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/video/upload/${t}/${publicId}.mp4`;
}