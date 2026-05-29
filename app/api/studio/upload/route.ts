import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";

import {
  ensureStudioBlogImagesBucket,
  STUDIO_BLOG_IMAGE_FILE_SIZE_LIMIT,
  STUDIO_BLOG_IMAGE_MIME_TYPES,
} from "@/lib/client-studio/studio-storage";
import { getClientStudioSession } from "@/lib/client-studio/session";
import { getSupabaseService } from "@/lib/supabase/server";

const STUDIO_ALLOWED_IMAGE_TYPES = new Set<string>(STUDIO_BLOG_IMAGE_MIME_TYPES);

function safeExt(name: string): string {
  const safeName = name.replace(/[^a-zA-Z0-9._-]+/g, "-");
  return safeName.includes(".") ? safeName.split(".").pop() ?? "jpg" : "jpg";
}

export async function POST(req: NextRequest) {
  if (!(await getClientStudioSession())) {
    return NextResponse.json({ ok: false, error: "Session expired - sign in again." }, { status: 401 });
  }

  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid upload payload." }, { status: 400 });
  }

  const file = formData.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ ok: false, error: "No file received." }, { status: 400 });
  }

  if (!STUDIO_ALLOWED_IMAGE_TYPES.has(file.type.toLowerCase())) {
    return NextResponse.json({ ok: false, error: "Only PNG, JPG, and WEBP images are supported." }, { status: 400 });
  }

  if (file.size > STUDIO_BLOG_IMAGE_FILE_SIZE_LIMIT) {
    return NextResponse.json({ ok: false, error: "Image is too large (max 20MB)." }, { status: 400 });
  }

  const supabase = getSupabaseService();
  if (!supabase) {
    return NextResponse.json({ ok: false, error: "Supabase upload service is not configured." }, { status: 500 });
  }

  let bucket: string;
  try {
    bucket = (await ensureStudioBlogImagesBucket()).bucket;
  } catch (error) {
    const message = error instanceof Error && error.message ? error.message : "Storage bucket setup failed.";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
  const key = `studio/${new Date().toISOString().slice(0, 10)}/${randomUUID()}.${safeExt(file.name)}`;
  const bytes = await file.arrayBuffer();

  const uploaded = await supabase.storage.from(bucket).upload(key, bytes, {
    contentType: file.type,
    upsert: false,
  });
  if (uploaded.error) {
    return NextResponse.json({ ok: false, error: `Upload failed: ${uploaded.error.message}` }, { status: 500 });
  }

  const proxyUrl = `/api/studio/media?bucket=${encodeURIComponent(bucket)}&path=${encodeURIComponent(key)}`;
  return NextResponse.json({ ok: true, url: proxyUrl });
}

