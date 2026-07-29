# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Playwright test automation project for learning and practicing end-to-end testing. The primary test application is "Contact List App" (thinking-tester-contact-list.herokuapp.com).

## Common Commands

### Running Tests
```bash
# Run default test suite (contactListTests.spec.ts)
npm test

# Run tests in headed mode (browser visible)
npm run test:headed

# Run smoke tests only (tests tagged with @smoke)
npm run test:smoke

# Run tests for specific browser
npm run test:chromium

# Run tests and show report
npm run test:report

# Show the HTML report from last test run
npm run report

# Run tests against different environment
npm run test:dev  # Uses BASE_URL=http://localhost:5000
```

### Running Single Tests
```bash
# Run a specific test file
npx playwright test tests/pomTests.spec.ts

# Run tests matching a pattern
npx playwright test --grep "login"

# Run in debug mode
npx playwright test --debug tests/pomTests.spec.ts
```

## Architecture

### Authentication Strategies

The project demonstrates multiple authentication approaches:

1. **API-based Global Setup** (default): `global-api-setup.ts` authenticates via POST request before any tests run, saves token to `auth-api.json`. This is configured in `playwright.config.ts` via `globalSetup` and loaded via `storageState: "auth-api.json"`.

2. **Project Dependency Setup**: `tests/auth.setup.ts` performs UI-based login and saves to `auth-project.json`. Can be enabled by uncommenting the `dependencies: ["setup"]` line in chromium project config and switching `storageState` to `auth-project.json`.

 ### Locator Strategy (MANDATORY)
- ALWAYS prefer user-facing locators:
  1. `page.getByRole()`
  2. `page.getByText()`
  3. `page.getByTestId()`
- AVOID CSS selectors unless no alternative exists
- NEVER use XPath

### Naming Conventions
- Variables/functions: `camelCase`
- Page Object classes: `PascalCase`
- Test files: `feature-name.spec.ts`
- Data files: `feature-name.data.ts`

### Page Object Model Rules
- All Page Objects go in `tests/pages/`
- Class names MUST match filename (e.g., `LoginPage.ts` → `export class LoginPage`)
- Use constructor injection: `constructor(public page: Page)`
- No assertions inside Page Objects—those go in tests

Page objects expose:
- Action methods (e.g., `login()`, `clickAddContact()`)
- Getter properties for assertions (e.g., `emailField`, `heading`)

### Custom Fixtures

`tests/helpers/fixtures.ts` extends Playwright's base test with custom fixtures that provide pre-initialized page objects:
```typescript
import { test, expect } from "./helpers/fixtures";

test("example", async ({ loginPage, contactListPage }) => {
  // Page objects are automatically initialized
  await loginPage.goto();
});
```

### Test Organization
- `/tests/*.spec.ts`: Test files
- `/tests/helpers/fixtures.ts`: Custom test fixtures
- `/tests/auth.setup.ts`: UI-based authentication setup (optional)
- `/pages/*.ts`: Page object models
- `global-api-setup.ts`: API-based authentication (active)


### Critical Constraints
- DO NOT use `page.pause()` in committed code (debugging only)
- DO NOT use `page.waitForTimeout()`—rely on auto-waiting
- DO NOT mix test logic with Page Object methods
- ALWAYS run `npx playwright test` after generating tests
- MUST include JSDoc comments for all Page Object methods

### Code Generation Standards
When generating tests:
1. Read existing Page Objects in `tests/pages/` first
2. Reuse existing locators and methods
3. Follow the existing file structure
4. Add TypeScript type annotations
5. Include inline comments for non-obvious logic
6. Generate one test file at a time—confirm before proceeding

When refactoring:
1. ALWAYS run tests before and after
2. Preserve existing test coverage
3. Ask before deleting code
4. Show a diff summary of changes

### Watch Out For (Common Mistakes)
- Forgetting `await` on async Playwright methods
- Using `.toBe()` instead of `.toEqual()` for objects
- Not handling dynamic waits (use `waitFor` states)
- Hardcoding test data in test files instead of `data/`

## Test Credentials
Default test user (stored in setup files):
- Email: `practice.user@test.com`
- Password: `practicePlaywright@home1`
