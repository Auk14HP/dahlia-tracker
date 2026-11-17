import { startTestApi, testApiUrl, type TestApi } from '@dahlia/api/testing';
import { render, screen } from '@testing-library/react-native';
import { baseApi } from './api/baseApi';
import { App } from './App';
import { createStore, type Store } from './store';

let api: TestApi;
let store: Store | undefined;

beforeAll(async () => {
	api = await startTestApi();
});

/*
 * RTK Query keeps a screen's data for a minute after the screen goes, on a timer that would outlive the test.
 * Resetting the API's state clears those timers.
 */
afterEach(() => {
	store?.dispatch(baseApi.util.resetApiState());
	store = undefined;
});

afterAll(async () => {
	await api.stop();
});

// Renders the whole app with the real store, its requests answered by the in-process API.
const showApp = async () => {
	store = createStore({ apiUrl: testApiUrl, fetch: api.fetch });
	await render(<App store={store} />);
};

describe('the first screen', () => {
	test('shows that nobody is signed in yet', async () => {
		await showApp();

		expect(await screen.findByText('Not signed in')).toBeOnTheScreen();
	});
});
