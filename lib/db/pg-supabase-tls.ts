import type { ConnectionOptions } from "node:tls";

/**
 * Hosted Supabase Postgres (direct `db.*.supabase.co` or Shared pooler `*.pooler.supabase.com`).
 * Some environments verify TLS strictly and fail (`SELF_SIGNED_CERT_IN_CHAIN`) due to proxies or chain quirks.
 * Narrow match so local plain Postgres URLs are unaffected.
 */
export function pgTlsForSupabaseUrl(databaseUrl: string): ConnectionOptions | undefined {
  const u = databaseUrl.trim();
  if (!u) return undefined;
  if (/\.supabase\.co\b/i.test(u) || /\.supabase\.com\b/i.test(u)) {
    return { rejectUnauthorized: false };
  }
  return undefined;
}

/**
 * `pg` applies `sslmode` from the URL strictly; pairing it with `{ rejectUnauthorized: false }` can still fail on
 * some hosts (e.g. Vercel build prerender). Strip sslmode, TLS is enabled via explicit `ssl` on the Pool instead.
 */
export function stripPgUrlSslmodeQuery(databaseUrl: string): string {
  const u = databaseUrl.trim();
  const qIdx = u.indexOf("?");
  if (qIdx === -1) return u;
  const base = u.slice(0, qIdx);
  const qs = u.slice(qIdx + 1);
  const params = new URLSearchParams(qs);
  params.delete("sslmode");
  const next = params.toString();
  return next ? `${base}?${next}` : base;
}
