import Constants from 'expo-constants';

// The port `npm run dev` serves the web app, and so the API, on.
const devWebAppPort = 3000;

/*
 * Returns the web app's address, which serves the API. EXPO_PUBLIC_API_URL sets it, such as the Vercel deployment's
 * address. Without it, in Expo Go, the app uses the computer it was loaded from, where `npm run dev` serves the API.
 */
export const findApiUrl = () => {
	const configuredUrl = process.env.EXPO_PUBLIC_API_URL;
	if (configuredUrl) {
		return configuredUrl;
	}
	// Expo Go's address for the computer serving the app, such as 192.168.1.20:8081.
	const devServerHost = Constants.expoConfig?.hostUri?.split(':')[0];
	if (!devServerHost) {
		throw new Error('Set EXPO_PUBLIC_API_URL to the web app’s address (see README.md).');
	}
	return `http://${devServerHost}:${devWebAppPort}`;
};
