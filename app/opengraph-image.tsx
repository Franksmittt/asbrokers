import { createOgImageResponse } from "@/lib/og-image";
import { OG_CONTENT_TYPE, OG_SIZE } from "@/lib/og-fonts";

export const runtime = "edge";
export const alt = "AS Brokers CC — Independent Financial Advisor Krugersdorp, FSP 17273";
export { OG_SIZE as size };
export const contentType = OG_CONTENT_TYPE;

const HOME_OG = {
  title: "Independent Financial Advisor Krugersdorp",
  description:
    "25+ years helping South Africans with retirement planning, Everest Wealth, insurance, estate structuring, and business continuity. FSP 17273.",
};

export default async function OpenGraphImage() {
  return createOgImageResponse(HOME_OG);
}
