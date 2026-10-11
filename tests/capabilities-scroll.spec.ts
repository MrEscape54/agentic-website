import { test, expect } from "@playwright/test";
import { capabilityGroups } from "../src/lib/data/capabilities";

for (const [width, height] of [[1920,1080],[1366,768],[1280,720],[1024,768],[768,1024],[390,844]]) {
  test(`capability direct selection and keyboard at ${width}x${height}`, async ({ page }) => {
    await page.setViewportSize({ width, height });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    const section = page.locator("#capabilities");
    const tabs = section.getByRole("tab");
    await expect(tabs).toHaveCount(4);
    for (const [index, group] of capabilityGroups.entries()) {
      await tabs.nth(index).click();
      await expect(tabs.nth(index)).toHaveAttribute("aria-selected", "true");
      const panel = section.getByRole("tabpanel");
      await expect(panel).toHaveCount(1);
      await expect(panel).toContainText(group.description);
      for (const capability of group.modules) await expect(panel).toContainText(capability);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await expect(section.getByRole("button", { name: "Pause capabilities" })).toHaveCount(0);
    await tabs.nth(0).focus();
    await page.keyboard.press("ArrowDown");
    await expect(tabs.nth(1)).toBeFocused();
    await expect(tabs.nth(1)).toHaveAttribute("aria-selected", "true");
    await page.keyboard.press("End");
    await expect(tabs.nth(3)).toBeFocused();
    await page.keyboard.press("Home");
    await expect(tabs.nth(0)).toBeFocused();
  });
}

for (const width of [1366, 390]) {
  test(`capabilities loop every 3 seconds without scrolling at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 });
    await page.clock.install();
    await page.goto("/");
    const section = page.locator("#capabilities");
    const panels = section.locator(".capability-details");
    const tabs = section.getByRole("tab");
    await panels.scrollIntoViewIfNeeded();
    await expect(panels).toBeInViewport();
    await page.clock.runFor(100);
    const initialScroll = await page.evaluate(() => scrollY);
    for (const index of [1, 2, 3, 0]) {
      await page.clock.runFor(3000);
      await expect(tabs.nth(index)).toHaveAttribute("aria-selected", "true");
      expect(Math.abs(await page.evaluate(() => scrollY) - initialScroll)).toBeLessThanOrEqual(2);
    }
    await section.getByRole("button", { name: "Pause capabilities" }).click();
    await page.clock.runFor(6000);
    await expect(tabs.nth(0)).toHaveAttribute("aria-selected", "true");
    await section.getByRole("button", { name: "Play capabilities" }).click();
    await panels.scrollIntoViewIfNeeded();
    await page.clock.runFor(3000);
    await expect(tabs.nth(1)).toHaveAttribute("aria-selected", "true");
    await tabs.nth(2).focus();
    await tabs.nth(2).click();
    await page.clock.runFor(6000);
    await expect(tabs.nth(2)).toHaveAttribute("aria-selected", "true");
    await page.emulateMedia({ reducedMotion: "reduce" });
    await tabs.nth(2).blur();
    await page.clock.runFor(6000);
    await expect(tabs.nth(2)).toHaveAttribute("aria-selected", "true");
  });
}
