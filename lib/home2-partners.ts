/**
 * Product providers and markets AS Brokers works with, for homepage trust strips.
 * Wording is category-level where scheme/insurer choice is client-specific.
 */

export type PartnerGroup = {
  id: string;
  label: string;
  description: string;
  href?: string;
  names: readonly string[];
};

/** Documented key product partners (AS_BROKERS_SERVICES, TrustBar, CUSTOMER_OVERVIEW). */
export const CORE_PRODUCT_PARTNERS = [
  { name: "Everest Wealth", note: "Structured retirement & voluntary investments" },
  { name: "Santam", note: "Short-term personal & commercial" },
  { name: "Old Mutual", note: "Life & long-term risk" },
  { name: "Bryte", note: "Short-term insurance" },
] as const;

export const PARTNER_GROUPS: PartnerGroup[] = [
  {
    id: "wealth",
    label: "Retirement & investments",
    description: "Structured income and growth solutions distributed under FSP 17273.",
    href: "/everest-wealth",
    names: ["Everest Wealth", "Living annuity planning", "Voluntary investments"],
  },
  {
    id: "insurance",
    label: "Personal & commercial insurance",
    description: "Short-term cover, liability, fleet, and business interruption.",
    href: "/solutions/business-insurance",
    names: ["Santam", "Bryte", "Commercial & personal lines"],
  },
  {
    id: "life",
    label: "Life & business assurance",
    description: "Death, disability, key person, and buy-sell structures.",
    href: "/solutions/business-life",
    names: ["Old Mutual", "Key person", "Buy & sell"],
  },
  {
    id: "health",
    label: "Medical aid, gap cover & wellness",
    description: "Discovery Health Medical Scheme guidance, gap shortfall cover, and wellness planning via FSP 17273.",
    href: "/solutions/discovery-health",
    names: ["Discovery Health", "Medical schemes", "Gap cover", "Wellness integration"],
  },
];
