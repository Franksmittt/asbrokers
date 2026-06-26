"use client";

import type { PortalMessage } from "@/lib/mock-portal";
import { cn } from "@/lib/utils";

const CHANNEL_STYLES: Record<
  PortalMessage["channel"],
  { label: string; text: string; badge: string }
> = {
  email: {
    label: "Email",
    text: "text-samsung-blue",
    badge: "bg-samsung-blue/15 text-samsung-blue",
  },
  portal: {
    label: "Portal",
    text: "text-cinematic-teal",
    badge: "bg-cinematic-teal/15 text-cinematic-teal",
  },
  whatsapp: {
    label: "WhatsApp",
    text: "text-whatsapp",
    badge: "bg-whatsapp/15 text-whatsapp",
  },
};

function formatSentAt(iso: string) {
  return new Intl.DateTimeFormat("en-ZA", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}

export function PortalMessagesThread({ messages }: { messages: PortalMessage[] }) {
  return (
    <ul className="mx-auto flex max-w-3xl flex-col gap-4 pb-4">
      {messages.map((msg) => {
        const channel = CHANNEL_STYLES[msg.channel];
        return (
          <li
            key={msg.id}
            className={cn(
              "rounded-[2rem] p-4 sm:p-5",
              msg.isClient ? "ml-4 bg-shark sm:ml-12" : "mr-4 rim-light sm:mr-12"
            )}
          >
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span className={cn("text-sm font-semibold", channel.text)}>{msg.from}</span>
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
                  channel.badge
                )}
              >
                {channel.label}
              </span>
              <time className="ml-auto text-[11px] text-white/40" dateTime={msg.sentAt}>
                {formatSentAt(msg.sentAt)}
              </time>
            </div>
            <p className={cn("text-sm leading-relaxed", channel.text)}>{msg.body}</p>
          </li>
        );
      })}
    </ul>
  );
}
