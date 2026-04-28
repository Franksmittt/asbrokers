"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState, useTransition } from "react";

import {
  deleteStudioDraft,
  publishStudioPost,
  saveStudioPost,
  sanitizeStudioHtmlPreview,
  unpublishStudioPost,
  uploadStudioImage,
} from "@/app/studio/blog/actions";
import { BLOG_BRAND_GUIDE_TEXT } from "@/lib/client-studio/brand-guide-content";
import {
  CALCULATOR_CODE_SNIPPETS,
  getCalculatorCodePackText,
} from "@/lib/client-studio/calculator-code-pack";

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

type Props = {
  initialPosts: SerializableStudioPost[];
  databaseConfigured: boolean;
  studioConfigured: boolean;
};

type HealthCheck = {
  id: string;
  label: string;
  ok: boolean;
  hint?: string;
};

export function BlogStudioClient({ initialPosts, databaseConfigured, studioConfigured }: Props) {
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
  const [bodyHtml, setBodyHtml] = useState(initialPosts[0]?.bodyHtml ?? "");
  const [banner, setBanner] = useState<string | null>(null);
  const [showBrandGuide, setShowBrandGuide] = useState(false);
  const [showCalculatorLibrary, setShowCalculatorLibrary] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [sidebarPinned, setSidebarPinned] = useState(false);
  const [slugTouched, setSlugTouched] = useState(Boolean(initialPosts[0]));
  const [uploadFiles, setUploadFiles] = useState<File[]>([]);
  const [youtubeInput, setYoutubeInput] = useState("");
  const [previewMode, setPreviewMode] = useState<"raw" | "published">("published");
  const [publishedPreviewHtml, setPublishedPreviewHtml] = useState<string | null>(null);
  const [lastUploadedUrls, setLastUploadedUrls] = useState<string[]>([]);
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
    setBodyHtml(p.bodyHtml);
    setSlugTouched(true);
    setBanner(null);
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
      });
      if (!res.ok) {
        setBanner(res.error);
        return;
      }
      if (!selectedId) {
        setSelectedId(res.id);
        setSlugTouched(true);
      }
      setBanner("Saved. Draft is stored  -  still not public until you tap Publish.");
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

  function runDeleteDraft() {
    if (!selectedId || !selected || selected.status === "published") return;
    if (!window.confirm("Delete this draft permanently? This cannot be undone.")) return;
    setBanner(null);
    startTransition(async () => {
      const r = await deleteStudioDraft(selectedId);
      if (!r.ok) {
        setBanner(r.error);
        return;
      }
      handleNewArticle();
      setBanner("Draft deleted.");
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

  const previewHtml = previewMode === "published" ? publishedPreviewHtml ?? "" : bodyHtml;
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
    }, 500);
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
                  Wrong on the live site? Tap <strong className="text-zinc-200">Unpublish</strong>, fix HTML, Save, Publish
                  again.
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

      <div className="grid min-h-0 flex-1 grid-cols-1 grid-rows-[auto_minmax(0,1fr)] overflow-hidden lg:grid-cols-[auto_minmax(0,1fr)_minmax(0,1fr)] lg:grid-rows-1">
        {/* Article list + tools */}
        <aside
          className={`flex min-h-0 max-h-[min(48vh,320px)] flex-col border-b border-white/10 transition-all duration-200 lg:max-h-none lg:border-b-0 lg:border-r ${
            sidebarExpanded || sidebarPinned ? "lg:w-72" : "lg:w-14"
          }`}
          onMouseEnter={() => setSidebarExpanded(true)}
          onMouseLeave={() => setSidebarExpanded(false)}
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
              <button
                type="button"
                onClick={() => setSidebarPinned((v) => !v)}
                className={`rounded-lg px-2 py-1.5 text-[11px] ${
                  sidebarPinned ? "bg-white/15 text-white" : "text-zinc-400 hover:bg-white/5"
                }`}
                title={sidebarPinned ? "Unpin menu" : "Pin menu open"}
              >
                {sidebarPinned ? "Unpin" : "Pin"}
              </button>
            </div>
            <div className="mt-2 space-y-1">
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
          {(sidebarExpanded || sidebarPinned) && (
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
          )}

          {(sidebarExpanded || sidebarPinned) && selectedHiddenByFilter && (
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

          {(sidebarExpanded || sidebarPinned) && (
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
          )}

          {(sidebarExpanded || sidebarPinned) && (
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
          )}
        </aside>

        {/* Editor column */}
        <section className="flex min-h-0 min-w-0 flex-col border-b border-white/10 lg:border-b-0 lg:border-r">
          <div className="shrink-0 border-b border-white/5 bg-zinc-950/80 px-3 py-2 sm:px-4">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${
                  !selectedId
                    ? "bg-zinc-800 text-zinc-400"
                    : selected?.status === "published"
                      ? "bg-teal-900/60 text-teal-200"
                      : "bg-amber-950/80 text-amber-200/90"
                }`}
              >
                {statusLabel}
              </span>
              {isPending && <span className="text-[11px] text-zinc-500">Working…</span>}
            </div>
            {publicPath && (
              <p className="mt-1.5 break-all font-mono text-[11px] leading-snug text-zinc-500">
                Public link (after publish):{" "}
                <span className="text-zinc-400">{publicPath}</span>
              </p>
            )}
            {slug.trim() && !slugValid && (
              <p className="mt-1.5 text-[11px] text-amber-300/90">
                Slug: use only lowercase letters, numbers, and single hyphens (no spaces).
              </p>
            )}
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain px-3 py-3 sm:px-4 sm:py-4">
            <div className="mx-auto max-w-3xl space-y-4">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <label className="block min-w-0 text-xs text-zinc-500">
                  <span className="mb-1 block font-medium text-zinc-400">Title</span>
                  <span className="sr-only">Required.</span>
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onBlur={onTitleBlur}
                    className="mt-0.5 w-full min-w-0 rounded-xl border border-white/10 bg-black/50 px-3 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:border-teal-500/40 focus:outline-none focus:ring-1 focus:ring-teal-500/30"
                    placeholder="Headline on the website"
                    autoComplete="off"
                  />
                </label>
                <label className="block min-w-0 text-xs text-zinc-500">
                  <span className="mb-1 block font-medium text-zinc-400">URL slug</span>
                  <input
                    value={slug}
                    onChange={(e) => {
                      setSlugTouched(true);
                      setSlug(e.target.value);
                    }}
                    className="mt-0.5 w-full min-w-0 break-all rounded-xl border border-white/10 bg-black/50 px-3 py-2.5 font-mono text-sm text-white placeholder:text-zinc-600 focus:border-teal-500/40 focus:outline-none focus:ring-1 focus:ring-teal-500/30"
                    placeholder="e.g. retirement-income-tips"
                    spellCheck={false}
                    autoCapitalize="none"
                    autoCorrect="off"
                  />
                </label>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <label className="block text-xs text-zinc-500 sm:col-span-1">
                  <span className="mb-1 block font-medium text-zinc-400">Language</span>
                  <select
                    value={locale}
                    onChange={(e) => setLocale(e.target.value as "en" | "af")}
                    className="mt-0.5 w-full rounded-xl border border-white/10 bg-black/50 px-3 py-2.5 text-sm text-white focus:border-teal-500/40 focus:outline-none focus:ring-1 focus:ring-teal-500/30"
                  >
                    <option value="en">English</option>
                    <option value="af">Afrikaans</option>
                  </select>
                </label>
                <label className="block min-w-0 text-xs text-zinc-500 sm:col-span-2">
                  <span className="mb-1 block font-medium text-zinc-400">Short excerpt</span>
                  <span className="mb-1 block text-[11px] font-normal text-zinc-600">
                    Shown on cards under Insights  -  one or two sentences.
                  </span>
                  <input
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    className="mt-0.5 w-full min-w-0 rounded-xl border border-white/10 bg-black/50 px-3 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:border-teal-500/40 focus:outline-none focus:ring-1 focus:ring-teal-500/30"
                    placeholder="Optional blurb for listing pages"
                  />
                </label>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <label className="block min-w-0 text-xs text-zinc-500">
                  <span className="mb-1 block font-medium text-zinc-400">SEO title (optional)</span>
                  <input
                    value={metaTitle}
                    onChange={(e) => setMetaTitle(e.target.value)}
                    className="mt-0.5 w-full min-w-0 rounded-xl border border-white/10 bg-black/50 px-3 py-2.5 text-sm text-white focus:border-teal-500/40 focus:outline-none focus:ring-1 focus:ring-teal-500/30"
                    placeholder="Browser tab title if different"
                  />
                </label>
                <label className="block min-w-0 text-xs text-zinc-500">
                  <span className="mb-1 block font-medium text-zinc-400">SEO description (optional)</span>
                  <input
                    value={metaDescription}
                    onChange={(e) => setMetaDescription(e.target.value)}
                    className="mt-0.5 w-full min-w-0 rounded-xl border border-white/10 bg-black/50 px-3 py-2.5 text-sm text-white focus:border-teal-500/40 focus:outline-none focus:ring-1 focus:ring-teal-500/30"
                    placeholder="Search / social snippet"
                  />
                </label>
              </div>

              <label className="block min-w-0 text-xs text-zinc-500">
                <span className="mb-1 block font-medium text-zinc-400">Article HTML</span>
                <span className="mb-1 block text-[11px] font-normal leading-snug text-zinc-600">
                  Only the middle of the page  -  not &lt;html&gt; or &lt;body&gt;. Scripts are removed when you publish
                  (for safety).
                </span>
                <textarea
                  value={bodyHtml}
                  onChange={(e) => setBodyHtml(e.target.value)}
                  spellCheck={false}
                  className="mt-0.5 min-h-[200px] w-full min-w-0 resize-y rounded-xl border border-white/10 bg-black/60 px-3 py-2.5 font-mono text-[13px] leading-relaxed text-teal-100/90 focus:border-teal-500/40 focus:outline-none focus:ring-1 focus:ring-teal-500/30 sm:min-h-[240px] lg:min-h-[200px]"
                />
              </label>

              <div className="rounded-xl border border-white/10 bg-black/40 p-3">
                <p className="text-xs font-medium text-zinc-300">Paste helper (recommended)</p>
                <p className="mt-1 text-[11px] leading-relaxed text-zinc-500">
                  Use this when AI output includes wrappers like &quot;Blog code&quot; or markdown fences.
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={runCleanupAiPaste}
                    className="rounded-lg border border-white/20 px-3 py-2 text-xs font-semibold text-zinc-200 hover:bg-white/5"
                  >
                    Clean pasted HTML
                  </button>
                  {markdownFenceCount > 0 && (
                    <span className="text-[11px] text-amber-300/90">
                      Found markdown fences ({markdownFenceCount}) - clean before publish.
                    </span>
                  )}
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-black/40 p-3">
                <p className="text-xs font-medium text-zinc-300">Image placeholders</p>
                <p className="mt-1 text-[11px] leading-relaxed text-zinc-500">
                  Found <strong className="text-zinc-300">{imagePlaceholderCount}</strong> occurrence
                  {imagePlaceholderCount === 1 ? "" : "s"} of <code>{IMAGE_PLACEHOLDER}</code>.
                </p>
                <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-center">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => setUploadFiles(Array.from(e.target.files ?? []))}
                    className="block w-full text-xs text-zinc-400 file:mr-3 file:rounded-lg file:border-0 file:bg-teal-600/90 file:px-3 file:py-2 file:text-xs file:font-semibold file:text-white hover:file:bg-teal-500"
                  />
                  <button
                    type="button"
                    onClick={runUploadImages}
                    disabled={isPending || uploadFiles.length === 0 || imagePlaceholderCount === 0}
                    className="rounded-lg border border-white/20 px-3 py-2 text-xs font-semibold text-zinc-200 hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Upload & replace
                  </button>
                </div>
                {uploadFiles.length > 0 && (
                  <p className="mt-1 text-[11px] text-zinc-500">
                    Selected {uploadFiles.length} file{uploadFiles.length === 1 ? "" : "s"}.
                  </p>
                )}
                {lastUploadedUrls.length > 0 && (
                  <div className="mt-2 space-y-1">
                    <p className="text-[11px] text-zinc-500">
                      Latest uploaded image URL{lastUploadedUrls.length === 1 ? "" : "s"}:
                    </p>
                    {lastUploadedUrls.slice(0, 2).map((url) => (
                      <a
                        key={url}
                        href={url}
                        target="_blank"
                        rel="noreferrer"
                        className="block truncate text-[11px] text-teal-400 hover:underline"
                      >
                        {url}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              <div className="rounded-xl border border-white/10 bg-black/40 p-3">
                <p className="text-xs font-medium text-zinc-300">YouTube helper</p>
                <p className="mt-1 text-[11px] leading-relaxed text-zinc-500">
                  Paste a YouTube URL or ID to replace <code>YOUR_VIDEO_ID</code>.
                </p>
                <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-center">
                  <input
                    value={youtubeInput}
                    onChange={(e) => setYoutubeInput(e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="min-w-0 flex-1 rounded-lg border border-white/10 bg-black/50 px-3 py-2 text-xs text-white placeholder:text-zinc-600 focus:border-teal-500/40 focus:outline-none focus:ring-1 focus:ring-teal-500/30"
                  />
                  <button
                    type="button"
                    onClick={applyYoutubeVideo}
                    disabled={!unresolvedYoutubePlaceholder}
                    className="rounded-lg border border-white/20 px-3 py-2 text-xs font-semibold text-zinc-200 hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Insert video
                  </button>
                </div>
                {!unresolvedYoutubePlaceholder && (
                  <p className="mt-1 text-[11px] text-zinc-500">No unresolved YouTube placeholder found.</p>
                )}
              </div>

              <div className="rounded-xl border border-white/10 bg-black/40 p-3">
                <p className="text-xs font-medium text-zinc-300">Pre-publish health check</p>
                <ul className="mt-2 space-y-1 text-[11px]">
                  {checklist.map((item) => (
                    <li key={item.id} className={item.ok ? "text-emerald-300" : "text-amber-300/90"}>
                      {item.ok ? "PASS" : "FIX"} - {item.label}
                      {!item.ok && item.hint ? <span className="text-zinc-500"> ({item.hint})</span> : null}
                    </li>
                  ))}
                </ul>
                {failedChecks.length > 0 ? (
                  <p className="mt-2 text-[11px] text-amber-300/90">
                    Fix {failedChecks.length} item{failedChecks.length === 1 ? "" : "s"} before publishing.
                  </p>
                ) : (
                  <p className="mt-2 text-[11px] text-emerald-300">Ready to publish.</p>
                )}
              </div>
            </div>
          </div>

          <div className="shrink-0 border-t border-white/10 bg-[#060607]/95 px-3 py-3 backdrop-blur-sm sm:px-4">
            <div className="mx-auto flex max-w-3xl flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  disabled={saveDisabled}
                  title={!basicsOk ? "Enter title and a valid slug first" : undefined}
                  onClick={runSave}
                  className="rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-black hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Save draft
                </button>
                <button
                  type="button"
                  disabled={publishDisabled}
                  title={!selectedId ? "Save draft once before publishing" : !basicsOk ? "Fix title and slug" : undefined}
                  onClick={runPublish}
                  className="rounded-full bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-teal-500 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Publish
                </button>
              </div>
              <div className="flex flex-wrap gap-2 sm:ml-auto">
                {selected?.status === "published" && (
                  <button
                    type="button"
                    disabled={isPending || !databaseConfigured}
                    onClick={runUnpublish}
                    className="rounded-full border border-white/20 px-4 py-2.5 text-sm text-zinc-200 hover:bg-white/5 disabled:opacity-40"
                  >
                    Unpublish
                  </button>
                )}
                {selected?.status !== "published" && selectedId && (
                  <button
                    type="button"
                    disabled={isPending || !databaseConfigured}
                    onClick={runDeleteDraft}
                    className="rounded-full border border-red-500/35 px-4 py-2.5 text-sm text-red-300 hover:bg-red-950/40 disabled:opacity-40"
                  >
                    Delete draft
                  </button>
                )}
              </div>
            </div>
            <p className="mx-auto mt-2 max-w-3xl text-[11px] leading-snug text-zinc-600">
              <strong className="text-zinc-500">Save draft</strong> = safe, private. <strong className="text-zinc-500">Publish</strong>{" "}
              = visible on the site. Questions? Contact AS Brokers  -  you don&apos;t need to edit code.
            </p>
          </div>
        </section>

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
    </div>
  );
}
