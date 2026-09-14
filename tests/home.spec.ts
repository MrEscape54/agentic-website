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

test("industry examples and capability disclosures reveal their own content", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("group", { name: "Choose an industry" }).getByRole("button", { name: "Financial Services" }).click();
  await expect(page.locator("#industry-example")).toContainText("Card reissued");
  await expect(page.locator("#industry-example")).not.toContainText("Update billing");
  await page.getByRole("group", { name: "Choose an industry" }).getByRole("button", { name: "Retail", exact: false }).click();
  await expect(page.locator("#industry-example")).toContainText("Delivery rescheduled");
  await page.locator("summary").filter({ hasText: "Enterprise Platform" }).click();
  await expect(page.getByText("LLM Gateway", { exact: true })).toBeVisible();
});

test("navigation targets exist, mobile menu closes, and booking uses the provisional email", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page.getByRole("navigation", { name: "Main navigation" }).getByRole("link", { name: "Solutions" }).click();
  await expect(page).toHaveURL(/#solutions$/);
  await expect(page.getByRole("navigation", { name: "Main navigation" })).toBeHidden();
  for (const href of await page.locator('a[href^="#"]').evaluateAll(links => links.map(link => link.getAttribute("href")))) {
    expect(await page.locator(href!).count()).toBe(1);
  }
  await expect(page.locator("#book-demo").getByRole("link", { name: "Book a Demo" })).toHaveAttribute("href", "mailto:info@example.com?subject=Platform%20demo");
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
  for (const id of ["business-value", "platform-at-work", "enterprise", "industries", "integrations"]) {
    await page.locator(`#${id}`).screenshot({ path: `test-results/section-${id}.png` });
  }
  await page.setViewportSize({ width: 390, height: 844 });
  for (const id of ["platform-at-work", "integrations", "capabilities"]) {
    await page.locator(`#${id}`).screenshot({ path: `test-results/mobile-${id}.png` });
  }
});
