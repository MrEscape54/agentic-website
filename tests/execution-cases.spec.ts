import { test, expect } from "@playwright/test";

test("Hero cycles through all cases, holds outcomes, pauses and loops back", async ({ page }) => {
  await page.clock.install();
  await page.goto("/");
  const hero = page.locator("#execution-demo");
  for (const [label, outcome] of [["Telecom", "Plan updated"], ["Financial Services", "Card replacement initiated"], ["Retail", "Delivery rescheduled"]]) {
    await expect(hero.locator(".demo-badge")).toHaveText(label);
    for (let i = 0; i < 6; i++) await page.clock.fastForward(2700);
    await expect(hero.getByRole("heading", { name: outcome })).toBeVisible();
    await page.clock.fastForward(3000);
    await expect(hero.getByRole("heading", { name: outcome })).toBeVisible();
    if (label === "Telecom") {
      await hero.getByRole("button", { name: "Pause demo" }).click();
      await page.clock.fastForward(20000);
      await expect(hero.getByRole("heading", { name: outcome })).toBeVisible();
      await hero.getByRole("button", { name: "Resume demo" }).click();
      await page.clock.fastForward(4500);
    } else await page.clock.fastForward(1500);
  }
  await expect(hero.locator(".demo-badge")).toHaveText("Telecom");
  await expect(hero.getByRole("heading", { name: "Intent detected" })).toBeVisible();
});

test("manual Hero selection pauses and reduced motion never starts automatic cycling", async ({ page }) => {
  await page.clock.install();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const hero = page.locator("#execution-demo");
  await hero.getByRole("button", { name: "Retail", exact: true }).click();
  await page.clock.fastForward(60000);
  await expect(hero.getByRole("heading", { name: "Delivery change requested" })).toBeVisible();
  for (let i = 0; i < 6; i++) await hero.getByRole("button", { name: "Next step" }).click();
  await page.clock.fastForward(60000);
  await expect(hero.getByRole("heading", { name: "Delivery rescheduled" })).toBeVisible();
  await expect(hero.getByRole("button", { name: "Pause demo" })).toHaveCount(0);
});

test("architecture defaults to telecom and all views follow the selected case", async ({ page }) => {
  await page.goto("/");
  const work = page.locator("#platform-at-work");
  await expect(work.getByRole("button", { name: "Telecom", exact: true })).toHaveAttribute("aria-pressed", "true");
  await expect(work.getByRole("tabpanel")).toContainText("plan.change");
  await work.getByRole("button", { name: "Retail", exact: true }).click();
  await expect(work.getByRole("tabpanel")).toContainText("delivery.reschedule");
  await work.getByRole("tab", { name: "Details", exact: true }).click();
  await expect(work.getByRole("tabpanel")).toContainText("delivery date is updated");
  await work.getByRole("tab", { name: "System Logs" }).click();
  await expect(work.getByRole("tabpanel")).toContainText("New delivery date recorded");
  await expect(work.getByRole("tabpanel")).not.toContainText("card.reissue");
  await expect(work).toContainText("CONTROL · INTEGRATE · OBSERVE");
});

test("new narrative retains its order and navy backgrounds", async ({ page }) => {
  await page.goto("/");
  const sections = page.locator("main > section");
  await expect(sections.nth(1)).toContainText("Intelligence, put to work.");
  await expect(sections.nth(4)).toHaveAttribute("id", "platform-at-work");
  await expect(page.getByRole("heading", { name: /Chatbots answer/ })).toHaveCount(0);
  await expect(page.locator("#platform")).toHaveCount(0);
  for (const section of await sections.all()) {
    expect(await section.evaluate(el => getComputedStyle(el).backgroundColor)).toBe("rgb(8, 20, 38)");
  }
});

test("all Hero cases fit on mobile and expose case-specific steps", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 900 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const hero = page.locator("#execution-demo");
  for (const label of ["Telecom", "Financial Services", "Retail"]) {
    await hero.getByRole("button", { name: label, exact: true }).click();
    for (let step = 0; step < 6; step++) {
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      await hero.getByRole("button", { name: "Next step" }).click();
    }
    await hero.screenshot({ path: `test-results/mobile-hero-${label.replaceAll(" ", "-")}.png` });
  }
});
