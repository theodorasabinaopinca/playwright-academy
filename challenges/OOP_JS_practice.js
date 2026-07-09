/**
 * SESSION 2: HOME PRACTICE CHALLENGES
 * Data Handling for Testers
 *
 * TOPICS COVERED:
 * - Arrays & Objects
 * - Functions
 *
 * INSTRUCTIONS:
 * Complete the 3 progressive challenges below.
 * Replace each TODO comment with working JavaScript code.
 */

console.log("=== SESSION 2: HOME PRACTICE CHALLENGES ===\n");

// ============================================
// CHALLENGE 1: Test User Data Builder
// ============================================
console.log("--- CHALLENGE 1: Test User Data Builder ---");
console.log("Build reusable functions to create and validate test user data\n");

/**
 * SCENARIO:
 * You're building a test automation suite and need to manage test user data.
 * Create functions to build user objects with different roles and validate their email format.
 *
 * TASK:
 * 1. Create a function that builds a user object with username, email, role, and active status
 * 2. Create a function to validate email format (must contain @ and .)
 * 3. Create a function to generate a default password based on username
 */

// TODO: Create function to build a user object
// Returns: User object with all properties
function createUser(username, email, role, active) {
	const user = {
		username: username,
		email: email,
		role: role,
		active: active,
	};
	return user;
}

// TODO: Create function to validate email
// Returns: true if email contains both '@' and '.', false otherwise
function isValidEmail(email) {
	// Use .includes() and && operator
	return email.includes("@") && email.includes(".");
} 

// TODO: Create function to generate default password
// Returns: password string in format: "{username}@Test123"
// Example: "admin" → "admin@Test123"
function generateDefaultPassword(username) {
	// Use template literal
	return `${username}@Test123`;
}

// Test Challenge 1
console.log("Testing createUser:");
const testUser = createUser("admin", "admin@test.com", "administrator", true);
console.log(
	testUser.username === "admin" && testUser.email === "admin@test.com"
		? "✅ PASS"
		: "❌ FAIL",
);

console.log("Testing isValidEmail:");
console.log(isValidEmail("test@example.com") === true ? "✅ PASS" : "❌ FAIL");
console.log(isValidEmail("invalid-email") === false ? "✅ PASS" : "❌ FAIL");

console.log("Testing generateDefaultPassword:");
console.log(
	generateDefaultPassword("admin") === "admin@Test123" ? "✅ PASS" : "❌ FAIL",
);
console.log("");

// ============================================
// CHALLENGE 2: Test Data Management
// ============================================
console.log("--- CHALLENGE 2: Test Data Management ---");
console.log("Filter, transform, and find users in your test data set\n");

/**
 * SCENARIO:
 * You have a collection of test users stored in an array.
 * You need to filter active users, extract specific data, and find users by criteria.
 *
 * TASK:
 * 1. Filter the array to get only active users
 * 2. Map the array to extract just usernames
 * 3. Find a specific user by role
 * 4. Create a new array with email validation status for each user
 *
 * TOPICS: Arrays, Array Methods (filter/map/find), Objects, Arrow Functions
 */

// Test data set - DO NOT MODIFY
const testUsers = [
	{
		username: "admin",
		email: "admin@qa.com",
		role: "admin",
		active: true,
	},
	{
		username: "tester1",
		email: "tester1@qa.com",
		role: "tester",
		active: true,
	},
	{
		username: "olduser",
		email: "invalid-email",
		role: "tester",
		active: false,
	},
	{
		username: "manager",
		email: "manager@qa.com",
		role: "manager",
		active: true,
	},
	{
		username: "tester2",
		email: "tester2@qa.com",
		role: "tester",
		active: true,
	},
];

// TODO: Create function to get only active users
// Returns: array of user objects where active is true
// Use .filter() method
function getActiveUsers(users) {
	return users.filter(user => user.active);
}

// TODO: Create function to extract usernames
// Returns: array of strings (just the usernames)
// Use .map() method
function extractUsernames(users) {
	return users.map(user => user.username);
}

// TODO: Create function to find user by role
// Parameters: users (array), role (string)
// Returns: User object or undefined
// Use .find() method
function findUserByRole(users, role) {
	return users.find(user => user.role === role);
}

// Test Challenge 2
console.log("Testing getActiveUsers:");
const activeUsers = getActiveUsers(testUsers);
console.log(activeUsers.length === 4 ? "✅ PASS" : "❌ FAIL");

console.log("Testing extractUsernames:");
const usernames = extractUsernames(testUsers);
console.log(
	usernames.length === 5 && usernames[0] === "admin" ? "✅ PASS" : "❌ FAIL",
);

console.log("Testing findUserByRole:");
const adminUser = findUserByRole(testUsers, "admin");
console.log(
	adminUser && adminUser.username === "admin" ? "✅ PASS" : "❌ FAIL",
);

// ============================================
// SUCCESS!
// ============================================
