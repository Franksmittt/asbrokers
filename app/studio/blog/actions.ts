"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { createHash, randomUUID, timingSafeEqual } from "crypto";

import { sanitizeInsightBody } from "@/lib/client-studio/sanitize-body";
import { countImageUploadSlots } from "@/lib/client-studio/image-slots";
import {
  clearClientStudioSession,
  getClientStudioSession,
  isClientStudioConfigured,
  setClientStudioSessionToken,
} from "@/lib/client-studio/session";
import {
  insertStudioPostForActions,
  loadStudioPostForActions,
  publishStudioPostForActions,
  revertStudioPostToDraftForActions,
  deleteStudioPostForActions,
  updatePublishedStudioPostBodyForActions,
  updateStudioPostForActions,
} from "@/lib/client-studio/studio-posts-write";
import { unresolvedPublishSlotMessage } from "@/lib/client-studio/publish-slots";
import {
  ensureStudioBlogImagesBucket,
  isStudioPostsStorageConfigured,
  STUDIO_BLOG_IMAGE_FILE_SIZE_LIMIT,
  STUDIO_BLOG_IMAGE_MIME_TYPES,
} from "@/lib/client-studio/studio-storage";
import { clientInsightPosts, getDb } from "@/lib/db";
import { collectErrorText, missingClientInsightOptionalColumns } from "@/lib/db/pg-error-chain";
import { getSupabaseService } from "@/lib/supabase/server";
import {
  INSIGHT_CATEGORIES,
  normalizeInsightCategories,
  resolveInsightCategories,
  withEmbeddedCategoryMarker,
} from "@/lib/insights/insightCategories";
import {
  extractStudioBodyMetadata,
  firstImageSrcFromHtml,
} from "@/lib/client-studio/studio-body-metadata";

const STUDIO_ALLOWED_IMAGE_TYPES = new Set<string>(STUDIO_BLOG_IMAGE_MIME_TYPES);

const INSIGHT_CATEGORY_VALUES = INSIGHT_CATEGORIES.map((c) => c.value) as [string, ...string[]];

const postBaseSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(300),
  slug: z
    .string()
    .trim()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers, and single hyphens only.")
    .max(160),
  locale: z.enum(["en", "af"]),
  excerpt: z.string().trim().max(2000).optional().nullable(),
  categories: z.array(z.enum(INSIGHT_CATEGORY_VALUES)).default([]),
  bodyHtml: z.string().max(500_000).default(""),
  heroImageUrl: z.string().trim().max(2000).optional().nullable(),
  metaTitle: z.string().trim().max(70).optional().nullable(),
  metaDescription: z.string().trim().max(200).optional().nullable(),
  calculatorName: z.string().trim().max(140).optional().nullable(),
  calculatorCode: z.string().max(250_000).optional().nullable(),
});

type PublishReport = {
  checkedRoute: boolean;
  checkedImages: number;
  notes: string[];
};

function studioSchemaDriftMessage(action: "save" | "publish", error: unknown): string | null {
  const missing = missingClientInsightOptionalColumns(error);
  if (!missing.categories && !missing.calculators) return null;
  const columns = [
    missing.categories ? "categories" : null,
    missing.calculators ? "hero/calculator" : null,
  ].filter(Boolean);
  return `Could not ${action} because the Blog Studio database is missing the latest ${columns.join(
    " and "
  )} columns. The app tried to repair this automatically; if it still fails, run npm run db:repair-studio and retry.`;
}

function verifyStudioPassword(plain: string): boolean {
  const expected = process.env.CLIENT_STUDIO_PASSWORD?.trim();
  if (!expected) return false;
  const normalized = plain.trim();
  const a = createHash("sha256").update(normalized, "utf8").digest();
  const b = createHash("sha256").update(expected, "utf8").digest();
  return timingSafeEqual(a, b);
}

async function requireStudioSession() {
  if (!(await getClientStudioSession())) {
    throw new Error("Not signed in.");
  }
}

