import { NextResponse } from "next/server";
import { subscribeNewsletter } from "@/app/actions/newsletter";

export async function POST(request: Request) {
  const form = await request.formData();
  await subscribeNewsletter({ success: false }, form);
  const referer = request.headers.get("referer") || "https://www.asbrokers.co.za/";
  return NextResponse.redirect(referer, 303);
}
