/**
 * Verifies Postgres connectivity and client_insight_posts schema for Blog Studio.
 * Run: npx tsx scripts/verify-client-insight-db.ts
 */
import { resolve } from "path";
import { config as loadEnv } from "dotenv";
import pg from "pg";

import { pgTlsForSupabaseUrl, stripPgUrlSslmodeQuery } from "../lib/db/pg-supabase-tls";

loadEnv({ path: resolve(process.cwd(), ".env") });
loadEnv({ path: resolve(process.cwd(), ".env.local"), override: true });

const REQUIRED_COLUMNS = [
  "id",
  "slug",
  "locale",
  "title",
  "excerpt",
  "body_html",
  "body_html_published",
  "status",
  "meta_title",
  "meta_description",
  "published_at",
  "created_at",
  "updated_at",
  "calculator_name",
  "calculator_code",
  "hero_image_url",
  "categories",
] as const;

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
    await pool.query("SELECT 1");
    console.log("OK: Database connection");

    const table = await pool.query<{ exists: boolean }>(
      `SELECT EXISTS (
        SELECT 1 FROM information_schema.tables
        WHERE table_schema = 'public' AND table_name = 'client_insight_posts'
      ) AS exists`
    );
    if (!table.rows[0]?.exists) {
      console.error("FAIL: Table public.client_insight_posts does not exist. Run: npm run db:push");
      process.exit(1);
    }
    console.log("OK: Table client_insight_posts exists");

    const cols = await pool.query<{ column_name: string }>(
      `SELECT column_name
       FROM information_schema.columns
       WHERE table_schema = 'public' AND table_name = 'client_insight_posts'`
    );
    const present = new Set(cols.rows.map((r) => r.column_name));
    const missing = REQUIRED_COLUMNS.filter((c) => !present.has(c));

    if (missing.length > 0) {
      console.error("FAIL: Missing columns:", missing.join(", "));
      console.error("Fix: npm run db:push");
      process.exit(1);
    }
    console.log("OK: All required columns present (including categories)");

    const count = await pool.query<{ n: string }>(
      `SELECT COUNT(*)::text AS n FROM client_insight_posts`
    );
    console.log(`OK: client_insight_posts row count = ${count.rows[0]?.n ?? "0"}`);

    const sample = await pool.query<{ id: string; categories: unknown }>(
      `SELECT id, categories FROM client_insight_posts ORDER BY updated_at DESC LIMIT 1`
    );
    if (sample.rows[0]) {
      const cats = sample.rows[0].categories;
      console.log(
        `OK: Latest post categories column readable (type: ${cats === null ? "null" : Array.isArray(cats) ? "array" : typeof cats})`
      );
    }

    console.log("\nStudio database check passed.");
  } catch (e) {
    console.error("FAIL: Database error:", e instanceof Error ? e.message : e);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

main();
