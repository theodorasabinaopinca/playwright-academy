import { test, expect } from "./helpers/fixtures";

test("pom usage", async ({ page, loginPage, contactListPage }) => {
	await loginPage.goto();

	await expect(loginPage.emailField).toBeVisible();
	await expect(loginPage.passwordField).toBeVisible();
	await expect(loginPage.submitBtn).toBeVisible();

	await loginPage.login("practice.user@test.com", "practicePlaywright@home1");

	await expect(page).toHaveURL(/contactList/);
	console.log("Navigated to contact list page");
	await expect(contactListPage.heading).toHaveText("Contact List");
	console.log("Page heading is correct");

	await contactListPage.clickAddContact();

	await expect(page.getByRole("heading", { name: "Add contact" })).toBeVisible();
	await expect(page.getByLabel("First Name")).toBeVisible();
	console.log("Add contact form is visible");

	await page.getByRole("button", { name: "Cancel" }).click();
	await expect(page.getByRole("heading", { name: "Contact List" })).toBeVisible();
	console.log("Returned to contact list");
});
