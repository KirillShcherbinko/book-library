import { useQuery } from '@apollo/client/react';
import { Group } from '@mantine/core';

import { BookCard, GET_BOOKS_BY_SUBJECT } from '@/entities/book';

import type { Book } from '@/shared';

import { BookListSkeleton } from './skeleton';

export const BookList = () => {
  const {
    data: { booksBySubject: books } = {},
    loading,
    error,
  } = useQuery<{ booksBySubject: Book[] }>(GET_BOOKS_BY_SUBJECT, {
    variables: {
      subject: 'fantasy',
      limit: 10,
      page: 1,
    },
  });

  if (loading) return <BookListSkeleton />;
  if (error) return <>{error.message}</>;
  if (!books) return <>No data</>;

  return (
    <Group>
      {books.map(({ key, title, authors, coverId }) => (
        <BookCard key={key} title={title} authors={authors} coverId={coverId || 0} />
      ))}
    </Group>
  );
};
