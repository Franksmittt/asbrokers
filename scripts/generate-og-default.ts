/**
 * Generate static OG fallback asset — run: npx tsx scripts/generate-og-default.ts
 * Output: public/images/og-default.jpg (PNG payload; Satori does not emit JPEG)
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { createOgImageResponse } from "../lib/og-image";

function loadNodeOgFonts() {
  const buf = readFileSync(join(process.cwd(), "lib", "fonts", "Inter-Bold.woff"));
  const data = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
  return [{ name: "Inter" as const, data, weight: 700 as const, style: "normal" as const }];
}

async function main() {
  const res = await createOgImageResponse(
    {
      title: "AS Brokers CC",
      description:
        "Independent financial advisor in Krugersdorp: retirement, Everest Wealth, insurance, and estate planning. FSP 17273.",
    },
    loadNodeOgFonts()
  );
  const buf = Buffer.from(await res.arrayBuffer());
  const outDir = join(process.cwd(), "public", "images");
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "og-default.jpg"), buf);
  console.log(`Wrote og-default.jpg (${buf.length} bytes)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
