import { Group, Skeleton, Stack } from '@mantine/core';

import { BookCardSkeleton } from '@/entities/book';

import Style from './book-carousel.module.css';

export const BookCarouselSkeleton = () => {
  return (
    <Stack gap={12} align="start" className={Style.BookCarousel}>
      <Skeleton w={150} h={24} radius="md" animate />
      <Group className={Style.BookCarouselSkeleton} align="start" wrap="nowrap">
        {Array.from({ length: 8 }).map((_, index) => (
          <BookCardSkeleton key={index} />
        ))}
      </Group>
    </Stack>
  );
};
