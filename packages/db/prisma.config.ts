import { existsSync } from 'node:fs';
import { defineConfig } from 'prisma/config';

// Prisma doesn't read .env files itself, so the repo root's .env (see .env.example) is loaded here when present.
const rootEnvFile = new URL('../../.env', import.meta.url);
if (existsSync(rootEnvFile)) {
	process.loadEnvFile(rootEnvFile);
}

export default defineConfig({
	schema: 'prisma/schema.prisma',
	migrations: { path: 'prisma/migrations' },
	// Generating the client needs no database, so DATABASE_URL may be missing then; migrating needs it.
	datasource: { url: process.env.DATABASE_URL ?? '' },
});
