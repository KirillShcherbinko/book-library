import { useQuery } from '@apollo/client/react';

import { TYPE_QUERY_MAP } from '../config/type-query-map';
import type { TBookListType, TQueryMap } from '../model/types';

export const useBookList = <K extends TBookListType>(
  type: K,
  limit: number,
  page: number,
  subject?: string,
  searchQuery?: string,
) => {
  const { query, options, extract } = TYPE_QUERY_MAP(limit, page, subject, searchQuery)[type];
  const result = useQuery<TQueryMap[K]['data'], TQueryMap[K]['args']>(query, options);

  return { ...result, data: extract(result.data) };
};
