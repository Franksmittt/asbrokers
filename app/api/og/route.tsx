import { createOgImageResponse } from "@/lib/og-image";
import { BRAND_NAME, clampMetaDescription } from "@/lib/seo-metadata";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const rawTitle = searchParams.get("title")?.trim();
  const rawDescription = searchParams.get("description")?.trim();

  const title = rawTitle?.replace(/\s*\|\s*AS Brokers CC$/i, "").trim() || BRAND_NAME;
  const description =
    rawDescription && rawDescription.length > 0
      ? clampMetaDescription(rawDescription, { ideal: 120 })
      : "Independent financial advisor in Krugersdorp — retirement, Everest Wealth, insurance, and estate planning. FSP 17273.";

  return createOgImageResponse({ title, description });
}
