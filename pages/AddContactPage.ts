import { Locator, Page } from "@playwright/test";

export class AddContactPage {
	private readonly pageHeading: Locator;
	private readonly firstNameInput: Locator;
	private readonly lastNameInput: Locator;
	private readonly emailInput: Locator;
	private readonly dateOfBirthInput: Locator;
	private readonly phoneInput: Locator;
	private readonly address1Input: Locator;
	private readonly address2Input: Locator;
	private readonly cityInput: Locator;
	private readonly stateProvinceInput: Locator;
	private readonly postalCodeInput: Locator;
	private readonly countryInput: Locator;
	private readonly submitButton: Locator;
	private readonly cancelButton: Locator;
	private page: Page;

	constructor(page: Page) {
		this.page = page;
		this.pageHeading = page.getByRole("heading", { name: "Add Contact" });
		this.firstNameInput = page.getByLabel("First Name");
		this.lastNameInput = page.getByLabel("Last Name");
		this.emailInput = page.getByLabel("Email");
		this.dateOfBirthInput = page.getByLabel("Date of Birth");
		this.phoneInput = page.getByLabel("Phone");
		this.address1Input = page.getByLabel("Address 1");
		this.address2Input = page.getByLabel("Address 2");
		this.cityInput = page.getByLabel("City");
		this.stateProvinceInput = page.getByLabel("State or Province");
		this.postalCodeInput = page.getByLabel("Postal Code");
		this.countryInput = page.getByLabel("Country");
		this.submitButton = page.getByRole("button", { name: "Submit" });
		this.cancelButton = page.getByRole("button", { name: "Cancel" });
	}

	async fillRequiredFields(firstName: string, lastName: string, email: string, phone: string, dateOfBirth: string) {
		await this.firstNameInput.fill(firstName);
		await this.lastNameInput.fill(lastName);
		await this.emailInput.fill(email);
		await this.phoneInput.fill(phone);
		await this.dateOfBirthInput.fill(dateOfBirth);
	}

	async fillAllFields(contactData: {
		firstName: string;
		lastName: string;
		email: string;
		phone: string;
		dateOfBirth: string;
		address1?: string;
		address2?: string;
		city?: string;
		stateProvince?: string;
		postalCode?: string;
		country?: string;
	}) {
		await this.firstNameInput.fill(contactData.firstName);
		await this.lastNameInput.fill(contactData.lastName);
		await this.emailInput.fill(contactData.email);
		await this.phoneInput.fill(contactData.phone);
		await this.dateOfBirthInput.fill(contactData.dateOfBirth);

		if (contactData.address1) await this.address1Input.fill(contactData.address1);
		if (contactData.address2) await this.address2Input.fill(contactData.address2);
		if (contactData.city) await this.cityInput.fill(contactData.city);
		if (contactData.stateProvince) await this.stateProvinceInput.fill(contactData.stateProvince);
		if (contactData.postalCode) await this.postalCodeInput.fill(contactData.postalCode);
		if (contactData.country) await this.countryInput.fill(contactData.country);
	}

	async submit() {
		await this.submitButton.click();
	}

	async cancel() {
		await this.cancelButton.click();
	}

	get heading() {
		return this.pageHeading;
	}

	get submitBtn() {
		return this.submitButton;
	}

	get cancelBtn() {
		return this.cancelButton;
	}
}
