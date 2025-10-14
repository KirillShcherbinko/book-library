import { observer } from 'mobx-react-lite';

import { useEffect } from 'react';

import { Carousel } from '@mantine/carousel';
import { Group, Loader, Stack, Text } from '@mantine/core';

import { BookCard, type TBookListVariant, bookStore } from '@/entities/book';
import { ErrorMessage } from '@/entities/error';

import { ShowMoreButton } from '@/features/show-more-button';

import type { Book } from '@/shared';

import { useBookList, useFetchMoreBooks } from '../api/hooks';
import type { TBookListType } from '../model/types';
import { BookListSkeleton } from './book-list-skeleton';
import Style from './book-list.module.css';

type TBookListProps = {
  type: TBookListType;
  subject?: string;
  variant?: TBookListVariant;
};

export const BookList = observer(({ type, variant = 'feed', subject }: TBookListProps) => {
  const { data: books, loading, error, fetchMore, refetch } = useBookList(type, variant, subject);
  const ref = useFetchMoreBooks(loading, fetchMore);

  const searchQuery = bookStore.getSearchQuery();

  useEffect(() => {
    return () => bookStore.setOffset(0);
  }, []);

  if (type === 'search' && !searchQuery)
    return <Text c="var(--mantine-color-light-7)">Search query is empty</Text>;
  if (loading && !books.length) return <BookListSkeleton variant={variant} />;
  if (error) return <ErrorMessage error={error} refetch={refetch} />;
  if (!books) return <Text c="var(--mantine-color-light-7)">No results</Text>;

  const renderCard = (book: Book) => {
    const card = (
      <BookCard
        key={book.key}
        bookKey={book.key}
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
      <Carousel.Slide key={`more-book-${subject}`} className={Style.ShowMoreButton}>
        <ShowMoreButton route={`/books/${subject}`} size={64} p={16} />
        <Text>{`Show more ${subject}`}</Text>
      </Carousel.Slide>
    </Carousel>
  ) : (
    <>
      <Group align="start" justify="center" maw={968} w="100%">
        {books.map(renderCard)}
      </Group>
      {loading && books.length > 0 && (
        <Stack w="100%" align="center" mt="md">
          <Loader />
        </Stack>
      )}
      <Stack ref={ref} w="100%" h={0} />
    </>
  );
});
