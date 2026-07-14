"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Bell, Search, User } from "@/components/icons";
import { useCrm } from "@/components/crm/CrmContext";

type CrmHeaderProps = {
  staffName: string;
  role: "admin" | "staff";
};

export function CrmHeader({ staffName, role }: CrmHeaderProps) {
  const router = useRouter();
  const { visibleLeads } = useCrm();
  const [query, setQuery] = useState("");
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return visibleLeads
      .filter(
        (lead) =>
          lead.name.toLowerCase().includes(q) ||
          lead.email.toLowerCase().includes(q) ||
          lead.phone.includes(q)
      )
      .slice(0, 8);
  }, [query, visibleLeads]);

  const newLeadNotifications = useMemo(
    () => visibleLeads.filter((lead) => lead.status === "new").slice(0, 12),
    [visibleLeads]
  );
  const notificationCount = newLeadNotifications.length;

  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setNotificationsOpen(false);
        setPaletteOpen(true);
      }
      if (event.key === "Escape") {
        setPaletteOpen(false);
        setNotificationsOpen(false);
        setQuery("");
      }
    },
    []
  );

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  const isMac =
    typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.platform);
  const shortcutLabel = isMac ? "⌘ K" : "Ctrl K";

  return (
    <>
      <header className="sticky top-0 z-40 flex h-12 items-center justify-between gap-4 border-b border-[#2a2a2a] bg-black/80 px-4 backdrop-blur-sm md:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <span className="hidden text-sm font-medium text-white sm:inline">AS Brokers</span>
          <span className="rounded border border-[#2a2a2a] px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-zinc-500">
            {role}
          </span>
        </div>

        <button
          type="button"
          onClick={() => setPaletteOpen(true)}
          className="hidden h-8 max-w-md flex-1 items-center gap-2 rounded-md border border-[#2a2a2a] bg-[#0a0a0a] px-3 text-left text-[13px] text-zinc-500 transition-colors hover:border-[#3a3a3a] hover:text-zinc-400 sm:flex"
        >
          <Search className="h-3.5 w-3.5 shrink-0" aria-hidden />
          <span className="flex-1 truncate">Search leads…</span>
          <kbd className="rounded border border-[#2a2a2a] bg-[#141414] px-1.5 py-0.5 text-[10px] font-medium text-zinc-500">
            {shortcutLabel}
          </kbd>
        </button>

        <div className="flex items-center gap-2">
          <Link
            href="/crm/whatsapp"
            className="hidden rounded-md px-2 py-1 text-[12px] text-zinc-500 transition-colors hover:text-zinc-300 sm:inline"
          >
            WhatsApp
          </Link>
          <button
            type="button"
            className="relative flex h-8 w-8 items-center justify-center rounded-md text-zinc-500 transition-colors hover:bg-[#161616] hover:text-zinc-300"
            aria-label="Notifications"
            aria-expanded={notificationsOpen}
            aria-haspopup="dialog"
            onClick={() => {
              setPaletteOpen(false);
              setNotificationsOpen((open) => !open);
            }}
          >
            <Bell className="h-4 w-4" />
            {notificationCount > 0 ? (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#3ecf8e] px-1 text-[9px] font-semibold text-black">
                {notificationCount > 9 ? "9+" : notificationCount}
              </span>
            ) : null}
          </button>
          <div
            className="flex h-8 w-8 items-center justify-center rounded-full bg-[#3ecf8e]/15 text-[#3ecf8e]"
            title={staffName}
          >
            <User className="h-4 w-4" />
          </div>
        </div>
      </header>

      {notificationsOpen ? (
        <div className="fixed inset-0 z-[90]" role="presentation">
          <button
            type="button"
            aria-label="Close notifications"
            className="absolute inset-0 cursor-default bg-transparent"
            onClick={() => setNotificationsOpen(false)}
          />
          <div
            className="absolute right-4 top-14 z-[91] w-80 overflow-hidden rounded-lg border border-[#2a2a2a] bg-[#0a0a0a] shadow-2xl md:right-6"
            role="dialog"
            aria-label="New lead notifications"
          >
            <div className="flex items-center justify-between border-b border-[#2a2a2a] px-3 py-2.5">
              <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">New leads</p>
              <Link
                href="/crm/leads?status=new"
                className="text-[11px] text-[#3ecf8e] hover:underline"
                onClick={() => setNotificationsOpen(false)}
              >
                View all
              </Link>
            </div>
            <ul className="max-h-80 overflow-y-auto py-1">
              {newLeadNotifications.length === 0 ? (
                <li className="px-4 py-6 text-center text-sm text-zinc-500">No new leads right now.</li>
              ) : (
                newLeadNotifications.map((lead) => (
                  <li key={lead.id}>
                    <button
                      type="button"
                      className="flex w-full flex-col gap-0.5 px-4 py-2.5 text-left transition-colors hover:bg-[#161616]"
                      onClick={() => {
                        setNotificationsOpen(false);
                        router.push(`/crm/leads/${lead.id}`);
                      }}
                    >
                      <span className="text-sm font-medium text-white">{lead.name}</span>
                      <span className="truncate text-xs text-zinc-500">
                        {lead.intent || lead.email || "Inbound enquiry"}
                      </span>
                    </button>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      ) : null}

      {paletteOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center bg-black/70 p-4 pt-[12vh]"
          role="dialog"
          aria-modal="true"
          aria-label="Search leads"
          onClick={() => {
            setPaletteOpen(false);
            setQuery("");
          }}
        >
          <div
            className="w-full max-w-lg overflow-hidden rounded-lg border border-[#2a2a2a] bg-[#0a0a0a] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 border-b border-[#2a2a2a] px-3">
              <Search className="h-4 w-4 text-zinc-500" aria-hidden />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search leads by name, email, or phone…"
                className="h-11 flex-1 bg-transparent text-sm text-white placeholder:text-zinc-600 focus:outline-none"
              />
              <kbd className="text-[10px] text-zinc-600">Esc</kbd>
            </div>
            <ul className="max-h-72 overflow-y-auto py-1">
              {matches.length === 0 ? (
                <li className="px-4 py-6 text-center text-sm text-zinc-500">
                  {query.trim() ? "No matching leads." : "Type to search leads…"}
                </li>
              ) : (
                matches.map((lead) => (
                  <li key={lead.id}>
                    <button
                      type="button"
                      className="flex w-full flex-col gap-0.5 px-4 py-2.5 text-left transition-colors hover:bg-[#161616]"
                      onClick={() => {
                        setPaletteOpen(false);
                        setQuery("");
                        router.push(`/crm/leads/${lead.id}`);
                      }}
                    >
                      <span className="text-sm font-medium text-white">{lead.name}</span>
                      <span className="text-xs text-zinc-500">{lead.email || lead.phone}</span>
                    </button>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
