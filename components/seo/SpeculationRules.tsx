/** Phase 5.3 — Speculation Rules API for prerender/prefetch (Chromium). */
export function SpeculationRules() {
  const rules = {
    prerender: [
      {
        source: "document",
        where: {
          and: [
            { href_matches: "/contact" },
            { not: { href_matches: "/api/*" } },
            { not: { href_matches: "/login*" } },
            { not: { href_matches: "/crm/*" } },
            { not: { href_matches: "/studio/*" } },
            { not: { href_matches: "/internal/*" } },
            { not: { selector_matches: ".no-prerender" } },
          ],
        },
        eagerness: "eager",
      },
    ],
    prefetch: [
      {
        source: "document",
        where: {
          and: [
            { href_matches: "/*" },
            { not: { href_matches: "/api/*" } },
            { not: { href_matches: "/login*" } },
            { not: { href_matches: "/crm/*" } },
            { not: { href_matches: "/studio/*" } },
            { not: { href_matches: "/internal/*" } },
            { not: { href_matches: "/embed/*" } },
            { not: { selector_matches: ".no-prerender" } },
          ],
        },
        eagerness: "moderate",
      },
    ],
  };

  return (
    <script
      type="speculationrules"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(rules) }}
    />
  );
}
