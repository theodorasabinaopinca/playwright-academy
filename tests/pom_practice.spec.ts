/**
 * HOME PRACTICE - Page Object Model & Custom Fixtures
 *
 * APPLICATION: https://thinking-tester-contact-list.herokuapp.com/
 *
 * OBJECTIVE: Create Page Objects and Custom Fixtures for Contact List app
 *
 * WHAT YOU NEED TO CREATE:
 * 1. pages/AddContactPage.ts - Page Object for Add Contact form
 * 2. pages/ContactDetailsPage.ts - Page Object for Contact Details page
 * 3. tests/fixtures.ts - Custom fixtures for auto-injection
 * 4. Test that adds a contact and verifies details (in this file)
 *
 * REQUIREMENTS:
 * - Use POM principles (private locators, public getters, action methods)
 * - Use custom fixtures (no manual `new AddContactPage(page)`)
 * - Use authenticatedPage fixture (no manual login in test)
 * - Verify ALL contact details on the details page
 */

import { test, expect } from "../tests/helpers/fixtures";

// ============================================
// STEP 1: CREATE PAGE OBJECTS
// ============================================
/**
 * TODO: Create pages/AddContactPage.ts with:
 *
 * LOCATORS (private readonly):
 * - firstNameInput, lastNameInput, dobInput
 * - emailInput, phoneInput
 * - street1Input, street2Input, cityInput
 * - stateProvinceInput, postalCodeInput, countryInput
 * - submitButton, cancelButton
 *
 * METHODS:
 * - goto() - Navigate to /addContact
 * - fillContactForm(contactData) - Fill all 11 fields - contactData is the contact data object
 * - submit() - Click submit
 * - cancel() - Click cancel
 *
 * GETTERS (public):
 * - get firstName() { return this.firstNameInput; }
 * - get email() { return this.emailInput; }
 * - get submitBtn() { return this.submitButton; }
 * - (add more getters as needed for assertions)
 *
 * HINT: Use getByLabel() for form inputs
 * Example: page.getByLabel('First Name')
 */

/**
 * TODO: Create pages/ContactDetailsPage.ts with:
 *
 * LOCATORS (private readonly):
 * - contactName (heading with full name)
 * - emailText, phoneText, birthdateText
 * - addressText (combined or separate: street1, street2, city, state, postal, country)
 * - returnButton, editButton, deleteButton
 *
 * METHODS:
 * - returnToList() - Click return button
 * - editContact() - Click edit button
 * - deleteContact() - Click delete button
 *
 * GETTERS (public):
 * - get name() { return this.contactName; }
 * - get email() { return this.emailText; }
 * - get phone() { return this.phoneText; }
 * - (add more getters for all fields you need to assert)
 *
 * HINT: Contact details are displayed as TEXT, not inputs
 * Use getByText() or similar to locate them
 */

// ============================================
// STEP 2: CREATE CUSTOM FIXTURES
// ============================================
/**
 * TODO: Create or extend tests/helpers/fixtures.ts with:
 *
 * 1. Import your Page Objects:
 *    import { AddContactPage } from '../pages/AddContactPage';
 *    import { ContactDetailsPage } from '../pages/ContactDetailsPage';
 *    import { LoginPage } from '../pages/LoginPage';
 *    import { ContactListPage } from '../pages/ContactListPage';
 *
 * 2. Define fixture types:
 *    type MyFixtures = {
 *
 *    };
 *
 * 3. Extend base test:
 *    export const test = base.extend<MyFixtures>({
 *
 *    });
 *
 * 4. Re-export expect:
 *    export { expect } from '@playwright/test';
 */

// ============================================
// STEP 3: WRITE YOUR TEST
// ============================================
/**
 * TODO: Once you've created Page Objects and fixtures, update the import above to:
 * import { test, expect } from '../tests/helpers/fixtures';
 *
 * Then complete the test below.
 */

test.describe("Add Contact with POM & Fixtures", () => {
	test("authenticated user can add contact and verify details", async ({
		// TODO: Request fixtures here instead of page
		page,
	}) => {
		console.log("\n--- Adding contact with Page Objects & Custom Fixtures ---");

		// STEP 1: Navigate to Add Contact page
		// TODO: Use addContactPage.goto() or contactListPage.clickAddContact()

		// STEP 2: Fill contact form
		// TODO: Create contact data object with all 11 fields
		const contactData = {
			firstName: "Alice",
			lastName: "Johnson",
			dob: "1988-07-15",
			email: "alice.johnson@example.com",
			phone: "5551239876",
			street1: "789 Pine Street",
			street2: "Apt 5B",
			city: "Seattle",
			stateProvince: "WA",
			postalCode: "98101",
			country: "USA",
		};

		// TODO: Use addContactPage.fillContactForm(contactData)

		// STEP 3: Submit the form
		// TODO: Use addContactPage.submit()

		// STEP 4: Verify navigation back to contact list
		// TODO: Assert URL contains 'contactList'

		// STEP 5: Click on the newly added contact
		console.log("Clicking on contact: Alice Johnson");
		// TODO: Click on the contact name in the table

		// STEP 6: Verify contact details on Contact Details page
		console.log("Verifying contact details...");

		// TODO: Verify contact name is displayed

		// TODO: Verify email is displayed

		// TODO: Verify phone is displayed

		// TODO: Verify birthdate is displayed

		// TODO: Verify address fields are displayed
		// street1, street2, city, state, postal code, country
		// Hint: Use contactDetailsPage getters

		console.log("Contact added successfully!");
	});
});

/**
 * TESTING YOUR IMPLEMENTATION:
 *
 * 1. Create the Page Objects in pages/
 * 2. Create or extend tests/helpers/fixtures.ts
 * 3. Update the import at the top of this file to use your fixtures
 * 4. Complete the TODOs in the test
 * 5. Run: npx playwright test pom_practice.spec.ts
 *
 */
