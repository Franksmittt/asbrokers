import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";

import { canAccessStaffStudio } from "@/lib/client-studio/staff-access";
import { ensureCoursePdfsBucket } from "@/lib/courses/pdf-storage";
import { COURSE_PDF_FILE_SIZE_LIMIT, isPdfUpload, sanitizePdfFileName } from "@/lib/courses/pdf";
import { getSupabaseService } from "@/lib/supabase/server";

type UploadAuthBody = {
  filename?: string;
  contentType?: string;
  fileSize?: number;
};

export async function POST(req: NextRequest) {
  const correlationId = req.headers.get("x-correlation-id") ?? randomUUID();

  if (!(await canAccessStaffStudio())) {
    return NextResponse.json(
      { ok: false, error: "Session expired - sign in again.", correlationId },
      { status: 401 }
    );
  }

  let body: UploadAuthBody = {};
  try {
    body = (await req.json()) as UploadAuthBody;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid upload metadata payload.", correlationId },
      { status: 400 }
    );
  }

  const filename = sanitizePdfFileName(body.filename ?? "");
  const contentType = (body.contentType ?? "").trim().toLowerCase();
  const fileSize = Number(body.fileSize ?? 0);
  if (!filename || !Number.isFinite(fileSize) || fileSize <= 0) {
    return NextResponse.json({ ok: false, error: "Missing upload metadata.", correlationId }, { status: 400 });
  }
  if (!isPdfUpload(contentType, filename)) {
    return NextResponse.json(
      { ok: false, error: "Only PDF files are supported.", correlationId },
      { status: 415 }
    );
  }
  if (fileSize > COURSE_PDF_FILE_SIZE_LIMIT) {
    return NextResponse.json(
      { ok: false, error: "PDF is too large (max 20MB).", correlationId },
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

  let bucket: string;
  try {
    bucket = (await ensureCoursePdfsBucket()).bucket;
  } catch (error) {
    const message = error instanceof Error && error.message ? error.message : "Storage bucket setup failed.";
    return NextResponse.json({ ok: false, error: message, correlationId }, { status: 500 });
  }

  const objectPath = `courses/${new Date().toISOString().slice(0, 10)}/${randomUUID()}.pdf`;
  const signed = await supabase.storage.from(bucket).createSignedUploadUrl(objectPath);
  if (signed.error || !signed.data?.token) {
    return NextResponse.json(
      {
        ok: false,
        error: `Upload session failed: ${signed.error?.message ?? "Unknown error"}`,
        correlationId,
      },
      { status: 500 }
    );
  }

  return NextResponse.json({
    ok: true,
    bucket,
    path: objectPath,
    token: signed.data.token,
    fileName: filename,
    correlationId,
  });
}
