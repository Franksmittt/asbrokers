import { resolve } from "path";
import { config as loadEnv } from "dotenv";
import { parse } from "pg-connection-string";
import { defineConfig } from "drizzle-kit";

import { pgTlsForSupabaseUrl } from "./lib/db/pg-supabase-tls";

/** So `npm run db:push` picks up DATABASE_URL from .env.local (same as Next.js dev). */
loadEnv({ path: resolve(process.cwd(), ".env") });
loadEnv({ path: resolve(process.cwd(), ".env.local"), override: true });

const databaseUrl =
  process.env.DATABASE_URL?.trim() ?? "postgresql://localhost:5432/asbrokers";

const parsed = parse(databaseUrl);
/** drizzle-kit ignores `ssl` when `dbCredentials.url` is set — use discrete fields instead. */
const supabaseTls = pgTlsForSupabaseUrl(databaseUrl);

export default defineConfig({
  schema: "./lib/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    host: parsed.host ?? "localhost",
    port: parsed.port ? Number(parsed.port) : 5432,
    user: parsed.user ?? "postgres",
    password: parsed.password ?? "",
    database: parsed.database ?? "postgres",
    ...(supabaseTls ? { ssl: supabaseTls } : {}),
  },
});
