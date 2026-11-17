import type { Database } from '@dahlia/db';

// What every resolver can reach while answering one request.
export type Context = {
	db: Database;
};
