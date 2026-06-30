import { test, expect } from "@playwright/test";

test("login test", async ({ page }) => {
	await page.goto("https://example.com/login");

	// L Bad: CSS selector instead of getByRole
	await page.click("#loginBtn");

	// L Bad: Hardcoded wait
	await page.waitForTimeout(3000);

	// L Bad: Non-retrying assertion for UI state
	expect(page.url()).toBe("https://example.com/dashboard");
});
