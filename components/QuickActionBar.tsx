import Link from "next/link";
import { Calendar } from "./icons";
import { WhatsAppLogo } from "@/components/WhatsAppLogo";

const WHATSAPP_LINK = "https://wa.me/27662276044";

/**
 * Mobile bottom bar, zero client JS (SSR only).
 * Page shells already reserve bottom padding (`pb-24`) so CLS stays 0.
 */
export function QuickActionBar() {
  return (
    <div
      className="fixed bottom-0 left-0 z-40 flex w-full gap-3 border-t border-stone-200/80 bg-warm-canvas p-4 pb-safe md:hidden"
      data-visual-ignore
    >
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-whatsapp-accessible py-3.5 font-semibold text-white shadow-lg shadow-green-900/20 transition-transform active:scale-95"
      >
        <WhatsAppLogo className="h-6 w-6" /> WhatsApp
      </a>
      <Link
        href="/contact"
        prefetch={false}
        className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-white py-3.5 font-semibold text-black shadow-lg transition-transform active:scale-95"
      >
        <Calendar className="h-5 w-5" /> Consult
      </Link>
    </div>
  );
}
