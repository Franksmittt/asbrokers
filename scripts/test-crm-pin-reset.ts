/**
 * Smoke tests for staff roster + allowlisted PIN reset.
 *
 * Usage: npx tsx scripts/test-crm-pin-reset.ts
 */

import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

const tmpDir = mkdtempSync(path.join(tmpdir(), "crm-pin-"));
process.env.CRM_PIN_OVERRIDES_PATH = path.join(tmpDir, "overrides.json");
process.env.CRM_PIN_RESET_SECRET = "test-crm-pin-reset-secret-32chars";
process.env.CRM_PIN_SESSION_SECRET = "test-crm-pin-session-secret-32";
// Ensure a known bootstrap PIN for developer so clash checks work.
process.env.CRM_PIN_DEVELOPER = "85879";

async function main() {
  const {
    CRM_STAFF_EMAIL_ALLOWLIST,
    CRM_TEAM_MEMBERS,
    isAllowlistedStaffEmail,
    lookupCrmTeamMemberByEmail,
  } = await import("../lib/crm/team-members");
  const {
    completeCrmPinReset,
    createCrmPinResetToken,
    requestCrmPinResetEmail,
    verifyCrmPinResetToken,
  } = await import("../lib/crm/pin-reset");
  const { resolveCrmPinUser } = await import("../lib/crm/pin-store");

  console.log("→ Staff roster allowlist");
  const expected = [
    "albert@asbrokers.co.za",
    "petro@asbrokers.co.za",
    "johnny@asbrokers.co.za",
    "monique@asbrokers.co.za",
    "claims@asbrokers.co.za",
    "corne@asbrokers.co.za",
    "elize@asbrokers.co.za",
  ];
  for (const email of expected) {
    assert.equal(isAllowlistedStaffEmail(email), true, email);
    assert.ok(lookupCrmTeamMemberByEmail(email), `member for ${email}`);
  }
  assert.equal(isAllowlistedStaffEmail("stranger@gmail.com"), false);
  assert.equal(isAllowlistedStaffEmail("ceo@otherfirm.co.za"), false);
  assert.equal(lookupCrmTeamMemberByEmail("stranger@gmail.com"), null);
  assert.ok(CRM_STAFF_EMAIL_ALLOWLIST.size >= expected.length);
  console.log("  allowlist OK (", CRM_STAFF_EMAIL_ALLOWLIST.size, "emails)");

  console.log("→ Outside email does not send");
  const outside = await requestCrmPinResetEmail("random@example.com");
  assert.equal(outside.sent, false);
  assert.equal(outside.member, null);
  console.log("  outside blocked");

  console.log("→ Token create / verify / consume");
  const token = createCrmPinResetToken("corne");
  const parsed = await verifyCrmPinResetToken(token);
  assert.ok(parsed);
  assert.equal(parsed!.memberKey, "corne");

  const parts = token.split(".");
  const sig = parts.pop() ?? "";
  const flipped = (sig[0] === "0" ? "1" : "0") + sig.slice(1);
  const bad = await verifyCrmPinResetToken([...parts, flipped].join("."));
  assert.equal(bad, null);

  const pin = "13579";
  const done = await completeCrmPinReset(token, pin);
  assert.equal(done.ok, true);
  assert.ok(done.ok && done.member.key === "corne");

  const reused = await completeCrmPinReset(token, "24680");
  assert.equal(reused.ok, false);

  const resolved = await resolveCrmPinUser(pin);
  assert.ok(resolved);
  assert.equal(resolved!.key, "corne");
  console.log("  reset + resolve OK for", CRM_TEAM_MEMBERS.corne.email);

  console.log("→ Allowlisted request logs link without Resend");
  const req = await requestCrmPinResetEmail("ELIZE@asbrokers.co.za");
  assert.equal(req.sent, true);
  assert.equal(req.member?.key, "elize");
  console.log("  case-insensitive allowlist OK");

  console.log("\n✓ CRM PIN roster + reset smoke passed");
}

main()
  .catch((error) => {
    console.error("\n✗", error instanceof Error ? error.message : error);
    process.exitCode = 1;
  })
  .finally(() => {
    try {
      rmSync(tmpDir, { recursive: true, force: true });
    } catch {
      /* ignore */
    }
  });
