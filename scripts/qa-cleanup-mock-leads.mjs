/**
 * Keep only real inbound leads (Percival + Lightbox/willie); delete mock/QA/demo rows.
 * Usage: node scripts/qa-cleanup-mock-leads.mjs [--dry-run]
 */
import pg from "pg";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const dryRun = process.argv.includes("--dry-run");

function loadEnvLocal() {
  const p = join(ROOT, ".env.local");
  const out = {};
  if (!existsSync(p)) return out;
  for (const line of readFileSync(p, "utf8").split(/\r?\n/)) {
    if (!line || line.trim().startsWith("#")) continue;
    const i = line.indexOf("=");
    if (i < 0) continue;
    let v = line.slice(i + 1).trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
    out[line.slice(0, i).trim()] = v;
  }
  return out;
}

const KEEP_EMAILS = new Set(["percival@linkatm.co.za", "sales@the-lightbox.co.za"]);

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const env = loadEnvLocal();
const pool = new pg.Pool({ connectionString: env.DATABASE_URL || process.env.DATABASE_URL });

const all = await pool.query(`
  SELECT id, source_funnel, raw_payload->>'name' AS name, raw_payload->>'email' AS email, created_at
  FROM crm_leads
  ORDER BY created_at DESC
`);

const keep = [];
const remove = [];
for (const row of all.rows) {
  const email = String(row.email || "")
    .trim()
    .toLowerCase();
  if (KEEP_EMAILS.has(email)) keep.push(row);
  else remove.push(row);
}

console.log("KEEP", keep.length);
for (const r of keep) console.log(" ", r.name, r.email, r.id);
console.log("REMOVE", remove.length);
for (const r of remove) console.log(" ", r.name, r.email, r.id);

if (dryRun) {
  console.log("\nDry run — no deletes.");
  await pool.end();
  process.exit(0);
}

if (remove.length === 0) {
  console.log("Nothing to delete.");
  await pool.end();
  process.exit(0);
}

const ids = remove.map((r) => r.id);
const del = await pool.query(`DELETE FROM crm_leads WHERE id = ANY($1::uuid[]) RETURNING id`, [ids]);
console.log(`\nDeleted ${del.rowCount} lead(s). Remaining:`);
const left = await pool.query(`
  SELECT raw_payload->>'name' AS name, raw_payload->>'email' AS email
  FROM crm_leads ORDER BY created_at DESC
`);
console.log(left.rows);
await pool.end();
