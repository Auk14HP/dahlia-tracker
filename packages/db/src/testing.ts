/*
 * Throwaway databases for tests. Each test file gets a fresh, fully migrated database of its own on the Postgres
 * server DATABASE_URL points at, so tests never see each other's data or the developer's.
 */
import { execFile } from 'node:child_process';
import { randomUUID } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';
import pg from 'pg';
import { connectToDatabase, readDatabaseUrl, type Database } from './index.ts';

const runCommand = promisify(execFile);

// This package's folder, where `prisma migrate deploy` finds prisma.config.ts and the migrations.
const dbPackageFolder = fileURLToPath(new URL('..', import.meta.url));

export type ThrowawayDatabase = {
	db: Database;
	// Disconnects and deletes the database.
	drop: () => Promise<void>;
};

// Runs one statement against the server's own database, for creating and dropping test databases.
const runOnServer = async (serverUrl: string, statement: string) => {
	const client = new pg.Client({ connectionString: serverUrl });
	await client.connect();
	try {
		await client.query(statement);
	} finally {
		await client.end();
	}
};

/*
 * Creates a new database beside the one DATABASE_URL names, applies every migration to it, and returns a client
 * for it. Call drop() when the tests are done with it.
 */
export const createThrowawayDatabase = async (): Promise<ThrowawayDatabase> => {
	const serverUrl = readDatabaseUrl();
	const databaseName = `dahlia_test_${randomUUID().replaceAll('-', '')}`;
	await runOnServer(serverUrl, `CREATE DATABASE "${databaseName}"`);

	const databaseUrl = new URL(serverUrl);
	databaseUrl.pathname = `/${databaseName}`;
	await runCommand('npx', ['--no-install', 'prisma', 'migrate', 'deploy'], {
		cwd: dbPackageFolder,
		env: { ...process.env, DATABASE_URL: databaseUrl.toString() },
	});

	const db = connectToDatabase(databaseUrl.toString());
	const drop = async () => {
		await db.$disconnect();
		await runOnServer(serverUrl, `DROP DATABASE "${databaseName}" WITH (FORCE)`);
	};
	return { db, drop };
};
