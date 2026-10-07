import { expect, test } from "@playwright/test";

for (const width of [390, 1440]) test(`enterprise navigation and controls work at ${width}px`, async ({ page }) => {
  await page.setViewportSize({ width, height: 1000 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/to-be");
  await page.getByRole("link", { name: "Explore enterprise controls" }).click();
  await expect(page).toHaveURL(/\/to-be\/enterprise$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Governed by your enterprise.");
  await expect.poll(() => page.locator('meta[name="robots"]').evaluateAll(tags => tags.length > 0 && tags.every(tag => tag.getAttribute("content") === "noindex, nofollow"))).toBe(true);
  const broken = await page.locator('a[href^="#"]').evaluateAll(links => links.map(link => link.getAttribute("href")!).filter(href => !document.getElementById(href.slice(1))));
  expect(broken).toEqual([]);
  await page.getByRole("navigation", { name: "Enterprise topics" }).getByRole("link", { name: /Control & protection/ }).click();
  const summary = page.locator("#identity summary");
  await summary.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("#identity details")).toHaveAttribute("open", "");
  await expect(page.locator("#identity details")).toContainText("remain authoritative");
  await page.locator("#data summary").click();
  await expect(page.locator("#data details")).toHaveAttribute("open", "");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.screenshot({ path: `test-results/enterprise-${width}.png`, fullPage: true });
  await page.getByRole("link", { name: "Follow an execution with human oversight" }).click();
  await expect(page).toHaveURL(/\/to-be\/platform#execution$/);
  await page.getByRole("link", { name: "Explore enterprise controls" }).click();
  await expect(page).toHaveURL(/\/to-be\/enterprise$/);
});
