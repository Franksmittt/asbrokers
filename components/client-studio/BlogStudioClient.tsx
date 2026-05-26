"use client";

import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import {
  deleteStudioPost,
  getStudioUploadDiagnostics,
  publishStudioPost,
  saveStudioPost,
  unpublishStudioPost,
} from "@/app/studio/blog/actions";
import {
  CALCULATOR_CODE_SNIPPETS,
  isEmbedReadyCalculatorSnippet,
} from "@/lib/client-studio/calculator-code-pack";
import {
  INSIGHT_CATEGORIES,
  INSIGHT_CATEGORY_LABEL_BY_VALUE,
  normalizeInsightCategories,
  type InsightCategoryValue,
} from "@/lib/insights/insightCategories";
import type { SerializableNotebookNote } from "@/lib/client-studio/notebook-types";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export type SerializableStudioPost = {
  id: string;
  slug: string;
  locale: "en" | "af";
  title: string;
  excerpt: string | null;
  categories: string[];
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
  databaseLoadError: string | null;
  imageUploadConfigured: boolean;
  studioConfigured: boolean;
  allowBulkDelete: boolean;
};

const STUDIO_SELECT_CLASS =
  "w-full rounded-lg border border-white/15 bg-zinc-950 p-2.5 text-sm text-zinc-50 shadow-inner outline-none focus:border-teal-500/40 [&>option]:bg-zinc-950 [&>option]:text-zinc-50";
const STUDIO_FIELD_CLASS =
  "w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-teal-500/40";
const STUDIO_FIELD_LABEL_CLASS =
  "mb-1 block text-xs font-bold uppercase tracking-[0.14em] text-zinc-300";
const STUDIO_FIELD_HINT_CLASS = "mt-1 text-[11px] leading-relaxed text-zinc-500";
const RECENT_BLOG_POSTS_LIMIT = 5;
const STUDIO_WIP_STORAGE_KEY = "asbrokers-blog-studio-wip";
const WIP_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;

type StudioWipSnapshot = {
  savedAt: string;
  selectedId: string | null;
  title: string;
  slug: string;
  excerpt: string;
  categories: string[];
  metaTitle: string;
  metaDescription: string;
  rawHtml: string;
  imageUrls: Record<number, string>;
  calcSelection: Record<number, string>;
  videoUrls: Record<number, string>;
};

const IMAGE_TOKEN = "[IMAGE_SLOT]";
const CALC_TOKEN = "[CALCULATOR_SLOT]";
const VIDEO_TOKEN = "[VIDEO_SLOT]";
const TARGET_UPLOAD_BYTES = 900 * 1024;
const MAX_UPLOAD_IMAGE_SIDE = 1600;

const SAMPLE_HTML = `<section class="space-y-10" style="color:#e5e7eb;max-width:1040px;margin:0 auto;">
  <header style="padding:clamp(32px,6vw,64px) 0 24px;border-bottom:1px solid rgba(255,255,255,0.12);">
    <p style="margin:0 0 14px;color:#5eead4;font-size:12px;font-weight:800;letter-spacing:0.18em;text-transform:uppercase;">AS Brokers insight</p>
    <h1 style="margin:0;max-width:860px;color:#ffffff;font-size:clamp(38px,7vw,68px);line-height:0.96;letter-spacing:-0.055em;">Your retirement strategy in uncertain markets</h1>
    <p style="margin:24px 0 0;max-width:760px;color:#d4d4d8;font-size:20px;line-height:1.75;">Start with a clear, resilient plan. This article explains practical actions for long-term investors while keeping risk, liquidity, and advice at the centre.</p>
  </header>

  [IMAGE_SLOT]

  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:clamp(24px,4vw,48px);align-items:start;">
    <aside style="border-left:3px solid #2dd4bf;padding-left:20px;color:#99f6e4;font-size:18px;line-height:1.7;">
      A good plan should feel calm, measurable, and easy to review - not like a collection of disconnected products.
    </aside>
    <div>
      <h2 style="margin:0 0 14px;color:#ffffff;font-size:clamp(28px,4vw,38px);letter-spacing:-0.035em;">How to structure your capital</h2>
      <p style="margin:0 0 18px;color:#d4d4d8;font-size:17px;line-height:1.9;">Use advice, evidence, and realistic assumptions to separate short-term noise from long-term decisions.</p>
      <p style="margin:0;color:#a1a1aa;font-size:17px;line-height:1.9;">The aim is not to predict every market move, but to keep your income, liquidity, tax, and legacy goals working together.</p>
    </div>
  </div>

  [CALCULATOR_SLOT]

  <blockquote style="margin:0;border-top:1px solid rgba(255,255,255,0.12);border-bottom:1px solid rgba(255,255,255,0.12);padding:28px 0;color:#fef3c7;font-size:clamp(22px,4vw,34px);line-height:1.35;letter-spacing:-0.03em;">
    "The best financial plan is one you can understand, review, and adjust before pressure forces a decision."
  </blockquote>

  [VIDEO_SLOT]

  <section style="border:1px solid rgba(255,255,255,0.10);background:rgba(255,255,255,0.045);border-radius:28px;padding:clamp(24px,4vw,36px);">
    <h2 style="margin:0 0 14px;color:#ffffff;font-size:30px;letter-spacing:-0.03em;">Final checklist</h2>
    <ul style="margin:0;padding-left:22px;color:#e5e7eb;line-height:1.9;">
      <li>Confirm the plan still fits your retirement timeline.</li>
      <li>Review risk, tax, liquidity, and beneficiary considerations.</li>
      <li>Speak to an AS Brokers adviser before implementing major changes.</li>
    </ul>
  </section>

  [IMAGE_SLOT]
</section>`;

const SAMPLE_IMAGES_CALCULATOR_HTML = SAMPLE_HTML.replace(`
  <blockquote style="margin:0;border-top:1px solid rgba(255,255,255,0.12);border-bottom:1px solid rgba(255,255,255,0.12);padding:28px 0;color:#fef3c7;font-size:clamp(22px,4vw,34px);line-height:1.35;letter-spacing:-0.03em;">
    "The best financial plan is one you can understand, review, and adjust before pressure forces a decision."
  </blockquote>

  [VIDEO_SLOT]

`, "");

const SAMPLE_IMAGES_VIDEO_HTML = SAMPLE_HTML.replace(`
  [CALCULATOR_SLOT]

`, "");

const SAMPLE_CALCULATOR_VIDEO_HTML = SAMPLE_HTML.replaceAll(`
  [IMAGE_SLOT]

`, "");

