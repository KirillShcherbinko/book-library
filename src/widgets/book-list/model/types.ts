import type { DocumentNode } from 'graphql';

import type { useQuery } from '@apollo/client/react';

import type {
  Book,
  Query,
  QueryBooksBySubjectArgs,
  QuerySearchBooksArgs,
  QueryUserBooksArgs,
} from '@/shared';

export type TBookListType = 'subject' | 'search' | 'user';

export type TQueryMap = {
  subject: {
    data: { booksBySubject: Query['booksBySubject'] };
    args: QueryBooksBySubjectArgs;
  };
  search: {
    data: { searchBooks: Query['searchBooks'] };
    args: QuerySearchBooksArgs;
  };
  user: {
    data: { userBooks: Query['userBooks'] };
    args: QueryUserBooksArgs;
  };
};

export type TQueryConfigMap = {
  [K in keyof TQueryMap]: {
    query: DocumentNode;
    key: keyof Query;
    options: useQuery.Options<TQueryMap[K]['data'], TQueryMap[K]['args']>;
    extract: (data?: TQueryMap[K]['data']) => Book[];
  };
};