function isAllowedHeroImageUrl(value: string): boolean {
  if (value.startsWith("/api/studio/media?")) return true;
  return /^https?:\/\//i.test(value);
}

function extractHttpImageUrls(html: string, maxUrls = 2): string[] {
  const urls: string[] = [];
  const re = /<img\b[^>]*\bsrc\s*=\s*["']([^"']+)["'][^>]*>/gi;
  let match: RegExpExecArray | null;
  while ((match = re.exec(html)) !== null) {
    const src = (match[1] ?? "").trim();
    if (!src) continue;
    if (!/^https?:\/\//i.test(src)) continue;
    urls.push(src);
    if (urls.length >= maxUrls) break;
  }
  return urls;
}

function resolveSiteOrigin(): string | null {
  const preferred =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    process.env.SITE_URL?.trim() ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim() ||
    process.env.VERCEL_URL?.trim() ||
    "";
  if (!preferred) return null;
  const normalized = /^https?:\/\//i.test(preferred) ? preferred : `https://${preferred}`;
  try {
    return new URL(normalized).origin;
  } catch {
    return null;
  }
}

async function verifyPublishedHtmlHealth(
  html: string,
  slug: string,
  locale: "en" | "af"
): Promise<{ error: string | null; checkedRoute: boolean; checkedImages: number; notes: string[] }> {
  const notes: string[] = [];
  if (!html.trim()) {
    return { error: "Published HTML is empty.", checkedRoute: false, checkedImages: 0, notes };
  }
  if (countImageUploadSlots(html) > 0) {
    return {
      error: "Unresolved image placeholders were detected after publish.",
      checkedRoute: false,
      checkedImages: 0,
      notes,
    };
  }

  // Lightweight smoke check on up to 2 remote images.
  const remoteUrls = extractHttpImageUrls(html, 2);
  let checkedImages = 0;
  for (const url of remoteUrls) {
    try {
      const res = await fetch(url, { method: "HEAD", redirect: "follow", cache: "no-store" });
      if (!res.ok) {
        notes.push(`Image check warning for ${url} (HTTP ${res.status}).`);
        continue;
      }
      checkedImages += 1;
    } catch {
      notes.push(`Image check warning for ${url} (network error).`);
      continue;
    }
  }
  const origin = resolveSiteOrigin();
  if (!origin) {
    notes.push("Route smoke test skipped because SITE URL env is not configured.");
    return { error: null, checkedRoute: false, checkedImages, notes };
  }
  try {
    const pageRes = await fetch(`${origin}/insights/${encodeURIComponent(slug)}?locale=${locale}`, {
      method: "GET",
      redirect: "follow",
      cache: "no-store",
    });
    if (!pageRes.ok) {
      notes.push(`Live route warning for /insights/${slug}?locale=${locale} (HTTP ${pageRes.status}).`);
      return { error: null, checkedRoute: true, checkedImages, notes };
    }
    const htmlText = await pageRes.text();
    if (!htmlText.includes("<article")) {
      notes.push(`Live route warning: article markup missing on /insights/${slug}?locale=${locale}.`);
      return { error: null, checkedRoute: true, checkedImages, notes };
    }
  } catch {
    notes.push(`Live route warning for /insights/${slug}?locale=${locale} (network error).`);
    return { error: null, checkedRoute: true, checkedImages, notes };
  }
  return { error: null, checkedRoute: true, checkedImages, notes };
}

export async function studioLogin(
  formData: FormData
): Promise<{ ok: true; next: string } | { ok: false; error: string }> {
  const password = String(formData.get("password") ?? "");
  const nextRaw = String(formData.get("next") ?? "/studio/blog/workspace");
  const next = nextRaw.startsWith("/studio/blog") ? nextRaw : "/studio/blog/workspace";

  if (!isClientStudioConfigured()) {
    return { ok: false, error: "Insights studio is not configured yet (missing password on server)." };
  }
  if (!verifyStudioPassword(password)) {
    return { ok: false, error: "Incorrect password." };
  }

  await setClientStudioSessionToken();
  return { ok: true, next };
}

export async function studioLogout(): Promise<void> {
  await clearClientStudioSession();
  redirect("/studio/blog/login");
}

export async function saveStudioPost(
  id: string | null,
  raw: z.infer<typeof postBaseSchema>
): Promise<{ ok: true; id: string } | { ok: false; error: string }> {
  try {
    await requireStudioSession();
  } catch {
    return { ok: false, error: "Session expired  -  sign in again." };
  }

  if (!isStudioPostsStorageConfigured()) {
    return { ok: false, error: "Studio storage is not connected yet." };
  }

  const parsed = postBaseSchema.safeParse(raw);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }
  const v = parsed.data;
  const resolvedCategories = normalizeInsightCategories(v.categories);
  const bodyHtmlWithCategoryMarker = withEmbeddedCategoryMarker(v.bodyHtml, resolvedCategories);
  const heroImageUrl = (v.heroImageUrl ?? "").trim();
  if (heroImageUrl && !isAllowedHeroImageUrl(heroImageUrl)) {
    return {
      ok: false,
      error: "Hero image must be an uploaded studio image or a valid http(s) URL.",
    };
  }
  const now = new Date();
  const sanitizedForLive = sanitizeInsightBody(bodyHtmlWithCategoryMarker);
  const unresolvedSlots = unresolvedPublishSlotMessage(bodyHtmlWithCategoryMarker);

  try {
    if (id) {
      const existing = await loadStudioPostForActions(id);
      if (!existing) return { ok: false, error: "Post not found." };

      if (existing.status === "published") {
        if (!sanitizedForLive.trim()) {
          return { ok: false, error: "Live articles need some HTML content before saving." };
        }
        if (unresolvedSlots) {
          return { ok: false, error: unresolvedSlots };
        }
      }

      const oldSlug = existing.slug;
      const writable = {
        title: v.title,
        slug: v.slug,
        locale: v.locale,
        excerpt: v.excerpt ?? null,
        categories: resolvedCategories,
        bodyHtml: bodyHtmlWithCategoryMarker,
        heroImageUrl: heroImageUrl || null,
        metaTitle: v.metaTitle ?? null,
        metaDescription: v.metaDescription ?? null,
        calculatorName: v.calculatorName ?? null,
        calculatorCode: v.calculatorCode ?? null,
      };

      await updateStudioPostForActions(id, writable, now);
      if (existing.status === "published") {
        await updatePublishedStudioPostBodyForActions(id, sanitizedForLive, now);
      }
      revalidatePath("/");
      revalidatePath("/insights");
      revalidatePath(`/insights/${v.slug}`);
      if (existing.status === "published" && oldSlug !== v.slug) {
        revalidatePath(`/insights/${oldSlug}`);
      }
      revalidatePath("/studio/blog/workspace");
      return { ok: true, id };
    }

    const writable = {
      title: v.title,
      slug: v.slug,
      locale: v.locale,
      excerpt: v.excerpt ?? null,
      categories: resolvedCategories,
      bodyHtml: bodyHtmlWithCategoryMarker,
      heroImageUrl: heroImageUrl || null,
      metaTitle: v.metaTitle ?? null,
      metaDescription: v.metaDescription ?? null,
      calculatorName: v.calculatorName ?? null,
      calculatorCode: v.calculatorCode ?? null,
    };

    const newId = await insertStudioPostForActions(writable, now);
    revalidatePath("/");
    revalidatePath("/insights");
    revalidatePath("/studio/blog/workspace");
    return { ok: true, id: newId };
  } catch (e) {
    const code = e && typeof e === "object" && "code" in e ? String((e as { code?: unknown }).code) : "";
    if (code === "23505") {
      return {
        ok: false,
        error: "That URL slug already exists for this language. Change the slug.",
      };
    }
    const schemaMessage = studioSchemaDriftMessage("save", e);
    if (schemaMessage) return { ok: false, error: schemaMessage };
    const detail = collectErrorText(e).slice(0, 320);
    return {
      ok: false,
      error: detail ? `Could not save: ${detail}` : "Could not save. Check your connection or try again.",
    };
  }
}

