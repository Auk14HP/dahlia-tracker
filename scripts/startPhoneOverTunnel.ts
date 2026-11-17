/*
 * Serves the phone app and the API to an iPhone that can't reach this computer over the home network, such as one
 * whose content filter sends all its traffic through a VPN. Both go out through public tunnels instead:
 * Cloudflare's for the API (`npm run dev` must already be running), and ngrok's for the app itself, which is built
 * pointing at the API's tunnel. Ctrl+C stops both. Run with `npm run mobile:tunnel`.
 */
import { spawn } from 'node:child_process';

// The port `npm run dev` serves the web app, and so the API, on.
const devWebAppPort = 3000;

// The address Cloudflare gives a quick tunnel, which it prints once the tunnel is up.
const tunnelUrlPattern = /https:\/\/[a-z0-9-]+\.trycloudflare\.com/;

const mobileAppFolder = new URL('../apps/mobile/', import.meta.url);

// Opens a Cloudflare quick tunnel to the API and returns its public address once Cloudflare reports it.
const openApiTunnel = () => {
	const cloudflared = spawn('cloudflared', [
		'tunnel',
		'--url',
		`http://localhost:${devWebAppPort}`,
	]);
	const tunnelUrl = new Promise<string>((resolve, reject) => {
		cloudflared.on('error', () => {
			reject(
				new Error(
					'cloudflared is not installed. Install it with `brew install cloudflared`.',
				),
			);
		});
		cloudflared.on('exit', (exitCode) => {
			reject(
				new Error(`cloudflared stopped (exit code ${exitCode}) before its tunnel was up.`),
			);
		});
		// cloudflared reports on stderr, including the tunnel's address.
		cloudflared.stderr.on('data', (chunk: Buffer) => {
			const match = tunnelUrlPattern.exec(chunk.toString());
			if (match) {
				resolve(match[0]);
			}
		});
	});
	return { cloudflared, tunnelUrl };
};

const { cloudflared, tunnelUrl } = openApiTunnel();
try {
	const apiUrl = await tunnelUrl;
	console.log(`API tunnel: ${apiUrl}`);

	/*
	 * Expo's ngrok tunnel needs no Expo account, unlike its default one. --clear rebuilds the app, because each run's
	 * API tunnel has a new address built into it.
	 */
	const expo = spawn('npx', ['expo', 'start', '--tunnel', 'ngrok', '--clear'], {
		cwd: mobileAppFolder,
		env: { ...process.env, EXPO_PUBLIC_API_URL: apiUrl },
		stdio: 'inherit',
	});
	expo.on('exit', (exitCode) => {
		cloudflared.kill();
		process.exit(exitCode ?? 0);
	});
} catch (error) {
	cloudflared.kill();
	console.error(error instanceof Error ? error.message : error);
	process.exit(1);
}
