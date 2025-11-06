import { Carousel } from '@mantine/carousel';
import { Stack, Text, Title } from '@mantine/core';

import { BookCard } from '@/entities/book';

import type { Book } from '@/shared';

import Style from './book-carousel.module.css';
import { ShowMoreButton } from '@/features/show-more-button';

type TBookCarouselProps = {
  subject: string;
  books: Book[];
};

export const BookCarousel = ({ subject, books }: TBookCarouselProps) => {
  return (
    <Stack gap={12} align="start" className={Style.BookCarousel}>
      <Title component="h3" order={3}>
        {subject}
      </Title>
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
        {books?.map((book) => (
          <Carousel.Slide key={book.key}>
            <BookCard
              key={book.key}
              bookKey={book.key}
              title={book.title}
              authors={book.authors}
              coverId={book.coverId || 0}
            />
          </Carousel.Slide>
        ))}
        <Carousel.Slide key={`more-book-${subject}`} className={Style.ShowMoreButton}>
          <ShowMoreButton route={`/books/${subject}`} size={64} p={16} />
          <Text>{`Show more ${subject}`}</Text>
        </Carousel.Slide>
      </Carousel>
    </Stack>
  );
};
