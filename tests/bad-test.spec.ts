import { test, expect } from "@playwright/test";

test("navigate to docs", async ({ page }) => {
	await page.goto("https://playwright.dev");

	// Bad: CSS selector instead of getByRole
	await page.click('a[href="/docs/intro"]');

	// Bad: Hardcoded wait
	await page.waitForTimeout(3000);

	// Bad: Non-retrying assertion for UI state
	expect(page.url()).toBe("https://playwright.dev/docs/introo");
});
