import { useEffect } from 'react';

import { useQuery } from '@apollo/client/react';
import { useIntersection } from '@mantine/hooks';

import { type TBookListVariant, bookStore } from '@/entities/book';

import { TYPE_QUERY_MAP } from '../config/type-query-map';
import type { TBookListType, TQueryMap } from '../model/types';

export const useBookList = <K extends TBookListType>(
  type: K,
  variant: TBookListVariant,
  subject?: string,
) => {
  const searchQuery = bookStore.getSearchQuery();
  const limit = bookStore.getLimit(variant);
  const offset = bookStore.getOffset(variant);

  const { query, key, options, extract } = TYPE_QUERY_MAP(limit, offset, subject, searchQuery)[
    type
  ];
  const result = useQuery<TQueryMap[K]['data'], TQueryMap[K]['args']>(query, options);

  const loadMore = async () => {
    const currentOffset = bookStore.getOffset(variant);
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
