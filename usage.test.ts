import { afterAll, beforeAll, describe, test } from "vitest";
import { chromium } from "playwright";
import type { Browser, Page } from "playwright";
import { expect } from "@playwright/test";
import { ChildProcess, spawn } from "child_process";
import { promises as fs } from "fs";
import os from "os";
import path from "path";

const PORT = 3001;

describe("create and use a retro", async () => {
  let serverProcess: ChildProcess;
  let browser: Browser;
  let page: Page;
  let tempDirPath: string;

  beforeAll(async () => {
    // Create a temporary directory for the pocketbase data
    tempDirPath = await fs.mkdtemp(path.join(os.tmpdir(), "pocketbase-"));

    // Start pocketbase server
    serverProcess = spawn("pocketbase", [
      "serve",
      "--publicDir=./dist/",
      "--automigrate",
      `--dir=${tempDirPath}`, // Use the temporary directory
      `--migrationsDir=./pb_migrations`,
      "--hooksDir=./pb_hooks",
      "--http",
      `0.0.0.0:${PORT}`,
    ], {
      stdio: ["inherit", "pipe", "pipe"],
      shell: true,
    });

    serverProcess.stdout?.on("data", (data) => console.log(`${data}`));
    serverProcess.stderr?.on("data", (data) => console.error(`${data}`));

    // Wait for pocketbase to initialize
    await new Promise((resolve) => setTimeout(resolve, 100)); // Adjust timeout based on how quickly your server starts

    browser = await chromium.launch({ headless: true });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser?.close();

    // Kill the pocketbase server process
    serverProcess.kill();

    // Optional: Wait a bit for the server to shut down gracefully
    await new Promise((resolve) => setTimeout(resolve, 1000));
  });

  test("should work", async () => {
    await page.goto(`http://localhost:${PORT}`);
    const button = page.getByRole("link", { name: /Start new retro/ });
    await expect(button).toBeVisible();
  }, 60_000);
});
