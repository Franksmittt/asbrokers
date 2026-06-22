/**
 * Phase 5 verification — run: npx tsx scripts/verify-phase5-seo.ts
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();

function read(path: string): string {
  return readFileSync(join(ROOT, path), "utf8");
}

function collectSourceFiles(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      if (entry === "node_modules" || entry === ".next") continue;
      collectSourceFiles(full, out);
    } else if (/\.(tsx|ts|jsx|js)$/.test(entry)) {
      out.push(full);
    }
  }
  return out;
}

function extractSitemapPaths(): string[] {
  const src = read("app/sitemap.ts");
  const matches = [...src.matchAll(/"(\/[^"]+)"/g)].map((m) => m[1]);
  return matches.filter((p) => p.startsWith("/"));
}

function hasInboundLink(path: string, sources: string[]): boolean {
  const patterns = [
    `href="${path}"`,
    `href='${path}'`,
    `href: "${path}"`,
    `href: '${path}'`,
    `href={\`${path}\`}`,
    `href={"${path}"}`,
    `href={'${path}'}`,
    `\`${path}\``,
  ];
  return sources.some((file) => patterns.some((p) => file.includes(p)));
}

function main() {
  let failed = false;
  const sitemapSrc = read("app/sitemap.ts");

  if (sitemapSrc.includes('"/chat"') || sitemapSrc.includes('"/quiz"')) {
    console.error("FAIL: sitemap still includes /chat or /quiz");
    failed = true;
  } else {
    console.log("PASS: sitemap excludes /chat and /quiz");
  }

  const layout = read("app/layout.tsx");
  if (!layout.includes("SpeculationRules")) {
    console.error("FAIL: speculation rules script missing from root layout");
    failed = true;
  } else {
    console.log("PASS: speculation rules present in root layout");
  }

  const chatLayout = read("app/(content)/chat/layout.tsx");
  const quizLayout = read("app/(content)/quiz/layout.tsx");
  if (!chatLayout.includes("noIndex: true") || !quizLayout.includes("noIndex: true")) {
    console.error("FAIL: chat/quiz layouts must set noIndex");
    failed = true;
  } else {
    console.log("PASS: chat/quiz layouts set noIndex");
  }

  const hubChecks = [
    "app/(content)/page.tsx",
    "app/(content)/solutions/layout.tsx",
    "app/(content)/how-we-work/layout.tsx",
    "app/(content)/lab/layout.tsx",
    "app/(content)/manage-cookies/layout.tsx",
    "app/(content)/insights/[slug]/page.tsx",
  ];
  for (const file of hubChecks) {
    const src = read(file);
    if (!src.includes("buildPageMetadata") && !src.includes("buildArticleMetadata")) {
      console.error(`FAIL: ${file} missing programmatic metadata helper`);
      failed = true;
    }
  }
  if (!failed) console.log("PASS: hub/dynamic templates use buildPageMetadata/buildArticleMetadata");

  if (!read("app/opengraph-image.tsx").includes("createOgImageResponse")) {
    console.error("FAIL: app/opengraph-image.tsx missing OG image handler");
    failed = true;
  } else {
    console.log("PASS: opengraph-image route exists");
  }

  const paths = extractSitemapPaths();
  const sourceBodies = collectSourceFiles(ROOT).map((f) => readFileSync(f, "utf8"));
  const orphans: string[] = [];
  for (const path of paths) {
    if (path === "/") continue;
    if (!hasInboundLink(path, sourceBodies)) orphans.push(path);
  }

  if (orphans.length) {
    console.error("FAIL: orphan indexable paths (no inbound internal link found):");
    for (const p of orphans) console.error(`  - ${p}`);
    failed = true;
  } else {
    console.log("PASS: no orphan sitemap paths detected");
  }

  if (failed) process.exit(1);
  console.log("\nPhase 5 static checks passed.");
}

main();
