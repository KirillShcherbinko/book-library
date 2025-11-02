import { Group } from '@mantine/core';

import { BookCardSkeleton } from '@/entities/book';

export const BookListSkeleton = () => {
  return (
    <Group justify="center" align="start" maw={1084}>
      {Array.from({ length: 30 }).map((_, index) => (
        <BookCardSkeleton key={index} />
      ))}
    </Group>
  );
};
