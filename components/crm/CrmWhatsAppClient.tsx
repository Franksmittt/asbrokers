"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState, useTransition } from "react";
import { getLeadDetails } from "@/app/actions/crm";
import { sendWhatsAppMessage } from "@/app/actions/whatsapp";
import type { CrmCorrespondence, WhatsAppInboxRow } from "@/lib/crm/types";
import { cn } from "@/lib/utils";

function formatTime(iso: string) {
  return new Intl.DateTimeFormat("en-ZA", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}

type Props = {
  inbox: WhatsAppInboxRow[];
  whatsappConfigured: boolean;
};

export function CrmWhatsAppClient({ inbox, whatsappConfigured }: Props) {
  const [selectedId, setSelectedId] = useState<string | null>(inbox[0]?.lead.id ?? null);
  const [messages, setMessages] = useState<CrmCorrespondence[]>([]);
  const [draft, setDraft] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [filter, setFilter] = useState("");

  const selected = useMemo(
    () => inbox.find((row) => row.lead.id === selectedId) ?? null,
    [inbox, selectedId]
  );

  const filteredInbox = useMemo(() => {
    const q = filter.trim().toLowerCase();
    if (!q) return inbox;
    return inbox.filter(
      (row) =>
        row.lead.name.toLowerCase().includes(q) ||
        row.lead.phone.includes(q) ||
        row.lead.email.toLowerCase().includes(q)
    );
  }, [filter, inbox]);

  const loadThread = useCallback(async (leadId: string) => {
    const details = await getLeadDetails(leadId);
    if (!details) return;
    setMessages(details.correspondence.filter((m) => m.channel === "whatsapp"));
  }, []);

  useEffect(() => {
    if (!selectedId) return;
    void loadThread(selectedId);
  }, [selectedId, loadThread]);

  function handleSend() {
    if (!selectedId || !draft.trim()) return;
    const text = draft.trim();
    setError(null);
    startTransition(async () => {
      const result = await sendWhatsAppMessage(selectedId, text);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      setDraft("");
      await loadThread(selectedId);
    });
  }

  return (
    <div className="flex min-h-[calc(100vh-7rem)] flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-semibold tracking-tight text-[#1D1D1F]">WhatsApp</h1>
        <p className="text-sm text-[#52525b]">
          Message clients directly from the CRM. Inbound messages appear here automatically.
        </p>
      </div>

      {!whatsappConfigured && (
        <div className="rounded-lg border border-amber-200 bg-amber-500/5 px-4 py-3 text-sm text-amber-900/90">
          WhatsApp API is not fully configured on the server (
          <code className="text-amber-100">WHATSAPP_PHONE_NUMBER_ID</code> /{" "}
          <code className="text-amber-100">WHATSAPP_ACCESS_TOKEN</code>). You can still view
          threads; outbound send will fail until env vars are set.
        </div>
      )}

      <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border border-[#E5E5E5] bg-white lg:flex-row">
        {/* Conversation list */}
        <div className="flex w-full flex-col border-b border-[#E5E5E5] lg:w-80 lg:border-b-0 lg:border-r">
          <div className="border-b border-[#E5E5E5] p-3">
            <input
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Filter conversations…"
              className="h-8 w-full rounded-md border border-[#E5E5E5] bg-[#FAFAF8] px-3 text-sm text-[#1D1D1F] placeholder:text-[#A1A1AA] focus:border-[#D4D4D4] focus:outline-none"
            />
          </div>
          <ul className="max-h-64 flex-1 overflow-y-auto lg:max-h-none">
            {filteredInbox.length === 0 ? (
              <li className="px-4 py-8 text-center text-sm text-[#52525b]">
                No leads with phone numbers yet.
              </li>
            ) : (
              filteredInbox.map((row) => {
                const active = row.lead.id === selectedId;
                return (
                  <li key={row.lead.id}>
                    <button
                      type="button"
                      onClick={() => setSelectedId(row.lead.id)}
                      className={cn(
                        "flex w-full flex-col gap-1 border-b border-[#EFEFEA] px-4 py-3 text-left transition-colors",
                        active ? "bg-[#F0F0EE]" : "hover:bg-[#121212]"
                      )}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="truncate text-sm font-medium text-[#1D1D1F]">
                          {row.lead.name}
                        </span>
                        {row.lastMessage && (
                          <span className="shrink-0 text-[10px] text-[#71717a]">
                            {formatTime(row.lastMessage.sentAt)}
                          </span>
                        )}
                      </div>
                      <span className="truncate text-xs text-[#52525b]">{row.lead.phone}</span>
                      {row.lastMessage && (
                        <span className="line-clamp-1 text-xs text-[#71717a]">{row.lastMessage.body}</span>
                      )}
                      {row.messageCount > 0 && (
                        <span className="text-[10px] text-[#006B6B]">
                          {row.messageCount} message{row.messageCount === 1 ? "" : "s"}
                        </span>
                      )}
                    </button>
                  </li>
                );
              })
            )}
          </ul>
        </div>

        {/* Thread */}
        <div className="flex min-h-[320px] flex-1 flex-col">
          {!selected ? (
            <div className="flex flex-1 items-center justify-center text-sm text-[#52525b]">
              Select a conversation to start messaging.
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between border-b border-[#E5E5E5] px-4 py-3">
                <div>
                  <p className="text-sm font-medium text-[#1D1D1F]">{selected.lead.name}</p>
                  <p className="text-xs text-[#52525b]">{selected.lead.phone}</p>
                </div>
                <Link
                  href={`/crm/leads/${selected.lead.id}`}
                  className="text-xs text-[#52525b] transition-colors hover:text-[#1D1D1F]"
                >
                  Open lead →
                </Link>
              </div>

              <ul className="flex-1 space-y-3 overflow-y-auto p-4">
                {messages.length === 0 ? (
                  <li className="py-8 text-center text-sm text-[#52525b]">
                    No WhatsApp messages yet. Send the first message below.
                  </li>
                ) : (
                  messages.map((msg) => {
                    const outbound = msg.senderType === "staff";
                    return (
                      <li
                        key={msg.id}
                        className={cn("flex", outbound ? "justify-end" : "justify-start")}
                      >
                        <div
                          className={cn(
                            "max-w-[85%] rounded-lg px-3 py-2 text-sm",
                            outbound
                              ? "bg-[#E8F3F3] text-[#1D1D1F]"
                              : "bg-[#F0F0EE] text-[#3F3F46]"
                          )}
                        >
                          <p className="whitespace-pre-wrap">{msg.body}</p>
                          <p className="mt-1 text-[10px] text-[#71717a]">
                            {msg.from} · {formatTime(msg.sentAt)}
                          </p>
                        </div>
                      </li>
                    );
                  })
                )}
              </ul>

              <div className="border-t border-[#E5E5E5] p-3">
                {error && (
                  <p className="mb-2 text-xs text-red-400" role="alert">
                    {error}
                  </p>
                )}
                <div className="flex gap-2">
                  <textarea
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    rows={2}
                    placeholder="Type a WhatsApp message…"
                    className="min-h-[44px] flex-1 resize-none rounded-md border border-[#E5E5E5] bg-[#FAFAF8] px-3 py-2 text-sm text-[#1D1D1F] placeholder:text-[#A1A1AA] focus:border-[#D4D4D4] focus:outline-none"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSend();
                      }
                    }}
                  />
                  <button
                    type="button"
                    disabled={isPending || !draft.trim()}
                    onClick={handleSend}
                    className="h-[44px] shrink-0 rounded-md bg-[#006B6B] px-4 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-40"
                  >
                    {isPending ? "Sending…" : "Send"}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
