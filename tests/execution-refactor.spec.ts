import { test, expect } from "@playwright/test";

test("all architecture tabs reference a stable panel labelled by the active tab", async ({ page }) => {
  await page.goto("/");
  const work = page.locator("#platform-at-work");
  const panel = work.getByRole("tabpanel");
  const panelId = await panel.getAttribute("id");
  for (const label of ["Execution Flow", "Details", "System Logs", "Execution Flow"]) {
    const active = work.getByRole("tab", { name: label, exact: true });
    await active.click();
    await expect(panel).toHaveAttribute("id", panelId!);
    await expect(panel).toHaveAttribute("aria-labelledby", (await active.getAttribute("id"))!);
    for (const tab of await work.getByRole("tab").all()) {
      await expect(tab).toHaveAttribute("aria-controls", panelId!);
    }
    await expect(work.getByRole("tab", { selected: true })).toHaveCount(1);
  }
  await work.getByRole("tab", { name: "Execution Flow" }).press("ArrowLeft");
  await expect(work.getByRole("tab", { name: "System Logs" })).toBeFocused();
  await page.keyboard.press("ArrowRight");
  await expect(work.getByRole("tab", { name: "Execution Flow" })).toBeFocused();
});

test("scenario and motion changes cancel the previous playback timer", async ({ page }) => {
  await page.clock.install();
  await page.goto("/");
  const hero = page.locator("#execution-demo");
  await expect(hero.getByRole("button", { name: "Pause demo" })).toBeVisible();
  await page.clock.fastForward(2000);
  await hero.getByRole("button", { name: "Retail", exact: true }).click();
  await page.clock.fastForward(10000);
  await expect(hero.getByRole("heading", { name: "Delivery change requested" })).toBeVisible();
  await hero.getByRole("button", { name: "Resume demo" }).click();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(hero.getByRole("heading", { name: "Delivery rescheduled" })).toBeVisible();
  await page.clock.fastForward(60000);
  await expect(hero.locator(".demo-badge")).toHaveText("Retail");
  await expect(hero.getByRole("heading", { name: "Delivery rescheduled" })).toBeVisible();
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await expect(hero.getByRole("heading", { name: "Delivery change requested" })).toBeVisible();
  await page.clock.fastForward(2200);
  await expect(hero.getByRole("heading", { name: "Order retrieved" })).toBeVisible();
});
