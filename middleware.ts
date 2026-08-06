import { createServerClient } from "@supabase/ssr";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import {
  CONTAINMENT_HOLDING_PATH,
  isContainmentRestrictedPath,
} from "@/lib/compliance/containment";
import {
  SOFT_LOCK_PATH,
  SOFT_LOCK_PREVIEW_COOKIE,
  getSoftLockPreviewToken,
  isSoftLockEnabled,
  isSoftLockExemptPath,
} from "@/lib/compliance/soft-lock";
import { isBlockedTrainingBot, isPrivateRoute } from "@/lib/crawler-policy";
import {
  CRM_PIN_COOKIE,
  hasCrmPinSessionFromCookieValue,
} from "@/lib/crm/pin-session";
import {
  GOAL_ENGINEERING_EMBED_PATH,
  hasActiveFinancialFreedomMembership,
} from "@/lib/membership/access";
import { normalizeRequestUrl } from "@/lib/url-normalize";
import {
  ATTRIBUTION_COOKIE,
  ATTRIBUTION_MAX_AGE_SECONDS,
  extractAttribution,
} from "@/lib/attribution";

const GONE_CACHE = "public, max-age=86400";

const PROTECTED_PREFIXES = ["/crm", "/portal"] as const;

function isProtectedAppRoute(pathname: string): boolean {
  return PROTECTED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );
}

function roleFromAppMetadata(user: { app_metadata?: Record<string, unknown> }): string {
  const role = user.app_metadata?.role;
  return typeof role === "string" ? role.toLowerCase() : "";
}

function defaultRedirectForRole(role: string): "/crm" | "/portal" {
  if (role === "admin" || role === "staff") {
    return "/crm";
  }
  return "/portal";
}

function createSupabaseMiddlewareClient(request: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();
  const key = serviceKey || anonKey;
  if (!url || !key) {
    return null;
  }

  let response = NextResponse.next({ request });

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        );
      },
    },
  });

  return { supabase, getResponse: () => response };
}

/**
 * Edge layer: compliance containment + SEO/crawler policy + Supabase SSR auth for /crm and /portal.
 */
