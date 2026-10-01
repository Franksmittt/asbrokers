import { mkdir } from "fs/promises";
import { chromium } from "playwright";

async function hmacSha256Hex(secret: string, message: string) {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(message));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function main() {
  const exp = Math.floor(Date.now() / 1000) + 3600;
  const payload = `${exp}.aabbccddeeff001122334455.developer`;
  const sig = await hmacSha256Hex("asbrokers-crm-pin-v1:85879", payload);
  const token = `${payload}.${sig}`;
  await mkdir("/opt/cursor/artifacts", { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 1100 } });
  await context.addCookies([
    {
      name: "asb-crm-pin-session",
      value: token,
      domain: "localhost",
      path: "/",
      httpOnly: true,
      sameSite: "Lax",
    },
  ]);
  const page = await context.newPage();
  await page.goto("http://localhost:3000/crm/teacher?seed=1", { waitUntil: "networkidle" });
  await page.screenshot({ path: "/opt/cursor/artifacts/teacher-os-3-desk.png", fullPage: true });
  await page.goto("http://localhost:3000/crm/teacher?as=monique", { waitUntil: "networkidle" });
  await page.screenshot({ path: "/opt/cursor/artifacts/teacher-os-4-monique.png", fullPage: true });
  await browser.close();
  console.log("saved teacher-os-3-desk.png and teacher-os-4-monique.png");
}

main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
