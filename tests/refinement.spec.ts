import { test, expect } from "@playwright/test";

test("orchestration text remains separated across scenarios, details, tabs and live resize", async ({page}) => {
  await page.goto("/");
  await page.emulateMedia({reducedMotion:"reduce"});
  const work=page.locator("#platform-at-work");
  for(const [width,height] of [[1920,1080],[1440,900],[1366,768],[1280,720],[1024,768],[768,1024],[390,844]]) {
    await page.setViewportSize({width,height});
    for(const scenario of ["Telecom","Financial Services","Retail"]) {
      await work.getByRole("button",{name:scenario,exact:true}).click();
      for(const detail of [false,true]) {
        await expect(work.locator(".orchestration-node")).not.toContainText("+");
        if(detail) await work.getByRole("button",{name:"Orchestration Engine",exact:false}).click();
        // Measure both boxes in one frame: opening details may scroll between tool calls.
        const gap = await work.locator(".orchestration-intro").evaluate(el => {
          const heading = el.querySelector(".orchestration-node")!.getBoundingClientRect();
          const caption = el.querySelector(".orchestration-caption")!.getBoundingClientRect();
          return caption.top - heading.bottom;
        });
        expect(gap).toBeGreaterThanOrEqual(11);
        expect(await work.locator(".work-panel").evaluate(el=>el.scrollWidth <= el.clientWidth)).toBe(true);
        if(detail) await page.getByRole("button",{name:"Close component details"}).click();
      }
      await work.getByRole("tab",{name:"Details",exact:true}).click();
      await expect(work.getByRole("tabpanel")).toContainText("From protected context");
      await work.getByRole("tab",{name:"System Logs"}).click();
      await expect(work.getByRole("tabpanel")).toContainText("ILLUSTRATIVE TRACE");
      await work.getByRole("tab",{name:"Execution Flow"}).click();
    }
    await page.locator(".hero").screenshot({path:`test-results/freeze-hero-${width}.png`});
    await page.locator("#business-value").screenshot({path:`test-results/freeze-bridge-${width}.png`});
    await page.locator(".handoff-layout").screenshot({path:`test-results/freeze-handoff-${width}.png`});
    await work.screenshot({path:`test-results/refinement-work-${width}.png`});
    await page.locator("#enterprise").screenshot({path:`test-results/refinement-enterprise-${width}.png`});
    await page.locator("#integrations").screenshot({path:`test-results/refinement-integrations-${width}.png`});
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  }
  await expect(page.getByText("BUILT TO WORK TOGETHER")).toHaveCount(0);
  await expect(page.locator("#integrations .section-description")).toHaveCount(0);
  await expect(page.locator(".cta-trust")).toHaveCount(0);
  await expect(page.locator(".booking-status")).toBeHidden();
  await page.locator(".booking-placeholder summary").click();
  await expect(page.locator(".booking-status")).toBeVisible();
  await expect(page.locator(".protection-strip")).toHaveCount(0);
  await expect(page.locator("main")).not.toContainText("DNI");
  await expect(page.locator("#solutions")).toHaveCount(0);
  await expect(page.locator('a[href="#solutions"]')).toHaveCount(0);
  await expect(page.locator(".enterprise-close")).toContainText("Controlled by design.");
});
