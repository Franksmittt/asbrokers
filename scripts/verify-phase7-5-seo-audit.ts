/**
 * Phase 7.5 verification — run after build:
 *   npm run build && npx tsx scripts/verify-phase7-5-seo-audit.ts
 *
 * Optional live runtime/link audits (starts next on port 3110):
 *   npx tsx scripts/verify-phase7-5-seo-audit.ts --live
 */
import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { spawn } from "node:child_process";
import { join } from "node:path";
import { buildPageGraph, validateGraphOrphans } from "@/lib/seo";
import { getAlt } from "@/lib/image-alt";

const ROOT = process.cwd();
const LIVE = process.argv.includes("--live");
const PORT = Number(process.env.SEO_VERIFY_PORT ?? 3110);
const BASE = process.env.SEO_BASE_URL ?? `http://127.0.0.1:${PORT}`;

const CALCULATOR_PAGES = [
  "app/(content)/calculators/page.tsx",
  "app/(content)/retirement-planning/page.tsx",
];

const AUDIT_REPORTS = [
  "asbrokers_static_seo_aeo_findings.txt",
  "asbrokers_runtime_seo_aeo_findings.txt",
  "asbrokers_internal_link_graph_audit_findings.txt",
];

function read(path: string): string {
  return readFileSync(join(ROOT, path), "utf8");
}

function parseFindingCount(reportPath: string): number | null {
  if (!existsSync(join(ROOT, reportPath))) return null;
  const match = read(reportPath).match(/Total findings:\s*(\d+)/);
  return match ? Number(match[1]) : null;
}

function runCommand(command: string, args: string[], env: Record<string, string> = {}): Promise<number> {
  return new Promise((resolve) => {
    const child = spawn(command, args, {
      cwd: ROOT,
      shell: true,
      stdio: "inherit",
      env: { ...process.env, ...env },
    });
    child.on("close", (code) => resolve(code ?? 1));
  });
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

async function waitForServer(maxMs = 120000): Promise<void> {
  const start = Date.now();
  while (Date.now() - start < maxMs) {
    try {
      const res = await fetch(`${BASE}/`);
      if (res.ok) return;
    } catch {
      /* retry */
    }
    await sleep(500);
  }
  throw new Error(`Server not ready at ${BASE}`);
}

function startServer() {
  return spawn("npx", ["next", "start", "-p", String(PORT)], {
    cwd: ROOT,
    shell: true,
    stdio: "ignore",
    detached: process.platform !== "win32",
  });
}

function stopServer(server: ReturnType<typeof spawn>) {
  if (!server.pid) return;
  if (process.platform === "win32") {
    spawn("taskkill", ["/pid", String(server.pid), "/T", "/F"], { shell: true, stdio: "ignore" });
  } else {
    process.kill(-server.pid, "SIGTERM");
  }
}

/** Kill any process listening on the verify port (stale next start from prior runs). */
function freeVerifyPort(port: number) {
  if (process.platform === "win32") {
    spawn(
      "powershell",
      [
        "-NoProfile",
        "-Command",
        `$p=(Get-NetTCPConnection -LocalPort ${port} -ErrorAction SilentlyContinue|Select-Object -First 1).OwningProcess; if($p){Stop-Process -Id $p -Force -ErrorAction SilentlyContinue}`,
      ],
      { shell: true, stdio: "ignore" }
    );
    return;
  }
  spawn("sh", ["-c", `lsof -ti:${port} | xargs -r kill -9`], { stdio: "ignore" });
}

async function main() {
  let failed = false;

  const graph = buildPageGraph({
    path: "/calculators",
    webPage: {
      name: "Financial Calculators for South Africans | AS Brokers CC",
      description: "Educational retirement and wealth calculators.",
    },
    primaryImagePath: "/images/calculators-hub-16x9.jpg",
  });

  const imageNode = graph["@graph"].find(
    (node) => typeof node === "object" && node !== null && (node as { "@type"?: string })["@type"] === "ImageObject"
  ) as Record<string, unknown> | undefined;

  if (!imageNode?.contentUrl || !imageNode.width || !imageNode.height) {
    console.error("FAIL: ImageObject missing contentUrl/width/height");
    failed = true;
  } else if (imageNode.caption !== getAlt("/images/calculators-hub-16x9.jpg")) {
    console.error("FAIL: ImageObject caption must come from getAlt()");
    failed = true;
  } else {
    console.log("PASS: ImageObject in @graph with getAlt caption and dimensions");
  }

  const orphans = validateGraphOrphans(graph);
  if (orphans.length) {
    console.error("FAIL: ImageObject graph orphans:", orphans.join(", "));
    failed = true;
  } else {
    console.log("PASS: ImageObject linked in connected @graph");
  }

  for (const page of CALCULATOR_PAGES) {
    const src = read(page);
    if (!src.includes("buildPageMetadata")) {
      console.error(`FAIL: ${page} missing buildPageMetadata()`);
      failed = true;
    }
  }
  if (!failed) console.log("PASS: indexable calculator pages use buildPageMetadata");

  if (!read("app/(content)/calculators/page.tsx").includes("CALCULATOR_REGISTRY")) {
    console.error("FAIL: /calculators hub missing registry listing");
    failed = true;
  } else {
    console.log("PASS: /calculators lists calculators from registry");
  }

  if (!existsSync(join(ROOT, ".next"))) {
    console.error("FAIL: run npm run build before verification");
    process.exit(1);
  }

  let server: ReturnType<typeof spawn> | null = null;
  try {
    if (LIVE) {
      freeVerifyPort(PORT);
      await sleep(1500);
      server = startServer();
      await waitForServer();
    }

    const auditCode = await runCommand("npm", ["run", "seo:audit"], {
      SEO_BASE_URL: BASE,
    });
    if (auditCode !== 0) {
      console.error("FAIL: npm run seo:audit exited non-zero");
      failed = true;
    }

    for (const report of AUDIT_REPORTS) {
      const count = parseFindingCount(report);
      if (count === null) {
        console.error(`FAIL: missing audit report ${report}`);
        failed = true;
        continue;
      }
      if (count > 0) {
        console.error(`FAIL: ${report} has ${count} finding(s)`);
        failed = true;
      } else {
        console.log(`PASS: ${report} → 0 findings`);
      }
    }
  } finally {
    if (server) stopServer(server);
  }

  if (failed) process.exit(1);
  console.log("\nPhase 7.5 verification passed.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