export async function middleware(request: NextRequest) {
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
    const redirectResponse = NextResponse.redirect(normalized.url, 301);
    /**
     * Preserve ad-click attribution (gclid/utm_*) in a first-party cookie
     * before the tracking params are stripped, so lead forms can attach it.
     */
    const attribution = extractAttribution(
      request.nextUrl,
      request.headers.get("referer")
    );
    if (attribution) {
      redirectResponse.cookies.set(
        ATTRIBUTION_COOKIE,
        JSON.stringify(attribution),
        {
          path: "/",
          maxAge: ATTRIBUTION_MAX_AGE_SECONDS,
          httpOnly: true,
          sameSite: "lax",
          secure: true,
        }
      );
    }
    return redirectResponse;
  }

  const pathname = request.nextUrl.pathname;

  /**
   * Optional site soft-lock (OFF unless SITE_SOFT_LOCK=1/true/on).
   * When enabled: public visitors see /site-hold.
   * Review bypass: add ?preview=<token> once (sets cookie). Clear with ?preview=off.
   * Internal routes (/login, /crm, /portal, /api) remain available.
   * Does not replace calculator/product containment below.
   */
  if (isSoftLockEnabled()) {
    const previewParam = request.nextUrl.searchParams.get("preview");
    const previewToken = getSoftLockPreviewToken();
    const hasPreviewCookie =
      request.cookies.get(SOFT_LOCK_PREVIEW_COOKIE)?.value === "1";

    if (previewParam === "off") {
      const clean = request.nextUrl.clone();
      clean.searchParams.delete("preview");
      const res = NextResponse.redirect(clean, 302);
      res.cookies.set(SOFT_LOCK_PREVIEW_COOKIE, "", {
        path: "/",
        maxAge: 0,
        httpOnly: true,
        sameSite: "lax",
        secure: true,
      });
      return res;
    }

    if (previewParam && previewParam === previewToken) {
      const clean = request.nextUrl.clone();
      clean.searchParams.delete("preview");
      const res = NextResponse.redirect(clean, 302);
      res.cookies.set(SOFT_LOCK_PREVIEW_COOKIE, "1", {
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
        httpOnly: true,
        sameSite: "lax",
        secure: true,
      });
      res.headers.set("Cache-Control", "no-store");
      return res;
    }

    const unlocked = hasPreviewCookie || previewParam === previewToken;
    if (!unlocked && !isSoftLockExemptPath(pathname)) {
      const hold = request.nextUrl.clone();
      hold.pathname = SOFT_LOCK_PATH;
      hold.search = "";
      const res = NextResponse.redirect(hold, 302);
      res.headers.set("X-Robots-Tag", "noindex, nofollow");
      res.headers.set("Cache-Control", "no-store");
      return res;
    }
  }

  /**
   * Compliance containment (2026-07-22): temporary 302 only.
   * Restricted product / high-risk calculator / embed URLs → holding page.
   * Do not use 301 while containment is active.
   */
  if (isContainmentRestrictedPath(pathname)) {
    const holding = request.nextUrl.clone();
    holding.pathname = CONTAINMENT_HOLDING_PATH;
    holding.search = "";
    const redirectResponse = NextResponse.redirect(holding, 302);
    redirectResponse.headers.set("X-Robots-Tag", "noindex, nofollow");
    redirectResponse.headers.set("Cache-Control", "no-store");
    return redirectResponse;
  }

  const pinSession = await hasCrmPinSessionFromCookieValue(
    request.cookies.get(CRM_PIN_COOKIE)?.value
  );
  const supabaseCtx = createSupabaseMiddlewareClient(request);
  let response = supabaseCtx?.getResponse() ?? NextResponse.next({ request });
  let user: { app_metadata?: Record<string, unknown> } | null = null;

  if (supabaseCtx) {
    try {
      const {
        data: { user: authUser },
      } = await supabaseCtx.supabase.auth.getUser();
      user = authUser;
      response = supabaseCtx.getResponse();
    } catch (error) {
      // Supabase Auth outage must not 500 protected routes; PIN sessions still work.
      console.error("[middleware] supabase getUser failed:", error);
      response = supabaseCtx.getResponse();
    }
  }

  const isCrmRoute = pathname === "/crm" || pathname.startsWith("/crm/");

  /** Members-only planner embed, block direct public access to the HTML engine. */
  if (pathname === GOAL_ENGINEERING_EMBED_PATH) {
    const allowed = hasActiveFinancialFreedomMembership(user) || pinSession;
    if (!allowed) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = "/login";
      loginUrl.searchParams.set("next", "/calculators/goal-engineering-planner");
      const redirectResponse = NextResponse.redirect(loginUrl);
      response.cookies.getAll().forEach((cookie) => {
        redirectResponse.cookies.set(cookie);
      });
      return redirectResponse;
    }
  }

  if (isProtectedAppRoute(pathname)) {
    const crmPinAllowed = isCrmRoute && pinSession;
    if (!user && !crmPinAllowed) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = "/login";
      loginUrl.searchParams.set("next", isCrmRoute ? pathname : "/crm");
      const redirectResponse = NextResponse.redirect(loginUrl);
      response.cookies.getAll().forEach((cookie) => {
        redirectResponse.cookies.set(cookie);
      });
      return redirectResponse;
    }
  }

  if (pathname === "/login" && (user || pinSession)) {
    const nextParam = request.nextUrl.searchParams.get("next");
    const safeNext =
      nextParam &&
      nextParam.startsWith("/") &&
      !nextParam.startsWith("//") &&
      !nextParam.startsWith("/login")
        ? nextParam
        : null;
    const destination = pinSession
      ? "/crm"
      : safeNext ?? defaultRedirectForRole(roleFromAppMetadata(user!));
    const redirectResponse = NextResponse.redirect(new URL(destination, request.url));
    response.cookies.getAll().forEach((cookie) => {
      redirectResponse.cookies.set(cookie);
    });
    return redirectResponse;
  }

  if (isPrivateRoute(pathname)) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }

  response.headers.set("x-pathname", pathname);

  return response;
}

export const config = {
  matcher: [
    /*
     * Skip Next internals, Blog Studio (/studio), WhatsApp webhook, and static assets.
     */
    "/((?!_next/static|_next/image|favicon.ico|studio(?:/|$)|api/webhooks/whatsapp|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|ico|woff2?|ttf|otf)$).*)",
  ],
};
