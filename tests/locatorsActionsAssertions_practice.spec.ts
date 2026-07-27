/**
 * HOME PRACTICE CHALLENGES
 * User-Facing Locators, Actions & Web-First Assertions
 *
 * APPLICATION: https://thinking-tester-contact-list.herokuapp.com/
 *
 * NOTE: Each test is INDEPENDENT and creates its own data.
 */

import { test, expect } from "@playwright/test";

// Shared credentials that will be generated once and used by all tests
// These are initially undefined and will be set inside test.beforeAll
let testEmail: string;
let testPassword: string;

// ============================================
// PART 1: CONTACT LIST APPLICATION TESTS
// ============================================
/**
 * This describe block groups all tests related to the Contact List application.
 * Using describe helps organize related tests and provides better test reports.
 */
test.describe("Contact List Application Tests", () => {
	// ============================================
	// SETUP: Register User Before Contact List Tests
	// ============================================
	/**
	 * This hook runs ONCE before all tests in this describe block to register the test user.
	 * We use test.beforeAll to create shared test data that all tests in this group can use.
	 */
	test.beforeAll(async ({ browser }) => {
		// Generate unique credentials for this test run
		const timestamp = Date.now();
		testEmail = `testuser${timestamp}@example.com`;
		testPassword = "SecurePass123!";

		console.log(`\n🔑 Test Credentials for this run:`);
		console.log(`Email: ${testEmail}`);
		console.log(`Password: ${testPassword}\n`);
		console.log("🔧 SETUP: Registering test user for Contact List tests");

		// Create a new browser context for registration (isolated from test contexts)
		const context = await browser.newContext();
		const page = await context.newPage();

		// TODO: Navigate to the application home page
		await page.goto("https://thinking-tester-contact-list.herokuapp.com/");

		// TODO: Click the "Sign up" button
		await page.getByRole("button", { name: "Sign up" }).click();

		// TODO: Wait for the signup form to load
		await page.waitForURL("**/addUser");
		await expect(page.getByPlaceholder("First Name")).toBeVisible();

		// TODO: Fill out the registration form with:
		//   - First Name: "Test"
		//   - Last Name: "User"
		//   - Email: testEmail (the variable)
		//   - Password: testPassword (the variable)
		await page.getByRole("textbox", { name: "First Name" }).fill("Test");
		await page.getByRole("textbox", { name: "Last Name" }).fill("User");
		await page.getByRole("textbox", { name: "Email" }).fill(testEmail);
		await page.getByRole("textbox", { name: "Password" }).fill(testPassword);

		// TODO: Click Submit button
		await page.getByRole("button", { name: "Submit" }).click();

		// TODO: Wait for successful registration for a set timeout of 10000
		await page.waitForURL("**/contactList", { timeout: 10000 });

		console.log("✅ Test user registered successfully!\n");

		await context.close();
	});

	// ============================================
	// CHALLENGE 1: Login with Comprehensive Validation
	// ============================================
	/**
	 * SCENARIO:
	 * Test the login functionality with comprehensive validation.
	 * Verify form state BEFORE, DURING, and AFTER login.
	 *
	 * TASK:
	 * 1. Verify login form is ready:
	 *    - Email input is visible (toBeVisible)
	 *    - Password input is enabled (toBeEnabled)
	 *    - Submit button contains text "Submit" (toContainText)
	 *    - Error message is NOT visible (.not)
	 * 2. Fill login credentials
	 * 3. Submit form
	 * 4. Verify successful login (AFTER submitting):
	 *    - URL contains "contactList"
	 *    - Heading contains "Contact List"
	 *    - Logout button is visible
	 *    - Error message is still NOT visible
	 *
	 * ASSERTIONS: toBeVisible, toBeEnabled, toContainText, toHaveURL, .not
	 */

	test("Challenge 1: Login with Comprehensive Validation", async ({ page }) => {
		console.log("\n--- CHALLENGE 1: Login with Comprehensive Validation ---");

		await page.goto("https://thinking-tester-contact-list.herokuapp.com/");

		// Step 1: Verify form is ready BEFORE filling
		// TODO: Verify Email input is visible
		await expect(page.getByRole("textbox", { name: "Email" })).toBeVisible();

		// TODO: Verify Password input is enabled
		await expect(page.getByRole("textbox", { name: "Email" })).toBeVisible();

		// TODO: Verify Submit button contains text "Submit"
		await expect(page.getByRole("button", { name: "Submit" })).toContainText("Submit");

		// TODO: Verify error message is NOT visible
		await expect(page.getByText("Incorrect username or password")).not.toBeVisible();

		// Step 2: Fill login credentials
		// TODO: Fill Email with testEmail
		await page.getByRole("textbox", { name: "Email" }).fill(testEmail);

		// TODO: Fill Password with testPassword
		await page.getByRole("textbox", { name: "Password" }).fill(testPassword);

		// Step 3: Submit
		// TODO: Click Submit button
		await page.getByRole("button", { name: "Submit" }).click();

		// Step 4: Verify successful login
		// TODO: Assert URL contains "contactList"
		await expect(page.getByRole("button", { name: "Logout" })).toBeVisible();
		expect(page.url()).toContain("contactList");
		await page.waitForURL("**/contactList");

		// TODO: Assert heading contains "Contact List"
		await expect(page.getByRole("heading", { name: "Contact List" })).toContainText("Contact List");

		// TODO: Assert Logout button is visible

		// TODO: Assert error message is still NOT visible
		await expect(page.getByText("Incorrect username or password")).not.toBeVisible();

		console.log("✅ Challenge 1 completed successfully!");
	});

	// ============================================
	// CHALLENGE 2: Add Contact with Form Validation
	// ============================================
	/**
	 * SCENARIO:
	 * Add a new contact with comprehensive form validation.
	 * This test is INDEPENDENT - creates its own contact.
	 *
	 * TASK:
	 * 1. Create contactData object with all fields (firstName: "Alice", lastName: "Smith", etc.)
	 * 2. Login
	 * 3. Click "Add a New Contact"
	 * 4. Verify form fields are empty  - at least 3 fields
	 * 5. Fill all contact fields using contactData object
	 * 6. Verify filled values - at least 3 fields
	 * 7. Verify input attributes:
	 *    - Submit button has type="submit"
	 * 8. Submit and verify contact appears in list
	 * 9. Verify all table headers are visible
	 *
	 * ASSERTIONS: toBeEmpty, toHaveValue, toHaveAttribute, toBeVisible
	 */

	test("Challenge 2: Add Contact with Form Validation", async ({ page }) => {
		console.log("\n--- CHALLENGE 2: Add Contact with Form Validation ---");

		// TODO: Create contactData object with:
		//   - firstName: "Alice"
		//   - lastName: "Smith"
		//   - birthdate: "1985-03-20"
		//   - email: "alice.smith@example.com"
		//   - phone: "5559871234"
		//   - street1: "456 Oak Ave"
		//   - street2: "Suite 200"
		//   - city: "Boston"
		//   - stateProvince: "MA"
		//   - postalCode: "02101"
		//   - country: "USA"
		const contactData = {
			firstName: "Alice",
			lastName: "Smith",
			birthdate: "1985-03-20",
			email: "alice.smith@example.com",
			phone: "5559871234",
			street1: "456 Oak Ave",
			street2: "Suite 200",
			city: "Boston",
			stateProvince: "MA",
			postalCode: "02101",
			country: "USA",
		};

		// Login
		await page.goto("https://thinking-tester-contact-list.herokuapp.com/");
		await page.getByPlaceholder("Email").fill(testEmail);
		await page.getByPlaceholder("Password").fill(testPassword);
		await page.getByRole("button", { name: "Submit" }).click();

		// TODO: Click "Add a New Contact" button
		await page.getByRole("button", { name: "Add a New Contact" }).click();

		// Verify form fields are empty (at least 3)
		// TODO: Verify First Name field is empty (toBeEmpty)
		await expect(page.getByRole("textbox", { name: "First Name" })).toBeEmpty();

		// TODO: Verify Last Name field is empty
		await expect(page.getByRole("textbox", { name: "Last Name" })).toBeEmpty();

		// TODO: Verify Email field is empty
		await expect(page.getByPlaceholder("Email")).toBeEmpty();

		// TODO: Fill all 11 contact fields using contactData object
		await page.getByRole("textbox", { name: "First Name" }).fill(contactData.firstName);
		await page.getByRole("textbox", { name: "Last Name" }).fill(contactData.lastName);
		await page.getByLabel("Date of Birth").fill(contactData.birthdate);
		await page.getByPlaceholder("Email").fill(contactData.email);
		await page.getByLabel("Phone").fill(contactData.phone);
		await page.getByPlaceholder("Address 1").fill(contactData.street1);
		await page.getByPlaceholder("Address 2").fill(contactData.street2);
		await page.getByPlaceholder("City").fill(contactData.city);
		await page.getByPlaceholder("State or Province").fill(contactData.stateProvince);
		await page.getByPlaceholder("Postal Code").fill(contactData.postalCode);
		await page.getByPlaceholder("Country").fill(contactData.country);

		// Verify filled values (at least 3 fields)
		// TODO: Assert First Name has value contactData.firstName
		await expect(page.getByRole("textbox", { name: "First Name" })).toHaveValue(contactData.firstName);

		// TODO: Assert Email has value contactData.email
		await expect(page.getByPlaceholder("Email")).toHaveValue(contactData.email);

		// TODO: Assert Phone has value contactData.phone
		await expect(page.getByLabel("Phone")).toHaveValue(contactData.phone);

		// Verify input attributes
		// TODO: Assert Submit button has type="submit"
		await expect(page.getByRole("button", { name: "Submit" })).toHaveAttribute("type", "submit");

		// TODO: Click Submit button
		await page.getByRole("button", { name: "Submit" }).click();

		// TODO: Verify URL returns to contact list

		console.log("Validating Contact List Page...");
		await page.waitForURL("**/contactList");

		// TODO: Verify contact is visible using template literal for dynamic name
		await expect(
			page.getByRole("cell").filter({ hasText: `${contactData.firstName}  ${contactData.lastName}` })
		).toBeVisible();

		// TODO: Verify all table headers are visible
		await expect(page.getByRole("table").locator("thead")).toBeVisible();

		console.log("✅ Challenge 2 completed successfully!");
	});

	// ============================================
	// CHALLENGE 3: Invalid Login with Error Validation & Debugging Techniques
	// ============================================
	/**
	 * SCENARIO:
	 * Test login failure with invalid credentials and practice debugging techniques.
	 * Learn how to use Trace Viewer for troubleshooting.
	 *
	 * TASK:
	 * 1. Navigate to login page
	 * 2. Fill login form with INVALID credentials:
	 *    - Email: "invalid@example.com"
	 *    - Password: "WrongPassword123"
	 * 3. Click Submit button
	 * 4. Verify error message is visible
	 * 5. Verify error message contains expected text
	 * 6. Verify URL did NOT change (still on login page)
	 * 7. Verify we are NOT logged in:
	 *    - Contact List heading should NOT be visible
	 *
	 * DEBUGGING TECHNIQUES TO PRACTICE:
	 * - Run with trace: npx playwright test --trace on
	 * - View trace: npx playwright show-report
	 * - Inspect error message element and its text
	 *
	 * ASSERTIONS: toBeVisible, toContainText, toHaveURL, .not
	 */

	test("Challenge 3: Invalid Login with Error Validation", async ({ page }) => {
		console.log("\n--- CHALLENGE 3: Invalid Login with Error Validation ---");

		// Step 1: Navigate to login page
		// TODO: Navigate to the application home page

		// Step 2: Fill login form with INVALID credentials
		console.log("Attempting login with invalid credentials...");

		// TODO: Fill Email with "invalid@example.com"

		// TODO: Fill Password with "WrongPassword123"

		// TODO: Click Submit button

		// Step 3: Verify error message is visible
		// TODO: Assert error message element is visible

		// Step 4: Verify error message contains expected text
		// TODO: Assert error message contains "Incorrect username or password"
		// Hint: Use toContainText for partial text matching

		// Step 5: Verify URL did NOT change (still on login page)
		// TODO: Assert URL is still the home page

		// Step 6: Verify we are NOT logged in
		// TODO: Assert 'Logout' button is NOT visible

		console.log("✅ Challenge 3 completed successfully!");
	});
});

