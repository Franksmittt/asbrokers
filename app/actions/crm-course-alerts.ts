"use server";

import { revalidatePath } from "next/cache";

import { requireCrmAccess } from "@/lib/crm/staff-access";
import {
  listCourseStaffAlerts,
  listUnreadCourseStaffAlerts,
  markAllCourseStaffAlertsRead,
  markCourseStaffAlertRead,
} from "@/lib/courses/store";
import type { CourseStaffAlert } from "@/lib/courses/types";

export async function getCourseStaffAlerts(limit = 20): Promise<CourseStaffAlert[]> {
  await requireCrmAccess();
  try {
    return await listCourseStaffAlerts(limit);
  } catch (error) {
    console.error("[CRM] getCourseStaffAlerts failed:", error);
    return [];
  }
}

export async function getUnreadCourseStaffAlerts(limit = 20): Promise<CourseStaffAlert[]> {
  await requireCrmAccess();
  try {
    return await listUnreadCourseStaffAlerts(limit);
  } catch (error) {
    console.error("[CRM] getUnreadCourseStaffAlerts failed:", error);
    return [];
  }
}

export async function markCourseAlertRead(alertId: string): Promise<{ ok: boolean }> {
  await requireCrmAccess();
  try {
    await markCourseStaffAlertRead(alertId);
    revalidatePath("/crm");
    return { ok: true };
  } catch (error) {
    console.error("[CRM] markCourseAlertRead failed:", error);
    return { ok: false };
  }
}

export async function markAllCourseAlertsRead(): Promise<{ ok: boolean }> {
  await requireCrmAccess();
  try {
    await markAllCourseStaffAlertsRead();
    revalidatePath("/crm");
    return { ok: true };
  } catch (error) {
    console.error("[CRM] markAllCourseAlertsRead failed:", error);
    return { ok: false };
  }
}
