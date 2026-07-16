/**
 * HOME PRACTICE CHALLENGES
 * Control Flow & Error Handling
 *
 * TOPICS COVERED:
 * - Smart Logic (if/else, ternary, switch, truthy/falsy)
 * - Loops & Iteration (for...of, forEach, while, break/continue)
 * - Error Handling (try/catch/finally)
 */

console.log("=== HOME PRACTICE CHALLENGES ===\n");

// ============================================
// CHALLENGE 1: Test Configuration & Environment Setup
// ============================================
console.log("--- CHALLENGE 1: Test Configuration & Environment Setup ---");
console.log(
  "Use conditionals to configure tests based on browser, environment, and requirements\n",
);

/**
 * SCENARIO:
 * You're building a test automation framework that needs to handle different browsers,
 * environments, test types, and validate test prerequisites before execution.
 *
 * TASK:
 * 1. Get appropriate timeout based on test type (e2e, api, unit tests have different timeouts)
 * 2. Get the correct URL for different environments (dev, staging, production)
 * 3. Validate if all required test configuration is present before running tests
 *
 * TOPICS: If/Else, Ternary Operator, Switch Statements, Truthy/Falsy
 */

// TODO: Create function to get timeout based on test type
// Parameter: testType (string: 'e2e', 'api', 'unit')
// Returns: timeout in milliseconds
//   'e2e' → 60000 (E2E tests are slow, need more time)
//   'api' → 10000 (API tests are faster)
//   'unit' → 5000 (Unit tests are fastest)
//   default → 30000 (default timeout for unknown types)
// Use if/else statements
function getTestTimeout(testType) {
  // Use if/else chain to check testType and return appropriate timeout
  if (testType === "e2e") {
    return 60000;
  } else if (testType === "api") {
    return 10000;
  } else if (testType === "unit") {
    return 5000;
  } else {
    return 30000;
  }
}

// TODO: Create function to get environment URL
// Parameter: environment (string: 'dev', 'staging', 'production', 'local')
// Returns: corresponding URL string
//   'local' → 'http://localhost:3000'
//   'dev' → 'https://dev.myapp.com'
//   'staging' → 'https://staging.myapp.com'
//   'production' → 'https://myapp.com'
//   default → 'http://localhost:3000'
// Use switch statement
function getEnvironmentUrl(environment) {
  // Use switch statement with cases for each environment
  switch (environment) {
    case "local":
      return "http://localhost:3000";
    case "dev":
      return "https://dev.myapp.com";
    case "staging":
      return "https://staging.myapp.com";
    case "production":
      return "https://myapp.com";
    default:
      return "http://localhost:3000";
  }
}

// Test Challenge 1
console.log("Testing getTestTimeout:");
console.log(getTestTimeout("e2e") === 60000 ? "✅ PASS" : "❌ FAIL");
console.log(getTestTimeout("api") === 10000 ? "✅ PASS" : "❌ FAIL");
console.log(getTestTimeout("unit") === 5000 ? "✅ PASS" : "❌ FAIL");
console.log(getTestTimeout("unknown") === 30000 ? "✅ PASS" : "❌ FAIL");

console.log("Testing getEnvironmentUrl:");
console.log(getEnvironmentUrl("local") === "http://localhost:3000" ? "✅ PASS" : "❌ FAIL");
console.log(getEnvironmentUrl("dev") === "https://dev.myapp.com" ? "✅ PASS" : "❌ FAIL");
console.log(getEnvironmentUrl("staging") === "https://staging.myapp.com" ? "✅ PASS" : "❌ FAIL");
console.log(getEnvironmentUrl("production") === "https://myapp.com" ? "✅ PASS" : "❌ FAIL");

console.log("");

// ============================================
// CHALLENGE 2: Test Suite Executor
// ============================================
console.log("--- CHALLENGE 2: Test Suite Executor ---");

