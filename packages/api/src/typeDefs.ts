/*
 * The GraphQL schema: the contract between the API and both apps. `npm run codegen` reads it from here to type
 * the resolvers (src/generated/) and the phone app's hooks (apps/mobile/src/api/generated.ts).
 */
export const typeDefs = /* GraphQL */ `
	type Query {
		"Who is making the request."
		viewer: Viewer!
	}

	"Whoever is making a request: the Grower once signed in, or anyone else."
	type Viewer {
		"Whether the request comes from someone signed in."
		isSignedIn: Boolean!
	}
`;
