"use client";

import { useEffect } from "react";

/** Injects speculation rules after idle so they do not compete with LCP (Phase 9). */
export function SpeculationRulesClient() {
  useEffect(() => {
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
          eagerness: "moderate",
        },
      ],
    };

    const script = document.createElement("script");
    script.type = "speculationrules";
    script.textContent = JSON.stringify(rules);
    document.head.appendChild(script);
    return () => {
      script.remove();
    };
  }, []);

  return null;
}
