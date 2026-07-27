import { chromium } from "@playwright/test";

export default async () => {
	console.log("Running global setup...");

	const browser = await chromium.launch();
	const context = await browser.newContext();
	const page = await context.newPage();

	await page.goto("https://thinking-tester-contact-list.herokuapp.com/");
	await page.getByPlaceholder("Email").fill("practice.user@test.com");
	await page.getByPlaceholder("Password").fill("practicePlaywright@home1");
	await page.getByRole("button", { name: "Submit" }).click();

	await page.waitForURL("**/contactList");

	console.log("Save authentication state to: auth.json");
	await context.storageState({ path: "auth.json" });

	console.log("Authentication state saved to auth.json");

	await browser.close();
};
