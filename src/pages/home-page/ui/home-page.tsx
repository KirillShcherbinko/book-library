import { lazy } from 'react';

import { useQuery } from '@apollo/client/react';
import { Stack, Text } from '@mantine/core';

import { GET_POPULAR_BOOKS } from '@/entities/book';
import { ErrorMessage } from '@/entities/error';

import { BookCarouselSkeleton } from '@/widgets/book-carousel';
import { SubjectList } from '@/widgets/subject-list';

import type { PopularBook } from '@/shared';

const BookCarousel = lazy(() =>
  import('@/widgets/book-carousel').then((module) => ({ default: module.BookCarousel })),
);
export const HomePage = () => {
  const { data, loading, error, refetch } = useQuery<{ popularBooks: PopularBook[] }>(
    GET_POPULAR_BOOKS,
  );

  return (
    <Stack gap="lg" maw={1280} w="100%">
      <SubjectList />
      {loading ? (
        Array.from({ length: 10 }).map((_, index) => <BookCarouselSkeleton key={index} />)
      ) : error ? (
        <ErrorMessage error={error} refetch={refetch} />
      ) : !data?.popularBooks ? (
        <Text c="var(--mantine-color-light-7)">No results</Text>
      ) : (
        data?.popularBooks.map(({ subject, books }) => (
          <Stack key={subject} gap="md">
            <BookCarousel subject={subject} books={books || []} />
          </Stack>
        ))
      )}
    </Stack>
  );
};
