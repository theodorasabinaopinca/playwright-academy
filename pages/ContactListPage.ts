import { Locator, Page } from "@playwright/test";

export class ContactListPage {
	private readonly pageHeading: Locator;
	private readonly addContactButton: Locator;
	private readonly logoutButton: Locator;
	private page: Page;

	constructor(page: Page) {
		this.page = page;
		this.pageHeading = page.getByRole("heading", { name: "Contact List" });
		this.addContactButton = page.getByRole("button", { name: "Add a New Contact" });
		this.logoutButton = page.getByRole("button", { name: "Logout" });
	}

	async goto() {
		await this.page.goto("https://thinking-tester-contact-list.herokuapp.com/contactList");
	}

	async clickAddContact() {
		await this.addContactButton.click();
	}

	get heading() {
		return this.pageHeading;
	}

	get addButton() {
		return this.addContactButton;
	}
}
