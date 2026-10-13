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

export const SUBTITLE_LANGUAGES = [
  { code: "en-US", label: "English", font: "arial", burnIn: true, track: "en" },
  { code: "bn-BD", label: "বাংলা (Bangla)", font: "arial", burnIn: false, track: "bn" },
] as const;

export type SubtitleLang = (typeof SUBTITLE_LANGUAGES)[number]["code"];

export function buildSubtitledVideoUrl(
  publicId: string,
  presetKey: VideoPresetKey,
  language: SubtitleLang,
  opts?: { download?: boolean; filename?: string, rev?: number }
) {
  const p = VIDEO_PRESETS.find((x) => x.key === presetKey)!;
  const lang = SUBTITLE_LANGUAGES.find((l) => l.code === language)!;
  const base = [opts?.rev ? `$rev_${opts.rev}` : null, `q_${p.quality}`, "vc_auto", p.height ? `h_${p.height},c_limit` : null]
    .filter(Boolean)
    .join(",");
  const subId = `${publicId}.${language}.srt`.replace(/\//g, ":");
  const fontSize = Math.round((p.height ?? 720) * 0.035)
  const layer = `l_subtitles:${lang.font}_${fontSize}:${subId},co_white,b_rgb:00000090/fl_layer_apply,g_south,y_30`;
  const attach = opts?.download
    ? `/fl_attachment:${encodeURIComponent((opts.filename || "video").replace(/[^\w\-]+/g, "_"))}`
    : "";
  return `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/video/upload/${base}/${layer}${attach}/${publicId}.mp4`;
}

export function formatBytes(bytes: number) {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  if (bytes < 1024 ** 3) return `${(bytes / 1024 ** 2).toFixed(1)} MB`;
  return `${(bytes / 1024 ** 3).toFixed(2)} GB`;
}

export function srtToVtt(srt: string) {
  return (
    "WEBVTT\n\n" +
    srt.replace(/\r/g, "").replace(/(\d{2}:\d{2}:\d{2}),(\d{3})/g, "$1.$2")
  );
}