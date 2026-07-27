import test, { expect } from "@playwright/test";

test.describe("Tool shop tests", () => {
	test("checkbox actions", async ({ page }) => {
		await page.goto("https://practicesoftwaretesting.com/");

		const handToolsCheckbox = page.getByLabel("Hand tools");
		await handToolsCheckbox.check();
		console.log("Checked hand tools filter");

		await handToolsCheckbox.check();

		await page.getByLabel("Hand tools").uncheck();
		console.log("Unchecked hand tools filter");

		await expect(handToolsCheckbox).not.toBeChecked();
	});

	test("select actions", async ({ page }) => {
		await page.goto("https://practicesoftwaretesting.com/contact");
		await page.getByLabel("First name").fill("john", { timeout: 50000 });
		await page.getByLabel("last name").fill("doe");
		await page.getByLabel("email").fill("john.doe@example.com");
		await page.getByLabel("Subject").selectOption("payments");
		await page.locator('[data-test="message"]').fill("This is a test message for playwright actions demos");
	});

	test("keyboard interactions", async ({ page }) => {
		await page.goto("https://practicesoftwaretesting.com/");

		await page.getByPlaceholder("Search").click();
		await page.keyboard.type("screwdriver", { delay: 100 });

		console.log("Typed with delay");
	});
});