export async function publishStudioPost(
  id: string
): Promise<{ ok: true; report: PublishReport } | { ok: false; error: string }> {
  try {
    await requireStudioSession();
  } catch {
    return { ok: false, error: "Session expired  -  sign in again." };
  }

  if (!isStudioPostsStorageConfigured()) {
    return { ok: false, error: "Studio storage is not connected." };
  }

  const row = await loadStudioPostForActions(id);
  if (!row) return { ok: false, error: "Post not found." };

  const localeRaw = String(row.locale ?? "en").toLowerCase();
  const localeSafe: "en" | "af" = localeRaw === "af" ? "af" : "en";

  const parsed = postBaseSchema.safeParse({
    title: row.title,
    slug: row.slug,
    locale: localeSafe,
    excerpt: row.excerpt,
    categories: normalizeInsightCategories(row.categories),
    bodyHtml: row.bodyHtml,
    heroImageUrl: row.heroImageUrl,
    metaTitle: row.metaTitle,
    metaDescription: row.metaDescription,
    calculatorName: row.calculatorName,
    calculatorCode: row.calculatorCode,
  });
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Fix fields before publishing." };
  }
  const resolvedCategories = resolveInsightCategories(
    parsed.data.categories,
    row.bodyHtml,
    row.bodyHtmlPublished
  );
  if (resolvedCategories.length === 0) {
    return {
      ok: false,
      error:
        "Select at least one category in Step 4 (tick boxes), save the post, then publish.",
    };
  }
  const bodyMeta = extractStudioBodyMetadata(row.bodyHtml);
  const metaHeroImageUrl = bodyMeta.metadata?.imageUrls?.["0"]?.trim() ?? "";
  const heroImageUrl = (parsed.data.heroImageUrl ?? "").trim() || metaHeroImageUrl || firstImageSrcFromHtml(row.bodyHtml) || "";
  if (!heroImageUrl) {
    return {
      ok: false,
      error:
        "Add a hero image before publishing (used for insights thumbnail). If this field does not save, run npm run db:push to add the latest studio columns.",
    };
  }
  if (!isAllowedHeroImageUrl(heroImageUrl)) {
    return {
      ok: false,
      error: "Hero image must be an uploaded studio image or a valid http(s) URL.",
    };
  }

  const sanitized = sanitizeInsightBody(row.bodyHtml);
  if (!sanitized.trim()) {
    return { ok: false, error: "Add some HTML content before publishing." };
  }
  const unresolvedSlots = unresolvedPublishSlotMessage(row.bodyHtml);
  if (unresolvedSlots) {
    return { ok: false, error: unresolvedSlots };
  }

  const now = new Date();
  try {
    await publishStudioPostForActions(id, sanitized, heroImageUrl, now);
  } catch (e) {
    const schemaMessage = studioSchemaDriftMessage("publish", e);
    if (schemaMessage) return { ok: false, error: schemaMessage };
    const detail = collectErrorText(e).slice(0, 320);
    return {
      ok: false,
      error: detail ? `Could not publish: ${detail}` : "Could not publish. Check your connection or try again.",
    };
  }

  revalidatePath("/");
  revalidatePath("/insights");
  revalidatePath(`/insights/${row.slug}`);

  const health = await verifyPublishedHtmlHealth(sanitized, row.slug, localeSafe);
  if (health.error) {
    try {
      await revertStudioPostToDraftForActions(id, new Date());
    } catch {
      return {
        ok: false,
        error:
          `Publish verification failed and automatic recovery also failed: ${health.error}`,
      };
    }
    return {
      ok: false,
      error:
        `Publish verification failed: ${health.error} Automatic recovery moved this post back to draft mode.`,
    };
  }
  return {
    ok: true,
    report: {
      checkedRoute: health.checkedRoute,
      checkedImages: health.checkedImages,
      notes: health.notes,
    },
  };
}

