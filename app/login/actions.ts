"use server";

import { redirect } from "next/navigation";
import { setMockSession, type MockRole } from "@/lib/mock-auth";

export async function mockLogin(role: MockRole, name: string, staffId?: string) {
  const displayName = name.trim() || (role === "client" ? "Client" : role === "admin" ? "Admin" : "Staff");
  const resolvedStaffId = role === "admin" ? "s1" : role === "staff" ? (staffId || "s5") : undefined;
  await setMockSession(role, displayName, resolvedStaffId);
  const destination = role === "client" ? "/portal" : "/crm";
  redirect(destination);
}
