import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";
import { pgTlsForSupabaseUrl, stripPgUrlSslmodeQuery } from "./pg-supabase-tls";

/**
 * Lazy-initialized DB pool. Only created when DATABASE_URL is set.
 * Used by RAG retrieval; chat works without DB (empty context).
 */
let _pool: Pool | null = null;

function getPool(): Pool | null {
  const url = process.env.DATABASE_URL?.trim();
  if (!url) return null;
  if (!_pool) {
    const ssl = pgTlsForSupabaseUrl(url);
    const connectionString = ssl ? stripPgUrlSslmodeQuery(url) : url;
    _pool = new Pool({
      connectionString,
      max: 5,
      ...(ssl ? { ssl } : {}),
    });
  }
  return _pool;
}

export function getDb() {
  const pool = getPool();
  if (!pool) return null;
  return drizzle(pool, { schema });
}

export type Db = NonNullable<ReturnType<typeof getDb>>;
export * from "./schema";