/**
 * SCENARIO:
 * You have an array of test cases. You need to process them in different ways:
 * filter by status, execute only active tests, find specific tests, and collect statistics.
 *
 * TASK:
 * 1. Loop through tests and log only the ones that are active
 * 2. Find the first failed test (if any)
 * 3. Count how many tests passed, failed, and were skipped
 * 4. Create an array of test names for all critical priority tests
 *
 * TOPICS: for...of loops, forEach, conditionals, break/continue
 */

// Test data set - DO NOT MODIFY
const testCases = [
  { name: "Login Test", status: "passed", priority: "critical", active: true },
  { name: "Signup Test", status: "failed", priority: "high", active: true },
  { name: "Profile Test", status: "skipped", priority: "medium", active: false },
  { name: "Checkout Test", status: "passed", priority: "critical", active: true },
  { name: "Search Test", status: "passed", priority: "low", active: true },
  { name: "Filter Test", status: "failed", priority: "high", active: true },
];

// TODO: Create function to log active test names
// Parameter: tests (array)
// Returns: nothing (just console.log)
function logActiveTests(tests) {
  // Use for...of loop and if statement to check active property
  // const counter = tests.filter((test) => test.active).length;

  // if (counter === 0) {
  //   console.log("No active tests");
  // } else {
  for (const test of tests) {
    if (test.active) {
      console.log(test.name);
    }
  }
  // }
}

// TODO: Create function to find first failed test
// Parameter: tests (array)
// Returns: test object or undefined
function findFirstFailedTest(tests) {
  let firstFailedTest;
  // Use for...of loop with break statement
  for (const test of tests) {
    if (test.status === "failed") {
      firstFailedTest = test;
      break;
    }
  }
  return firstFailedTest;
}

// TODO: Create function to count test results
// Parameter: tests (array)
// Returns: object with { passed: number, failed: number, skipped: number }
// Use for...of loop with counters
function countTestResults(tests) {
  // Initialize counters: let passed = 0, failed = 0, skipped = 0
  // Loop through tests, increment appropriate counter based on status
  // Return object with counts
  let passed = 0;
  let failed = 0;
  let skipped = 0;
  for (const test of tests) {
    if (test.status === "passed") {
      passed += 1;
    } else if (test.status === "failed") {
      failed += 1;
    } else if (test.status === "skipped") {
      skipped += 1;
    }
  }
  return { passed, failed, skipped };
}
// TODO: Create function to get critical test names
// Parameter: tests (array)
// Returns: array of test names (strings) where priority is 'critical'
function getCriticalTestNames(tests) {
  // Create empty array
  // Use forEach and push to build array
  // Return array
  const criticalTestNames = [];

  tests.forEach((test) => {
    if (test.priority === "critical") {
      criticalTestNames.push(test.name);
    }
  });

  return criticalTestNames;
}

// Test Challenge 2
console.log("Testing logActiveTests:");
console.log("Active tests:");
logActiveTests(testCases);
// Should log: Login Test, Signup Test, Checkout Test, Search Test, Filter Test

console.log("\nTesting findFirstFailedTest:");
const firstFailed = findFirstFailedTest(testCases);
console.log(firstFailed && firstFailed.name === "Signup Test" ? "PASS" : "FAIL");

console.log("Testing countTestResults:");
const counts = countTestResults(testCases);
console.log(counts.passed === 3 && counts.failed === 2 && counts.skipped === 1 ? "PASS" : "FAIL");

console.log("Testing getCriticalTestNames:");
const criticalNames = getCriticalTestNames(testCases);
console.log(
  criticalNames.length === 2 &&
    criticalNames.includes("Login Test") &&
    criticalNames.includes("Checkout Test")
    ? "PASS"
    : "FAIL",
);
console.log("");

// ============================================
// CHALLENGE 3: Polling, Waiting, and Test Flow Control
// ============================================
console.log("--- CHALLENGE 3: Polling, Waiting, and Test Flow Control ---");
console.log("Use while loops and control flow\n");

