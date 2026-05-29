import "server-only";

import { sql } from "drizzle-orm";

import type { Db } from "@/lib/db";
import { collectErrorText } from "@/lib/db/pg-error-chain";

let ensurePromise: Promise<void> | null = null;

async function executeSchemaStep(db: Db, statement: ReturnType<typeof sql>, label: string): Promise<void> {
  try {
    await db.execute(statement);
  } catch (error) {
    console.warn(`[studio schema] ${label} failed:`, collectErrorText(error));
    throw error;
  }
}

async function executeOptionalSchemaStep(db: Db, statement: ReturnType<typeof sql>, label: string): Promise<void> {
  try {
    await db.execute(statement);
  } catch (error) {
    console.warn(`[studio schema] ${label} skipped:`, collectErrorText(error));
  }
}

async function runEnsureClientInsightPostSchema(db: Db): Promise<void> {
  await executeSchemaStep(
    db,
    sql`
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
    `,
    "create client_insight_posts table"
  );

  await executeSchemaStep(
    db,
    sql`ALTER TABLE "client_insight_posts" ADD COLUMN IF NOT EXISTS "calculator_name" text`,
    "add calculator_name"
  );
  await executeSchemaStep(
    db,
    sql`ALTER TABLE "client_insight_posts" ADD COLUMN IF NOT EXISTS "calculator_code" text`,
    "add calculator_code"
  );
  await executeSchemaStep(
    db,
    sql`ALTER TABLE "client_insight_posts" ADD COLUMN IF NOT EXISTS "hero_image_url" text`,
    "add hero_image_url"
  );
  await executeSchemaStep(
    db,
    sql`ALTER TABLE "client_insight_posts" ADD COLUMN IF NOT EXISTS "categories" jsonb DEFAULT '[]'::jsonb`,
    "add categories"
  );

  await executeOptionalSchemaStep(
    db,
    sql`
      CREATE UNIQUE INDEX IF NOT EXISTS "client_insight_posts_slug_locale_uid"
      ON "client_insight_posts" ("slug", "locale")
    `,
    "create slug/locale unique index"
  );
  await executeOptionalSchemaStep(
    db,
    sql`
      CREATE INDEX IF NOT EXISTS "client_insight_posts_status_published_idx"
      ON "client_insight_posts" ("status", "published_at")
    `,
    "create status/published index"
  );
}

/**
 * Blog Studio is owner-operated and small, so we repair this one table lazily.
 * This keeps production from failing when Vercel has newer code than Supabase schema.
 */
export async function ensureClientInsightPostSchema(db: Db): Promise<void> {
  ensurePromise ??= runEnsureClientInsightPostSchema(db).catch((error) => {
    ensurePromise = null;
    throw error;
  });
  return ensurePromise;
}

export async function ensureClientInsightPostSchemaBestEffort(db: Db): Promise<void> {
  try {
    await ensureClientInsightPostSchema(db);
  } catch {
    // Write paths still have legacy-column fallbacks if the DB role cannot run DDL.
  }
}
