import { test, expect } from "@playwright/test";
import { capabilityGroups } from "../src/lib/data/capabilities";

for (const [width, height] of [[1920,1080],[1366,768],[1280,720],[1024,768],[768,1024],[390,844]]) {
  test(`capability explorer scroll and direct selection at ${width}x${height}`, async ({ page }) => {
    await page.setViewportSize({ width, height });
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
    if (width >= 1024) {
      await expect(section).toHaveAttribute("data-scroll", "true");
      const bounds = await section.evaluate(el => ({ top: el.getBoundingClientRect().top + scrollY, travel: el.clientHeight - el.querySelector(".capability-explorer-stage")!.clientHeight }));
      for (const index of [0, 1, 2, 3, 1]) {
        await page.evaluate(({top, travel, index}) => scrollTo({ top: top + travel * index / 3, behavior: "instant" }), { ...bounds, index });
        await expect(tabs.nth(index)).toHaveAttribute("aria-selected", "true");
      }
      const stage = await section.locator(".capability-explorer-stage").boundingBox();
      expect(stage!.height).toBeLessThanOrEqual(height + 1);
    }
    await page.emulateMedia({ reducedMotion: "reduce" });
    await expect(section).toHaveAttribute("data-scroll", "false");
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
