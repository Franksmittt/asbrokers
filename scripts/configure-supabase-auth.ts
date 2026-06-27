/**
 * PATCH Supabase hosted auth config (Site URL + redirect allow list).
 * Usage: npm run auth:configure
 * Requires: SUPABASE_ACCESS_TOKEN in .env.local (dashboard → Account → Access Tokens)
 */
import { resolve } from "path";
import { config as loadEnv } from "dotenv";

loadEnv({ path: resolve(process.cwd(), ".env") });
loadEnv({ path: resolve(process.cwd(), ".env.local"), override: true });

const PROJECT_REF = "qfpvrwcdomiyryllvdqt";
const API = "https://api.supabase.com/v1";

const SITE_URL = "https://www.asbrokers.co.za";
const REDIRECT_URLS = [
  "https://www.asbrokers.co.za/auth/callback**",
  "https://www.asbrokers.co.za/**",
  "http://localhost:3000/auth/callback**",
  "http://localhost:3000/**",
];

async function main() {
  const token = process.env.SUPABASE_ACCESS_TOKEN?.trim();
  if (!token) {
    console.error("Missing SUPABASE_ACCESS_TOKEN in .env.local");
    process.exit(1);
  }

  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  const before = await fetch(`${API}/projects/${PROJECT_REF}/config/auth`, { headers });
  if (!before.ok) {
    console.error("GET auth config failed:", before.status, await before.text());
    process.exit(1);
  }
  const prev = await before.json();
  console.log("Before — site_url:", prev.site_url);
  console.log("Before — uri_allow_list:", prev.uri_allow_list ?? prev.URI_ALLOW_LIST);

  const patch = await fetch(`${API}/projects/${PROJECT_REF}/config/auth`, {
    method: "PATCH",
    headers,
    body: JSON.stringify({
      site_url: SITE_URL,
      uri_allow_list: REDIRECT_URLS.join(","),
    }),
  });

  if (!patch.ok) {
    console.error("PATCH auth config failed:", patch.status, await patch.text());
    process.exit(1);
  }

  const after = await patch.json();
  console.log("\nOK — site_url:", after.site_url);
  console.log("OK — uri_allow_list:", after.uri_allow_list ?? after.URI_ALLOW_LIST);
  console.log("\nRequest a NEW magic link at https://www.asbrokers.co.za/login");
}

main();
