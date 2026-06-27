"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { completeMagicLinkSession } from "@/app/auth/complete-session";

function hashParams(): URLSearchParams | null {
  if (typeof window === "undefined") return null;
  const hash = window.location.hash;
  if (!hash || !hash.includes("access_token=")) return null;
  return new URLSearchParams(hash.replace(/^#/, ""));
}

/**
 * Supabase sometimes redirects magic links to the site root with tokens in the URL hash
 * instead of /auth/callback?code= (when redirect URL is not allow-listed). This completes
 * sign-in by persisting the session server-side, then routing to CRM/portal.
 */
export function MagicLinkHashHandler() {
  const router = useRouter();
  const started = useRef(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (started.current) return;

    const params = hashParams();
    if (!params) return;

    const accessToken = params.get("access_token");
    const refreshToken = params.get("refresh_token");
    if (!accessToken || !refreshToken) return;

    started.current = true;
    setBusy(true);

    const storedNext = sessionStorage.getItem("asbrokers-auth-next");
    sessionStorage.removeItem("asbrokers-auth-next");
    const nextPath = storedNext?.startsWith("/") ? storedNext : "/crm";

    window.history.replaceState(null, "", window.location.pathname + window.location.search);

    void completeMagicLinkSession(accessToken, refreshToken, nextPath).then((result) => {
      if (result.ok) {
        router.replace(result.next);
        return;
      }
      router.replace("/login?error=auth");
    });
  }, [router]);

  if (!busy) return null;

  return (
    <div
      role="status"
      className="fixed inset-x-0 top-0 z-[100] border-b border-cinematic-teal/30 bg-void/95 px-4 py-3 text-center text-sm text-cinematic-teal backdrop-blur-xl"
    >
      Completing secure sign-in…
    </div>
  );
}
