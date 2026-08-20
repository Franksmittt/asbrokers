import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { isKrugersdorpCatchment, looksLikeKrugersdorpLead } from "../lib/crm/area";
import { inferCampaignStamp } from "../lib/crm/campaign-stamp";
import {
  ALBERT_KRUGERSDORP_BIZ_CAMPAIGN,
  mondayOfWeek,
  resolveCampaignPace,
  scoreCampaignProgress,
} from "../lib/crm/goals";
import type { CrmLead } from "../lib/crm/types";

function lead(partial: Partial<CrmLead> & Pick<CrmLead, "id" | "name">): CrmLead {
  return {
    email: "owner@example.com",
    phone: "0670000000",
    status: "new",
    intent: "Business insurance",
    service_category: "short_term_business",
    lead_score: 40,
    assignedAdvisorId: ALBERT_KRUGERSDORP_BIZ_CAMPAIGN.ownerAdvisorId,
    estimatedCapital: 0,
    funnelData: { assessment: "", score: "", keyRisk: "", capital: "" },
    createdAt: "2026-08-21T08:00:00.000Z",
    ...partial,
  };
}

describe("Krugersdorp catchment", () => {
  it("matches West Rand suburbs and Afrikaans landing copy", () => {
    assert.equal(isKrugersdorpCatchment("Chamdor"), true);
    assert.equal(isKrugersdorpCatchment("Wes-Rand"), true);
    assert.equal(isKrugersdorpCatchment("Sandton"), false);
    assert.equal(looksLikeKrugersdorpLead(["besigheidsversekering-krugersdorp"]), true);
  });
});

describe("campaign stamp", () => {
  it("tags Afrikaans business-insurance callbacks onto Albert's campaign", () => {
    const stamp = inferCampaignStamp({
      serviceCategory: "short_term_business",
      sourceFunnel: "callback_form",
      rawPayload: { source: "callback_business_insurance_af" },
    });
    assert.equal(stamp.area, "Krugersdorp");
    assert.equal(stamp.isKrugersdorpCommercial, true);
    assert.equal(stamp.campaignId, ALBERT_KRUGERSDORP_BIZ_CAMPAIGN.id);
  });

  it("does not steal generic commercial leads from Johnny", () => {
    const stamp = inferCampaignStamp({
      serviceCategory: "short_term_business",
      sourceFunnel: "callback_form",
      rawPayload: { source: "callback_business_insurance" },
    });
    assert.equal(stamp.isKrugersdorpCommercial, false);
  });
});

describe("Albert 10-client reverse funnel", () => {
  it("needs 25 quotes and 229 outreach for 10 binds", () => {
    assert.equal(ALBERT_KRUGERSDORP_BIZ_CAMPAIGN.funnelTargets.binds, 10);
    assert.equal(ALBERT_KRUGERSDORP_BIZ_CAMPAIGN.funnelTargets.quotes, 25);
    assert.equal(ALBERT_KRUGERSDORP_BIZ_CAMPAIGN.funnelTargets.outreach, 229);
    assert.equal(
      ALBERT_KRUGERSDORP_BIZ_CAMPAIGN.sourceMix.reduce((sum, row) => sum + row.targetClients, 0),
      10
    );
  });

  it("scores won policies and flags behind pace early in the window", () => {
    const progress = scoreCampaignProgress(
      ALBERT_KRUGERSDORP_BIZ_CAMPAIGN,
      [
        lead({ id: "1", name: "Bound Co", status: "won", area: "Krugersdorp", wonAt: "2026-08-25T10:00:00.000Z" }),
        lead({ id: "2", name: "Quote Co", status: "proposal", area: "Factoria" }),
        lead({ id: "3", name: "Cape Co", status: "won", area: "Cape Town" }),
      ],
      { now: new Date("2026-09-20T10:00:00.000Z") }
    );
    assert.equal(progress.won, 1);
    assert.equal(progress.funnel.actuals.quotes, 2);
    assert.equal(progress.matchingLeadIds.includes("3"), false);
    assert.equal(progress.pace === "behind" || progress.pace === "at_risk", true);
  });

  it("marks at_risk when the late pipeline cannot cover remaining binds", () => {
    const pace = resolveCampaignPace({
      won: 2,
      expectedWonByNow: 8,
      remaining: 8,
      daysRemaining: 10,
      activePipeline: 3,
    });
    assert.equal(pace, "at_risk");
  });

  it("returns a Monday week-start", () => {
    assert.equal(mondayOfWeek("2026-08-20"), "2026-08-17");
    assert.equal(mondayOfWeek("2026-08-17"), "2026-08-17");
  });
});
