import { GET_BOOKS_BY_SUBJECT, GET_USER_BOOKS, SEARCH_BOOKS } from '@/entities/book';

import type { TQueryConfigMap } from '../model/types';

export const TYPE_QUERY_MAP = (
  limit: number,
  offset: number,
  subject?: string,
  searchQuery?: string,
): TQueryConfigMap => {
  return {
    subject: {
      query: GET_BOOKS_BY_SUBJECT,
      key: 'booksBySubject',
      options: {
        variables: {
          subject: subject || 'all',
          limit,
          offset,
        },
      },
      extract: (data) => data?.booksBySubject ?? [],
    },
    search: {
      query: SEARCH_BOOKS,
      key: 'searchBooks',
      options: {
        variables: {
          searchQuery: searchQuery || '',
          limit,
          offset,
        },
      },
      extract: (data) => data?.searchBooks ?? [],
    },
    user: {
      query: GET_USER_BOOKS,
      key: 'userBooks',
      options: {
        variables: {
          limit,
          offset,
        },
      },
      extract: (data) => data?.userBooks ?? [],
    },
  };
};
