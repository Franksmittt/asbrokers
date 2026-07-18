import { WhatsAppLogo } from "@/components/WhatsAppLogo";

const WHATSAPP_LINK = "https://wa.me/27662276044";

/**
 * Desktop WhatsApp FAB — zero client JS / no framer-motion.
 * Flip uses CSS `animate-whatsapp-flip` + motion-safe so prefers-reduced-motion is respected.
 */
export function FloatingWhatsApp() {
  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      className="group fixed bottom-6 right-6 z-[45] hidden h-14 w-14 items-center justify-center rounded-full shadow-2xl transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:scale-110 md:flex [perspective:240px]"
      data-visual-ignore
      aria-label="Chat on WhatsApp"
    >
      <span className="inline-flex motion-safe:animate-whatsapp-flip motion-reduce:animate-none [transform-style:preserve-3d]">
        <WhatsAppLogo className="h-14 w-14" />
      </span>
      <span className="pointer-events-none absolute right-16 whitespace-nowrap rounded-xl border border-white/10 bg-[#151518] px-4 py-2 text-sm font-semibold text-white opacity-0 shadow-xl transition-opacity group-hover:opacity-100">
        Chat with Albert or Johnny
      </span>
    </a>
  );
}
