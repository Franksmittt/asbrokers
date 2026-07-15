"use client";

import { useRef, useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { asbrokersChatFetch } from "@/lib/asbrokers-chat-fetch";
import { CHAT_DARK_INPUT_CLASS } from "@/lib/chat/input-classes";
import { ChatToolResultCard } from "@/components/chat/ChatToolResultCard";

/** Client island, chat UI only; hero and links are server-rendered (Phase 2.4). */
export function ChatPageClient() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat", fetch: asbrokersChatFetch }),
  });

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, status]);

  return (
    <section className="flex-1 flex flex-col min-h-0 px-4 sm:px-6 md:px-8 pb-4">
      <div className="max-w-3xl mx-auto w-full flex flex-col flex-1 min-h-0 min-h-[min(420px,70dvh)]">
        <div
          ref={scrollRef}
          className="flex-1 min-h-0 overflow-y-auto overscroll-y-contain rounded-2xl bg-[#151518] border border-white/10 p-4 space-y-4"
        >
          {messages.length === 0 && (
            <p className="text-zinc-500 text-sm">
              e.g. &quot;Please call me back about Discovery Health&quot;, &quot;How does Gap Cover work?&quot;, or
              &quot;Estate duty on R8 million?&quot;
            </p>
          )}
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={msg.role === "user" ? "flex justify-end" : "flex justify-start"}
            >
              <div
                className={
                  msg.role === "user"
                    ? "rounded-2xl bg-blue-500/20 border border-blue-500/30 px-4 py-2 max-w-[min(100%,22rem)]"
                    : "rounded-2xl bg-[#1c1c22] border border-white/12 px-4 py-2 max-w-[min(100%,22rem)] space-y-2"
                }
              >
                <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">{msg.role}</p>
                {msg.parts?.map((part, i) => {
                  if (part.type === "text") {
                    return (
                      <p key={i} className="text-sm text-zinc-100 whitespace-pre-wrap break-words [overflow-wrap:anywhere]">
                        {part.text}
                      </p>
                    );
                  }
                  if (
                    typeof part.type === "string" &&
                    part.type.startsWith("tool-") &&
                    "state" in part &&
                    part.state === "output-available" &&
                    "output" in part
                  ) {
                    const toolName = part.type.replace(/^tool-/, "");
                    return (
                      <div key={i} className="mt-2">
                        <ChatToolResultCard toolName={toolName} result={(part as { output: unknown }).output} />
                      </div>
                    );
                  }
                  if (
                    (part as { type?: string }).type === "dynamic-tool" &&
                    "state" in part &&
                    part.state === "output-available" &&
                    "output" in part
                  ) {
                    const p = part as { toolName: string; output: unknown };
                    return (
                      <div key={i} className="mt-2">
                        <ChatToolResultCard toolName={p.toolName} result={p.output} />
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          ))}
          {status === "streaming" && <p className="text-zinc-500 text-sm animate-pulse">Thinking…</p>}
        </div>

        {error && (
          <p className="text-amber-400 text-sm mt-2 shrink-0" role="alert">
            {error.message}
          </p>
        )}

        <form
          className="mt-3 shrink-0 flex gap-2 rounded-2xl border border-white/10 bg-[#0d0d10] p-3 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]"
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.currentTarget;
            const input = form.querySelector<HTMLInputElement>('input[name="q"]');
            const text = input?.value?.trim();
            if (text) {
              sendMessage({ text });
              if (input) input.value = "";
            }
          }}
        >
          <input
            name="q"
            type="text"
            enterKeyHint="send"
            autoComplete="off"
            placeholder="Ask a question or request a callback…"
            className={CHAT_DARK_INPUT_CLASS}
            disabled={status === "streaming"}
          />
          <button
            type="submit"
            disabled={status === "streaming"}
            className="shrink-0 min-w-[48px] sm:min-w-0 bg-zinc-100 text-black font-bold px-5 sm:px-6 py-3 rounded-xl hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
          >
            Send
          </button>
        </form>
      </div>
    </section>
  );
}
