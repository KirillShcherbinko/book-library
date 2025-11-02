import { useParams } from 'react-router-dom';

import { useQuery } from '@apollo/client/react';
import { Badge, Group, Loader, Stack, Text, Title } from '@mantine/core';

import { GET_BOOK } from '@/entities/book';
import { ErrorMessage } from '@/entities/error';

import { AddBookToLibraryButton } from '@/features/add-book-to-library-button';

import { CoverCarousel } from '@/widgets/cover-carousel';

import type { Book } from '@/shared';

import Style from './book-page.module.css';

export const BookPage = () => {
  const { key: urlKey } = useParams();
  const normalizedKey = urlKey?.replace(/_/g, '/') || '';

  const { data, loading, error, refetch } = useQuery<{ book: Book }>(GET_BOOK, {
    variables: { key: normalizedKey },
  });

  if (loading)
    return (
      <div className={Style.LoaderLayout}>
        <Loader />
      </div>
    );
  if (error) return <ErrorMessage error={error} refetch={refetch} />;
  if (!data) return <Text c="var(--mantine-color-light-7)">No results</Text>;

  const { title, authors, description, coverIds, subjects } = data.book;

  return (
    <div className={Style.Container}>
      <CoverCarousel coverIds={coverIds || []} />
      <Stack gap={16}>
        <Title component="h1" order={1}>
          {title}
        </Title>
        <Text c="var(--mantine-color-light-7)">{authors.join(', ')}</Text>
        <Group gap={8}>
          {subjects?.map((subject) => (
            <Badge key={subject} variant="default" fw={600}>
              {subject}
            </Badge>
          ))}
        </Group>
        <Text>{description}</Text>
        <AddBookToLibraryButton urlKey={normalizedKey} />
      </Stack>
    </div>
  );
};
