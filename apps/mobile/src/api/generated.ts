/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import type { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
import { baseApi } from './baseApi';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Query = {
  __typename?: 'Query';
  /** Who is making the request. */
  viewer: Viewer;
};

/** Whoever is making a request: the Grower once signed in, or anyone else. */
export type Viewer = {
  __typename?: 'Viewer';
  /** Whether the request comes from someone signed in. */
  isSignedIn: Scalars['Boolean']['output'];
};

export type ViewerQueryVariables = Exact<{ [key: string]: never; }>;


export type ViewerQuery = { viewer: { isSignedIn: boolean } };

export class TypedDocumentString<TResult, TVariables>
  extends String
  implements DocumentTypeDecoration<TResult, TVariables>
{
  __apiType?: NonNullable<DocumentTypeDecoration<TResult, TVariables>['__apiType']>;
  private value: string;
  public __meta__?: Record<string, any> | undefined;

  constructor(value: string, __meta__?: Record<string, any> | undefined) {
    super(value);
    this.value = value;
    this.__meta__ = __meta__;
  }

  override toString(): string & DocumentTypeDecoration<TResult, TVariables> {
    return this.value;
  }
}

export const ViewerDocument = new TypedDocumentString(`
    query Viewer {
  viewer {
    isSignedIn
  }
}
    `);

const injectedRtkApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    Viewer: build.query<ViewerQuery, ViewerQueryVariables | void>({
      query: (variables) => ({ document: ViewerDocument as unknown as string, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useViewerQuery, useLazyViewerQuery } = injectedRtkApi;

