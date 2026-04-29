import {
  index,
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
  uuid,
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

/**
 * HTML insights authored in /studio/blog (client workspace). Not Sanity.
 * Public site reads bodyHtmlPublished when status is published.
 */
export const clientInsightPosts = pgTable(
  "client_insight_posts",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    slug: varchar("slug", { length: 160 }).notNull(),
    locale: varchar("locale", { length: 8 }).notNull().default("en"),
    title: text("title").notNull(),
    excerpt: text("excerpt"),
    /** Last saved editor HTML (may include drafts). */
    bodyHtml: text("body_html").notNull().default(""),
    /** Sanitized HTML served on /insights/[slug] when published. */
    bodyHtmlPublished: text("body_html_published"),
    status: varchar("status", { length: 20 }).notNull().default("draft"),
    metaTitle: text("meta_title"),
    metaDescription: text("meta_description"),
    calculatorName: text("calculator_name"),
    calculatorCode: text("calculator_code"),
    publishedAt: timestamp("published_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex("client_insight_posts_slug_locale_uid").on(table.slug, table.locale),
    index("client_insight_posts_status_published_idx").on(table.status, table.publishedAt),
  ]
);

export type ClientInsightPost = typeof clientInsightPosts.$inferSelect;
export type NewClientInsightPost = typeof clientInsightPosts.$inferInsert;

/**
 * Owner notes in Insights studio (personal scratchpad). Not public; studio session only.
 */
export const studioNotebookNotes = pgTable(
  "studio_notebook_notes",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    title: varchar("title", { length: 320 }).notNull().default(""),
    body: text("body").notNull().default(""),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [index("studio_notebook_notes_updated_idx").on(table.updatedAt)]
);

export type StudioNotebookNote = typeof studioNotebookNotes.$inferSelect;
export type NewStudioNotebookNote = typeof studioNotebookNotes.$inferInsert;
