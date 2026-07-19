import Link from "next/link";
import { HUB_BODY, HUB_TEAL } from "@/lib/hub-design-tokens";

type Props = {
  prompt: string;
  href: string;
  label: string;
};

/** Everest-matched soft line under the hero split (prompt + teal text link). */
export function HubHeroAfterLink({ prompt, href, label }: Props) {
  const isHash = href.startsWith("#");
  const isExternal = /^https?:\/\//.test(href);

  return (
    <p className="text-sm" style={{ color: HUB_BODY }}>
      {prompt}{" "}
      {isHash || isExternal ? (
        <a
          href={href}
          className="font-semibold underline-offset-2 hover:underline"
          style={{ color: HUB_TEAL }}
          {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {label}
        </a>
      ) : (
        <Link
          href={href}
          prefetch={false}
          className="font-semibold underline-offset-2 hover:underline"
          style={{ color: HUB_TEAL }}
        >
          {label}
        </Link>
      )}
    </p>
  );
}
