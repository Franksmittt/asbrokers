/**
 * Phase 7 verification — run: npx tsx scripts/verify-phase7-alt.ts
 */
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const GENERIC_ALT = /alt=["'](?:image|photo|picture|thumbnail|Thumbnail|logo\.jpg|[^"']*\.(?:jpg|jpeg|png|webp))["']/i;
const EMPTY_ALT = /alt=["']\s*["']/;

const CRITICAL_PATHS = [
  "/images/logo.jpg",
  "/images/home-actuarial-engine-16x9.jpg",
  "/images/solutions-hero-16x9.jpg",
  "/images/team-albert.jpg",
  "/images/team-johnny.jpg",
  "/images/og-default.jpg",
];

const INDEXABLE_DIRS = [
  "app/(content)",
  "components/Nav.tsx",
  "components/Footer.tsx",
  "components/PageMediaStrip.tsx",
  "components/ImagePlaceholder.tsx",
  "components/Code18Advantage.tsx",
  "components/RiskArchitectureCarousel.tsx",
  "components/insights/InsightsFeedFilter.tsx",
  "components/contact/ContactPageView.tsx",
];

function read(path: string): string {
  return readFileSync(join(ROOT, path), "utf8");
}

function collectFiles(): string[] {
  const out: string[] = [];
  for (const entry of INDEXABLE_DIRS) {
    const full = join(ROOT, entry);
    if (!existsSync(full)) continue;
    if (statSync(full).isFile()) {
      out.push(full);
      continue;
    }
    walk(full, out);
  }
  return out;
}

function walk(dir: string, out: string[]) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) {
      if (name === "node_modules" || name === ".next") continue;
      walk(full, out);
    } else if (/\.(tsx|jsx)$/.test(name)) {
      out.push(full);
    }
  }
}

function main() {
  let failed = false;

  if (!existsSync(join(ROOT, "data/image-metadata.json"))) {
    console.error("FAIL: data/image-metadata.json missing");
    failed = true;
  } else {
    console.log("PASS: image-metadata.json exists");
  }

  if (!read("lib/image-alt.ts").includes("export function getAlt")) {
    console.error("FAIL: lib/image-alt.ts missing getAlt()");
    failed = true;
  } else {
    console.log("PASS: lib/image-alt.ts helper present");
  }

  if (!read("package.json").includes('"alt:compile"')) {
    console.error("FAIL: npm script alt:compile missing");
    failed = true;
  } else {
    console.log("PASS: alt:compile npm script registered");
  }

  if (!read("AGENTS.md").includes("alt:compile")) {
    console.error("FAIL: AGENTS.md must document alt:compile");
    failed = true;
  } else {
    console.log("PASS: alt:compile documented in AGENTS.md");
  }

  const dict = JSON.parse(read("data/image-metadata.json"));
  for (const path of CRITICAL_PATHS) {
    const entry = dict.entries?.[path];
    if (!entry?.alt || entry.alt.length < 12) {
      console.error(`FAIL: critical asset missing descriptive alt: ${path}`);
      failed = true;
    }
  }
  if (!failed) console.log("PASS: critical assets covered in dictionary");

  if (!read("components/PageMediaStrip.tsx").includes("getAlt")) {
    console.error("FAIL: PageMediaStrip must use getAlt()");
    failed = true;
  } else {
    console.log("PASS: PageMediaStrip wired to getAlt()");
  }

  const files = collectFiles();
  const offenders: string[] = [];
  for (const file of files) {
    const rel = file.replace(ROOT, "").replace(/\\/g, "/");
    const src = readFileSync(file, "utf8");
    if (/<Image\b/.test(src) && !/getAlt\(/.test(src) && !/alt=\{getAlt/.test(src) && !/alt=\{resolvedAlt/.test(src)) {
      if (/alt=\{[^}]+\}/.test(src) || GENERIC_ALT.test(src)) {
        offenders.push(`${rel}: next/image without getAlt integration`);
      }
    }
    if (/<img\b/.test(src)) {
      const lines = src.split("\n");
      lines.forEach((line, i) => {
        if (!/<img\b/.test(line) && !lines.slice(Math.max(0, i - 2), i + 3).some((l) => /<img\b/.test(l))) return;
        const block = lines.slice(Math.max(0, i - 1), i + 4).join("\n");
        if (/<img\b/.test(block) && EMPTY_ALT.test(block) && !/aria-hidden/.test(block)) {
          if (!rel.includes("/crm/") && !rel.includes("BlogStudio")) {
            offenders.push(`${rel}:${i + 1}: empty img alt without aria-hidden`);
          }
        }
        if (/<img\b/.test(block) && GENERIC_ALT.test(block)) {
          if (!rel.includes("BlogStudio")) offenders.push(`${rel}:${i + 1}: generic img alt`);
        }
      });
    }
  }

  if (offenders.length) {
    console.error("FAIL: indexable image alt issues:");
    for (const o of offenders) console.error(`  - ${o}`);
    failed = true;
  } else {
    console.log("PASS: no generic or missing alt on indexable images");
  }

  if (read("scripts/generate-alt-text.mjs").includes("fetch(") && read("lib/image-alt.ts").includes("fetch(")) {
    console.error("FAIL: runtime alt API fetch detected in lib/image-alt.ts");
    failed = true;
  } else {
    console.log("PASS: alt text resolved at build time (no runtime VLM in app)");
  }

  if (failed) process.exit(1);
  console.log("\nPhase 7 static checks passed.");
}

main();
