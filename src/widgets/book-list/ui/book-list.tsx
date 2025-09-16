import { useQuery } from '@apollo/client/react';
import { Carousel } from '@mantine/carousel';
import { Group } from '@mantine/core';

import { BookCard, GET_BOOKS_BY_SUBJECT } from '@/entities/book';

import type { Book } from '@/shared';

import type { TBookListVariant } from '../model/types';
import { BookListSkeleton } from './skeleton';

type TBookListProps = {
  variant?: TBookListVariant;
};

export const BookList = ({ variant = 'feed' }: TBookListProps) => {
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

  const renderCard = (book: Book) => {
    const card = (
      <BookCard
        key={book.key}
        title={book.title}
        authors={book.authors}
        coverId={book.coverId || 0}
      />
    );

    return variant === 'scroll' ? <Carousel.Slide key={book.key}>{card}</Carousel.Slide> : card;
  };

  return variant === 'scroll' ? (
    <Carousel
      slideGap={16}
      slideSize="auto"
      emblaOptions={{
        dragFree: true,
        containScroll: 'trimSnaps',
        watchDrag: true,
      }}
    >
      {books.map((book) => renderCard(book))}
    </Carousel>
  ) : (
    <Group align="start">{books.map(renderCard)}</Group>
  );
};
