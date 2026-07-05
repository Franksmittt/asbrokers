"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";

import {
  addGlobalNote as addGlobalNoteAction,
  addReminder as addReminderAction,
  updateLeadStatus as persistLeadStatus,
} from "@/app/actions/crm";
import type { CrmLead, CrmRole, LeadStatus } from "@/lib/crm/types";

type CrmContextValue = {
  role: CrmRole;
  staffId: string;
  staffName: string;
  canUseAi: boolean;
  leads: CrmLead[];
  visibleLeads: CrmLead[];
  updateLeadStatus: (leadId: string, status: LeadStatus) => void;
  getLeadById: (id: string) => CrmLead | undefined;
  addGlobalNote: (content: string) => Promise<void>;
  addReminder: (leadId: string, title: string, dueDate: string) => Promise<void>;
};

const CrmContext = createContext<CrmContextValue | null>(null);

type CrmProviderProps = {
  children: ReactNode;
  initialLeads: CrmLead[];
  role: CrmRole;
  staffId: string;
  staffName: string;
  canUseAi: boolean;
};

export function CrmProvider({
  children,
  initialLeads,
  role,
  staffId,
  staffName,
  canUseAi,
}: CrmProviderProps) {
  const router = useRouter();
  const [leads, setLeads] = useState<CrmLead[]>(() => initialLeads);

  const visibleLeads = leads;

  const updateLeadStatus = useCallback((leadId: string, status: LeadStatus) => {
    setLeads((prev) => {
      const previous = prev.find((lead) => lead.id === leadId);
      if (!previous || previous.status === status) {
        return prev;
      }

      void persistLeadStatus(leadId, status).then((result) => {
        if (!result.ok) {
          setLeads((current) =>
            current.map((lead) =>
              lead.id === leadId ? { ...lead, status: previous.status } : lead
            )
          );
        }
      });

      return prev.map((lead) => (lead.id === leadId ? { ...lead, status } : lead));
    });
  }, []);

  const getLeadById = useCallback(
    (id: string) => leads.find((lead) => lead.id === id),
    [leads]
  );

  const addGlobalNote = useCallback(
    async (content: string) => {
      const result = await addGlobalNoteAction(content);
      if (result.ok) {
        router.refresh();
      }
    },
    [router]
  );

  const addReminder = useCallback(
    async (leadId: string, title: string, dueDate: string) => {
      const result = await addReminderAction(leadId, title, dueDate);
      if (result.ok) {
        router.refresh();
      }
    },
    [router]
  );

  const value = useMemo<CrmContextValue>(
    () => ({
      role,
      staffId,
      staffName,
      canUseAi,
      leads,
      visibleLeads,
      updateLeadStatus,
      getLeadById,
      addGlobalNote,
      addReminder,
    }),
    [
      role,
      staffId,
      staffName,
      canUseAi,
      leads,
      visibleLeads,
      updateLeadStatus,
      getLeadById,
      addGlobalNote,
      addReminder,
    ]
  );

  return <CrmContext.Provider value={value}>{children}</CrmContext.Provider>;
}

export function useCrm() {
  const ctx = useContext(CrmContext);
  if (!ctx) {
    throw new Error("useCrm must be used within CrmProvider");
  }
  return ctx;
}
