/**
 * Phase 6 verification — run after build:
 *   npm run build && npx tsx scripts/verify-phase6-og.ts
 *
 * Optional live HTTP checks (starts next start on PORT 3099):
 *   npx tsx scripts/verify-phase6-og.ts --live
 */
import { readFileSync, statSync, existsSync } from "node:fs";
import { spawn } from "node:child_process";
import { join } from "node:path";

const ROOT = process.cwd();
const LIVE = process.argv.includes("--live");
const PORT = Number(process.env.OG_VERIFY_PORT ?? 3100);
const BASE = `http://127.0.0.1:${PORT}`;

function read(path: string): string {
  return readFileSync(join(ROOT, path), "utf8");
}

function pngDimensions(buf: Buffer): { width: number; height: number } | null {
  if (buf.length < 24 || buf.toString("ascii", 1, 4) !== "PNG") return null;
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
}

async function fetchOg(path: string): Promise<{ status: number; headers: Headers; body: Buffer }> {
  const res = await fetch(`${BASE}${path}`);
  const body = Buffer.from(await res.arrayBuffer());
  return { status: res.status, headers: res.headers, body };
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

async function waitForServer(maxMs = 120000): Promise<void> {
  const start = Date.now();
  while (Date.now() - start < maxMs) {
    try {
      const res = await fetch(`${BASE}/opengraph-image`);
      if (res.ok) return;
    } catch {
      /* retry */
    }
    await sleep(500);
  }
  throw new Error("Server did not become ready in time");
}

function startServer() {
  return spawn("npx", ["next", "start", "-p", String(PORT)], {
    cwd: ROOT,
    shell: true,
    stdio: "ignore",
    detached: process.platform !== "win32",
  });
}

async function main() {
  let failed = false;

  const required = [
    "lib/og-image.tsx",
    "lib/og-fonts.ts",
    "app/opengraph-image.tsx",
    "app/api/og/route.tsx",
    "lib/fonts/Inter-Bold.woff",
    "public/images/og-default.jpg",
  ];
  for (const file of required) {
    if (!existsSync(join(ROOT, file))) {
      console.error(`FAIL: missing ${file}`);
      failed = true;
    }
  }
  if (!failed) console.log("PASS: Phase 6 source files present");

  const seoMeta = read("lib/seo-metadata.ts");
  if (!seoMeta.includes("buildDynamicOgImageUrl") || !seoMeta.includes("summary_large_image")) {
    console.error("FAIL: seo-metadata missing dynamic OG integration");
    failed = true;
  } else {
    console.log("PASS: metadata uses dynamic OG URLs and summary_large_image");
  }

  if (!read("lib/og-image.tsx").includes("Cache-Control")) {
    console.error("FAIL: OG response missing Cache-Control headers");
    failed = true;
  } else {
    console.log("PASS: Cache-Control configured on ImageResponse");
  }

  if (!read("lib/og-fonts.ts").includes("import.meta.url")) {
    console.error("FAIL: font must load via module-scope import.meta.url cache");
    failed = true;
  } else {
    console.log("PASS: edge font loaded at module scope");
  }

  const fontSize = statSync(join(ROOT, "lib/fonts/Inter-Bold.woff")).size;
  if (fontSize > 120_000) {
    console.error(`FAIL: OG font too large for edge bundle (${fontSize} bytes)`);
    failed = true;
  } else {
    console.log(`PASS: OG font size ${fontSize} bytes (under edge budget)`);
  }

  if (read("app/(content)/page.tsx").includes("opengraph-image.jpg")) {
    console.error("FAIL: stale opengraph-image.jpg reference on homepage");
    failed = true;
  } else {
    console.log("PASS: no stale opengraph-image.jpg on homepage");
  }

  if (!LIVE) {
    if (failed) process.exit(1);
    console.log("\nPhase 6 static checks passed. Re-run with --live after `npm run build` for HTTP checks.");
    return;
  }

  if (!existsSync(join(ROOT, ".next"))) {
    console.error("FAIL: run npm run build before --live");
    process.exit(1);
  }

  const server = startServer();
  try {
    await waitForServer();

    const routes = [
      "/opengraph-image",
      "/api/og?title=Estate%20Planning&description=Structured%20estate%20and%20duty%20planning%20for%20South%20African%20families.",
    ];

    for (const route of routes) {
      const { status, headers, body } = await fetchOg(route);
      if (status !== 200) {
        console.error(`FAIL: ${route} returned ${status}`);
        failed = true;
        continue;
      }

      const cache = headers.get("cache-control") ?? "";
      if (!cache.includes("max-age=3600") || !cache.includes("stale-while-revalidate=86400")) {
        console.error(`FAIL: ${route} missing Cache-Control (got: ${cache})`);
        failed = true;
      }

      if (body.length > 8 * 1024 * 1024) {
        console.error(`FAIL: ${route} exceeds 8MB (${body.length} bytes)`);
        failed = true;
      }

      const dims = pngDimensions(body);
      if (!dims || dims.width !== 1200 || dims.height !== 630) {
        console.error(`FAIL: ${route} dimensions ${dims?.width}x${dims?.height}, expected 1200x630`);
        failed = true;
      } else {
        console.log(`PASS: ${route} → 200, ${dims.width}x${dims.height}, ${body.length} bytes, Cache-Control OK`);
      }
    }
  } finally {
    if (process.platform === "win32") {
      spawn("taskkill", ["/pid", String(server.pid), "/T", "/F"], { shell: true, stdio: "ignore" });
    } else {
      process.kill(-server.pid!, "SIGTERM");
    }
  }

  if (failed) process.exit(1);
  console.log("\nPhase 6 verification passed (static + live HTTP).");
  console.log("Manual: validate with Facebook Sharing Debugger and Twitter Card Validator.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
