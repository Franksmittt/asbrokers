"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState, useTransition, type ReactNode } from "react";

import { askCrmDashboardQuestion } from "@/app/actions/crm-ai";
import { useCrm } from "@/components/crm/CrmContext";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  text: string;
  actionsTaken?: string[];
};

const SUGGESTIONS = [
  "Who should I call first today?",
  "Delegate business insurance leads to Johnny",
  "Move the top lead to contacted on Kanban",
  "Which leads should Johnny handle?",
];

const UUID_IN_TEXT =
  /\b([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})\b/gi;

function renderAnswer(text: string) {
  const parts: ReactNode[] = [];
  let last = 0;
  let match: RegExpExecArray | null;
  UUID_IN_TEXT.lastIndex = 0;
  while ((match = UUID_IN_TEXT.exec(text)) !== null) {
    if (match.index > last) {
      parts.push(text.slice(last, match.index));
    }
    const id = match[1];
    parts.push(
      <Link
        key={`${id}-${match.index}`}
        href={`/crm/leads/${id}`}
        className="font-medium text-[#006B6B] underline-offset-2 hover:underline"
      >
        View lead
      </Link>
    );
    last = match.index + match[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts.length > 0 ? parts : text;
}

export function CrmLeadAdvisorChat() {
  const router = useRouter();
  const { visibleLeads } = useCrm();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const leadCount = visibleLeads.length;

  const placeholder = useMemo(
    () =>
      leadCount > 0
        ? `Ask or instruct: move Kanban, delegate to Johnny, send WhatsApp…`
        : "Ask about your pipeline…",
    [leadCount]
  );

  const submit = (text: string) => {
    const q = text.trim();
    if (!q || isPending) return;

    const userMsg: ChatMessage = { id: `u-${Date.now()}`, role: "user", text: q };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setError(null);

    startTransition(async () => {
      const result = await askCrmDashboardQuestion(q);
      if (result.ok) {
        setMessages((prev) => [
          ...prev,
          {
            id: `a-${Date.now()}`,
            role: "assistant",
            text: result.data.answer,
            actionsTaken: result.data.actionsTaken,
          },
        ]);
        if (result.data.actionsTaken.length > 0) {
          router.refresh();
        }
      } else {
        setError(result.error);
      }
    });
  };

  return (
    <section className="rounded-lg border border-[#A7F3D0] bg-gradient-to-br from-white to-[#ECFDF5] p-5 ring-1 ring-[#A7F3D0]/60">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[#006B6B]">
            Gemini · Albert&apos;s executive assistant
          </p>
          <p className="mt-1 text-sm text-[#52525b]">
            Ask questions, move Kanban stages, delegate to Johnny, reschedule calls, or send WhatsApp, Albert only.
          </p>
        </div>
        <span className="rounded-full bg-[#E8F3F3] px-2.5 py-1 text-[10px] font-medium text-[#006B6B]">
          {leadCount} leads in context
        </span>
      </div>

      <div className="mb-3 flex max-h-72 flex-col gap-3 overflow-y-auto rounded-lg border border-[#E5E5E5] bg-white p-3">
        {messages.length === 0 ? (
          <p className="text-sm text-[#52525b]">
            Try: &ldquo;Delegate the business insurance lead to Johnny&rdquo; or &ldquo;Move [lead name] to qualified.&rdquo;
          </p>
        ) : (
          messages.map((msg) => (
            <div key={msg.id}>
              <div
                className={
                  msg.role === "user"
                    ? "ml-8 rounded-xl bg-[#1a1a1a] px-3 py-2 text-sm text-[#1D1D1F]"
                    : "mr-4 rounded-xl border border-[#A7F3D0] bg-[#0f1a14] px-3 py-2 text-sm leading-relaxed text-[#1D1D1F]"
                }
              >
                {msg.role === "assistant" ? renderAnswer(msg.text) : msg.text}
              </div>
              {msg.actionsTaken && msg.actionsTaken.length > 0 ? (
                <ul className="mr-4 mt-2 space-y-1">
                  {msg.actionsTaken.map((action) => (
                    <li
                      key={action}
                      className="rounded-md border border-[#A7F3D0] bg-[#006B6B]/5 px-2 py-1 text-[11px] text-[#006B6B]"
                    >
                      ✓ {action}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))
        )}
        {isPending ? (
          <p className="text-xs text-[#52525b]">Working on it…</p>
        ) : null}
      </div>

      {error ? <p className="mb-2 text-xs text-amber-900">{error}</p> : null}

      <div className="mb-3 flex flex-wrap gap-2">
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            type="button"
            disabled={isPending}
            onClick={() => submit(s)}
            className="rounded-full border border-[#E5E5E5] px-3 py-1 text-[11px] text-[#52525b] transition-colors hover:border-[#006B6B]/35 hover:text-[#1D1D1F] disabled:opacity-50"
          >
            {s}
          </button>
        ))}
      </div>

      <form
        className="flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          submit(input);
        }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholder}
          disabled={isPending}
          className="min-w-0 flex-1 rounded-lg border border-[#E5E5E5] bg-white px-3 py-2.5 text-sm text-[#1D1D1F] placeholder:text-[#A1A1AA] focus:border-[#006B6B]/40 focus:outline-none focus:ring-1 focus:ring-[#006B6B]/30 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={isPending || !input.trim()}
          className="shrink-0 rounded-lg bg-[#006B6B] px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          Ask
        </button>
      </form>
    </section>
  );
}
