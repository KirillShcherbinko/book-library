import { Carousel } from '@mantine/carousel';
import { Group } from '@mantine/core';

import { BookCardSkeleton } from '@/entities/book';

import type { TBookListVariant } from '../model/types';
import Style from './book-list.module.css';

type TBookListSkeletonProps = {
  variant: TBookListVariant;
};

export const BookListSkeleton = ({ variant }: TBookListSkeletonProps) => {
  return variant === 'scroll' ? (
    <Carousel
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
  ) : (
    <Group align="start">
      {Array.from({ length: 24 }).map((_, index) => (
        <BookCardSkeleton key={index} />
      ))}
    </Group>
  );
};
