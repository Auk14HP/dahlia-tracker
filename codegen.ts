import type { CodegenConfig } from '@graphql-codegen/cli';

/*
 * GraphQL Code Generator: `npm run codegen` writes types from the API's schema, and `npm run check` fails when the
 * committed files are out of date. A phone app operation that asks for a field the schema lacks fails here; a
 * screen that reads a field its operation lost fails type-check.
 */
const config: CodegenConfig = {
	schema: 'packages/api/src/typeDefs.ts',
	generates: {
		// The resolvers' types, so a resolver that doesn't match the schema fails type-check.
		'packages/api/src/generated/resolverTypes.ts': {
			plugins: ['typescript', 'typescript-resolvers'],
			config: {
				contextType: '../context.ts#Context',
				useTypeImports: true,
			},
		},
		// The phone app's operation types and RTK Query hooks, one per operation in its .graphql files.
		'apps/mobile/src/api/generated.ts': {
			documents: 'apps/mobile/src/**/*.graphql',
			plugins: [
				'typescript',
				'typescript-operations',
				{
					'typescript-rtk-query': {
						importBaseApiFrom: './baseApi',
						importBaseApiAlternateName: 'baseApi',
						exportHooks: true,
					},
				},
			],
			config: {
				// The operations go over the wire as plain strings, so the app needs no GraphQL library.
				documentMode: 'string',
				useTypeImports: true,
			},
		},
	},
};

export default config;
