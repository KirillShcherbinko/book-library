import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

import { useQuery } from '@apollo/client/react';
import { useIntersection } from '@mantine/hooks';

import { bookStore } from '@/entities/book';

import { TYPE_QUERY_MAP } from '../config/type-query-map';
import type { TBookListType, TQueryMap } from '../model/types';

export const useBookList = <K extends TBookListType>(type: K) => {
  const { subject } = useParams();

  const searchQuery = bookStore.getSearchQuery();
  const limit = bookStore.getLimit('feed');
  const offset = bookStore.getOffset('feed');

  const { query, key, options, extract } = TYPE_QUERY_MAP(limit, offset, subject, searchQuery)[
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

  const triggeredRef = useRef(false);

  useEffect(() => {
    if (
      entry?.isIntersecting &&
      !loading &&
      !triggeredRef.current &&
      bookStore.hasMoreBooks()
    ) {
      triggeredRef.current = true;
      fetchMore();
    }

    if (!entry?.isIntersecting) {
      triggeredRef.current = false;
    }
  }, [entry, loading]);

  return ref;
};
