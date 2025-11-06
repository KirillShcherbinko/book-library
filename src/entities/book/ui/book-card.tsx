import { Image, Stack, Text, Title } from '@mantine/core';
import { IconBookOff } from '@tabler/icons-react';

import Style from './book.module.css';
import { useNavigate } from 'react-router-dom';

type TBookCardProps = {
  bookKey: string;
  title: string;
  authors: string[];
  coverId: number;
};

const { VITE_COVER_API_BASE_URL } = import.meta.env;

export const BookCard = ({ bookKey, title, authors, coverId }: TBookCardProps) => {
  const navigate = useNavigate();

  return (
    <Stack gap={8} className={Style.Book}>
      <div className={Style.Cover} onClick={() => navigate(`book/${bookKey.replace(/\//g, '_')}`)}>
        {coverId !== 0 ? (
          <Image
            src={`${VITE_COVER_API_BASE_URL}/${coverId}-M.jpg`}
            alt={`${title} cover`}
            radius="md"
          />
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
      </div>

      <Stack gap={4}>
        <Title component="h4" order={4} lineClamp={3}>
          {title}
        </Title>
        <Text c="var(--mantine-color-light-6)" lineClamp={1}>
          {authors.join(', ')}
        </Text>
      </Stack>
    </Stack>
  );
};
