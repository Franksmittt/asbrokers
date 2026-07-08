/**
 * Phase 3 B2A / HtmlRAG verification — run: npx tsx scripts/verify-phase3-b2a.ts
 */
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const PUBLIC_LLMS = join(ROOT, "public", "llms.txt");
const PUBLIC_LLMS_FULL = join(ROOT, "public", "llms-full.txt");
const TOKEN_CEILING = 128_000;

/** Primary nav hub pages — handbook Phase 3 HtmlRAG chunk boundaries required. */
const KEY_PAGE_VIEWS = [
  "components/home4/Home4Preview.tsx",
  "components/retirement-planning/RetirementPlanningPageView.tsx",
  "components/investments/InvestmentsPageView.tsx",
  "components/insurance/InsuranceHubPageView.tsx",
  "components/estate-planning/EstatePlanningPageView.tsx",
  "components/insights/InsightsHubPageView.tsx",
  "components/about/AboutPageView.tsx",
  "components/contact/ContactPageView.tsx",
];

function estimateBpeTokens(text: string): number {
  return Math.ceil(text.length / 4);
}

function collectTsxFiles(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...collectTsxFiles(full));
    else if (full.endsWith(".tsx")) out.push(full);
  }
  return out;
}

function main() {
  let failed = false;

  if (!existsSync(PUBLIC_LLMS) || !existsSync(PUBLIC_LLMS_FULL)) {
    console.error("FAIL: public/llms.txt and public/llms-full.txt must exist — run npm run b2a:compile");
    failed = true;
  } else {
    const llms = readFileSync(PUBLIC_LLMS, "utf8");
    const full = readFileSync(PUBLIC_LLMS_FULL, "utf8");
    const fullTokens = estimateBpeTokens(full);

    if (!llms.startsWith("# AS Brokers")) {
      console.error("FAIL: public/llms.txt missing H1 brand header");
      failed = true;
    } else if (!/\]\(https?:\/\//.test(llms)) {
      console.error("FAIL: public/llms.txt missing spec-compliant markdown links [title](url)");
      failed = true;
    } else {
      console.log("PASS: public/llms.txt exists with H1 header and markdown links");
    }

    console.log(`PASS: public/llms-full.txt — ${fullTokens.toLocaleString()} est. BPE tokens (ceiling ${TOKEN_CEILING.toLocaleString()})`);
    if (fullTokens > TOKEN_CEILING) {
      console.error("FAIL: llms-full.txt exceeds token ceiling");
      failed = true;
    }
  }

  const missingChunks = KEY_PAGE_VIEWS.filter((rel) => {
    const src = readFileSync(join(ROOT, rel), "utf8");
    return !src.includes("data-chunk-boundary");
  });
  if (missingChunks.length) {
    console.error("FAIL: missing data-chunk-boundary on key pages:");
    for (const p of missingChunks) console.error(`  - ${p}`);
    failed = true;
  } else {
    console.log("PASS: primary hub pages use data-chunk-boundary sections");
  }

  const missingRelated = KEY_PAGE_VIEWS.filter((rel) => {
    const src = readFileSync(join(ROOT, rel), "utf8");
    return !src.includes("RelatedContent");
  });
  if (missingRelated.length) {
    console.error("FAIL: missing RelatedContent on hub pages:");
    for (const p of missingRelated) console.error(`  - ${p}`);
    failed = true;
  } else {
    console.log("PASS: primary hub pages include RelatedContent internal links");
  }

  const componentFiles = collectTsxFiles(join(ROOT, "components"));
  const hasComparisonTable =
    readFileSync(join(ROOT, "components/EverestProductComparisonTable.tsx"), "utf8").includes("<table") &&
    componentFiles.some((f) => readFileSync(f, "utf8").includes("data-label="));
  if (!hasComparisonTable) {
    console.error("FAIL: semantic comparison table with data-label not found");
    failed = true;
  } else {
    console.log("PASS: semantic comparison tables with data-label present");
  }

  if (failed) process.exit(1);
  console.log("\nPhase 3 static checks passed.");
}

main();
