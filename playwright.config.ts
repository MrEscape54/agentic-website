import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  testIgnore: "**/visual/**",
  use: { baseURL: "http://127.0.0.1:3000", browserName: "chromium", channel: "chrome", headless: true },
  webServer: { command: "npm.cmd run dev", url: "http://127.0.0.1:3000", reuseExistingServer: !process.env.CI },
});
