/**
 * Push Supabase/DB env vars from .env.local to Vercel (production + preview).
 * Usage: npx tsx scripts/push-vercel-env.ts
 */
import { resolve } from "path";
import { config as loadEnv } from "dotenv";
import { spawnSync } from "child_process";

loadEnv({ path: resolve(process.cwd(), ".env.local"), override: true });

const VARS = [
  "DATABASE_URL",
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "SUPABASE_SERVICE_ROLE_KEY",
  "NEXT_PUBLIC_SITE_URL",
  "CLIENT_STUDIO_PASSWORD",
  "CLIENT_STUDIO_SESSION_SECRET",
] as const;

function setVercelEnv(name: string, value: string, target: "production" | "preview") {
  spawnSync("vercel", ["env", "rm", name, target, "--yes"], { shell: true, stdio: "inherit" });
  const add = spawnSync("vercel", ["env", "add", name, target], {
    shell: true,
    stdio: ["pipe", "inherit", "inherit"],
    input: `${value}\n`,
  });
  if (add.status !== 0) process.exit(add.status ?? 1);
  console.log(`Set ${name} (${target})`);
}

async function main() {
  for (const target of ["production", "preview"] as const) {
    for (const name of VARS) {
      const value = process.env[name]?.trim();
      if (!value) {
        console.warn(`Skip ${name} — not set in .env.local`);
        continue;
      }
      setVercelEnv(name, value, target);
    }
  }
  console.log("\nDone. Redeploy production for runtime env to apply.");
}

main();
