# Find Locator Skill

Given a URL and a description of an element, find the best Playwright locator.

## Inputs

- `url`: The page URL
- `element_description`: What the element is (e.g., "submit button", "email input")

## Workflow

1. Use Playwright MCP to navigate to the URL
2. Inspect the DOM for matching elements
3. Evaluate locator options:
   - getByRole
   - getByLabel
   - getByPlaceholder
   - getByTestId
   - getByText
4. Return the BEST locator with justification

## Output Format

\`\`\`typescript
// Best locator:
page.getByRole('button', { name: 'Submit' })

// Why: This button has an accessible name "Submit" and role="button"
// Alternatives considered:
// - page.locator('#submit-btn') ❌ (fragile ID)
// - page.getByText('Submit') ❌ (could match multiple elements)
\`\`\`
