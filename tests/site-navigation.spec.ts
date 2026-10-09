import { expect, test } from "@playwright/test";

test("Platform links consistently reach the platform page", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const links = page.getByRole("link", { name: /^(Platform|Explore the Platform)$/ });
  await expect(links).toHaveCount(3);
  for (const link of await links.all()) await expect(link).toHaveAttribute("href", "/platform");
  await page.getByRole("link", { name: "Explore the Platform" }).click();
  await expect(page).toHaveURL(/\/platform$/);
  await expect(page.locator("#platform-title")).toBeInViewport();
});

for (const width of [390, 1440]) {
  test(`Home layout and anchors at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("From conversation");
    await expect(page.locator('meta[name="robots"][content*="noindex"]')).toHaveCount(0);
    const broken = await page.locator('a[href^="#"]').evaluateAll(links => links.map(link => link.getAttribute("href")!).filter(href => !document.getElementById(href.slice(1))));
    expect(broken).toEqual([]);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.screenshot({ path: `test-results/home-navigation-${width}.png`, fullPage: true });
  });
}

test("main home uses the approved platform and human oversight", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".vision-banner")).toHaveCount(0);
  await expect(page.locator("#handoff")).toHaveCount(0);
  await expect(page.locator("#human-in-the-loop")).toContainText("HUMAN-IN-THE-LOOP");
  expect(await page.locator('a[href^="/to-be"]').count()).toBe(0);
});

for (const [previous, current] of [["/to-be", "/"], ["/to-be/platform", "/platform"], ["/to-be/enterprise", "/enterprise"]]) {
  test(`previous route ${previous} permanently redirects to ${current}`, async ({ request }) => {
    const response = await request.get(previous, { maxRedirects: 0 });
    expect(response.status()).toBe(308);
    expect(response.headers().location).toBe(current);
  });
}
