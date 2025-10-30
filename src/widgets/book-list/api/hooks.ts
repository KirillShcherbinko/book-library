import { useEffect } from 'react';

import { useQuery } from '@apollo/client/react';
import { useDebouncedValue, useIntersection } from '@mantine/hooks';

import { bookStore } from '@/entities/book';

import { TYPE_QUERY_MAP } from '../config/type-query-map';
import { DEBOUNCE_TIME } from '../model/consts';
import type { TBookListType, TQueryMap } from '../model/types';

export const useBookList = <K extends TBookListType>(
  type: K,
  subject?: string,
) => {
  const searchQuery = bookStore.getSearchQuery();
  const limit = bookStore.getLimit('feed');
  const offset = bookStore.getOffset('feed');

  const [debouncedQuery] = useDebouncedValue(searchQuery, DEBOUNCE_TIME);

  const { query, key, options, extract } = TYPE_QUERY_MAP(limit, offset, subject, debouncedQuery)[
    type
  ];
  const result = useQuery<TQueryMap[K]['data'], TQueryMap[K]['args']>(query, options);

  const loadMore = async () => {
    const currentOffset = bookStore.getOffset('feed');
    const nextOffset = currentOffset + limit;

    await result.fetchMore({
      variables: {
        ...options.variables,
        offset: nextOffset,
        limit,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return prev;
        }

        const prevBooks = extract(prev);
        const newBooks = extract(fetchMoreResult);

        console.log(newBooks.length);

        return {
          ...prev,
          [key]: [...(prevBooks || []), ...(newBooks || [])],
        };
      },
    });

    bookStore.setOffset(nextOffset);
  };

  return { ...result, data: extract(result.data), fetchMore: loadMore };
};

export const useFetchMoreBooks = (loading: boolean, fetchMore: () => void) => {
  const { ref, entry } = useIntersection({
    root: null,
    rootMargin: '600px',
    threshold: 0,
  });

  useEffect(() => {
    if (entry?.isIntersecting && !loading) {
      fetchMore();
    }
  }, [entry, loading]);

  return ref;
};
