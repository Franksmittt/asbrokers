import Link from "next/link";
import { ArrowRight } from "@/components/icons";
import {
  WHATSAPP_DISPLAY,
  whatsappUrl,
  WHATSAPP_CAPITAL_ASSESSMENT_MESSAGE,
} from "@/lib/whatsapp";

type Props = {
  /** Primary CTA label — keep near 29 characters to match Everest. */
  primaryLabel: string;
  /** Internal path, hash, or absolute URL. */
  primaryHref: string;
  whatsappMessage?: string;
};

const PRIMARY_CLASS =
  "inline-flex items-center gap-2 rounded bg-samsung-blue px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#004a9e]";
const SECONDARY_CLASS =
  "inline-flex items-center gap-2 text-sm font-semibold text-[#006B6B] hover:opacity-80";

/**
 * Everest-matched hub hero CTAs: solid Samsung primary + WhatsApp text link.
 * Used by every public hub so button chrome never drifts.
 */
export function HubHeroActions({
  primaryLabel,
  primaryHref,
  whatsappMessage = WHATSAPP_CAPITAL_ASSESSMENT_MESSAGE,
}: Props) {
  const isHash = primaryHref.startsWith("#");
  const isExternal = /^https?:\/\//.test(primaryHref);

  return (
    <>
      {isHash || isExternal ? (
        <a
          href={primaryHref}
          className={PRIMARY_CLASS}
          {...(isExternal
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {primaryLabel}
          <ArrowRight className="h-4 w-4" aria-hidden />
        </a>
      ) : (
        <Link href={primaryHref} prefetch={false} className={PRIMARY_CLASS}>
          {primaryLabel}
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      )}
      <a
        href={whatsappUrl(whatsappMessage)}
        target="_blank"
        rel="noopener noreferrer"
        className={SECONDARY_CLASS}
      >
        WhatsApp {WHATSAPP_DISPLAY}
        <ArrowRight className="h-4 w-4" aria-hidden />
      </a>
    </>
  );
}
