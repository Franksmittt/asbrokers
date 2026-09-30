import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  applyMomentum,
  emptyClarityProfile,
  previousWeekKey,
  tierForPoints,
  topPerformerScore,
  weekKey,
} from "../lib/courses/clarity-track";

describe("clarity track", () => {
  it("maps insight points to named tiers", () => {
    assert.equal(tierForPoints(0).id, "foundation");
    assert.equal(tierForPoints(200).id, "clarity");
    assert.equal(tierForPoints(500).id, "confidence");
    assert.equal(tierForPoints(1000).id, "freedom");
  });

  it("scores top performers with points and momentum", () => {
    assert.equal(topPerformerScore(100, 5), 100 * 0.6 + 5 * 16);
  });

  it("grows weekly momentum and spends a monthly save across a gap", () => {
    let profile = emptyClarityProfile("stu_x", new Date("2026-09-01T10:00:00.000Z"));
    const week1 = weekKey(new Date("2026-09-01T10:00:00.000Z"));
    const week2 = weekKey(new Date("2026-09-08T10:00:00.000Z"));
    // Force known keys for determinism
    profile.lastActiveWeekKey = null;

    const first = applyMomentum(profile, new Date("2026-09-01T10:00:00.000Z"));
    assert.equal(first.profile.momentumWeeks, 1);
    assert.equal(first.profile.lastActiveWeekKey, week1);

    const second = applyMomentum(first.profile, new Date("2026-09-08T10:00:00.000Z"));
    assert.equal(second.profile.momentumWeeks, 2);
    assert.equal(second.profile.lastActiveWeekKey, week2);

    // Skip a week → save spends, streak kept
    const skipped = applyMomentum(second.profile, new Date("2026-09-22T10:00:00.000Z"));
    assert.equal(skipped.usedSave, true);
    assert.ok(skipped.profile.momentumWeeks >= 1);
    assert.equal(skipped.profile.momentumSavesRemaining, 0);
  });

  it("computes previous week keys", () => {
    assert.equal(previousWeekKey("2026-W10"), "2026-W09");
    assert.equal(previousWeekKey("2026-W01"), "2025-W52");
  });
});
