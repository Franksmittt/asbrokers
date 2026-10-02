"use server";

import { staffLogout } from "@/lib/staff-logout";

export async function logout() {
  await staffLogout("/login");
}
