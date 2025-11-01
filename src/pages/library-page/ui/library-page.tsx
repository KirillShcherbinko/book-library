import { Stack } from '@mantine/core';

import { BookList } from '@/widgets/book-list';

export const LibraryPage = () => {
  return (
    <Stack align="center">
      <BookList type="user" />
    </Stack>
  );
};
