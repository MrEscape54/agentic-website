import { expect, test } from "@playwright/test";

test("standard execution completes, exceptions cannot bypass human review", async ({ page }) => {
  await page.goto("/platform");
  const flow = page.locator(".platform-execution");
  for (let i = 0; i < 5; i++) await flow.getByRole("button", { name: "Next step" }).click();
  await expect(flow.getByRole("status")).toContainText("Plan updated.");
  await flow.getByRole("button", { name: /Commercial exception/ }).click();
  for (let i = 0; i < 4; i++) await flow.getByRole("button", { name: "Next step" }).click();
  await expect(flow.getByRole("button", { name: "Continue execution" })).toBeDisabled();
  await flow.getByRole("button", { name: "Reject", exact: true }).click();
  await expect(flow.getByRole("status")).toContainText("Billing remains unchanged");
  await expect(flow.getByRole("button", { name: "Continue execution" })).toBeDisabled();
  await flow.getByRole("button", { name: "Restart" }).click();
  for (let i = 0; i < 4; i++) await flow.getByRole("button", { name: "Next step" }).click();
  await flow.getByRole("button", { name: "Request changes" }).click();
  await flow.getByRole("button", { name: "Prepare revised proposal" }).click();
  await expect(flow.getByRole("status")).toContainText("fee waiver has been removed");
  await expect(flow.getByRole("button", { name: "Continue execution" })).toBeDisabled();
  await flow.getByRole("button", { name: "Approve", exact: true }).click();
  await flow.getByRole("button", { name: "Continue execution" }).click();
  await flow.getByRole("button", { name: "Next step" }).click();
  await expect(flow.getByRole("status")).toContainText("Plan updated.");
  await flow.locator("summary").click();
  await expect(flow.locator(".platform-trace")).toContainText("Human approved");
  await flow.getByRole("button", { name: /Standard plan change/ }).click();
  await expect(flow.locator(".platform-trace li")).toHaveCount(1);
});

for (const width of [390, 1440]) test(`platform page is readable and linked at ${width}px`, async ({ page }) => {
  await page.setViewportSize({ width, height: 1000 });
  await page.goto("/platform");
  const broken = await page.locator('a[href^="#"]').evaluateAll(links => links.map(link => link.getAttribute("href")!).filter(href => !document.getElementById(href.slice(1))));
  expect(broken).toEqual([]);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.locator(".platform-building-blocks summary").first().click();
  await expect(page.locator(".platform-building-blocks details").first()).toHaveAttribute("open", "");
  await page.screenshot({ path: `test-results/platform-${width}.png`, fullPage: true });
  await page.locator("footer .brand").click();
  await expect(page).toHaveURL(/\/$/);
});
