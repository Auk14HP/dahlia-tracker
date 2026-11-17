import { existsSync } from 'node:fs';
import { defineConfig } from 'vitest/config';

// The tests find Postgres through DATABASE_URL, read from the repo root's .env when it exists (see .env.example).
const rootEnvFile = new URL('../../.env', import.meta.url);
if (existsSync(rootEnvFile)) {
	process.loadEnvFile(rootEnvFile);
}

export default defineConfig({
	test: {
		setupFiles: ['src/failOnConsoleOutput.ts'],
		// Each test file creates and migrates its own throwaway database first, which takes a few seconds.
		hookTimeout: 60_000,
		restoreMocks: true,
	},
});
