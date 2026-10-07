import { expect, test } from "@playwright/test";

test("Platform links consistently reach the platform page", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/to-be");
  const links = page.getByRole("link", { name: /^(Platform|Explore the Platform)$/ });
  await expect(links).toHaveCount(3);
  for (const link of await links.all()) await expect(link).toHaveAttribute("href", "/to-be/platform");
  await page.getByRole("link", { name: "Explore the Platform" }).click();
  await expect(page).toHaveURL(/\/to-be\/platform$/);
  await expect(page.locator("#platform-title")).toBeInViewport();
});

for (const width of [390, 1440]) {
  test(`TO-BE layout and anchors at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/to-be");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("From conversation");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex, nofollow");
    const broken = await page.locator('a[href^="#"]').evaluateAll(links => links.map(link => link.getAttribute("href")!).filter(href => !document.getElementById(href.slice(1))));
    expect(broken).toEqual([]);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.screenshot({ path: `test-results/to-be-${width}.png`, fullPage: true });
  });
}

test("AS-IS retains handoff and original hero copy", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".hero-description")).toContainText("orchestrate capabilities");
  await expect(page.locator("#handoff")).toContainText("INTELLIGENT HANDOFF");
  await expect(page.locator(".vision-banner")).toHaveCount(0);
});
