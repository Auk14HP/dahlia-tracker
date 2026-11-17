/*
 * The RTK Query API every screen's data comes through. Its endpoints are generated from the .graphql files beside
 * the screens (generated.ts, by `npm run codegen`); this file sends them. Where requests go, and the fetch that
 * sends them, come from the store's settings, so tests can answer requests with the API in-process.
 */
import { createApi, type BaseQueryFn } from '@reduxjs/toolkit/query/react';

export type ApiSettings = {
	// The web app's address, such as https://dahlia.example.com, without a trailing slash.
	apiUrl: string;
	fetch: typeof fetch;
};

// One GraphQL operation as generated.ts's endpoints describe it.
type GraphqlRequest = {
	document: string;
	variables?: unknown;
};

export type ApiError = {
	message: string;
};

type GraphqlResponseBody = {
	data?: unknown;
	errors?: ApiError[];
};

// Where the web app serves the API (@dahlia/api's graphqlPath).
const graphqlPath = '/api/graphql';

// Returns the error's message, or a stand-in when something other than an Error was thrown.
const describeError = (error: unknown) =>
	error instanceof Error ? error.message : 'The request failed.';

// Sends one operation to the API and returns its data, or the first error when the network or the API failed.
const sendGraphqlRequest: BaseQueryFn<GraphqlRequest, unknown, ApiError> = async (
	{ document, variables },
	{ extra, signal },
) => {
	const { apiUrl, fetch } = extra as ApiSettings;
	// The generated document is a String object; JSON wants the plain string inside it.
	const query = String(document);
	const requestBody = JSON.stringify({ query, variables });
	try {
		const response = await fetch(`${apiUrl}${graphqlPath}`, {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: requestBody,
			signal,
		});
		const body = (await response.json()) as GraphqlResponseBody;
		const [firstError] = body.errors ?? [];
		return firstError ? { error: firstError } : { data: body.data };
	} catch (error) {
		return { error: { message: describeError(error) } };
	}
};

export const baseApi = createApi({
	reducerPath: 'api',
	baseQuery: sendGraphqlRequest,
	endpoints: () => ({}),
});
