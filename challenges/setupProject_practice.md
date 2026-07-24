# Session 12: Home Practice - Setup Projects

* **Application under test:** [Contact List](https://thinking-tester-contact-list.herokuapp.com/)
* **Objective:** Convert `beforeAll` registration hook to a Setup Project

---

## Current Problem

The Contact List tests in `tests/locatorsActionsAssertions_practice.spec.ts` use a `beforeAll` hook to register a user before running tests. This approach has limitations:

* No fixture access in `beforeAll`
* Must manually create `browser`, `context`, and `page`
* Harder to debug and trace

---

## Your Task

Refactor the Contact List tests to use a **Setup Project** instead of a `beforeAll` hook.

### Files to Create / Update

1. `tests/registration.setup.ts` – Setup project for user registration
2. `tests/contact-list-app.spec.ts` – Contact List tests (copied from ./tests/locatorsActionsAssertions_practice.spec.ts)
3. `playwright.config.ts` – Add projects configuration

---

## Steps to Complete

### Step 1: Create Registration Setup Project

**File:** `tests/registration.setup.ts`

Convert the `beforeAll` hook registration code to a setup test.

> **Hints:**
> * Import: `import { test as setup, expect } from '@playwright/test';`
> * Use `setup()` instead of `test()`
> * You have access to the `{ page }` fixture (no manual browser creation!)
> * Generate unique credentials using `Date.now()`
> * Save credentials to a file so tests can use them
> * Navigate, fill registration form, submit, and wait for redirect

#### Example Structure

```typescript
import { test as setup } from '@playwright/test';
import * as fs from 'fs';

setup('register user for Contact List tests', async ({ page }) => {
  // Generate credentials
  const timestamp = Date.now();
  const credentials = {
    email: `testuser${timestamp}@example.com`,
    password: 'SecurePass123!'
  };

  // Registration flow (from beforeAll)
  // TODO: Navigate, click Sign up, fill form, submit

  // Save credentials for tests to use
  fs.writeFileSync('test-credentials.json', JSON.stringify(credentials));
});
```

### Step 2: Move Contact List Tests

**File:** `tests/contact-list-app.spec.ts`

**TODO:** Copy the `"Contact List Application Tests"` describe block from `tests/locatorsActionsAssertions_practice.spec.ts` (only that describe block).

#### Changes Needed
* **REMOVE** the `test.beforeAll` hook (registration is now in the setup project).
* **READ** credentials from `test-credentials.json` instead.

#### Example Structure
```typescript
import { test, expect } from '@playwright/test';
import * as fs from 'fs';

// Read credentials saved by setup project
const credentials = JSON.parse(fs.readFileSync('test-credentials.json', 'utf-8'));
const testEmail = credentials.email;
const testPassword = credentials.password;

test.describe('Contact List Application Tests', () => {
  // NO beforeAll hook here!

  test('Challenge 1: Login with Comprehensive Validation', async ({ page }) => {
    // Test code stays the same, uses testEmail and testPassword
  });

  // ... other tests
});
```

### Step 3: Update `playwright.config.ts`

**TODO:** Add projects configuration to `playwright.config.ts`.

You need to create **TWO** projects:
1. **Setup project:** `"registration-contact-app"` (runs `registration.setup.ts`)
2. **Test project:** `"contact-list-app"` (runs `contact-list-app.spec.ts`, depends on setup)

#### Example Configuration

```typescript
import { defineConfig } from '@playwright/test';

export default defineConfig({
  projects: [
    // Setup project - runs FIRST
    {
      name: 'registration-contact-app',
      testMatch: /registration\.setup\.ts/,
    },

    // Test project - runs AFTER setup
    {
      name: 'contact-list-app',
      testMatch: /contact-list-app\.spec\.ts/,
      dependencies: ['registration-contact-app'], // Waits for setup to complete
    },
  ],
});
```

---

## Testing Your Implementation

1. **Run only the setup project:**
   ```bash
   npx playwright test --project=registration-contact-app
   ```

2. **Check the output file:**
   Verify that `test-credentials.json` was created and contains email/password.

3. **Run both together** (setup runs automatically first):
   ```bash
   npx playwright test --project=contact-list-app
   ```

4. **Verify efficiency:**
   Confirm setup only runs **ONCE**, not before every single test.

---

// This file is just instructions - actual implementation goes in:
// - tests/registration.setup.ts
// - tests/contact-list-app.spec.ts
// - playwright.config.ts (update)