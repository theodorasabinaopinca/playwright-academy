import { Page } from "@playwright/test";

export class LoginPage {
	readonly page: Page;
	public usernameField: string;
	private password: string;
	protected baseURL: string;

	constructor(page: Page) {
		this.page = page;
		this.usernameField = "#username";
		this.password = "#password";
		this.baseURL = "https://example.com";
	}

	login(username: string, password: string) {
		console.log(`Loggin in user ${username}`);
	}
}

interface IUser {
	username: string;
	password: string;
	age: number;
	email?: string;
}

const testUser: IUser = {
	username: "bob",
	password: "Test123!",
	age: 25,
};

interface AdminUser extends IUser {
	permissions: string[];
}

const adminUser: AdminUser = {
	username: "bob",
	password: "Test123!",
	age: 25,
	permissions: ["read", "write"],
};

// Interfaces as class contracts

interface BasePage {
	navigate(): Promise<void>;
	isLoaded(): Promise<boolean>;
}

export class GooglePage implements BasePage {
	constructor(private page: Page) {}

	async navigate(): Promise<void> {
		await this.page.goto("https://google.com");
	}

	async isLoaded(): Promise<boolean> {
		return this.page.locator("h1").isVisible();
	}
}
