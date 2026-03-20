"use client";

import Link from "next/link";
import { MessageCircle, Calendar } from "./icons";

const WHATSAPP_LINK = "https://wa.me/27672429946";

export function QuickActionBar() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full bg-[#0a0a0c]/90 backdrop-blur-xl border-t border-white/10 p-4 z-40 flex gap-3 pb-safe">
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 bg-[#25D366] text-white flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold shadow-lg shadow-green-900/20 active:scale-95 transition-transform"
      >
        <MessageCircle className="w-5 h-5" /> WhatsApp
      </a>
      <Link
        href="/contact"
        prefetch={false}
        className="flex-1 bg-white text-black flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold shadow-lg active:scale-95 transition-transform"
      >
        <Calendar className="w-5 h-5" /> Consult
      </Link>
    </div>
  );
}
