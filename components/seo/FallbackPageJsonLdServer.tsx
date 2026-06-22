import { headers } from "next/headers";
import { FallbackPageJsonLd } from "@/components/seo/PageJsonLd";

/** SSR JSON-LD fallback — pathname from middleware x-pathname header. */
export async function FallbackPageJsonLdServer() {
  const pathname = (await headers()).get("x-pathname") ?? "/";
  return <FallbackPageJsonLd pathname={pathname} />;
}
