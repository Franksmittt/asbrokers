# Course platform (v1 boilerplate)

Reusable educational CMS for AS Brokers. The first retirement course is a **use case**, not a hard-coded set of pages.

## Architecture

```
Course → Lessons → Content blocks
                ↘ Student progress, responses, events
```

Public site: `/learn`
Course Studio: `/studio/courses` (same owner password as Blog Studio)
Student database: `/studio/courses/students`

## What v1 does

- Create / publish courses and an unlimited number of lessons
- Reorder lessons; draft or publish each lesson
- Mark one lesson as the final lesson
- Require a private written response per lesson (optional)
- Sequential locking (optional per course)
- Block types: heading, text, video, calculator, image, callout, CTA
- **Images:** paste a URL **or upload from your PC** (same Supabase Storage as Blog Studio)
- Student registration (name, surname, email, POPIA consent) — **paused** while courses are authored (`COURSE_STUDENT_AUTH_ENABLED`)
- Progress: started, opened, completed, course completed, offer clicked
- Configurable final-lesson offer (heading, text, button, URL)

## What Albert still writes

The seed course is a **demo walkthrough** of “Retirement vs Financial Freedom” with teaching copy, calculators, callouts and sample students. Albert can replace any of it in Course Studio. A second course sits in Draft so the studio list is not a single-item screen.

## Persistence

Course Studio saves to an in-memory store, then snapshots to:

1. A JSON file (`data/course-studio-snapshot.json` locally; `/tmp` on Vercel), and
2. Postgres table `course_studio_snapshot` when `DATABASE_URL` is set.

**Production needs `DATABASE_URL`** so course edits and (when enabled) student records survive deploys. Vercel’s `/tmp` file alone is not durable.

Longer-term relational tables (Postgres / RLS on, no anon policies) already exist but are **not wired yet**:

- `drizzle/0007_course_platform.sql`
- `supabase/migrations/20260818120000_course_platform.sql`
- Drizzle models in `lib/db/schema.ts`

## Images (PC upload)

Course Studio reuses Blog Studio’s upload API (`/api/studio/upload` → Supabase Storage bucket `blog-images`).

Requires the same env already used for Blog Studio:

- `NEXT_PUBLIC_SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- optional `SUPABASE_BLOG_IMAGES_BUCKET`

**No new Supabase project.** If Blog Studio photo upload works, Course Studio upload works.

## Student registration (paused)

Student register, login, and the student database are **turned off** while Albert builds course content. Public `/learn` pages open without a form.

### To turn registration back on

1. Set `COURSE_STUDENT_AUTH_ENABLED = true` in `lib/courses/flags.ts`
2. In Course Studio → course settings, tick **Registration required** (and optionally sequential locking)
3. Ensure `DATABASE_URL` is set on Vercel so student records persist via the snapshot table
4. Optionally set `COURSE_STUDENT_SESSION_SECRET` (otherwise it falls back to `CLIENT_STUDIO_SESSION_SECRET`)

**You do not need a new Supabase Auth setup for students.** Registration uses a signed cookie (`asb-course-student`), not Supabase Auth. Supabase is only needed for image Storage (same as Blog) and optionally for hosting Postgres via `DATABASE_URL`.

The register form, enroll flow, and `/studio/courses/students` UI already exist — they are just gated by the flag.

## Adding a calculator later

Add it to `lib/calculators/registry.ts`. Course Studio reads that list. No course-platform rebuild.

## Out of scope for v1

Paid courses, certificates, quizzes, email automation, CRM sync, conditional paths.
