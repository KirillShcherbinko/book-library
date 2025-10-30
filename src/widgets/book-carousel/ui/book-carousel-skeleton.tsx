import { Carousel } from '@mantine/carousel';

import { BookCardSkeleton } from '@/entities/book';

import Style from './book-carousel.module.css';
import { Skeleton, Stack } from '@mantine/core';

export const BookCarouselSkeleton = () => {
  return (
    <Stack gap={12} align="start" w="100%">
      <Skeleton w={150} h={24} radius="md" animate/>
      <Carousel
        w="100%"
        classNames={{ controls: Style.Controls, control: Style.Control }}
        slideGap={16}
        slideSize="auto"
        controlSize={40}
        emblaOptions={{
          dragFree: true,
          containScroll: 'trimSnaps',
          watchDrag: true,
        }}
      >
        {Array.from({ length: 10 }).map((_, index) => (
          <Carousel.Slide key={index}>
            <BookCardSkeleton key={index} />
          </Carousel.Slide>
        ))}
      </Carousel>
    </Stack>
  );
};
