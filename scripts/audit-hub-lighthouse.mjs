/**
 * Lighthouse audit for 8 primary hub pages (mobile + desktop).
 * Usage: node scripts/audit-hub-lighthouse.mjs [--port 3000]
 * Requires: npm run build && npm run start
 */
import { execSync } from "node:child_process";
import { mkdirSync, writeFileSync, readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const PORT = process.argv.includes("--port")
  ? process.argv[process.argv.indexOf("--port") + 1]
  : "3000";
const BASE =
  process.env.LIGHTHOUSE_BASE ??
  (process.argv.includes("--base")
    ? process.argv[process.argv.indexOf("--base") + 1]
    : `http://127.0.0.1:${PORT}`);
const MIN_SCORE = 0.98;
const OUT_DIR = join(process.cwd(), "lhci-reports", "hub-audit");

const HUB_PATHS = [
  "/",
  "/retirement",
  "/everest-wealth",
  "/insurance",
  "/solutions/estate-planning",
  "/insights",
  "/about",
  "/contact",
];

const CATEGORIES = ["performance", "accessibility", "best-practices", "seo"];

function runLighthouse(url, formFactor) {
  const slug = url.replace(BASE, "").replace(/\//g, "_") || "home";
  const outFile = join(OUT_DIR, `${slug}_${formFactor}.json`);
  const preset = formFactor === "desktop" ? "--preset=desktop" : "";
  const cmd = `npx lighthouse "${url}" ${preset} --quiet --chrome-flags="--headless --no-sandbox --disable-gpu" --only-categories=${CATEGORIES.join(",")} --output=json --output-path="${outFile}"`;
  try {
    execSync(cmd, { stdio: "pipe", timeout: 180_000 });
  } catch (e) {
    if (!existsSync(outFile)) throw e;
  }
  const report = JSON.parse(readFileSync(outFile, "utf8"));
  const scores = {};
  for (const cat of CATEGORIES) {
    scores[cat] = report.categories[cat]?.score ?? 0;
  }
  const audits = report.audits ?? {};
  const failures = [];
  for (const [id, audit] of Object.entries(audits)) {
    if (audit.score !== null && audit.score < 1 && audit.scoreDisplayMode !== "informative") {
      failures.push({
        id,
        title: audit.title,
        score: audit.score,
        description: audit.description?.slice(0, 200),
      });
    }
  }
  return { url, formFactor, scores, failures: failures.slice(0, 15) };
}

mkdirSync(OUT_DIR, { recursive: true });

const results = [];
let belowMin = [];

for (const path of HUB_PATHS) {
  const url = `${BASE}${path === "/" ? "" : path}`;
  for (const formFactor of ["mobile", "desktop"]) {
    console.log(`Auditing ${path} (${formFactor})...`);
    const r = runLighthouse(url, formFactor);
    results.push(r);
    for (const [cat, score] of Object.entries(r.scores)) {
      if (score < MIN_SCORE) {
        belowMin.push({ path, formFactor, category: cat, score });
      }
    }
    const pct = Object.fromEntries(
      Object.entries(r.scores).map(([k, v]) => [k, Math.round(v * 100)])
    );
    console.log(`  ${JSON.stringify(pct)}`);
  }
}

const summary = { minScore: MIN_SCORE, results, belowMin };
writeFileSync(join(OUT_DIR, "summary.json"), JSON.stringify(summary, null, 2));

console.log("\n=== BELOW 98% ===");
if (belowMin.length === 0) {
  console.log("All hub pages >= 98% on all categories (mobile + desktop).");
} else {
  for (const row of belowMin) {
    console.log(`${row.path} ${row.formFactor} ${row.category}: ${Math.round(row.score * 100)}%`);
  }
  process.exit(1);
}
