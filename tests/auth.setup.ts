import { test as setup } from "@playwright/test";

setup("authenticate", async ({ page }) => {
	await page.goto("https://thinking-tester-contact-list.herokuapp.com/");
	await page.getByPlaceholder("Email").fill("practice.user@test.com");
	await page.getByPlaceholder("Password").fill("practicePlaywright@home1");
	await page.getByRole("button", { name: "Submit" }).click();

	await page.waitForURL("**/contactList");

	console.log("Save authentication state to: auth-project.json");
	await page.context().storageState({ path: "auth-project.json" });

	console.log("Authentication state saved to auth-project.json");
});
