/**
 * Runs drizzle-kit push only when DATABASE_URL is configured.
 * Usage: npm run db:push
 */
import { resolve } from "path";
import { config as loadEnv } from "dotenv";
import { spawnSync } from "child_process";

loadEnv({ path: resolve(process.cwd(), ".env") });
loadEnv({ path: resolve(process.cwd(), ".env.local"), override: true });

const url = process.env.DATABASE_URL?.trim();
if (!url) {
  console.error(
    "DATABASE_URL is missing in .env.local.\n" +
      "Copy the Postgres connection string from Supabase (Settings → Database) or Vercel env vars.\n" +
      "Alternatively run this SQL in Supabase SQL Editor:\n" +
      "  supabase/migrations/20260526120000_client_insight_categories.sql"
  );
  process.exit(1);
}

const result = spawnSync("npx", ["drizzle-kit", "push"], {
  stdio: "inherit",
  shell: true,
  env: process.env,
});

process.exit(result.status ?? 1);
