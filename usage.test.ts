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
  let leader: Page;
  let follower: Page;
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
    leader = await browser.newPage();
    follower = await browser.newPage();
  });

  afterAll(async () => {
    await browser?.close();

    // Kill the pocketbase server process
    serverProcess.kill();

    // Optional: Wait a bit for the server to shut down gracefully
    await new Promise((resolve) => setTimeout(resolve, 1000));
  });

  const addItem = async (description: string) => {
    await expect(leader.locator("#app")).not.toContainText(description);
    await leader.getByPlaceholder("I'm glad that...").click();
    await leader.getByPlaceholder("I'm glad that...").fill(description);
    await leader.getByPlaceholder("I'm glad that...").press("Enter");
    await expect(leader.locator("#app")).toContainText(description);
    await expect(follower.locator("#app")).toContainText(description);
  };

  const getMarkdown = async () => {
    const boardID = leader.url().split("/").pop()?.replace("?", "");
    const markdownUrl = `http://localhost:${PORT}/retros/${boardID}/markdown`;
    const response = await fetch(markdownUrl);
    const markdownContent = await response.text();

    return markdownContent;
  };

  test("should work", async () => {
    await leader.goto(`http://localhost:${PORT}`);

    const link = leader.getByRole("link", { name: /Start your retro/ });
    await expect(link).toBeVisible();
    await link.click();

    await follower.goto(leader.url());

    await addItem("This worked perfectly.");

    await leader.getByLabel("Like").click();
    await expect(leader.getByLabel("Like")).toContainText("1");

    await follower.getByLabel("Like").click();
    await expect(follower.getByLabel("Like")).toContainText("2");
    await expect(leader.getByLabel("Like")).toContainText("2");

    await leader.getByLabel("Edit").click();
    await leader.getByPlaceholder("Description").click();
    await leader.getByPlaceholder("Description").fill(
      "This worked perfectly the way it was expected.",
    );
    await leader.getByLabel("Update the description").click();
    await expect(leader.locator("#app")).toContainText(
      "This worked perfectly the way it was expected.",
    );
    await expect(follower.locator("#app")).toContainText(
      "This worked perfectly the way it was expected.",
    );

    let markdownText = await getMarkdown();
    expect(markdownText).toContain(
      `## happy\n- [ ] (2❤️) This worked perfectly the way it was expected.`,
    );

    await leader.getByLabel("Edit").click();
    await leader.getByLabel("Delete the description").click();
    await expect(leader.locator("#app")).not.toContainText(
      "This worked perfectly the way it was expected.",
    );
    await expect(follower.locator("#app")).not.toContainText(
      "This worked perfectly the way it was expected.",
    );

    await addItem("Start this item.");
    await leader.getByLabel("Start Discussing").click();
    await expect(leader.locator("#app")).toContainText(/00:\d\d/);
    await expect(follower.locator("#app")).toContainText(/00:\d\d/);

    await leader.getByLabel("Complete").click();
    markdownText = await getMarkdown();
    expect(markdownText).toContain(
      `- [x] Start this item.`,
    );

    // TODO: find some way to test confirm
    // await page.getByLabel("Delete Retro").click();
    // page.on('dialog', dialog => dialog.accept());
    // await page.getByLabel('OK').click();
    // await expect(page.locator('#app')).toContainText(/Start your retro/);
  }, 10_000);
});
