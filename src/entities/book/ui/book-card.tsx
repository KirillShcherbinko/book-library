import { Stack, Text, Title } from '@mantine/core';

import { DESKTOP_COVER_SIZE, MOBILE_COVER_SIZE } from '../model/consts';
import Style from './book.module.css';

type TBookCardProps = {
  title: string;
  authors: string[];
  coverId: number;
};

const { VITE_COVER_API_BASE_URL } = import.meta.env;

export const BookCard = ({ title, authors, coverId }: TBookCardProps) => {
  return (
    <Stack gap={8}>
      <picture className={Style.Cover}>
        <source
          media="(max-width: 768px)"
          srcSet={`${VITE_COVER_API_BASE_URL}/${coverId}-${MOBILE_COVER_SIZE}.jpg`}
        />
        <img
          src={`${VITE_COVER_API_BASE_URL}/${coverId}-${DESKTOP_COVER_SIZE}.jpg`}
          alt={`${title} cover`}
        />
      </picture>
      <Stack gap={4}>
        <Title component="h3" order={3}>
          {title}
        </Title>
        <Text c="var(--mantine-color-light-2)" lineClamp={1}>
          {authors.join(', ')}
        </Text>
      </Stack>
    </Stack>
  );
};
