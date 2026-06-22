import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { isBlockedTrainingBot, isPrivateRoute } from "@/lib/crawler-policy";
import { normalizeRequestUrl } from "@/lib/url-normalize";

const GONE_CACHE = "public, max-age=86400";

/**
 * Edge layer (Handbook Phase 1):
 * 1.1 URL normalization — strip utm tracking params, fbclid, gclid; trailing junk → 301
 * 1.2 Crawl traps → 410 Gone
 * 1.3 Training-bot firewall → 403 (see app/robots.ts)
 * Private app routes → X-Robots-Tag noindex (Search Central / RFC 9309)
 */
export function middleware(request: NextRequest) {
  const ua = request.headers.get("user-agent") ?? "";

  if (isBlockedTrainingBot(ua)) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  const normalized = normalizeRequestUrl(request.nextUrl);

  if (normalized.action === "gone") {
    return new NextResponse("Gone", {
      status: 410,
      headers: { "Cache-Control": GONE_CACHE },
    });
  }

  if (normalized.action === "redirect") {
    return NextResponse.redirect(normalized.url, 301);
  }

  const res = NextResponse.next();

  if (isPrivateRoute(request.nextUrl.pathname)) {
    res.headers.set("X-Robots-Tag", "noindex, nofollow");
  }

  res.headers.set("x-pathname", request.nextUrl.pathname);

  return res;
}

export const config = {
  matcher: [
    /*
     * All routes except Next internals. Static file extensions skip middleware
     * so /images/* case-sensitive paths are never rewritten at the edge.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|ico|woff2?|ttf|otf)$).*)",
  ],
};
