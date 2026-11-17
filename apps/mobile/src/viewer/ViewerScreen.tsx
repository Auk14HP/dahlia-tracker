import { StyleSheet, Text, View } from 'react-native';
import { useViewerQuery } from '../api/generated';

// Shows whether the Grower is signed in, the first thing the app asks the API.
export const ViewerScreen = () => {
	const { data, error, isLoading } = useViewerQuery();
	return (
		<View style={styles.screen}>
			<Text style={styles.status}>
				{isLoading && 'Loading…'}
				{error && 'Can’t reach the Dahlia server'}
				{data && (data.viewer.isSignedIn ? 'Signed in' : 'Not signed in')}
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	status: {
		fontSize: 24,
	},
});
