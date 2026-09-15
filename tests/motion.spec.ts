import { test, expect } from "@playwright/test";

test("scroll reveals scenes and preserves navigation", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("html")).toHaveClass(/motion-ready/);
  const heading = page.locator("#business-value .section-heading");
  await heading.scrollIntoViewIfNeeded();
  await expect(heading).not.toHaveClass(/reveal-pending/);
  const network = page.locator(".integration-categories");
  await network.scrollIntoViewIfNeeded();
  await expect(network).not.toHaveClass(/reveal-pending/);
  await expect.poll(() => page.locator("#integrations").evaluate(el => Number((el as HTMLElement).style.getPropertyValue("--scene-progress")))).toBeGreaterThan(0);
  await expect(page.locator(".integration-categories li")).toHaveCount(8);
  await page.locator(".back-top").click();
  await expect(page).toHaveURL(/#main$/);
});

test("reduced motion toggled at runtime removes effects and leaves content readable", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("html")).toHaveClass(/motion-ready/);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator("html")).not.toHaveClass(/motion-ready/);
  await expect(page.locator(".reveal-pending")).toHaveCount(0);
  await expect(page.locator(".reading-progress")).toBeHidden();
  await expect(page.locator(".integration-categories")).toHaveCSS("opacity", "1");
});

test("content remains visible when JavaScript is disabled", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("/");
  await expect(page.locator("#business-value .section-heading")).toHaveCSS("opacity", "1");
  await expect(page.locator(".integration-categories")).toHaveCSS("opacity", "1");
  await context.close();
});
