"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { createHash, randomUUID, timingSafeEqual } from "crypto";

import { sanitizeInsightBody } from "@/lib/client-studio/sanitize-body";
import {
  clearClientStudioSession,
  getClientStudioSession,
  isClientStudioConfigured,
  setClientStudioSessionToken,
} from "@/lib/client-studio/session";
import { clientInsightPosts, getDb } from "@/lib/db";
import { getSupabaseService } from "@/lib/supabase/server";

const postBaseSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(300),
  slug: z
    .string()
    .trim()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers, and single hyphens only.")
    .max(160),
  locale: z.enum(["en", "af"]),
  excerpt: z.string().trim().max(2000).optional().nullable(),
  bodyHtml: z.string().max(500_000).default(""),
  metaTitle: z.string().trim().max(70).optional().nullable(),
  metaDescription: z.string().trim().max(200).optional().nullable(),
});

function verifyStudioPassword(plain: string): boolean {
  const expected = process.env.CLIENT_STUDIO_PASSWORD;
  if (!expected) return false;
  const a = createHash("sha256").update(plain, "utf8").digest();
  const b = createHash("sha256").update(expected, "utf8").digest();
  return timingSafeEqual(a, b);
}

async function requireStudioSession() {
  if (!(await getClientStudioSession())) {
    throw new Error("Not signed in.");
  }
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

  const db = getDb();
  if (!db) {
    return { ok: false, error: "Database is not connected. Set DATABASE_URL on the server, then run db push." };
  }

  const parsed = postBaseSchema.safeParse(raw);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }
  const v = parsed.data;
  const now = new Date();

  try {
    if (id) {
      const existing = await db.select().from(clientInsightPosts).where(eq(clientInsightPosts.id, id)).limit(1);
      if (!existing[0]) return { ok: false, error: "Post not found." };
      await db
        .update(clientInsightPosts)
        .set({
          title: v.title,
          slug: v.slug,
          locale: v.locale,
          excerpt: v.excerpt ?? null,
          bodyHtml: v.bodyHtml,
          metaTitle: v.metaTitle ?? null,
          metaDescription: v.metaDescription ?? null,
          updatedAt: now,
        })
        .where(eq(clientInsightPosts.id, id));
      revalidatePath("/insights");
      revalidatePath(`/insights/${v.slug}`);
      return { ok: true, id };
    }

    const inserted = await db
      .insert(clientInsightPosts)
      .values({
        title: v.title,
        slug: v.slug,
        locale: v.locale,
        excerpt: v.excerpt ?? null,
        bodyHtml: v.bodyHtml,
        metaTitle: v.metaTitle ?? null,
        metaDescription: v.metaDescription ?? null,
        status: "draft",
        updatedAt: now,
      })
      .returning({ id: clientInsightPosts.id });

    const newId = inserted[0]?.id;
    if (!newId) return { ok: false, error: "Could not create post." };
    revalidatePath("/insights");
    return { ok: true, id: newId };
  } catch (e) {
    const code = e && typeof e === "object" && "code" in e ? String((e as { code?: unknown }).code) : "";
    if (code === "23505") {
      return {
        ok: false,
        error: "That URL slug already exists for this language. Change the slug.",
      };
    }
    return { ok: false, error: "Could not save. Check your connection or try again." };
  }
}

export async function publishStudioPost(id: string): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    await requireStudioSession();
  } catch {
    return { ok: false, error: "Session expired  -  sign in again." };
  }

  const db = getDb();
  if (!db) {
    return { ok: false, error: "Database is not connected." };
  }

  const rows = await db.select().from(clientInsightPosts).where(eq(clientInsightPosts.id, id)).limit(1);
  const row = rows[0];
  if (!row) return { ok: false, error: "Post not found." };

  const parsed = postBaseSchema.safeParse({
    title: row.title,
    slug: row.slug,
    locale: row.locale as "en" | "af",
    excerpt: row.excerpt,
    bodyHtml: row.bodyHtml,
    metaTitle: row.metaTitle,
    metaDescription: row.metaDescription,
  });
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Fix fields before publishing." };
  }

  const sanitized = sanitizeInsightBody(row.bodyHtml);
  if (!sanitized.trim()) {
    return { ok: false, error: "Add some HTML content before publishing." };
  }

  const now = new Date();
  await db
    .update(clientInsightPosts)
    .set({
      status: "published",
      bodyHtmlPublished: sanitized,
      publishedAt: now,
      updatedAt: now,
    })
    .where(eq(clientInsightPosts.id, id));

  revalidatePath("/");
  revalidatePath("/insights");
  revalidatePath(`/insights/${row.slug}`);
  return { ok: true };
}

export async function unpublishStudioPost(id: string): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    await requireStudioSession();
  } catch {
    return { ok: false, error: "Session expired  -  sign in again." };
  }

  const db = getDb();
  if (!db) return { ok: false, error: "Database is not connected." };

  const rows = await db.select().from(clientInsightPosts).where(eq(clientInsightPosts.id, id)).limit(1);
  const row = rows[0];
  if (!row) return { ok: false, error: "Post not found." };

  await db
    .update(clientInsightPosts)
    .set({
      status: "draft",
      bodyHtmlPublished: null,
      publishedAt: null,
      updatedAt: new Date(),
    })
    .where(eq(clientInsightPosts.id, id));

  revalidatePath("/");
  revalidatePath("/insights");
  revalidatePath(`/insights/${row.slug}`);
  return { ok: true };
}

export async function deleteStudioDraft(id: string): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    await requireStudioSession();
  } catch {
    return { ok: false, error: "Session expired  -  sign in again." };
  }

  const db = getDb();
  if (!db) return { ok: false, error: "Database is not connected." };

  const rows = await db.select().from(clientInsightPosts).where(eq(clientInsightPosts.id, id)).limit(1);
  const row = rows[0];
  if (!row) return { ok: false, error: "Post not found." };
  if (row.status === "published") {
    return { ok: false, error: "Unpublish first  -  only drafts can be deleted." };
  }

  await db.delete(clientInsightPosts).where(eq(clientInsightPosts.id, id));
  revalidatePath("/insights");
  return { ok: true };
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
  if (!file.type.startsWith("image/")) {
    return { ok: false, error: "Only image files are supported." };
  }
  if (file.size > 8 * 1024 * 1024) {
    return { ok: false, error: "Image is too large (max 8MB)." };
  }

  const supabase = getSupabaseService();
  if (!supabase) {
    return { ok: false, error: "Image upload is not configured on the server yet." };
  }

  const bucket = process.env.SUPABASE_BLOG_IMAGES_BUCKET || "blog-images";
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

  const publicUrl = supabase.storage.from(bucket).getPublicUrl(key).data.publicUrl;
  if (!publicUrl) {
    return { ok: false, error: "Upload succeeded, but no public URL was returned." };
  }

  return { ok: true, url: publicUrl };
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
