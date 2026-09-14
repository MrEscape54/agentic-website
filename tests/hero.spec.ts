import { test, expect } from "@playwright/test";

test("execution progresses, pauses, can be inspected and replayed", async ({ page }) => {
  await page.clock.install();
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("From conversationto execution.");
  await page.getByRole("button", { name: "Pause execution" }).click();
  await page.clock.fastForward(20000);
  await expect(page.getByRole("heading", { name: "Intent detected" })).toBeVisible();
  await page.getByRole("button", { name: "Inspect step 3: Protect" }).click();
  await expect(page.getByText("{DNI}", { exact: true })).toBeVisible();
  await expect(page.locator(".system-active")).toContainText("Identity");
  await page.getByRole("button", { name: "Resume execution" }).click();
  for (let i = 0; i < 4; i++) await page.clock.fastForward(2700);
  await expect(page.getByRole("heading", { name: "Plan updated" })).toBeVisible();
  await page.getByRole("button", { name: "Replay execution" }).click();
  await expect(page.getByRole("heading", { name: "Intent detected" })).toBeVisible();
  await page.getByRole("button", { name: "Inspect step 5: Act" }).click();
  await page.getByRole("button", { name: "See it in Action" }).click();
  await page.clock.fastForward(1);
  await expect(page.getByRole("heading", { name: "Intent detected" })).toBeVisible();
});

test("reduced motion starts resolved and supports manual progression", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Plan updated" })).toBeVisible();
  await page.getByRole("button", { name: "Replay execution" }).click();
  await expect(page.getByRole("button", { name: "Pause execution" })).toHaveCount(0);
  await page.getByRole("button", { name: "Next step" }).click();
  await expect(page.getByRole("heading", { name: "Context retrieved" })).toBeVisible();
  await page.keyboard.press("Tab");
  await expect(page.getByRole("button", { name: "Replay execution" })).toBeFocused();
});

for (const width of [360, 390, 768, 1024, 1440]) {
  test(`responsive layout at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 960 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await expect(page.getByRole("heading", { name: "Plan updated" })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    if (width < 961) {
      await page.getByRole("button", { name: "Open navigation" }).click();
      await expect(page.getByRole("navigation", { name: "Main navigation" })).toBeVisible();
      await page.getByRole("button", { name: "Close navigation" }).click();
      await expect(page.getByRole("navigation", { name: "Main navigation" })).toBeHidden();
    }
    await page.screenshot({ path: `test-results/hero-${width}.png`, fullPage: true });
  });
}
