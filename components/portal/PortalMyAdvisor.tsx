"use client";

interface Advisor {
  name: string;
  role: string;
  phone: string;
  whatsApp: string;
}

export function PortalMyAdvisor({ advisor }: { advisor: Advisor }) {
  const whatsAppUrl = `https://wa.me/27${advisor.whatsApp.replace(/\D/g, "").slice(-9)}`;

  return (
    <div className="rounded-2xl bg-vault-card border border-white/10 p-6 flex flex-wrap items-center justify-between gap-4">
      <div>
        <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Your advisor</p>
        <p className="text-xl font-bold text-white mt-1">{advisor.name}</p>
        <p className="text-sm text-zinc-400 mt-0.5">{advisor.role}</p>
      </div>
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
        <a
          href={whatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-5 py-2.5 rounded-2xl font-semibold text-sm transition-colors"
        >
          WhatsApp {advisor.phone}
        </a>
        <a href={`tel:${advisor.phone.replace(/\s/g, "")}`} className="text-sm text-zinc-400 hover:text-white sm:ml-2">
          Call
        </a>
      </div>
    </div>
  );
}
