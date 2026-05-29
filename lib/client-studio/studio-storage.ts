import "server-only";

import { getDb } from "@/lib/db";
import { collectErrorText } from "@/lib/db/pg-error-chain";
import { getSupabaseService } from "@/lib/supabase/server";

export const STUDIO_BLOG_IMAGES_BUCKET = process.env.SUPABASE_BLOG_IMAGES_BUCKET || "blog-images";
export const STUDIO_BLOG_IMAGE_MIME_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"] as const;
export const STUDIO_BLOG_IMAGE_FILE_SIZE_LIMIT = 20 * 1024 * 1024;

const ensuredBuckets = new Set<string>();

/** Studio posts can be stored via Postgres or Supabase REST (same project, no upload changes). */
export function isStudioPostsStorageConfigured(): boolean {
  return Boolean(getDb() || getSupabaseService());
}

export async function ensureStudioBlogImagesBucket(): Promise<{ ok: true; bucket: string; created: boolean }> {
  const supabase = getSupabaseService();
  if (!supabase) throw new Error("Supabase upload service is not configured.");

  const bucket = STUDIO_BLOG_IMAGES_BUCKET.trim() || "blog-images";
  if (ensuredBuckets.has(bucket)) return { ok: true, bucket, created: false };

  const buckets = await supabase.storage.listBuckets();
  if (buckets.error) {
    throw new Error(`Storage bucket check failed: ${buckets.error.message}`);
  }

  const exists = (buckets.data ?? []).some((item) => item.name === bucket);
  if (exists) {
    ensuredBuckets.add(bucket);
    return { ok: true, bucket, created: false };
  }

  const created = await supabase.storage.createBucket(bucket, {
    public: false,
    fileSizeLimit: STUDIO_BLOG_IMAGE_FILE_SIZE_LIMIT,
    allowedMimeTypes: [...STUDIO_BLOG_IMAGE_MIME_TYPES],
  });
  if (created.error) {
    const detail = collectErrorText(created.error);
    if (!detail.toLowerCase().includes("already exists")) {
      throw new Error(`Storage bucket create failed: ${created.error.message}`);
    }
  }

  ensuredBuckets.add(bucket);
  return { ok: true, bucket, created: true };
}
