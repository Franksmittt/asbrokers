import { ManageCookiesPageView } from "@/components/legal/ManageCookiesPageView";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { buildPageMetadata, buildPageTitle } from "@/lib/seo-metadata";

const PAGE_TITLE = "Manage Cookie Preferences | AS Brokers CC";
const PAGE_DESCRIPTION =
  "Manage your cookie preferences for the AS Brokers CC website in line with POPIA. FSP 17273.";

export const metadata = buildPageMetadata({
  path: "/manage-cookies",
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  noIndex: true,
});

export default function ManageCookiesPage() {
  return (
    <>
      <PageJsonLd
        path="/manage-cookies"
        webPage={{ name: buildPageTitle(PAGE_TITLE), description: PAGE_DESCRIPTION }}
      />
      <ManageCookiesPageView />
    </>
  );
}
