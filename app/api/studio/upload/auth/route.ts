import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";

import { getSupabaseService } from "@/lib/supabase/server";

const ALLOWED_IMAGE_TYPES = new Set(["image/png", "image/jpeg", "image/jpg", "image/webp"]);
const MAX_FILE_BYTES = 20 * 1024 * 1024;

function safeExt(filename: string, contentType: string): string {
  const byType =
    contentType === "image/png"
      ? "png"
      : contentType === "image/webp"
        ? "webp"
        : "jpg";
  const rawExt = filename.includes(".") ? filename.split(".").pop()?.toLowerCase() ?? "" : "";
  const cleaned = rawExt.replace(/[^a-z0-9]+/g, "");
  if (cleaned === "jpg" || cleaned === "jpeg") return "jpg";
  if (cleaned === "png" || cleaned === "webp") return cleaned;
  return byType;
}

type UploadAuthBody = {
  filename?: string;
  contentType?: string;
  fileSize?: number;
};

export async function POST(req: NextRequest) {
  const correlationId = req.headers.get("x-correlation-id") ?? randomUUID();

  let body: UploadAuthBody = {};
  try {
    body = (await req.json()) as UploadAuthBody;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid upload metadata payload.", correlationId },
      { status: 400 }
    );
  }

  const filename = (body.filename ?? "").trim();
  const contentType = (body.contentType ?? "").trim().toLowerCase();
  const fileSize = Number(body.fileSize ?? 0);
  if (!filename || !contentType || !Number.isFinite(fileSize) || fileSize <= 0) {
    return NextResponse.json(
      { ok: false, error: "Missing upload metadata.", correlationId },
      { status: 400 }
    );
  }
  if (!ALLOWED_IMAGE_TYPES.has(contentType)) {
    return NextResponse.json(
      { ok: false, error: "Only PNG, JPG, and WEBP images are supported.", correlationId },
      { status: 415 }
    );
  }
  if (fileSize > MAX_FILE_BYTES) {
    return NextResponse.json(
      { ok: false, error: "Image is too large (max 20MB).", correlationId },
      { status: 413 }
    );
  }

  const supabase = getSupabaseService();
  if (!supabase) {
    return NextResponse.json(
      { ok: false, error: "Supabase upload service is not configured.", correlationId },
      { status: 500 }
    );
  }

  const bucket = process.env.SUPABASE_BLOG_IMAGES_BUCKET || "blog-images";
  const objectPath = `studio/${new Date().toISOString().slice(0, 10)}/${randomUUID()}.${safeExt(
    filename,
    contentType
  )}`;

  const signed = await supabase.storage.from(bucket).createSignedUploadUrl(objectPath);
  if (signed.error || !signed.data?.token) {
    return NextResponse.json(
      { ok: false, error: `Upload session failed: ${signed.error?.message ?? "Unknown error"}`, correlationId },
      { status: 500 }
    );
  }

  return NextResponse.json({
    ok: true,
    bucket,
    path: objectPath,
    token: signed.data.token,
    correlationId,
  });
}

