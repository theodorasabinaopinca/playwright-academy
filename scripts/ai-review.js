// Import required libraries
import Anthropic from "@anthropic-ai/sdk"; // Claude AI SDK
import { Octokit } from "@octokit/rest"; // GitHub API client
import fs from "fs"; // File system operations

// Initialize Claude AI client with API key
const anthropic = new Anthropic({
	apiKey: process.env.ANTHROPIC_API_KEY,
});

// Initialize GitHub API client with access token
const octokit = new Octokit({
	auth: process.env.GITHUB_TOKEN,
});

// Instructions for Claude to review code and return structured JSON
const reviewCriteria = `
You are a senior QA automation engineer reviewing Playwright TypeScript test code.
Analyze the provided code file and return a JSON object containing code review findings.

Review against these criteria:
1. LOCATOR STRATEGY: Use user-facing locators (getByRole, etc.), avoid CSS/XPath.
2. ASSERTIONS: Use web-first assertions (toBeVisible), no non-retrying ones (toBe).
3. HARDCODED VALUES: No page.waitForTimeout, use baseURL.
4. POM: UI interactions in POM methods, assertions in test files.

Your response MUST be a single, valid JSON object with no markdown wrapping, matching this structure:
{
  "assessment": "BLOCK" or "PASSED",
  "summary": "Overall evaluation summary string...",
  "issues": [
    {
      "line": 15,
      "title": "Brittle Locator Used",
      "problem": "Avoid using deep-nested CSS selectors.",
      "fix": "await page.getByRole('button', { name: 'Submit' }).click();",
      "why": "Web-first locators are resilient to layout changes."
    }
  ]
}
`;

// Send code to Claude for review and return structured feedback
async function reviewCode(filePath, fileContent) {
	console.log(`Reviewing ${filePath}...`);

	// Call Claude API with the code to review
	const message = await anthropic.messages.create({
		model: "claude-sonnet-4-6",
		max_tokens: 3000,
		messages: [
			{
				role: "user",
				content: `${reviewCriteria}\n\nFile Path: ${filePath}\n\nFile Content:\n${fileContent}`,
			},
		],
	});

	const rawText = message.content[0].text.trim();

	try {
		// Remove markdown code block formatting if Claude wrapped the JSON
		const sanitizedText = rawText
			.replace(/^```json\s*/i, "") // Removes leading ```json
			.replace(/^```\s*/, "") // Removes leading ``` if plain
			.replace(/```$/, "") // Removes trailing ```
			.trim();

		// Parse and return the JSON response
		return JSON.parse(sanitizedText);
	} catch (e) {
		console.error("Failed to parse Claude's response as JSON.");
		console.error("Raw output from model was:", rawText);

		// If parsing fails, block the PR to prevent issues from being missed
		return {
			assessment: "BLOCK",
			summary:
				"⚠️ AI Code Review system encountered a formatting exception while analyzing this file. Check the CI action terminal logs.",
			issues: [],
		};
	}
}

// Main function: orchestrates the entire review process
async function main() {
	// Get environment variables from GitHub Actions
	const changedFiles = process.env.CHANGED_FILES.split("\n").filter((f) =>
		f.trim(),
	);
	const prNumber = parseInt(process.env.PR_NUMBER);
	const owner = process.env.REPO_OWNER;
	const repo = process.env.REPO_NAME;

	if (changedFiles.length === 0) {
		console.log("No test files to review.");
		return;
	}

	// Fetch PR details to get the latest commit SHA
	const { data: pr } = await octokit.rest.pulls.get({
		owner,
		repo,
		pull_number: prNumber,
	});
	const commitId = pr.head.sha;

	// Initialize review data
	let inlineComments = [];
	let shouldBlockMerge = false;
	let summaryReport = "### 🤖 AI Quality Gate Assessment Results\n\n";

	// Review each changed test file
	for (const file of changedFiles) {
		if (!fs.existsSync(file)) continue;

		// Read file content and send to Claude for review
		const content = fs.readFileSync(file, "utf-8");
		const reviewResult = await reviewCode(file, content);

		// Add file summary to report
		summaryReport += `#### File: ${file} (${reviewResult.assessment})\n${reviewResult.summary}\n\n`;

		// Flag PR for blocking if any file has critical issues
		if (reviewResult.assessment === "BLOCK") {
			shouldBlockMerge = true;
		}

		// Convert Claude's issues into GitHub inline comments
		if (reviewResult.issues && reviewResult.issues.length > 0) {
			reviewResult.issues.forEach((issue) => {
				inlineComments.push({
					path: file,
					line: issue.line,
					side: "RIGHT", // Comment on the new version of the file
					body: `### ❌ ${issue.title}\n**Problem:** ${issue.problem}\n\n**Suggested Fix:**\n\`\`\`typescript\n${issue.fix}\n\`\`\`\n\n**Why:** ${issue.why}`,
				});
			});
		}
	}

	// Post review to GitHub PR (either as "Request Changes" or "Comment")
	await octokit.rest.pulls.createReview({
		owner,
		repo,
		pull_number: prNumber,
		commit_id: commitId,
		event: shouldBlockMerge ? "REQUEST_CHANGES" : "COMMENT",
		body: summaryReport,
		comments: inlineComments.length > 0 ? inlineComments : undefined,
	});

	console.log(`Review posted with ${inlineComments.length} inline comment(s).`);

	// Fail the workflow if critical issues were found
	if (shouldBlockMerge) {
		console.error("❌ Critical violations found. Blocking pipeline execution.");
		process.exit(1);
	}
}

// Run the main function and handle any errors
main().catch((error) => {
	console.error("Error during execution:", error);
	process.exit(1);
});
