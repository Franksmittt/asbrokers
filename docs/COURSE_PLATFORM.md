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
- Student registration (name, surname, email, POPIA consent)
- Progress: started, opened, completed, course completed, offer clicked
- Configurable final-lesson offer (heading, text, button, URL)

## What Albert still writes

The seed course is a **demo walkthrough** of “Retirement vs Financial Freedom” with teaching copy, calculators, callouts and sample students. Albert can replace any of it in Course Studio. A second course sits in Draft so the studio list is not a single-item screen.

## Persistence

v1 runs on an in-memory store so the player and studio can be demonstrated without a migration.

Production tables (Postgres / RLS on, no anon policies) are in:

- `drizzle/0007_course_platform.sql`
- `supabase/migrations/20260818120000_course_platform.sql`
- Drizzle models in `lib/db/schema.ts`

Apply those when ready to persist across deploys. Until then, studio edits reset when the server process restarts. Student progress in a running process is cookie + memory.

## Adding a calculator later

Add it to `lib/calculators/registry.ts`. Course Studio reads that list. No course-platform rebuild.

## Out of scope for v1

Paid courses, certificates, quizzes, email automation, CRM sync, conditional paths.
