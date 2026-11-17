/*
 * Mounts the API package's request handler at /api/graphql (ADR-0003). The web app reaches the database only
 * through this handler.
 */
import { createRequestHandler, type RequestHandler } from '@dahlia/api';
import { connectToDatabase, readDatabaseUrl } from '@dahlia/db';

// The API's handler, made on the first request, not at import, because `next build` imports this file without a database.
let apiHandler: RequestHandler | undefined;

// Returns the API's handler, making it on first use.
const findApiHandler = () => {
	if (!apiHandler) {
		const db = connectToDatabase(readDatabaseUrl());
		apiHandler = createRequestHandler({ db });
	}
	return apiHandler;
};

const handleGraphqlRequest = async (request: Request) => {
	const handleRequest = findApiHandler();
	return handleRequest(request);
};

export {
	handleGraphqlRequest as GET,
	handleGraphqlRequest as POST,
	handleGraphqlRequest as OPTIONS,
};
