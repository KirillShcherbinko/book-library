import { useLocation, useParams } from 'react-router-dom';

import { Stack } from '@mantine/core';

import { BookList, type TBookListType } from '@/widgets/book-list';

export const BooksPage = () => {
  const location = useLocation();
  const { query } = useParams();

  const currentType = location.pathname.includes('subject')
    ? 'subject'
    : location.pathname.includes('search')
      ? 'search'
      : 'user';

  return (
    <Stack align="center">
      <BookList
        variant="feed"
        type={currentType as TBookListType}
        subject={currentType === 'subject' ? query : undefined}
      />
    </Stack>
  );
};