export async function unpublishStudioPost(id: string): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    await requireStudioSession();
  } catch {
    return { ok: false, error: "Session expired  -  sign in again." };
  }

  if (!isStudioPostsStorageConfigured()) {
    return { ok: false, error: "Studio storage is not connected." };
  }

  const row = await loadStudioPostForActions(id);
  if (!row) return { ok: false, error: "Post not found." };

  await revertStudioPostToDraftForActions(id, new Date());

  revalidatePath("/");
  revalidatePath("/insights");
  revalidatePath(`/insights/${row.slug}`);
  revalidatePath("/studio/blog/workspace");
  return { ok: true };
}

/** Permanently removes a draft or published studio post (owner correction / takedown). */
export async function deleteStudioPost(id: string): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    await requireStudioSession();
  } catch {
    return { ok: false, error: "Session expired  -  sign in again." };
  }

  if (!isStudioPostsStorageConfigured()) {
    return { ok: false, error: "Studio storage is not connected." };
  }

  const row = await loadStudioPostForActions(id);
  if (!row) return { ok: false, error: "Post not found." };

  const slug = row.slug;
  await deleteStudioPostForActions(id);

  revalidatePath("/");
  revalidatePath("/insights");
  revalidatePath(`/insights/${slug}`);
  revalidatePath("/studio/blog/workspace");
  return { ok: true };
}

