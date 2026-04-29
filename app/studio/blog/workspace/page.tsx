import { BlogStudioClient, type SerializableStudioPost } from "@/components/client-studio/BlogStudioClient";
import { listAllStudioPosts } from "@/lib/client-studio/posts";
import { isClientStudioConfigured } from "@/lib/client-studio/session";
import { getDb } from "@/lib/db";

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
  const rows = databaseConfigured ? await listAllStudioPosts() : [];
  const initialPosts = serialize(rows);

  return (
    <BlogStudioClient
      initialPosts={initialPosts}
      databaseConfigured={databaseConfigured}
      studioConfigured={studioConfigured}
    />
  );
}
