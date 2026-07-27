import test, { expect } from "@playwright/test";
import fs from "fs";

test("basic GET request", async ({ request }) => {
	const response = await request.get("https://thinking-tester-contact-list.herokuapp.com/contacts");

	expect(response.status()).toBe(401);

	const error = await response.json();
	console.log("Error:", error);
});

test("basic GET request with auth", async ({ request }) => {
	const authFile = JSON.parse(fs.readFileSync("auth-project.json", "utf-8"));
	const token = authFile.cookies.find((item: { name: string }) => item.name === "token").value;

	const response = await request.get("https://thinking-tester-contact-list.herokuapp.com/contacts", {
		headers: { Authorization: `Bearer ${token}` },
	});

	expect(response.status()).toBe(200);
	const contacts = await response.json();
	console.log("Contacts:", contacts);
});

test("post request - login", async ({ request }) => {
	const response = await request.post("https://thinking-tester-contact-list.herokuapp.com/users/login", {
		data: {
			email: "practice.user@test.com",
			password: "practicePlaywright@home1",
		},
	});

	expect(response.status()).toBe(200);
	const body = await response.json();
	console.log("Response body:", body);
	console.log("Received token:", body.token.substring(0, 10) + "...");
});
