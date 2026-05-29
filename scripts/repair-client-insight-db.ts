/**
 * Repairs the Blog Studio table and optional columns.
 * Run: npm run db:repair-studio
 */
import { resolve } from "path";
import { config as loadEnv } from "dotenv";
import pg from "pg";

import { pgTlsForSupabaseUrl, stripPgUrlSslmodeQuery } from "../lib/db/pg-supabase-tls";

loadEnv({ path: resolve(process.cwd(), ".env") });
loadEnv({ path: resolve(process.cwd(), ".env.local"), override: true });

async function main() {
  const url = process.env.DATABASE_URL?.trim();
  if (!url) {
    console.error("FAIL: DATABASE_URL is not set in .env.local");
    process.exit(1);
  }

  const ssl = pgTlsForSupabaseUrl(url);
  const pool = new pg.Pool({
    connectionString: ssl ? stripPgUrlSslmodeQuery(url) : url,
    max: 1,
    ...(ssl ? { ssl } : {}),
  });

  try {
    await pool.query(`
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
      )
    `);
    await pool.query(`ALTER TABLE "client_insight_posts" ADD COLUMN IF NOT EXISTS "calculator_name" text`);
    await pool.query(`ALTER TABLE "client_insight_posts" ADD COLUMN IF NOT EXISTS "calculator_code" text`);
    await pool.query(`ALTER TABLE "client_insight_posts" ADD COLUMN IF NOT EXISTS "hero_image_url" text`);
    await pool.query(`ALTER TABLE "client_insight_posts" ADD COLUMN IF NOT EXISTS "categories" jsonb DEFAULT '[]'::jsonb`);
    await pool.query(`
      CREATE UNIQUE INDEX IF NOT EXISTS "client_insight_posts_slug_locale_uid"
      ON "client_insight_posts" ("slug", "locale")
    `);
    await pool.query(`
      CREATE INDEX IF NOT EXISTS "client_insight_posts_status_published_idx"
      ON "client_insight_posts" ("status", "published_at")
    `);

    console.log("OK: Blog Studio table repaired.");
  } finally {
    await pool.end();
  }
}

main().catch((error) => {
  console.error("FAIL: Repair failed:", error instanceof Error ? error.message : error);
  process.exit(1);
});
