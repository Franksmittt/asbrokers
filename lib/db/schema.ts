import {
  index,
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
  vector,
} from "drizzle-orm/pg-core";

const EMBEDDING_DIMENSIONS = 1536; // text-embedding-3-small

/**
 * Raw text chunks from Everest Wealth brochures, FAIS compliance, SARS guidelines.
 * One row per chunk; embeddings table references this.
 */
export const resources = pgTable("resources", {
  id: serial("id").primaryKey(),
  content: text("content").notNull(),
  source: varchar("source", { length: 255 }).notNull(),
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

/**
 * Vector embeddings for each resource chunk (1:1).
 * pgvector extension required: CREATE EXTENSION vector;
 */
export const embeddings = pgTable(
  "embeddings",
  {
    id: serial("id").primaryKey(),
    resourceId: integer("resource_id")
      .notNull()
      .references(() => resources.id, { onDelete: "cascade" }),
    embedding: vector("embedding", { dimensions: EMBEDDING_DIMENSIONS }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index("embeddings_embedding_idx").using(
      "hnsw",
      table.embedding.op("vector_cosine_ops")
    ),
  ]
);

export type Resource = typeof resources.$inferSelect;
export type NewResource = typeof resources.$inferInsert;
export type Embedding = typeof embeddings.$inferSelect;
export type NewEmbedding = typeof embeddings.$inferInsert;
