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
		await expect(page.getByRole("button", { name: "Submit" })).toBeVisible();

		await page.getByPlaceholder("Email").fill("practice.user@test.com");
		await page.getByPlaceholder("Password").fill("practicePlaywright@home1");
		await page.getByRole("button", { name: "Submit" }).click();

		await expect(page).toHaveURL(/contactList/);
		console.log("Navigated to contact list page");
		await expect(page.getByRole("heading")).toHaveText("Contact List");
		console.log("Page heading is correct");

		await page.getByRole("button", { name: "Add a New Contact" }).click();

		await expect(page.getByRole("heading", { name: "Add contact" })).toBeVisible();
		await expect(page.getByLabel("First Name")).toBeVisible();
		console.log("Add contact form is visible");

		await page.getByRole("button", { name: "Cancel" }).click();
		await expect(page.getByRole("heading", { name: "Contact List" })).toBeVisible();
		console.log("Returned to contact list");
	});

	test("@smoke getByLabel example", async ({ page }) => {
		await page.goto("https://thinking-tester-contact-list.herokuapp.com/");

		await page.getByPlaceholder("Email").fill("practice.user@test.com");

		await expect(page.getByPlaceholder("Password")).toHaveAttribute("type", "password");
		await page.getByPlaceholder("Password").fill("practicePlaywright@home1");

		await page.getByRole("button", { name: "Subm" }).click();

		//Web-first assertion
		await expect(page.getByRole("heading")).toHaveText("Contact List");

		//Non web-first assertion
		//const headingText = await page.getByRole("heading", { name: "Contact List" }).textContent();
		//expect(headingText).toBe("Contact List");

		await page.getByRole("button", { name: "Add a New Contact" }).click();

		await expect.soft(page.getByLabel("First Name")).toBeVisible();
		//await expect.soft(page.getByLabel("Last Name"), "Last name should be empty").toHaveValue("notExpectingThis");
		//await expect.soft(page.getByLabel("Email")).toHaveValue("expectedEmail");

		await page.getByLabel("First Name").fill("Silvia");
		await page.getByLabel("Last Name").fill("Smith");
		await page.getByLabel("Email").fill("silvia.smith@example.com");
		await page.getByLabel("Date of Birth").fill("1998-12-12");
		await page.getByLabel("Phone").fill("1256668822");

		await expect(page.getByLabel("First Name")).toHaveValue("Silvia");
		await expect(page.getByLabel("Last Name")).toHaveValue("Smith");
		console.log("Form inputs have correct values");

		await expect(page.getByRole("button", { name: "Submit" })).toBeEnabled();
		console.log("Submit button is enabled");
	});

	test("@smoke getByText example", async ({ page }) => {
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

	test.skip("getByTestId example", async ({ page }) => {
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
