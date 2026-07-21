import test, { expect } from "@playwright/test";

test.describe("Locators examples", () => {
	test("user facing locators", async ({ page }) => {
		page.locator("#email");
		//User facing locators
		page.getByPlaceholder("Email");
	});

	test("getByRole example", async ({ page }) => {
		await page.goto("https://thinking-tester-contact-list.herokuapp.com/");

		await expect(page.getByPlaceholder("Email")).toBeVisible();

		await expect(page.getByPlaceholder("Password")).toBeVisible();

		await expect(page.getByRole("button", { name: "Subm" })).toBeVisible();

		await page.getByPlaceholder("Email").fill("practice.user@test.com");
		await page.getByPlaceholder("Password").fill("practicePlaywright@home1");
		await page.getByRole("button", { name: "Subm" }).click();

		await expect(page).toHaveURL(/contactList/);
		await expect(page.getByRole("heading")).toHaveText("Contact List");
	});

	test("getByLabel example", async ({ page }) => {
		await page.goto("https://thinking-tester-contact-list.herokuapp.com/");

		await page.getByPlaceholder("Email").fill("practice.user@test.com");
		await page.getByPlaceholder("Password").fill("practicePlaywright@home1");

		await page.getByRole("button", { name: "Subm" }).click();
		await page.getByRole("button", { name: "Add a New Contact" }).click();
		await page.getByLabel("First Name").fill("Silvia");
		await page.getByLabel("Last Name").fill("Smith");
	});

	test("getByText example", async ({ page }) => {
		await page.goto("https://thinking-tester-contact-list.herokuapp.com/");

		await page.getByPlaceholder("Email").fill("practice.user@test.com");
		await page.getByPlaceholder("Password").fill("practicePlaywright@home1");

		//await page.getByRole("button", { name: "Subm" }).click();

		await page.locator("button").getByText("Submit").click();
		//await page.getByText("API TestUser").first().click();
		//await page.getByText("API TestU").first().click();
		await page
			.getByText(/api testuser/i)
			.first()
			.click();
	});

	test("getByTestId example", async ({ page }) => {
		await page.getByTestId("testID123").click();
	});

	test("chaining locators", async ({ page }) => {
		await page.goto("https://thinking-tester-contact-list.herokuapp.com/");

		await page.getByPlaceholder("Email").fill("practice.user@test.com");
		await page.getByPlaceholder("Password").fill("practicePlaywright@home1");

		await page.locator("button").getByText("Submit").click();
		await page.locator("tr").filter({ hasText: "Mary" }).getByRole("cell", { name: "mary@test.com" }).click();
		await page.locator("p").getByRole("button", { name: "Return to Contact list" }).click();
	});
});
