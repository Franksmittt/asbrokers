export const LEGACY_CHECKLIST_SECTIONS = [
  {
    title: "Will Planning",
    items: [
      "I have a signed, valid will.",
      "My will has been reviewed in the last 3 years.",
      "My executor knows where the original will is stored.",
      "My will reflects my current family structure.",
    ],
  },
  {
    title: "Trust Planning",
    items: [
      "I understand whether a trust is appropriate for my estate.",
      "Trust deeds and trustees are current and documented.",
      "Trust assets are correctly registered and administered.",
      "Loan accounts and trust distributions have been reviewed.",
    ],
  },
  {
    title: "Estate Liquidity",
    items: [
      "My estate has enough cash to cover executor fees and taxes.",
      "I know what assets may need to be sold to settle the estate.",
      "Life cover or liquidity provisions are in place where needed.",
      "Short-term debts can be settled without forcing asset sales.",
    ],
  },
  {
    title: "Beneficiary Nominations",
    items: [
      "Retirement fund beneficiary nominations are up to date.",
      "Life policy beneficiaries match my current intentions.",
      "Former spouse or outdated nominations have been removed.",
      "Beneficiary splits are clearly documented.",
    ],
  },
  {
    title: "Family Succession",
    items: [
      "My family knows the basics of my estate plan.",
      "Guardianship provisions exist for dependent children.",
      "Blended family arrangements have been considered.",
      "Potential disputes have been discussed with an adviser.",
    ],
  },
  {
    title: "Business Succession",
    items: [
      "Buy-and-sell or succession agreements are in place (if applicable).",
      "Key person risk has been identified.",
      "Business debt and personal guarantees are understood.",
      "Shareholding and control transfer has been planned.",
    ],
  },
  {
    title: "Estate Duty Risks",
    items: [
      "I know my estimated estate duty exposure.",
      "Donations and annual exemptions have been considered.",
      "Spouse and trust structures have been reviewed for duty efficiency.",
      "I understand which assets attract duty and which may not.",
    ],
  },
  {
    title: "Executor Readiness",
    items: [
      "My executor is willing and able to act.",
      "A list of assets, liabilities, and advisers is documented.",
      "Important documents are accessible to the right people.",
      "My family knows who to contact if something happens.",
    ],
  },
] as const;
