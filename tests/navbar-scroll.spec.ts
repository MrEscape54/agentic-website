import { test, expect, type Page } from "@playwright/test";

async function scrollTo(page: Page, y: number) {
  await page.evaluate(y => window.scrollTo({ top: y, behavior: "instant" }), y);
  await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
}

for (const [width, height] of [[1920,1080], [1440,900], [1366,768], [1280,720], [1024,768], [390,844]]) {
  test(`scroll-aware navbar at ${width}x${height}`, async ({ page }) => {
    await page.setViewportSize({ width, height });
    await page.goto("/");
    await page.mouse.move(width - 1, height - 1);
    const nav = page.locator(".site-header");
    const mainTop = await page.locator("main").evaluate(el => el.getBoundingClientRect().top + scrollY);
    await expect(nav).toHaveAttribute("data-hidden", "false");
    await scrollTo(page, 300);
    await expect(nav).toHaveAttribute("data-hidden", "true");
    await scrollTo(page, 450);
    await expect(nav).toHaveAttribute("data-hidden", "true");
    await scrollTo(page, 440);
    await expect(nav).toHaveAttribute("data-hidden", "true");
    await scrollTo(page, 422);
    await expect(nav).toHaveAttribute("data-hidden", "false");
    await scrollTo(page, 450);
    await expect(nav).toHaveAttribute("data-hidden", "true");
    await scrollTo(page, 60);
    await expect(nav).toHaveAttribute("data-hidden", "false");
    expect(await page.locator("main").evaluate(el => el.getBoundingClientRect().top + scrollY)).toBe(mainTop);
    await scrollTo(page, 400);
    await nav.locator(".brand").focus();
    await expect(nav).toHaveCSS("opacity", "1");
    await scrollTo(page, 500);
    await expect(nav).toHaveAttribute("data-hidden", "false");
    await page.locator(".hero a").first().focus();
    await scrollTo(page, 600);
    await expect(nav).toHaveAttribute("data-hidden", "true");

    const bounds = await page.locator("#capabilities").evaluate(el => ({ top: el.getBoundingClientRect().top + scrollY, height: el.getBoundingClientRect().height }));
    await scrollTo(page, bounds.top - 100);
    await scrollTo(page, bounds.top + 100);
    await expect(nav).toHaveAttribute("data-hidden", "true");
    await scrollTo(page, bounds.top + bounds.height / 2);
    await expect(nav).toHaveAttribute("data-hidden", "true");
    await scrollTo(page, bounds.top + bounds.height / 2 - 30);
    await expect(nav).toHaveAttribute("data-hidden", "false");
    await scrollTo(page, bounds.top + bounds.height);
    await expect(nav).toHaveAttribute("data-hidden", "true");
    await scrollTo(page, 0);
    await expect(nav).toHaveCSS("opacity", "1");
  });
}

test("mobile menu locks visibility and reduced motion removes animation", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const header = page.locator(".site-header");
  await page.getByRole("button", { name: "Open navigation" }).click();
  await scrollTo(page, 500);
  await expect(header).toHaveCSS("opacity", "1");
  await expect(page.getByRole("navigation", { name: "Main navigation" })).toBeVisible();
  await page.getByRole("button", { name: "Close navigation" }).click();
  await page.locator(".hero a").first().focus();
  await scrollTo(page, 700);
  await expect(header).toHaveCSS("opacity", "0");
  await expect(header).toHaveCSS("transition-duration", "0s");
  await expect(header).toHaveCSS("transform", "none");
  await scrollTo(page, 660);
  await expect(header).toHaveCSS("opacity", "1");
});
