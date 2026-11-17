import { registerRootComponent } from 'expo';
import { createElement } from 'react';
import { findApiUrl } from './src/apiUrl';
import { App } from './src/App';
import { createStore } from './src/store';

const store = createStore({ apiUrl: findApiUrl(), fetch: (input, init) => fetch(input, init) });

// Registers the app with React Native, in Expo Go or a native build alike.
registerRootComponent(() => createElement(App, { store }));
