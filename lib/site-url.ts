const DEFAULT_ORIGIN = "https://www.asbrokers.co.za";

/** Canonical site origin — must match Search Console URL prefix (prefer www.asbrokers.co.za). */
export function getSiteOrigin(): string {
  const raw = (process.env.NEXT_PUBLIC_SITE_URL ?? process.env.NEXT_PUBLIC_APP_URL)
    ?.replace(/\r?\n/g, "")
    .trim();
  if (typeof raw !== "string" || !raw) return DEFAULT_ORIGIN;
  try {
    const u = new URL(raw.includes("://") ? raw : `https://${raw}`);
    if (!u.hostname) return DEFAULT_ORIGIN;
    return `${u.protocol}//${u.hostname}${u.port ? `:${u.port}` : ""}`;
  } catch {
    return DEFAULT_ORIGIN;
  }
}

export function absoluteUrl(pathnameOrUrl: string): string {
  const origin = getSiteOrigin();
  if (pathnameOrUrl.startsWith("http://") || pathnameOrUrl.startsWith("https://")) {
    return pathnameOrUrl;
  }
  const path = pathnameOrUrl.startsWith("/") ? pathnameOrUrl : `/${pathnameOrUrl}`;
  const normalizedPath = path.replace(/\/index\/?$/, "/") || "/";
  return `${origin}${normalizedPath === "/" ? "/" : normalizedPath}`;
}

/** Canonical path for an insight article; matches `/insights` feed links (`?locale` only when not `en`). */
export function insightUrlPath(slug: string, locale: string = "en"): string {
  const safe = slug.trim();
  const q = new URLSearchParams();
  if (locale && locale !== "en") q.set("locale", locale);
  const qs = q.toString();
  return qs ? `/insights/${safe}?${qs}` : `/insights/${safe}`;
}
