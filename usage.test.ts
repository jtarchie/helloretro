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
      "--dev",
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

  const addItem = async (description: string) => {
    await expect(page.locator("#app")).not.toContainText(description);
    await page.getByPlaceholder("I'm glad that...").click();
    await page.getByPlaceholder("I'm glad that...").fill(description);
    await page.getByPlaceholder("I'm glad that...").press("Enter");
    await expect(page.locator("#app")).toContainText(description);
  };

  test("should work", async () => {
    await page.goto(`http://localhost:${PORT}`);

    const link = page.getByRole("link", { name: /Start your retro/ });
    await expect(link).toBeVisible();
    await link.click();

    await addItem("This worked perfectly.");

    await page.getByLabel("Like").click();
    await expect(page.getByLabel("Like")).toContainText("1");

    await page.getByLabel("Edit").click();
    await page.getByPlaceholder("Description").click();
    await page.getByPlaceholder("Description").fill(
      "This worked perfectly the way it was expected.",
    );
    await page.getByLabel("Update the description").click();
    await expect(page.locator("#app")).toContainText(
      "This worked perfectly the way it was expected.",
    );

    const boardID = page.url().split("/").pop();
    const markdownUrl = `http://localhost:${PORT}/retros/${boardID}/markdown`;
    const response = await fetch(markdownUrl);
    expect(await response.text()).toContain(
      `## happy\n- This worked perfectly the way it was expected.`,
    );

    await page.getByLabel("Edit").click();
    await page.getByLabel("Delete the description").click();
    await expect(page.locator("#app")).not.toContainText(
      "This worked perfectly the way it was expected.",
    );

    await addItem("Start this item.");
    await page.getByLabel("Start Discussing").click();
    await expect(page.locator("#app")).toContainText(/00:\d\d/);
  }, 5_000);
});
