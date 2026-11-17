import { afterAll, beforeAll, describe, expect, test } from 'vitest';
import { startTestApi, type TestApi } from './testing.ts';

let api: TestApi;

beforeAll(async () => {
	api = await startTestApi();
});

afterAll(async () => {
	await api.stop();
});

describe('the viewer', () => {
	test('is not signed in when the request carries no sign-in', async () => {
		const result = await api.query('query { viewer { isSignedIn } }');

		expect(result).toEqual({ data: { viewer: { isSignedIn: false } } });
	});
});
