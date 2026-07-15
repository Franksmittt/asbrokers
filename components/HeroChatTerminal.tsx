"use client";

import { useRef, useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import Link from "next/link";
import { asbrokersChatFetch } from "@/lib/asbrokers-chat-fetch";
import { CHAT_DARK_INPUT_TRANSPARENT_CLASS } from "@/lib/chat/input-classes";
import { ChatToolResultCard } from "@/components/chat/ChatToolResultCard";

const PRE_PROMPTS = [
  "Please call me back",
  "How does Discovery Health Gap Cover work?",
  "How does the 12.8% Strategic Income work?",
];

export type HeroChatTerminalVariant = "hero" | "panel";

type HeroChatTerminalProps = {
  /**
   * hero = landing card (traffic-light chrome, short message viewport).
   * panel = floating / sheet layout: flex column, messages fill available height (parent must be flex + min-h-0).
   */
  variant?: HeroChatTerminalVariant;
  /** When set, send once as the first user message (homepage slim bar → panel). */
  seedMessage?: string | null;
  onSeedConsumed?: () => void;
};

/**
 * Embedded AI chat terminal. useChat + tools (estate duty, strategic income).
 * `variant="panel"` is optimized for FloatingChat: one scroll surface (messages only), composer pinned.
 */
export function HeroChatTerminal({
  variant = "hero",
  seedMessage = null,
  onSeedConsumed,
}: HeroChatTerminalProps) {
  const isPanel = variant === "panel";
  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat", fetch: asbrokersChatFetch }),
  });
  const scrollRef = useRef<HTMLDivElement>(null);
  const seedSentRef = useRef<string | null>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, status]);

  useEffect(() => {
    const text = seedMessage?.trim();
    if (!text || seedSentRef.current === text) return;
    seedSentRef.current = text;
    void sendMessage({ text });
    onSeedConsumed?.();
  }, [seedMessage, sendMessage, onSeedConsumed]);

  const messageList = (
    <>
      {messages.length === 0 && (
        <p className={isPanel ? "text-zinc-500 text-sm px-1 py-2" : "text-zinc-500 text-sm px-2"}>
          Ask about Discovery Health, Gap Cover, 12.8% Strategic Income, or estate duty.
        </p>
      )}
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={
            msg.role === "user"
              ? isPanel
                ? "flex justify-end px-1"
                : "flex justify-end px-2"
              : isPanel
                ? "flex justify-start px-1"
                : "flex justify-start px-2"
          }
        >
          <div
            className={
              msg.role === "user"
                ? "rounded-2xl rounded-br-md px-3 py-2.5 bg-cinematic-teal/30 border border-cinematic-teal/40 max-w-[min(100%,20rem)]"
                : "rounded-2xl rounded-bl-md px-3 py-2.5 bg-[#1c1c22] border border-white/12 max-w-[min(100%,20rem)]"
            }
          >
            {msg.parts?.map((part, i) => {
              if (part.type === "text" && "text" in part) {
                return (
                  <p key={i} className="text-sm text-zinc-100 whitespace-pre-wrap break-words [overflow-wrap:anywhere]">
                    {(part as { text: string }).text}
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
            {(!msg.parts || msg.parts.length === 0) &&
              typeof (msg as unknown as { content?: string }).content === "string" && (
                <p className="text-sm text-zinc-100 whitespace-pre-wrap break-words [overflow-wrap:anywhere]">
                  {(msg as unknown as { content: string }).content}
                </p>
              )}
          </div>
        </div>
      ))}
      {status === "streaming" && (
        <p className={isPanel ? "text-zinc-500 text-sm px-1 animate-pulse" : "text-zinc-500 text-sm px-2 animate-pulse"}>
          Thinking…
        </p>
      )}
    </>
  );

  const promptsRow = (
    <div
      className={
        isPanel
          ? "shrink-0 -mx-1 px-1 pt-2 flex gap-2 overflow-x-auto pb-1 [mask-image:linear-gradient(to_right,black_calc(100%-1.5rem),transparent)] md:[mask-image:none]"
          : "flex flex-wrap gap-2 pt-2 pb-2"
      }
    >
      {PRE_PROMPTS.map((text) => (
        <button
          key={text}
          type="button"
          onClick={() => sendMessage({ text })}
          disabled={status === "streaming"}
          className={
            isPanel
              ? "shrink-0 text-xs px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-zinc-200 hover:bg-cinematic-teal/20 hover:border-cinematic-teal/30 active:scale-[0.98] transition-transform disabled:opacity-50 touch-manipulation"
              : "text-xs px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:bg-cinematic-teal/20 hover:border-cinematic-teal/30 hover:text-white transition-colors disabled:opacity-50"
          }
        >
          {text}
        </button>
      ))}
    </div>
  );

  const composer = (
    <form
      className={isPanel ? "shrink-0 relative rounded-2xl overflow-hidden pt-2" : "relative rounded-2xl overflow-hidden"}
      onSubmit={(e) => {
        e.preventDefault();
        const input = e.currentTarget.querySelector<HTMLInputElement>('input[name="hero-chat"]');
        const text = input?.value?.trim();
        if (text) {
          sendMessage({ text });
          if (input) input.value = "";
        }
      }}
    >
      {!isPanel && (
        <div
          className="absolute inset-0 opacity-40 pointer-events-none rounded-2xl"
          style={{
            boxShadow: "0 0 24px rgba(0, 87, 184, 0.4)",
            animation: "hero-terminal-glow 2s ease-in-out infinite",
          }}
        />
      )}
      <div
        className={
          isPanel
            ? "relative flex items-center gap-2 px-3 py-3 sm:px-4 rounded-2xl border border-white/15 bg-[#151518] focus-within:border-cinematic-teal/50 focus-within:ring-2 focus-within:ring-cinematic-teal/25 transition-all"
            : "relative flex items-center gap-2 px-4 py-3 rounded-2xl border border-white/15 bg-[#151518] focus-within:border-cinematic-teal/50 focus-within:ring-2 focus-within:ring-cinematic-teal/25 transition-all"
        }
      >
        <input
          name="hero-chat"
          type="text"
          enterKeyHint="send"
          autoComplete="off"
          placeholder="Ask anything…"
          disabled={status === "streaming"}
          className={CHAT_DARK_INPUT_TRANSPARENT_CLASS}
          aria-label="Chat message"
        />
        <button
          type="submit"
          disabled={status === "streaming"}
          className="shrink-0 min-h-[44px] min-w-[44px] sm:min-h-0 sm:min-w-0 px-2 sm:px-0 text-cinematic-teal font-semibold text-sm hover:underline disabled:opacity-50 touch-manipulation flex items-center justify-center"
        >
          Send
        </button>
      </div>
    </form>
  );

  const fullChatLink = (
    <Link
      href="/chat"
      className={
        isPanel
          ? "shrink-0 block text-center text-xs text-cinematic-teal hover:underline pt-2 pb-safe md:pb-0"
          : "mt-2 block text-center text-xs text-cinematic-teal hover:underline"
      }
    >
      Open full chat →
    </Link>
  );

  if (isPanel) {
    return (
      <div className="flex flex-col flex-1 min-h-0" role="region" aria-label="Digital Wealth Assistant">
        <div
          ref={scrollRef}
          className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden overscroll-y-contain py-2 space-y-2 scroll-pb-4"
        >
          {messageList}
        </div>
        {error && (
          <p className="shrink-0 text-amber-400 text-xs px-1 py-1.5" role="alert">
            {error.message}
          </p>
        )}
        {promptsRow}
        {composer}
        {fullChatLink}
      </div>
    );
  }

  return (
    <div className="mt-6 rim-light p-4 rounded-[2rem] overflow-hidden" role="region" aria-label="Digital Wealth Assistant">
      <div className="flex items-center gap-2 px-2 py-2 border-b border-white/10 shrink-0">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" aria-hidden />
        <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" aria-hidden />
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" aria-hidden />
        <span className="ml-2 text-[10px] font-medium text-gray-500 uppercase tracking-widest">
          Digital Wealth Assistant
        </span>
      </div>

      <div ref={scrollRef} className="min-h-[120px] max-h-[200px] overflow-y-auto overscroll-y-contain py-3 space-y-2">
        {messageList}
      </div>

      {error && (
        <p className="text-amber-400 text-xs px-2 py-1" role="alert">
          {error.message}
        </p>
      )}

      {promptsRow}
      {composer}
      {fullChatLink}
    </div>
  );
}
