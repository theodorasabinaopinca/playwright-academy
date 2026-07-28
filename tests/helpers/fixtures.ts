import { test as base } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";
import { ContactListPage } from "../../pages/ContactListPage";

type MyFixtures = {
	loginPage: LoginPage;
	contactListPage: ContactListPage;
};

export const test = base.extend<MyFixtures>({
	loginPage: async ({ page }, use) => {
		await use(new LoginPage(page));
	},

	contactListPage: async ({ page }, use) => {
		await use(new ContactListPage(page));
	},
});

export { expect } from "@playwright/test";
