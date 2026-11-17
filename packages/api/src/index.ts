import type { Database } from '@dahlia/db';
import { createSchema, createYoga } from 'graphql-yoga';
import type { Context } from './context.ts';
import { resolvers } from './resolvers.ts';
import { typeDefs } from './typeDefs.ts';

/*
 * Answers one HTTP request, as a fetch-style server does: the web app mounts it as a route, and tests call it
 * directly. It takes a Request, or a URL and the request's parts as fetch does.
 */
export type RequestHandler = (input: Request | string, init?: RequestInit) => Promise<Response>;

// The path both apps send GraphQL requests to.
export const graphqlPath = '/api/graphql';

// Returns the API's request handler, reading and writing the given database.
export const createRequestHandler = ({ db }: { db: Database }): RequestHandler => {
	const yoga = createYoga<object, Context>({
		schema: createSchema<Context>({ typeDefs, resolvers }),
		graphqlEndpoint: graphqlPath,
		context: () => ({ db }),
		// Only warnings and errors: Vercel already logs every request, and tests would print one line per request.
		logging: 'warn',
	});
	return async (input, init) =>
		typeof input === 'string' ? yoga.fetch(input, init ?? {}) : yoga.fetch(input);
};
