/**
 * ================================================
 * Challenge 1 - Type Annotations Basics
 * ================================================
 *
 * LEARNING OBJECTIVES:
 * - Practice using primitive type annotations (string, number, boolean)
 * - Understand array type syntax
 * - Create inline object types
 * - See how TypeScript catches type errors at compile time
 *
 * THE SCENARIO:
 * You're setting up test configuration data for an E2E test suite.
 * You need to define variables with proper TypeScript types to ensure
 * type safety and catch errors before runtime.
 *
 * TASK:
 * 1. Add type annotations to all variables marked with TODO
 * 2. Fix any type errors that TypeScript detects
 * 3. Add a function with typed parameters and return value
 * 4. Create an array of typed objects
 */

// ============= TODO: Create typed object =============

// TODO: Add inline object type annotation
// Should have: name (string), email (string), age (number), isActive (boolean)
const testUser: { name: string; email: string; age: number; isActive: boolean } = {
	name: "John Doe",
	email: "john@test.com",
	age: 30,
	isActive: true,
};

// ============= TODO: Create typed function =============

// TODO: Add parameter types and return type annotation
// This function should accept two numbers and return a number
function calculateTimeout(baseTimeout: number, multiplier: number): number {
	return baseTimeout * multiplier;
}

// ============= TODO: Create array of typed objects =============

// TODO: Add type annotation for array of product objects
// Each product should have: id (number), name (string), price (number), inStock (boolean)
const products: { id: number; name: string; price: number; inStock: boolean }[] = [
	{ id: 1, name: "Laptop", price: 999.99, inStock: true },
	{ id: 2, name: "Mouse", price: 29.99, inStock: true },
	{ id: 3, name: "Keyboard", price: 79.99, inStock: false },
];

// ============= TODO: See TypeScript catch errors =============

// TODO: Uncomment these lines ONE AT A TIME to see TypeScript errors
// Then fix them or comment them back out

// const wrongType: string = 123; // Type error!
//fix
const wrongType: string = "123";
const wrongType2: number = 123;
// browsers.push(42); // Type error!
//fix
browsers1.push("Chrome");
// testUser.age = "thirty"; // Type error!
//fix
testUser.age = 30;
// const result: number = calculateTimeout("100", 2); // Type error!
//fix
const result: number = calculateTimeout(100, 2);

/**
 * ================================================
 * Challenge 2 - Test Data with Interfaces
 * ================================================
 *
 * LEARNING OBJECTIVES:
 * - Create reusable interface definitions
 * - Use optional properties with ?
 * - Work with typed arrays
 * - Combine interfaces with functions
 *
 * THE SCENARIO:
 * Your test suite needs consistent data structures for Users and Products
 * across multiple test files. Instead of using inline object types, you
 * need to create reusable interface definitions.
 *
 * TASK:
 * 1. Create User and Product interfaces
 * 2. Define test data arrays using these interfaces
 * 3. Create typed functions that work with interface data
 * 4. Handle optional properties correctly
 */

// ============= TODO: Create interfaces =============

// TODO: Create a User interface with these properties:
// - id: number
// - username: string
// - email: string
// - role: string
// - age?: number (optional)
// - isActive: boolean

// TODO: Create a Product interface with these properties:
// - id: number
// - name: string
// - price: number
// - category: string
// - inStock: boolean
// - description?: string (optional)

// ============= TODO: Create test data arrays =============

// TODO: Create an array of at least 3 User objects

// TODO: Create an array of at least 4 Product objects

// ============= TODO: Create typed functions =============

// TODO: Complete this function
// Find user by username - returns User or undefined if not found
// function findUserByUsername(users: User[], username: string): User | undefined { }

// TODO: Complete this function
// Get array of product names using map()
// function getProductNames(products: Product[]): string[] { }

// TODO: Complete this function
// Check if a user is an admin
// function isAdmin(user: User): boolean { }

// ============= Test your interfaces =============

console.log("=== Challenge 2 - Test Data with Interfaces ===\n");

// TODO: Uncomment and test your functions

// const foundUser = findUserByUsername(users, 'alice_admin');
// if (foundUser) {
//   console.log(`Found: ${foundUser.username} (${foundUser.email})`);
//   if (foundUser.age) {
//     console.log(`Age: ${foundUser.age}`);
//   }
// }

// const activeUsers = users.filter(user => user.isActive);
// console.log(`\nActive Users: ${activeUsers.length}`);

// const productNames = getProductNames(products);
// console.log(`\nProduct Names: ${productNames.join(', ')}`);

// users.forEach(user => {
//   console.log(`${user.username}: ${isAdmin(user) ? 'Admin' : 'Not Admin'}`);
// });

console.log("\n✅ Challenge 2 Complete!\n");

/**
 * ================================================
 * Challenge 3 - Type Aliases and Enums
 * ================================================
 *
 * LEARNING OBJECTIVES:
 * - Create and use enums for valid value sets
 * - Create type aliases for complex types
 * - Use literal union types
 * - Build type-safe configurations
 *
 * THE SCENARIO:
 * Your test suite runs in multiple environments and needs strict
 * validation of configuration values. Using plain strings leads to
 * typos. You'll use enums and type aliases for type safety.
 *
 * TASK:
 * 1. Create enums for environments, roles, and test statuses
 * 2. Create type aliases for configurations
 * 3. Build typed data structures using enums
 * 4. Create functions that work with enum values
 */

