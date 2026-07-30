import { test, expect } from "./helpers/fixtures";

test.describe("User Registration", () => {
	test.beforeEach(async ({ registrationPage }) => {
		// Navigate to registration page before each test
		await registrationPage.goto();
	});

	test("should successfully register a new user with valid data", async ({
		registrationPage,
		page,
	}) => {
		// Arrange: Generate unique email to avoid conflicts
		const timestamp = Date.now();
		const testUser = {
			firstName: "John",
			lastName: "Doe",
			email: `testuser${timestamp}@example.com`,
			password: "SecurePass123!",
		};

		// Act: Register new user
		await registrationPage.registerUser(
			testUser.firstName,
			testUser.lastName,
			testUser.email,
			testUser.password
		);

		// Assert: Should redirect to contact list page after successful registration
		await expect(page).toHaveURL(/contactList/);
	});

	test("should show error when submitting empty form", async ({
		registrationPage,
		page,
	}) => {
		// Act: Submit form without filling any fields
		await registrationPage.clickSubmit();

		// Assert: Should show validation error for all required fields
		await expect(page.getByText(/Path `firstName` is required/)).toBeVisible();
		await expect(page.getByText(/Path `lastName` is required/)).toBeVisible();
		await expect(page.getByText(/Path `password` is required/)).toBeVisible();
		// User should remain on registration page
		await expect(page).toHaveURL(/addUser/);
	});

	test("should show error when email field is empty", async ({
		registrationPage,
		page,
	}) => {
		// Arrange: Fill all fields except email
		await registrationPage.fillFields({
			firstName: "Test",
			lastName: "User",
			password: "TestPass123!",
		});

		// Act: Submit form
		await registrationPage.clickSubmit();

		// Assert: Should show email validation error
		await expect(page.getByText(/email/i)).toBeVisible();
		await expect(page).toHaveURL(/addUser/);
	});

	test("should show error when email format is invalid", async ({
		registrationPage,
		page,
	}) => {
		// Arrange: Fill form with invalid email format
		await registrationPage.fillFields({
			firstName: "Test",
			lastName: "User",
			email: "invalid-email-format",
			password: "TestPass123!",
		});

		// Act: Submit form
		await registrationPage.clickSubmit();

		// Assert: Should show email validation error
		await expect(page.getByText(/Email is invalid/)).toBeVisible();
		await expect(page).toHaveURL(/addUser/);
	});

	test("should show error when first name is missing", async ({
		registrationPage,
		page,
	}) => {
		// Arrange: Fill all fields except first name
		const timestamp = Date.now();
		await registrationPage.fillFields({
			lastName: "User",
			email: `test${timestamp}@example.com`,
			password: "TestPass123!",
		});

		// Act: Submit form
		await registrationPage.clickSubmit();

		// Assert: Should show first name validation error
		await expect(page.getByText(/Path `firstName` is required/)).toBeVisible();
		await expect(page).toHaveURL(/addUser/);
	});

	test("should show error when last name is missing", async ({
		registrationPage,
		page,
	}) => {
		// Arrange: Fill all fields except last name
		const timestamp = Date.now();
		await registrationPage.fillFields({
			firstName: "Test",
			email: `test${timestamp}@example.com`,
			password: "TestPass123!",
		});

		// Act: Submit form
		await registrationPage.clickSubmit();

		// Assert: Should show last name validation error
		await expect(page.getByText(/Path `lastName` is required/)).toBeVisible();
		await expect(page).toHaveURL(/addUser/);
	});

	test("should show error when password is missing", async ({
		registrationPage,
		page,
	}) => {
		// Arrange: Fill all fields except password
		const timestamp = Date.now();
		await registrationPage.fillFields({
			firstName: "Test",
			lastName: "User",
			email: `test${timestamp}@example.com`,
		});

		// Act: Submit form
		await registrationPage.clickSubmit();

		// Assert: Should show password validation error
		await expect(page.getByText(/Path `password` is required/)).toBeVisible();
		await expect(page).toHaveURL(/addUser/);
	});

	test("should show error when registering with duplicate email", async ({
		registrationPage,
		page,
	}) => {
		// Arrange: Use the default test user email that already exists
		const existingUser = {
			firstName: "Test",
			lastName: "User",
			email: "practice.user@test.com", // This email already exists from setup
			password: "AnyPassword123!",
		};

		// Act: Attempt to register with existing email
		await registrationPage.registerUser(
			existingUser.firstName,
			existingUser.lastName,
			existingUser.email,
			existingUser.password
		);

		// Assert: Should show duplicate email error
		await expect(
			page.getByText(/Email address is already in use/)
		).toBeVisible();
		await expect(page).toHaveURL(/addUser/);
	});

	test("should return to login page when cancel button is clicked", async ({
		registrationPage,
		page,
	}) => {
		// Act: Click cancel button
		await registrationPage.clickCancel();

		// Assert: Should navigate back to login page
		await expect(page).toHaveURL(
			"https://thinking-tester-contact-list.herokuapp.com/"
		);
	});

	test("should allow registration with minimum valid data", async ({
		registrationPage,
		page,
	}) => {
		// Arrange: Create user with minimal valid data
		const timestamp = Date.now();
		const minimalUser = {
			firstName: "A",
			lastName: "B",
			email: `min${timestamp}@test.com`,
			password: "Pass1",
		};

		// Act: Register user with minimal data
		await registrationPage.registerUser(
			minimalUser.firstName,
			minimalUser.lastName,
			minimalUser.email,
			minimalUser.password
		);

		// Assert: Should successfully register
		await expect(page).toHaveURL(/contactList/);
	});

	test("should display all form fields on page load", async ({
		registrationPage,
	}) => {
		// Assert: All form elements should be visible
		await expect(registrationPage.firstNameField).toBeVisible();
		await expect(registrationPage.lastNameField).toBeVisible();
		await expect(registrationPage.emailField).toBeVisible();
		await expect(registrationPage.passwordField).toBeVisible();
		await expect(registrationPage.submitButton).toBeVisible();
		await expect(registrationPage.cancelButton).toBeVisible();
	});

	test("should have correct page title and heading", async ({
		registrationPage,
		page,
	}) => {
		// Assert: Page should have correct title and heading
		await expect(page).toHaveTitle("Add User");
		await expect(
			page.getByRole("heading", { name: "Add User" })
		).toBeVisible();
	});
});
