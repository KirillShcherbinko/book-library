import { Stack } from '@mantine/core';

import { BookList } from '@/widgets/book-list';

export const BooksPage = () => {
  return (
    <Stack align="center" p={24}>
      <BookList type="subject" />
    </Stack>
  );
};
