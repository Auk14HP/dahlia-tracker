/*
 * The API seam for tests: the real request handler, called in-process, against a throwaway database of its own.
 * API tests send it GraphQL with query(); the phone app's screen tests give fetch to their store instead.
 */
import { createThrowawayDatabase } from '@dahlia/db/testing';
import { createRequestHandler, graphqlPath } from './index.ts';

export type TestApi = {
	// Sends one GraphQL operation and returns the response body, as { data, errors }.
	query: (operation: string, variables?: Record<string, unknown>) => Promise<unknown>;
	// A fetch that the handler answers in-process, for a client that would otherwise call the network.
	fetch: typeof fetch;
	// Deletes the test database.
	stop: () => Promise<void>;
};

// The address a client in a test gives as the API's. Any origin works: the handler reads only the path.
export const testApiUrl = 'http://dahlia.test';

// Starts the API in-process on a new throwaway database. Call stop() when the tests are done with it.
export const startTestApi = async (): Promise<TestApi> => {
	const { db, drop } = await createThrowawayDatabase();
	const handleRequest = createRequestHandler({ db });

	/*
	 * Passes the handler the request's plain parts, not the Request itself. Under Jest, Expo replaces Request and
	 * its body streams with polyfills that the handler's own stream classes refuse, so the handler builds the
	 * request from these parts with its own classes. There is no network to cancel, so the abort signal is dropped.
	 */
	const fetchFromApi: typeof fetch = async (input, init) => {
		const request = new Request(input, init);
		const hasBody = request.method !== 'GET' && request.method !== 'HEAD';
		return handleRequest(request.url, {
			method: request.method,
			headers: [...request.headers],
			body: hasBody ? await request.text() : undefined,
		});
	};

	const query = async (operation: string, variables?: Record<string, unknown>) => {
		const response = await fetchFromApi(new URL(graphqlPath, testApiUrl), {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({ query: operation, variables }),
		});
		return response.json();
	};

	return { query, fetch: fetchFromApi, stop: drop };
};
