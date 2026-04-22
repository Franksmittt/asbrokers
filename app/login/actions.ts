"use server";

import { redirect } from "next/navigation";
import { setMockSession } from "@/lib/mock-auth";

export async function mockLogin(name: string) {
  await setMockSession(name.trim() || "Team");
  redirect("/crm");
}
