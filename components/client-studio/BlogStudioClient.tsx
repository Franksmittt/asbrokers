"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import {
  getStudioUploadDiagnostics,
  publishStudioPost,
  saveStudioPost,
} from "@/app/studio/blog/actions";
import {
  CALCULATOR_CODE_SNIPPETS,
  isEmbedReadyCalculatorSnippet,
} from "@/lib/client-studio/calculator-code-pack";
import type { SerializableNotebookNote } from "@/lib/client-studio/notebook-types";

export type SerializableStudioPost = {
  id: string;
  slug: string;
  locale: "en" | "af";
  title: string;
  excerpt: string | null;
  bodyHtml: string;
  bodyHtmlPublished: string | null;
  status: string;
  metaTitle: string | null;
  metaDescription: string | null;
  heroImageUrl: string | null;
  calculatorName: string | null;
  calculatorCode: string | null;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

type Props = {
  initialPosts: SerializableStudioPost[];
  initialNotebookNotes: SerializableNotebookNote[];
  databaseConfigured: boolean;
  imageUploadConfigured: boolean;
  studioConfigured: boolean;
  allowBulkDelete: boolean;
};

const IMAGE_TOKEN = "[IMAGE_SLOT]";
const CALC_TOKEN = "[CALCULATOR_SLOT]";
const VIDEO_TOKEN = "[VIDEO_SLOT]";
const TARGET_UPLOAD_BYTES = 900 * 1024;
const MAX_UPLOAD_IMAGE_SIDE = 1600;

const SAMPLE_HTML = `<section class="space-y-6">
  <h1>Your retirement strategy in uncertain markets</h1>
  <p>Start with a clear plan. This article explains practical actions for long-term investors.</p>

  [IMAGE_SLOT]

  <h2>How to structure your capital</h2>
  <p>Use the interactive calculator below to estimate outcomes based on your own numbers.</p>

  [CALCULATOR_SLOT]

  <h2>Video explanation</h2>
  <p>Watch the short video for a breakdown of this strategy:</p>

  [VIDEO_SLOT]

  <h2>Final checklist</h2>
  <p>Use this framework and book a review to adjust your plan each quarter.</p>

  [IMAGE_SLOT]
</section>`;

function slugifyTitle(title: string): string {
  return title
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 160);
}

function normalizeAiHtml(raw: string): string {
  let next = raw.trim();
  if (next.includes("```")) {
    next = next.replace(/^```[a-zA-Z0-9-]*\s*/gm, "").replace(/```/g, "");
  }
  return next.trim();
}

function extractYoutubeId(input: string): string | null {
  const raw = input.trim();
  if (!raw) return null;
  if (/^[a-zA-Z0-9_-]{6,20}$/.test(raw)) return raw;
  try {
    const u = new URL(raw);
    if (u.hostname.includes("youtu.be")) {
      const id = u.pathname.replace("/", "");
      return /^[a-zA-Z0-9_-]{6,20}$/.test(id) ? id : null;
    }
    const id = u.searchParams.get("v");
    if (id && /^[a-zA-Z0-9_-]{6,20}$/.test(id)) return id;
    const parts = u.pathname.split("/").filter(Boolean);
    const embedIdx = parts.indexOf("embed");
    if (embedIdx >= 0 && parts[embedIdx + 1] && /^[a-zA-Z0-9_-]{6,20}$/.test(parts[embedIdx + 1])) {
      return parts[embedIdx + 1];
    }
  } catch {
    return null;
  }
  return null;
}

function canvasToBlob(canvas: HTMLCanvasElement, quality: number): Promise<Blob | null> {
  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob), "image/jpeg", quality);
  });
}

async function optimizeImageForUpload(file: File): Promise<File> {
  if (typeof window === "undefined") return file;
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

    // Keep the original only when optimization is ineffective and source is already modest.
    if (optimized.size >= file.size && file.size <= TARGET_UPLOAD_BYTES * 2) return file;
    return optimized;
  } catch {
    return file;
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}

