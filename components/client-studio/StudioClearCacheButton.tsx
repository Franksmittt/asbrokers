"use client";

import { useState, useTransition } from "react";
import { clearWebsiteCache } from "@/app/studio/blog/actions";
import { cn } from "@/lib/utils";

function RefreshIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" {...props}>
      <path d="M21 12a9 9 0 1 1-2.64-6.36" strokeLinecap="round" />
      <path d="M21 3v6h-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

type Props = {
  /** Compact sidebar row vs header button. */
  variant?: "sidebar" | "header";
  className?: string;
};

/**
 * Lets Albert force-refresh the public Insights pages after publishing,
 * so browser/CDN-cached HTML updates without a hard browser clear.
 */
export function StudioClearCacheButton({ variant = "sidebar", className }: Props) {
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);
  const [ok, setOk] = useState<boolean | null>(null);

  const onClick = () => {
    setMessage(null);
    setOk(null);
    startTransition(async () => {
      const result = await clearWebsiteCache();
      if (result.ok) {
        setOk(true);
        setMessage(`Cache cleared (${result.refreshed} pages). Open Insights to check.`);
      } else {
        setOk(false);
        setMessage(result.error);
      }
    });
  };

  if (variant === "header") {
    return (
      <div className={cn("flex flex-col items-end gap-1", className)}>
        <button
          type="button"
          onClick={onClick}
          disabled={pending}
          className="inline-flex items-center gap-1.5 rounded-md border border-[#2a2a2a] bg-[#0a0a0a] px-3 py-1.5 text-xs font-medium text-zinc-300 transition-colors hover:border-[#3ecf8e]/40 hover:text-[#3ecf8e] disabled:opacity-60"
        >
          <RefreshIcon className={cn("h-3.5 w-3.5", pending && "animate-spin")} aria-hidden />
          {pending ? "Clearing…" : "Clear website cache"}
        </button>
        {message ? (
          <p className={cn("max-w-xs text-right text-[11px]", ok ? "text-[#3ecf8e]" : "text-amber-400")}>
            {message}
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <div className={cn("space-y-1", className)}>
      <button
        type="button"
        onClick={onClick}
        disabled={pending}
        title="Clear website cache"
        className="flex h-9 w-full items-center rounded-md px-2 text-[13px] text-zinc-400 transition-colors hover:bg-[#161616] hover:text-[#3ecf8e] disabled:opacity-60"
      >
        <RefreshIcon className={cn("h-[18px] w-[18px] shrink-0", pending && "animate-spin")} aria-hidden />
        <span className="ml-3 truncate opacity-0 transition-opacity duration-150 group-hover/sidebar:opacity-100">
          {pending ? "Clearing cache…" : "Clear website cache"}
        </span>
      </button>
      {message ? (
        <p
          className={cn(
            "px-2 text-[10px] leading-snug opacity-0 transition-opacity duration-150 group-hover/sidebar:opacity-100",
            ok ? "text-[#3ecf8e]" : "text-amber-400"
          )}
        >
          {message}
        </p>
      ) : (
        <p className="px-2 text-[10px] leading-snug text-zinc-600 opacity-0 transition-opacity duration-150 group-hover/sidebar:opacity-100">
          After publishing, click this so the live Insights page updates.
        </p>
      )}
    </div>
  );
}
