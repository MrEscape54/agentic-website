import { test, expect } from "@playwright/test";

for (const [width, height] of [[1920,1080],[1440,900],[1366,768],[1280,720],[1024,768],[768,1024],[390,844]]) {
  test(`viewport and capability journey ${width}x${height}`, async ({ page }) => {
    await page.setViewportSize({ width, height });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    const hero = await page.locator(".hero").boundingBox();
    expect(hero!.y + hero!.height).toBeGreaterThanOrEqual(height - 1);
    const demo = await page.locator(".execution-demo").boundingBox();
    expect(demo!.y + demo!.height).toBeLessThan(hero!.y + hero!.height);
    await page.screenshot({ path: `test-results/viewport-${width}.png` });
    const section = page.locator("#capabilities");
    if (width >= 1024) {
      await expect(section).toHaveAttribute("data-horizontal", "true");
      const geometry = await section.evaluate(el => {
        const cards = el.querySelectorAll<HTMLElement>("article");
        return { top: el.getBoundingClientRect().top + scrollY, travel: cards[4].offsetLeft - cards[0].offsetLeft };
      });
      for (const index of [0,1,2,3,4,2,0,4]) {
        await page.evaluate(({top,travel,index,height}) => window.scrollTo({ top: top + height * .12 + travel * index / 4, behavior: "instant" }), {...geometry,index,height});
        await expect(section.locator("article").nth(index)).toHaveAttribute("data-active", "true");
        const card = await section.locator("article").nth(index).boundingBox();
        expect(Math.abs(card!.x + card!.width / 2 - width / 2)).toBeLessThan(2);
      }
      const stage = await section.locator(".capability-stage").boundingBox();
      expect(stage!.height).toBeLessThanOrEqual(height + 1);
      const progress = await section.locator(".capability-progress").boundingBox();
      expect(progress!.y + progress!.height).toBeLessThanOrEqual(height);
      await page.screenshot({path: `test-results/capabilities-${width}.png`});
      await page.evaluate(({top,travel,height}) => scrollTo({top: top + height * .12 + travel + height * .3, behavior: "instant"}), {...geometry,height});
      await expect(section.locator("article").last()).toHaveAttribute("data-active", "true");
      expect((await section.locator(".capability-stage").boundingBox())!.y).toBeCloseTo(0,0);
      await page.evaluate(({top,travel,height}) => scrollTo({top: top + height * .12 + travel + height * .45 + 150, behavior: "instant"}), {...geometry,height});
      expect((await section.locator(".capability-stage").boundingBox())!.y).toBeLessThan(-100);
      await page.setViewportSize({width:390,height:844});
    }
    await expect(section).toHaveAttribute("data-horizontal", "false");
    await expect(section.locator("article")).toHaveCount(5);
    await section.locator("article").last().scrollIntoViewIfNeeded();
    await expect(page.getByText("LLM Gateway", {exact:true})).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.setViewportSize({width:1440,height:900});
    await expect(section).toHaveAttribute("data-horizontal", "true");
    await page.emulateMedia({reducedMotion:"reduce"});
    await expect(section).toHaveAttribute("data-horizontal", "false");
    await expect(section.locator(".capability-track")).toHaveCSS("transform", "none");
  });
}
