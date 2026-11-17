const { existsSync } = require('node:fs');
const path = require('node:path');

// The tests find Postgres through DATABASE_URL, read from the repo root's .env when it exists (see .env.example).
const rootEnvFile = path.join(__dirname, '../../.env');
if (existsSync(rootEnvFile)) {
	process.loadEnvFile(rootEnvFile);
}

/** @type {import('jest').Config} */
module.exports = {
	preset: 'jest-expo/ios',
	/*
	 * Babel compiles packages that ship only ES modules, which Jest can't load as they are: Expo's and React
	 * Native's (jest-expo's own list) and Redux Toolkit's.
	 */
	transformIgnorePatterns: [
		'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|react-redux|@reduxjs/toolkit|redux|immer|reselect)',
	],
	setupFilesAfterEnv: ['<rootDir>/jest/failOnConsoleOutput.ts'],
	// Each test file creates and migrates its own throwaway database first, which takes a few seconds.
	testTimeout: 60_000,
	restoreMocks: true,
};
