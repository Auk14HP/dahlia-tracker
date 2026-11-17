import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from './generated/prisma/client.ts';

export type Database = PrismaClient;

// Returns a client for the Postgres database at the given connection string. Nothing connects until the first query.
export const connectToDatabase = (databaseUrl: string): Database => {
	const adapter = new PrismaPg({ connectionString: databaseUrl });
	return new PrismaClient({ adapter });
};

// Returns DATABASE_URL, the one setting every package reads to find Postgres.
export const readDatabaseUrl = () => {
	const databaseUrl = process.env.DATABASE_URL;
	if (!databaseUrl) {
		throw new Error('DATABASE_URL is not set. Copy .env.example to .env (see README.md).');
	}
	return databaseUrl;
};