/** @deprecated Prefer deleteStudioPost, same behaviour (drafts and live posts). */
export async function deleteStudioDraft(id: string): Promise<{ ok: true } | { ok: false; error: string }> {
  return deleteStudioPost(id);
}

export async function uploadStudioImage(
  formData: FormData
): Promise<{ ok: true; url: string } | { ok: false; error: string }> {
  try {
    await requireStudioSession();
  } catch {
    return { ok: false, error: "Session expired  -  sign in again." };
  }

  const file = formData.get("file");
  if (!(file instanceof File)) {
    return { ok: false, error: "No file received." };
  }
  if (!STUDIO_ALLOWED_IMAGE_TYPES.has(file.type.toLowerCase())) {
    return { ok: false, error: "Only PNG, JPG, and WEBP images are supported." };
  }
  if (file.size > STUDIO_BLOG_IMAGE_FILE_SIZE_LIMIT) {
    return { ok: false, error: "Image is too large (max 20MB)." };
  }

  try {
    const supabase = getSupabaseService();
    if (!supabase) {
      return { ok: false, error: "Image upload is not configured on the server yet." };
    }

    const { bucket } = await ensureStudioBlogImagesBucket();
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]+/g, "-");
    const ext = safeName.includes(".") ? safeName.split(".").pop() : "jpg";
    const key = `studio/${new Date().toISOString().slice(0, 10)}/${randomUUID()}.${ext}`;
    const bytes = await file.arrayBuffer();

    const uploaded = await supabase.storage.from(bucket).upload(key, bytes, {
      contentType: file.type,
      upsert: false,
    });
    if (uploaded.error) {
      return { ok: false, error: `Upload failed: ${uploaded.error.message}` };
    }

    const proxyUrl = `/api/studio/media?bucket=${encodeURIComponent(bucket)}&path=${encodeURIComponent(key)}`;
    // Return app-hosted media URL so preview + published work even when bucket is private.
    return { ok: true, url: proxyUrl };
  } catch (e) {
    const detail = collectErrorText(e).slice(0, 320);
    return {
      ok: false,
      error: detail ? `Upload failed: ${detail}` : "Upload failed on the server. Check Supabase configuration.",
    };
  }
}

