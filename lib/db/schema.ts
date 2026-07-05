import {
  boolean,
  index,
  integer,
  jsonb,
  pgSchema,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
  vector,
} from "drizzle-orm/pg-core";

/** Supabase Auth users — referenced by CRM client_id (auth schema managed by Supabase). */
const authSchema = pgSchema("auth");
export const authUsers = authSchema.table("users", {
  id: uuid("id").primaryKey(),
});

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

/**
 * CRM leads — funnel-sourced pipeline records; contact phone lives in raw_payload.phone.
 */
export const crmLeads = pgTable(
  "crm_leads",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    clientId: uuid("client_id").references(() => authUsers.id),
    sourceFunnel: varchar("source_funnel", { length: 255 }),
    serviceCategory: varchar("service_category", { length: 64 }),
    leadScore: integer("lead_score").notNull().default(0),
    pipelineStatus: varchar("pipeline_status", { length: 64 }),
    assignedAdvisor: uuid("assigned_advisor").references(() => authUsers.id),
    rawPayload: jsonb("raw_payload"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index("crm_leads_pipeline_status_idx").on(table.pipelineStatus),
    index("crm_leads_assigned_advisor_idx").on(table.assignedAdvisor),
    index("crm_leads_service_category_idx").on(table.serviceCategory),
    index("crm_leads_source_funnel_idx").on(table.sourceFunnel),
  ]
);

export type CrmLead = typeof crmLeads.$inferSelect;
export type NewCrmLead = typeof crmLeads.$inferInsert;

/**
 * Unified correspondence thread (WhatsApp, email, portal).
 */
export const correspondence = pgTable(
  "correspondence",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    leadId: uuid("lead_id")
      .notNull()
      .references(() => crmLeads.id, { onDelete: "cascade" }),
    channel: varchar("channel", { length: 32 }).notNull(),
    senderType: varchar("sender_type", { length: 32 }).notNull(),
    messageBody: text("message_body").notNull(),
    /** Meta wamid (or other provider id) — unique for inbound deduplication. */
    externalMessageId: varchar("external_message_id", { length: 255 }),
    /** auth.users id of staff member who sent an outbound message. */
    staffUserId: uuid("staff_user_id").references(() => authUsers.id),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index("correspondence_lead_id_idx").on(table.leadId),
    index("correspondence_created_at_idx").on(table.createdAt),
    uniqueIndex("correspondence_external_message_id_uid").on(table.externalMessageId),
    index("correspondence_staff_user_id_idx").on(table.staffUserId),
  ]
);

export type Correspondence = typeof correspondence.$inferSelect;
export type NewCorrespondence = typeof correspondence.$inferInsert;

/**
 * Team-wide scratchpad notes (CRM Notes workspace).
 */
export const globalNotes = pgTable(
  "global_notes",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    content: text("content").notNull(),
    authorId: uuid("author_id")
      .notNull()
      .references(() => authUsers.id),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index("global_notes_created_idx").on(table.createdAt),
    index("global_notes_author_idx").on(table.authorId),
  ]
);

export type GlobalNote = typeof globalNotes.$inferSelect;
export type NewGlobalNote = typeof globalNotes.$inferInsert;

/**
 * Scheduled follow-ups attached to a lead.
 */
export const leadReminders = pgTable(
  "lead_reminders",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    leadId: uuid("lead_id")
      .notNull()
      .references(() => crmLeads.id, { onDelete: "cascade" }),
    title: varchar("title", { length: 255 }).notNull(),
    dueDate: timestamp("due_date", { withTimezone: true }).notNull(),
    isCompleted: boolean("is_completed").notNull().default(false),
  },
  (table) => [
    index("lead_reminders_lead_idx").on(table.leadId),
    index("lead_reminders_due_idx").on(table.dueDate),
  ]
);

export type LeadReminder = typeof leadReminders.$inferSelect;
export type NewLeadReminder = typeof leadReminders.$inferInsert;

/**
 * Advisor tasks linked to pipeline leads.
 */
export const crmTasks = pgTable(
  "crm_tasks",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    leadId: uuid("lead_id").references(() => crmLeads.id, { onDelete: "cascade" }),
    assigneeId: uuid("assignee_id")
      .notNull()
      .references(() => authUsers.id),
    title: varchar("title", { length: 255 }).notNull(),
    status: varchar("status", { length: 32 }).notNull().default("open"),
    dueDate: timestamp("due_date", { withTimezone: true }),
  },
  (table) => [
    index("crm_tasks_lead_idx").on(table.leadId),
    index("crm_tasks_assignee_idx").on(table.assigneeId),
    index("crm_tasks_status_idx").on(table.status),
    index("crm_tasks_due_idx").on(table.dueDate),
  ]
);

export type CrmTaskRow = typeof crmTasks.$inferSelect;
export type NewCrmTaskRow = typeof crmTasks.$inferInsert;

/**
 * CRM staff profiles — extended team directory linked to Supabase auth.users.
 * Role is mirrored in auth app_metadata; permissions gate feature access for staff.
 */
export const crmStaffProfiles = pgTable(
  "crm_staff_profiles",
  {
    id: uuid("id")
      .primaryKey()
      .references(() => authUsers.id, { onDelete: "cascade" }),
    fullName: text("full_name").notNull(),
    email: text("email").notNull(),
    phone: text("phone"),
    role: varchar("role", { length: 16 }).notNull().default("staff"),
    isActive: boolean("is_active").notNull().default(true),
    permissions: jsonb("permissions").notNull().default({}),
    createdBy: uuid("created_by").references(() => authUsers.id),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex("crm_staff_profiles_email_uid").on(table.email),
    index("crm_staff_profiles_role_idx").on(table.role),
    index("crm_staff_profiles_active_idx").on(table.isActive),
  ]
);

export type CrmStaffProfile = typeof crmStaffProfiles.$inferSelect;
export type NewCrmStaffProfile = typeof crmStaffProfiles.$inferInsert;

/**
 * Append-only audit trail for CRM Gemini AI actions (POPIA / FAIS explainability).
 */
export const crmAiAuditLog = pgTable(
  "crm_ai_audit_log",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    staffUserId: uuid("staff_user_id").references(() => authUsers.id, { onDelete: "set null" }),
    actionType: varchar("action_type", { length: 64 }).notNull(),
    leadId: uuid("lead_id").references(() => crmLeads.id, { onDelete: "set null" }),
    model: varchar("model", { length: 64 }),
    summary: text("summary"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index("crm_ai_audit_log_created_idx").on(table.createdAt),
    index("crm_ai_audit_log_staff_idx").on(table.staffUserId),
    index("crm_ai_audit_log_lead_idx").on(table.leadId),
  ]
);

export type CrmAiAuditLog = typeof crmAiAuditLog.$inferSelect;
export type NewCrmAiAuditLog = typeof crmAiAuditLog.$inferInsert;
