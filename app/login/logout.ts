"use server";

import { redirect } from "next/navigation";
import { clearMockSession } from "@/lib/mock-auth";

export async function logout() {
  await clearMockSession();
  redirect("/login");
}