export async function getStudioUploadDiagnostics(): Promise<{
  ok: boolean;
  summary: string;
  checks: string[];
}> {
  const checks: string[] = [];
  try {
    await requireStudioSession();
    checks.push("Session check: OK");
  } catch {
    return {
      ok: false,
      summary: "Session expired - sign in again.",
      checks: ["Session check: FAILED"],
    };
  }

  const publicUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL ?? "").trim();
  const serviceKey = (process.env.SUPABASE_SERVICE_ROLE_KEY ?? "").trim();
  checks.push(publicUrl ? "NEXT_PUBLIC_SUPABASE_URL: set" : "NEXT_PUBLIC_SUPABASE_URL: missing");
  checks.push(serviceKey ? "SUPABASE_SERVICE_ROLE_KEY: set" : "SUPABASE_SERVICE_ROLE_KEY: missing");

  let supabase;
  try {
    supabase = getSupabaseService();
  } catch (e) {
    const detail = collectErrorText(e).slice(0, 220);
    return {
      ok: false,
      summary: detail ? `Supabase service init failed: ${detail}` : "Supabase service init failed.",
      checks,
    };
  }
  if (!supabase) {
    return {
      ok: false,
      summary: "Supabase service client is not available (env/config issue).",
      checks,
    };
  }

  const bucket = (process.env.SUPABASE_BLOG_IMAGES_BUCKET ?? "blog-images").trim();
  checks.push(`Target bucket: ${bucket}`);

  try {
    const ensured = await ensureStudioBlogImagesBucket();
    checks.push(ensured.created ? "Bucket existed: no, created now" : "Bucket exists: yes");
  } catch (e) {
    const detail = collectErrorText(e).slice(0, 220);
    return {
      ok: false,
      summary: detail ? `Storage check crashed: ${detail}` : "Storage check crashed unexpectedly.",
      checks,
    };
  }

  return {
    ok: true,
    summary: "Upload diagnostics passed. Client-side file or network issues are more likely now.",
    checks,
  };
}

export async function sanitizeStudioHtmlPreview(
  rawHtml: string
): Promise<{ ok: true; html: string } | { ok: false; error: string }> {
  try {
    await requireStudioSession();
  } catch {
    return { ok: false, error: "Session expired  -  sign in again." };
  }

  return { ok: true, html: sanitizeInsightBody(rawHtml) };
}

export async function deleteAllStudioPosts(
  confirmationText: string
): Promise<{ ok: true; deleted: number } | { ok: false; error: string }> {
  try {
    await requireStudioSession();
  } catch {
    return { ok: false, error: "Session expired  -  sign in again." };
  }
  if ((process.env.CLIENT_STUDIO_ENABLE_BULK_DELETE ?? "").trim().toLowerCase() !== "true") {
    return { ok: false, error: "Bulk delete is disabled for safety." };
  }
  if (confirmationText.trim() !== "DELETE ALL") {
    return { ok: false, error: 'Bulk delete cancelled. Type "DELETE ALL" exactly.' };
  }

  const db = getDb();
  if (!db) return { ok: false, error: "Database is not connected." };

  try {
    const deleted = await db.delete(clientInsightPosts).returning({ id: clientInsightPosts.id });
    revalidatePath("/");
    revalidatePath("/insights");
    revalidatePath("/studio/blog/workspace");
    return { ok: true, deleted: deleted.length };
  } catch {
    return { ok: false, error: "Could not delete studio posts." };
  }
}

/**
 * Manual cache clear for Albert after publish: refreshes Next.js cached HTML for
 * home, insights feed, and every published article so the live site shows updates.
 */
export async function clearWebsiteCache(): Promise<
  { ok: true; refreshed: number } | { ok: false; error: string }
> {
  try {
    await requireStudioSession();
  } catch {
    return { ok: false, error: "Session expired — sign in again." };
  }

  try {
    const { listPublishedStudioPosts } = await import("@/lib/client-studio/posts");
    const published = await listPublishedStudioPosts();

    revalidatePath("/", "layout");
    revalidatePath("/insights", "layout");
    revalidatePath("/insights", "page");
    revalidatePath("/sitemap.xml");
    revalidatePath("/studio/blog/workspace");

    const seen = new Set<string>();
    for (const post of published) {
      const slug = post.slug?.trim();
      if (!slug || seen.has(slug)) continue;
      seen.add(slug);
      revalidatePath(`/insights/${slug}`, "page");
    }

    return { ok: true, refreshed: seen.size + 3 };
  } catch (error) {
    console.error("[studio] clearWebsiteCache failed:", error);
    return { ok: false, error: "Could not clear website cache. Try again in a moment." };
  }
}