// ============================================
// CHALLENGE 4: Todo List with Checkbox Validation
// ============================================
/**
 * SCENARIO:
 * Manage a todo list by adding items and using checkboxes to mark them complete/incomplete.
 * Verify checkbox states and todo item statuses.
 *
 * TASK:
 * 1. Navigate to https://demo.playwright.dev/todomvc/
 * 2. Add 3 todo items to the list
 * 3. Verify all checkboxes are NOT checked initially
 * 4. Check the first todo item's checkbox to mark it complete
 * 5. Verify the checkbox IS checked
 * 6. Verify the todo item has "completed" class or styling
 * 7. Check the second todo item's checkbox
 * 8. Verify both checkboxes are checked
 * 9. Uncheck the first checkbox
 * 10. Verify first checkbox is NOT checked anymore
 * 11. Use soft assertions to verify:
 *     - Second checkbox is still checked
 *     - First todo item is NOT completed
 *     - Second todo item IS completed
 *     - Third todo item is NOT completed
 *
 * ASSERTIONS: toBeChecked, .not.toBeChecked, toBeVisible, toHaveClass, expect.soft()
 */

test("Challenge 4: Todo List with Checkbox Validation", async ({ page }) => {
	console.log("\n--- CHALLENGE 4: Todo List with Checkbox Validation ---");

	// Step 1: Navigate to TodoMVC app
	// TODO: Navigate to https://demo.playwright.dev/todomvc/

	// Step 2: Add 3 todo items to the list
	// TODO: Find the input field and add 3 todos
	// Hint: Use getByPlaceholder("What needs to be done?")
	// Hint: Fill in text and press Enter to add each todo

	// Step 3: Verify all checkboxes are NOT checked initially
	// TODO: Use page.locator() to find ONLY todo item checkboxes
	// Note: This avoids selecting the "toggle-all" checkbox at the top
	// TODO: Verify the first checkbox is NOT checked

	// Step 4: Check the first todo item's checkbox
	// TODO: Check the first checkbox
	// Hint: Use .nth(0)

	// Step 5: Verify the checkbox IS checked
	// TODO: Assert the first checkbox is checked

	// Step 6: Verify the todo item has "completed" status
	// TODO: Find todo items using CSS locator
	// TODO: Verify the first todo has "completed" class

	// Step 7: Check the second todo item's checkbox
	// TODO: Check the second checkbox

	// Step 8: Verify both checkboxes are checked
	// TODO: Assert first checkbox is checked
	// TODO: Assert second checkbox is checked

	// Step 9: Uncheck the first checkbox
	// TODO: Uncheck the first checkbox

	// Step 10: Verify first checkbox is NOT checked anymore
	// TODO: Assert first checkbox is NOT checked

	// Step 11: Use soft assertions for final validation
	// TODO: Use expect.soft() to verify second checkbox is still checked

	// TODO: Use expect.soft() to verify first todo does NOT have "completed" class

	// TODO: Use expect.soft() to verify second todo has "completed" class

	// TODO: Use expect.soft() to verify third todo does NOT have "completed" class

	console.log("✅ Challenge 4 completed successfully!");
	console.log("📊 All soft assertions collected");
});

