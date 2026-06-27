"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { completeMagicLinkSession } from "@/app/auth/complete-session";

/** Completes magic-link sign-in when tokens arrive in the URL hash (implicit flow). */
export default function AuthCallbackImplicitClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const started = useRef(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    const hash = window.location.hash;
    if (!hash || !hash.includes("access_token=")) {
      setError(true);
      return;
    }

    const params = new URLSearchParams(hash.replace(/^#/, ""));
    const accessToken = params.get("access_token");
    const refreshToken = params.get("refresh_token");
    if (!accessToken || !refreshToken) {
      setError(true);
      return;
    }

    const nextParam = searchParams.get("next") ?? "/crm";
    const nextPath = nextParam.startsWith("/") ? nextParam : "/crm";

    window.history.replaceState(null, "", window.location.pathname + window.location.search);

    void completeMagicLinkSession(accessToken, refreshToken, nextPath).then((result) => {
      if (result.ok) {
        router.replace(result.next);
        return;
      }
      setError(true);
    });
  }, [router, searchParams]);

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-void px-4">
        <p className="rounded-2xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-300">
          Sign-in link expired or invalid.{" "}
          <a href="/login" className="underline">
            Request a new link
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-void px-4">
      <p className="text-sm text-cinematic-teal" role="status">
        Completing secure sign-in…
      </p>
    </div>
  );
}
