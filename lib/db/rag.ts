import { embed } from "ai";
import { google } from "@ai-sdk/google";
import { eq, sql } from "drizzle-orm";
import { getDb } from "./index";
import { embeddings, resources } from "./schema";

const EMBEDDING_MODEL = "gemini-embedding-001";
const EMBEDDING_DIMENSIONS = 1536;
const DEFAULT_LIMIT = 5;

/**
 * Embed a query string using Gemini embeddings.
 * Returns null on failure (e.g. missing GOOGLE_GENERATIVE_AI_API_KEY).
 */
async function embedQuery(query: string): Promise<number[] | null> {
  try {
    const { embedding } = await embed({
      model: google.textEmbeddingModel(EMBEDDING_MODEL),
      providerOptions: {
        google: {
          outputDimensionality: EMBEDDING_DIMENSIONS,
        },
      },
      value: query.replaceAll(/\s+/g, " ").trim(),
    });
    return Array.isArray(embedding) ? embedding : null;
  } catch {
    return null;
  }
}

/**
 * Cosine similarity search: retrieve the most relevant text chunks for the query.
 * Uses pgvector <=> (cosine distance). Returns empty string if DB or embedding unavailable.
 */
export async function getRagContext(
  query: string,
  limit: number = DEFAULT_LIMIT
): Promise<string> {
  const queryEmbedding = await embedQuery(query);
  if (!queryEmbedding?.length) return "";

  const db = getDb();
  if (!db) return "";

  try {
    // pgvector: cosine distance operator <=>; order by ascending distance (most similar first)
    const vectorStr = "[" + queryEmbedding.join(",") + "]";

    const rows = await db
      .select({
        content: resources.content,
        source: resources.source,
      })
      .from(embeddings)
      .innerJoin(resources, eq(embeddings.resourceId, resources.id))
      .orderBy(sql`${embeddings.embedding} <=> ${vectorStr}::vector`)
      .limit(limit);

    if (rows.length === 0) return "";

    return rows
      .map((r) => `[Source: ${r.source}]\n${r.content}`)
      .join("\n\n---\n\n");
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.error("[RAG] similarity search failed:", err);
    }
    return "";
  }
}
