"use client";

import { useQueryState } from "nuqs";
import { SERVICE_LABELS, type ServiceCategory } from "@/lib/mock-crm";

const ALL_SERVICES: { value: ""; label: string } = { value: "", label: "All services" };
const SERVICE_OPTIONS = [ALL_SERVICES, ...(Object.entries(SERVICE_LABELS) as [ServiceCategory, string][]).map(([value, label]) => ({ value, label }))];

export function ServiceFilter() {
  const [service, setService] = useQueryState("service", { defaultValue: "" });

  return (
    <select
      value={service}
      onChange={(e) => setService(e.target.value || null)}
      className="px-3 py-1.5 rounded-xl bg-black/40 border border-white/10 text-white text-sm min-w-[180px]"
      aria-label="Filter by service"
    >
      {SERVICE_OPTIONS.map(({ value, label }) => (
        <option key={value || "all"} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
}
