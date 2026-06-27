import { createServerClient } from "@supabase/ssr";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { isBlockedTrainingBot, isPrivateRoute } from "@/lib/crawler-policy";
import { normalizeRequestUrl } from "@/lib/url-normalize";

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
 * Edge layer: SEO/crawler policy + Supabase SSR auth for /crm and /portal.
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
    return NextResponse.redirect(normalized.url, 301);
  }

  const pathname = request.nextUrl.pathname;
  const supabaseCtx = createSupabaseMiddlewareClient(request);
  let response = supabaseCtx?.getResponse() ?? NextResponse.next({ request });

  if (supabaseCtx) {
    const {
      data: { user },
    } = await supabaseCtx.supabase.auth.getUser();

    const supabaseResponse = supabaseCtx.getResponse();

    if (isProtectedAppRoute(pathname) && !user) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = "/login";
      loginUrl.searchParams.set("next", pathname);
      const redirectResponse = NextResponse.redirect(loginUrl);
      supabaseResponse.cookies.getAll().forEach((cookie) => {
        redirectResponse.cookies.set(cookie);
      });
      return redirectResponse;
    }

    if (pathname === "/login" && user) {
      const destination = defaultRedirectForRole(roleFromAppMetadata(user));
      const redirectResponse = NextResponse.redirect(new URL(destination, request.url));
      supabaseResponse.cookies.getAll().forEach((cookie) => {
        redirectResponse.cookies.set(cookie);
      });
      return redirectResponse;
    }

    response = supabaseResponse;
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
     * Skip Next internals, Sanity studio, WhatsApp webhook, and static assets.
     */
    "/((?!_next/static|_next/image|favicon.ico|studio(?:/|$)|api/webhooks/whatsapp|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|ico|woff2?|ttf|otf)$).*)",
  ],
};
