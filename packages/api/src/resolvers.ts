import type { Resolvers } from './generated/resolverTypes.ts';

export const resolvers: Resolvers = {
	Query: {
		// Nobody can sign in yet, so every request comes from someone not signed in.
		viewer: () => ({ isSignedIn: false }),
	},
};
