import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

/**
 * Let crawlers retrieve HTML so they honour noindex — avoids robots-only blocks that
 * produce “indexed without content” ghosts (Search Central / RFC 9309 interplay).
 */
export function middleware(_request: NextRequest) {
  const res = NextResponse.next();
  res.headers.set("X-Robots-Tag", "noindex, nofollow");
  return res;
}

export const config = {
  matcher: [
    "/login",
    "/login/:path*",
    "/crm",
    "/crm/:path*",
    "/internal",
    "/internal/:path*",
    "/studio",
    "/studio/:path*",
  ],
};
