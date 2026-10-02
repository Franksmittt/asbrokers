"use client";

import Link from "next/link";
import { useEffect } from "react";

/**
 * Segment error boundary for /crm — prevents raw "Application error" screens
 * when a page or data fetch throws after auth.
 */
export default function CrmError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[CRM] segment error:", error);
  }, [error]);

  return (
    <div className="mx-auto flex min-h-[50vh] max-w-lg flex-col justify-center px-6 py-16 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-teal-300/90">
        CRM
      </p>
      <h1 className="mt-3 text-2xl font-semibold tracking-tight text-[#1D1D1F]">
        Something went wrong
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-[#1D1D1F]/65">
        The CRM hit a temporary error loading this screen. Your session is usually
        still fine — try again, or sign in again if the problem continues.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="rounded-xl bg-teal-700 px-5 py-2.5 text-sm font-semibold text-[#1D1D1F] transition hover:bg-teal-600"
        >
          Try again
        </button>
        <Link
          href="/crm"
          className="rounded-xl bg-[#F0F0EE] px-5 py-2.5 text-sm font-semibold text-[#1D1D1F] ring-1 ring-[#E5E5E5] transition hover:bg-white/15"
        >
          CRM home
        </Link>
        <Link
          href="/login?next=/crm"
          className="rounded-xl px-5 py-2.5 text-sm font-semibold text-[#1D1D1F]/80 underline-offset-4 hover:text-[#1D1D1F] hover:underline"
        >
          Sign in again
        </Link>
      </div>
      {error.digest ? (
        <p className="mt-6 text-[11px] text-[#1D1D1F]/35">Ref: {error.digest}</p>
      ) : null}
    </div>
  );
}
