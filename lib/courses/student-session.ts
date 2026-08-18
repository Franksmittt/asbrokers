import { cookies } from "next/headers";
import { createHmac, randomBytes, timingSafeEqual } from "crypto";

const COOKIE_NAME = "asb-course-student";
const MAX_AGE_SEC = 60 * 60 * 24 * 180;

function getSigningSecret(): string {
  const explicit = process.env.COURSE_STUDENT_SESSION_SECRET?.trim();
  if (explicit && explicit.length >= 16) return explicit;
  const studio = process.env.CLIENT_STUDIO_SESSION_SECRET?.trim();
  if (studio && studio.length >= 16) return studio;
  return createHmac("sha256", "asbrokers-course-student").update("v1").digest("hex");
}

function sign(studentId: string): string {
  const exp = Math.floor(Date.now() / 1000) + MAX_AGE_SEC;
  const nonce = randomBytes(8).toString("hex");
  const payload = `${studentId}.${exp}.${nonce}`;
  const sig = createHmac("sha256", getSigningSecret()).update(payload).digest("hex");
  return `${payload}.${sig}`;
}

function verify(token: string): string | null {
  const parts = token.split(".");
  if (parts.length !== 4) return null;
  const [studentId, expStr, nonce, sig] = parts;
  const exp = Number.parseInt(expStr, 10);
  if (!studentId || !nonce || !Number.isFinite(exp) || Date.now() / 1000 > exp) return null;
  const payload = `${studentId}.${expStr}.${nonce}`;
  const expected = createHmac("sha256", getSigningSecret()).update(payload).digest("hex");
  try {
    if (!timingSafeEqual(Buffer.from(sig, "hex"), Buffer.from(expected, "hex"))) return null;
  } catch {
    return null;
  }
  return studentId;
}

export async function getCourseStudentId(): Promise<string | null> {
  try {
    const jar = await cookies();
    const raw = jar.get(COOKIE_NAME)?.value;
    if (!raw) return null;
    return verify(raw);
  } catch {
    return null;
  }
}

export async function setCourseStudentCookie(studentId: string): Promise<void> {
  const jar = await cookies();
  jar.set(COOKIE_NAME, sign(studentId), {
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: MAX_AGE_SEC,
  });
}

export async function clearCourseStudentCookie(): Promise<void> {
  const jar = await cookies();
  jar.set(COOKIE_NAME, "", { path: "/", maxAge: 0 });
}
