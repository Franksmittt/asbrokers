-- Legacy Readiness Checklist™ leads (mirror of drizzle/0005_legacy_checklist_leads.sql)
CREATE TABLE IF NOT EXISTS "legacy_checklist_leads" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "first_name" text NOT NULL,
  "surname" text NOT NULL,
  "email" text NOT NULL,
  "phone" text NOT NULL,
  "age" integer,
  "business_owner" varchar(3),
  "source" varchar(80) DEFAULT 'legacy-readiness-checklist' NOT NULL,
  "created_at" timestamptz DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS "legacy_checklist_leads_created_idx" ON "legacy_checklist_leads" ("created_at");
CREATE INDEX IF NOT EXISTS "legacy_checklist_leads_email_idx" ON "legacy_checklist_leads" ("email");
