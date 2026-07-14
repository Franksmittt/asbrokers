import { WhatsAppLogo } from "@/components/WhatsAppLogo";

const WHATSAPP_LINK = "https://wa.me/27662276044";

/** Desktop WhatsApp FAB — official WhatsApp mark. */
export function FloatingWhatsApp() {
  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      className="hidden md:flex fixed bottom-6 right-6 z-[45] h-14 w-14 items-center justify-center rounded-full shadow-2xl transition-transform hover:scale-110 group"
      data-visual-ignore
      aria-label="Chat on WhatsApp"
    >
      <WhatsAppLogo className="h-14 w-14" />
      <span className="pointer-events-none absolute right-16 whitespace-nowrap rounded-xl border border-white/10 bg-[#151518] px-4 py-2 text-sm font-semibold text-white opacity-0 shadow-xl transition-opacity group-hover:opacity-100">
        Chat with Albert or Johnny
      </span>
    </a>
  );
}
