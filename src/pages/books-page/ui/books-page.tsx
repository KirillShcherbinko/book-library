import { useParams } from 'react-router-dom';

import { Stack } from '@mantine/core';

import { BookList } from '@/widgets/book-list';

export const BooksPage = () => {
  const { subject } = useParams();

  return (
    <Stack align="center">
      <BookList type="subject" subject={subject} />
    </Stack>
  );
};
