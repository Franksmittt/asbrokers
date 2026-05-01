import { BlogStudioClient, type SerializableStudioPost } from "@/components/client-studio/BlogStudioClient";
import { fetchNotebookNotesInitial } from "@/lib/client-studio/notebook-server";
import { listAllStudioPosts } from "@/lib/client-studio/posts";
import { isClientStudioConfigured } from "@/lib/client-studio/session";
import { getDb } from "@/lib/db";
import { getSupabaseService } from "@/lib/supabase/server";

function serialize(rows: Awaited<ReturnType<typeof listAllStudioPosts>>): SerializableStudioPost[] {
  return rows.map((r) => ({
    id: r.id,
    slug: r.slug,
    locale: r.locale as "en" | "af",
    title: r.title,
    excerpt: r.excerpt,
    bodyHtml: r.bodyHtml,
    bodyHtmlPublished: r.bodyHtmlPublished,
    status: r.status,
    metaTitle: r.metaTitle,
    metaDescription: r.metaDescription,
    calculatorName: r.calculatorName,
    calculatorCode: r.calculatorCode,
    publishedAt: r.publishedAt?.toISOString() ?? null,
    createdAt: r.createdAt.toISOString(),
    updatedAt: r.updatedAt.toISOString(),
  }));
}

export default async function StudioWorkspacePage() {
  const studioConfigured = isClientStudioConfigured();
  const databaseConfigured = Boolean(getDb());
  const imageUploadConfigured = Boolean(getSupabaseService());
  const rows = databaseConfigured ? await listAllStudioPosts() : [];
  const initialPosts = serialize(rows);
  const initialNotebookNotes = databaseConfigured ? await fetchNotebookNotesInitial() : [];

  return (
    <BlogStudioClient
      initialPosts={initialPosts}
      initialNotebookNotes={initialNotebookNotes}
      databaseConfigured={databaseConfigured}
      imageUploadConfigured={imageUploadConfigured}
      studioConfigured={studioConfigured}
    />
  );
}