/**
 * SCENARIO:
 * Real test automation requires polling for conditions, retrying flaky operations,
 * and controlling test execution flow based on runtime conditions.
 *
 * TASK:
 * 1. Count test runs
 * 2. Process only active tests, skipping disabled ones (continue statement)
 * 3. Stop test suite execution on first critical failure (break statement)
 *
 * TOPICS: while loops, break, continue, conditionals
 */

// TODO: Create function to count test runs using a while loop
// Parameters: testName (string), numberOfRuns (number)
// Returns: number (the total count reached)
// Use while loop to count from 1 to numberOfRuns
function countTestRuns(testName, numberOfRuns) {
  // Initialize: let count = 0
  // While loop: while (count < numberOfRuns)
  //   Increment count (count++)
  //   Log: "Running test: {testName} - Run #{count}"
  // Return count
  let count = 0;
  while (count < numberOfRuns) {
    count += 1
    console.log(`Running test ${testName} - Run ${count}`)
  }
  return count;
}

// TODO: Create function to run only active tests (skip disabled ones)
// Parameter: tests (array of test objects with 'active' property)
// Returns: number of tests executed (excluding inactive ones)
// Use for...of loop with continue statement to skip inactive tests
function executeOnlyActiveTests(tests) {
  // Initialize: let executed = 0
  // For loop: for (const test of tests)
  //   If test.active === false, use continue (skip this test)
  //   Increment executed
  //   Log: "Executed: {test.name}"
  // Return executed
  let executed = 0;
  for (const test of tests) {
    if (test.active === false) {
      continue;
    } 
      console.log(`Executed ${test.name}`)
      executed += 1;
  }
  return executed;
}

// TODO: Create function to stop suite on first critical failure
// Parameter: tests (array with status and priority properties)
// Returns: object with { stopped: boolean, executedCount: number, failedTest: string|null }
// Use for...of loop with break statement
// Real-world: Some CI/CD pipelines stop on critical test failures to save resources
function stopOnCriticalFailure(tests) {
  // Initialize: let executedCount = 0, let stopped = false, let failedTest = null
  // For loop: for (const test of tests)
  //   Increment executedCount
  //   If test.status === 'failed' AND test.priority === 'critical':
  //     Set stopped = true, failedTest = test.name
  //     Log: "Critical test failed: {test.name}. Stopping suite."
  //     Use break to exit loop
  // Return { stopped, executedCount, failedTest }
  let executedCount = 0;
  let stopped = false;
  let failedTest = null;
  for(const test of tests) {
    executedCount += 1;
    if (test.status === 'failed' && test.priority === 'critical') {
      stopped = true;
      failedTest = test.name;
      console.log(`Critical test failed: ${test.name}. Stopping suite.`);
      break;
    }
  }
  return {stopped, executedCount, failedTest}
}

// Test Challenge 3
console.log("Testing countTestRuns:");
const runCount1 = countTestRuns("Login Test", 3);
console.log(runCount1 === 3 ? "✅ PASS" : "❌ FAIL");

const runCount2 = countTestRuns("Checkout Test", 5);
console.log(runCount2 === 5 ? "✅ PASS" : "❌ FAIL");

console.log("Testing executeOnlyActiveTests:");
const testsToRun = [
  { name: "Test 1", active: true },
  { name: "Test 2", active: false },
  { name: "Test 3", active: true },
  { name: "Test 4", active: false },
  { name: "Test 5", active: true },
];
const executedCount = executeOnlyActiveTests(testsToRun);
console.log(executedCount === 3 ? "✅ PASS" : "❌ FAIL");

console.log("Testing stopOnCriticalFailure:");
const criticalTests = [
  { name: "Test 1", status: "passed", priority: "high" },
  { name: "Test 2", status: "failed", priority: "critical" },
  { name: "Test 3", status: "passed", priority: "low" },
];
const stopResult = stopOnCriticalFailure(criticalTests);
console.log(
  stopResult.stopped === true &&
    stopResult.executedCount === 2 &&
    stopResult.failedTest === "Test 2"
    ? "✅ PASS"
    : "❌ FAIL",
);

