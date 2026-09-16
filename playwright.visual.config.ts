import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/visual",
  workers: 1,
  fullyParallel: false,
  use: {
    baseURL: "http://127.0.0.1:3100",
    browserName: "chromium",
    channel: "chrome",
    reducedMotion: "reduce",
    locale: "en-US",
    timezoneId: "UTC",
  },
  expect: { toHaveScreenshot: { animations: "disabled", maxDiffPixels: 0 } },
});
