/**
 * Rotate Supabase DB password + refresh API keys into .env.local via Management API.
 * Then run: npm run vercel:env-push && vercel --prod
 */
import { resolve } from "path";
import { config as loadEnv } from "dotenv";
import { randomBytes } from "crypto";
import { readFileSync, writeFileSync } from "fs";

loadEnv({ path: resolve(process.cwd(), ".env.local"), override: true });

const TOKEN = process.env.SUPABASE_ACCESS_TOKEN?.trim();
const REF = "qfpvrwcdomiyryllvdqt";

if (!TOKEN) {
  console.error("Missing SUPABASE_ACCESS_TOKEN in .env.local");
  process.exit(1);
}

async function main() {
  const keysRes = await fetch(`https://api.supabase.com/v1/projects/${REF}/api-keys`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  });
  if (!keysRes.ok) throw new Error(await keysRes.text());
  const keys = (await keysRes.json()) as Array<{ name: string; api_key: string }>;
  const anon = keys.find((k) => k.name === "anon")?.api_key;
  const service = keys.find((k) => k.name === "service_role")?.api_key;
  if (!anon || !service) throw new Error("Could not fetch API keys");

  const dbPassword = randomBytes(16).toString("base64url") + "X1!";
  const patch = await fetch(`https://api.supabase.com/v1/projects/${REF}/database/password`, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify({ password: dbPassword }),
  });
  if (!patch.ok) throw new Error(await patch.text());

  const databaseUrl = `postgresql://postgres.${REF}:${encodeURIComponent(dbPassword)}@aws-1-eu-west-1.pooler.supabase.com:5432/postgres?sslmode=require`;

  let env = readFileSync(resolve(process.cwd(), ".env.local"), "utf8");
  env = env.replace(/DATABASE_URL=.*/m, `DATABASE_URL="${databaseUrl}"`);
  env = env.replace(
    /NEXT_PUBLIC_SUPABASE_ANON_KEY=.*/m,
    `NEXT_PUBLIC_SUPABASE_ANON_KEY="${anon}"`
  );
  env = env.replace(/SUPABASE_SERVICE_ROLE_KEY=.*/m, `SUPABASE_SERVICE_ROLE_KEY="${service}"`);
  writeFileSync(resolve(process.cwd(), ".env.local"), env);

  console.log("Updated .env.local (DB password rotated, JWT keys refreshed).");
  console.log("Next: npm run vercel:env-push");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
