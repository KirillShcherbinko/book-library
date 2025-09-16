import { GET_BOOKS_BY_SUBJECT, GET_USER_BOOKS, SEARCH_BOOKS } from '@/entities/book';

import type { TQueryConfigMap } from '../model/types';

export const TYPE_QUERY_MAP = (
  limit: number,
  page: number,
  subject?: string,
  searchQuery?: string,
): TQueryConfigMap => {
  return {
    subject: {
      query: GET_BOOKS_BY_SUBJECT,
      options: {
        variables: {
          subject: subject || 'all',
          limit,
          page,
        },
      },
      extract: (data) => data?.booksBySubject ?? [],
    },
    search: {
      query: SEARCH_BOOKS,
      options: {
        variables: {
          searchQuery: searchQuery || '',
          limit,
          page,
        },
      },
      extract: (data) => data?.searchBooks ?? [],
    },
    user: {
      query: GET_USER_BOOKS,
      options: {
        variables: {
          limit,
          page,
        },
      },
      extract: (data) => data?.userBooks ?? [],
    },
  };
};
