import { test, expect } from "./helpers/fixtures";

test.describe("Add Contact", () => {
	test("should successfully add a new contact with required fields", async ({
		page,
		contactListPage,
		addContactPage,
	}) => {
		// Navigate to contact list (user is already authenticated via global setup)
		await contactListPage.goto();
		await expect(contactListPage.heading).toBeVisible();

		// Click on Add a New Contact button
		await contactListPage.clickAddContact();

		// Verify we're on the Add Contact page
		await expect(addContactPage.heading).toBeVisible();
		await expect(page).toHaveURL(/addContact/);

		// Fill in the contact form with required fields
		const contactData = {
			firstName: "John",
			lastName: "Doe",
			email: "john.doe@example.com",
			phone: "5551234567",
			dateOfBirth: "1990-05-15",
		};

		await addContactPage.fillRequiredFields(
			contactData.firstName,
			contactData.lastName,
			contactData.email,
			contactData.phone,
			contactData.dateOfBirth
		);

		// Submit the form
		await addContactPage.submit();

		// Verify we're back on the contact list page
		await expect(page).toHaveURL(/contactList/);
		await expect(contactListPage.heading).toBeVisible();

		// Verify the new contact appears in the list
		await expect(page.getByText(`${contactData.firstName} ${contactData.lastName}`).first()).toBeVisible();
	});

	test("should successfully add a new contact with all fields", async ({
		page,
		contactListPage,
		addContactPage,
	}) => {
		// Navigate to contact list
		await contactListPage.goto();
		await expect(contactListPage.heading).toBeVisible();

		// Click on Add a New Contact button
		await contactListPage.clickAddContact();
		await expect(addContactPage.heading).toBeVisible();

		// Fill in all contact fields
		const contactData = {
			firstName: "Jane",
			lastName: "Smith",
			email: "jane.smith@example.com",
			phone: "5559876543",
			dateOfBirth: "1985-08-20",
			address1: "123 Main Street",
			address2: "Apt 4B",
			city: "New York",
			stateProvince: "NY",
			postalCode: "10001",
			country: "USA",
		};

		await addContactPage.fillAllFields(contactData);

		// Verify submit button is enabled
		await expect(addContactPage.submitBtn).toBeEnabled();

		// Submit the form
		await addContactPage.submit();

		// Verify we're back on the contact list page
		await expect(page).toHaveURL(/contactList/);

		// Verify the new contact appears in the list
		await expect(page.getByText(`${contactData.firstName} ${contactData.lastName}`).first()).toBeVisible();
	});

	test("should be able to cancel adding a contact", async ({ page, contactListPage, addContactPage }) => {
		// Navigate to contact list
		await contactListPage.goto();

		// Click on Add a New Contact button
		await contactListPage.clickAddContact();
		await expect(addContactPage.heading).toBeVisible();

		// Fill in some fields
		await addContactPage.fillRequiredFields("Test", "User", "test@example.com", "5551112222", "1995-01-01");

		// Cancel the form
		await addContactPage.cancel();

		// Verify we're back on the contact list page without adding the contact
		await expect(page).toHaveURL(/contactList/);
		await expect(contactListPage.heading).toBeVisible();

		// Verify the contact was not added
		await expect(page.getByText("Test User")).not.toBeVisible();
	});
});
