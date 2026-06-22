import { test, expect } from "@playwright/test";

const VIEWPORT = { width: 1280, height: 720 };

async function stabilizePage(page: import("@playwright/test").Page) {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.addStyleTag({
    content: "[data-visual-ignore] { visibility: hidden !important; }",
  });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForLoadState("networkidle");
}

test.describe("Visual regression (Linux CI baselines)", () => {
  test.use({ viewport: VIEWPORT });

  test("homepage hero", async ({ page }) => {
    await page.goto("/");
    await stabilizePage(page);
    await expect(page).toHaveScreenshot("homepage.png", {
      maxDiffPixelRatio: 0.02,
      animations: "disabled",
      fullPage: false,
    });
  });

  test("contact conversion page", async ({ page }) => {
    await page.goto("/contact");
    await stabilizePage(page);
    await expect(page).toHaveScreenshot("contact.png", {
      maxDiffPixelRatio: 0.02,
      animations: "disabled",
      fullPage: false,
    });
  });
});
