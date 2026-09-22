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
- Block types: heading, text, video, calculator, image, callout, CTA
- Images: paste a URL or upload from PC (same Supabase Storage as Blog Studio)
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

## Student registration

`COURSE_STUDENT_AUTH_ENABLED` is **true**. Per course, tick **Registration required** in Course Studio (seed published course has it on).

Students use a signed cookie (`asb-course-student`), not Supabase Auth.

## Adding a calculator later

Add it to `lib/calculators/registry.ts`. Course Studio reads that list. No course-platform rebuild.

## Out of scope for v1

Paid courses, certificates, quizzes, email automation, CRM sync, conditional paths.
