"use client";

import dynamic from "next/dynamic";
import type { PortalChartPoint } from "@/lib/mock-portal";

const PortalDashboardCharts = dynamic(
  () =>
    import("@/components/portal/PortalDashboardCharts").then((m) => m.PortalDashboardCharts),
  {
    ssr: false,
    loading: () => (
      <div className="h-72 w-full animate-pulse rounded-[2rem] bg-shark/50 sm:h-80" />
    ),
  }
);

type Props = {
  data: PortalChartPoint[];
};

export function PortalDashboardChartsLazy({ data }: Props) {
  return <PortalDashboardCharts data={data} />;
}
