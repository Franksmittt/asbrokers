/**
 * One-off script to chunk documents and populate resources + embeddings for RAG.
 * Run from project root. Loads .env.local for DATABASE_URL and OPENAI_API_KEY.
 *
 * Usage:
 *   npx tsx scripts/ingest-rag.ts [directory]
 * Default directory: scripts/rag-documents
 *
 * Place .txt (or .md) files in that directory. For PDFs, export text to .txt first
 * or add a PDF parser (e.g. pdf-parse) and extend this script.
 */
import { config } from "dotenv";
config({ path: ".env.local" });

import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import { embed } from "ai";
import { openai } from "@ai-sdk/openai";
import { getDb } from "../lib/db";
import { embeddings, resources } from "../lib/db/schema";

const EMBEDDING_MODEL = "text-embedding-3-small";
const CHUNK_SIZE = 600;
const CHUNK_OVERLAP = 80;

function chunkText(text: string): string[] {
  const normalized = text.replace(/\r\n/g, "\n").replace(/\s+/g, " ").trim();
  if (!normalized) return [];

  const chunks: string[] = [];
  let start = 0;

  while (start < normalized.length) {
    let end = start + CHUNK_SIZE;
    if (end < normalized.length) {
      const nextSpace = normalized.indexOf(" ", end);
      if (nextSpace !== -1 && nextSpace - start < CHUNK_SIZE + 200) end = nextSpace + 1;
    }
    const chunk = normalized.slice(start, end).trim();
    if (chunk) chunks.push(chunk);
    start = end - CHUNK_OVERLAP;
    if (start >= normalized.length) break;
  }

  return chunks;
}

async function embedText(text: string): Promise<number[] | null> {
  try {
    const { embedding } = await embed({
      model: openai.embedding(EMBEDDING_MODEL),
      value: text,
    });
    return Array.isArray(embedding) ? embedding : null;
  } catch (e) {
    console.error("Embed failed:", e);
    return null;
  }
}

async function main() {
  const dir = process.argv[2] ?? join(process.cwd(), "scripts", "rag-documents");

  const db = getDb();
  if (!db) {
    console.error("DATABASE_URL is not set. Add it to .env.local and try again.");
    process.exit(1);
  }

  if (!process.env.OPENAI_API_KEY) {
    console.error("OPENAI_API_KEY is not set. Add it to .env.local and try again.");
    process.exit(1);
  }

  let files: string[];
  try {
    files = await readdir(dir);
  } catch (e) {
    console.error("Could not read directory:", dir, e);
    process.exit(1);
  }

  const textFiles = files.filter((f) => f.endsWith(".txt") || f.endsWith(".md"));
  if (textFiles.length === 0) {
    console.log("No .txt or .md files in", dir);
    console.log("Add documents there and run again.");
    process.exit(0);
  }

  console.log("Found", textFiles.length, "file(s). Chunking and embedding...");

  let totalInserted = 0;

  for (const file of textFiles) {
    const path = join(dir, file);
    const raw = await readFile(path, "utf-8");
    const source = file.replace(/\.(txt|md)$/i, "").slice(0, 255);
    const chunks = chunkText(raw);

    for (const content of chunks) {
      const [resource] = await db.insert(resources).values({ content, source }).returning({ id: resources.id });
      if (!resource) continue;

      const vector = await embedText(content);
      if (!vector?.length) {
        console.warn("Skipping chunk (embed failed):", content.slice(0, 60) + "...");
        continue;
      }

      await db.insert(embeddings).values({ resourceId: resource.id, embedding: vector });
      totalInserted++;
    }
  }

  console.log("Done. Inserted", totalInserted, "chunks into resources + embeddings.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
