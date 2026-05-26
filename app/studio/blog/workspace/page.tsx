import { BlogStudioClient, type SerializableStudioPost } from "@/components/client-studio/BlogStudioClient";
import { fetchNotebookNotesInitial } from "@/lib/client-studio/notebook-server";
import { listAllStudioPosts } from "@/lib/client-studio/posts";
import { isStudioPostsStorageConfigured } from "@/lib/client-studio/studio-storage";
import { isClientStudioConfigured } from "@/lib/client-studio/session";
import { getSupabaseService } from "@/lib/supabase/server";

/** Session + DB reads; never cache a logged-in HTML workspace as static. */
export const dynamic = "force-dynamic";

function serialize(rows: Awaited<ReturnType<typeof listAllStudioPosts>>["rows"]): SerializableStudioPost[] {
  return rows.map((r) => ({
    id: r.id,
    slug: r.slug,
    locale: r.locale as "en" | "af",
    title: r.title,
    excerpt: r.excerpt,
    bodyHtml: r.bodyHtml,
    bodyHtmlPublished: r.bodyHtmlPublished,
    heroImageUrl: r.heroImageUrl,
    status: r.status,
    metaTitle: r.metaTitle,
    metaDescription: r.metaDescription,
    calculatorName: r.calculatorName,
    calculatorCode: r.calculatorCode,
    categories: Array.isArray(r.categories)
      ? r.categories.filter((v): v is string => typeof v === "string")
      : [],
    publishedAt: r.publishedAt?.toISOString() ?? null,
    createdAt: r.createdAt.toISOString(),
    updatedAt: r.updatedAt.toISOString(),
  }));
}

export default async function StudioWorkspacePage() {
  const studioConfigured = isClientStudioConfigured();
  const databaseConfigured = isStudioPostsStorageConfigured();
  let imageUploadConfigured = false;
  try {
    imageUploadConfigured = Boolean(getSupabaseService());
  } catch (e) {
    console.error("[studio workspace] Supabase service client init failed:", e);
  }
  const studioPosts = databaseConfigured ? await listAllStudioPosts() : { rows: [], loadError: null };
  const initialPosts = serialize(studioPosts.rows);
  const databaseLoadError = studioPosts.loadError;
  const initialNotebookNotes = databaseConfigured ? await fetchNotebookNotesInitial() : [];
  const allowBulkDelete = (process.env.CLIENT_STUDIO_ENABLE_BULK_DELETE ?? "").trim().toLowerCase() === "true";

  return (
    <BlogStudioClient
      initialPosts={initialPosts}
      initialNotebookNotes={initialNotebookNotes}
      databaseConfigured={databaseConfigured}
      databaseLoadError={databaseLoadError}
      imageUploadConfigured={imageUploadConfigured}
      studioConfigured={studioConfigured}
      allowBulkDelete={allowBulkDelete}
    />
  );
}
