import pg from "pg";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
function loadEnvLocal() {
  const p = join(ROOT, ".env.local");
  const out = {};
  if (!existsSync(p)) return out;
  for (const line of readFileSync(p, "utf8").split(/\r?\n/)) {
    if (!line || line.trim().startsWith("#")) continue;
    const i = line.indexOf("=");
    if (i < 0) continue;
    const k = line.slice(0, i).trim();
    let v = line.slice(i + 1).trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
    out[k] = v;
  }
  return out;
}

const env = loadEnvLocal();
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const pool = new pg.Pool({
  connectionString: env.DATABASE_URL || process.env.DATABASE_URL,
});

const r = await pool.query(`
  SELECT id, source_funnel, pipeline_status, lead_score,
         raw_payload->>'name' AS name,
         raw_payload->>'email' AS email,
         created_at
  FROM crm_leads
  ORDER BY created_at DESC
  LIMIT 20
`);
console.log(JSON.stringify(r.rows, null, 2));
console.log("total recent", r.rows.length);
await pool.end();
