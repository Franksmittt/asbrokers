-- Client HTML insights (Insights studio). Apply with: npm run db:push
-- or run this SQL manually if you manage migrations yourself.

CREATE TABLE IF NOT EXISTS "client_insight_posts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" varchar(160) NOT NULL,
	"locale" varchar(8) DEFAULT 'en' NOT NULL,
	"title" text NOT NULL,
	"excerpt" text,
	"body_html" text DEFAULT '' NOT NULL,
	"body_html_published" text,
	"status" varchar(20) DEFAULT 'draft' NOT NULL,
	"meta_title" text,
	"meta_description" text,
	"published_at" timestamptz,
	"created_at" timestamptz DEFAULT now() NOT NULL,
	"updated_at" timestamptz DEFAULT now() NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS "client_insight_posts_slug_locale_uid" ON "client_insight_posts" ("slug","locale");
CREATE INDEX IF NOT EXISTS "client_insight_posts_status_published_idx" ON "client_insight_posts" ("status","published_at");
