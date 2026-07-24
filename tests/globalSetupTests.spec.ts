import { test, expect } from "@playwright/test";

test("view contact list", async ({ page }) => {
	// Every test starts with login
	// await page.goto("https://thinking-tester-contact-list.herokuapp.com/");
	// await page.getByPlaceholder("Email").fill("practice.user@test.com");
	// await page.getByPlaceholder("Password").fill("practicePlaywright@home1");
	// await page.getByRole("button", { name: "Submit" }).click();

	// Verify URL updated after login
	//await expect(page).toHaveURL(/contactList/);

	await page.goto("https://thinking-tester-contact-list.herokuapp.com/contactList");

	await expect(page.getByRole("heading", { name: "Contact List" })).toBeVisible();
	await expect(page.getByRole("table")).toBeVisible();
});

test("view add contact form", async ({ page }) => {
	// Duplicate login code
	// await page.goto("https://thinking-tester-contact-list.herokuapp.com/");
	// await page.getByPlaceholder("Email").fill("practice.user@test.com");
	// await page.getByPlaceholder("Password").fill("practicePlaywright@home1");
	// await page.getByRole("button", { name: "Submit" }).click();

	// Verify URL updated after login
	//await expect(page).toHaveURL(/contactList/);
	await page.goto("https://thinking-tester-contact-list.herokuapp.com/addContact");

	await expect(page.getByPlaceholder("First Name")).toBeVisible();
});
