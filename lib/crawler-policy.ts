/**
 * Crawler policy shared by middleware.ts and app/robots.ts (Handbook Phase 1).
 */

/** Uncompensated LLM training scrapers — blocked at edge with 403. */
export const BLOCKED_TRAINING_BOTS = /GPTBot|ClaudeBot|CCBot/i;

/** Live retrieval / search indexing — allowed through edge firewall. */
export const ALLOWED_ANSWER_AND_SEARCH_BOTS =
  /OAI-SearchBot|PerplexityBot|Claude-Web|Googlebot|Google-InspectionTool|bingbot|Applebot/i;

export function isBlockedTrainingBot(userAgent: string): boolean {
  if (!userAgent) return false;
  if (ALLOWED_ANSWER_AND_SEARCH_BOTS.test(userAgent)) return false;
  return BLOCKED_TRAINING_BOTS.test(userAgent);
}

/** Routes that receive X-Robots-Tag: noindex via middleware (not robots Disallow). */
export const PRIVATE_ROUTE_PREFIXES = ["/login", "/crm", "/portal", "/internal", "/studio"] as const;

export function isPrivateRoute(pathname: string): boolean {
  return PRIVATE_ROUTE_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}