const BRAND_GUIDE_TEXT = `AS Brokers Blog Brand Guide
- Brand: AS Brokers CC, FSP 17273. Premium South African financial guidance with a calm, expert, trustworthy voice.
- Visual direction: luxury dark interface, rim-light glassmorphism, Apple Pro simplicity, Samsung Galaxy-style teal/gold energy.
- Core colours: void black #050506, shark #1D1D1F, card #121214, white text, zinc supporting text, teal accent #2dd4bf, emerald success, restrained supernova gold.
- Style: mobile-first, generous spacing, rounded sections, concise paragraphs, confident headings, no clutter.
- Tone: explain clearly, avoid hype, be practical and reassuring. Speak to clients who want a professional review, not DIY speculation.
- Trust hallmarks: include responsible language where relevant, such as "speak to an AS Brokers adviser" and avoid guaranteed-return claims.`;

const BLOG_RULES_TEXT = `Universal blog-post rules
- Return only clean article body HTML that can be pasted into the Blog Studio textarea.
- Do not return markdown fences, a full <html> document, <script>, <style>, custom JavaScript, iframes, or calculator code.
- The output must look like the AS Brokers website, not a plain black-and-white article.
- Aim for an editorial magazine layout, not a stack of rigid pill boxes.
- Use one strong hero/header, then flowing article sections, side notes, pull quotes, selective callouts, and optional <ul>/<ol> checklists.
- Use Tailwind-friendly classes when useful, but do not rely on classes alone. Add inline styles for the main visual look because pasted blog HTML is dynamic content.
- Required visual style: dark background-compatible content, white headings, zinc body text, teal highlights, very restrained gold accents, soft borders, generous spacing, and premium typography.
- Use gradients sparingly. One subtle hero glow or one CTA/callout is enough. Do not put every section in a gradient box.
- Keep roughly 60 percent of the article open and flowing, with only 40 percent in cards/callouts.
- Use cards only for important summaries, checklist areas, calculator/video intros, or key warnings.
- Style lists so they feel designed, but avoid making every bullet a separate pill.
- Image placeholders should sit between editorial sections. Do not wrap placeholder tokens inside broken tags.
- Calculator and video placeholders should have a short restrained intro immediately before them so the inserted component feels intentional.
- Use the exact placeholders requested below. The studio detects every placeholder and creates the upload/select/link controls.
- Never invent image URLs, calculator embeds, or video embeds. Leave the placeholder token exactly where that item must appear.
- Keep the content educational and compliant: no guaranteed outcomes, no personalised advice without a review, and mention that market values can rise or fall.`;

const COPY_PROMPT_PRESETS = [
  {
    id: "fullhouse",
    title: "Fullhouse",
    includes: "Images + calculator + video",
    hover: "Copies the brand guide plus rules for image uploads, one calculator choice, and a video link.",
    rules: [
      `Use ${IMAGE_TOKEN} for every image position. Add as many image slots as the article genuinely needs.`,
      `Include ${CALC_TOKEN} once where the Studio user must choose an interactive calculator.`,
      `Include ${VIDEO_TOKEN} once where the Studio user must paste a video link.`,
    ],
    exampleHtml: SAMPLE_HTML,
  },
  {
    id: "images-calculator",
    title: "Images + Calculator",
    includes: "Image upload slots + calculator only",
    hover: "Copies the brand guide plus rules for image uploads and a calculator, with no video slot.",
    rules: [
      `Use ${IMAGE_TOKEN} for every image position. The studio will show one upload control per image slot.`,
      `Include ${CALC_TOKEN} once where the calculator should appear.`,
      `Do not include ${VIDEO_TOKEN}.`,
    ],
    exampleHtml: SAMPLE_IMAGES_CALCULATOR_HTML,
  },
  {
    id: "images-video",
    title: "Images + Video",
    includes: "Image upload slots + video only",
    hover: "Copies the brand guide plus rules for image uploads and a video link, with no calculator slot.",
    rules: [
      `Use ${IMAGE_TOKEN} for every image position. Add two or more if the article needs visual breaks.`,
      `Include ${VIDEO_TOKEN} once where the Studio user must paste the video link.`,
      `Do not include ${CALC_TOKEN}.`,
    ],
    exampleHtml: SAMPLE_IMAGES_VIDEO_HTML,
  },
  {
    id: "calculator-video",
    title: "Calculator + Video",
    includes: "Calculator + video only",
    hover: "Copies the brand guide plus rules for a calculator and video link, with no image upload slots.",
    rules: [
      `Include ${CALC_TOKEN} once where the Studio user must choose an interactive calculator.`,
      `Include ${VIDEO_TOKEN} once where the Studio user must paste the video link.`,
      `Do not include ${IMAGE_TOKEN}. Use this only when the article should not request image uploads.`,
    ],
    exampleHtml: SAMPLE_CALCULATOR_VIDEO_HTML,
  },
] as const;

type CopyPromptPreset = (typeof COPY_PROMPT_PRESETS)[number];

function buildCopyMePrompt(preset: CopyPromptPreset): string {
  return `${BRAND_GUIDE_TEXT}

${BLOG_RULES_TEXT}

This copy preset is: ${preset.title}
It includes: ${preset.includes}

Placeholder rules for this post:
${preset.rules.map((rule) => `- ${rule}`).join("\n")}

Example structure the AI may follow:

${preset.exampleHtml}

Writing task:
- Topic: [CLIENT WILL TYPE THE BLOG TOPIC HERE]
- Audience: AS Brokers clients and prospects in South Africa.
- Output: article body HTML only, ready to paste into Blog Studio.`;
}

function slugifyTitle(title: string): string {
  return title
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 160);
}

