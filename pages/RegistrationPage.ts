import { Locator, Page } from "@playwright/test";

/**
 * Page Object for the User Registration page
 */
export class RegistrationPage {
	constructor(public page: Page) {}

	// Locators as getter properties
	get firstNameField(): Locator {
		return this.page.getByRole("textbox", { name: "First Name" });
	}

	get lastNameField(): Locator {
		return this.page.getByRole("textbox", { name: "Last Name" });
	}

	get emailField(): Locator {
		return this.page.getByRole("textbox", { name: "Email" });
	}

	get passwordField(): Locator {
		return this.page.getByRole("textbox", { name: "Password" });
	}

	get submitButton(): Locator {
		return this.page.getByRole("button", { name: "Submit" });
	}

	get cancelButton(): Locator {
		return this.page.getByRole("button", { name: "Cancel" });
	}

	get errorMessage(): Locator {
		return this.page.locator("//p[following-sibling::div]").first();
	}

	/**
	 * Navigate to the registration page
	 */
	async goto() {
		await this.page.goto(
			"https://thinking-tester-contact-list.herokuapp.com/addUser"
		);
		return this;
	}

	/**
	 * Register a new user with all required fields
	 * @param firstName - User's first name
	 * @param lastName - User's last name
	 * @param email - User's email address
	 * @param password - User's password
	 */
	async registerUser(
		firstName: string,
		lastName: string,
		email: string,
		password: string
	) {
		await this.firstNameField.fill(firstName);
		await this.lastNameField.fill(lastName);
		await this.emailField.fill(email);
		await this.passwordField.fill(password);
		await this.submitButton.click();
		return this;
	}

	/**
	 * Click the submit button without filling any fields
	 */
	async clickSubmit() {
		await this.submitButton.click();
		return this;
	}

	/**
	 * Click the cancel button to return to login page
	 */
	async clickCancel() {
		await this.cancelButton.click();
		return this;
	}

	/**
	 * Fill only specific fields for validation testing
	 * @param fields - Object containing field values to fill
	 */
	async fillFields(fields: {
		firstName?: string;
		lastName?: string;
		email?: string;
		password?: string;
	}) {
		if (fields.firstName !== undefined) {
			await this.firstNameField.fill(fields.firstName);
		}
		if (fields.lastName !== undefined) {
			await this.lastNameField.fill(fields.lastName);
		}
		if (fields.email !== undefined) {
			await this.emailField.fill(fields.email);
		}
		if (fields.password !== undefined) {
			await this.passwordField.fill(fields.password);
		}
		return this;
	}
}