function buildPreviewDoc(html: string): string {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/>
  <style>
    *{box-sizing:border-box} body{margin:0;padding:1.5rem;background:#f8fafc;color:#0f172a;font-family:Inter,ui-sans-serif,system-ui,sans-serif;line-height:1.7}
    h1,h2,h3{color:#1A1A1A} img{max-width:100%;height:auto} iframe{max-width:100%;border:0}
    .slot{margin:1.5rem 0;padding:1rem;border:2px dashed #94a3b8;border-radius:0.75rem;background:#f1f5f9;color:#475569}
  </style></head><body>${html}</body></html>`;
}

function countToken(content: string, token: string): number {
  const escaped = token.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return (content.match(new RegExp(escaped, "g")) ?? []).length;
}

function firstH1(content: string): string {
  const m = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  return m?.[1]?.replace(/<[^>]*>/g, "").trim() ?? "";
}

function buildPersistHtml(
  rawHtml: string,
  imageUrls: Record<number, string>,
  calculatorSelection: Record<number, string>,
  videoUrls: Record<number, string>,
  snippetById: Map<string, string>
): string {
  let imageIndex = 0;
  let calcIndex = 0;
  let videoIndex = 0;
  const parts = rawHtml.split(/(\[IMAGE_SLOT\]|\[CALCULATOR_SLOT\]|\[VIDEO_SLOT\])/g);
  return parts
    .map((part) => {
      if (part === IMAGE_TOKEN) {
        const replacement = imageUrls[imageIndex] ?? IMAGE_TOKEN;
        imageIndex += 1;
        return replacement;
      }
      if (part === CALC_TOKEN) {
        const selected = calculatorSelection[calcIndex] ?? "";
        calcIndex += 1;
        return selected ? snippetById.get(selected) ?? CALC_TOKEN : CALC_TOKEN;
      }
      if (part === VIDEO_TOKEN) {
        const selected = (videoUrls[videoIndex] ?? "").trim();
        videoIndex += 1;
        if (!selected) return VIDEO_TOKEN;
        const youtubeId = extractYoutubeId(selected);
        if (youtubeId) {
          return `<div class="my-6"><iframe src="https://www.youtube.com/embed/${youtubeId}" title="YouTube video" loading="lazy" allowfullscreen style="width:100%;min-height:360px;border:0;border-radius:12px;"></iframe></div>`;
        }
        return `<p><a href="${selected}" target="_blank" rel="noreferrer">Watch video</a></p>`;
      }
      return part;
    })
    .join("");
}

function buildPreviewHtml(persistHtml: string): string {
  return persistHtml
    .replaceAll(
      IMAGE_TOKEN,
      `<div class="slot">📷 Placeholder: Awaiting image upload for this slot.</div>`
    )
    .replaceAll(
      CALC_TOKEN,
      `<div class="slot">🧮 Placeholder: Awaiting calculator selection for this slot.</div>`
    )
    .replaceAll(
      VIDEO_TOKEN,
      `<div class="slot">🎥 Placeholder: Awaiting video link for this slot.</div>`
    );
}

export function BlogStudioClient(props: Props) {
  const {
    initialPosts,
    databaseConfigured,
    imageUploadConfigured,
    studioConfigured,
  } = props;
  void props.initialNotebookNotes;
  void props.allowBulkDelete;

  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  void initialPosts;

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [title, setTitle] = useState("Client Blog Draft");
  const [slug, setSlug] = useState("client-blog-draft");
  const [excerpt, setExcerpt] = useState("");
  const [rawHtml, setRawHtml] = useState(SAMPLE_HTML);
  const [slotFiles, setSlotFiles] = useState<Record<number, File | null>>({});
  const [imageUrls, setImageUrls] = useState<Record<number, string>>({});
  const [uploadingSlots, setUploadingSlots] = useState<Record<number, boolean>>({});
  const [slotMessages, setSlotMessages] = useState<Record<number, string>>({});
  const [uploadDebugRunning, setUploadDebugRunning] = useState(false);
  const [uploadDebugSummary, setUploadDebugSummary] = useState<string | null>(null);
  const [uploadDebugChecks, setUploadDebugChecks] = useState<string[]>([]);
  const [calcSelection, setCalcSelection] = useState<Record<number, string>>({});
  const [videoUrls, setVideoUrls] = useState<Record<number, string>>({});
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [banner, setBanner] = useState<string | null>(null);
  const [status, setStatus] = useState("Ready to Edit");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");

  const embedReadySnippets = useMemo(
    () => CALCULATOR_CODE_SNIPPETS.filter(isEmbedReadyCalculatorSnippet),
    []
  );
  const snippetById = useMemo(
    () => new Map(embedReadySnippets.map((s) => [s.id, s.code])),
    [embedReadySnippets]
  );

  const imageCount = useMemo(() => countToken(rawHtml, IMAGE_TOKEN), [rawHtml]);
  const calcCount = useMemo(() => countToken(rawHtml, CALC_TOKEN), [rawHtml]);
  const videoCount = useMemo(() => countToken(rawHtml, VIDEO_TOKEN), [rawHtml]);
  const missingImages = useMemo(
    () => Array.from({ length: imageCount }).filter((_, i) => !imageUrls[i]).length,
    [imageCount, imageUrls]
  );
  const missingCalcs = useMemo(
    () => Array.from({ length: calcCount }).filter((_, i) => !(calcSelection[i] ?? "").trim()).length,
    [calcCount, calcSelection]
  );
  const missingVideos = useMemo(
    () => Array.from({ length: videoCount }).filter((_, i) => !(videoUrls[i] ?? "").trim()).length,
    [videoCount, videoUrls]
  );
  const postDetailsReady = title.trim().length > 0 && slug.trim().length > 0 && excerpt.trim().length > 0;
  const step2Ready = missingImages === 0;
  const step3Ready = missingCalcs === 0 && missingVideos === 0;
  const canPublish = postDetailsReady && step2Ready && step3Ready;

  const resolvedForPersist = useMemo(
    () => buildPersistHtml(rawHtml, imageUrls, calcSelection, videoUrls, snippetById),
    [rawHtml, imageUrls, calcSelection, videoUrls, snippetById]
  );
  const previewHtml = useMemo(() => buildPreviewHtml(resolvedForPersist), [resolvedForPersist]);
  const previewSrcDoc = useMemo(() => buildPreviewDoc(previewHtml), [previewHtml]);

  const payloadPreview = useMemo(
    () =>
      JSON.stringify(
        {
          title: title.trim() || firstH1(rawHtml) || "Untitled",
          slug: slug.trim() || slugifyTitle(title || firstH1(rawHtml) || "post"),
          raw_content: rawHtml,
          thumbnail_url: imageUrls[0] ?? null,
          metadata: {
            images: imageUrls,
            calculators: calcSelection,
            videos: videoUrls,
          },
        },
        null,
        2
      ),
    [title, slug, rawHtml, imageUrls, calcSelection, videoUrls]
  );
  const aiInstructionsText = useMemo(() => {
    const images = imageCount || 2;
    const calcs = calcCount || 1;
    const videos = videoCount || 1;
    return `Use the brand guide below. Write a blog post in clean semantic HTML only.
Do NOT include custom JavaScript or calculator code.
Use EXACT placeholders:
- ${IMAGE_TOKEN} exactly ${images} time(s)
- ${CALC_TOKEN} exactly ${calcs} time(s)
- ${VIDEO_TOKEN} exactly ${videos} time(s)
Do not output full <html> document, only article body HTML.`;
  }, [imageCount, calcCount, videoCount]);

  if (!studioConfigured) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <h1 className="mb-3 text-xl font-semibold text-white">Insights studio is off</h1>
        <p className="text-sm text-zinc-400">Set CLIENT_STUDIO_PASSWORD on the server and reload this page.</p>
      </div>
    );
  }

  async function uploadSlot(index: number) {
    const file = slotFiles[index];
    if (!file) {
      setBanner(`Select an image for slot ${index + 1} first.`);
      setSlotMessages((prev) => ({ ...prev, [index]: "Select a file first." }));
      return;
    }
    setBanner(null);
    setUploadingSlots((prev) => ({ ...prev, [index]: true }));
    setSlotMessages((prev) => ({ ...prev, [index]: "Uploading..." }));
    try {
      const uploadFile = await optimizeImageForUpload(file);
      if (!imageUploadConfigured) {
        const localUrl = URL.createObjectURL(uploadFile);
        setImageUrls((prev) => ({ ...prev, [index]: localUrl }));
        setStatus("Previewing local images (upload not configured)");
        setSlotMessages((prev) => ({ ...prev, [index]: "Preview image mapped locally." }));
        return;
      }
      const fd = new FormData();
      fd.set("file", uploadFile, uploadFile.name);
      const res = await fetch("/api/studio/upload", {
        method: "POST",
        body: fd,
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
          (res.status === 413
            ? "Image is still too large after optimization. Use a smaller file and retry."
            : `Upload request failed (HTTP ${res.status}). Check server logs and Supabase config.`);
        setBanner(detail);
        setSlotMessages((prev) => ({ ...prev, [index]: detail }));
        return;
      }
      const finalUrl =
        payload.url.startsWith("/") && typeof window !== "undefined"
          ? `${window.location.origin}${payload.url}`
          : payload.url;
      setImageUrls((prev) => ({ ...prev, [index]: finalUrl }));
      setSlotFiles((prev) => ({ ...prev, [index]: null }));
      setStatus("Images mapped");
      setSlotMessages((prev) => ({ ...prev, [index]: "Upload successful." }));
      setBanner(`Image slot ${index + 1} uploaded successfully.`);
    } catch (e) {
      const message = e instanceof Error && e.message ? `Upload failed: ${e.message}` : "Upload failed unexpectedly. Please retry.";
      setSlotMessages((prev) => ({ ...prev, [index]: message }));
      setBanner(message);
    } finally {
      setUploadingSlots((prev) => ({ ...prev, [index]: false }));
    }
  }

  async function copyAiInstructions() {
    try {
      await navigator.clipboard.writeText(aiInstructionsText);
      setBanner("AI instructions copied. Paste them with your brand guide into AI.");
    } catch {
      setBanner("Clipboard blocked. Copy the AI instructions manually from the box.");
    }
  }

  function runUploadDebug() {
    setUploadDebugRunning(true);
    setUploadDebugSummary(null);
    setUploadDebugChecks([]);
    startTransition(async () => {
      const result = await getStudioUploadDiagnostics();
      setUploadDebugSummary(result.summary);
      setUploadDebugChecks(result.checks);
      setBanner(result.summary);
      setUploadDebugRunning(false);
    });
  }

  function saveOrPublish(publish: boolean) {
    startTransition(async () => {
      if (!databaseConfigured) {
        setBanner("Database not connected. Save/Publish cannot run.");
        return;
      }
      if (publish && !canPublish) {
        setBanner(
          "Complete all steps first: upload all images, choose calculator/video for each slot, and fill title/slug/excerpt."
        );
        return;
      }
      const derivedTitle = title.trim() || firstH1(rawHtml) || "Untitled Post";
      const derivedSlug = slug.trim() || slugifyTitle(derivedTitle);
      const normalized = normalizeAiHtml(resolvedForPersist);
      const hero = imageUrls[0] ?? null;
      const saveRes = await saveStudioPost(selectedId, {
        title: derivedTitle,
        slug: derivedSlug,
        locale: "en",
        excerpt: excerpt.trim() || null,
        bodyHtml: normalized,
        heroImageUrl: hero,
        metaTitle: metaTitle.trim() || derivedTitle,
        metaDescription: metaDescription.trim() || excerpt.trim() || null,
        calculatorName: null,
        calculatorCode: null,
      });
      if (!saveRes.ok) {
        setBanner(saveRes.error);
        return;
      }
      setSelectedId(saveRes.id);
      setTitle(derivedTitle);
      setSlug(derivedSlug);
      if (!publish) {
        setStatus("Draft saved");
        setBanner("Draft saved successfully.");
        router.refresh();
        return;
      }
      const pub = await publishStudioPost(saveRes.id);
      if (!pub.ok) {
        setBanner(pub.error);
        return;
      }
      setStatus("Published");
      setBanner("Post published successfully.");
      router.refresh();
    });
  }

  return (
    <div className="min-h-screen bg-[#0a0a0c] pb-16 text-zinc-100">
      <header className="flex items-center justify-between border-b border-white/10 bg-[#111115] px-8 py-5 text-white shadow-md">
        <div>
          <span className="block text-xs font-bold uppercase tracking-widest text-teal-300">Broker Workspace</span>
          <h1 className="text-2xl font-semibold tracking-tight">Blog Studio Dashboard</h1>
        </div>
        <div className="flex items-center space-x-3">
          <div className="rounded-lg border border-white/10 bg-black/30 px-4 py-2 text-sm text-zinc-300">
            Status: <span className="font-medium text-emerald-300">{status}</span>
          </div>
          <button
            type="button"
            onClick={() => saveOrPublish(false)}
            disabled={isPending}
            className="rounded-lg border border-white/20 bg-white px-5 py-3 text-sm font-bold text-black disabled:opacity-50"
          >
            Save Draft
          </button>
          <button
            type="button"
            onClick={() => saveOrPublish(true)}
            disabled={isPending || !canPublish}
            className="rounded-lg bg-teal-600 px-6 py-3 text-lg font-bold text-white shadow transition-all hover:bg-teal-500 disabled:opacity-50"
          >
            Publish Blog Post
          </button>
        </div>
      </header>

      <main className="mx-auto mt-8 grid max-w-[1600px] grid-cols-1 gap-8 px-8 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-5">
          <div className="rounded-xl border border-white/10 bg-[#121214] p-6 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <label className="block text-lg font-bold text-white">Step 1: Paste AI Blog Code</label>
              <span className="rounded bg-black/40 px-2 py-1 font-mono text-xs text-zinc-400">
                Use tags: [IMAGE_SLOT] [CALCULATOR_SLOT] [VIDEO_SLOT]
              </span>
            </div>
            <p className="mb-2 text-sm text-zinc-400">
              Paste raw HTML from AI. Keep placeholders only. Do not paste calculator scripts manually.
            </p>
            <textarea
              value={rawHtml}
              onChange={(e) => setRawHtml(e.target.value)}
              rows={11}
              className="w-full rounded-lg border border-white/10 bg-black/40 p-4 font-mono text-sm text-teal-100 transition-all focus:bg-black/55 focus:outline-none focus:ring-2 focus:ring-teal-500/40"
              placeholder="Paste HTML here..."
            />
          </div>

          <div className="rounded-xl border border-white/10 bg-[#121214] p-6 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg font-bold text-white">Step 2: Upload Images</h2>
              <span className="text-xs font-semibold text-zinc-400">{imageCount - missingImages}/{imageCount} mapped</span>
            </div>
            <div className="mb-3 rounded-lg border border-white/10 bg-black/25 p-3">
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs text-zinc-400">
                  If uploads fail, run diagnostics to verify session, Supabase keys, and bucket access.
                </p>
                <button
                  type="button"
                  onClick={runUploadDebug}
                  disabled={isPending || uploadDebugRunning}
                  className="rounded-md border border-white/20 bg-white/5 px-3 py-1.5 text-xs font-semibold text-zinc-200 disabled:opacity-40"
                >
                  {uploadDebugRunning ? "Running..." : "Run upload debug"}
                </button>
              </div>
              {uploadDebugSummary && (
                <p className="mt-2 text-xs text-amber-200/90">{uploadDebugSummary}</p>
              )}
              {uploadDebugChecks.length > 0 && (
                <ul className="mt-2 list-disc space-y-1 pl-4 text-[11px] text-zinc-400">
                  {uploadDebugChecks.map((line, idx) => (
                    <li key={`dbg-${idx}`}>{line}</li>
                  ))}
                </ul>
              )}
            </div>
            {Array.from({ length: imageCount }).map((_, i) => (
              <div key={`img-slot-${i}`} className="mb-3 rounded-lg border border-white/10 bg-black/30 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-bold text-zinc-100">
                    Image Slot #{i + 1} {i === 0 ? "(Cover Thumbnail)" : ""}
                  </span>
                  <span className="text-xs font-semibold text-emerald-300">{imageUrls[i] ? "Assigned ✓" : "Pending"}</span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setSlotFiles((prev) => ({
                        ...prev,
                        [i]: (e.target.files?.[0] as File | undefined) ?? null,
                      }))
                    }
                    className="block w-full text-sm text-zinc-400 file:mr-3 file:rounded-md file:border-0 file:bg-zinc-900 file:px-4 file:py-2 file:text-xs file:font-semibold file:text-white"
                  />
                  <button
                    type="button"
                    onClick={() => void uploadSlot(i)}
                    disabled={isPending || !slotFiles[i] || Boolean(uploadingSlots[i])}
                    className="rounded-md border border-white/20 bg-white/5 px-3 py-2 text-xs font-semibold text-zinc-200 disabled:opacity-40"
                  >
                    {uploadingSlots[i] ? "Uploading..." : "Upload"}
                  </button>
                </div>
                {slotMessages[i] && (
                  <p className="mt-2 text-[11px] text-zinc-400">{slotMessages[i]}</p>
                )}
              </div>
            ))}
            {imageCount === 0 && <p className="text-sm italic text-zinc-500">No [IMAGE_SLOT] placeholders detected.</p>}
          </div>

          <div className="rounded-xl border border-white/10 bg-[#121214] p-6 shadow-sm">
            <h2 className="mb-3 text-lg font-bold text-white">Step 3: Select Calculators & Videos</h2>
            <div className="space-y-3">
              {Array.from({ length: calcCount }).map((_, i) => (
                <div key={`calc-slot-${i}`} className="rounded-lg border border-white/10 bg-black/30 p-4">
                  <p className="mb-2 text-sm font-bold text-zinc-100">Calculator Slot #{i + 1}</p>
                  <select
                    value={calcSelection[i] ?? ""}
                    onChange={(e) =>
                      setCalcSelection((prev) => ({
                        ...prev,
                        [i]: e.target.value,
                      }))
                    }
                    className="w-full rounded-lg border border-white/10 bg-black/40 p-2.5 text-sm text-zinc-100"
                  >
                    <option value="">-- Choose Calculator Component --</option>
                    {embedReadySnippets.map((snippet) => (
                      <option key={snippet.id} value={snippet.id}>
                        {snippet.title}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
              {Array.from({ length: videoCount }).map((_, i) => (
                <div key={`video-slot-${i}`} className="rounded-lg border border-white/10 bg-black/30 p-4">
                  <p className="mb-2 text-sm font-bold text-zinc-100">Video Slot #{i + 1}</p>
                  <input
                    value={videoUrls[i] ?? ""}
                    onChange={(e) =>
                      setVideoUrls((prev) => ({
                        ...prev,
                        [i]: e.target.value,
                      }))
                    }
                    placeholder="Paste YouTube URL or video ID"
                    className="w-full rounded-lg border border-white/10 bg-black/40 p-2.5 text-sm text-zinc-100"
                  />
                </div>
              ))}
              {calcCount === 0 && videoCount === 0 && (
                <p className="text-sm italic text-zinc-500">
                  No [CALCULATOR_SLOT] or [VIDEO_SLOT] placeholders detected.
                </p>
              )}
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#121214] p-6 shadow-sm">
            <h2 className="mb-3 text-lg font-bold text-white">Step 4: Post Details</h2>
            <div className="grid grid-cols-1 gap-2">
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title (required)"
                className="rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-zinc-100"
              />
              <input
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="Slug (required)"
                className="rounded-lg border border-white/10 bg-black/40 px-3 py-2 font-mono text-sm text-zinc-100"
              />
              <input
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Excerpt (required)"
                className="rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-zinc-100"
              />
              <input
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                placeholder="SEO title (optional)"
                className="rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-zinc-100"
              />
              <input
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                placeholder="SEO description (optional)"
                className="rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-zinc-100"
              />
            </div>
            {imageUrls[0] && (
              <div className="mt-3 flex items-center space-x-3 rounded-lg border border-white/10 bg-black/30 p-3">
                <img src={imageUrls[0]} alt="Thumbnail" className="h-12 w-12 rounded border border-white/10 object-cover" />
                <p className="text-xs text-zinc-400">Cover thumbnail auto-mapped from Image Slot #1.</p>
              </div>
            )}
          </div>

          <div className="rounded-xl border border-white/10 bg-[#121214] p-6 shadow-sm">
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-lg font-bold text-white">AI Instructions</h2>
              <button
                type="button"
                onClick={() => void copyAiInstructions()}
                className="rounded-md border border-white/20 bg-white/5 px-3 py-1.5 text-xs font-semibold text-zinc-200"
              >
                Copy
              </button>
            </div>
            <pre className="max-h-40 overflow-y-auto whitespace-pre-wrap rounded-lg bg-black/50 p-3 font-mono text-xs text-emerald-300">
              {aiInstructionsText}
            </pre>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-[#121214] shadow-sm">
            <div className="flex items-center justify-between border-b border-white/10 bg-black/30 px-6 py-4">
              <span className="text-lg font-bold text-white">Step 5: Review &amp; Publish</span>
              <div className="inline-flex rounded-lg bg-black/40 p-1">
                <button
                  type="button"
                  onClick={() => setActiveTab("preview")}
                  className={`rounded-md px-4 py-1.5 text-sm font-semibold ${
                    activeTab === "preview" ? "bg-white text-teal-600 shadow-sm" : "text-zinc-400"
                  }`}
                >
                  Live Reading Preview
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("code")}
                  className={`rounded-md px-4 py-1.5 text-sm font-semibold ${
                    activeTab === "code" ? "bg-white text-teal-600 shadow-sm" : "text-zinc-400"
                  }`}
                >
                  Backend Code Output
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 border-b border-white/10 bg-black/20 px-6 py-3 text-xs">
              <p className={step2Ready ? "text-emerald-300" : "text-amber-300"}>
                {step2Ready ? "PASS" : "FIX"} Images assigned ({imageCount - missingImages}/{imageCount})
              </p>
              <p className={step3Ready ? "text-emerald-300" : "text-amber-300"}>
                {step3Ready ? "PASS" : "FIX"} Calculators/videos assigned
              </p>
              <p className={postDetailsReady ? "text-emerald-300" : "text-amber-300"}>
                {postDetailsReady ? "PASS" : "FIX"} Title, slug, excerpt completed
              </p>
              <p className={canPublish ? "text-emerald-300" : "text-amber-300"}>
                {canPublish ? "READY" : "NOT READY"} for publish
              </p>
            </div>

            {activeTab === "preview" ? (
              <div className="flex-1 overflow-y-auto p-4">
                <iframe
                  title="Live reading preview"
                  sandbox="allow-same-origin allow-scripts"
                  className="h-[70vh] w-full rounded-lg border border-white/10 bg-white"
                  srcDoc={previewSrcDoc}
                />
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto bg-black/40 p-6 text-sm text-zinc-100">
                <div className="mb-4">
                  <span className="mb-1 block text-xs font-bold uppercase tracking-widest text-emerald-300">
                    Supabase DB Payload:
                  </span>
                  <p className="text-xs text-zinc-400">This structured data is what gets saved.</p>
                </div>
                <pre className="max-h-[70vh] overflow-x-auto rounded-lg bg-black/60 p-4 text-xs text-teal-300">{payloadPreview}</pre>
              </div>
            )}
          </div>
        </div>
      </main>

      {banner && (
        <div className="fixed bottom-4 right-4 max-w-xl rounded-lg border border-white/10 bg-[#121214] px-4 py-3 text-sm text-zinc-200 shadow-lg">
          {banner}
        </div>
      )}
    </div>
  );
}