function newDraftSlug(): string {
  return `client-blog-draft-${Date.now().toString(36)}`;
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

function safeUploadFilename(name: string): string {
  const normalized = name.normalize("NFKD").replace(/[^\x00-\x7F]/g, "");
  const safe = normalized.replace(/[^a-zA-Z0-9._-]+/g, "-").replace(/-+/g, "-");
  return safe || "studio-image.jpg";
}

function buildPreviewDoc(html: string): string {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/>
  <style>
    *{box-sizing:border-box}
    html{color-scheme:dark}
    body{margin:0;padding:clamp(1rem,3vw,2.5rem);background:radial-gradient(circle at 18% 0%,rgba(45,212,191,.20),transparent 28%),radial-gradient(circle at 92% 10%,rgba(245,158,11,.12),transparent 26%),#050506;color:#f4f4f5;font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;line-height:1.78}
    section,article,div,header,footer,aside,blockquote,figure{max-width:100%}
    body *{opacity:1;filter:none;mix-blend-mode:normal}
    h1,h2,h3{color:#fff;letter-spacing:-.04em}
    h1{font-size:clamp(2.55rem,7vw,4.6rem);line-height:.96}
    h2{font-size:clamp(1.85rem,4vw,2.55rem);line-height:1.08}
    h3{font-size:clamp(1.35rem,3vw,1.9rem);line-height:1.16}
    p,li{color:#e4e4e7}
    a{color:#2dd4bf}
    blockquote{color:#fef3c7}
    img{max-width:100%;height:auto;border-radius:24px;border:1px solid rgba(255,255,255,.12);box-shadow:0 22px 60px rgba(0,0,0,.32)}
    iframe{max-width:100%;border:0;border-radius:24px;box-shadow:0 22px 60px rgba(0,0,0,.32)}
    [class~="space-y-4"]>:not([hidden])~:not([hidden]){margin-top:1rem}
    [class~="space-y-6"]>:not([hidden])~:not([hidden]){margin-top:1.5rem}
    [class~="space-y-8"]>:not([hidden])~:not([hidden]){margin-top:2rem}
    [class~="space-y-10"]>:not([hidden])~:not([hidden]){margin-top:2.5rem}
    [class~="grid"]{display:grid}
    [class~="gap-3"]{gap:.75rem}[class~="gap-4"]{gap:1rem}[class~="gap-6"]{gap:1.5rem}[class~="gap-8"]{gap:2rem}
    [class~="list-disc"]{list-style:disc}[class~="list-none"]{list-style:none}
    [class~="pl-6"]{padding-left:1.5rem}[class~="p-6"]{padding:1.5rem}[class~="rounded-2xl"]{border-radius:1rem}[class~="rounded-3xl"]{border-radius:1.5rem}
    [class~="text-white"]{color:#fff}[class~="text-zinc-100"]{color:#f4f4f5}[class~="text-zinc-200"]{color:#e4e4e7}[class~="text-zinc-300"]{color:#d4d4d8}[class~="text-zinc-400"]{color:#a1a1aa}
    [class~="text-teal-200"]{color:#99f6e4}[class~="text-teal-300"]{color:#5eead4}[class~="text-teal-400"]{color:#2dd4bf}[class~="text-emerald-300"]{color:#6ee7b7}[class~="text-amber-200"]{color:#fde68a}[class~="text-amber-300"]{color:#fcd34d}[class~="text-orange-200"]{color:#fed7aa}
    [class~="bg-white/5"]{background:rgba(255,255,255,.07)}[class~="bg-black/30"]{background:rgba(0,0,0,.30)}[class~="bg-teal-500/10"]{background:rgba(20,184,166,.12)}[class~="bg-amber-500/10"]{background:rgba(245,158,11,.12)}
    [class~="border"]{border-width:1px;border-style:solid}[class~="border-white/10"]{border-color:rgba(255,255,255,.13)}[class~="border-teal-500/30"]{border-color:rgba(20,184,166,.35)}[class~="border-amber-500/30"]{border-color:rgba(245,158,11,.35)}
    .slot{margin:1.75rem 0;padding:1rem;border:1px dashed rgba(45,212,191,.58);border-radius:1rem;background:rgba(45,212,191,.12);color:#ccfbf1}
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

function escapeHtmlAttr(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function formatStudioDate(iso: string | null): string {
  if (!iso) return "Not published";
  return new Date(iso).toLocaleDateString("en-ZA", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
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
        const replacementUrl = imageUrls[imageIndex];
        const replacement = replacementUrl
          ? `<figure style="margin:34px 0;"><img src="${escapeHtmlAttr(
              replacementUrl
            )}" alt="Article image ${imageIndex + 1}" loading="lazy" style="display:block;width:100%;height:auto;border:1px solid rgba(255,255,255,0.12);border-radius:24px;box-shadow:0 22px 60px rgba(0,0,0,0.32);" /></figure>`
          : IMAGE_TOKEN;
        imageIndex += 1;
        return replacement;
      }
      if (part === CALC_TOKEN) {
        const selected = calculatorSelection[calcIndex] ?? "";
        calcIndex += 1;
        const snippet = selected ? snippetById.get(selected) : null;
        return snippet
          ? `<div style="margin:34px 0;border-top:1px solid rgba(45,212,191,0.30);border-bottom:1px solid rgba(255,255,255,0.10);padding:clamp(18px,3vw,28px) 0;">${snippet}</div>`
          : CALC_TOKEN;
      }
      if (part === VIDEO_TOKEN) {
        const selected = (videoUrls[videoIndex] ?? "").trim();
        videoIndex += 1;
        if (!selected) return VIDEO_TOKEN;
        const youtubeId = extractYoutubeId(selected);
        if (youtubeId) {
          return `<div style="margin:34px 0;"><iframe src="https://www.youtube.com/embed/${youtubeId}" title="YouTube video" loading="lazy" allowfullscreen style="display:block;width:100%;min-height:360px;border:1px solid rgba(255,255,255,0.12);border-radius:24px;box-shadow:0 22px 60px rgba(0,0,0,0.32);"></iframe></div>`;
        }
        return `<p style="margin:24px 0;"><a href="${escapeHtmlAttr(selected)}" target="_blank" rel="noreferrer" style="display:inline-flex;border:1px solid rgba(45,212,191,0.35);background:rgba(45,212,191,0.10);border-radius:999px;padding:12px 18px;color:#99f6e4;text-decoration:none;font-weight:700;">Watch video</a></p>`;
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
    databaseLoadError,
    imageUploadConfigured,
    studioConfigured,
  } = props;
  void props.initialNotebookNotes;
  void props.allowBulkDelete;

  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const copyResetTimer = useRef<number | null>(null);
  const [localPosts, setLocalPosts] = useState(initialPosts);

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [currentPostStatus, setCurrentPostStatus] = useState<string>("draft");
  const [title, setTitle] = useState("Client Blog Draft");
  const [slug, setSlug] = useState(() => newDraftSlug());
  const [excerpt, setExcerpt] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
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
  const [isPreviewFullscreen, setIsPreviewFullscreen] = useState(false);
  const [banner, setBanner] = useState<string | null>(null);
  const [successBanner, setSuccessBanner] = useState<string | null>(null);
  const [copiedPromptId, setCopiedPromptId] = useState<string | null>(null);
  const [status, setStatus] = useState("Ready to Edit");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [showAllPosts, setShowAllPosts] = useState(false);
  const [lifecyclePostId, setLifecyclePostId] = useState<string | null>(null);
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(null);
  const [wipRestoreOffer, setWipRestoreOffer] = useState<StudioWipSnapshot | null>(null);

  const embedReadySnippets = useMemo(
    () => CALCULATOR_CODE_SNIPPETS.filter(isEmbedReadyCalculatorSnippet),
    []
  );
  const snippetById = useMemo(
    () => new Map(embedReadySnippets.map((s) => [s.id, s.code])),
    [embedReadySnippets]
  );
  const sortedPosts = useMemo(
    () =>
      [...localPosts].sort(
        (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      ),
    [localPosts]
  );
  const recentPosts = useMemo(
    () => sortedPosts.slice(0, RECENT_BLOG_POSTS_LIMIT),
    [sortedPosts]
  );

  useEffect(() => {
    setLocalPosts(initialPosts);
  }, [initialPosts]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STUDIO_WIP_STORAGE_KEY);
      if (!raw) return;
      const wip = JSON.parse(raw) as StudioWipSnapshot;
      if (Date.now() - new Date(wip.savedAt).getTime() > WIP_MAX_AGE_MS) {
        localStorage.removeItem(STUDIO_WIP_STORAGE_KEY);
        return;
      }
      setWipRestoreOffer(wip);
    } catch {
      localStorage.removeItem(STUDIO_WIP_STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const snapshot: StudioWipSnapshot = {
          savedAt: new Date().toISOString(),
          selectedId,
          title,
          slug,
          excerpt,
          categories: normalizeInsightCategories(selectedCategories),
          metaTitle,
          metaDescription,
          rawHtml,
          imageUrls,
          calcSelection,
          videoUrls,
        };
        localStorage.setItem(STUDIO_WIP_STORAGE_KEY, JSON.stringify(snapshot));
      } catch {
        /* quota or private mode */
      }
    }, 1500);
    return () => window.clearTimeout(timer);
  }, [
    selectedId,
    title,
    slug,
    excerpt,
    selectedCategories,
    metaTitle,
    metaDescription,
    rawHtml,
    imageUrls,
    calcSelection,
    videoUrls,
  ]);

  useEffect(() => {
    if (!showAllPosts) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setShowAllPosts(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [showAllPosts]);

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
  const postCategoriesReady = selectedCategories.length > 0;
  const step2Ready = missingImages === 0;
  const step3Ready = missingCalcs === 0 && missingVideos === 0;
  const canPublish = postDetailsReady && step2Ready && step3Ready && postCategoriesReady;

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
  if (!studioConfigured) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <h1 className="mb-3 text-xl font-semibold text-white">Insights studio is off</h1>
        <p className="text-sm text-zinc-400">Set CLIENT_STUDIO_PASSWORD on the server and reload this page.</p>
      </div>
    );
  }

  function resetSlotState() {
    setSlotFiles({});
    setImageUrls({});
    setUploadingSlots({});
    setSlotMessages({});
    setCalcSelection({});
    setVideoUrls({});
  }

  function clearStudioWip() {
    try {
      localStorage.removeItem(STUDIO_WIP_STORAGE_KEY);
    } catch {
      /* ignore */
    }
    setWipRestoreOffer(null);
  }

  function restoreStudioWip(wip: StudioWipSnapshot) {
    setSelectedId(wip.selectedId);
    setTitle(wip.title);
    setSlug(wip.slug);
    setExcerpt(wip.excerpt);
    setSelectedCategories(wip.categories ?? []);
    setMetaTitle(wip.metaTitle);
    setMetaDescription(wip.metaDescription);
    setRawHtml(wip.rawHtml || SAMPLE_HTML);
    setImageUrls(wip.imageUrls);
    setCalcSelection(wip.calcSelection);
    setVideoUrls(wip.videoUrls);
    setSlotFiles({});
    setUploadingSlots({});
    setSlotMessages({});
    if (wip.selectedId) {
      const post = localPosts.find((item) => item.id === wip.selectedId);
      setCurrentPostStatus(post?.status ?? "draft");
    } else {
      setCurrentPostStatus("draft");
    }
    clearStudioWip();
    setStatus("Restored unsaved work");
    setBanner("Restored your last session from this browser. Click Save draft to store it in the database.");
  }

  function startNewDraft() {
    setSelectedId(null);
    setCurrentPostStatus("draft");
    setTitle("Client Blog Draft");
    setSlug(newDraftSlug());
    setExcerpt("");
    setSelectedCategories([]);
    setRawHtml(SAMPLE_HTML);
    setMetaTitle("");
    setMetaDescription("");
    resetSlotState();
    clearStudioWip();
    setLastSavedAt(null);
    setStatus("New draft");
    setBanner("Started a new draft. Save it to keep editing later.");
  }

  function loadExistingPost(postId: string) {
    if (!postId) {
      startNewDraft();
      return;
    }
    const post = localPosts.find((item) => item.id === postId);
    if (!post) {
      setBanner("Could not find that post in the current workspace list.");
      return;
    }
    const categories = normalizeInsightCategories(post.categories);
    setSelectedId(post.id);
    setCurrentPostStatus(post.status);
    setTitle(post.title);
    setSlug(post.slug);
    setExcerpt(post.excerpt ?? "");
    setSelectedCategories(categories);
    setRawHtml(post.bodyHtml || post.bodyHtmlPublished || SAMPLE_HTML);
    setMetaTitle(post.metaTitle ?? "");
    setMetaDescription(post.metaDescription ?? "");
    resetSlotState();
    if (post.heroImageUrl) {
      setImageUrls({ 0: post.heroImageUrl });
    }
    setLastSavedAt(post.updatedAt);
    setStatus(post.status === "published" ? "Editing published post" : "Editing draft");
    setBanner(
      categories.length === 0
        ? `Loaded "${post.title}". This older post has no categories yet — tick one or more in Step 4, then Save.`
        : `Loaded "${post.title}" for editing.`
    );
    requestAnimationFrame(() => {
      document.getElementById("studio-categories")?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
  }

  function openPostForEditing(postId: string) {
    loadExistingPost(postId);
    setShowAllPosts(false);
  }

  function togglePostLive(post: SerializableStudioPost) {
    startTransition(async () => {
      if (!databaseConfigured) {
        setBanner("Studio storage is not connected.");
        return;
      }
      setLifecyclePostId(post.id);
      try {
        if (post.status === "published") {
          const result = await unpublishStudioPost(post.id);
          if (!result.ok) {
            setBanner(result.error);
            return;
          }
          setLocalPosts((prev) =>
            prev.map((item) =>
              item.id === post.id
                ? { ...item, status: "draft", bodyHtmlPublished: null, publishedAt: null, updatedAt: new Date().toISOString() }
                : item
            )
          );
          if (selectedId === post.id) {
            setCurrentPostStatus("draft");
          }
          setBanner(`"${post.title}" is hidden from Insights.`);
        } else {
          const savedCategories = normalizeInsightCategories(post.categories);
          const editingThisPost = selectedId === post.id;
          const effectiveCategories = editingThisPost ? selectedCategories : savedCategories;

          if (effectiveCategories.length === 0) {
            openPostForEditing(post.id);
            setBanner(
              "Add at least one category in Step 4 (tick boxes), click Save draft, then publish or switch Live on."
            );
            return;
          }

          if (editingThisPost) {
            const derivedTitle = title.trim() || firstH1(rawHtml) || post.title;
            const derivedSlug = slug.trim() || slugifyTitle(derivedTitle);
            const normalized = normalizeAiHtml(resolvedForPersist);
            const saveRes = await saveStudioPost(post.id, {
              title: derivedTitle,
              slug: derivedSlug,
              locale: "en",
              excerpt: excerpt.trim() || null,
              categories: normalizeInsightCategories(selectedCategories),
              bodyHtml: normalized,
              heroImageUrl: imageUrls[0] ?? post.heroImageUrl,
              metaTitle: metaTitle.trim() || derivedTitle,
              metaDescription: metaDescription.trim() || excerpt.trim() || null,
              calculatorName: null,
              calculatorCode: null,
            });
            if (!saveRes.ok) {
              setBanner(saveRes.error);
              return;
            }
            setLocalPosts((prev) =>
              prev.map((item) =>
                item.id === post.id
                  ? {
                      ...item,
                      title: derivedTitle,
                      slug: derivedSlug,
                      excerpt: excerpt.trim() || null,
                      categories: normalizeInsightCategories(selectedCategories),
                      bodyHtml: normalized,
                      updatedAt: new Date().toISOString(),
                    }
                  : item
              )
            );
          }

          const result = await publishStudioPost(post.id);
          if (!result.ok) {
            setBanner(result.error);
            return;
          }
          const publishedAt = new Date().toISOString();
          setLocalPosts((prev) =>
            prev.map((item) =>
              item.id === post.id
                ? {
                    ...item,
                    status: "published",
                    bodyHtmlPublished: item.bodyHtml,
                    categories: editingThisPost ? selectedCategories : item.categories,
                    publishedAt,
                    updatedAt: publishedAt,
                  }
                : item
            )
          );
          if (selectedId === post.id) {
            setCurrentPostStatus("published");
          }
          setBanner(`"${post.title}" is live on Insights.`);
        }
        router.refresh();
      } finally {
        setLifecyclePostId(null);
      }
    });
  }

  function removePost(post: SerializableStudioPost) {
    if (!window.confirm(`Delete "${post.title}" permanently? This cannot be undone.`)) {
      return;
    }
    startTransition(async () => {
      if (!databaseConfigured) {
        setBanner("Studio storage is not connected.");
        return;
      }
      setLifecyclePostId(post.id);
      try {
        const result = await deleteStudioPost(post.id);
        if (!result.ok) {
          setBanner(result.error);
          return;
        }
        setLocalPosts((prev) => prev.filter((item) => item.id !== post.id));
        if (selectedId === post.id) {
          startNewDraft();
        }
        setBanner(`"${post.title}" was deleted.`);
        router.refresh();
      } finally {
        setLifecyclePostId(null);
      }
    });
  }

  function renderPostPickerButton(post: SerializableStudioPost) {
    const isActive = selectedId === post.id;
    const isLive = post.status === "published";
    const isBusy = lifecyclePostId === post.id;
    return (
      <div
        key={post.id}
        className={`rounded-lg border px-3 py-3 transition ${
          isActive ? "border-teal-500/40 bg-teal-500/10" : "border-white/10 bg-black/25"
        }`}
      >
        <div className="flex items-start gap-3">
          <button
            type="button"
            onClick={() => openPostForEditing(post.id)}
            className="min-w-0 flex-1 text-left"
          >
            <div className="flex items-start justify-between gap-3">
              <span className="text-sm font-semibold text-zinc-100">{post.title}</span>
              <span
                className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                  isLive ? "bg-emerald-500/15 text-emerald-200" : "bg-white/10 text-zinc-300"
                }`}
              >
                {isLive ? "Live" : "Draft"}
              </span>
            </div>
            <p className="mt-1 text-xs text-zinc-500">
              Updated {formatStudioDate(post.updatedAt)}
              {post.publishedAt ? ` · Published ${formatStudioDate(post.publishedAt)}` : ""}
            </p>
            {normalizeInsightCategories(post.categories).length > 0 ? (
              <p className="mt-2 flex flex-wrap gap-1.5">
                {normalizeInsightCategories(post.categories).map((value) => (
                  <span
                    key={`${post.id}-${value}`}
                    className="rounded-full border border-teal-500/25 bg-teal-500/10 px-2 py-0.5 text-[10px] font-semibold text-teal-100"
                  >
                    {INSIGHT_CATEGORY_LABEL_BY_VALUE[value as InsightCategoryValue]}
                  </span>
                ))}
              </p>
            ) : (
              <p className="mt-2 text-[10px] font-semibold uppercase tracking-wide text-amber-300/90">
                No categories yet
              </p>
            )}
          </button>
          <div className="flex shrink-0 flex-col items-end gap-2">
            <button
              type="button"
              role="switch"
              aria-checked={isLive}
              aria-label={isLive ? `Hide ${post.title} from Insights` : `Show ${post.title} on Insights`}
              disabled={isBusy || isPending}
              onClick={() => togglePostLive(post)}
              className={`relative h-7 w-12 rounded-full border transition ${
                isLive
                  ? "border-emerald-400/50 bg-emerald-500/30"
                  : "border-white/15 bg-white/10"
              } disabled:cursor-not-allowed disabled:opacity-50`}
            >
              <span
                className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition ${
                  isLive ? "left-6" : "left-0.5"
                }`}
              />
            </button>
            <span className="text-[10px] font-semibold uppercase tracking-wide text-zinc-500">
              {isBusy ? "Saving..." : isLive ? "On Insights" : "Hidden"}
            </span>
            <button
              type="button"
              onClick={() => removePost(post)}
              disabled={isBusy || isPending}
              className="rounded-md border border-red-500/30 bg-red-500/10 px-2 py-1 text-[11px] font-semibold text-red-200 hover:bg-red-500/15 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Delete
            </button>
          </div>
        </div>
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
      const correlationId =
        typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
      const safeName = safeUploadFilename(uploadFile.name);
      const authRes = await fetch("/api/studio/upload/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-correlation-id": correlationId,
        },
        body: JSON.stringify({
          filename: safeName,
          contentType: uploadFile.type || "image/jpeg",
          fileSize: uploadFile.size,
        }),
      });
      let authPayload: {
        ok?: boolean;
        path?: string;
        bucket?: string;
        token?: string;
        error?: string;
        correlationId?: string;
      } = {};
      try {
        authPayload = (await authRes.json()) as {
          ok?: boolean;
          path?: string;
          bucket?: string;
          token?: string;
          error?: string;
          correlationId?: string;
        };
      } catch {
        authPayload = {};
      }
      if (!authRes.ok || !authPayload.ok || !authPayload.path || !authPayload.bucket || !authPayload.token) {
        const detail =
          authPayload.error ||
          (authRes.status === 413
            ? "Image is still too large after optimization. Use a smaller file and retry."
            : `Upload session failed (HTTP ${authRes.status}). Please retry.`);
        setBanner(detail);
        setSlotMessages((prev) => ({ ...prev, [index]: detail }));
        return;
      }

      const browserSupabase = createSupabaseBrowserClient();
      const uploadResult = await browserSupabase.storage
        .from(authPayload.bucket)
        .uploadToSignedUrl(authPayload.path, authPayload.token, uploadFile, {
          upsert: false,
          contentType: uploadFile.type || "image/jpeg",
        });

      if (uploadResult.error) {
        const detail = `Direct upload failed: ${uploadResult.error.message}`;
        setBanner(detail);
        setSlotMessages((prev) => ({ ...prev, [index]: detail }));
        return;
      }

      const finalUrl = `/api/studio/media?bucket=${encodeURIComponent(authPayload.bucket)}&path=${encodeURIComponent(
        authPayload.path
      )}`;
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

  async function copyPromptPreset(preset: CopyPromptPreset) {
    try {
      await navigator.clipboard.writeText(buildCopyMePrompt(preset));
      setBanner(null);
      setCopiedPromptId(preset.id);
      setSuccessBanner(`Copied! ${preset.title} brand guide and blog rules are ready to paste into AI.`);
      if (copyResetTimer.current) {
        window.clearTimeout(copyResetTimer.current);
      }
      copyResetTimer.current = window.setTimeout(() => {
        setCopiedPromptId(null);
        setSuccessBanner(null);
      }, 2800);
    } catch {
      setSuccessBanner(null);
      setBanner("Clipboard blocked. Please allow clipboard access and click the preset again.");
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
        setBanner("Studio storage is not connected. Save/Publish cannot run.");
        return;
      }
      if (publish && !canPublish) {
        setBanner(
          "Complete all steps first: upload images, choose calculator/video for each slot, fill title/slug/excerpt, and select categories."
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
        categories: normalizeInsightCategories(selectedCategories),
        bodyHtml: normalized,
        heroImageUrl: hero,
        metaTitle: metaTitle.trim() || derivedTitle,
        metaDescription: metaDescription.trim() || excerpt.trim() || null,
        calculatorName: null,
        calculatorCode: null,
      });
      if (!saveRes.ok) {
        setBanner(
          saveRes.error.includes("categories")
            ? `${saveRes.error} Run npm run db:push if the categories column is missing.`
            : saveRes.error
        );
        return;
      }
      setSelectedId(saveRes.id);
      setTitle(derivedTitle);
      setSlug(derivedSlug);
      const savedPost: SerializableStudioPost = {
        id: saveRes.id,
        slug: derivedSlug,
        locale: "en",
        title: derivedTitle,
        excerpt: excerpt.trim() || null,
        categories: normalizeInsightCategories(selectedCategories),
        bodyHtml: normalized,
        bodyHtmlPublished: currentPostStatus === "published" ? normalized : null,
        status: currentPostStatus === "published" ? "published" : "draft",
        metaTitle: metaTitle.trim() || derivedTitle,
        metaDescription: metaDescription.trim() || excerpt.trim() || null,
        heroImageUrl: hero,
        calculatorName: null,
        calculatorCode: null,
        publishedAt: currentPostStatus === "published" ? new Date().toISOString() : null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setLocalPosts((prev) => {
        const exists = prev.some((post) => post.id === saveRes.id);
        if (!exists) return [savedPost, ...prev];
        return prev.map((post) =>
          post.id === saveRes.id
            ? {
                ...post,
                ...savedPost,
                createdAt: post.createdAt,
                publishedAt: post.status === "published" ? post.publishedAt ?? savedPost.publishedAt : savedPost.publishedAt,
              }
            : post
        );
      });
      if (!publish) {
        clearStudioWip();
        setLastSavedAt(new Date().toISOString());
        setStatus(currentPostStatus === "published" ? "Published post saved" : "Draft saved");
        setBanner(currentPostStatus === "published" ? "Published post updated successfully." : "Draft saved successfully.");
        router.refresh();
        return;
      }
      const pub = await publishStudioPost(saveRes.id);
      if (!pub.ok) {
        setBanner(pub.error);
        return;
      }
      setCurrentPostStatus("published");
      setLocalPosts((prev) =>
        prev.map((post) =>
          post.id === saveRes.id
            ? {
                ...post,
                status: "published",
                bodyHtmlPublished: normalized,
                heroImageUrl: hero,
                publishedAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              }
            : post
        )
      );
      clearStudioWip();
      setLastSavedAt(new Date().toISOString());
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
            {currentPostStatus === "published" ? "Save Live Changes" : "Save Draft"}
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
        {databaseLoadError && (
          <div className="rounded-xl border border-amber-500/35 bg-amber-500/10 px-4 py-3 text-sm text-amber-100 lg:col-span-12">
            {databaseLoadError}
          </div>
        )}
        <div className="space-y-6 lg:col-span-5">
          <section className="rounded-xl border border-white/10 bg-[#121214] p-6 shadow-sm">
            <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-teal-300">Blog library</p>
                <h2 className="mt-1 text-xl font-bold text-white">Open an existing blog post</h2>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  Load any saved draft or published article, edit the HTML/details, then save or publish again.
                </p>
              </div>
              <button
                type="button"
                onClick={startNewDraft}
                className="rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-xs font-semibold text-zinc-100 hover:bg-white/10"
              >
                Start new draft
              </button>
            </div>
            <select
              value={selectedId ?? ""}
              onChange={(e) => loadExistingPost(e.target.value)}
              className={STUDIO_SELECT_CLASS}
            >
              <option value="">New unsaved draft</option>
              {sortedPosts.map((post) => (
                <option key={post.id} value={post.id}>
                  {post.status === "published" ? "Published" : "Draft"} - {post.title} ({formatStudioDate(post.updatedAt)})
                </option>
              ))}
            </select>
            {selectedId && (
              <div className="mt-3 rounded-lg border border-white/10 bg-black/25 p-3 text-xs text-zinc-400">
                <span className="font-semibold text-zinc-200">Currently editing:</span>{" "}
                {currentPostStatus === "published" ? "Published post" : "Draft"}.
                {currentPostStatus === "published"
                  ? " Saving changes updates the live article; use Publish again after slot changes."
                  : " Save Draft keeps this article available here for later editing."}
              </div>
            )}
          </section>

          <section id="copy-me" className="scroll-mt-24 rounded-xl border border-emerald-500/25 bg-emerald-950/10 p-6 shadow-sm">
            <div className="mb-4">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-300">Copy me</p>
              <h2 className="mt-1 text-xl font-bold text-white">Copy the brand guide and blog rules</h2>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                Choose what this article needs, copy the preset, then paste it into AI with the blog topic. The AI
                should return HTML with the exact slot tokens for this studio.
              </p>
            </div>
            {successBanner && (
              <div className="mb-4 rounded-lg border border-emerald-400/40 bg-emerald-500/15 px-4 py-3 text-sm font-semibold text-emerald-100">
                {successBanner}
              </div>
            )}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {COPY_PROMPT_PRESETS.map((preset) => (
                <div key={preset.id} className="group relative">
                  <div className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 w-64 -translate-x-1/2 rounded-lg border border-white/10 bg-black px-3 py-2 text-xs leading-relaxed text-zinc-200 opacity-0 shadow-xl transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
                    {preset.hover}
                  </div>
                  <button
                    type="button"
                    title={preset.hover}
                    onClick={() => void copyPromptPreset(preset)}
                    className="h-full w-full rounded-xl border border-white/10 bg-black/30 p-4 text-left transition hover:border-emerald-400/50 hover:bg-emerald-500/10 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
                  >
                    <span className="block text-sm font-bold text-white">{preset.title}</span>
                    <span className="mt-1 block text-xs text-zinc-400">{preset.includes}</span>
                    <span
                      className={`mt-3 inline-flex rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide ${
                        copiedPromptId === preset.id
                          ? "bg-emerald-400 text-emerald-950"
                          : "bg-white/5 text-emerald-200"
                      }`}
                    >
                      {copiedPromptId === preset.id ? "Copied!" : "Copy prompt"}
                    </span>
                  </button>
                </div>
              ))}
            </div>
            <p className="mt-4 rounded-lg border border-white/10 bg-black/25 p-3 text-xs leading-relaxed text-zinc-400">
              Slot reminder: every {IMAGE_TOKEN} becomes an upload field below, every {CALC_TOKEN} becomes a
              calculator selector, and every {VIDEO_TOKEN} becomes a video-link field.
            </p>
          </section>

          <div className="rounded-xl border border-white/10 bg-[#121214] p-6 shadow-sm">
            <div className="mb-3">
              <label className="block text-lg font-bold text-white">Step 1: Paste AI Blog Code</label>
            </div>
            <p className="mb-2 text-sm text-zinc-400">
              Paste raw HTML from AI. The studio detects each placeholder and creates image, calculator, and video
              controls below. Do not paste calculator scripts manually.
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
            <p className="mb-3 text-sm text-zinc-400">
              The number of upload boxes comes directly from the {IMAGE_TOKEN} placeholders in the pasted HTML.
            </p>
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
            <div className="mb-3 flex items-center justify-between gap-3">
              <h2 className="text-lg font-bold text-white">Step 3: Select Calculators & Videos</h2>
              <span className="text-xs font-semibold text-zinc-400">
                {calcCount} calculator / {videoCount} video
              </span>
            </div>
            <p className="mb-3 text-sm text-zinc-400">
              Choose one calculator for each {CALC_TOKEN} and paste one video link for each {VIDEO_TOKEN}.
            </p>
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
                    className={STUDIO_SELECT_CLASS}
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
            <h2 className="mb-1 text-lg font-bold text-white">Step 4: Post Details</h2>
            <p className="mb-4 text-sm text-zinc-400">
              Each field keeps its label while you type. Save stores title, slug, article HTML, images, and
              calculator choices so a refresh will not lose your work.
            </p>
            {wipRestoreOffer && (
              <div className="mb-4 rounded-lg border border-amber-500/35 bg-amber-500/10 p-3">
                <p className="text-sm text-amber-100">
                  Unsaved work found from{" "}
                  {new Date(wipRestoreOffer.savedAt).toLocaleString("en-ZA", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                  .
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => restoreStudioWip(wipRestoreOffer)}
                    className="rounded-md bg-amber-400 px-3 py-1.5 text-xs font-bold text-amber-950"
                  >
                    Restore session
                  </button>
                  <button
                    type="button"
                    onClick={clearStudioWip}
                    className="rounded-md border border-white/15 px-3 py-1.5 text-xs font-semibold text-zinc-200"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            )}
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label htmlFor="studio-post-title" className={STUDIO_FIELD_LABEL_CLASS}>
                  Article title <span className="text-teal-400">*</span>
                </label>
                <input
                  id="studio-post-title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Inflation Risk in Retirement"
                  className={STUDIO_FIELD_CLASS}
                  autoComplete="off"
                />
                <p className={STUDIO_FIELD_HINT_CLASS}>Main headline on the published insights page.</p>
              </div>
              <div>
                <label htmlFor="studio-post-slug" className={STUDIO_FIELD_LABEL_CLASS}>
                  URL slug <span className="text-teal-400">*</span>
                </label>
                <input
                  id="studio-post-slug"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="e.g. inflation-risk-retirement"
                  className={`${STUDIO_FIELD_CLASS} font-mono`}
                  autoComplete="off"
                />
                <p className={STUDIO_FIELD_HINT_CLASS}>Lowercase words separated by hyphens. Used in /insights/your-slug.</p>
              </div>
              <div>
                <label htmlFor="studio-post-excerpt" className={STUDIO_FIELD_LABEL_CLASS}>
                  Short summary <span className="text-teal-400">*</span>
                </label>
                <textarea
                  id="studio-post-excerpt"
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="One or two sentences for the insights listing card"
                  rows={3}
                  className={STUDIO_FIELD_CLASS}
                />
                <p className={STUDIO_FIELD_HINT_CLASS}>Shown under the title on the insights feed.</p>
              </div>
              <div id="studio-categories">
                <label className={STUDIO_FIELD_LABEL_CLASS}>
                  Categories <span className="text-teal-400">*</span>
                </label>
                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-3">
                  {INSIGHT_CATEGORIES.map((cat) => {
                    const checked = selectedCategories.includes(cat.value);
                    return (
                      <label key={cat.value} className="inline-flex items-center gap-2 text-sm text-zinc-300">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() =>
                            setSelectedCategories((prev) =>
                              prev.includes(cat.value) ? prev.filter((v) => v !== cat.value) : [...prev, cat.value]
                            )
                          }
                        />
                        <span className="select-none">{cat.label}</span>
                      </label>
                    );
                  })}
                </div>
                <p className={STUDIO_FIELD_HINT_CLASS}>
                  Pick one or more so clients can filter on the Insights page. Older posts can be updated here any
                  time — tick categories, then Save draft (or Save live changes).
                </p>
              </div>
              <div>
                <label htmlFor="studio-post-meta-title" className={STUDIO_FIELD_LABEL_CLASS}>
                  SEO title <span className="font-normal normal-case tracking-normal text-zinc-500">(optional)</span>
                </label>
                <input
                  id="studio-post-meta-title"
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                  placeholder="Search result title — defaults to article title"
                  className={STUDIO_FIELD_CLASS}
                  autoComplete="off"
                />
              </div>
              <div>
                <label htmlFor="studio-post-meta-description" className={STUDIO_FIELD_LABEL_CLASS}>
                  SEO description <span className="font-normal normal-case tracking-normal text-zinc-500">(optional)</span>
                </label>
                <textarea
                  id="studio-post-meta-description"
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  placeholder="Search snippet — defaults to short summary"
                  rows={2}
                  className={STUDIO_FIELD_CLASS}
                />
              </div>
            </div>
            {imageUrls[0] && (
              <div className="mt-4 flex items-center space-x-3 rounded-lg border border-white/10 bg-black/30 p-3">
                <img src={imageUrls[0]} alt="Thumbnail" className="h-12 w-12 rounded border border-white/10 object-cover" />
                <p className="text-xs text-zinc-400">Cover thumbnail auto-mapped from Image Slot #1.</p>
              </div>
            )}
            <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-white/10 pt-4">
              <button
                type="button"
                onClick={() => saveOrPublish(false)}
                disabled={isPending || !databaseConfigured}
                className="rounded-lg border border-teal-500/40 bg-teal-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-teal-500 disabled:opacity-50"
              >
                {isPending ? "Saving…" : currentPostStatus === "published" ? "Save live changes" : "Save draft"}
              </button>
              {lastSavedAt && (
                <p className="text-xs text-zinc-500">
                  Last saved {formatStudioDate(lastSavedAt)} at{" "}
                  {new Date(lastSavedAt).toLocaleTimeString("en-ZA", { hour: "2-digit", minute: "2-digit" })}
                </p>
              )}
              {!databaseConfigured && (
                <p className="text-xs text-amber-300">Connect the database before saving.</p>
              )}
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#121214] p-6 shadow-sm">
            <h2 className="mb-3 text-lg font-bold text-white">Detected Slots</h2>
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="rounded-lg border border-white/10 bg-black/30 p-3">
                <span className="block text-lg font-bold text-emerald-300">{imageCount}</span>
                <span className="text-zinc-400">Images</span>
              </div>
              <div className="rounded-lg border border-white/10 bg-black/30 p-3">
                <span className="block text-lg font-bold text-emerald-300">{calcCount}</span>
                <span className="text-zinc-400">Calculators</span>
              </div>
              <div className="rounded-lg border border-white/10 bg-black/30 p-3">
                <span className="block text-lg font-bold text-emerald-300">{videoCount}</span>
                <span className="text-zinc-400">Videos</span>
              </div>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-zinc-400">
              If the AI adds more placeholders, these counts and the required upload/select fields update
              automatically.
            </p>
          </div>

          <section className="rounded-xl border border-white/10 bg-[#121214] p-6 shadow-sm">
            <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-teal-300">Recent posts</p>
                <h2 className="mt-1 text-lg font-bold text-white">Jump back into a saved article</h2>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  Open a post to edit it. Use the switch to show or hide it on Insights, or delete it permanently.
                </p>
              </div>
              {sortedPosts.length > RECENT_BLOG_POSTS_LIMIT && (
                <button
                  type="button"
                  onClick={() => setShowAllPosts(true)}
                  className="rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-xs font-semibold text-zinc-100 hover:bg-white/10"
                >
                  View all ({sortedPosts.length})
                </button>
              )}
            </div>

            {!databaseConfigured ? (
              <p className="text-sm text-zinc-500">Connect the database to load saved posts here.</p>
            ) : databaseLoadError ? (
              <p className="text-sm text-amber-200">{databaseLoadError}</p>
            ) : sortedPosts.length === 0 ? (
              <p className="text-sm text-zinc-500">No saved posts yet. Save a draft to see it here.</p>
            ) : (
              <div className="space-y-2">{recentPosts.map((post) => renderPostPickerButton(post))}</div>
            )}
          </section>
        </div>

        <div className="lg:col-span-7">
          <div className="flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-[#121214] shadow-sm">
            <div className="flex items-center justify-between border-b border-white/10 bg-black/30 px-6 py-4">
              <span className="text-lg font-bold text-white">Step 5: Review &amp; Publish</span>
              <div className="flex flex-wrap items-center justify-end gap-2">
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
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("preview");
                    setIsPreviewFullscreen(true);
                  }}
                  className="rounded-lg border border-teal-500/35 bg-teal-500/10 px-3 py-2 text-xs font-semibold text-teal-100 hover:bg-teal-500/15"
                >
                  Fullscreen preview
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
              <p className={postCategoriesReady ? "text-emerald-300" : "text-amber-300"}>
                {postCategoriesReady ? "PASS" : "FIX"} Categories selected
              </p>
              <p className={canPublish ? "text-emerald-300" : "text-amber-300"}>
                {canPublish ? "READY" : "NOT READY"} for publish
              </p>
            </div>

            {activeTab === "preview" ? (
              <div className="flex-1 overflow-y-auto p-4">
                <iframe
                  title="Live reading preview"
                  sandbox="allow-same-origin allow-scripts allow-forms"
                  className="h-[70vh] w-full rounded-lg border border-white/10 bg-[#050506] opacity-100"
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

      {showAllPosts && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-8"
          onClick={() => setShowAllPosts(false)}
        >
          <div
            className="flex max-h-[min(80vh,720px)] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#121214] shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3 border-b border-white/10 px-5 py-4">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-teal-300">All saved posts</p>
                <h2 className="mt-1 text-lg font-bold text-white">Choose an article to edit</h2>
                <p className="mt-1 text-sm text-zinc-400">{sortedPosts.length} saved posts, newest first.</p>
              </div>
              <button
                type="button"
                onClick={() => setShowAllPosts(false)}
                className="rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-xs font-semibold text-zinc-100 hover:bg-white/10"
              >
                Close
              </button>
            </div>
            <div className="space-y-2 overflow-y-auto px-5 py-4">
              {sortedPosts.map((post) => renderPostPickerButton(post))}
            </div>
          </div>
        </div>
      )}

      {isPreviewFullscreen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-[#050506] text-white">
          <div className="flex shrink-0 items-center justify-between border-b border-white/10 bg-[#0a0a0c] px-4 py-3">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-teal-300">Fullscreen preview</p>
              <h2 className="text-sm font-semibold text-white">{title || "Untitled blog post"}</h2>
            </div>
            <button
              type="button"
              onClick={() => setIsPreviewFullscreen(false)}
              className="rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-zinc-100 hover:bg-white/10"
            >
              Close
            </button>
          </div>
          <iframe
            title="Fullscreen live reading preview"
            sandbox="allow-same-origin allow-scripts allow-forms"
            className="min-h-0 flex-1 border-0 bg-[#050506] opacity-100"
            srcDoc={previewSrcDoc}
          />
        </div>
      )}

      {(successBanner || banner) && (
        <div
          className={`fixed bottom-4 right-4 max-w-xl rounded-lg border px-4 py-3 text-sm shadow-lg ${
            successBanner
              ? "border-emerald-400/40 bg-emerald-500 text-emerald-950"
              : "border-white/10 bg-[#121214] text-zinc-200"
          }`}
        >
          {successBanner || banner}
        </div>
      )}
    </div>
  );
}

