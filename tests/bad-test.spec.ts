import { test, expect } from "@playwright/test";

test("login test", async ({ page }) => {
	await page.goto("https://example.com/login");

	// Bad: CSS selector instead of getByRole
	await page.click("#loginBtn");

	// Bad: Hardcoded wait
	await page.waitForTimeout(3000);

	// Bad: Non-retrying assertion for UI state
	expect(page.url()).toBe("https://example.com/dashboard");
});
