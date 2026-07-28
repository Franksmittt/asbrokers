/**
 * Phase 12 — Master pre-deploy verification gate.
 * Run: npm run test:master
 *
 * Lighthouse runs only on Linux CI (local Windows CPU skews scores per handbook).
 */
import { spawnSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const IS_CI = process.env.CI === "true" || process.env.CI === "1";
const IS_WINDOWS = process.platform === "win32";

type Step = { name: string; cmd: string; args: string[]; skip?: boolean; skipReason?: string };

const steps: Step[] = [
  { name: "lint", cmd: "npm", args: ["run", "lint"] },
  { name: "tsc", cmd: "npx", args: ["tsc", "--noEmit"] },
  { name: "build", cmd: "npm", args: ["run", "build"] },
  { name: "b2a-verify", cmd: "npx", args: ["tsx", "scripts/verify-phase3-b2a.ts"] },
  {
    name: "seo-audit-static",
    cmd: "npm",
    args: ["run", "seo:audit:static"],
  },
  { name: "test:a11y", cmd: "npm", args: ["run", "test:a11y"] },
  { name: "test:seo", cmd: "npm", args: ["run", "test:seo"] },
  {
    name: "test:visual",
    cmd: "npm",
    args: ["run", "test:visual"],
    skip: IS_WINDOWS || IS_CI,
    skipReason: IS_CI
      ? "covered by visual-regression CI job (Playwright Docker baselines)"
      : "visual baselines are Linux Docker only (see visual-regression CI job)",
  },
  {
    name: "test:lighthouse",
    cmd: "npm",
    args: ["run", "test:lighthouse"],
    skip: IS_WINDOWS || IS_CI,
    skipReason: IS_CI
      ? "covered by lighthouse CI job (fresh runner, avoids master-audit load contention)"
      : "Lighthouse gated on Linux CI only (skip on local Windows)",
  },
  {
    name: "phase9-perf-verify",
    cmd: "npx",
    args: ["tsx", "scripts/verify-phase9-performance.ts"],
    skip: IS_WINDOWS || IS_CI,
    skipReason: IS_CI
      ? "covered by lighthouse CI job Phase 9 step"
      : "Lighthouse manifest required (Linux CI)",
  },
];

function runStep(step: Step): boolean {
  if (step.skip) {
    console.log(`\n==> ${step.name} — SKIP (${step.skipReason})`);
    return true;
  }
  console.log(`\n==> ${step.name}`);
  console.log(`$ ${step.cmd} ${step.args.join(" ")}`);
  const result = spawnSync(step.cmd, step.args, {
    cwd: ROOT,
    stdio: "inherit",
    shell: IS_WINDOWS,
    env: {
      ...process.env,
      NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.asbrokers.co.za",
      PLAYWRIGHT_PORT: process.env.PLAYWRIGHT_PORT ?? "3120",
      CI: process.env.CI ?? "",
    },
  });
  if (result.status !== 0) {
    console.error(`\nFAIL: ${step.name} exited ${result.status ?? "unknown"}`);
    return false;
  }
  console.log(`PASS: ${step.name}`);
  return true;
}

function checkInfrastructure(): boolean {
  let ok = true;
  const required = [
    "middleware.ts",
    "app/robots.ts",
    "app/sitemap.ts",
    "public/llms.txt",
    "public/llms-full.txt",
    "scripts/gsc-canonical-check.mjs",
    "docs/DEPLOYMENT.md",
  ];
  for (const f of required) {
    if (!existsSync(join(ROOT, f))) {
      console.error(`FAIL: missing ${f}`);
      ok = false;
    }
  }
  const jsonLd = readFileSync(join(ROOT, "lib", "json-ld.ts"), "utf8");
  if (!jsonLd.includes("\\u003c")) {
    console.error("FAIL: JSON-LD XSS escape not found in lib/json-ld.ts");
    ok = false;
  }
  if (ok) console.log("PASS: crawl infrastructure files present");
  return ok;
}

function main() {
  console.log("AS Brokers Phase 12 — Master verification");
  console.log(`Platform: ${process.platform} | CI: ${IS_CI}`);

  if (!checkInfrastructure()) process.exit(1);

  const failed: string[] = [];
  for (const step of steps) {
    if (!runStep(step)) failed.push(step.name);
  }

  if (failed.length > 0) {
    console.error(`\nPhase 12 FAILED: ${failed.join(", ")}`);
    process.exit(1);
  }

  const lighthouseNote = IS_CI
    ? "Lighthouse verified on CI."
    : "Lighthouse skipped locally — verify Linux CI master-audit job.";

  console.log(`\nPhase 12 master verification passed. ${lighthouseNote}`);
}

main();
