-- Run this before applying Drizzle schema migrations.
-- Required for embeddings.embedding vector(1536) and HNSW index.
CREATE EXTENSION IF NOT EXISTS vector;
