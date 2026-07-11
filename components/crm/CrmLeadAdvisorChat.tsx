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
        className="font-medium text-[#3ecf8e] underline-offset-2 hover:underline"
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
    <section className="rounded-lg border border-[#3ecf8e]/25 bg-gradient-to-br from-[#0a0a0a] to-[#0f1a14] p-5 ring-1 ring-[#3ecf8e]/10">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[#3ecf8e]">
            Gemini · Albert&apos;s executive assistant
          </p>
          <p className="mt-1 text-sm text-zinc-400">
            Ask questions, move Kanban stages, delegate to Johnny, reschedule calls, or send WhatsApp, Albert only.
          </p>
        </div>
        <span className="rounded-full bg-[#3ecf8e]/10 px-2.5 py-1 text-[10px] font-medium text-[#3ecf8e]">
          {leadCount} leads in context
        </span>
      </div>

      <div className="mb-3 flex max-h-72 flex-col gap-3 overflow-y-auto rounded-lg border border-[#2a2a2a] bg-[#0a0a0a] p-3">
        {messages.length === 0 ? (
          <p className="text-sm text-zinc-500">
            Try: &ldquo;Delegate the business insurance lead to Johnny&rdquo; or &ldquo;Move [lead name] to qualified.&rdquo;
          </p>
        ) : (
          messages.map((msg) => (
            <div key={msg.id}>
              <div
                className={
                  msg.role === "user"
                    ? "ml-8 rounded-xl bg-[#1a1a1a] px-3 py-2 text-sm text-zinc-200"
                    : "mr-4 rounded-xl border border-[#3ecf8e]/20 bg-[#0f1a14] px-3 py-2 text-sm leading-relaxed text-zinc-100"
                }
              >
                {msg.role === "assistant" ? renderAnswer(msg.text) : msg.text}
              </div>
              {msg.actionsTaken && msg.actionsTaken.length > 0 ? (
                <ul className="mr-4 mt-2 space-y-1">
                  {msg.actionsTaken.map((action) => (
                    <li
                      key={action}
                      className="rounded-md border border-[#3ecf8e]/20 bg-[#3ecf8e]/5 px-2 py-1 text-[11px] text-[#3ecf8e]"
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
          <p className="text-xs text-zinc-500">Working on it…</p>
        ) : null}
      </div>

      {error ? <p className="mb-2 text-xs text-amber-300">{error}</p> : null}

      <div className="mb-3 flex flex-wrap gap-2">
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            type="button"
            disabled={isPending}
            onClick={() => submit(s)}
            className="rounded-full border border-[#2a2a2a] px-3 py-1 text-[11px] text-zinc-400 transition-colors hover:border-[#3ecf8e]/40 hover:text-white disabled:opacity-50"
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
          className="min-w-0 flex-1 rounded-lg border border-[#2a2a2a] bg-[#0a0a0a] px-3 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:border-[#3ecf8e]/50 focus:outline-none focus:ring-1 focus:ring-[#3ecf8e]/30 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={isPending || !input.trim()}
          className="shrink-0 rounded-lg bg-[#3ecf8e] px-4 py-2.5 text-sm font-semibold text-black transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          Ask
        </button>
      </form>
    </section>
  );
}
