"use client";

import { useState, useTransition } from "react";
import { clearWebsiteCache } from "@/app/studio/blog/actions";
import { useStaffSidebarOptional } from "@/components/staff/StaffSidebarContext";
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
  variant?: "sidebar" | "header";
  className?: string;
};

export function StudioClearCacheButton({ variant = "sidebar", className }: Props) {
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);
  const [ok, setOk] = useState<boolean | null>(null);
  const sidebar = useStaffSidebarOptional();
  const collapsed = sidebar?.collapsed ?? false;

  const onClick = () => {
    setMessage(null);
    setOk(null);
    startTransition(async () => {
      const result = await clearWebsiteCache();
      if (result.ok) {
        setOk(true);
        setMessage(`Cache cleared (${result.refreshed} pages).`);
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
          className="inline-flex items-center gap-1.5 rounded-xl border border-[#E5E5E5] bg-white px-3 py-1.5 text-xs font-medium text-[#52525b] transition-colors hover:text-[#006B6B] disabled:opacity-60"
        >
          <RefreshIcon className={cn("h-3.5 w-3.5", pending && "animate-spin")} aria-hidden />
          {pending ? "Clearing…" : "Clear cache"}
        </button>
        {message ? (
          <p className={cn("max-w-xs text-right text-[11px]", ok ? "text-[#006B6B]" : "text-amber-700")}>
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
        className={cn(
          "flex h-10 w-full items-center rounded-xl text-[13px] text-[#52525b] transition-colors hover:bg-[#F0F0EE] hover:text-[#006B6B] disabled:opacity-60",
          collapsed ? "justify-center" : "px-3"
        )}
      >
        <RefreshIcon className={cn("h-[18px] w-[18px] shrink-0", pending && "animate-spin")} aria-hidden />
        {!collapsed ? (
          <span className="ml-3 truncate">{pending ? "Clearing cache…" : "Clear website cache"}</span>
        ) : null}
      </button>
      {!collapsed && message ? (
        <p className={cn("px-3 text-[10px] leading-snug", ok ? "text-[#006B6B]" : "text-amber-700")}>
          {message}
        </p>
      ) : null}
    </div>
  );
}
