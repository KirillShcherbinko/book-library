import { Carousel } from '@mantine/carousel';
import { Group } from '@mantine/core';

import { BookCard } from '@/entities/book';

import type { Book } from '@/shared';

import { useBookList } from '../api/hooks';
import type { TBookListType, TBookListVariant } from '../model/types';
import Style from './book-list.module.css';
import { BookListSkeleton } from './skeleton';

type TBookListProps = {
  type: TBookListType;
  subject?: string;
  searchQuery?: string;
  limit: number;
  page: number;
  variant?: TBookListVariant;
};

export const BookList = ({
  type,
  variant = 'feed',
  limit,
  page,
  subject,
  searchQuery,
}: TBookListProps) => {
  const { data: books, loading, error } = useBookList(type, limit, page, subject, searchQuery);

  if (loading) return <BookListSkeleton />;
  if (error) return <>{error}</>;
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
      {books.map((book) => renderCard(book))}
    </Carousel>
  ) : (
    <Group align="start">{books.map(renderCard)}</Group>
  );
};
