#!/usr/bin/env node
/**
 * Phase 10.3 — Google Search Console URL Inspection (post-deploy).
 *
 * Required env (skip gracefully if absent):
 *   GSC_PROPERTY          — e.g. https://www.asbrokers.co.za/ or sc-domain:asbrokers.co.za
 *   GOOGLE_APPLICATION_CREDENTIALS — path to service account JSON with Search Console access
 *
 * Optional:
 *   GSC_SAMPLE_URLS       — comma-separated absolute URLs (defaults to homepage + top routes)
 */
import { readFileSync, existsSync } from "node:fs";
import { createSign } from "node:crypto";

const GSC_PROPERTY = process.env.GSC_PROPERTY;
const CREDS_PATH = process.env.GOOGLE_APPLICATION_CREDENTIALS;
const DEFAULT_ORIGIN = "https://www.asbrokers.co.za";

const DEFAULT_SAMPLES = [
  `${DEFAULT_ORIGIN}/`,
  `${DEFAULT_ORIGIN}/contact`,
  `${DEFAULT_ORIGIN}/calculators`,
  `${DEFAULT_ORIGIN}/about`,
  `${DEFAULT_ORIGIN}/everest-wealth`,
  `${DEFAULT_ORIGIN}/solutions`,
];

const SAMPLE_URLS = (process.env.GSC_SAMPLE_URLS ?? "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

const URLS = SAMPLE_URLS.length > 0 ? SAMPLE_URLS : DEFAULT_SAMPLES;

function base64url(input) {
  return Buffer.from(input)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

async function getAccessToken(creds) {
  const now = Math.floor(Date.now() / 1000);
  const header = base64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claim = base64url(
    JSON.stringify({
      iss: creds.client_email,
      scope: "https://www.googleapis.com/auth/webmasters",
      aud: "https://oauth2.googleapis.com/token",
      iat: now,
      exp: now + 3600,
    })
  );
  const unsigned = `${header}.${claim}`;
  const sign = createSign("RSA-SHA256");
  sign.update(unsigned);
  sign.end();
  const signature = sign
    .sign(creds.private_key)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
  const jwt = `${unsigned}.${signature}`;

  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });
  if (!tokenRes.ok) {
    throw new Error(`Token exchange failed: ${tokenRes.status} ${await tokenRes.text()}`);
  }
  const { access_token: accessToken } = await tokenRes.json();
  return accessToken;
}

async function inspectUrl(accessToken, siteUrl, inspectionUrl) {
  const res = await fetch("https://searchconsole.googleapis.com/v1/urlInspection/index:inspect", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ inspectionUrl, siteUrl }),
  });
  if (!res.ok) {
    throw new Error(`Inspect ${inspectionUrl} failed: ${res.status} ${await res.text()}`);
  }
  return res.json();
}

async function main() {
  if (!GSC_PROPERTY || !CREDS_PATH) {
    console.log(
      "SKIP: GSC canonical check — set GSC_PROPERTY and GOOGLE_APPLICATION_CREDENTIALS to run post-deploy."
    );
    process.exit(0);
  }
  if (!existsSync(CREDS_PATH)) {
    console.error(`FAIL: credentials file not found: ${CREDS_PATH}`);
    process.exit(1);
  }

  const creds = JSON.parse(readFileSync(CREDS_PATH, "utf8"));
  const accessToken = await getAccessToken(creds);
  let failed = false;

  for (const inspectionUrl of URLS) {
    const data = await inspectUrl(accessToken, GSC_PROPERTY, inspectionUrl);
    const index = data?.inspectionResult?.indexStatusResult;
    const userCanonical = index?.userCanonical ?? null;
    const googleCanonical = index?.googleCanonical ?? null;

    console.log(`\n${inspectionUrl}`);
    console.log(`  userCanonical:   ${userCanonical ?? "(none)"}`);
    console.log(`  googleCanonical: ${googleCanonical ?? "(none)"}`);

    if (userCanonical && googleCanonical && userCanonical !== googleCanonical) {
      console.error(`  MISMATCH: user vs Google canonical`);
      failed = true;
    } else if (userCanonical && !googleCanonical) {
      console.warn(`  WARN: Google canonical not yet assigned (indexing may be pending)`);
    } else {
      console.log(`  OK`);
    }
  }

  if (failed) {
    console.error("\nGSC canonical check failed on one or more URLs.");
    process.exit(1);
  }
  console.log("\nGSC canonical check passed.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
