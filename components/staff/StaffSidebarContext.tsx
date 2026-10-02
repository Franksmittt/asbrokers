"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

import { SIDEBAR_STORAGE_KEY } from "@/lib/staff-ui";

type StaffSidebarContextValue = {
  collapsed: boolean;
  toggle: () => void;
};

const StaffSidebarContext = createContext<StaffSidebarContextValue | null>(null);

export function StaffSidebarProvider({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    try {
      setCollapsed(window.localStorage.getItem(SIDEBAR_STORAGE_KEY) === "1");
    } catch {
      /* ignore */
    }
  }, []);

  const toggle = useCallback(() => {
    setCollapsed((prev) => {
      const next = !prev;
      try {
        window.localStorage.setItem(SIDEBAR_STORAGE_KEY, next ? "1" : "0");
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  const value = useMemo(() => ({ collapsed, toggle }), [collapsed, toggle]);

  return <StaffSidebarContext.Provider value={value}>{children}</StaffSidebarContext.Provider>;
}

export function useStaffSidebar() {
  const ctx = useContext(StaffSidebarContext);
  if (!ctx) {
    throw new Error("useStaffSidebar must be used within StaffSidebarProvider");
  }
  return ctx;
}

/** Safe when Clear Cache (etc.) may render outside the provider. */
export function useStaffSidebarOptional(): StaffSidebarContextValue | null {
  return useContext(StaffSidebarContext);
}
