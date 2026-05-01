# RAG Pipeline Implementation Plan  -  AS Brokers Digital Wealth Assistant

## 1. Database schema (Drizzle ORM + pgvector)

### 1.1 Tables

**`resources`**  -  Raw text chunks from Everest Wealth brochures, FAIS compliance, SARS guidelines.

| Column       | Type         | Constraints | Description |
|-------------|--------------|-------------|-------------|
| `id`        | `serial`     | PRIMARY KEY | Auto-increment ID |
| `content`   | `text`       | NOT NULL    | Chunk text content |
| `source`    | `varchar(255)`| NOT NULL    | e.g. `everest-strategic-income.pdf`, `sars-tax-2026` |
| `metadata`  | `jsonb`      |             | Optional: page, section, doc_id |
| `created_at`| `timestamp`  | DEFAULT now() | Insert time |

**`embeddings`**  -  Vector storage with FK to `resources`. One row per chunk embedding.

| Column       | Type           | Constraints | Description |
|-------------|----------------|-------------|-------------|
| `id`        | `serial`       | PRIMARY KEY | Auto-increment ID |
| `resource_id` | `integer`    | NOT NULL, FK → resources(id) ON DELETE CASCADE | Link to chunk |
| `embedding` | `vector(1536)` | NOT NULL    | text-embedding-3-small dimension |
| `created_at`| `timestamp`    | DEFAULT now() | Insert time |

**Index (HNSW for cosine similarity):**

- `CREATE INDEX embeddings_embedding_idx ON embeddings USING hnsw (embedding vector_cosine_ops);`

**Extension:** `CREATE EXTENSION IF NOT EXISTS vector;` (manual migration).

### 1.2 File layout

- `lib/db/schema.ts`  -  Drizzle table definitions (resources, embeddings), relations, HNSW index.
- `drizzle.config.ts`  -  Drizzle Kit config: driver `pg`, `schema: './lib/db/schema.ts'`, `out: './drizzle'`.
- `.env`  -  `DATABASE_URL` (PostgreSQL connection string). Build/runtime must work when `DATABASE_URL` is unset (RAG disabled, baseline prompt only).

---

## 2. Retrieval utility (`lib/db/rag.ts`)

- **Input:** User query string, optional `limit` (default 5).
- **Steps:**
  1. If `DATABASE_URL` is missing, return `""` (no DB, no retrieval).
  2. Embed query with OpenAI `text-embedding-3-small` via AI SDK `embed({ model: openai.embedding('text-embedding-3-small'), value: query })`.
  3. Run cosine similarity: `SELECT r.content, r.source FROM embeddings e INNER JOIN resources r ON e.resource_id = r.id ORDER BY e.embedding <=> $1 LIMIT $2` (Drizzle: `cosineDistance(embeddings.embedding, embedding)` with `asc`, `limit(limit)`).
  4. Return a single string: concatenate `content` (and optionally `source`) with clear separators for the system prompt.
- **Export:** `getRagContext(query: string, limit?: number): Promise<string>`.
- **Error handling:** On DB or embed failure, log and return `""` so the chat route still runs with baseline prompt only.

---

## 3. Chat route integration (`app/api/chat/route.ts`)

- **Baseline system prompt:** Keep the existing hardcoded block unchanged (R100k minimum, 120-day notice, 15% early exit, 20% DWT, tool-usage instructions).
- **Before `streamText`:**
  1. Derive the **latest user message** from `messages` (last item with `role: 'user'`; take its text from `parts` or `content`).
  2. If there is a latest user message, call `getRagContext(latestUserMessageText, 5)`.
  3. Build **Interceptor System Prompt** = baseline prompt + `\n\n[Retrieved context]:\n` + (ragContext || `[No relevant context retrieved.]`).
  4. Pass this constructed prompt as `system` to `streamText`.
- **No change** to tools, `convertToModelMessages`, or response streaming.

---

## 4. Build and documentation

- Build must succeed **without** `DATABASE_URL` (RAG path returns empty string; no DB connection attempted if env missing).
- Add optional `pgvector` / Drizzle dev dependency so typechecks pass; at runtime Drizzle is used only when `DATABASE_URL` is set.
- Update `PROJECT_OVERVIEW.txt`: add RAG section (schema, `lib/db/rag.ts`, chat integration, env vars: `DATABASE_URL`, `OPENAI_API_KEY`), and note that ingestion script is out of scope (manual or separate tool).
