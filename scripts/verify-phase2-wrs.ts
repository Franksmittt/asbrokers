/**
 * Phase 2 WRS / hydration verification (Handbook).
 * Run: npx tsx scripts/verify-phase2-wrs.ts
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = process.cwd();
const CONTENT_DIR = join(ROOT, "app", "(content)");

const INDEXABLE_ROUTES = ["/", "/contact", "/chat", "/quiz", "/calculators", "/everest-wealth"];

const FORBIDDEN_RSC_PATTERNS: { label: string; re: RegExp }[] = [
  { label: "new Date()", re: /\bnew Date\s*\(/ },
  { label: "Date.now()", re: /\bDate\.now\s*\(/ },
  { label: "Math.random()", re: /\bMath\.random\s*\(/ },
  { label: "window API", re: /\b(window\.|typeof window\b)/ },
  { label: "document API", re: /\b(document\.|typeof document\b)/ },
  { label: "localStorage", re: /\blocalStorage\b/ },
  { label: "suppressHydrationWarning", re: /suppressHydrationWarning/ },
];

function isClientFile(path: string, source: string): boolean {
  return path.endsWith(".tsx") && /^["']use client["']/m.test(source);
}

function collectTsxFiles(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...collectTsxFiles(full));
    else if (full.endsWith(".tsx") || full.endsWith(".ts")) out.push(full);
  }
  return out;
}

function auditServerComponents(): string[] {
  const violations: string[] = [];
  const files = collectTsxFiles(CONTENT_DIR);

  for (const file of files) {
    const source = readFileSync(file, "utf8");
    if (isClientFile(file, source)) continue;
    if (file.includes("/api/")) continue;

    for (const { label, re } of FORBIDDEN_RSC_PATTERNS) {
      if (re.test(source)) {
        violations.push(`${relative(ROOT, file)}: ${label}`);
      }
    }
  }
  return violations;
}

function auditPageShells(): string[] {
  const issues: string[] = [];
  const checks: { file: string; mustInclude: string }[] = [
    { file: "app/(content)/contact/page.tsx", mustInclude: "ContactPageView" },
    { file: "app/(content)/chat/page.tsx", mustInclude: "Digital Wealth Assistant" },
    { file: "app/(content)/quiz/page.tsx", mustInclude: "Quick Financial Health Check" },
  ];

  for (const { file, mustInclude } of checks) {
    const full = join(ROOT, file);
    const source = readFileSync(full, "utf8");
    if (/^["']use client["']/m.test(source)) {
      issues.push(`${file}: page.tsx must be a Server Component`);
    }
    if (!source.includes(mustInclude)) {
      issues.push(`${file}: missing server-rendered marker "${mustInclude}"`);
    }
  }
  return issues;
}

function main() {
  let failed = false;

  const rscViolations = auditServerComponents();
  if (rscViolations.length) {
    failed = true;
    console.error("FAIL: non-deterministic patterns in Server Components under app/(content):");
    for (const v of rscViolations) console.error(`  - ${v}`);
  } else {
    console.log("PASS: no forbidden non-deterministic patterns in indexable RSC files");
  }

  const shellIssues = auditPageShells();
  if (shellIssues.length) {
    failed = true;
    console.error("FAIL: page shell bifurcation:");
    for (const v of shellIssues) console.error(`  - ${v}`);
  } else {
    console.log("PASS: contact/chat/quiz use Server Component shells with indexable copy");
  }

  console.log("\nIndexable routes for manual View Source h1 check:", INDEXABLE_ROUTES.join(", "));
  console.log("2MB payload audit deferred to Phase 10.");

  if (failed) process.exit(1);
  console.log("\nPhase 2 static checks passed.");
}

main();
