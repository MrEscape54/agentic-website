import { test, expect } from "@playwright/test";

for (const [width,height] of [[1920,1080],[1440,900],[1366,768],[1024,900],[390,844]]) {
  test(`choreography interaction and layout ${width}`, async ({page}) => {
    await page.setViewportSize({width,height});
    const errors: string[] = [];
    page.on("pageerror", error => errors.push(error.message));
    await page.goto("/");
    const work = page.locator("#platform-at-work");
    await work.getByRole("button", {name:"Action Engine",exact:false}).click();
    await expect(page.locator("#flow-component-detail")).toContainText("The plan change is executed in Billing.");
    await expect(page.locator("#flow-component-detail")).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(page.locator("#flow-component-detail")).toHaveCount(0);
    await expect(work.getByRole("button", {name:"Action Engine",exact:false})).toBeFocused();
    await work.getByRole("button",{name:"Retail",exact:true}).click();
    await work.getByRole("button", {name:"Action Engine",exact:false}).click();
    await expect(page.locator("#flow-component-detail")).toContainText("The delivery date is updated");
    await page.screenshot({path:`test-results/explore-${width}.png`});
    await page.getByRole("button",{name:"Close component details"}).click();
    await expect(page.locator("#solutions")).toHaveCount(0);
    await expect(page.locator(".integration-categories li")).toHaveCount(8);
    await page.locator("#integrations").screenshot({path: `test-results/integrations-${width}.png`});
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.emulateMedia({reducedMotion:"reduce"});
    await expect(page.locator(".integration-categories")).toHaveCSS("animation-name","none");
    expect(errors).toEqual([]);
  });
}
