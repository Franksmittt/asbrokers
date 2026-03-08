"use client";

import { useState } from "react";

export function MessageReply() {
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!message.trim()) return;
    setSent(true);
    setMessage("");
  }

  return (
    <div className="rounded-2xl bg-vault-card border border-white/10 overflow-hidden">
      <form onSubmit={handleSubmit} className="p-4">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your reply… (mock – not sent)"
          rows={3}
          className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-cinematic-teal/50 resize-none text-sm"
        />
        <div className="flex items-center justify-between mt-3">
          <p className="text-xs text-zinc-500">Replies will be visible to your advisor when backend is connected.</p>
          <button
            type="submit"
            disabled={!message.trim()}
            className="px-4 py-2 rounded-xl bg-cinematic-teal/20 text-cinematic-teal font-medium text-sm hover:bg-cinematic-teal/30 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {sent ? "Sent (mock)" : "Send (mock)"}
          </button>
        </div>
        {sent && (
          <p className="mt-2 text-xs text-green-400">Reply added to thread above when backend is connected.</p>
        )}
      </form>
    </div>
  );
}
