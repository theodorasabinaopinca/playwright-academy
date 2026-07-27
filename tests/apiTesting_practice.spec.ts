/**
 * HOME PRACTICE - API Testing
 *
 * APPLICATION API: https://thinking-tester-contact-list.herokuapp.com
 * API DOCUMENTATION: https://documenter.getpostman.com/view/4012288/TzK2bEa8
 *
 * OBJECTIVE: Test the complete user lifecycle using API requests
 *
 * USER LIFECYCLE:
 * 1. Register a new user (POST /users)
 * 2. Update user profile (PATCH /users/me)
 * 3. Login with updated credentials (POST /users/login)
 * 4. Delete the user (DELETE /users/me)
 *
 * LEARNING GOALS:
 * - Use request.post(), request.patch(), request.delete()
 * - Work with authentication tokens
 * - Verify response status codes
 * - Validate response body data
 * - Chain API requests (use token from one request in another)
 *
 * REQUIREMENTS:
 * - Use Playwright's request fixture
 * - Verify all status codes (200, 201, etc.)
 * - Verify response body contains expected data
 * - Use token-based authentication
 * - Ensure user is deleted at the end
 */

import { test, expect } from "@playwright/test";

test.describe("API Testing: User Lifecycle", () => {
	test("complete user lifecycle: register, update, login, delete", async ({ request }) => {
		console.log("\n=== COMPLETE USER LIFECYCLE TEST ===\n");

		// Generate unique user data
		const timestamp = Date.now();
		const originalUser = {
			firstName: "John",
			lastName: "Doe",
			email: `john.doe${timestamp}@example.com`,
			password: "SecurePass123!",
		};

		// ============================================
		// STEP 1: Register a new user (POST /users)
		// ============================================
		console.log("Step 1: Registering new user...");

		// TODO: Send POST request to /users endpoint
		// Endpoint: https://thinking-tester-contact-list.herokuapp.com/users
		// Body: { firstName, lastName, email, password } - use test data from originalUser object
		// Hint: const registerResponse = await request.post('https://...', { data: { ... } });

		// TODO: Verify response status is 201 (Created)

		// TODO: Parse response JSON
		// Hint: const registerData = await registerResponse.json();

		// TODO: Verify response contains user data
		// Check that firstName, lastName, email are in response

		// TODO: Verify response contains authentication token (check it is defined; it is of type 'string'; it is not an empty string)

		// TODO: Save the token for subsequent requests
		// Hint: const token = registerData.token;

		// TODO: Save the user ID for later verification
		// Hint: const userId = registerData.user._id;

		console.log(`User registered: ${originalUser.email}`);
		//console.log(`Token received: ${token.substring(0, 20)}...`);
		console.log(`User ID: ${userId}`);

		// ============================================
		// STEP 2: Update user profile (PATCH /users/me)
		// ============================================
		console.log("\nStep 2: Updating user profile...");

		const updatedUser = {
			firstName: "Jane",
			lastName: "Smith",
			email: `jane.smith${timestamp}@example.com`,
			password: "NewSecurePass456!",
		};

		// TODO: Send PATCH request to /users/me endpoint
		// Endpoint: https://thinking-tester-contact-list.herokuapp.com/users/me
		// Headers: { Authorization: `Bearer ${token}` }
		// Body: { firstName, lastName, email, password }
		// Hint: const updateResponse = await request.patch('https://...', {
		//   headers: { Authorization: `Bearer ${token}` },
		//   data: { ... }
		// });

		// TODO: Verify response status is 200 (OK)

		// TODO: Parse response JSON
		// Hint: const updateData = await updateResponse.json();

		// TODO: Verify response contains updated user data
		// Check that firstName, lastName, email are updated

		// TODO: Verify user ID remains the same (same user, just updated)
		// Hint: expect(updateData._id).toBe(userId);

		console.log(`User profile updated successfully`);
		// console.log(`First Name: ${originalUser.firstName} -> ${updateData.firstName}`);
		// console.log(`Last Name: ${originalUser.lastName} -> ${updateData.lastName}`);
		// console.log(`Email: ${originalUser.email} -> ${updateData.email}`);

		// ============================================
		// STEP 3: Login with updated credentials (POST /users/login)
		// ============================================
		console.log("\nStep 3: Logging in with updated credentials...");

		// TODO: Send POST request to /users/login endpoint
		// Endpoint: https://thinking-tester-contact-list.herokuapp.com/users/login
		// Body: { email: updatedUser.email, password: updatedUser.password }
		// Hint: const loginResponse = await request.post('https://...', { data: { ... } });

		// TODO: Verify response status is 200 (OK)

		// TODO: Parse response JSON
		// Hint: const loginData = await loginResponse.json();

		// TODO: Verify response contains user data with updated information
		// Check that firstName, lastName, email match updated values

		// TODO: Verify user ID is still the same (same user account)
		// Hint: expect(loginData.user._id).toBe(userId);

		// TODO: Verify response contains the authentication token (check it is defined; it is of type 'string'; it is not an empty string)

		// TODO: Save the new token (needed for delete)
		// Hint: const newToken = loginData.token;

		console.log(`Login successful with updated credentials`);
		//console.log(`New token received: ${newToken.substring(0, 20)}...`);

		// ============================================
		// STEP 4: Delete the user (DELETE /users/me)
		// ============================================
		console.log("\nStep 4: Deleting user...");

		// TODO: Send DELETE request to /users/me endpoint
		// Endpoint: https://thinking-tester-contact-list.herokuapp.com/users/me
		// Headers: { Authorization: `Bearer ${newToken}` }
		// Hint: const deleteResponse = await request.delete('https://...', {
		//   headers: { Authorization: `Bearer ${newToken}` }
		// });

		// TODO: Verify response status is 200 (OK)

		// TODO: (Optional) Verify user is deleted by trying to login again
		// The login should fail with 401 Unauthorized

		console.log(`User deleted successfully`);

		console.log("\n=== USER LIFECYCLE COMPLETED ===\n");
	});
});
