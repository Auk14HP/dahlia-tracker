import { existsSync } from 'node:fs';
import type { NextConfig } from 'next';

/*
 * Locally, settings such as DATABASE_URL come from the repo root's .env (see .env.example), shared by every
 * package. On Vercel they come from the project's environment variables instead.
 */
const rootEnvFile = new URL('../../.env', import.meta.url);
if (existsSync(rootEnvFile)) {
	process.loadEnvFile(rootEnvFile);
}

const nextConfig: NextConfig = {
	// The workspace packages are TypeScript source, which Next compiles along with the app.
	transpilePackages: ['@dahlia/api', '@dahlia/db'],
};

export default nextConfig;
