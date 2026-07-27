import { chromium, request } from "@playwright/test";

export default async () => {
	console.log("Running API based global setup...");

	const requestContext = await request.newContext();

	const response = await requestContext.post("https://thinking-tester-contact-list.herokuapp.com/users/login", {
		data: {
			email: "practice.user@test.com",
			password: "practicePlaywright@home1",
		},
	});

	if (!response.ok()) {
		throw new Error(`Login failed: ${response.status()}`);
	}

	const { token } = await response.json();
	console.log("Received token:", token.substring(0, 10) + "...");

	const browser = await chromium.launch();
	const context = await browser.newContext({
		storageState: {
			cookies: [
				{
					name: "token",
					value: token,
					domain: "thinking-tester-contact-list.herokuapp.com",
					path: "/",
					expires: -1,
					httpOnly: false,
					secure: false,
					sameSite: "Lax",
				},
			],
			origins: [],
		},
	});

	console.log("Save authentication state to: auth-api.json");
	await context.storageState({ path: "auth-api.json" });

	await requestContext.dispose();

	await browser.close();
};
