import { Group } from '@mantine/core';

import { BookCardSkeleton } from '@/entities/book';

export const BookListSkeleton = () => {
  return (
    <Group align="start">
      {Array.from({ length: 24 }).map((_, index) => (
        <BookCardSkeleton key={index} />
      ))}
    </Group>
  );
};
