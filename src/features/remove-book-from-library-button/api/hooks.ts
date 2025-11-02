import { useMutation } from '@apollo/client/react';
import { notifications } from '@mantine/notifications';

import { GET_USER_BOOKS, REMOVE_BOOK, bookStore } from '@/entities/book';

import type { Mutation, Query, QueryUserBooksArgs } from '@/shared';

export const useRemoveFromLibrary = (key: string) => {
  const limit = bookStore.getLimit('feed');
  const offset = bookStore.getOffset('feed');

  return useMutation<Pick<Mutation, 'removeBook'>>(REMOVE_BOOK, {
    update(cache) {
      try {
        const existingData = cache.readQuery<Pick<Query, 'userBooks'>, QueryUserBooksArgs>({
          query: GET_USER_BOOKS,
          variables: { limit, offset },
        });

        if (existingData?.userBooks) {
          cache.writeQuery<Pick<Query, 'userBooks'>, QueryUserBooksArgs>({
            query: GET_USER_BOOKS,
            variables: { limit, offset },
            data: { userBooks: existingData.userBooks.filter((book) => book.key !== key) },
          });
        }
      } catch (error) {}
    },
    onError: (error) => {
      notifications.show({
        id: `add-book-${key}-error-${error}`,
        message: error?.message,
      });
    },
    onCompleted: () => {
      notifications.show({
        id: `add-book-${key}-success`,
        message: 'Book removed from library',
      });
    },
  });
};
