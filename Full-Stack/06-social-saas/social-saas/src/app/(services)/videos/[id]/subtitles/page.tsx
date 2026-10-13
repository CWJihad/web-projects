"use client";

import { useEffect, useRef, useState, use } from "react";
import Link from "next/link";
import {
  VIDEO_PRESETS,
  SUBTITLE_LANGUAGES,
  buildVideoUrl,
  buildSubtitledVideoUrl,
  VideoPresetKey,
  SubtitleLang,
  srtToVtt,
} from "@/helpers/videoPresets";

type VideoData = { id: string; title: string; publicId: string };
type Status = "idle" | "generating" | "ready";

export default function SubtitlesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [video, setVideo] = useState<VideoData | null>(null);
  const [language, setLanguage] = useState<SubtitleLang>("bn-BD");
  const [preset, setPreset] = useState<VideoPresetKey>("medium");
  const [status, setStatus] = useState<Status>("idle");
  const [srt, setSrt] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [rev, setRev] = useState(0);
  const [files, setFiles] = useState({ vtt: "", srt: "" });

  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopPolling = () => {
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
  };

  const checkSubtitles = async (lang: SubtitleLang = language) => {
    const r = await fetch(`/api/videos/${id}/subtitles?language=${lang}`, {
      cache: "no-store",
    });
    if (!r.ok) return false;
    const data = await r.json();
    if (data.ready) {
      setSrt(data.srt);
      setRev(data.rev ?? 0);
      setStatus("ready");
      return true;
    }
    return false;
  };

  useEffect(() => {
    (async () => {
      try {
        const r = await fetch(`/api/videos/${id}`);
        if (!r.ok) throw new Error("Video not found");
        setVideo(await r.json());
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    })();
    return stopPolling;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (!video) return;
    stopPolling();
    setSrt("");
    setStatus("idle");
    checkSubtitles(language);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [video, language]);

  const generate = async () => {
    setError(null);
    setStatus("generating");
    const r = await fetch(`/api/videos/${id}/subtitles`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ language }),
    });
    if (!r.ok) {
      setError((await r.json()).error ?? "Failed");
      setStatus("idle");
      return;
    }
    let tries = 0;
    stopPolling();
    timer.current = setInterval(async () => {
      tries++;
      if (await checkSubtitles(language)) stopPolling();
      else if (tries > 60) {
        stopPolling();
        setStatus("idle");
        setError("Transcription is taking too long. Try again later.");
      }
    }, 5000);
  };

  const save = async () => {
    setSaving(true);
    setError(null);
    const r = await fetch(`/api/videos/${id}/subtitles`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ srt, language }),
    });
    const data = await r.json();
    if (!r.ok) setError(data.error ?? "Failed to save");
    else setRev(data.rev);
    setSaving(false);
  };

  useEffect(() => {
    if (!srt) {
      setFiles({ vtt: "", srt: "" });
      return;
    }
    const v = URL.createObjectURL(
      new Blob([srtToVtt(srt)], { type: "text/vtt" }),
    );
    const s = URL.createObjectURL(new Blob([srt], { type: "text/plain" }));
    setFiles({ vtt: v, srt: s });
    return () => {
      URL.revokeObjectURL(v);
      URL.revokeObjectURL(s);
    };
  }, [srt]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (!video)
    return (
      <div className="p-6">
        <p className="text-error">{error ?? "Video not found"}</p>
        <Link href="/videos" className="btn btn-sm mt-4">
          Back to videos
        </Link>
      </div>
    );

  const withUrl = buildSubtitledVideoUrl(video.publicId, preset, language, {
    download: true,
    filename: `${video.title}_subtitled`,
    rev,
  });
  const withoutUrl = buildVideoUrl(video.publicId, preset, {
    download: true,
    filename: video.title,
  });
  const previewUrl = buildSubtitledVideoUrl(video.publicId, preset, language, {
    rev,
  });

  const lang = SUBTITLE_LANGUAGES.find((l) => l.code === language)!;
  const plainUrl = buildVideoUrl(video.publicId, preset);

  return (
    <div className="mx-auto max-w-3xl space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Subtitles: {video.title}</h1>
        <Link href="/videos" className="btn btn-ghost btn-sm">
          Back
        </Link>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="flex flex-wrap items-end gap-3">
        <label className="form-control">
          <span className="label-text mb-1">Language</span>
          <select
            className="select select-bordered"
            value={language}
            onChange={(e) => setLanguage(e.target.value as SubtitleLang)}
            disabled={status === "generating"}
          >
            {SUBTITLE_LANGUAGES.map((l) => (
              <option key={l.code} value={l.code}>
                {l.label}
              </option>
            ))}
          </select>
        </label>
        <button
          className="btn btn-primary"
          onClick={generate}
          disabled={status === "generating"}
        >
          {status === "generating"
            ? "Generating..."
            : status === "ready"
              ? "Regenerate"
              : "Generate subtitles"}
        </button>
      </div>

      {status === "generating" && (
        <div className="flex items-center gap-2">
          <span className="loading loading-spinner" /> Transcribing, this can
          take a few minutes...
        </div>
      )}

      {status === "ready" && (
        <>
          {lang.burnIn ? (
            <video
              key={previewUrl}
              src={previewUrl}
              controls
              className="w-full rounded-lg bg-black"
            />
          ) : (
            <video
              src={plainUrl}
              controls
              className="w-full rounded-lg bg-black"
            >
              {files.vtt && (
                <track
                  key={files.vtt}
                  kind="subtitles"
                  srcLang={lang.track}
                  label={lang.label}
                  src={files.vtt}
                  default
                />
              )}
            </video>
          )}

          <div>
            <span className="label-text mb-1 block">Edit subtitles (SRT)</span>
            <textarea
              className="textarea textarea-bordered h-64 w-full font-mono text-sm"
              value={srt}
              onChange={(e) => setSrt(e.target.value)}
            />
            <button
              className="btn btn-outline mt-2"
              onClick={save}
              disabled={saving}
            >
              {saving ? "Saving..." : "Save changes"}
            </button>
          </div>

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

          {!lang.burnIn && (
            <p className="text-sm opacity-70">
              Bangla subtitles are delivered as a separate file (burned-in
              Bangla isn't supported).
            </p>
          )}
          <div className="grid gap-3 sm:grid-cols-2">
            {lang.burnIn && (
              <a href={withUrl} className="btn btn-primary">
                Download with subtitles
              </a>
            )}
            <a
              href={withoutUrl}
              className={`btn ${lang.burnIn ? "btn-outline" : "btn-primary"}`}
            >
              {lang.burnIn ? "Download without subtitles" : "Download video"}
            </a>
            {!lang.burnIn && files.srt && (
              <>
                <a
                  href={files.srt}
                  download={`${video.title}.${lang.code}.srt`}
                  className="btn btn-outline"
                >
                  Download subtitles (.srt)
                </a>
                <a
                  href={files.vtt}
                  download={`${video.title}.${lang.code}.vtt`}
                  className="btn btn-outline"
                >
                  Download subtitles (.vtt)
                </a>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
