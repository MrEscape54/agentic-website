import { expect, test } from "@playwright/test";

for (const [width, height] of [[1440, 900], [1280, 720], [768, 1024], [390, 844], [320, 740]]) {
  test(`Home v1 at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    const hero = page.locator(".hero");
    await expect(hero.locator(".status")).toContainText("RESOLVED");
    await expect(hero).toHaveScreenshot(`hero-resolved-${width}.png`);
    await hero.getByRole("button", { name: "Inspect step 3: Protect" }).click();
    await expect(hero).toHaveScreenshot(`hero-protect-${width}.png`);

    const work = page.locator("#platform-at-work");
    await expect(work).toHaveScreenshot(`work-flow-${width}.png`);
    await work.getByRole("button", { name: "Orchestration Engine", exact: false }).click();
    await expect(work.locator(".flow-component-detail")).toBeVisible();
    await expect(work).toHaveScreenshot(`work-explored-${width}.png`);
    await work.getByRole("tab", { name: "Details", exact: true }).click();
    await expect(work).toHaveScreenshot(`work-details-${width}.png`);
    await work.getByRole("tab", { name: "System Logs" }).click();
    await expect(work).toHaveScreenshot(`work-logs-${width}.png`);

    // Shared CSS must also preserve the neighboring sections.
    for (const id of ["enterprise", "capabilities", "integrations"]) {
      await expect(page.locator(`#${id}`)).toHaveScreenshot(`${id}-${width}.png`);
    }
  });
}
