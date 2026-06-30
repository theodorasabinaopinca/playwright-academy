import Anthropic from "@anthropic-ai/sdk";
import { Octokit } from "@octokit/rest";
import fs from "fs";

const anthropic = new Anthropic({
	apiKey: process.env.ANTHROPIC_API_KEY,
});

const octokit = new Octokit({
	auth: process.env.GITHUB_TOKEN,
});

// We update the prompt to force Claude to respond in valid JSON so we can extract line data
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

async function reviewCode(filePath, fileContent) {
	console.log(`Reviewing ${filePath}...`);

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
		// Clean out markdown code blocks (e.g., ```json ... ```) if Claude included them
		const sanitizedText = rawText
			.replace(/^```json\s*/i, "") // Removes leading ```json
			.replace(/^```\s*/, "") // Removes leading ``` if plain
			.replace(/```$/, "") // Removes trailing ```
			.trim();

		// Parse the cleaned JSON string
		return JSON.parse(sanitizedText);
	} catch (e) {
		console.error("Failed to parse Claude's response as JSON.");
		console.error("Raw output from model was:", rawText);

		// Switch fallback to BLOCK if parsing fails, so broken responses don't bypass your security gate!
		return {
			assessment: "BLOCK",
			summary:
				"⚠️ AI Code Review system encountered a formatting exception while analyzing this file. Check the CI action terminal logs.",
			issues: [],
		};
	}
}

async function main() {
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

	// Get the latest commit SHA to attach inline comments to
	const { data: pr } = await octokit.rest.pulls.get({
		owner,
		repo,
		pull_number: prNumber,
	});
	const commitId = pr.head.sha;

	let inlineComments = [];
	let shouldBlockMerge = false;
	let summaryReport = "### 🤖 AI Quality Gate Assessment Results\n\n";

	for (const file of changedFiles) {
		if (!fs.existsSync(file)) continue;

		const content = fs.readFileSync(file, "utf-8");
		const reviewResult = await reviewCode(file, content);

		summaryReport += `#### File: ${file} (${reviewResult.assessment})\n${reviewResult.summary}\n\n`;

		if (reviewResult.assessment === "BLOCK") {
			shouldBlockMerge = true;
		}

		// Map each issue returned by Claude into a true GitHub inline comment object
		if (reviewResult.issues && reviewResult.issues.length > 0) {
			reviewResult.issues.forEach((issue) => {
				inlineComments.push({
					path: file,
					line: issue.line,
					side: "RIGHT", // Specifies commenting on the modified version of the file
					body: `### ❌ ${issue.title}\n**Problem:** ${issue.problem}\n\n**Suggested Fix:**\n\`\`\`typescript\n${issue.fix}\n\`\`\`\n\n**Why:** ${issue.why}`,
				});
			});
		}
	}

	// Submit ONE formal PR Review containing all inline comments simultaneously
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

	if (shouldBlockMerge) {
		console.error("❌ Critical violations found. Blocking pipeline execution.");
		process.exit(1);
	}
}

main().catch((error) => {
	console.error("Error during execution:", error);
	process.exit(1);
});
