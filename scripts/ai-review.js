import Anthropic from "@anthropic-ai/sdk";
import { Octokit } from "@octokit/rest";
import fs from "fs";

const anthropic = new Anthropic({
	apiKey: process.env.ANTHROPIC_API_KEY,
});

const octokit = new Octokit({
	auth: process.env.GITHUB_TOKEN,
});

const reviewCriteria = `
You are a senior QA automation engineer reviewing Playwright TypeScript test code.

Review against these criteria:

1. LOCATOR STRATEGY (Critical)
    Uses user-facing locators (getByRole, getByLabel, getByText, getByPlaceholder)
    Avoids CSS selectors unless necessary
    No XPath

2. ASSERTIONS (Critical)
    Uses web-first assertions (toBeVisible, toHaveText, toHaveValue)
    No non-retrying assertions for UI state (toBe, toEqual)

3. HARDCODED VALUES (Warning)
    No hardcoded waits (page.waitForTimeout)
    No hardcoded URLs (should use baseURL or env vars)
    Test data should be in data files or fixtures

4. PAGE OBJECT MODEL (Critical)
    UI interactions should be in Page Object methods
    Assertions should stay in test files
    No direct page.locator().click() in tests

5. TEST INDEPENDENCE (Critical)
    Test doesn't depend on execution order
    Test cleans up state if needed

6. TYPESCRIPT (Warning)
    Proper type annotations
    No 'any' types
    Async/await used correctly

For each issue found:
- State severity: =4 CRITICAL, =� WARNING, =5 INFO
- Provide specific line numbers
- Show exact fix with code example
- Explain why it matters

Output format:
## Review Summary
- Files reviewed: X
- Issues found: Y (Z critical, W warnings)

## Issues

### [Severity] Issue Title
**File:** path/to/file.ts
**Lines:** 15-18
**Problem:** Clear description
**Fix:**
\`\`\`typescript
// Corrected code here
\`\`\`
**Why:** Explanation

## Overall Assessment
[PASS / NEEDS WORK / BLOCK] - Summary statement
`;

async function reviewCode(filePath, fileContent) {
	console.log(`Reviewing ${filePath}...`);

	const message = await anthropic.messages.create({
		model: "claude-sonnet-4-6",
		max_tokens: 3000,
		messages: [
			{
				role: "user",
				content: `${reviewCriteria}\n\nFile to review: ${filePath}\n\n${fileContent}`,
			},
		],
	});

	return message.content[0].text;
}

async function postReviewComment(prNumber, reviewText) {
	const owner = process.env.REPO_OWNER;
	const repo = process.env.REPO_NAME;

	// 1. Get the latest commit SHA from the Pull Request to attach comments to
	const { data: pr } = await octokit.rest.pulls.get({
		owner,
		repo,
		pull_number: prNumber,
	});
	const commitId = pr.head.sha;

	// 2. Parse out individual line issues if you want true inline reviews.
	// Since parsing raw text accurately can sometimes skip issues, the safest, most
	// bulletproof method for CI gates is creating a single, formal Pull Request Review
	await octokit.rest.pulls.createReview({
		owner,
		repo,
		pull_number: prNumber,
		commit_id: commitId,
		event: "COMMENT",
		body: `## 🤖 AI Quality Gate System Scan\n\n${reviewText}\n\n---\n*Powered by Claude API*`,
	});

	await octokit.rest.issues.createComment({
		owner: process.env.REPO_OWNER,
		repo: process.env.REPO_NAME,
		issue_number: prNumber,
		body: `## >AI Code Review\n\n${reviewText}\n\n---\n*Powered by Claude API*`,
	});
}

async function main() {
	const changedFiles = process.env.CHANGED_FILES.split("\n").filter((f) =>
		f.trim(),
	);
	const prNumber = parseInt(process.env.PR_NUMBER);

	if (changedFiles.length === 0) {
		console.log("No test files to review.");
		return;
	}

	console.log(`Reviewing ${changedFiles.length} file(s)...`);

	let allReviews = [];

	for (const file of changedFiles) {
		if (!fs.existsSync(file)) {
			console.log(`Skipping deleted file: ${file}`);
			continue;
		}

		const content = fs.readFileSync(file, "utf-8");
		const review = await reviewCode(file, content);
		allReviews.push(`### ${file}\n\n${review}`);
	}

	const fullReview = allReviews.join("\n\n---\n\n");
	await postReviewComment(prNumber, fullReview);

	console.log("Review posted to PR");
}

main().catch((error) => {
	console.error("Error during review:", error);
	process.exit(1);
});
