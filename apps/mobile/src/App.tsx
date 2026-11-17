import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import type { Store } from './store';
import { ViewerScreen } from './viewer/ViewerScreen';

// The whole app, reading and writing through the given store.
export const App = ({ store }: { store: Store }) => (
	<Provider store={store}>
		<ViewerScreen />
		<StatusBar style="auto" />
	</Provider>
);
