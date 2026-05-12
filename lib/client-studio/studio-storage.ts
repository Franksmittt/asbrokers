import "server-only";

import { getDb } from "@/lib/db";
import { getSupabaseService } from "@/lib/supabase/server";

/** Studio posts can be stored via Postgres or Supabase REST (same project, no upload changes). */
export function isStudioPostsStorageConfigured(): boolean {
  return Boolean(getDb() || getSupabaseService());
}
