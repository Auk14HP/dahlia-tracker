import { configureStore } from '@reduxjs/toolkit';
import { baseApi, type ApiSettings } from './api/baseApi';

// Returns the app's Redux store, sending API requests as the settings say.
export const createStore = (settings: ApiSettings) =>
	configureStore({
		reducer: { [baseApi.reducerPath]: baseApi.reducer },
		middleware: (getDefaultMiddleware) => {
			const defaultMiddleware = getDefaultMiddleware({ thunk: { extraArgument: settings } });
			return defaultMiddleware.concat(baseApi.middleware);
		},
	});

export type Store = ReturnType<typeof createStore>;
