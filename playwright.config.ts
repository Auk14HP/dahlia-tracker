import { defineConfig } from '@playwright/test';

/*
 * Browser tests for the web app, in e2e/. The suite is empty until the sign-in and export pages arrive; the web
 * server to test against is added with the first test. Uses the installed Google Chrome (also preinstalled on
 * GitHub's Ubuntu runners), so no browser download.
 */
export default defineConfig({
	testDir: 'e2e',
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 1 : 0,
	use: {
		channel: 'chrome',
		trace: 'retain-on-failure',
	},
});
