import { NextRequest, NextResponse } from "next/server";

import { getSupabaseService } from "@/lib/supabase/server";

function safeSegment(value: string): boolean {
  return /^[a-zA-Z0-9/_\-.]+$/.test(value);
}

export async function GET(req: NextRequest) {
  const bucket = req.nextUrl.searchParams.get("bucket")?.trim() ?? "";
  const objectPath = req.nextUrl.searchParams.get("path")?.trim() ?? "";

  if (!bucket || !objectPath || !safeSegment(bucket) || !safeSegment(objectPath)) {
    return NextResponse.json({ error: "Invalid media path." }, { status: 400 });
  }

  const supabase = getSupabaseService();
  if (!supabase) {
    return NextResponse.json({ error: "Media service not configured." }, { status: 500 });
  }

  const { data, error } = await supabase.storage.from(bucket).download(objectPath);
  if (error || !data) {
    return NextResponse.json({ error: "Media file not found." }, { status: 404 });
  }

  return new NextResponse(data, {
    headers: {
      "Content-Type": data.type || "application/octet-stream",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
