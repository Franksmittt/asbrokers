import { mkdir, writeFile } from "fs/promises";

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

async function mintDeveloperCookie(): Promise<string> {
  const exp = Math.floor(Date.now() / 1000) + 3600;
  const payload = `${exp}.aabbccddeeff001122334455.developer`;
  const sig = await hmacSha256Hex("asbrokers-crm-pin-v1:85879", payload);
  return `${payload}.${sig}`;
}

async function main() {
  const token = await mintDeveloperCookie();
  const cookie = `asb-crm-pin-session=${token}`;
  const base = process.env.BASE_URL || "http://localhost:3000";

  for (const path of ["/crm/teacher?seed=1", "/crm/teacher?as=monique"]) {
    const res = await fetch(`${base}${path}`, { headers: { cookie } });
    const html = await res.text();
    const safe = path.includes("monique") ? "teacher-os-monique" : "teacher-os-desk";
    await mkdir("/opt/cursor/artifacts", { recursive: true });
    await writeFile(`/opt/cursor/artifacts/${safe}.html`, html);
    console.log(path, res.status, html.length, "→", `/opt/cursor/artifacts/${safe}.html`);
    const checks = ["Teacher OS", "Influence", "WhatsApp", "pipeline", "Monique", "Johnny"];
    console.log(
      "  ",
      checks.map((c) => `${c}:${html.includes(c) ? "y" : "n"}`).join(" ")
    );
  }
}

main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
