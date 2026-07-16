import test, { expect, Locator } from "@playwright/test";

const LOCATORS = {
	EMAIL_INPUT: "input#email",
	PASSWORD_INPUT: "input#password",
	SUBMIT_BTN: "button#signup",
};

test.describe("Contact List login tests", () => {
	let emailInput: Locator;
	let passInput: Locator;
	let submitBtn: Locator;

/* 	test.beforeAll("Start suite", async ({ page }) => {
		
	});
	test.afterAll("End suite", async () => {
		console.log("Cleaning up login test suite");
	}); */

	test.beforeEach("Tests setup", async ({ page }) => {
		console.log("Navigating to test page...");
		await page.goto("https://thinking-tester-contact-list.herokuapp.com/");

		console.log('Initializing locators...')
		emailInput = page.locator(LOCATORS.EMAIL_INPUT);
		passInput = page.locator(LOCATORS.PASSWORD_INPUT);
		submitBtn = page.locator(LOCATORS.SUBMIT_BTN);
	});

	test("Form fields are present", async ({ page }) => {
		await expect(emailInput).toBeVisible();
		await expect(passInput).toBeVisible();
		await expect(submitBtn).toBeVisible();
	});

/* 	test.afterEach("Tests teardown", async () => {
		console.log("Tearining down...");
	}); */
});
