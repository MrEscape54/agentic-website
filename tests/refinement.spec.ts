import { test, expect } from "@playwright/test";

test("orchestration text remains separated across scenarios, details, tabs and live resize", async ({page}) => {
  await page.goto("/");
  await page.emulateMedia({reducedMotion:"reduce"});
  const work=page.locator("#platform-at-work");
  for(const [width,height] of [[1920,1080],[1440,900],[1366,768],[1280,720],[1024,900],[768,1024],[390,844]]) {
    await page.setViewportSize({width,height});
    for(const scenario of ["Telecom","Financial Services","Retail"]) {
      await work.getByRole("button",{name:scenario,exact:true}).click();
      for(const detail of [false,true]) {
        if(detail) await work.getByRole("button",{name:"Orchestration Engine",exact:false}).click();
        const heading=await work.locator(".orchestration-node").boundingBox();
        const caption=await work.locator(".orchestration-caption").boundingBox();
        expect(caption!.y-heading!.y-heading!.height).toBeGreaterThanOrEqual(11);
        expect(await work.locator(".work-panel").evaluate(el=>el.scrollWidth <= el.clientWidth)).toBe(true);
        if(detail) await page.getByRole("button",{name:"Close component details"}).click();
      }
      await work.getByRole("tab",{name:"Details",exact:true}).click();
      await expect(work.getByRole("tabpanel")).toContainText("From protected context");
      await work.getByRole("tab",{name:"System Logs"}).click();
      await expect(work.getByRole("tabpanel")).toContainText("ILLUSTRATIVE TRACE");
      await work.getByRole("tab",{name:"Execution Flow"}).click();
    }
    await work.screenshot({path:`test-results/refinement-work-${width}.png`});
    await page.locator("#enterprise").screenshot({path:`test-results/refinement-enterprise-${width}.png`});
    await page.locator("#integrations").screenshot({path:`test-results/refinement-integrations-${width}.png`});
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  }
  await expect(page.locator(".protection-strip")).toHaveCount(0);
  await expect(page.locator("main")).not.toContainText("DNI");
  await expect(page.locator("#solutions")).toHaveCount(0);
  await expect(page.locator('a[href="#solutions"]')).toHaveCount(0);
  await expect(page.locator(".enterprise-close")).toContainText("Controlled by design.");
});
