import test, { expect } from "@playwright/test";

test.describe("Contact List login tests", () => {
	test.beforeAll("Start suite", async () => {
		console.log("Starting login tests");
	});

	test.afterAll("End suite", async () => {
		console.log("Cleaning up login test suite");
	});

	test.beforeEach("Tests setup", async ({ page }) => {
		console.log("Setting up...");
		await page.goto("https://thinking-tester-contact-list.herokuapp.com/");
	});

	test("test 1", async ({ browserName }) => {
		test.skip(browserName == "chromium", "This test does not run on Chromium");
		console.log("Running test 1");
	});

	test.only("test 2", async () => {
		console.log("Running test 2");
	});

	test("test 3", async ({ page }) => {
		console.log("Running test 3");
	});

	test.fail("test 4", async ({ page }) => {
		console.log("Known bug");
		await expect(page).toHaveTitle(/Playwright/);
	});

	test("test 5", async ({ browserName }) => {
		test.fail(browserName !== "chromium", "Known issue");
		console.log("Running test 5");
	});

	test.afterEach("Tests teardown", async () => {
		console.log("Tearining down...");
	});
});
