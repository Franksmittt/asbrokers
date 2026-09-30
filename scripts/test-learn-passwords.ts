import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { hashPassword, verifyPassword } from "../lib/courses/password";
import {
  authenticateStudent,
  resetCourseStoreForTests,
  upsertStudent,
} from "../lib/courses/store";

describe("learn passwords", () => {
  it("hashes and verifies passwords", () => {
    const stored = hashPassword("Learning2026!");
    assert.ok(stored.startsWith("scrypt$"));
    assert.equal(verifyPassword("Learning2026!", stored), true);
    assert.equal(verifyPassword("wrong-password", stored), false);
  });

  it("authenticates a signed-up learner", async () => {
    resetCourseStoreForTests();
    await upsertStudent({
      firstName: "Ada",
      surname: "Molefe",
      email: "ada.molefe@example.com",
      privacyConsent: true,
      marketingConsent: false,
      password: "Clarity99",
    });
    const ok = await authenticateStudent("ada.molefe@example.com", "Clarity99");
    assert.ok(ok);
    assert.equal(ok?.email, "ada.molefe@example.com");
    const bad = await authenticateStudent("ada.molefe@example.com", "nope");
    assert.equal(bad, null);
  });
});
