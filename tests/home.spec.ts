import { test, expect } from "@playwright/test";

test("architecture tabs support keyboard navigation and accurate trace labels", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("tab", { name: "Execution Flow" }).focus();
  await page.keyboard.press("ArrowRight");
  await expect(page.getByRole("tab", { name: "Details" })).toBeFocused();
  await expect(page.getByRole("tabpanel")).toContainText("Real values are resolved internally");
  await page.keyboard.press("End");
  await expect(page.getByRole("tab", { name: "System Logs" })).toHaveAttribute("aria-selected", "true");
  await expect(page.getByRole("tabpanel")).toContainText("not a live system log");
  await page.keyboard.press("Home");
  await expect(page.getByRole("tabpanel")).toContainText("Action Engine");
});

test("capability groups expose their content and removed industries stays absent", async ({ page }) => {
  await page.goto("/");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.locator(".capability-card").last().scrollIntoViewIfNeeded();
  await expect(page.getByText("LLM Gateway", { exact: true })).toBeVisible();
});

test("navigation targets exist, mobile menu closes, and booking shows an honest temporary message", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page.getByRole("navigation", { name: "Main navigation" }).getByRole("link", { name: "Enterprise" }).click();
  await expect(page).toHaveURL(/#enterprise$/);
  await expect(page.getByRole("navigation", { name: "Main navigation" })).toBeHidden();
  for (const href of await page.locator('a[href^="#"]').evaluateAll(links => links.map(link => link.getAttribute("href")))) {
    expect(await page.locator(href!).count()).toBe(1);
  }
  await page.locator(".booking-placeholder summary").click();
  await expect(page.getByText("Demo booking will be available soon.")).toBeVisible();
  await expect(page.locator('a[href*="example.com"]')).toHaveCount(0);
});

test("home has no client errors and uses the locally served headline font", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  expect(await page.locator("h1").evaluate(el => getComputedStyle(el).fontFamily)).toContain("Plus Jakarta Sans Variable");
  expect(errors).toEqual([]);
  await page.setViewportSize({ width: 1440, height: 1000 });
  for (const id of ["business-value", "platform-at-work", "enterprise", "integrations"]) {
    await page.locator(`#${id}`).screenshot({ path: `test-results/section-${id}.png` });
  }
  await page.setViewportSize({ width: 390, height: 844 });
  for (const id of ["platform-at-work", "integrations", "capabilities"]) {
    await page.locator(`#${id}`).screenshot({ path: `test-results/mobile-${id}.png` });
  }
});
