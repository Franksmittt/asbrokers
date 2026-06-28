import { resolve } from "path";
import { config as loadEnv } from "dotenv";

loadEnv({ path: resolve(process.cwd(), ".env.local"), override: true });

const TOKEN = process.env.SUPABASE_ACCESS_TOKEN!.trim();
const REF = "qfpvrwcdomiyryllvdqt";

async function q(sql: string) {
  const res = await fetch(`https://api.supabase.com/v1/projects/${REF}/database/query`, {
    method: "POST",
    headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify({ query: sql }),
  });
  return res.json();
}

async function main() {
  console.log("posts", await q("SELECT status, count(*)::int AS n FROM client_insight_posts GROUP BY status"));
  console.log("crm_leads", await q("SELECT count(*)::int AS n FROM crm_leads"));
  console.log("buckets", await q("SELECT id, name, public FROM storage.buckets"));
}

main();
