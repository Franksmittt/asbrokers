-- Business Risk Review™ submissions
CREATE TABLE IF NOT EXISTS "business_risk_reviews" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "name" text NOT NULL,
  "email" text NOT NULL,
  "phone" text NOT NULL,
  "company" text NOT NULL,
  "industry" text NOT NULL,
  "coverage_score" integer NOT NULL,
  "total_items" integer NOT NULL,
  "protection_percent" integer NOT NULL,
  "gap_count" integer NOT NULL,
  "protection_band" varchar(20) NOT NULL,
  "selected_cover_ids" jsonb NOT NULL,
  "missing_cover_ids" jsonb NOT NULL,
  "created_at" timestamptz DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS "business_risk_reviews_created_idx" ON "business_risk_reviews" ("created_at");
CREATE INDEX IF NOT EXISTS "business_risk_reviews_industry_idx" ON "business_risk_reviews" ("industry");
CREATE INDEX IF NOT EXISTS "business_risk_reviews_score_idx" ON "business_risk_reviews" ("coverage_score");
