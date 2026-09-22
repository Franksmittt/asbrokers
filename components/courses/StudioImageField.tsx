"use client";

import { useEffect, useId, useState } from "react";

const TARGET_UPLOAD_BYTES = 900 * 1024;
const MAX_UPLOAD_IMAGE_SIDE = 2000;

type StudioImageFieldProps = {
  name: string;
  defaultValue?: string;
  placeholder?: string;
  label?: string;
  className?: string;
  inputClassName?: string;
};

function canvasToBlob(canvas: HTMLCanvasElement, quality: number): Promise<Blob | null> {
  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob), "image/jpeg", quality);
  });
}

async function optimizeImageForUpload(file: File): Promise<File> {
  if (!file.type.toLowerCase().startsWith("image/")) return file;
  if (file.size <= TARGET_UPLOAD_BYTES) return file;

  const objectUrl = URL.createObjectURL(file);
  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const element = new Image();
      element.onload = () => resolve(element);
      element.onerror = () => reject(new Error("Image decode failed"));
      element.src = objectUrl;
    });

    const scale = Math.min(1, MAX_UPLOAD_IMAGE_SIDE / Math.max(img.naturalWidth || 1, img.naturalHeight || 1));
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round((img.naturalWidth || 1) * scale));
    canvas.height = Math.max(1, Math.round((img.naturalHeight || 1) * scale));
    const ctx = canvas.getContext("2d");
    if (!ctx) return file;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    const qualityPasses = [0.86, 0.78, 0.7, 0.62, 0.54];
    let bestBlob: Blob | null = null;
    for (const quality of qualityPasses) {
      const blob = await canvasToBlob(canvas, quality);
      if (!blob) continue;
      bestBlob = blob;
      if (blob.size <= TARGET_UPLOAD_BYTES) break;
    }
    if (!bestBlob) return file;

    const bareName = file.name.replace(/\.[^.]+$/, "");
    const optimized = new File([bestBlob], `${bareName}.jpg`, {
      type: "image/jpeg",
      lastModified: Date.now(),
    });

    if (optimized.size >= file.size && file.size <= TARGET_UPLOAD_BYTES * 2) return file;
    return optimized;
  } catch {
    return file;
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}

/**
 * Course Studio image field: paste a URL or upload from PC (same Supabase Storage path as Blog Studio).
 */
export function StudioImageField({
  name,
  defaultValue = "",
  placeholder = "Image URL or upload from your computer",
  label,
  className,
  inputClassName =
    "mt-1 w-full rounded-md border border-[#2a2a2a] bg-black px-3 py-2 text-sm text-white placeholder:text-zinc-600",
}: StudioImageFieldProps) {
  const fileInputId = useId();
  const [url, setUrl] = useState(defaultValue);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    setUrl(defaultValue);
  }, [defaultValue]);

  async function handleUpload() {
    if (!file) {
      setMessage("Choose a photo from your computer first.");
      return;
    }

    setUploading(true);
    setMessage("Uploading…");
    try {
      const uploadFile = await optimizeImageForUpload(file);
      const formData = new FormData();
      formData.append("file", uploadFile);

      const res = await fetch("/api/studio/upload", {
        method: "POST",
        body: formData,
      });

      let payload: { ok?: boolean; url?: string; error?: string } = {};
      try {
        payload = (await res.json()) as { ok?: boolean; url?: string; error?: string };
      } catch {
        payload = {};
      }

      if (!res.ok || !payload.ok || !payload.url) {
        const detail =
          payload.error ||
          (res.status === 401
            ? "Studio session expired — sign in again."
            : res.status === 413
              ? "Image is too large. Try a smaller file."
              : `Upload failed (HTTP ${res.status}).`);
        setMessage(detail);
        return;
      }

      setUrl(payload.url);
      setFile(null);
      setMessage("Uploaded. Save the form to keep this image.");
      const input = document.getElementById(fileInputId) as HTMLInputElement | null;
      if (input) input.value = "";
    } catch (error) {
      const detail = error instanceof Error && error.message ? error.message : "Upload failed unexpectedly.";
      setMessage(detail);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className={className ?? "space-y-2"}>
      {label ? <span className="block text-xs font-medium text-zinc-400">{label}</span> : null}
      <input
        name={name}
        value={url}
        onChange={(event) => {
          setUrl(event.target.value);
          setMessage(null);
        }}
        className={inputClassName}
        placeholder={placeholder}
      />
      <div className="flex flex-wrap items-center gap-2">
        <input
          id={fileInputId}
          type="file"
          accept="image/png,image/jpeg,image/jpg,image/webp"
          className="max-w-full text-xs text-zinc-400 file:mr-2 file:rounded-md file:border-0 file:bg-white/10 file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-white hover:file:bg-white/15"
          onChange={(event) => {
            const next = event.target.files?.[0] ?? null;
            setFile(next);
            setMessage(next ? `Ready: ${next.name}` : null);
          }}
        />
        <button
          type="button"
          onClick={() => void handleUpload()}
          disabled={uploading || !file}
          className="rounded-md border border-[#3ecf8e]/40 px-3 py-1.5 text-xs font-medium text-[#3ecf8e] disabled:opacity-40"
        >
          {uploading ? "Uploading…" : "Upload from PC"}
        </button>
      </div>
      {message ? <p className="text-[11px] text-zinc-500">{message}</p> : null}
      {url ? (
        // eslint-disable-next-line @next/next/no-img-element -- studio preview of arbitrary URLs / media proxy
        <img
          src={url}
          alt=""
          className="mt-1 max-h-40 rounded-md border border-[#2a2a2a] object-contain"
        />
      ) : null}
    </div>
  );
}
