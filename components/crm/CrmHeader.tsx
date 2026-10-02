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

type BellItem =
  | {
      kind: "lead";
      id: string;
      title: string;
      subtitle: string;
      href: string;
      createdAt?: string;
    }
  | {
      kind: "course";
      id: string;
      title: string;
      subtitle: string;
      href: string;
      createdAt: string;
      alertId: string;
    };

const DISMISSED_LEADS_KEY = "asb-crm-dismissed-lead-notifs";

function readDismissedLeadIds(): Set<string> {
  try {
    const raw = window.localStorage.getItem(DISMISSED_LEADS_KEY);
    if (!raw) return new Set();
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return new Set();
    return new Set(parsed.filter((id): id is string => typeof id === "string"));
  } catch {
    return new Set();
  }
}

function writeDismissedLeadIds(ids: Set<string>) {
  try {
    // Cap growth — keep the newest 400 dismissals.
    window.localStorage.setItem(DISMISSED_LEADS_KEY, JSON.stringify([...ids].slice(-400)));
  } catch {
    /* ignore */
  }
}

export function CrmHeader({ staffName, role }: CrmHeaderProps) {
  const router = useRouter();
  const { visibleLeads, unreadCourseAlerts, markCourseAlertRead, markAllCourseAlertsRead } =
    useCrm();
  const [query, setQuery] = useState("");
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [dismissedLeadIds, setDismissedLeadIds] = useState<Set<string>>(() => new Set());

  useEffect(() => {
    setDismissedLeadIds(readDismissedLeadIds());
  }, []);

  const dismissLeadNotification = useCallback((leadId: string) => {
    setDismissedLeadIds((prev) => {
      const next = new Set(prev);
      next.add(leadId);
      writeDismissedLeadIds(next);
      return next;
    });
  }, []);

  const dismissAllLeadNotifications = useCallback((leadIds: string[]) => {
    setDismissedLeadIds((prev) => {
      const next = new Set(prev);
      for (const id of leadIds) next.add(id);
      writeDismissedLeadIds(next);
      return next;
    });
  }, []);

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
    () =>
      visibleLeads
        .filter((lead) => lead.status === "new" && !dismissedLeadIds.has(lead.id))
        .slice(0, 12),
    [visibleLeads, dismissedLeadIds]
  );

  const bellItems = useMemo<BellItem[]>(() => {
    const leads: BellItem[] = newLeadNotifications.map((lead) => ({
      kind: "lead",
      id: `lead-${lead.id}`,
      title: lead.name,
      subtitle: lead.intent || lead.email || "Inbound enquiry",
      href: `/crm/leads/${lead.id}`,
      createdAt: lead.createdAt,
    }));
    const courses: BellItem[] = unreadCourseAlerts.slice(0, 12).map((alert) => ({
      kind: "course",
      id: `course-${alert.id}`,
      title: alert.title,
      subtitle: alert.body,
      href: alert.href,
      createdAt: alert.createdAt,
      alertId: alert.id,
    }));
    return [...leads, ...courses]
      .sort((a, b) => (b.createdAt ?? "").localeCompare(a.createdAt ?? ""))
      .slice(0, 16);
  }, [newLeadNotifications, unreadCourseAlerts]);

  const notificationCount = newLeadNotifications.length + unreadCourseAlerts.length;

  const onKeyDown = useCallback((event: KeyboardEvent) => {
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
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  const isMac =
    typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.platform);
  const shortcutLabel = isMac ? "⌘ K" : "Ctrl K";

  return (
    <>
      <header className="sticky top-0 z-40 flex h-14 items-center justify-between gap-4 border-b border-[#E5E5E5] bg-[#F7F6F3]/90 px-4 backdrop-blur-sm md:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <span className="hidden text-sm font-semibold tracking-tight text-[#1D1D1F] sm:inline">
            Command Workspace
          </span>
          <span
            className="truncate rounded-lg border border-[#E5E5E5] bg-white px-2 py-0.5 text-[11px] font-medium text-[#52525b]"
            title={`${staffName} · ${role === "admin" ? "Admin" : "Staff"}`}
          >
            {staffName}
          </span>
        </div>

        <button
          type="button"
          onClick={() => setPaletteOpen(true)}
          className="hidden h-9 max-w-md flex-1 items-center gap-2 rounded-xl border border-[#E5E5E5] bg-white px-3 text-left text-[13px] text-[#71717a] transition-colors hover:border-[#D4D4D4] hover:text-[#52525b] sm:flex"
        >
          <Search className="h-3.5 w-3.5 shrink-0" aria-hidden />
          <span className="flex-1 truncate">Search leads…</span>
          <kbd className="rounded-md border border-[#E5E5E5] bg-[#FAFAF8] px-1.5 py-0.5 text-[10px] font-medium text-[#71717a]">
            {shortcutLabel}
          </kbd>
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="relative flex h-9 w-9 items-center justify-center rounded-xl text-[#71717a] transition-colors hover:bg-white hover:text-[#1D1D1F]"
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
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#006B6B] px-1 text-[9px] font-semibold text-white">
                {notificationCount > 9 ? "9+" : notificationCount}
              </span>
            ) : null}
          </button>
          <div
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E8F3F3] text-[#006B6B]"
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
            className="absolute right-4 top-16 z-[91] w-80 overflow-hidden rounded-2xl border border-[#E5E5E5] bg-white shadow-xl md:right-6"
            role="dialog"
            aria-label="Notifications"
          >
            <div className="flex items-center justify-between border-b border-[#E5E5E5] px-3 py-2.5">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#71717a]">
                Notifications
              </p>
              <div className="flex items-center gap-2">
                {notificationCount > 0 ? (
                  <button
                    type="button"
                    className="text-[11px] font-medium text-[#52525b] hover:text-[#1D1D1F]"
                    onClick={() => {
                      dismissAllLeadNotifications(newLeadNotifications.map((l) => l.id));
                      void markAllCourseAlertsRead();
                    }}
                  >
                    Clear all
                  </button>
                ) : null}
                <Link
                  href="/crm/leads?status=new"
                  className="text-[11px] font-medium text-[#0057B8] hover:underline"
                  onClick={() => setNotificationsOpen(false)}
                >
                  New leads
                </Link>
              </div>
            </div>
            <ul className="max-h-80 overflow-y-auto py-1">
              {bellItems.length === 0 ? (
                <li className="px-4 py-6 text-center text-sm text-[#71717a]">
                  No new leads or course alerts right now.
                </li>
              ) : (
                bellItems.map((item) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      className="flex w-full flex-col gap-0.5 px-4 py-2.5 text-left transition-colors hover:bg-[#F7F6F3]"
                      onClick={() => {
                        setNotificationsOpen(false);
                        if (item.kind === "course") {
                          void markCourseAlertRead(item.alertId);
                        } else {
                          // lead-${uuid}
                          const leadId = item.id.replace(/^lead-/, "");
                          dismissLeadNotification(leadId);
                        }
                        router.push(item.href);
                      }}
                    >
                      <span className="text-[10px] font-semibold uppercase tracking-wide text-[#006B6B]">
                        {item.kind === "course" ? "Course" : "Lead"}
                      </span>
                      <span className="text-sm font-medium text-[#1D1D1F]">{item.title}</span>
                      <span className="line-clamp-2 text-xs text-[#71717a]">{item.subtitle}</span>
                    </button>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      ) : null}

      {paletteOpen ? (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center bg-[#1D1D1F]/40 p-4 pt-[12vh]"
          role="dialog"
          aria-modal="true"
          aria-label="Search leads"
          onClick={() => {
            setPaletteOpen(false);
            setQuery("");
          }}
        >
          <div
            className="w-full max-w-lg overflow-hidden rounded-2xl border border-[#E5E5E5] bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 border-b border-[#E5E5E5] px-3">
              <Search className="h-4 w-4 text-[#71717a]" aria-hidden />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search leads by name, email, or phone…"
                className="h-12 flex-1 bg-transparent text-sm text-[#1D1D1F] placeholder:text-[#A1A1AA] focus:outline-none"
              />
              <kbd className="text-[10px] text-[#A1A1AA]">Esc</kbd>
            </div>
            <ul className="max-h-72 overflow-y-auto py-1">
              {matches.length === 0 ? (
                <li className="px-4 py-6 text-center text-sm text-[#71717a]">
                  {query.trim() ? "No matching leads." : "Type to search leads…"}
                </li>
              ) : (
                matches.map((lead) => (
                  <li key={lead.id}>
                    <button
                      type="button"
                      className="flex w-full flex-col gap-0.5 px-4 py-2.5 text-left transition-colors hover:bg-[#F7F6F3]"
                      onClick={() => {
                        setPaletteOpen(false);
                        setQuery("");
                        router.push(`/crm/leads/${lead.id}`);
                      }}
                    >
                      <span className="text-sm font-medium text-[#1D1D1F]">{lead.name}</span>
                      <span className="text-xs text-[#71717a]">{lead.email || lead.phone}</span>
                    </button>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      ) : null}
    </>
  );
}
