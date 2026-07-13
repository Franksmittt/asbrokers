import { execSync } from "node:child_process";
import { readFileSync, existsSync, mkdirSync } from "node:fs";

mkdirSync("lhci-reports/task15", { recursive: true });
const tag = process.argv[2] || "loop";
const results = [];

for (let i = 1; i <= 3; i++) {
  const out = `lhci-reports/task15/home_mobile_${tag}_run${i}.json`;
  console.log(`=== LH ${tag} run ${i} ===`);
  const cmd = [
    "npx",
    "lighthouse",
    "http://127.0.0.1:3000/",
    "--form-factor=mobile",
    "--screenEmulation.mobile",
    "--only-categories=performance",
    "--quiet",
    '--chrome-flags=--headless --no-sandbox --disable-gpu --disable-extensions',
    "--output=json",
    `--output-path=${out}`,
  ].join(" ");
  try {
    execSync(cmd, { stdio: "inherit", timeout: 180_000, shell: true });
  } catch (e) {
    console.log("lighthouse exit (Windows EBUSY often OK if JSON exists):", e.status);
  }
  if (!existsSync(out)) {
    console.log("MISSING", out);
    continue;
  }
  const r = JSON.parse(readFileSync(out, "utf8"));
  const a = r.audits;
  const row = {
    perf: Math.round((r.categories.performance?.score || 0) * 100),
    lcp: a["largest-contentful-paint"]?.displayValue,
    fcp: a["first-contentful-paint"]?.displayValue,
    tbt: a["total-blocking-time"]?.displayValue,
    cls: a["cumulative-layout-shift"]?.displayValue,
    si: a["speed-index"]?.displayValue,
  };
  const top = Object.entries(a)
    .filter(([, x]) => x.details?.type === "opportunity" && x.score !== null && x.score < 1)
    .sort((x, y) => (y[1].numericValue || 0) - (x[1].numericValue || 0))
    .slice(0, 5)
    .map(([id, x]) => `${id} (${x.displayValue || ""})`);
  console.log(JSON.stringify({ ...row, top }, null, 2));
  results.push(row);
}

const perfs = results.map((r) => r.perf).sort((a, b) => a - b);
const med = perfs[Math.floor(perfs.length / 2)];
console.log("MEDIAN PERF", med, "runs", perfs.join(","));