// ============= TODO: Create enums =============

// TODO: Create enum Environment with values:
// Development = 'Development'
// Staging = 'Staging'
// Production = 'Production'

// TODO: Create enum UserRole with values:
// Admin = 'Admin'
// User = 'User'
// Guest = 'Guest'
// Moderator = 'Moderator'

// TODO: Create enum TestStatus with values:
// Passed = 'Passed'
// Failed = 'Failed'
// Skipped = 'Skipped'
// Pending = 'Pending'

// ============= TODO: Create type aliases =============

// TODO: Create type alias TestResult with properties:
// - name: string
// - status: TestStatus
// - duration: number

// TODO: Create literal union type BrowserType

// TODO: Create type alias EnvConfig with properties:
// - environment: Environment
// - baseUrl: string
// - timeout: number
// - retries: number

// ============= TODO: Create test data =============

// TODO: Create array of EnvConfig objects for different environments
// const configs: EnvConfig[] = [ ... ];

// TODO: Create array of TestResult objects
// const testResults: TestResult[] = [ ... ];

// ============= TODO: Create typed functions =============

// TODO: Get configuration for a specific environment
// function getConfig(env: Environment): EnvConfig { ... }

// TODO: Check if a test passed
// function isTestPassed(result: TestResult): boolean { ... }

// TODO: Count tests by status
// function countByStatus(results: TestResult[], status: TestStatus): number { ... }

// TODO: Check if browser is supported
// function isBrowserSupported(browser: BrowserType): boolean { ... }

// ============= Test your types =============

console.log("=== Challenge 3 - Type Aliases and Enums ===\n");

// TODO: Uncomment and test your implementation

// console.log('Environments:');
// configs.forEach(config => {
//   console.log(`  ${config.environment}: ${config.baseUrl}`);
// });

// const passedCount = countByStatus(testResults, TestStatus.Passed);
// const failedCount = countByStatus(testResults, TestStatus.Failed);
// console.log(`\nTest Results: ${passedCount} passed, ${failedCount} failed`);

// const browsers: BrowserType[] = ['chromium', 'firefox', 'webkit'];
// browsers.forEach(browser => {
//   console.log(`${browser}: ${isBrowserSupported(browser) ? 'Supported' : 'Not Supported'}`);
// });

console.log("\n✅ Challenge 3 Complete!\n");

/**
 * ================================================
 * Challenge 4 - TypeScript Classes
 * ================================================
 *
 * LEARNING OBJECTIVES:
 * - Create classes with TypeScript features
 * - Use inheritance with extends
 * - Implement interfaces with implements
 * - Use access modifiers (private, public, readonly)
 *
 * THE SCENARIO:
 * Later in the academy, you'll refactor tests into the Page Object Model, which
 * uses classes. This challenge introduces class basics WITHOUT Playwright.
 * You'll create a BasePage class and a LoginPage class that preview what
 * Page Objects will look like.
 *
 * TASK:
 * 1. Create interfaces for Page Object contracts
 * 2. Create BasePage class with inheritance-ready structure
 * 3. Create LoginPage class that extends BasePage
 * 4. Use proper access modifiers (private, public, readonly)
 *
 * CONSTRAINTS:
 * - NO Playwright code (just TypeScript classes)
 * - Use access modifiers appropriately
 * - All methods must have return type annotations
 * - Use 'extends' for inheritance, 'implements' for interfaces
 */

// ============= TODO: Create interfaces =============

// TODO: Create PageInfo interface with properties:
// - title: string
// - url: string
// - isLoaded: boolean

// ============= TODO: Create BasePage class =============

// TODO: Create BasePage class with:
// - private pageName: string
// - readonly baseUrl: string
// - constructor(pageName: string, baseUrl: string)
// - public getPageName(): string
// - public getFullUrl(path: string = ''): string
// - public log(message: string): void

// ============= TODO: Create LoginPage class =============

// TODO: Create LoginPage class that extends BasePage with:
// - private credentials object { username: string; password: string };
// - constructor(baseUrl: string) calling super('Login Page', baseUrl)
// - public getLoginUrl(): string (use getFullUrl("/login") method from parent class)
// - public setCredentials(username: string, password: string): void
// - public getPageInfo(): PageInfo which returns an object that follows PageInfo interface

// ============= TODO: Create TestPage class =============

// TODO: Create TestPage class that implements PageInfo with:
// - All PageInfo properties
// - constructor to set all properties
// - public isReady(): boolean method

// ============= Test your classes =============

console.log("=== Challenge 4 - TypeScript Classes ===\n");

// TODO: Uncomment and test your implementation

// const loginPage = new LoginPage('https://demo.app.com');
// console.log(`Created: ${loginPage.getPageName()}`);
// console.log(`URL: ${loginPage.getLoginUrl()}`);

// loginPage.setCredentials('testuser', 'password123');
// const pageInfo = loginPage.getPageInfo();
// console.log(`Page Info:`, pageInfo);

// const testPage = new TestPage('Test Page', '/test', true);
// console.log(`Test Page Ready: ${testPage.isReady()}`);

console.log("\n✅ Challenge 4 Complete!\n");
