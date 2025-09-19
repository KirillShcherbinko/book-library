import { gql } from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  accessToken?: Maybe<Scalars['String']['output']>;
  refreshToken?: Maybe<Scalars['String']['output']>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type Book = {
  __typename?: 'Book';
  authors: Array<Scalars['String']['output']>;
  coverId?: Maybe<Scalars['Int']['output']>;
  coverIds?: Maybe<Array<Scalars['Int']['output']>>;
  description?: Maybe<Scalars['String']['output']>;
  key: Scalars['ID']['output'];
  subjects?: Maybe<Array<Scalars['String']['output']>>;
  title: Scalars['String']['output'];
};

export type BookInput = {
  authors: Array<Scalars['String']['input']>;
  coverId?: InputMaybe<Scalars['Int']['input']>;
  key: Scalars['ID']['input'];
  title: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addBook: Scalars['Boolean']['output'];
  login: AuthResponse;
  logout: Scalars['Boolean']['output'];
  register: AuthResponse;
  removeBook: Scalars['Boolean']['output'];
};


export type MutationAddBookArgs = {
  book: BookInput;
};


export type MutationLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationRegisterArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationRemoveBookArgs = {
  bookKey: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  book: Book;
  booksBySubject?: Maybe<Array<Book>>;
  popularBooksSubjects: Array<Scalars['String']['output']>;
  refresh: AuthResponse;
  searchBooks?: Maybe<Array<Book>>;
  subjects: Array<Subject>;
  userBooks?: Maybe<Array<Book>>;
};


export type QueryBookArgs = {
  key: Scalars['String']['input'];
};


export type QueryBooksBySubjectArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
  subject: Scalars['String']['input'];
};


export type QuerySearchBooksArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
  searchQuery: Scalars['String']['input'];
};


export type QueryUserBooksArgs = {
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};

export type Subject = {
  __typename?: 'Subject';
  icon: Scalars['String']['output'];
  subjects: Array<Scalars['String']['output']>;
  title: Scalars['String']['output'];
};
