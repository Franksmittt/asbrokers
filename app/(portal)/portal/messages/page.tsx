import { MessageReply } from "@/components/portal/MessageReply";
import { PortalMessagesThread } from "@/components/portal/PortalMessagesThread";
import { getMessages } from "@/lib/mock-portal";

export const metadata = {
  title: "Messages",
  description: "Unified correspondence with your AS Brokers advisor.",
};

export default function PortalMessagesPage() {
  const messages = getMessages();

  return (
    <main className="flex min-h-[calc(100vh-5rem)] flex-col">
      <header className="mx-auto w-full max-w-3xl px-4 pb-6 pt-2 sm:px-6">
        <h1 className="text-2xl font-bold text-white">Messages</h1>
        <p className="mt-2 text-sm text-white/50">
          Email, portal, and WhatsApp in one chronological thread.
        </p>
      </header>
      <div className="flex-1 overflow-y-auto px-4 sm:px-6">
        <PortalMessagesThread messages={messages} />
      </div>
      <MessageReply />
    </main>
  );
}
