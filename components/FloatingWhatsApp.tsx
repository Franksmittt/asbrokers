"use client";

import { MessageCircle } from "./icons";

const WHATSAPP_LINK = "https://wa.me/27672429946";

export function FloatingWhatsApp() {
  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      className="hidden md:flex fixed bottom-6 right-6 w-14 h-14 bg-[#25D366] text-white rounded-full items-center justify-center shadow-2xl hover:scale-110 transition-transform z-[45] group"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
      <span className="absolute right-16 bg-[#151518] border border-white/10 text-white text-sm font-semibold px-4 py-2 rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap shadow-xl">
        Chat with Albert or Johnny
      </span>
    </a>
  );
}
