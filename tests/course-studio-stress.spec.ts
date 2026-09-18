import { expect, test, type Page } from "@playwright/test";

const YOUTUBE = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";

async function createCourse(page: Page, title: string) {
  await page.goto("/studio/courses");
  await page.getByPlaceholder("Course title").fill(title);
  await page.getByRole("button", { name: "Create" }).click();
  await page.waitForURL(/\/studio\/courses\/crs_/);
}

async function clickSave(page: Page, label: string) {
  await page.getByRole("button", { name: label }).click();
  await expect(page.getByRole("button", { name: label })).toBeEnabled({ timeout: 20_000 });
}

test.describe("Course Studio stress walkthrough", () => {
  test("Albert can create a course, save a calculator and YouTube URL, and they survive reload", async ({
    page,
  }) => {
    const stamp = Date.now();
    const title = `Stress Test Retirement Course ${stamp}`;
    await createCourse(page, title);

    await page.locator('select[name="status"]').selectOption("published");
    await page.locator('textarea[name="introduction"]').fill("Stress test introduction. Educational only.");
    await clickSave(page, "Save course");
    await expect(page.getByRole("heading", { name: title })).toBeVisible();
    await expect(page.locator("[data-course-status]")).toHaveAttribute("data-course-status", "published");
    await expect(page.locator('select[name="status"]')).toHaveValue("published");

    await page.getByPlaceholder("New lesson title").fill("Lesson 1 numbers");
    await page.getByRole("button", { name: "Add lesson" }).click();
    await page.waitForURL(/\/lessons\/lsn_/);

    await expect(page.locator('select[name="calculatorId"]')).toHaveCount(0);
    await page.getByRole("button", { name: "+ Calculator" }).click();
    const calcSelect = page.locator('select[name="calculatorId"]');
    await expect(calcSelect).toBeVisible();

    const labels = await calcSelect.locator("option").allTextContents();
    expect(labels.some((label) => /ASSET 017/i.test(label))).toBeFalsy();
    expect(labels.some((label) => /Goal Engineering/i.test(label))).toBeFalsy();
    expect(labels.some((label) => /ASSET 001/i.test(label))).toBeTruthy();
    expect(labels.some((label) => /ASSET 004/i.test(label))).toBeTruthy();

    await calcSelect.selectOption("asset-004-life-of-capital");
    await expect(page).toHaveURL(/\/lessons\/lsn_/);
    await clickSave(page, "Save calculator");
    await expect(calcSelect).toHaveValue("asset-004-life-of-capital");

    await page.reload();
    await expect(page.locator('select[name="calculatorId"]')).toHaveValue("asset-004-life-of-capital");

    await page.locator('select[name="calculatorId"]').selectOption("asset-003-retirement-premium");
    await clickSave(page, "Save calculator");
    await expect(page.locator('select[name="calculatorId"]')).toHaveValue("asset-003-retirement-premium");
    await page.reload();
    await expect(page.locator('select[name="calculatorId"]')).toHaveValue("asset-003-retirement-premium");

    await page.getByRole("button", { name: "+ Video" }).click();
    const urlField = page.locator('input[name="url"][placeholder="YouTube or Vimeo URL"]');
    await urlField.fill(YOUTUBE);
    await page.locator('input[placeholder="Video title"]').fill("Lesson video");
    const videoForm = urlField.locator("xpath=ancestor::form");
    await videoForm.getByRole("button", { name: "Save block" }).click();
    await expect(videoForm.getByRole("button", { name: "Save block" })).toBeEnabled({ timeout: 20_000 });
    await expect(urlField).toHaveValue(YOUTUBE);

    await page.reload();
    await expect(page.locator('input[name="url"][placeholder="YouTube or Vimeo URL"]')).toHaveValue(YOUTUBE);
    await expect(page.locator('select[name="calculatorId"]')).toHaveValue("asset-003-retirement-premium");

    const firstUp = page.getByRole("button", { name: "Move block up" }).first();
    const firstDown = page.getByRole("button", { name: "Move block down" }).first();
    await expect(firstUp).toBeDisabled();
    await expect(firstDown).toBeEnabled();
    await firstDown.click();
    await expect(page.getByRole("button", { name: "Move block up" }).first()).toBeEnabled();
    await page.getByRole("button", { name: "Move block up" }).nth(1).click();

    await page.locator('select[name="status"]').selectOption("published");
    await clickSave(page, "Save lesson settings");
    await expect(page.locator("[data-lesson-status]")).toHaveAttribute("data-lesson-status", "published");
    await expect(page.locator('select[name="status"]')).toHaveValue("published");

    await page.goto("/studio/courses");
    await expect(page.getByRole("link", { name: title })).toBeVisible();
    const courseRow = page.locator("li").filter({ hasText: title });
    await expect(courseRow.getByRole("button", { name: `Move ${title} up` })).toBeEnabled();
    await courseRow.getByRole("button", { name: `Move ${title} up` }).click();
    await expect(page.getByRole("link", { name: title })).toBeVisible();

    await page.goto("/learn");
    await expect(page.getByRole("heading", { name: title })).toBeVisible();
    await page.locator("li").filter({ hasText: title }).getByRole("link", { name: "View course" }).click();
    await page.getByRole("link", { name: /Start the course|Continue/ }).click();
    await expect(page.getByRole("heading", { name: "Lesson 1 numbers" })).toBeVisible();
    await expect(page.locator("iframe[title*='Retirement Premium']")).toHaveCount(1);
    await expect(page.locator(`iframe[src*="youtube-nocookie.com/embed/dQw4w9WgXcQ"]`)).toBeVisible();

    await page.getByPlaceholder("Write a short reflection").fill("The income picture has to beat the capital first.");
    await page.getByRole("button", { name: "Submit answer" }).click();
    await expect(page.getByRole("heading", { name: "Answers from this lesson" })).toBeVisible();
    await expect(page.getByText("The income picture has to beat the capital first.")).toBeVisible();
    const publicLessonUrl = page.url();

    await page.goto("/studio/courses");
    await page.getByRole("link", { name: title }).click();
    await page.getByRole("link", { name: "Edit blocks" }).click();
    await expect(page.getByRole("heading", { name: "Classroom answers" })).toBeVisible();
    await expect(page.getByText("The income picture has to beat the capital first.")).toBeVisible();
    await page.getByPlaceholder("Write a personal reply").fill("Yes — test the income against the capital.");
    await page.getByRole("button", { name: "Send reply" }).click();
    await expect(page.getByText("Yes — test the income against the capital.")).toBeVisible();

    await page.goto(publicLessonUrl.split("#")[0]);
    await expect(page.getByText("Reply from Albert")).toBeVisible();
    await expect(page.getByText("Yes — test the income against the capital.")).toBeVisible();
  });

  test("demo lesson no longer defaults to retired Asset 017", async ({ page }) => {
    await page.goto("/studio/courses/crs_retirement_vs_freedom/lessons/lsn_01_retirement_vs_freedom");
    const calcSelect = page.locator('select[name="calculatorId"]');
    await expect(calcSelect).toBeVisible();
    const labels = await calcSelect.locator("option").allTextContents();
    expect(labels.some((label) => /ASSET 017/i.test(label))).toBeFalsy();
    await expect(calcSelect).toHaveValue("asset-001-retirement-growth");
  });
});
