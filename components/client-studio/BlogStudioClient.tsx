"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState, useTransition } from "react";

import {
  deleteAllStudioPosts,
  deleteStudioPost,
  publishStudioPost,
  saveStudioPost,
  sanitizeStudioHtmlPreview,
  unpublishStudioPost,
  uploadStudioImage,
} from "@/app/studio/blog/actions";
import { BLOG_BRAND_GUIDE_TEXT } from "@/lib/client-studio/brand-guide-content";
import { StudioNotebookModal } from "@/components/client-studio/StudioNotebookModal";
import {
  CALCULATOR_CODE_SNIPPETS,
  getCalculatorCodePackText,
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
  calculatorName: string | null;
  calculatorCode: string | null;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

function slugifyTitle(title: string): string {
  return title
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 160);
}

function formatShort(iso: string) {
  return new Date(iso).toLocaleString("en-ZA", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function buildPreviewDoc(html: string) {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><style>
    *,*::before,*::after{box-sizing:border-box;}
    body{margin:0;padding:1.25rem;font-family:ui-sans-serif,system-ui,sans-serif;background:#0a0a0c;color:#e4e4e7;line-height:1.65;font-size:15px;overflow-wrap:anywhere;word-break:break-word;}
    a{color:#2dd4bf;}
    img{max-width:100%;height:auto;}
    pre{overflow-x:auto;max-width:100%;}
  </style></head><body>${html}</body></html>`;
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

function normalizeAiHtml(raw: string): string {
  let next = raw.trim();
  if (next.includes("```")) {
    next = next.replace(/^```[a-zA-Z0-9-]*\s*/gm, "").replace(/```/g, "");
  }
  next = next
    .replace(/^\s*Blog code\s*$/gim, "")
    .replace(/^\s*Contact photo\s*$/gim, "")
    .replace(/^\s*Details Headers Plain text\s*$/gim, "")
    .replace(/^\s*From .* on \d{4}-\d{2}-\d{2}.*$/gim, "");
  return next.trim();
}

const SLUG_OK = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const IMAGE_PLACEHOLDER = "YOUR_IMAGE_URL_HERE";
const AUTHOR_OPTIONS = ["Albert Schuurman"];

type Props = {
  initialPosts: SerializableStudioPost[];
  initialNotebookNotes: SerializableNotebookNote[];
  databaseConfigured: boolean;
  studioConfigured: boolean;
};

type HealthCheck = {
  id: string;
  label: string;
  ok: boolean;
  hint?: string;
};

export function BlogStudioClient({
  initialPosts,
  initialNotebookNotes,
  databaseConfigured,
  studioConfigured,
}: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [posts, setPosts] = useState(initialPosts);
  const feedKey = useMemo(() => initialPosts.map((p) => `${p.id}:${p.updatedAt}`).join("|"), [initialPosts]);

  const [selectedId, setSelectedId] = useState<string | null>(initialPosts[0]?.id ?? null);
  const [title, setTitle] = useState(initialPosts[0]?.title ?? "");
  const [slug, setSlug] = useState(initialPosts[0]?.slug ?? "");
  const [locale, setLocale] = useState<"en" | "af">((initialPosts[0]?.locale as "en" | "af") ?? "en");
  const [excerpt, setExcerpt] = useState(initialPosts[0]?.excerpt ?? "");
  const [metaTitle, setMetaTitle] = useState(initialPosts[0]?.metaTitle ?? "");
  const [metaDescription, setMetaDescription] = useState(initialPosts[0]?.metaDescription ?? "");
  const [calculatorName, setCalculatorName] = useState(initialPosts[0]?.calculatorName ?? "");
  const [calculatorCode, setCalculatorCode] = useState(initialPosts[0]?.calculatorCode ?? "");
  const [bodyHtml, setBodyHtml] = useState(initialPosts[0]?.bodyHtml ?? "");
  const [banner, setBanner] = useState<string | null>(null);
  const [showBrandGuide, setShowBrandGuide] = useState(false);
  const [showCalculatorLibrary, setShowCalculatorLibrary] = useState(false);
  const [showNotebook, setShowNotebook] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [activePanel, setActivePanel] = useState<null | "setup" | "html" | "assist" | "publish">(null);
  const [slugTouched, setSlugTouched] = useState(Boolean(initialPosts[0]));
  const [uploadFiles, setUploadFiles] = useState<File[]>([]);
  const [youtubeInput, setYoutubeInput] = useState("");
  const [previewMode, setPreviewMode] = useState<"raw" | "published">("published");
  const [publishedPreviewHtml, setPublishedPreviewHtml] = useState<string | null>(null);
  const [lastUploadedUrls, setLastUploadedUrls] = useState<string[]>([]);
  const [authorName, setAuthorName] = useState(AUTHOR_OPTIONS[0]);
  const [listQuery, setListQuery] = useState("");
  const [listFilter, setListFilter] = useState<"all" | "draft" | "published">("all");
  const [listSort, setListSort] = useState<"updated_desc" | "updated_asc" | "title_asc">("updated_desc");

  const selected = posts.find((p) => p.id === selectedId) ?? null;
  const imagePlaceholderCount = useMemo(
    () => (bodyHtml.match(new RegExp(IMAGE_PLACEHOLDER, "g")) ?? []).length,
    [bodyHtml]
  );
  const markdownFenceCount = useMemo(() => (bodyHtml.match(/```/g) ?? []).length, [bodyHtml]);
  const unresolvedYoutubePlaceholder = bodyHtml.includes("YOUR_VIDEO_ID");
  const unresolvedImagePlaceholders = imagePlaceholderCount > 0;
  const slugValid = SLUG_OK.test(slug.trim());
  const basicsOk = title.trim().length > 0 && slug.trim().length > 0 && slugValid;
  const hasSectionTag = /<section[\s>]/i.test(bodyHtml);
  const hasTitleInHtml = /<h1[\s>]/i.test(bodyHtml);
  const checklist = useMemo<HealthCheck[]>(
    () => [
      {
        id: "title",
        label: "Title and slug are filled correctly",
        ok: basicsOk,
        hint: "Slug must be lowercase, numbers and hyphens only.",
      },
      {
        id: "clean",
        label: "No markdown code fences in article HTML",
        ok: markdownFenceCount === 0,
        hint: "Use Clean pasted HTML if AI output includes ``` blocks.",
      },
      {
        id: "images",
        label: "No unresolved image placeholders",
        ok: !unresolvedImagePlaceholders,
        hint: `Replace every ${IMAGE_PLACEHOLDER} entry before publishing.`,
      },
      {
        id: "video",
        label: "No unresolved YouTube placeholder",
        ok: !unresolvedYoutubePlaceholder,
        hint: "Use the YouTube helper to insert a video ID or URL.",
      },
      {
        id: "structure",
        label: "Article includes basic structure tags",
        ok: hasSectionTag && hasTitleInHtml,
        hint: "Expected at least <section> and <h1>.",
      },
    ],
    [
      basicsOk,
      markdownFenceCount,
      unresolvedImagePlaceholders,
      unresolvedYoutubePlaceholder,
      hasSectionTag,
      hasTitleInHtml,
    ]
  );
  const failedChecks = checklist.filter((c) => !c.ok);

  const listCounts = useMemo(() => {
    const live = posts.filter((p) => p.status === "published").length;
    return { total: posts.length, drafts: posts.length - live, live };
  }, [posts]);
  const customCalculatorSnippets = useMemo(() => {
    const seen = new Set<string>();
    return posts
      .filter((p) => (p.calculatorName ?? "").trim() && (p.calculatorCode ?? "").trim())
      .map((p) => ({
        id: p.id,
        title: (p.calculatorName ?? "").trim(),
        code: p.calculatorCode ?? "",
        source: p.title || p.slug,
      }))
      .filter((snippet) => {
        const key = `${snippet.title}::${snippet.code}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
  }, [posts]);

  const filteredPosts = useMemo(() => {
    const q = listQuery.trim().toLowerCase();
    let rows = posts.filter((p) => {
      if (listFilter === "draft" && p.status === "published") return false;
      if (listFilter === "published" && p.status !== "published") return false;
      if (!q) return true;
      const t = (p.title || "").toLowerCase();
      const s = p.slug.toLowerCase();
      return t.includes(q) || s.includes(q);
    });
    rows = [...rows].sort((a, b) => {
      if (listSort === "title_asc") {
        return (a.title || "").localeCompare(b.title || "", undefined, { sensitivity: "base" });
      }
      const ta = new Date(a.updatedAt).getTime();
      const tb = new Date(b.updatedAt).getTime();
      return listSort === "updated_asc" ? ta - tb : tb - ta;
    });
    return rows;
  }, [posts, listQuery, listFilter, listSort]);

  const selectedHiddenByFilter = Boolean(
    selectedId && selected && !filteredPosts.some((p) => p.id === selectedId)
  );

  const saveDisabled = isPending || !databaseConfigured || !basicsOk;
  const publishDisabled = saveDisabled || !selectedId;

  const loadIntoForm = useCallback((p: SerializableStudioPost) => {
    setSelectedId(p.id);
    setTitle(p.title);
    setSlug(p.slug);
    setLocale(p.locale as "en" | "af");
    setExcerpt(p.excerpt ?? "");
    setMetaTitle(p.metaTitle ?? "");
    setMetaDescription(p.metaDescription ?? "");
    setCalculatorName(p.calculatorName ?? "");
    setCalculatorCode(p.calculatorCode ?? "");
    setBodyHtml(p.bodyHtml);
    setSlugTouched(true);
    setBanner(null);
    setActivePanel(null);
    setPublishedPreviewHtml(null);
    setPreviewMode("published");
    startTransition(async () => {
      const res = await sanitizeStudioHtmlPreview(p.bodyHtml);
      if (res.ok) {
        setPublishedPreviewHtml(res.html);
      }
    });
  }, []);

  useEffect(() => {
    setPosts(initialPosts);
    if (!selectedId) return;
    const p = initialPosts.find((x) => x.id === selectedId);
    if (p) loadIntoForm(p);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only re-pull editor state when feed revision changes
  }, [feedKey]);

  function handleNewArticle() {
    setSelectedId(null);
    setTitle("");
    setSlug("");
    setLocale("en");
    setExcerpt("");
    setMetaTitle("");
    setMetaDescription("");
    setCalculatorName("");
    setCalculatorCode("");
    setBodyHtml(
      '<section class="space-y-4">\n  <p class="text-zinc-300">Paste your HTML here. Tap “Copy brand guide for AI” first, then use your AI tool.</p>\n</section>\n'
    );
    setSlugTouched(false);
    setBanner(null);
    setPublishedPreviewHtml(null);
    setLastUploadedUrls([]);
  }

  function onTitleBlur() {
    if (!slugTouched && title.trim()) {
      const s = slugifyTitle(title);
      if (s) setSlug(s);
    }
  }

  function runSave() {
    if (!databaseConfigured) {
      setBanner(
        "Database not connected  -  your host must set DATABASE_URL and run npm run db:push (see yellow notice above)."
      );
      return;
    }
    if (!basicsOk) {
      setBanner("Add a title and a valid URL slug (lowercase letters, numbers, single hyphens) before saving.");
      return;
    }
    setBanner(null);
    startTransition(async () => {
      const wasLive = selected?.status === "published";
      const normalizedBody = normalizeAiHtml(bodyHtml);
      if (normalizedBody !== bodyHtml) {
        setBodyHtml(normalizedBody);
      }
      const res = await saveStudioPost(selectedId, {
        title,
        slug,
        locale,
        excerpt: excerpt || null,
        bodyHtml: normalizedBody,
        metaTitle: metaTitle || null,
        metaDescription: metaDescription || null,
        calculatorName: calculatorName || null,
        calculatorCode: calculatorCode || null,
      });
      if (!res.ok) {
        setBanner(res.error);
        return;
      }
      if (!selectedId) {
        setSelectedId(res.id);
        setSlugTouched(true);
      }
      setBanner(
        wasLive
          ? "Saved. Your changes are now live on the website."
          : "Saved. Draft is stored  -  still not public until you tap Publish."
      );
      router.refresh();
    });
  }

  function runPublish() {
    if (!selectedId) {
      setBanner("Tap Save draft first (that creates your article on the server), then tap Publish.");
      return;
    }
    if (!basicsOk) {
      setBanner("Fix the title and URL slug before publishing.");
      return;
    }
    setBanner(null);
    startTransition(async () => {
      const normalizedBody = normalizeAiHtml(bodyHtml);
      if (normalizedBody !== bodyHtml) {
        setBodyHtml(normalizedBody);
      }
      const saveRes = await saveStudioPost(selectedId, {
        title,
        slug,
        locale,
        excerpt: excerpt || null,
        bodyHtml: normalizedBody,
        metaTitle: metaTitle || null,
        metaDescription: metaDescription || null,
        calculatorName: calculatorName || null,
        calculatorCode: calculatorCode || null,
      });
      if (!saveRes.ok) {
        setBanner(saveRes.error);
        return;
      }
      const pub = await publishStudioPost(selectedId);
      if (!pub.ok) {
        setBanner(pub.error);
        return;
      }
      setBanner("Published. Use “Open this post on the site” or View site insights to check it.");
      router.refresh();
    });
  }

  function runUnpublish() {
    if (!selectedId) return;
    setBanner(null);
    startTransition(async () => {
      const r = await unpublishStudioPost(selectedId);
      if (!r.ok) {
        setBanner(r.error);
        return;
      }
      setBanner("Unpublished  -  visitors no longer see it. You can edit and publish again.");
      router.refresh();
    });
  }

  function runDeleteArticle() {
    if (!selectedId || !selected) return;
    const isLive = selected.status === "published";
    const ok = window.confirm(
      isLive
        ? "Delete this live article from the website? Visitors will no longer see it. This cannot be undone."
        : "Delete this draft permanently? This cannot be undone."
    );
    if (!ok) return;
    setBanner(null);
    startTransition(async () => {
      const r = await deleteStudioPost(selectedId);
      if (!r.ok) {
        setBanner(r.error);
        return;
      }
      handleNewArticle();
      setBanner(isLive ? "Article removed from the website." : "Draft deleted.");
      router.refresh();
    });
  }

  function runDeleteAllPosts() {
    if (!window.confirm("Delete ALL studio posts (draft + published)? This cannot be undone.")) return;
    setBanner(null);
    startTransition(async () => {
      const res = await deleteAllStudioPosts();
      if (!res.ok) {
        setBanner(res.error);
        return;
      }
      handleNewArticle();
      setBanner(`Deleted ${res.deleted} studio post${res.deleted === 1 ? "" : "s"}.`);
      router.refresh();
    });
  }

  async function copyBrandGuide() {
    try {
      await navigator.clipboard.writeText(BLOG_BRAND_GUIDE_TEXT);
      setBanner("Brand guide copied  -  open your AI, paste it, then say what the article should be about.");
    } catch {
      setBanner("Clipboard blocked  -  open “View brand guide” and copy the text by hand.");
    }
  }

  async function copyCalculatorSnippet(code: string) {
    try {
      await navigator.clipboard.writeText(code);
      setBanner("Calculator code copied to clipboard.");
    } catch {
      setBanner("Clipboard blocked - copy calculator code manually from the popup.");
    }
  }

  async function copyAllCalculatorCode() {
    try {
      await navigator.clipboard.writeText(getCalculatorCodePackText());
      setBanner("All calculator code snippets copied.");
    } catch {
      setBanner("Clipboard blocked - copy all code manually from the popup.");
    }
  }

  async function copyLiveArticleUrl(path: string) {
    const full = `${typeof window !== "undefined" ? window.location.origin : ""}${path}`;
    try {
      await navigator.clipboard.writeText(full);
      setBanner("Live article URL copied to clipboard.");
    } catch {
      setBanner(`Copy blocked. Link: ${full}`);
    }
  }

  function replaceImagePlaceholders(html: string, urls: string[]): string {
    let next = html;
    for (const url of urls) {
      next = next.replace(IMAGE_PLACEHOLDER, url);
    }
    return next;
  }

  function runUploadImages() {
    if (!databaseConfigured) {
      setBanner("Image upload is unavailable because the server database setup is incomplete.");
      return;
    }
    if (uploadFiles.length === 0) {
      setBanner("Select at least one image file first.");
      return;
    }
    if (imagePlaceholderCount === 0) {
      setBanner(`No "${IMAGE_PLACEHOLDER}" placeholders found in HTML to replace.`);
      return;
    }

    setBanner(null);
    startTransition(async () => {
      const max = Math.min(uploadFiles.length, imagePlaceholderCount);
      const urls: string[] = [];

      for (let i = 0; i < max; i += 1) {
        const fd = new FormData();
        fd.set("file", uploadFiles[i]);
        const uploaded = await uploadStudioImage(fd);
        if (!uploaded.ok) {
          setBanner(uploaded.error);
          return;
        }
        const resolvedUrl =
          uploaded.url.startsWith("/") && typeof window !== "undefined"
            ? `${window.location.origin}${uploaded.url}`
            : uploaded.url;
        urls.push(resolvedUrl);
      }

      setBodyHtml((prev) => replaceImagePlaceholders(prev, urls));
      setUploadFiles([]);
      setLastUploadedUrls(urls);
      setBanner(
        `Uploaded ${urls.length} image${urls.length === 1 ? "" : "s"} and replaced ${urls.length} placeholder${
          urls.length === 1 ? "" : "s"
        }. Save draft to persist.`
      );
    });
  }

  function runCleanupAiPaste() {
    const cleaned = normalizeAiHtml(bodyHtml);
    if (cleaned === bodyHtml) {
      setBanner("No wrapper text detected. Your HTML already looks clean.");
      return;
    }
    setBodyHtml(cleaned);
    setBanner("Cleaned pasted AI/copy wrappers and markdown fences.");
  }

  function applyYoutubeVideo() {
    const id = extractYoutubeId(youtubeInput);
    if (!id) {
      setBanner("Add a valid YouTube URL or video ID first.");
      return;
    }
    if (!bodyHtml.includes("YOUR_VIDEO_ID")) {
      setBanner('No "YOUR_VIDEO_ID" placeholder found in HTML.');
      return;
    }
    setBodyHtml((prev) => prev.replace("YOUR_VIDEO_ID", id));
    setBanner("YouTube video ID inserted into your HTML.");
  }

  function refreshPublishedPreview() {
    setBanner(null);
    startTransition(async () => {
      const res = await sanitizeStudioHtmlPreview(bodyHtml);
      if (!res.ok) {
        setBanner(res.error);
        return;
      }
      setPublishedPreviewHtml(res.html);
      setPreviewMode("published");
      setBanner("Published preview refreshed using the same sanitizer as production.");
    });
  }

  const previewHtml =
    previewMode === "published"
      ? publishedPreviewHtml !== null
        ? publishedPreviewHtml
        : bodyHtml
      : bodyHtml;
  const previewSrcDoc = useMemo(() => buildPreviewDoc(previewHtml), [previewHtml]);

  useEffect(() => {
    if (previewMode !== "published") return;
    const timer = setTimeout(() => {
      startTransition(async () => {
        const res = await sanitizeStudioHtmlPreview(bodyHtml);
        if (res.ok) {
          setPublishedPreviewHtml(res.html);
        }
      });
    }, 200);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bodyHtml, previewMode]);

  const statusLabel = !selectedId
    ? "New article (not saved yet)"
    : selected?.status === "published"
      ? "Live on the website"
      : "Draft (only you can see it here)";

  const publicPath = slug.trim() && slugValid ? `/insights/${slug.trim()}?locale=${locale}` : null;

  if (!studioConfigured) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <h1 className="mb-3 text-xl font-semibold text-white">Insights studio is off</h1>
        <p className="text-sm leading-relaxed text-zinc-400">
          Set <code className="text-teal-400">CLIENT_STUDIO_PASSWORD</code> on the server, redeploy, then open this page
          again.
        </p>
      </div>
    );
  }

  return (
    <div
      className="flex min-h-0 flex-1 flex-col overflow-hidden"
      aria-busy={isPending}
      aria-label="Insights studio workspace"
    >
      {showHelp && (
        <div className="shrink-0 border-b border-white/10 bg-teal-950/25 px-3 py-3 sm:px-5 sm:py-4">
          <div className="mx-auto flex max-w-5xl flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-teal-400">
                Quick guide (read once)
              </p>
              <ol className="max-w-3xl list-decimal space-y-1.5 pl-5 text-sm leading-relaxed text-zinc-300">
                <li>
                  Tap <strong className="text-zinc-200">Copy brand guide for AI</strong>, paste into ChatGPT / Claude /
                  Gemini, then ask for <strong className="text-zinc-200">HTML only</strong> (not a full web page).
                </li>
                <li>
                  Paste the HTML into the <strong className="text-zinc-200">HTML</strong> box. The preview updates as
                  you type (on a large screen it sits beside the editor; on a phone, scroll down).
                </li>
                <li>
                  Fill <strong className="text-zinc-200">title</strong> and <strong className="text-zinc-200">URL slug</strong>{" "}
                  (lowercase, hyphens). Tap <strong className="text-zinc-200">Save draft</strong>  -  still not public.
                </li>
                <li>
                  When it looks right, tap <strong className="text-zinc-200">Publish</strong>. It then appears on{" "}
                  <a className="text-teal-400 underline" href="/insights" target="_blank" rel="noreferrer">
                    Insights
                  </a>{" "}
                  like any article.
                </li>
                <li>
                  Already live? Pick the article in the list, fix the text in <strong className="text-zinc-200">HTML</strong>, open{" "}
                  <strong className="text-zinc-200">Publish</strong> in the menu, then tap{" "}
                  <strong className="text-zinc-200">Save (updates live site)</strong>. Or <strong className="text-zinc-200">Unpublish</strong> to hide it, or{" "}
                  <strong className="text-zinc-200">Delete article</strong> to remove it.
                </li>
                <li>
                  Own calculator logic: in <strong className="text-zinc-200">Post Setup</strong>, fill{" "}
                  <strong className="text-zinc-200">Calculator name</strong> and <strong className="text-zinc-200">Calculator code</strong>, then Save. Copy later from{" "}
                  <strong className="text-zinc-200">Calculator code library</strong>.
                </li>
              </ol>
            </div>
            <button
              type="button"
              onClick={() => setShowHelp(false)}
              className="shrink-0 self-start rounded-lg px-2 py-1 text-xs text-zinc-500 hover:bg-white/5 hover:text-zinc-300"
            >
              Hide guide
            </button>
          </div>
        </div>
      )}

      {!showHelp && (
        <div className="shrink-0 border-b border-white/5 px-3 py-2">
          <button
            type="button"
            onClick={() => setShowHelp(true)}
            className="text-xs font-medium text-teal-500 hover:text-teal-300"
          >
            Show quick guide
          </button>
        </div>
      )}

      <div className="shrink-0 border-b border-white/10 bg-black/40 px-3 py-2.5 sm:px-4">
        <div className="mx-auto flex w-full max-w-[100vw] min-w-0 flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => {
              void copyBrandGuide();
            }}
            className="shrink-0 rounded-full bg-teal-600/90 px-3 py-2 text-xs font-semibold text-white hover:bg-teal-500 sm:px-4 sm:text-sm"
          >
            Copy brand guide
          </button>
          <button
            type="button"
            onClick={() => setShowBrandGuide(true)}
            className="shrink-0 rounded-full border border-white/15 bg-white/5 px-3 py-2 text-xs text-zinc-200 hover:border-white/25 hover:bg-white/10 sm:px-4 sm:text-sm"
          >
            Read brand guide
          </button>
          <button
            type="button"
            onClick={() => setShowCalculatorLibrary(true)}
            className="shrink-0 rounded-full border border-white/15 bg-white/5 px-3 py-2 text-xs text-zinc-200 hover:border-white/25 hover:bg-white/10 sm:px-4 sm:text-sm"
          >
            Calculator code library
          </button>
          <button
            type="button"
            onClick={() => setShowNotebook(true)}
            className="shrink-0 rounded-full border border-violet-400/30 bg-violet-950/35 px-3 py-2 text-xs font-medium text-violet-200 hover:border-violet-400/45 hover:bg-violet-950/50 sm:px-4 sm:text-sm"
          >
            Notebook
          </button>
          <a
            href="/insights"
            target="_blank"
            rel="noreferrer"
            className="shrink-0 rounded-full border border-white/15 px-3 py-2 text-xs text-zinc-300 hover:bg-white/5 sm:px-4 sm:text-sm"
          >
            Website insights ↗
          </a>
          {selectedId && selected?.status === "published" && publicPath && (
            <a
              href={publicPath}
              target="_blank"
              rel="noreferrer"
              className="shrink-0 rounded-full border border-teal-500/50 bg-teal-950/30 px-3 py-2 text-xs text-teal-200 hover:bg-teal-900/40 sm:px-4 sm:text-sm"
            >
              This post live ↗
            </a>
          )}
        </div>
      </div>

      {(banner || !databaseConfigured) && (
        <div className="shrink-0 space-y-2 px-3 py-2 sm:px-4">
          {banner && (
            <div
              role="status"
              className="rounded-xl border border-white/10 bg-zinc-900/90 px-3 py-2.5 text-sm leading-snug text-zinc-200 sm:px-4"
            >
              {banner}
            </div>
          )}
          {!databaseConfigured && (
            <div className="rounded-xl border border-amber-500/35 bg-amber-950/50 px-3 py-2.5 text-sm leading-snug text-amber-100 sm:px-4">
              <strong className="text-amber-200">Database required to save.</strong> Your developer sets{" "}
              <code className="rounded bg-black/30 px-1 text-amber-200">DATABASE_URL</code>, then runs{" "}
              <code className="rounded bg-black/30 px-1 text-amber-200">npm run db:push</code>. Until then you can look
              around, but Save / Publish will not work.
            </div>
          )}
        </div>
      )}

      <div className="grid min-h-0 flex-1 grid-cols-1 grid-rows-[minmax(0,min(48vh,320px))_minmax(0,1fr)] overflow-hidden lg:grid-cols-[minmax(0,17.75rem)_minmax(0,1fr)] lg:grid-rows-1 lg:gap-0">
        {/* Article list + tools */}
        <aside
          className="flex min-h-0 w-full shrink-0 flex-col border-b border-white/10 lg:max-h-none lg:w-[17.75rem] lg:min-w-0 lg:border-b-0 lg:border-r lg:border-white/10"
          aria-label="Articles and library"
        >
          <div className="shrink-0 border-b border-white/5 p-2">
            <div className="flex items-center justify-between gap-1">
              <button
                type="button"
                onClick={handleNewArticle}
                className="rounded-lg bg-teal-600 px-2.5 py-1.5 text-[11px] font-semibold text-white hover:bg-teal-500"
                title="New article"
              >
                +
              </button>
              <span className="flex-1 truncate text-center text-[10px] font-medium uppercase tracking-wide text-zinc-500">
                Articles
              </span>
            </div>
            <div className="mt-2 space-y-1">
              <button
                type="button"
                onClick={() => setActivePanel("setup")}
                className="w-full rounded-lg border border-white/10 px-2 py-1.5 text-left text-[11px] text-zinc-300 hover:bg-white/5"
                title="Post setup"
              >
                Setup
              </button>
              <button
                type="button"
                onClick={() => setActivePanel("html")}
                className="w-full rounded-lg border border-white/10 px-2 py-1.5 text-left text-[11px] text-zinc-300 hover:bg-white/5"
                title="Edit HTML"
              >
                HTML
              </button>
              <button
                type="button"
                onClick={() => setActivePanel("assist")}
                className="w-full rounded-lg border border-white/10 px-2 py-1.5 text-left text-[11px] text-zinc-300 hover:bg-white/5"
                title="Media and helpers"
              >
                Assist
              </button>
              <button
                type="button"
                onClick={() => setActivePanel("publish")}
                className="w-full rounded-lg border border-white/10 px-2 py-1.5 text-left text-[11px] text-zinc-300 hover:bg-white/5"
                title="Publish actions"
              >
                Publish
              </button>
              <button
                type="button"
                onClick={() => setShowBrandGuide(true)}
                className="w-full rounded-lg border border-white/10 px-2 py-1.5 text-left text-[11px] text-zinc-300 hover:bg-white/5"
                title="Brand guide"
              >
                Guide
              </button>
              <button
                type="button"
                onClick={() => setShowCalculatorLibrary(true)}
                className="w-full rounded-lg border border-white/10 px-2 py-1.5 text-left text-[11px] text-zinc-300 hover:bg-white/5"
                title="Calculator code"
              >
                Calc code
              </button>
            </div>
          </div>
          <div className="shrink-0 space-y-2 border-b border-white/5 p-2 sm:p-3">
            <button
              type="button"
              onClick={handleNewArticle}
              className="w-full rounded-xl bg-teal-600 py-2.5 text-sm font-semibold text-white hover:bg-teal-500"
            >
              + New article
            </button>
            <div className="flex gap-1.5">
              <input
                type="search"
                value={listQuery}
                onChange={(e) => setListQuery(e.target.value)}
                placeholder="Search title or slug…"
                aria-label="Search articles"
                className="min-w-0 flex-1 rounded-lg border border-white/10 bg-black/40 px-2.5 py-2 text-xs text-white placeholder:text-zinc-600 focus:border-teal-500/40 focus:outline-none focus:ring-1 focus:ring-teal-500/25"
              />
              {listQuery.trim() ? (
                <button
                  type="button"
                  onClick={() => setListQuery("")}
                  className="shrink-0 rounded-lg border border-white/10 px-2 py-2 text-[11px] text-zinc-400 hover:bg-white/5 hover:text-zinc-200"
                  title="Clear search"
                >
                  Clear
                </button>
              ) : null}
            </div>
            <div className="flex flex-wrap gap-1" role="group" aria-label="Filter by status">
              {(
                [
                  ["all", "All"] as const,
                  ["draft", `Drafts (${listCounts.drafts})`] as const,
                  ["published", `Live (${listCounts.live})`] as const,
                ] as const
              ).map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setListFilter(key)}
                  className={`rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors ${
                    listFilter === key
                      ? "bg-white/15 text-white"
                      : "text-zinc-500 hover:bg-white/5 hover:text-zinc-300"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            <label className="block text-[10px] font-medium uppercase tracking-wider text-zinc-600">
              Sort
              <select
                value={listSort}
                onChange={(e) => setListSort(e.target.value as typeof listSort)}
                className="mt-1 w-full rounded-lg border border-white/10 bg-black/40 px-2 py-1.5 text-xs text-zinc-200 focus:border-teal-500/40 focus:outline-none focus:ring-1 focus:ring-teal-500/25"
              >
                <option value="updated_desc">Recently updated</option>
                <option value="updated_asc">Oldest update first</option>
                <option value="title_asc">Title A–Z</option>
              </select>
            </label>
            <div className="flex flex-wrap gap-1.5 border-t border-white/[0.06] pt-2">
              <button
                type="button"
                onClick={() => setActivePanel("setup")}
                className="rounded-lg border border-white/10 px-2 py-1.5 text-[10px] font-medium text-zinc-400 hover:bg-white/5 hover:text-zinc-200"
              >
                Setup
              </button>
              <button
                type="button"
                onClick={() => setActivePanel("html")}
                className="rounded-lg border border-white/10 px-2 py-1.5 text-[10px] font-medium text-zinc-400 hover:bg-white/5 hover:text-zinc-200"
              >
                HTML
              </button>
              <button
                type="button"
                onClick={() => setActivePanel("assist")}
                className="rounded-lg border border-white/10 px-2 py-1.5 text-[10px] font-medium text-zinc-400 hover:bg-white/5 hover:text-zinc-200"
              >
                Assist
              </button>
              <button
                type="button"
                onClick={() => setActivePanel("publish")}
                className="rounded-lg border border-white/10 px-2 py-1.5 text-[10px] font-medium text-zinc-400 hover:bg-white/5 hover:text-zinc-200"
              >
                Publish
              </button>
              <button
                type="button"
                onClick={() => void copyBrandGuide()}
                className="rounded-lg border border-teal-500/30 bg-teal-950/20 px-2 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-teal-300 hover:bg-teal-900/30"
              >
                Copy AI guide
              </button>
              <button
                type="button"
                onClick={() => setShowBrandGuide(true)}
                className="rounded-lg border border-white/10 px-2 py-1.5 text-[10px] font-medium text-zinc-400 hover:bg-white/5 hover:text-zinc-200"
              >
                Read guide
              </button>
              <button
                type="button"
                onClick={() => setShowCalculatorLibrary(true)}
                className="rounded-lg border border-white/10 px-2 py-1.5 text-[10px] font-medium text-zinc-400 hover:bg-white/5 hover:text-zinc-200"
              >
                Calculator code
              </button>
            </div>
          </div>

          {selectedHiddenByFilter && (
            <div className="shrink-0 border-b border-amber-500/20 bg-amber-950/25 px-2.5 py-2 text-[11px] leading-snug text-amber-100/90 sm:px-3">
              Current article is hidden by search or filter.{" "}
              <button
                type="button"
                className="font-semibold text-amber-200 underline decoration-amber-500/50 hover:text-white"
                onClick={() => {
                  setListQuery("");
                  setListFilter("all");
                }}
              >
                Reset list
              </button>
            </div>
          )}

          <ul className="min-h-0 flex-1 list-none space-y-1 overflow-y-auto overscroll-y-contain p-2 sm:p-2">
            {posts.length === 0 && (
              <li className="px-2 py-4 text-center text-xs text-zinc-500">No articles yet  -  tap + New article.</li>
            )}
            {posts.length > 0 && filteredPosts.length === 0 && (
              <li className="px-2 py-4 text-center text-xs leading-relaxed text-zinc-500">
                Nothing matches this search or filter. Try another term or tap{" "}
                <button
                  type="button"
                  className="text-teal-400 underline hover:text-teal-300"
                  onClick={() => {
                    setListQuery("");
                    setListFilter("all");
                  }}
                >
                  show all
                </button>
                .
              </li>
            )}
            {filteredPosts.map((p) => (
              <li key={p.id}>
                <button
                  type="button"
                  onClick={() => loadIntoForm(p)}
                  className={`w-full min-w-0 rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${
                    p.id === selectedId ? "bg-white/10 text-white" : "text-zinc-400 hover:bg-white/5 hover:text-zinc-200"
                  }`}
                >
                  <span className="block truncate font-medium">{p.title || "(untitled)"}</span>
                  <span className="mt-0.5 block text-[10px] uppercase tracking-wider text-zinc-500">
                    {p.status === "published" ? "Live" : "Draft"} · {formatShort(p.updatedAt)}
                  </span>
                </button>
              </li>
            ))}
          </ul>

          <div className="shrink-0 space-y-2 border-t border-white/10 bg-zinc-950/50 p-2.5 sm:p-3">
            <p className="text-[10px] leading-relaxed text-zinc-500">
              <span className="text-zinc-400">{listCounts.total}</span> article{listCounts.total === 1 ? "" : "s"} ·{" "}
              <span className="text-teal-500/90">{listCounts.live}</span> live ·{" "}
              <span className="text-amber-600/90">{listCounts.drafts}</span> draft{listCounts.drafts === 1 ? "" : "s"}
            </p>
            {selectedId && selected && (
              <div className="space-y-1.5 rounded-lg border border-white/[0.07] bg-black/30 p-2">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">Selected</p>
                <p className="truncate text-xs font-medium text-zinc-200">{selected.title || "(untitled)"}</p>
                <p className="text-[10px] text-zinc-500">
                  {selected.status === "published" ? "On the public site" : "Not published yet"}
                </p>
                {selected.status === "published" && SLUG_OK.test(selected.slug) && (
                  <div className="flex flex-col gap-1.5 pt-0.5">
                    <button
                      type="button"
                      onClick={() =>
                        void copyLiveArticleUrl(`/insights/${selected.slug.trim()}?locale=${selected.locale}`)
                      }
                      className="w-full rounded-lg bg-teal-600/80 py-2 text-[11px] font-semibold text-white hover:bg-teal-500"
                    >
                      Copy live URL
                    </button>
                    <a
                      href={`/insights/${selected.slug.trim()}?locale=${selected.locale}`}
                      target="_blank"
                      rel="noreferrer"
                      className="block w-full rounded-lg border border-white/15 py-2 text-center text-[11px] text-teal-300 hover:bg-white/5"
                    >
                      Open in new tab ↗
                    </a>
                  </div>
                )}
                {selected.status !== "published" && (
                  <p className="text-[10px] leading-snug text-zinc-600">
                    Save draft, then Publish to put it on{" "}
                    <a href="/insights" target="_blank" rel="noreferrer" className="text-teal-500 hover:underline">
                      Insights
                    </a>
                    .
                  </p>
                )}
              </div>
            )}
            {!selectedId && (
              <p className="text-[10px] leading-snug text-zinc-600">
                New article: fill title and slug, then Save draft.
              </p>
            )}
          </div>
        </aside>

        {/* Preview */}
        <section className="flex min-h-[min(45vh,360px)] min-w-0 flex-col bg-[#070708] lg:min-h-0">
          <div className="shrink-0 border-b border-white/10 px-3 py-2 sm:px-4">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">Preview</p>
              <button
                type="button"
                onClick={() => setPreviewMode("raw")}
                className={`rounded-full px-2 py-0.5 text-[10px] ${
                  previewMode === "raw" ? "bg-white/15 text-white" : "text-zinc-500 hover:bg-white/5"
                }`}
              >
                Raw
              </button>
              <button
                type="button"
                onClick={refreshPublishedPreview}
                className={`rounded-full px-2 py-0.5 text-[10px] ${
                  previewMode === "published" ? "bg-teal-600/30 text-teal-200" : "text-zinc-400 hover:bg-white/5"
                }`}
              >
                Published (sanitized)
              </button>
            </div>
            <p className="text-[11px] leading-snug text-zinc-600">
              Raw = direct editor view. Published = server-sanitized view used on live site.
            </p>
          </div>
          <div className="relative min-h-0 flex-1">
            <iframe
              title="Article preview"
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-presentation"
              className="absolute inset-0 h-full w-full border-0 bg-[#0a0a0c]"
              srcDoc={previewSrcDoc}
            />
          </div>
        </section>
      </div>

      {activePanel && (
        <div className="fixed inset-0 z-[58] bg-black/70 backdrop-blur-sm p-3 sm:p-6" role="dialog" aria-modal="true">
          <div className="mx-auto flex h-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-white/15 bg-[#121214]">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <p className="text-sm font-semibold text-white">
                {activePanel === "setup" && "Post Setup"}
                {activePanel === "html" && "Article HTML"}
                {activePanel === "assist" && "Media & Assist"}
                {activePanel === "publish" && "Publish"}
              </p>
              <button
                type="button"
                onClick={() => setActivePanel(null)}
                className="rounded-lg px-2 py-1 text-zinc-400 hover:bg-white/10 hover:text-white"
              >
                Close
              </button>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4">
              {activePanel === "setup" && (
                <div className="space-y-3">
                  <label className="block text-xs text-zinc-500">
                    <span className="mb-1 block font-medium text-zinc-300">Author</span>
                    <select
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white"
                    >
                      {AUTHOR_OPTIONS.map((name) => (
                        <option key={name} value={name}>
                          {name}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="block text-xs text-zinc-500">
                    <span className="mb-1 block font-medium text-zinc-300">Title</span>
                    <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white" />
                  </label>
                  <label className="block text-xs text-zinc-500">
                    <span className="mb-1 block font-medium text-zinc-300">URL slug</span>
                    <input value={slug} onChange={(e) => setSlug(e.target.value)} className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white" />
                  </label>
                  <label className="block text-xs text-zinc-500">
                    <span className="mb-1 block font-medium text-zinc-300">Language</span>
                    <select value={locale} onChange={(e) => setLocale(e.target.value as "en" | "af")} className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white">
                      <option value="en">English</option>
                      <option value="af">Afrikaans</option>
                    </select>
                  </label>
                  <label className="block text-xs text-zinc-500">
                    <span className="mb-1 block font-medium text-zinc-300">Short excerpt</span>
                    <input value={excerpt} onChange={(e) => setExcerpt(e.target.value)} className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white" />
                  </label>
                  <label className="block text-xs text-zinc-500">
                    <span className="mb-1 block font-medium text-zinc-300">SEO title</span>
                    <input value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white" />
                  </label>
                  <label className="block text-xs text-zinc-500">
                    <span className="mb-1 block font-medium text-zinc-300">SEO description</span>
                    <input value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)} className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white" />
                  </label>
                  <div className="rounded-xl border border-white/10 bg-zinc-900/60 px-3 py-2.5 text-sm leading-relaxed text-zinc-300">
                    <p className="font-medium text-zinc-200">Your own calculator code (optional)</p>
                    <p className="mt-1 text-xs text-zinc-400">
                      Type a short name below, paste the code in the big box, then tap{" "}
                      <strong className="text-zinc-200">Save</strong> in the Publish panel. It is stored with this
                      article. To copy it later for AI, open the top bar button{" "}
                      <strong className="text-zinc-200">Calculator code library</strong> — your saved snippets appear at
                      the top there.
                    </p>
                  </div>
                  <label className="block text-xs text-zinc-500">
                    <span className="mb-1 block font-medium text-zinc-300">Calculator name (optional)</span>
                    <input
                      value={calculatorName}
                      onChange={(e) => setCalculatorName(e.target.value)}
                      placeholder="e.g. Retirement Projection v2"
                      className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white"
                    />
                  </label>
                  <label className="block text-xs text-zinc-500">
                    <span className="mb-1 block font-medium text-zinc-300">Calculator code (optional)</span>
                    <textarea
                      value={calculatorCode}
                      onChange={(e) => setCalculatorCode(e.target.value)}
                      spellCheck={false}
                      placeholder="Paste calculator JS/TS logic here..."
                      className="min-h-40 w-full rounded-lg border border-white/10 bg-black/60 px-3 py-2.5 font-mono text-[12px] text-teal-100/90"
                    />
                  </label>
                </div>
              )}
              {activePanel === "html" && (
                <div className="space-y-2">
                  <p className="text-xs text-zinc-500">Only paste the page middle content, not full HTML document.</p>
                  <textarea
                    value={bodyHtml}
                    onChange={(e) => setBodyHtml(e.target.value)}
                    spellCheck={false}
                    className="min-h-[52vh] w-full resize-y rounded-xl border border-white/10 bg-black/60 px-3 py-2.5 font-mono text-[13px] text-teal-100/90"
                  />
                </div>
              )}
              {activePanel === "assist" && (
                <div className="space-y-4">
                  <div className="rounded-xl border border-white/10 bg-black/40 p-3">
                    <p className="text-xs font-medium text-zinc-300">Paste helper</p>
                    <button type="button" onClick={runCleanupAiPaste} className="mt-2 rounded-lg border border-white/20 px-3 py-2 text-xs text-zinc-200 hover:bg-white/5">Clean pasted HTML</button>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-black/40 p-3">
                    <p className="text-xs font-medium text-zinc-300">Image placeholders</p>
                    <p className="mt-1 text-[11px] text-zinc-500">Found {imagePlaceholderCount} occurrence(s) of {IMAGE_PLACEHOLDER}.</p>
                    <div className="mt-2 flex flex-col gap-2 sm:flex-row">
                      <input type="file" accept="image/*" multiple onChange={(e) => setUploadFiles(Array.from(e.target.files ?? []))} className="block w-full text-xs text-zinc-400" />
                      <button type="button" onClick={runUploadImages} disabled={isPending || uploadFiles.length === 0 || imagePlaceholderCount === 0} className="rounded-lg border border-white/20 px-3 py-2 text-xs text-zinc-200 disabled:opacity-40">Upload & replace</button>
                    </div>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-black/40 p-3">
                    <p className="text-xs font-medium text-zinc-300">YouTube helper</p>
                    <div className="mt-2 flex flex-col gap-2 sm:flex-row">
                      <input value={youtubeInput} onChange={(e) => setYoutubeInput(e.target.value)} placeholder="https://www.youtube.com/watch?v=..." className="min-w-0 flex-1 rounded-lg border border-white/10 bg-black/50 px-3 py-2 text-xs text-white" />
                      <button type="button" onClick={applyYoutubeVideo} className="rounded-lg border border-white/20 px-3 py-2 text-xs text-zinc-200">Insert video</button>
                    </div>
                  </div>
                </div>
              )}
              {activePanel === "publish" && (
                <div className="space-y-3">
                  <p className="text-xs text-zinc-500">{statusLabel}</p>
                  {publicPath && <p className="text-xs text-zinc-500">Public link: {publicPath}</p>}
                  {selected?.status === "published" && (
                    <p className="rounded-xl border border-teal-500/25 bg-teal-950/20 px-3 py-2 text-sm leading-relaxed text-teal-100/90">
                      <strong className="text-teal-200">Live article:</strong> change the HTML or title, then tap{" "}
                      <strong className="text-white">Save (updates live site)</strong>. Use{" "}
                      <strong className="text-white">Unpublish</strong> to hide it without deleting, or{" "}
                      <strong className="text-white">Delete article</strong> to remove it from the website.
                    </p>
                  )}
                  <div className="rounded-xl border border-white/10 bg-black/40 p-3">
                    <p className="text-xs font-medium text-zinc-300 mb-2">Pre-publish health check</p>
                    <ul className="space-y-1 text-[11px]">
                      {checklist.map((item) => (
                        <li key={item.id} className={item.ok ? "text-emerald-300" : "text-amber-300/90"}>
                          {item.ok ? "PASS" : "FIX"} - {item.label}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button type="button" onClick={runSave} disabled={saveDisabled} className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-black disabled:opacity-40">
                      {selected?.status === "published" ? "Save (updates live site)" : "Save draft"}
                    </button>
                    {selected?.status !== "published" && (
                      <button type="button" onClick={runPublish} disabled={publishDisabled} className="rounded-full bg-teal-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-40">
                        Publish
                      </button>
                    )}
                    {selectedId && selected?.status === "published" ? (
                      <button type="button" onClick={runUnpublish} className="rounded-full border border-white/20 px-4 py-2 text-sm text-zinc-200">
                        Unpublish
                      </button>
                    ) : null}
                    {selectedId ? (
                      <button type="button" onClick={runDeleteArticle} className="rounded-full border border-red-500/35 px-4 py-2 text-sm text-red-300">
                        Delete article
                      </button>
                    ) : null}
                    <button
                      type="button"
                      onClick={runDeleteAllPosts}
                      className="rounded-full border border-red-500/35 bg-red-950/30 px-4 py-2 text-sm text-red-300 hover:bg-red-950/45"
                    >
                      Delete all studio posts
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {showBrandGuide && (
        <div
          className="fixed inset-0 z-[60] overflow-y-auto overflow-x-hidden bg-black/75 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="brand-guide-title"
        >
          <div className="flex min-h-full items-start justify-center p-4 py-8 sm:items-center sm:py-10">
            <div className="my-auto flex w-full max-w-2xl min-w-0 max-h-[min(88dvh,840px)] min-h-0 flex-col overflow-hidden rounded-2xl border border-white/15 bg-[#121214] shadow-2xl">
              <div className="flex shrink-0 items-center justify-between gap-2 border-b border-white/10 px-4 py-3">
                <h2 id="brand-guide-title" className="min-w-0 truncate text-sm font-semibold text-white">
                  Brand guide for AI
                </h2>
                <button
                  type="button"
                  onClick={() => setShowBrandGuide(false)}
                  className="shrink-0 rounded-lg px-2 py-1 text-lg leading-none text-zinc-400 hover:bg-white/10 hover:text-white"
                  aria-label="Close"
                >
                  ×
                </button>
              </div>
              <p className="shrink-0 border-b border-white/5 px-4 py-2 text-xs leading-relaxed text-zinc-500">
                Copy this into your AI first, then describe your article. Ask for{" "}
                <strong className="text-zinc-300">HTML only</strong>  -  a fragment, not a full page with{" "}
                <code className="text-zinc-400">&lt;html&gt;</code>.
              </p>
              <pre className="max-h-[min(52dvh,520px)] min-h-0 overflow-y-auto overscroll-y-contain border-t border-white/5 px-4 py-3 font-mono text-xs leading-relaxed text-zinc-300 whitespace-pre-wrap">
                {BLOG_BRAND_GUIDE_TEXT}
              </pre>
              <div className="flex shrink-0 flex-col gap-2 border-t border-white/10 p-4 sm:flex-row">
                <button
                  type="button"
                  onClick={() => void copyBrandGuide()}
                  className="flex-1 rounded-xl bg-teal-600 py-3 text-sm font-semibold text-white hover:bg-teal-500"
                >
                  Copy to clipboard
                </button>
                <button
                  type="button"
                  onClick={() => setShowBrandGuide(false)}
                  className="rounded-xl border border-white/15 px-4 py-3 text-sm text-zinc-300 hover:bg-white/5"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showCalculatorLibrary && (
        <div
          className="fixed inset-0 z-[60] overflow-y-auto overflow-x-hidden bg-black/75 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="calculator-code-title"
        >
          <div className="flex min-h-full items-start justify-center p-4 py-8 sm:items-center sm:py-10">
            <div className="my-auto flex w-full max-w-3xl min-w-0 max-h-[min(88dvh,920px)] min-h-0 flex-col overflow-hidden rounded-2xl border border-white/15 bg-[#121214] shadow-2xl">
              <div className="flex shrink-0 items-center justify-between gap-2 border-b border-white/10 px-4 py-3">
                <h2 id="calculator-code-title" className="min-w-0 truncate text-sm font-semibold text-white">
                  Calculator code library
                </h2>
                <button
                  type="button"
                  onClick={() => setShowCalculatorLibrary(false)}
                  className="shrink-0 rounded-lg px-2 py-1 text-lg leading-none text-zinc-400 hover:bg-white/10 hover:text-white"
                  aria-label="Close"
                >
                  ×
                </button>
              </div>
              <div className="shrink-0 border-b border-white/5 px-4 py-2">
                <p className="text-xs leading-relaxed text-zinc-500">
                  Share these snippets with AI so generated blog posts follow your calculator logic.
                </p>
              </div>
              <div className="min-h-0 flex-1 overflow-y-auto space-y-3 px-4 py-3">
                {customCalculatorSnippets.length > 0 && (
                  <div className="rounded-xl border border-teal-500/30 bg-teal-950/20 p-3">
                    <p className="text-xs font-semibold text-teal-200">Your saved calculator snippets</p>
                    <p className="mt-1 text-[11px] text-teal-100/80">
                      Saved from post setup fields. Edit a post, update calculator name/code, then Save draft.
                    </p>
                    <div className="mt-3 space-y-3">
                      {customCalculatorSnippets.map((snippet) => (
                        <div key={snippet.id} className="rounded-lg border border-white/10 bg-black/30">
                          <div className="flex items-center justify-between gap-2 border-b border-white/10 px-3 py-2">
                            <div className="min-w-0">
                              <p className="truncate text-xs font-semibold text-zinc-100">{snippet.title}</p>
                              <p className="truncate text-[11px] text-zinc-500">From: {snippet.source}</p>
                            </div>
                            <button
                              type="button"
                              onClick={() => void copyCalculatorSnippet(snippet.code)}
                              className="shrink-0 rounded-lg border border-white/15 px-2 py-1 text-[11px] text-zinc-300 hover:bg-white/5"
                            >
                              Copy
                            </button>
                          </div>
                          <pre className="max-h-44 overflow-y-auto whitespace-pre-wrap px-3 py-2 font-mono text-[11px] leading-relaxed text-zinc-300">
                            {snippet.code}
                          </pre>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {CALCULATOR_CODE_SNIPPETS.map((snippet) => (
                  <div key={snippet.id} className="rounded-xl border border-white/10 bg-black/30">
                    <div className="flex items-center justify-between gap-2 border-b border-white/10 px-3 py-2">
                      <div className="min-w-0">
                        <p className="truncate text-xs font-semibold text-zinc-200">{snippet.title}</p>
                        <p className="truncate text-[11px] text-zinc-500">{snippet.sourcePath}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => void copyCalculatorSnippet(snippet.code)}
                        className="shrink-0 rounded-lg border border-white/15 px-2 py-1 text-[11px] text-zinc-300 hover:bg-white/5"
                      >
                        Copy
                      </button>
                    </div>
                    <pre className="max-h-56 overflow-y-auto whitespace-pre-wrap px-3 py-2 font-mono text-[11px] leading-relaxed text-zinc-300">
                      {snippet.code}
                    </pre>
                  </div>
                ))}
              </div>
              <div className="flex shrink-0 flex-col gap-2 border-t border-white/10 p-4 sm:flex-row">
                <button
                  type="button"
                  onClick={() => void copyAllCalculatorCode()}
                  className="flex-1 rounded-xl bg-teal-600 py-3 text-sm font-semibold text-white hover:bg-teal-500"
                >
                  Copy all calculator code
                </button>
                <button
                  type="button"
                  onClick={() => setShowCalculatorLibrary(false)}
                  className="rounded-xl border border-white/15 px-4 py-3 text-sm text-zinc-300 hover:bg-white/5"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <StudioNotebookModal
        open={showNotebook}
        onClose={() => setShowNotebook(false)}
        initialNotes={initialNotebookNotes}
        databaseConfigured={databaseConfigured}
      />
    </div>
  );
}
