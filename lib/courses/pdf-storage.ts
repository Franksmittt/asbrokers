import "server-only";

import { collectErrorText } from "@/lib/db/pg-error-chain";
import { getSupabaseService } from "@/lib/supabase/server";

import { COURSE_PDF_FILE_SIZE_LIMIT, COURSE_PDF_MIME_TYPE, COURSE_PDFS_BUCKET } from "./pdf";

const ensuredBuckets = new Set<string>();

/**
 * Private bucket for course PDFs. Downloads go through /api/studio/media
 * with the service role, so there is no public storage policy.
 */
export async function ensureCoursePdfsBucket(): Promise<{ ok: true; bucket: string }> {
  const supabase = getSupabaseService();
  if (!supabase) throw new Error("Supabase upload service is not configured.");

  const bucket = COURSE_PDFS_BUCKET.trim() || "course-pdfs";
  if (ensuredBuckets.has(bucket)) return { ok: true, bucket };

  const buckets = await supabase.storage.listBuckets();
  if (buckets.error) {
    throw new Error(`Storage bucket check failed: ${buckets.error.message}`);
  }

  const exists = (buckets.data ?? []).some((item) => item.name === bucket);
  const options = {
    public: false,
    fileSizeLimit: COURSE_PDF_FILE_SIZE_LIMIT,
    allowedMimeTypes: [COURSE_PDF_MIME_TYPE],
  };

  if (!exists) {
    const created = await supabase.storage.createBucket(bucket, options);
    if (created.error) {
      const detail = collectErrorText(created.error);
      if (!detail.toLowerCase().includes("already exists")) {
        throw new Error(`Storage bucket create failed: ${created.error.message}`);
      }
    }
  } else {
    await supabase.storage.updateBucket(bucket, options);
  }

  ensuredBuckets.add(bucket);
  return { ok: true, bucket };
}
