-- Healthy Retirement Blueprint™ assessments (additive only — does not touch blog tables)
CREATE TABLE IF NOT EXISTS "healthy_retirement_assessments" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "first_name" text NOT NULL,
  "email" text NOT NULL,
  "phone" text,
  "answers" jsonb NOT NULL,
  "health_score" integer NOT NULL,
  "health_gap" integer NOT NULL,
  "score_band" varchar(24) NOT NULL,
  "source" varchar(80) DEFAULT 'healthy-retirement-blueprint' NOT NULL,
  "created_at" timestamptz DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS "healthy_retirement_created_idx" ON "healthy_retirement_assessments" ("created_at");
CREATE INDEX IF NOT EXISTS "healthy_retirement_email_idx" ON "healthy_retirement_assessments" ("email");
CREATE INDEX IF NOT EXISTS "healthy_retirement_band_idx" ON "healthy_retirement_assessments" ("score_band");
