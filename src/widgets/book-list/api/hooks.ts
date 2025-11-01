import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useQuery } from '@apollo/client/react';
import { useDebouncedValue, useIntersection } from '@mantine/hooks';

import { bookStore } from '@/entities/book';

import { TYPE_QUERY_MAP } from '../config/type-query-map';
import { DEBOUNCE_TIME } from '../model/consts';
import type { TBookListType, TQueryMap } from '../model/types';

export const useBookList = <K extends TBookListType>(type: K) => {
  const { subject } = useParams();

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
          bookStore.setBooksNumber(0);
          return prev;
        }

        const prevBooks = extract(prev);
        const newBooks = extract(fetchMoreResult);

        bookStore.setBooksNumber(prevBooks.length + newBooks.length);

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
    console.log(entry?.isIntersecting, !loading, bookStore.hasMoreBooks());
    if (entry?.isIntersecting && !loading && bookStore.hasMoreBooks()) {
      fetchMore();
    }
  }, [entry, loading]);

  return ref;
};
