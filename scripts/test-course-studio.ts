import assert from "node:assert/strict";
import { describe, it, beforeEach } from "node:test";

import { listCourseCalculators } from "../lib/courses/calculators";
import { canMove, moveBySortOrder } from "../lib/courses/order";
import {
  addBlock,
  addLesson,
  createCourse,
  getCourseById,
  listCourses,
  reorderBlock,
  reorderCourses,
  reorderLessons,
  resetCourseStoreForTests,
  updateBlock,
} from "../lib/courses/store";

beforeEach(() => {
  resetCourseStoreForTests();
});

describe("moveBySortOrder", () => {
  it("moves an item down and reindexes 0..n-1", () => {
    const items = [
      { id: "a", sortOrder: 0 },
      { id: "b", sortOrder: 1 },
      { id: "c", sortOrder: 2 },
    ];
    const next = moveBySortOrder(items, "a", "down");
    assert.deepEqual(
      next.map((row) => row.id),
      ["b", "a", "c"]
    );
    assert.deepEqual(
      next.map((row) => row.sortOrder),
      [0, 1, 2]
    );
  });

  it("does not no-op after swapping because sortOrder was left unchanged", () => {
    const items = [
      { id: "heading", sortOrder: 0 },
      { id: "calculator", sortOrder: 1 },
      { id: "text", sortOrder: 2 },
    ];
    const next = moveBySortOrder(items, "calculator", "up");
    assert.equal(next[0]?.id, "calculator");
    assert.equal(next[1]?.id, "heading");
    const again = moveBySortOrder(next, "calculator", "up");
    assert.equal(again[0]?.id, "calculator", "already first — stay first");
  });

  it("canMove matches edges", () => {
    const items = [
      { id: "a", sortOrder: 0 },
      { id: "b", sortOrder: 1 },
    ];
    assert.equal(canMove(items, "a", "up"), false);
    assert.equal(canMove(items, "a", "down"), true);
    assert.equal(canMove(items, "b", "down"), false);
  });
});

describe("course store reorder + calculator replace", () => {
  it("reorders lessons", () => {
    const course = createCourse({ title: "Test course", slug: "test-course" });
    const first = addLesson(course.id, "Lesson A", "lesson-a");
    const second = addLesson(course.id, "Lesson B", "lesson-b");
    reorderLessons(course.id, second.id, "up");
    const ordered = [...getCourseById(course.id)!.lessons].sort((a, b) => a.sortOrder - b.sortOrder);
    assert.equal(ordered[0]?.id, second.id);
    assert.equal(ordered[1]?.id, first.id);
  });

  it("reorders blocks instead of snapping back", () => {
    const course = createCourse({ title: "Blocks", slug: "blocks-course" });
    const lesson = addLesson(course.id, "One", "one");
    addBlock(course.id, lesson.id, "calculator");
    const fresh = getCourseById(course.id)!.lessons.find((row) => row.id === lesson.id)!;
    const text = fresh.blocks.find((block) => block.type === "text")!;
    const calculator = fresh.blocks.find((block) => block.type === "calculator")!;
    reorderBlock(course.id, lesson.id, calculator.id, "up");
    const after = getCourseById(course.id)!.lessons.find((row) => row.id === lesson.id)!;
    const ordered = [...after.blocks].sort((a, b) => a.sortOrder - b.sortOrder);
    assert.equal(ordered[1]?.id, calculator.id);
    assert.equal(ordered[2]?.id, text.id);
    reorderBlock(course.id, lesson.id, calculator.id, "up");
    const again = [...getCourseById(course.id)!.lessons.find((row) => row.id === lesson.id)!.blocks].sort(
      (a, b) => a.sortOrder - b.sortOrder
    );
    assert.equal(again[0]?.id, calculator.id);
  });

  it("replaces the calculator on a block", () => {
    const course = createCourse({ title: "Calcs", slug: "calcs-course" });
    const lesson = addLesson(course.id, "One", "one");
    const block = addBlock(course.id, lesson.id, "calculator");
    updateBlock(course.id, lesson.id, block.id, {
      type: "calculator",
      calculatorId: "asset-004-life-of-capital",
    });
    const fresh = getCourseById(course.id)!.lessons.find((row) => row.id === lesson.id)!;
    const saved = fresh.blocks.find((row) => row.id === block.id);
    assert.equal(saved?.type, "calculator");
    if (saved?.type === "calculator") {
      assert.equal(saved.calculatorId, "asset-004-life-of-capital");
    }
  });

  it("reorders courses on the studio list", () => {
    const extra = createCourse({ title: "Newest", slug: "newest" });
    const before = listCourses();
    const originalIndex = before.findIndex((row) => row.id === extra.id);
    assert.ok(originalIndex > 0);
    reorderCourses(extra.id, "up");
    const after = listCourses();
    assert.equal(after[originalIndex - 1]?.id, extra.id);
  });
});

describe("course calculator library", () => {
  it("lists every staff registry calculator so Albert can pick any of them", () => {
    const options = listCourseCalculators();
    assert.ok(options.length >= 17);
    assert.ok(options.some((row) => row.id === "asset-001-retirement-growth"));
    assert.ok(options.some((row) => row.id === "asset-017-personal-goal"));
    assert.ok(options.some((row) => row.id === "asset-014-living-annuity"));
  });
});
