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
    /** Multi-select categories (stored as JSON array of category values). */
    categories: jsonb("categories"),
    metaTitle: text("meta_title"),
    metaDescription: text("meta_description"),
    heroImageUrl: text("hero_image_url"),
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

/**
 * Business Risk Review™ submissions (lead magnet).
 */
export const businessRiskReviews = pgTable(
  "business_risk_reviews",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    phone: text("phone").notNull(),
    company: text("company").notNull(),
    industry: text("industry").notNull(),
    coverageScore: integer("coverage_score").notNull(),
    totalItems: integer("total_items").notNull(),
    protectionPercent: integer("protection_percent").notNull(),
    gapCount: integer("gap_count").notNull(),
    protectionBand: varchar("protection_band", { length: 20 }).notNull(),
    selectedCoverIds: jsonb("selected_cover_ids").notNull(),
    missingCoverIds: jsonb("missing_cover_ids").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index("business_risk_reviews_created_idx").on(table.createdAt),
    index("business_risk_reviews_industry_idx").on(table.industry),
    index("business_risk_reviews_score_idx").on(table.coverageScore),
  ]
);

export type BusinessRiskReview = typeof businessRiskReviews.$inferSelect;
export type NewBusinessRiskReview = typeof businessRiskReviews.$inferInsert;

/**
 * Legacy Readiness Checklist™ lead magnet submissions.
 */
export const legacyChecklistLeads = pgTable(
  "legacy_checklist_leads",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    firstName: text("first_name").notNull(),
    surname: text("surname").notNull(),
    email: text("email").notNull(),
    phone: text("phone").notNull(),
    age: integer("age"),
    businessOwner: varchar("business_owner", { length: 3 }),
    source: varchar("source", { length: 80 }).notNull().default("legacy-readiness-checklist"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index("legacy_checklist_leads_created_idx").on(table.createdAt),
    index("legacy_checklist_leads_email_idx").on(table.email),
  ]
);

export type LegacyChecklistLead = typeof legacyChecklistLeads.$inferSelect;
export type NewLegacyChecklistLead = typeof legacyChecklistLeads.$inferInsert;

/**
 * Healthy Retirement Blueprint™ assessment submissions.
 */
export const healthyRetirementAssessments = pgTable(
  "healthy_retirement_assessments",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    firstName: text("first_name").notNull(),
    email: text("email").notNull(),
    phone: text("phone"),
    answers: jsonb("answers").notNull(),
    healthScore: integer("health_score").notNull(),
    healthGap: integer("health_gap").notNull(),
    scoreBand: varchar("score_band", { length: 24 }).notNull(),
    source: varchar("source", { length: 80 }).notNull().default("healthy-retirement-blueprint"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index("healthy_retirement_created_idx").on(table.createdAt),
    index("healthy_retirement_email_idx").on(table.email),
    index("healthy_retirement_band_idx").on(table.scoreBand),
  ]
);

export type HealthyRetirementAssessment = typeof healthyRetirementAssessments.$inferSelect;
export type NewHealthyRetirementAssessment = typeof healthyRetirementAssessments.$inferInsert;
