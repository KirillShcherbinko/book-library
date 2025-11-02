import { observer } from 'mobx-react-lite';

import { useEffect } from 'react';

import { Group, Loader, Stack, Text } from '@mantine/core';

import { BookCard, bookStore } from '@/entities/book';
import { ErrorMessage } from '@/entities/error';

import { useBookList, useFetchMoreBooks } from '../api/hooks';
import type { TBookListType } from '../model/types';
import { BookListSkeleton } from './book-list-skeleton';

type TBookListProps = {
  type: TBookListType;
};

export const BookList = observer(({ type }: TBookListProps) => {
  const { data: books, loading, error, fetchMore, refetch } = useBookList(type);
  const ref = useFetchMoreBooks(loading, fetchMore);

  const searchQuery = bookStore.getSearchQuery();

  useEffect(() => {
    return () => {
      bookStore.setOffset(0);
      bookStore.setBooksNumber(bookStore.getLimit('feed'));
    };
  }, []);

  if (type === 'search' && !searchQuery)
    return <Text c="var(--mantine-color-light-7)">Search query is empty</Text>;
  if (loading && !books.length) return <BookListSkeleton />;
  if (error) return <ErrorMessage error={error} refetch={refetch} />;
  if (!books) return <Text c="var(--mantine-color-light-7)">No results</Text>;

  return (
    <>
      <Group justify="center" align="start" maw={1084}>
        {books.map((book) => (
          <BookCard
            key={book.key}
            bookKey={book.key}
            title={book.title}
            authors={book.authors}
            coverId={book.coverId || 0}
          />
        ))}
      </Group>
      {loading && books.length > 0 && bookStore.hasMoreBooks() && (
        <Stack w="100%" align="center" mt="md">
          <Loader />
        </Stack>
      )}
      <Stack ref={ref} w="100%" h={0} />
    </>
  );
});
