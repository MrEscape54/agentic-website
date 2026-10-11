import { test, expect } from "@playwright/test";

for (const [width, height] of [[1440,900], [390,844]]) test(`omnichannel appends confirmation to the same conversation at ${width}px`, async ({ page }) => {
  await page.setViewportSize({ width, height });
  await page.goto("/");
  const section = page.locator("#omnichannel");
  await section.scrollIntoViewIfNeeded();
  await expect(section.locator(".omni-whatsapp")).toBeVisible();
  await expect(section.locator(".omni-whatsapp .omni-agent")).toHaveCSS("opacity", "1");
  await expect(section.locator(".omni-email")).toBeVisible({ timeout: 8000 });
  await expect(section.locator(".omni-thread")).toContainText("Mobile plan change");
  const originalMessages = await section.locator(".omni-whatsapp .omni-message").allTextContents();
  await section.getByRole("button", { name: "Confirm change", exact: true }).click();
  await expect(section.locator(".omni-whatsapp-final")).toHaveCSS("opacity", "1");
  const messages = section.locator(".omni-whatsapp-final .omni-message");
  await expect(messages).toHaveCount(3);
  expect((await messages.allTextContents()).slice(0, 2)).toEqual(originalMessages);
  await expect(messages.last()).toContainText("Your plan has been changed successfully. Thanks for confirming by email. Your new plan takes effect next billing cycle.");
  await expect(section).not.toContainText("Your plan was successfully updated.");
  await expect(section.locator('.omni-route [aria-current="step"]')).toContainText("WhatsApp");
  expect(await section.evaluate(el => el.querySelector(".omni-whatsapp-final")!.getBoundingClientRect().bottom <= el.querySelector(".omni-bridge")!.getBoundingClientRect().top)).toBe(true);
  await section.screenshot({ path: `test-results/omnichannel-appended-${width}.png` });
  expect(await section.evaluate(el => [el.previousElementSibling?.id, el.nextElementSibling?.id])).toEqual(["enterprise", "human-in-the-loop"]);
});

test("sequential fallback remains readable at all requested viewports", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  for (const [width, height] of [[1920,1080], [1440,900], [1366,768], [1280,720], [1024,768], [768,1024], [390,844]]) {
    await page.setViewportSize({ width, height });
    const section = page.locator("#omnichannel");
    await section.scrollIntoViewIfNeeded();
    await expect(section.locator(".omni-whatsapp")).toBeVisible();
    await expect(section.locator(".omni-email")).toBeVisible();
    await expect(section.locator(".omni-whatsapp-final")).toContainText("Your plan has been changed successfully.");
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    expect(await section.locator(".omni-email").evaluate(el => el.scrollWidth <= el.clientWidth)).toBe(true);
    await section.screenshot({ path: `test-results/omnichannel-${width}.png` });
  }
  await page.locator(".omni-confirm").focus();
  await expect(page.locator(".omni-confirm")).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator(".omni-confirm")).toHaveText("Confirmed through Email");
  await expect(page.locator(".omni-email")).not.toContainText("Plan updated");
});

test("demo moves its cursor, confirms automatically and loops", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const scene = page.locator(".omni-scene");
  await scene.scrollIntoViewIfNeeded();
  await expect(scene).toHaveAttribute("data-step", "3", { timeout: 12000 });
  await expect(scene.locator(".omni-cursor")).toBeVisible();
  await expect(scene.locator(".omni-confirm")).toHaveText("Confirmed through Email", { timeout: 4000 });
  await expect(scene).toHaveAttribute("data-step", "5", { timeout: 4000 });
  await expect(scene.locator(".omni-whatsapp-final")).toBeVisible();
  await expect(scene.locator(".omni-success-message")).toContainText("Thanks for confirming by email.");
  await expect(scene).toHaveAttribute("data-channel", "WhatsApp");
  await scene.screenshot({ path: "test-results/omnichannel-whatsapp-success.png" });
  await expect(scene).toHaveAttribute("data-step", "0", { timeout: 5000 });
  await page.getByRole("button", { name: "Pause omnichannel demo" }).click();
  await expect(scene).toHaveAttribute("data-paused", "true");
});
