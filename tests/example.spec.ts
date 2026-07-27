import { test, expect, chromium } from "@playwright/test";
import { GooglePage, LoginPage } from "../demos/demo_06";

test("has title", async ({}) => {
	const browser = await chromium.launch();
	const context = await browser.newContext();
	const page = await context.newPage();

	await page.goto("https://playwright.dev/");

	const title = await page.title();
	console.log(title.toUpperCase());

	// Expect a title "to contain" a substring.
	await expect(page).toHaveTitle(/Playwright/);
});

test("get started link", async ({ page }) => {
	await page.goto("https://playwright.dev/");

	// Click the get started link.
	await page.getByRole("link", { name: "Get started" }).click();

	// Expects page to have a heading with the name of Installation.
	await expect(page.getByRole("heading", { name: "Installation" })).toBeVisible();
});

test("test generics", async ({ page }) => {
	await page.goto("https://playwright.dev/");

	async function getPageTitle(): Promise<string> {
		return await page.title();
	}

	const title = await getPageTitle();
	console.log(title.toUpperCase());
	await expect(page).toHaveTitle(/Playwright/);

	async function clickGetStartedButton(): Promise<void> {
		await page.getByRole("link", { name: "Get started" }).click();
	}

	await clickGetStartedButton();
	await expect(page.getByRole("heading", { name: "Installation" })).toBeVisible();
});

test("test classes", async ({ page }) => {
	await page.goto("https://playwright.dev/");

	const loginPage = new LoginPage(page);
	console.log(loginPage.usernameField);

	const googlePage = new GooglePage(page);
	await googlePage.navigate();
	await expect(page).toHaveTitle(/Google/);
});

test("multiple fixtures", async ({ page, context, browser }) => {
	await page.goto("https:/google.com");
	console.log(`Page URL:  ${page.url()}`);

	console.log("Browser type:", browser.browserType().name());

	const page2 = await context.newPage();
	await page2.goto("https:/example.com");

	console.log("Context nr of pages: ", context.pages().length);
});
//test
