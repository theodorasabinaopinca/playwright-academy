import { test as base } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";
import { ContactListPage } from "../../pages/ContactListPage";
import { AddContactPage } from "../../pages/AddContactPage";
import { RegistrationPage } from "../../pages/RegistrationPage";

type MyFixtures = {
	loginPage: LoginPage;
	contactListPage: ContactListPage;
	addContactPage: AddContactPage;
	registrationPage: RegistrationPage;
};

export const test = base.extend<MyFixtures>({
	loginPage: async ({ page }, use) => {
		await use(new LoginPage(page));
	},

	contactListPage: async ({ page }, use) => {
		await use(new ContactListPage(page));
	},

	addContactPage: async ({ page }, use) => {
		await use(new AddContactPage(page));
	},

	registrationPage: async ({ page }, use) => {
		await use(new RegistrationPage(page));
	},
});

export { expect } from "@playwright/test";
