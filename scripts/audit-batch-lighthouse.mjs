/**
 * Lighthouse audit for arbitrary page paths (mobile + desktop).
 * Usage: node scripts/audit-batch-lighthouse.mjs / /contact /privacy
 * Requires: npm run build && npm run start
 */
import { execSync } from "node:child_process";
import { mkdirSync, writeFileSync, readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const args = process.argv.slice(2).filter((a) => a.startsWith("/"));
const PORT = process.argv.includes("--port")
  ? process.argv[process.argv.indexOf("--port") + 1]
  : "3000";
const BASE =
  process.env.LIGHTHOUSE_BASE ??
  (process.argv.includes("--base")
    ? process.argv[process.argv.indexOf("--base") + 1]
    : `http://127.0.0.1:${PORT}`);

if (args.length === 0) {
  console.error("Usage: node scripts/audit-batch-lighthouse.mjs /path1 /path2 ...");
  process.exit(1);
}

const MIN_SCORE = 0.98;
const MOBILE_ONLY = process.argv.includes("--mobile-only");
const OUT_DIR = join(process.cwd(), "lhci-reports", "batch-audit");
const CATEGORIES = ["performance", "accessibility", "best-practices", "seo"];

function slugFromPath(path) {
  if (path === "/") return "home";
  return path.replace(/^\//, "").replace(/\//g, "_");
}

function runLighthouse(url, formFactor, outFile) {
  const preset = formFactor === "desktop" ? "--preset=desktop" : "";
  const cpuSlowdown = process.env.CI ? 4 : 2;
  const throttling =
    formFactor === "mobile"
      ? `--throttling.cpuSlowdownMultiplier=${cpuSlowdown} --screenEmulation.mobile`
      : "";
  const cmd = `npx lighthouse "${url}" ${preset} ${throttling} --quiet --chrome-flags="--headless --no-sandbox --disable-gpu" --only-categories=${CATEGORIES.join(",")} --output=json --output-path="${outFile}"`;
  try {
    execSync(cmd, { stdio: "pipe", timeout: 180_000 });
  } catch {
    if (!existsSync(outFile)) throw new Error(`Lighthouse failed for ${url} (${formFactor})`);
  }
  return JSON.parse(readFileSync(outFile, "utf8"));
}

mkdirSync(OUT_DIR, { recursive: true });

const results = [];
const belowMin = [];

function warmup(url) {
  try {
    execSync(`curl -s -o NUL "${url}"`, { stdio: "pipe", timeout: 30_000 });
  } catch {
    // ignore — best-effort TTFB warmup
  }
}

for (const path of args) {
  const url = `${BASE.replace(/\/$/, "")}${path === "/" ? "" : path}`;
  warmup(url);
  const formFactors = MOBILE_ONLY ? ["mobile"] : ["mobile", "desktop"];
  for (const formFactor of formFactors) {
    const outFile = join(OUT_DIR, `${slugFromPath(path)}_${formFactor}.json`);
    console.log(`Auditing ${path} (${formFactor})...`);
    const report = runLighthouse(url, formFactor, outFile);
    const scores = {};
    for (const cat of CATEGORIES) {
      scores[cat] = report.categories[cat]?.score ?? 0;
    }
    const pct = Object.fromEntries(
      Object.entries(scores).map(([k, v]) => [k, Math.round(v * 100)])
    );
    console.log(`  ${JSON.stringify(pct)}`);

    const failingAudits = Object.entries(report.audits ?? {})
      .filter(([, a]) => a.score !== null && a.score < 1 && a.scoreDisplayMode !== "informative")
      .map(([id, a]) => ({ id, title: a.title, score: Math.round((a.score ?? 0) * 100) }))
      .sort((a, b) => a.score - b.score)
      .slice(0, 10);

    if (failingAudits.length) {
      console.log(
        "  failing:",
        failingAudits.map((f) => `${f.id}(${f.score}%)`).join(", ")
      );
    }

    results.push({ path, formFactor, scores: pct, failingAudits });
    for (const [cat, score] of Object.entries(scores)) {
      if (score < MIN_SCORE) belowMin.push({ path, formFactor, category: cat, score: pct[cat] });
    }
  }
}

const summary = { minScore: MIN_SCORE, paths: args, results, belowMin };
writeFileSync(join(OUT_DIR, "summary.json"), JSON.stringify(summary, null, 2));

console.log("\n=== BELOW 98% ===");
if (belowMin.length === 0) {
  console.log("All audited pages >= 98% on all categories (mobile + desktop).");
} else {
  for (const row of belowMin) {
    console.log(`${row.path} ${row.formFactor} ${row.category}: ${row.score}%`);
  }
  process.exit(1);
}
