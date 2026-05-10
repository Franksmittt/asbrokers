"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import {
  publishStudioPost,
  saveStudioPost,
  uploadStudioImage,
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

const SAMPLE_HTML = `<h1>Investment Strategy Update: Q2</h1>
<p>As we move into the second quarter, preserving capital while maintaining strategic market exposure is critical for long-term portfolio sustainability.</p>

[IMAGE_SLOT]

<p>Notice the historical yields mapped above. To understand how your personal principal might accumulate under current bond rates, use our functional calculator below:</p>

[CALCULATOR_SLOT]

<p>If you adjust the parameters, you will notice compounding accelerates significantly after year 5. Let's look at asset allocations:</p>

[IMAGE_SLOT]

<p>Contact the office directly to adjust your managed fund allocations.</p>`;

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

function buildPreviewDoc(html: string): string {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/>
  <style>
    *{box-sizing:border-box} body{margin:0;padding:1.5rem;background:#f8fafc;color:#0f172a;font-family:Inter,ui-sans-serif,system-ui,sans-serif;line-height:1.7}
    h1,h2,h3{color:#1A1A1A} img{max-width:100%;height:auto} .slot{margin:1.5rem 0;padding:1rem;border:2px dashed #94a3b8;border-radius:0.75rem;background:#f1f5f9;color:#475569}
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
  snippetById: Map<string, string>
): string {
  let imageIndex = 0;
  let calcIndex = 0;
  const parts = rawHtml.split(/(\[IMAGE_SLOT\]|\[CALCULATOR_SLOT\])/g);
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
  const first = initialPosts[0] ?? null;

  const [selectedId, setSelectedId] = useState<string | null>(first?.id ?? null);
  const [title, setTitle] = useState(first?.title || "Client Blog Draft");
  const [slug, setSlug] = useState(first?.slug || "client-blog-draft");
  const [excerpt, setExcerpt] = useState(first?.excerpt || "");
  const [rawHtml, setRawHtml] = useState(first?.bodyHtml || SAMPLE_HTML);
  const [slotFiles, setSlotFiles] = useState<Record<number, File | null>>({});
  const [imageUrls, setImageUrls] = useState<Record<number, string>>({});
  const [calcSelection, setCalcSelection] = useState<Record<number, string>>({});
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [banner, setBanner] = useState<string | null>(null);
  const [status, setStatus] = useState("Ready to Edit");

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

  const resolvedForPersist = useMemo(
    () => buildPersistHtml(rawHtml, imageUrls, calcSelection, snippetById),
    [rawHtml, imageUrls, calcSelection, snippetById]
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
          },
        },
        null,
        2
      ),
    [title, slug, rawHtml, imageUrls, calcSelection]
  );

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
      return;
    }
    setBanner(null);
    if (!imageUploadConfigured) {
      const localUrl = URL.createObjectURL(file);
      setImageUrls((prev) => ({ ...prev, [index]: localUrl }));
      setStatus("Previewing local images (upload not configured)");
      return;
    }
    const fd = new FormData();
    fd.set("file", file);
    const uploaded = await uploadStudioImage(fd);
    if (!uploaded.ok) {
      setBanner(uploaded.error);
      return;
    }
    const finalUrl =
      uploaded.url.startsWith("/") && typeof window !== "undefined"
        ? `${window.location.origin}${uploaded.url}`
        : uploaded.url;
    setImageUrls((prev) => ({ ...prev, [index]: finalUrl }));
    setStatus("Images mapped");
  }

  function saveOrPublish(publish: boolean) {
    startTransition(async () => {
      if (!databaseConfigured) {
        setBanner("Database not connected. Save/Publish cannot run.");
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
        metaTitle: derivedTitle,
        metaDescription: excerpt.trim() || null,
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
    <div className="min-h-screen bg-slate-50 pb-16 text-slate-800">
      <header className="flex items-center justify-between bg-[#1A1A1A] px-8 py-5 text-white shadow-md">
        <div>
          <span className="block text-xs font-bold uppercase tracking-widest text-[#00B4D8]">Broker Workspace</span>
          <h1 className="text-2xl font-semibold tracking-tight">Blog Studio Dashboard</h1>
        </div>
        <div className="flex items-center space-x-3">
          <div className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-sm">
            Status: <span className="font-medium text-[#80ED99]">{status}</span>
          </div>
          <button
            type="button"
            onClick={() => saveOrPublish(false)}
            disabled={isPending}
            className="rounded-lg bg-white px-5 py-3 text-sm font-bold text-[#1A1A1A] disabled:opacity-50"
          >
            Save Draft
          </button>
          <button
            type="button"
            onClick={() => saveOrPublish(true)}
            disabled={isPending}
            className="rounded-lg bg-[#80ED99] px-6 py-3 text-lg font-bold text-[#1A1A1A] shadow transition-all hover:bg-[#6edc87] disabled:opacity-50"
          >
            Publish Blog Post
          </button>
        </div>
      </header>

      <main className="mx-auto mt-8 grid max-w-[1600px] grid-cols-1 gap-8 px-8 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-5">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <label className="block text-lg font-bold text-[#1A1A1A]">Step 1: Paste AI Blog Code</label>
              <span className="rounded bg-slate-100 px-2 py-1 font-mono text-xs text-slate-500">
                Use tags: [IMAGE_SLOT] &amp; [CALCULATOR_SLOT]
              </span>
            </div>
            <p className="mb-4 text-sm text-slate-500">
              Paste the raw HTML from AI. AI must not include custom calculator JavaScript.
            </p>
            <div className="mb-3 grid grid-cols-1 gap-2 md:grid-cols-2">
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Post title"
                className="rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-sm"
              />
              <input
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="post-url-slug"
                className="rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 font-mono text-sm"
              />
            </div>
            <textarea
              value={rawHtml}
              onChange={(e) => setRawHtml(e.target.value)}
              rows={12}
              className="w-full rounded-lg border border-slate-300 bg-slate-50 p-4 font-mono text-sm transition-all focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00B4D8]"
              placeholder="Paste HTML here..."
            />
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 border-b border-slate-100 pb-3">
              <h2 className="text-lg font-bold text-[#1A1A1A]">Step 2: Assign Detected Media &amp; Calculators</h2>
              <p className="text-sm text-slate-500">We scanned your text. Fill required assets below.</p>
            </div>

            <div className="space-y-4">
              {imageCount === 0 && calcCount === 0 && (
                <p className="py-4 text-center text-sm italic text-slate-400">
                  No slots detected. Use tags [IMAGE_SLOT] and [CALCULATOR_SLOT].
                </p>
              )}
              {Array.from({ length: imageCount }).map((_, i) => (
                <div key={`img-slot-${i}`} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-bold text-[#1A1A1A]">
                      Image Slot #{i + 1} {i === 0 ? "(Cover Thumbnail)" : ""}
                    </span>
                    <span className="text-xs font-semibold text-[#80ED99]">
                      {imageUrls[i] ? "Image Assigned ✓" : ""}
                    </span>
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
                      className="block w-full text-sm text-slate-500 file:mr-3 file:rounded-md file:border-0 file:bg-[#1A1A1A] file:px-4 file:py-2 file:text-xs file:font-semibold file:text-white"
                    />
                    <button
                      type="button"
                      onClick={() => void uploadSlot(i)}
                      disabled={isPending || !slotFiles[i]}
                      className="rounded-md border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 disabled:opacity-40"
                    >
                      Upload
                    </button>
                  </div>
                </div>
              ))}

              {Array.from({ length: calcCount }).map((_, i) => (
                <div key={`calc-slot-${i}`} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <p className="mb-2 text-sm font-bold text-[#1A1A1A]">Calculator Slot #{i + 1}</p>
                  <select
                    value={calcSelection[i] ?? ""}
                    onChange={(e) =>
                      setCalcSelection((prev) => ({
                        ...prev,
                        [i]: e.target.value,
                      }))
                    }
                    className="w-full rounded-lg border border-slate-300 bg-white p-2.5 text-sm"
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
            </div>

            {imageUrls[0] && (
              <div className="mt-6 border-t border-slate-100 pt-6">
                <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-400">
                  Main Grid Cover Image (Auto-extracted)
                </span>
                <div className="flex items-center space-x-4 rounded-lg border border-slate-200 bg-slate-50 p-3">
                  <img src={imageUrls[0]} alt="Thumbnail" className="h-16 w-16 rounded border border-slate-300 object-cover" />
                  <div className="text-sm">
                    <p className="font-semibold text-slate-700">Will display on blog homepage roll</p>
                    <p className="max-w-[200px] truncate font-mono text-xs text-[#00B4D8]">Slot #1 image mapped</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-200 bg-slate-100 px-6 py-4">
              <span className="text-lg font-bold text-[#1A1A1A]">Step 3: Review Layout</span>
              <div className="inline-flex rounded-lg bg-slate-200 p-1">
                <button
                  type="button"
                  onClick={() => setActiveTab("preview")}
                  className={`rounded-md px-4 py-1.5 text-sm font-semibold ${
                    activeTab === "preview" ? "bg-white text-[#00B4D8] shadow-sm" : "text-slate-600"
                  }`}
                >
                  Live Reading Preview
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("code")}
                  className={`rounded-md px-4 py-1.5 text-sm font-semibold ${
                    activeTab === "code" ? "bg-white text-[#00B4D8] shadow-sm" : "text-slate-600"
                  }`}
                >
                  Backend Code Output
                </button>
              </div>
            </div>

            {activeTab === "preview" ? (
              <div className="flex-1 overflow-y-auto p-4">
                <iframe
                  title="Live reading preview"
                  sandbox="allow-same-origin allow-scripts"
                  className="h-[70vh] w-full rounded-lg border border-slate-200 bg-white"
                  srcDoc={previewSrcDoc}
                />
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto bg-slate-900 p-6 text-sm text-slate-100">
                <div className="mb-4">
                  <span className="mb-1 block text-xs font-bold uppercase tracking-widest text-[#80ED99]">
                    Supabase DB Payload:
                  </span>
                  <p className="text-xs text-slate-400">This structured data is what gets saved.</p>
                </div>
                <pre className="max-h-[70vh] overflow-x-auto rounded-lg bg-black p-4 text-xs text-[#00B4D8]">{payloadPreview}</pre>
              </div>
            )}
          </div>
        </div>
      </main>

      {banner && (
        <div className="fixed bottom-4 right-4 max-w-xl rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 shadow-lg">
          {banner}
        </div>
      )}
    </div>
  );
}