// ============================================
// CHALLENGE 5: Contact Form with Select Field Validation
// ============================================
/**
 * SCENARIO:
 * Submit a contact form with dropdown/select field interactions.
 * Verify select field options and selections.
 *
 * TASK:
 * 1. Navigate to https://practicesoftwaretesting.com/contact
 * 2. Fill out basic contact information
 * 3. Verify the Subject dropdown is visible
 * 4. Select an option from the Subject dropdown (use selectOption)
 * 5. Verify the selected value
 * 6. Try selecting different options and verify each selection
 * 7. Fill remaining required fields
 * 8. Use soft assertions to verify:
 *    - All required fields are filled
 *    - Send button is enabled
 *    - Selected dropdown value is correct
 * 9. Submit the form
 *
 * ASSERTIONS: toBeVisible, toHaveValue, expect.soft(), toBeEnabled
 */

test("Challenge 5: Contact Form with Select Field Validation", async ({ page }) => {
	console.log("\n--- CHALLENGE 5: Contact Form with Select Field Validation ---");

	// Step 1: Navigate to contact page
	// TODO: Navigate to https://practicesoftwaretesting.com/contact

	// Step 2: Fill basic contact information
	// TODO: Fill First Name with "Jane"

	// TODO: Fill Last Name with "Smith"

	// TODO: Fill Email with "jane.smith@example.com"

	// Step 3: Verify Subject dropdown is visible
	// TODO: Locate the Subject select field and verify it's visible
	// Hint: Look for a select element or dropdown

	// Step 4: Select an option from dropdown
	// TODO: Select an option from the Subject dropdown
	// Hint: Use .selectOption('value') or .selectOption({ label: 'Text' })
	// Hint: You may need to explore the page to see available options

	// Step 5: Verify the selected value
	// TODO: Verify the dropdown has the expected value

	// Step 6: Try selecting a different option
	// TODO: Select a different option from the dropdown

	// TODO: Verify the new selection

	// Step 7: Fill remaining fields
	// TODO: Fill the message textarea
	// Hint: Message should be longer than 50 characters

	// Step 8: Use soft assertions for comprehensive validation
	// TODO: Use expect.soft() to verify First Name is filled

	// TODO: Use expect.soft() to verify Email is filled

	// TODO: Use expect.soft() to verify Subject dropdown has correct value

	// TODO: Use expect.soft() to verify Send button is enabled

	// Step 9: Submit the form
	// TODO: Click Send button

	// TODO: Verify success message appears
	// Hint: Look for text "Thanks for your message! We will contact you shortly."

	console.log("✅ Challenge 5 completed successfully!");
	console.log("📊 All soft assertions collected");
});

// ============================================
// SUCCESS MESSAGE
// ============================================
