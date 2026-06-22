/**
 * Phase 9 verification — run after build:
 *   npm run build && npm run test:visual && npm run test:lighthouse
 *   npx tsx scripts/verify-phase9-performance.ts
 */
import { existsSync, readFileSync, writeFileSync, mkdirSync, readdirSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const AUDIT_LOG = join(ROOT, "lhci-reports", "phase9-audit-log.txt");
const LHCI_MANIFEST_CANDIDATES = [
  join(ROOT, "lhci-reports", "manifest.json"),
  join(ROOT, ".lighthouseci", "manifest.json"),
];
const SNAPSHOTS_DIR = join(ROOT, "tests", "visual.spec.ts-snapshots");

function read(path: string): string {
  return readFileSync(path, "utf8");
}

function resolveLhciManifest(): string | null {
  for (const path of LHCI_MANIFEST_CANDIDATES) {
    if (existsSync(path)) return path;
  }
  return null;
}

type ManifestEntry = {
  url: string;
  jsonPath?: string;
  summary?: { performance?: number };
};

function isHomepage(url: string): boolean {
  try {
    const pathname = new URL(url).pathname;
    return pathname === "/" || pathname === "";
  } catch {
    return false;
  }
}

function parseLhciManifest(): { lcpMs: number | null; cls: number | null; perf: number | null } {
  const manifestPath = resolveLhciManifest();
  if (!manifestPath) {
    return { lcpMs: null, cls: null, perf: null };
  }
  const entries = JSON.parse(read(manifestPath)) as ManifestEntry[];
  const homepageEntries = entries.filter((entry) => isHomepage(entry.url));

  let lcpMs: number | null = null;
  let cls: number | null = null;
  const homepagePerf: number[] = [];

  for (const entry of homepageEntries) {
    if (typeof entry.summary?.performance === "number") {
      homepagePerf.push(entry.summary.performance);
    }
    if (!entry.jsonPath || !existsSync(entry.jsonPath)) continue;
    const report = JSON.parse(read(entry.jsonPath)) as {
      audits?: Record<string, { numericValue?: number }>;
    };

    const lcp = report.audits?.["largest-contentful-paint"]?.numericValue;
    if (typeof lcp === "number") {
      lcpMs = lcpMs === null ? lcp : Math.min(lcpMs, lcp);
    }
    const clsVal = report.audits?.["cumulative-layout-shift"]?.numericValue;
    if (typeof clsVal === "number") {
      cls = cls === null ? clsVal : Math.max(cls, clsVal);
    }
  }

  // Match LHCI default aggregation: optimistic minScore → best homepage run.
  const perf = homepagePerf.length > 0 ? Math.max(...homepagePerf) : null;

  return { lcpMs, cls, perf };
}

function main() {
  let failed = false;
  const lines: string[] = [
    "AS Brokers Phase 9 Performance Audit Log",
    `Generated: ${new Date().toISOString()}`,
    "",
  ];

  const snapshotFiles = existsSync(SNAPSHOTS_DIR)
    ? readdirSync(SNAPSHOTS_DIR).filter((f) => f.endsWith(".png"))
    : [];
  if (snapshotFiles.length === 0) {
    console.error("FAIL: no visual baselines in tests/visual.spec.ts-snapshots/ (generate via Linux Docker)");
    failed = true;
  } else {
    lines.push(`Visual baselines: ${snapshotFiles.join(", ")}`);
    console.log(`PASS: visual baselines present (${snapshotFiles.length} file(s))`);
  }

  const { lcpMs, cls, perf } = parseLhciManifest();
  if (perf === null) {
    console.error(
      "FAIL: run npm run test:lighthouse first (lhci-reports/manifest.json or .lighthouseci/manifest.json missing)",
    );
    failed = true;
  } else {
    lines.push(`Lighthouse homepage performance (best run): ${(perf * 100).toFixed(0)} (target ≥ 90)`);
    if (perf < 0.9) {
      console.error(`FAIL: Lighthouse performance ${(perf * 100).toFixed(0)} < 90`);
      failed = true;
    } else {
      console.log(`PASS: Lighthouse performance ≥ 90 (${(perf * 100).toFixed(0)})`);
    }
  }

  if (lcpMs !== null) {
    lines.push(`LCP homepage (best run): ${Math.round(lcpMs)} ms (warn target ≤ 2500 ms)`);
    if (lcpMs > 2500) {
      console.warn(`WARN: LCP ${Math.round(lcpMs)} ms > 2500 ms (lighthouserc warn only)`);
    } else {
      console.log(`PASS: LCP ${Math.round(lcpMs)} ms ≤ 2500 ms`);
    }
  }

  if (cls !== null) {
    lines.push(`CLS (worst run): ${cls.toFixed(3)} (target ≤ 0.1)`);
    if (cls > 0.1) {
      console.error(`FAIL: CLS ${cls.toFixed(3)} > 0.1`);
      failed = true;
    } else {
      console.log(`PASS: CLS ${cls.toFixed(3)} ≤ 0.1`);
    }
  }

  mkdirSync(join(ROOT, "lhci-reports"), { recursive: true });
  writeFileSync(AUDIT_LOG, `${lines.join("\n")}\n`, "utf8");
  console.log(`Audit log: ${AUDIT_LOG}`);

  if (failed) process.exit(1);
  console.log("\nPhase 9 verification passed.");
}

main();
