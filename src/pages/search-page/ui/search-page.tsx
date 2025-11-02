import { Stack } from '@mantine/core';

import { SearchBooksField } from '@/features/search-books-field';
import { BookList } from '@/widgets/book-list';

export const SearchPage = () => {
  return (
    <Stack align="center" gap={20} w="100%" p="24px 16px">
      <SearchBooksField />
      <BookList type="search"/>
    </Stack>
  );
};
