import { useParams } from 'react-router-dom';

import { useQuery } from '@apollo/client/react';
import { Carousel } from '@mantine/carousel';
import { Badge, Group, Image, Loader, Stack, Text, Title } from '@mantine/core';
import { IconBookOff } from '@tabler/icons-react';

import { GET_BOOK } from '@/entities/book';
import { ErrorMessage } from '@/entities/error';

import type { Book } from '@/shared';

import Style from './book-page.module.css';

const { VITE_COVER_API_BASE_URL } = import.meta.env;

export const BookPage = () => {
  const { key: urlKey } = useParams();
  const { data, loading, error, refetch } = useQuery<{ book: Book }>(GET_BOOK, {
    variables: { key: urlKey?.replace(/_/g, '/') },
  });

  if (loading) return <Loader />;
  if (error) return <ErrorMessage error={error} refetch={refetch} />;
  if (!data) return <Text c="var(--mantine-color-light-7)">No results</Text>;

  const { title, authors, description, coverIds, subjects } = data.book;

  return (
    <div className={Style.Container}>
      <Carousel
        classNames={{
          root: Style.Carousel,
          control: Style.Control,
          indicator: Style.Indicator,
        }}
        withIndicators={!!coverIds && coverIds.length > 0}
        slideSize="100%"
        slideGap={16}
        emblaOptions={{
          containScroll: 'trimSnaps',
          loop: true,
        }}
      >
        {coverIds && coverIds.length ? (
          coverIds?.map((coverId, index) => (
            <Carousel.Slide key={coverId} className={Style.Cover}>
              <Image
                src={`${VITE_COVER_API_BASE_URL}/${coverId}-M.jpg`}
                alt={`${title} ${index + 1}`}
                radius="md"
                className={Style.Image}
              />
            </Carousel.Slide>
          ))
        ) : (
          <Stack
            bg="var(--mantine-color-light-4)"
            align="center"
            justify="center"
            w="100%"
            bdrs="md"
          >
            <IconBookOff size={40} stroke={1.5} />
          </Stack>
        )}
      </Carousel>
      <Stack gap={16}>
        <Title component="h1" order={1}>
          {title}
        </Title>
        <Text c="var(--mantine-color-light-7)">{authors.join(', ')}</Text>
        <Group gap={8}>
          {subjects?.map((subject) => (
            <Badge variant="default" fw={600}>
              {subject}
            </Badge>
          ))}
        </Group>
        <Text>{description}</Text>
      </Stack>
    </div>
  );
};
