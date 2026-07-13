/**
 * Inventory Blog Studio published/draft insight posts (read-only).
 *
 * Run: npm run insights:inventory
 *
 * Requires: DATABASE_URL and/or NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY
 *
 * Legacy Sanity inventory support was removed with Task 13 (Studio-only CMS).
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { config as loadEnv } from "dotenv";
import pg from "pg";

import { pgTlsForSupabaseUrl, stripPgUrlSslmodeQuery } from "../lib/db/pg-supabase-tls";

loadEnv({ path: resolve(process.cwd(), ".env") });
loadEnv({ path: resolve(process.cwd(), ".env.local"), override: true });

type Row = {
  key: string;
  slug: string;
  locale: string;
  title: string;
  source: "studio";
  studioStatus: string | null;
  studioPublishedAt: string | null;
};

type StudioArticle = {
  slug: string;
  locale: string;
  title: string;
  status: string;
  published_at: string | Date | null;
};

function keyOf(slug: string, locale: string): string {
  return `${slug}::${locale || "en"}`;
}

function toIso(value: string | Date | null | undefined): string | null {
  if (!value) return null;
  if (value instanceof Date) return value.toISOString();
  const t = new Date(value).getTime();
  return Number.isNaN(t) ? String(value) : new Date(value).toISOString();
}

async function fetchStudioViaPostgres(): Promise<StudioArticle[] | null> {
  const url = process.env.DATABASE_URL?.trim();
  if (!url) return null;

  const ssl = pgTlsForSupabaseUrl(url);
  const pool = new pg.Pool({
    connectionString: ssl ? stripPgUrlSslmodeQuery(url) : url,
    max: 1,
    ...(ssl ? { ssl } : {}),
  });

  try {
    const result = await pool.query<StudioArticle>(
      `select slug, locale, title, status, published_at
       from client_insight_posts
       order by coalesce(published_at, updated_at) desc nulls last`
    );
    return result.rows;
  } finally {
    await pool.end();
  }
}

async function fetchStudioViaSupabaseRest(): Promise<StudioArticle[] | null> {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  if (!base || !key) return null;

  const url = new URL("/rest/v1/client_insight_posts", base);
  url.searchParams.set("select", "slug,locale,title,status,published_at");
  url.searchParams.set("order", "published_at.desc.nullslast");

  const res = await fetch(url, {
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      Accept: "application/json",
    },
  });
  if (!res.ok) {
    throw new Error(`Supabase REST ${res.status}: ${await res.text()}`);
  }
  return (await res.json()) as StudioArticle[];
}

async function fetchStudio(): Promise<{ rows: StudioArticle[]; note: string | null }> {
  try {
    const viaPg = await fetchStudioViaPostgres();
    if (viaPg) return { rows: viaPg, note: null };
  } catch (err) {
    console.warn("[inventory] Postgres studio read failed:", err);
  }

  try {
    const viaRest = await fetchStudioViaSupabaseRest();
    if (viaRest) return { rows: viaRest, note: "Studio via Supabase REST (DATABASE_URL missing or failed)" };
  } catch (err) {
    console.warn("[inventory] Supabase REST studio read failed:", err);
  }

  return {
    rows: [],
    note: "Studio skipped: set DATABASE_URL or NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY",
  };
}

function buildInventory(studio: StudioArticle[]): Row[] {
  const rows: Row[] = [];
  for (const row of studio) {
    if (!row.slug?.trim()) continue;
    const locale = (row.locale || "en").trim() || "en";
    rows.push({
      key: keyOf(row.slug, locale),
      slug: row.slug,
      locale,
      title: (row.title || row.slug).trim(),
      source: "studio",
      studioStatus: row.status ?? null,
      studioPublishedAt: toIso(row.published_at ?? null),
    });
  }
  rows.sort((a, b) => a.slug.localeCompare(b.slug));
  return rows;
}

function toMarkdown(rows: Row[], notes: string[]): string {
  const published = rows.filter((r) => r.studioStatus === "published").length;
  const lines = [
    "# Insights Studio inventory (generated)",
    "",
    `Generated: ${new Date().toISOString()}`,
    "",
    "## Counts",
    "",
    `| Bucket | Count |`,
    `| --- | ---: |`,
    `| studio posts | ${rows.length} |`,
    `| published | ${published} |`,
    "",
  ];

  if (notes.length) {
    lines.push("## Notes", "");
    for (const note of notes) lines.push(`- ${note}`);
    lines.push("");
  }

  lines.push(
    "## Rows",
    "",
    "| slug | locale | title | status | publishedAt |",
    "| --- | --- | --- | --- | --- |"
  );

  for (const row of rows) {
    const title = row.title.replace(/\|/g, "\\|");
    lines.push(
      `| \`${row.slug}\` | ${row.locale} | ${title} | ${row.studioStatus ?? "—"} | ${row.studioPublishedAt ?? "—"} |`
    );
  }

  lines.push("", "## Policy", "", "- Public insights are Blog Studio only (Tasks 12–13).", "");
  return lines.join("\n");
}

async function main() {
  const notes: string[] = [];
  const studio = await fetchStudio();
  if (studio.note) notes.push(studio.note);

  const rows = buildInventory(studio.rows);
  const published = rows.filter((r) => r.studioStatus === "published").length;

  console.log("Insights Studio inventory:");
  console.log(`  studio posts: ${rows.length}`);
  console.log(`  published:    ${published}`);
  if (notes.length) {
    console.log("Notes:");
    for (const note of notes) console.log(`  - ${note}`);
  }

  const outDir = resolve(process.cwd(), "docs");
  mkdirSync(outDir, { recursive: true });
  const mdPath = resolve(outDir, "insights-source-inventory.generated.md");
  const jsonPath = resolve(outDir, "insights-source-inventory.generated.json");
  writeFileSync(mdPath, toMarkdown(rows, notes), "utf8");
  writeFileSync(
    jsonPath,
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        counts: { studio: rows.length, published },
        notes,
        rows,
      },
      null,
      2
    ),
    "utf8"
  );
  console.log(`Wrote ${mdPath}`);
  console.log(`Wrote ${jsonPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
