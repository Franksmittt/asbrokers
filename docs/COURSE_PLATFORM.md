# Course platform (v1 boilerplate)

Reusable educational CMS for AS Brokers. The first retirement course is a **use case**, not a hard-coded set of pages.

## Architecture

```
Course → Lessons → Content blocks
                ↘ Student progress, responses, comments, events
```

Public site: `/learn`
Course Studio: `/studio/courses` (same owner password as Blog Studio)
Student database: `/studio/courses/students`

## What v1 does

- Create / publish courses and an unlimited number of lessons
- Reorder lessons; draft or publish each lesson
- Mark one lesson as the final lesson
- Require a private written response per lesson (optional)
- **Discussion comments** on every lesson (students post freely; Albert replies)
- Display names as **first name + surname initial** (e.g. Frank S.)
- Sequential locking (optional per course)
- Block types: heading, text, video, calculator, image, PDF, callout, CTA
- Images: paste a URL or upload from PC (same Supabase Storage as Blog Studio)
- PDFs: on a lesson, add a **PDF** block, upload from PC (private `course-pdfs` bucket, max 20MB) or paste an https link. The client gets a **Download PDF** button on that lesson. The file is not public in Storage; the site streams it through `/api/studio/media`.
- Student registration (name, surname, email, POPIA consent) — **enabled** (`COURSE_STUDENT_AUTH_ENABLED`)
- Progress: started, opened, completed, course completed, offer clicked
- Configurable final-lesson offer (heading, text, button, URL)

## Engagement

1. Student registers on `/learn/[course]/register`
2. Posts comments on a lesson → appears as **Frank S.**
3. Albert opens Course Studio → lesson → **Lesson comments** → replies
4. Reply shows on `/learn` as “Reply from Albert”

Classroom answers (required lesson reflections) still work the same way and also use Frank S. labels.

## Persistence

Course Studio saves to an in-memory store, then snapshots to:

1. A JSON file (`data/course-studio-snapshot.json` locally; `/tmp` on Vercel), and
2. Postgres table `course_studio_snapshot` when `DATABASE_URL` is set.

**Production needs `DATABASE_URL`** so course edits, comments, and student records survive deploys.

## Images (PC upload)

Reuses Blog Studio’s `/api/studio/upload` → Supabase Storage. Same env as Blog Studio. No new Supabase project.

## PDFs (client download)

Albert adds a PDF block inside a lesson in Course Studio. Upload uses a signed URL (`/api/studio/upload-pdf/auth`) so the file goes straight to the private `course-pdfs` bucket and does not pass through the Next.js body limit. Apply `supabase/migrations/20261012120000_course_pdfs_bucket.sql` (or let the first upload create the bucket when the service role is set).

The lesson stores `/api/studio/media?...`. On `/learn`, the client sees the name Albert typed and a Download PDF button. That request sets `Content-Disposition: attachment`. Anyone with the unguessable link can download it, same as lesson images.

## Student registration

`COURSE_STUDENT_AUTH_ENABLED` is **true**. Per course, tick **Registration required** in Course Studio (seed published course has it on).

Students use a signed cookie (`asb-course-student`), not Supabase Auth.

## Adding a calculator later

Add it to `lib/calculators/registry.ts`. Course Studio reads that list. No course-platform rebuild.

## Out of scope for v1

Paid courses, certificates, quizzes, email automation, CRM sync, conditional paths.
