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
import {
  markAllCourseAlertsRead as markAllCourseAlertsReadAction,
  markCourseAlertRead as markCourseAlertReadAction,
} from "@/app/actions/crm-course-alerts";
import type { CourseStaffAlert } from "@/lib/courses/types";
import type { CrmLead, CrmRole, LeadStatus } from "@/lib/crm/types";

type CrmContextValue = {
  role: CrmRole;
  staffId: string;
  staffName: string;
  canUseAi: boolean;
  leads: CrmLead[];
  visibleLeads: CrmLead[];
  courseAlerts: CourseStaffAlert[];
  unreadCourseAlerts: CourseStaffAlert[];
  updateLeadStatus: (leadId: string, status: LeadStatus) => void;
  getLeadById: (id: string) => CrmLead | undefined;
  addGlobalNote: (content: string) => Promise<void>;
  addReminder: (leadId: string, title: string, dueDate: string) => Promise<void>;
  markCourseAlertRead: (alertId: string) => Promise<void>;
  markAllCourseAlertsRead: () => Promise<void>;
};

const CrmContext = createContext<CrmContextValue | null>(null);

type CrmProviderProps = {
  children: ReactNode;
  initialLeads: CrmLead[];
  initialCourseAlerts?: CourseStaffAlert[];
  role: CrmRole;
  staffId: string;
  staffName: string;
  canUseAi: boolean;
};

export function CrmProvider({
  children,
  initialLeads,
  initialCourseAlerts = [],
  role,
  staffId,
  staffName,
  canUseAi,
}: CrmProviderProps) {
  const router = useRouter();
  const [leads, setLeads] = useState<CrmLead[]>(() => initialLeads);
  const [courseAlerts, setCourseAlerts] = useState<CourseStaffAlert[]>(() => initialCourseAlerts);

  const visibleLeads = leads;
  const unreadCourseAlerts = useMemo(
    () => courseAlerts.filter((alert) => !alert.readAt),
    [courseAlerts]
  );

  const updateLeadStatus = useCallback((leadId: string, status: LeadStatus) => {
    setLeads((prev) => {
      const previous = prev.find((lead) => lead.id === leadId);
      if (!previous || previous.status === status) {
        return prev;
      }

      void persistLeadStatus(leadId, status)
        .then((result) => {
          if (!result.ok) {
            setLeads((current) =>
              current.map((lead) =>
                lead.id === leadId ? { ...lead, status: previous.status } : lead
              )
            );
          }
        })
        .catch((error) => {
          console.error("[CRM] persistLeadStatus failed:", error);
          setLeads((current) =>
            current.map((lead) =>
              lead.id === leadId ? { ...lead, status: previous.status } : lead
            )
          );
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

  const markCourseAlertRead = useCallback(async (alertId: string) => {
    const stamped = new Date().toISOString();
    setCourseAlerts((prev) =>
      prev.map((alert) => (alert.id === alertId ? { ...alert, readAt: alert.readAt ?? stamped } : alert))
    );
    const result = await markCourseAlertReadAction(alertId);
    if (!result.ok) {
      setCourseAlerts((prev) =>
        prev.map((alert) => (alert.id === alertId ? { ...alert, readAt: null } : alert))
      );
    }
  }, []);

  const markAllCourseAlertsRead = useCallback(async () => {
    const stamped = new Date().toISOString();
    const previous = courseAlerts;
    setCourseAlerts((prev) => prev.map((alert) => ({ ...alert, readAt: alert.readAt ?? stamped })));
    const result = await markAllCourseAlertsReadAction();
    if (!result.ok) {
      setCourseAlerts(previous);
    }
  }, [courseAlerts]);

  const value = useMemo<CrmContextValue>(
    () => ({
      role,
      staffId,
      staffName,
      canUseAi,
      leads,
      visibleLeads,
      courseAlerts,
      unreadCourseAlerts,
      updateLeadStatus,
      getLeadById,
      addGlobalNote,
      addReminder,
      markCourseAlertRead,
      markAllCourseAlertsRead,
    }),
    [
      role,
      staffId,
      staffName,
      canUseAi,
      leads,
      visibleLeads,
      courseAlerts,
      unreadCourseAlerts,
      updateLeadStatus,
      getLeadById,
      addGlobalNote,
      addReminder,
      markCourseAlertRead,
      markAllCourseAlertsRead,
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
