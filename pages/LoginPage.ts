import { Locator, Page } from "@playwright/test";

export class LoginPage {
	private readonly emailInput: Locator;
	private readonly passwordInput: Locator;
	private readonly submitButton: Locator;

	constructor(private page: Page) {
		this.emailInput = page.getByPlaceholder("Email");
		this.passwordInput = page.getByPlaceholder("Password");
		this.submitButton = page.getByRole("button", { name: "Submit" });
	}

	async goto() {
		await this.page.goto("https://thinking-tester-contact-list.herokuapp.com/");
	}

	async login(email: string, password: string) {
		await this.emailInput.fill(email);
		await this.passwordInput.fill(password);
		await this.submitButton.click();
	}

	//Getters for assertions
	get emailField(): Locator {
		return this.emailInput;
	}

	get passwordField(): Locator {
		return this.passwordInput;
	}

	get submitBtn(): Locator {
		return this.submitButton;
	}
}