const noCriticalTests = [
  { name: "Test A", status: "passed", priority: "high" },
  { name: "Test B", status: "failed", priority: "medium" },
  { name: "Test C", status: "passed", priority: "low" },
];
const noStopResult = stopOnCriticalFailure(noCriticalTests);
console.log(
  noStopResult.stopped === false && noStopResult.executedCount === 3 ? "✅ PASS" : "❌ FAIL",
);
console.log("");

// ============================================
// CHALLENGE 4: Error Handling in Test Execution
// ============================================
console.log("--- CHALLENGE 4: Error Handling in Test Execution ---");
console.log("Use try/catch/finally to handle errors gracefully\n");

/**
 * SCENARIO:
 * Your test framework needs to handle errors without crashing the entire suite.
 * You need to catch errors, log them
 *
 * TASK:
 * 1. Create a function that validates test data and throws custom errors
 *
 * TOPICS: try/catch/finally, throw, Error object
 */

// TODO: Create function to validate test data
// Parameter: testData (object with name: string, steps: array properties)
// Returns: true if valid
// Throws: Error with specific message if invalid
// - If no name: throw new Error('Test name is required')
// - If no steps: throw new Error('Test steps are required')
// - If steps is empty array: throw new Error('Test must have at least one step')
function validateTestData(testData) {
  if (testData.name === undefined) {
    throw new Error('Test name is required')
  }

  if (testData.steps === undefined) {
    throw new Error('Test steps are required')
  }

  if(testData.steps.length === 0) {
    throw new Error('Test must have at least one step')
  }
  return true;
}

// Test Challenge 4
console.log("Testing safeExecuteTest:");
const successTest = () => {
  return true;
};
const failTest = () => {
  throw new Error("Test assertion failed");
};

const result1 = safeExecuteTest(successTest, "Success Test");
console.log(result1.status === "passed" && result1.error === null ? "PASS" : "FAIL");

const result2 = safeExecuteTest(failTest, "Fail Test");
console.log(
  result2.status === "failed" && result2.error === "Test assertion failed" ? "PASS" : "FAIL",
);

console.log("Testing validateTestData:");
try {
  validateTestData({ name: "Test 1", steps: ["step1"] });
  console.log("PASS");
} catch (error) {
  console.log("FAIL");
}

try {
  validateTestData({ name: "", steps: [] });
  console.log("L FAIL - Should have thrown error");
} catch (error) {
  console.log(error.message === "Test name is required" ? "PASS" : "FAIL");
}

console.log("Testing executeWithCleanup:");
const cleanupResult1 = executeWithCleanup({
  name: "Valid Test",
  steps: ["step1"],
});
console.log(cleanupResult1.validated === true && cleanupResult1.cleaned === true ? "PASS" : "FAIL");

const cleanupResult2 = executeWithCleanup({ name: "", steps: [] });
console.log(
  cleanupResult2.validated === false && cleanupResult2.cleaned === true ? "PASS" : "FAIL",
);

console.log("Testing executeTestSuite:");
const testSuite = [
  { name: "Test 1", testFn: () => true },
  {
    name: "Test 2",
    testFn: () => {
      throw new Error("Assertion failed");
    },
  },
  { name: "Test 3", testFn: () => true },
  {
    name: "Test 4",
    testFn: () => {
      throw new Error("Element not found");
    },
  },
];

const suiteResult = executeTestSuite(testSuite);
console.log(
  suiteResult.passed === 2 && suiteResult.failed === 2 && suiteResult.errors.length === 2
    ? "PASS"
    : "FAIL",
);
console.log("");

// ============================================
// SUCCESS!
// ============================================
console.log("=== ALL CHALLENGES COMPLETED ===");
console.log(
  "Next step: Run your Playwright tests and apply these concepts to real browser automation!",
);
