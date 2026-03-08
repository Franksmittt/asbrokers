import { MOCK_MESSAGES } from "@/lib/mock-portal";
import { MessageCircle } from "@/components/icons";
import { MessageReply } from "@/components/portal/MessageReply";

export const metadata = {
  title: "Messages",
  description: "Client communication history.",
};

const channelLabel: Record<string, string> = {
  portal: "Portal",
  email: "Email",
  whatsapp: "WhatsApp",
};

export default function PortalMessagesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">Messages</h1>
        <p className="text-zinc-400 text-sm">Unified thread with your advisor — email, WhatsApp and portal in one place.</p>
      </div>

      <div className="rounded-2xl rim-light bg-vault-card border border-white/10 overflow-hidden">
        <ul className="divide-y divide-white/5">
          {MOCK_MESSAGES.map((msg) => (
            <li
              key={msg.id}
              className={`px-4 sm:px-6 py-4 ${msg.from === "advisor" ? "bg-white/[0.02]" : ""}`}
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-4 h-4 text-zinc-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="font-medium text-white">{msg.fromName}</span>
                    <span className="text-xs text-zinc-500">
                      {new Date(msg.at).toLocaleString("en-ZA", {
                        dateStyle: "short",
                        timeStyle: "short",
                      })}
                    </span>
                    <span className="text-xs px-1.5 py-0.5 rounded bg-white/10 text-zinc-400">
                      {channelLabel[msg.channel]}
                    </span>
                  </div>
                  <p className="text-zinc-300 text-sm leading-relaxed">{msg.body}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <MessageReply />
    </div>
  );
}
