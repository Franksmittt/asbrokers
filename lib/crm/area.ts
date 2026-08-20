/** West Rand / Krugersdorp catchment used for Albert's local commercial campaign. */

const KRUGERSDORP_ALIASES = [
  "krugersdorp",
  "kenmare",
  "wentworth park",
  "noordheuwel",
  "monument",
  "factoria",
  "chamdor",
  "boltonia",
  "lewisham",
  "rangeview",
  "rant-en-dal",
  "rant en dal",
  "silverfields",
  "mindalore",
  "burgershoop",
  "luipaardsvlei",
  "west krugersdorp",
  "muldersdrift",
  "tarlton",
  "magaliesburg",
  "hekpoort",
  "west rand",
  "wes-rand",
  "wes rand",
] as const;

export function normalizeAreaLabel(value: string | null | undefined): string {
  return (value ?? "").trim().replace(/\s+/g, " ");
}

function haystack(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[_/]+/g, " ");
}

export function isKrugersdorpCatchment(value: string | null | undefined): boolean {
  const text = haystack(normalizeAreaLabel(value));
  if (!text) return false;
  return KRUGERSDORP_ALIASES.some((alias) => text.includes(alias));
}

export function looksLikeKrugersdorpLead(parts: Array<string | null | undefined>): boolean {
  return isKrugersdorpCatchment(parts.filter(Boolean).join(" "));
}

export const KRUGERSDORP_AREA_OPTIONS = [
  "Krugersdorp",
  "Kenmare",
  "Noordheuwel",
  "Monument",
  "Factoria",
  "Chamdor",
  "Boltonia",
  "Rangeview",
  "Rant-en-Dal",
  "Silverfields",
  "Muldersdrift",
  "Tarlton",
  "Magaliesburg",
  "West Rand",
] as const;
