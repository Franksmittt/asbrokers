/**
 * Generate homepage display-sized WebPs (goal cards + LCP).
 * Run: npx tsx scripts/generate-home-display-images.ts
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const DIR = path.join(process.cwd(), "public", "images");

async function card(src: string, out: string) {
  const absIn = path.join(DIR, src);
  const absOut = path.join(DIR, out);
  await sharp(absIn)
    .rotate()
    .resize({ width: 400, withoutEnlargement: true })
    .webp({ quality: 62 })
    .toFile(absOut);
  console.log(`${out}  ${Math.round(fs.statSync(absOut).size / 1024)}KB`);
}

async function lcp() {
  const patio = path.join(DIR, "home-hero-patio-16x9.jpg");
  const absOut = path.join(DIR, "home-lcp.webp");
  const src = fs.existsSync(patio) ? patio : absOut;
  const tmp = `${absOut}.__tmp`;
  await sharp(src)
    .rotate()
    .resize({ width: 1600, withoutEnlargement: true })
    .webp({ quality: 72 })
    .toFile(tmp);
  fs.renameSync(tmp, absOut);
  console.log(`home-lcp.webp  ${Math.round(fs.statSync(absOut).size / 1024)}KB`);
}

async function main() {
  await card("everest-suite-hero-16x9.jpg", "home-card-investments.webp");
  await card("calculators-capital-lifespan-4x3.jpg", "home-card-retirement.webp");
  await card("risk-arch-commercial.jpg", "home-card-insurance.webp");
  await card("risk-arch-estate.jpg", "home-card-estate.webp");
  await lcp();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
