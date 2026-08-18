-- Educational course CMS. Mirrors drizzle/0007_course_platform.sql.

CREATE TABLE IF NOT EXISTS "courses" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "title" text NOT NULL,
  "slug" varchar(80) NOT NULL,
  "introduction" text NOT NULL DEFAULT '',
  "featured_image_url" text,
  "status" varchar(20) NOT NULL DEFAULT 'draft',
  "sort_order" integer NOT NULL DEFAULT 0,
  "registration_required" boolean NOT NULL DEFAULT true,
  "sequential_locking" boolean NOT NULL DEFAULT true,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "updated_at" timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS "courses_slug_uid" ON "courses" ("slug");
CREATE INDEX IF NOT EXISTS "courses_status_sort_idx" ON "courses" ("status", "sort_order");

CREATE TABLE IF NOT EXISTS "course_lessons" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "course_id" uuid NOT NULL REFERENCES "courses"("id") ON DELETE CASCADE,
  "title" text NOT NULL,
  "slug" varchar(80) NOT NULL,
  "sort_order" integer NOT NULL DEFAULT 0,
  "status" varchar(20) NOT NULL DEFAULT 'draft',
  "is_final" boolean NOT NULL DEFAULT false,
  "response_required" boolean NOT NULL DEFAULT false,
  "response_prompt" text NOT NULL DEFAULT '',
  "offer" jsonb,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "updated_at" timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS "course_lessons_course_slug_uid" ON "course_lessons" ("course_id", "slug");
CREATE INDEX IF NOT EXISTS "course_lessons_course_sort_idx" ON "course_lessons" ("course_id", "sort_order");

CREATE TABLE IF NOT EXISTS "course_lesson_blocks" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "lesson_id" uuid NOT NULL REFERENCES "course_lessons"("id") ON DELETE CASCADE,
  "type" varchar(32) NOT NULL,
  "sort_order" integer NOT NULL DEFAULT 0,
  "payload" jsonb NOT NULL DEFAULT '{}'::jsonb,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "updated_at" timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS "course_lesson_blocks_lesson_sort_idx" ON "course_lesson_blocks" ("lesson_id", "sort_order");

CREATE TABLE IF NOT EXISTS "course_students" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "first_name" text NOT NULL,
  "surname" text NOT NULL,
  "email" text NOT NULL,
  "phone" text,
  "marketing_consent" boolean NOT NULL DEFAULT false,
  "privacy_consent" boolean NOT NULL DEFAULT false,
  "created_at" timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS "course_students_email_uid" ON "course_students" ("email");
CREATE INDEX IF NOT EXISTS "course_students_created_idx" ON "course_students" ("created_at");

CREATE TABLE IF NOT EXISTS "course_enrollments" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "student_id" uuid NOT NULL REFERENCES "course_students"("id") ON DELETE CASCADE,
  "course_id" uuid NOT NULL REFERENCES "courses"("id") ON DELETE CASCADE,
  "started_at" timestamptz NOT NULL DEFAULT now(),
  "completed_at" timestamptz,
  "current_lesson_id" uuid REFERENCES "course_lessons"("id") ON DELETE SET NULL,
  "offer_clicked_at" timestamptz
);

CREATE UNIQUE INDEX IF NOT EXISTS "course_enrollments_student_course_uid" ON "course_enrollments" ("student_id", "course_id");
CREATE INDEX IF NOT EXISTS "course_enrollments_course_idx" ON "course_enrollments" ("course_id");

CREATE TABLE IF NOT EXISTS "course_lesson_progress" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "enrollment_id" uuid NOT NULL REFERENCES "course_enrollments"("id") ON DELETE CASCADE,
  "lesson_id" uuid NOT NULL REFERENCES "course_lessons"("id") ON DELETE CASCADE,
  "opened_at" timestamptz NOT NULL DEFAULT now(),
  "completed_at" timestamptz
);

CREATE UNIQUE INDEX IF NOT EXISTS "course_lesson_progress_enroll_lesson_uid" ON "course_lesson_progress" ("enrollment_id", "lesson_id");
CREATE INDEX IF NOT EXISTS "course_lesson_progress_lesson_idx" ON "course_lesson_progress" ("lesson_id");

CREATE TABLE IF NOT EXISTS "course_lesson_responses" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "enrollment_id" uuid NOT NULL REFERENCES "course_enrollments"("id") ON DELETE CASCADE,
  "lesson_id" uuid NOT NULL REFERENCES "course_lessons"("id") ON DELETE CASCADE,
  "answer" text NOT NULL,
  "submitted_at" timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS "course_lesson_responses_enroll_lesson_uid" ON "course_lesson_responses" ("enrollment_id", "lesson_id");
CREATE INDEX IF NOT EXISTS "course_lesson_responses_lesson_idx" ON "course_lesson_responses" ("lesson_id");

CREATE TABLE IF NOT EXISTS "course_events" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "student_id" uuid REFERENCES "course_students"("id") ON DELETE SET NULL,
  "course_id" uuid REFERENCES "courses"("id") ON DELETE SET NULL,
  "lesson_id" uuid REFERENCES "course_lessons"("id") ON DELETE SET NULL,
  "enrollment_id" uuid REFERENCES "course_enrollments"("id") ON DELETE SET NULL,
  "type" varchar(40) NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS "course_events_created_idx" ON "course_events" ("created_at");
CREATE INDEX IF NOT EXISTS "course_events_student_idx" ON "course_events" ("student_id");
CREATE INDEX IF NOT EXISTS "course_events_course_type_idx" ON "course_events" ("course_id", "type");

ALTER TABLE "courses" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "course_lessons" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "course_lesson_blocks" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "course_students" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "course_enrollments" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "course_lesson_progress" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "course_lesson_responses" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "course_events" ENABLE ROW LEVEL SECURITY;
