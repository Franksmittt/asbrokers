import { NextResponse } from "next/server";
import { CONSENT_COOKIE, type ConsentCookieValue } from "@/lib/consent-cookie";

export async function POST(request: Request) {
  const form = await request.formData();
  const level = String(form.get("level") ?? "");
  const value: ConsentCookieValue | null =
    level === "all" || level === "essential" ? level : null;

  const referer = request.headers.get("referer") || "https://www.asbrokers.co.za/";
  const res = NextResponse.redirect(referer, 303);
  if (value) {
    res.cookies.set(CONSENT_COOKIE, value, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });
  } else if (level === "clear") {
    res.cookies.delete(CONSENT_COOKIE);
  }
  return res;
}
