import { spawn } from "node:child_process";
import { setTimeout as delay } from "node:timers/promises";

const url = "http://127.0.0.1:3100";
const reachable = async () => {
  try { return (await fetch(url, { signal: AbortSignal.timeout(500) })).ok; }
  catch { return false; }
};

if (await reachable()) throw new Error(`Port 3100 is already in use. Stop that server before running visual tests.`);

// Own the Next process directly so Windows cleanup does not depend on killing
// an npm/cmd process tree. Never reuse a potentially stale production server.
const server = spawn(process.execPath, ["node_modules/next/dist/bin/next", "start", "--hostname", "127.0.0.1", "--port", "3100"], { stdio: "inherit" });
const stop = () => { if (server.exitCode === null) server.kill(); };
process.on("exit", stop);
try {
  const deadline = Date.now() + 30_000;
  while (!(await reachable())) {
    if (server.exitCode !== null || Date.now() > deadline) throw new Error("Visual test server failed to start.");
    await delay(100);
  }
  const runner = spawn(process.execPath, ["node_modules/@playwright/test/cli.js", "test", "--config", "playwright.visual.config.ts", ...process.argv.slice(2)], { stdio: "inherit" });
  process.exitCode = await new Promise((resolve, reject) => {
    runner.once("error", reject);
    runner.once("exit", code => resolve(code ?? 1));
  });
} finally {
  stop();
}
