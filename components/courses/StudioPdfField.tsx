"use client";

import { useEffect, useId, useState } from "react";

import { coursePdfProxyUrl, isPdfUpload, sanitizeCoursePdfUrl, sanitizePdfFileName } from "@/lib/courses/pdf";

type StudioPdfFieldProps = {
  defaultUrl?: string;
  defaultFileName?: string;
  inputClassName?: string;
};

/**
 * Course Studio PDF field. The file uploads straight to a private Supabase bucket
 * with a short-lived signed URL, then the lesson stores the app download link.
 */
export function StudioPdfField({
  defaultUrl = "",
  defaultFileName = "",
  inputClassName = "mt-1 w-full rounded-md border border-[#E5E5E5] bg-[#F7F6F3] px-3 py-2 text-sm text-[#1D1D1F] placeholder:text-[#A1A1AA]",
}: StudioPdfFieldProps) {
  const fileInputId = useId();
  const [url, setUrl] = useState(defaultUrl);
  const [fileName, setFileName] = useState(defaultFileName);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    setUrl(defaultUrl);
  }, [defaultUrl]);

  useEffect(() => {
    setFileName(defaultFileName);
  }, [defaultFileName]);

  async function handleUpload() {
    if (!file) {
      setMessage("Choose a PDF from your computer first.");
      return;
    }
    const safeName = sanitizePdfFileName(file.name);
    if (!isPdfUpload(file.type, safeName)) {
      setMessage("Only PDF files are supported.");
      return;
    }
    if (file.size > 20 * 1024 * 1024) {
      setMessage("PDF is too large (max 20MB).");
      return;
    }

    setUploading(true);
    setMessage("Uploading…");
    try {
      const correlationId =
        typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
      const authRes = await fetch("/api/studio/upload-pdf/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-correlation-id": correlationId,
        },
        body: JSON.stringify({
          filename: safeName,
          contentType: file.type || "application/pdf",
          fileSize: file.size,
        }),
      });

      let payload: {
        ok?: boolean;
        url?: string;
        bucket?: string;
        path?: string;
        token?: string;
        fileName?: string;
        error?: string;
      } = {};
      try {
        payload = (await authRes.json()) as typeof payload;
      } catch {
        payload = {};
      }

      if (!authRes.ok || !payload.ok || !payload.bucket || !payload.path || !payload.token) {
        const detail =
          payload.error ||
          (authRes.status === 401
            ? "Studio session expired — sign in again."
            : authRes.status === 413
              ? "PDF is too large (max 20MB)."
              : `Upload failed (HTTP ${authRes.status}).`);
        setMessage(detail);
        return;
      }

      const { createSupabaseBrowserClient } = await import("@/lib/supabase/client");
      const browserSupabase = createSupabaseBrowserClient();
      const uploaded = await browserSupabase.storage
        .from(payload.bucket)
        .uploadToSignedUrl(payload.path, payload.token, file, {
          contentType: "application/pdf",
        });
      if (uploaded.error) {
        setMessage(`Upload failed: ${uploaded.error.message}`);
        return;
      }

      setUrl(coursePdfProxyUrl(payload.bucket, payload.path));
      setFileName(sanitizePdfFileName(payload.fileName || safeName));
      setFile(null);
      setMessage("Uploaded. Save the block to keep this PDF.");
      const input = document.getElementById(fileInputId) as HTMLInputElement | null;
      if (input) input.value = "";
    } catch (error) {
      const detail = error instanceof Error && error.message ? error.message : "Upload failed unexpectedly.";
      setMessage(detail);
    } finally {
      setUploading(false);
    }
  }

  const previewHref = sanitizeCoursePdfUrl(url);

  return (
    <div className="space-y-2">
      <input type="hidden" name="url" value={url} />
      <input type="hidden" name="fileName" value={fileName} />
      <input
        value={url}
        onChange={(event) => {
          setUrl(event.target.value);
          setMessage(null);
        }}
        className={inputClassName}
        placeholder="Or paste an https link to a PDF"
        aria-label="PDF link"
      />
      <div className="flex flex-wrap items-center gap-2">
        <label htmlFor={fileInputId} className="w-full text-xs font-medium text-[#52525b]">
          PDF file
        </label>
        <input
          id={fileInputId}
          type="file"
          accept="application/pdf,.pdf"
          className="max-w-full text-xs text-[#52525b] file:mr-2 file:rounded-md file:border file:border-[#E5E5E5] file:bg-white file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-[#1D1D1F]"
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
          className="rounded-md border border-[#006B6B]/40 px-3 py-1.5 text-xs font-medium text-[#006B6B] disabled:opacity-40"
        >
          {uploading ? "Uploading…" : "Upload PDF"}
        </button>
      </div>
      <p className="text-[11px] text-[#71717a]">PDF only, up to 20MB. The client downloads it from this lesson.</p>
      {fileName ? <p className="text-[11px] text-[#52525b]">File name: {fileName}</p> : null}
      {message ? <p className="text-[11px] text-[#52525b]">{message}</p> : null}
      {previewHref ? (
        <a
          href={previewHref}
          className="inline-block text-[11px] font-medium text-[#006B6B] underline"
          target="_blank"
          rel="noreferrer"
        >
          Preview file
        </a>
      ) : null}
    </div>
  );
}
