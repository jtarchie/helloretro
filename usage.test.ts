import { afterEach, beforeEach, describe, test } from "vitest";
import { chromium } from "playwright";
import type { Browser, Page } from "playwright";
import { expect } from "@playwright/test";
import { ChildProcess, spawn } from "child_process";
import { promises as fs } from "fs";
import os from "os";
import path from "path";

const PORT = 3001;

describe("create and use a retro", () => {
  let serverProcess: ChildProcess;
  let browser: Browser;
  let leader: Page;
  let follower: Page;
  let tempDirPath: string;

  beforeEach(async () => {
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

  afterEach(async () => {
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

    const link = leader.getByRole("button", { name: /Start your retro/ });
    await expect(link).toBeVisible();
    await link.click();
    await expect(leader.getByPlaceholder("I'm glad that...")).toBeVisible();

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

  test("should handle user authentication", async () => {
    // Test username registration, login, and user-created boards
    const testUsername = `user_${Date.now()}`;
    const testPassword = "securePassword123";

    // Go to the home page
    await leader.goto(`http://localhost:${PORT}`);

    // Navigate to signup page
    await leader.getByRole("link", { name: "Sign up" }).click();
    await expect(leader).toHaveURL(`http://localhost:${PORT}/signup`);

    // Fill in the signup form
    await leader.getByPlaceholder("Choose a username").fill(testUsername);
    await leader.getByPlaceholder("Create a password").fill(testPassword);
    await leader.getByPlaceholder("Confirm your password").fill(testPassword);

    // Submit the form
    await leader.getByRole("button", { name: "Sign Up" }).click();

    // After signup, user should be redirected to home and be logged in
    await expect(leader).toHaveURL(`http://localhost:${PORT}/`);

    // Verify user is logged in (avatar should be visible instead of login/signup buttons)
    await expect(leader.locator(".avatar")).toBeVisible();

    // Create a board while logged in
    await leader.getByRole("button", { name: "Start your retro" }).click();

    // Get current board URL to verify later
    await expect(leader.getByPlaceholder("I'm glad that...")).toBeVisible();
    const loggedInBoardUrl = leader.url();

    // Log out
    await leader.locator(".avatar").click();
    await leader.getByRole("link", { name: "Logout" }).click();

    // Verify user is logged out (login/signup buttons should be visible)
    await expect(leader.getByRole("link", { name: "Login" })).toBeVisible();
    await expect(leader.getByRole("link", { name: "Sign up" })).toBeVisible();

    // Login with created user
    await leader.getByRole("link", { name: "Login" }).click();
    await leader.getByPlaceholder("Enter your username").fill(testUsername);
    await leader.getByPlaceholder("Enter your password").fill(testPassword);
    await leader.getByRole("button", { name: "Login" }).click();

    // After login, user should be redirected to home and be logged in
    await expect(leader).toHaveURL(`http://localhost:${PORT}/`);
    await expect(leader.locator(".avatar")).toBeVisible();

    // Test invalid login
    await follower.goto(`http://localhost:${PORT}/login`);
    await follower.getByPlaceholder("Enter your username").fill(testUsername);
    await follower.getByPlaceholder("Enter your password").fill(
      "wrongpassword",
    );
    await follower.getByRole("button", { name: "Login" }).click();

    // Should show error message and stay on login page
    await expect(follower.locator(".alert-error")).toBeVisible();
    await expect(follower).toHaveURL(`http://localhost:${PORT}/login`);

    // Test anonymous board creation
    await follower.goto(loggedInBoardUrl);
    console.log("Follower URL:", follower.url());
    console.log("leader URL:", loggedInBoardUrl);
    await expect(follower.getByPlaceholder("I'm glad that...")).toBeVisible();
  }, 20_000);

  test("should show user's own vote as '1' when votes are hidden", async () => {
    await leader.goto(`http://localhost:${PORT}`);
    const link = leader.getByRole("button", { name: /Start your retro/ });
    await expect(link).toBeVisible();
    await link.click();
    await expect(leader.getByPlaceholder("I'm glad that...")).toBeVisible();
    await follower.goto(leader.url());

    await addItem("Local storage vote test");

    await leader.getByRole("button", { name: /Hide Votes/ }).click();

    await leader.getByLabel("Like").click();
    await expect(leader.getByLabel("Like")).toContainText("1");
    await expect(await leader.getByLabel("Like").isDisabled()).toBe(true);
    await expect(leader.getByLabel("Like")).toContainText("1");
    await expect(follower.getByLabel("Like")).toContainText("?");

    await follower.getByLabel("Like").click();
    await expect(leader.getByLabel("Like")).toContainText("1");
    await expect(follower.getByLabel("Like")).toContainText("1");
    await expect(await follower.getByLabel("Like").isDisabled()).toBe(true);
    await expect(follower.getByLabel("Like")).toContainText("1");

    await leader.getByRole("button", { name: /Show Votes/ }).click();
    await expect(leader.getByLabel("Like")).toContainText("2");
    await expect(follower.getByLabel("Like")).toContainText("2");
  }, 10_000);
});
