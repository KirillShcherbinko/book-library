import { useApolloClient, useMutation } from '@apollo/client/react';
import { notifications } from '@mantine/notifications';

import { ADD_BOOK, GET_BOOK, GET_USER_BOOKS, bookStore } from '@/entities/book';

import type { BookInput, Mutation, MutationAddBookArgs, Query, QueryUserBooksArgs } from '@/shared';

export const useAddBookToLibrary = (book: BookInput | null) => {
  const limit = bookStore.getLimit('feed');
  const offset = bookStore.getOffset('feed');

  return useMutation<Pick<Mutation, 'addBook'>, MutationAddBookArgs>(ADD_BOOK, {
    update(cache) {
      if (!book) return;

      try {
        const existingData = cache.readQuery<Pick<Query, 'userBooks'>, QueryUserBooksArgs>({
          query: GET_USER_BOOKS,
          variables: { limit, offset },
        });

        if (existingData?.userBooks) {
          cache.writeQuery<Pick<Query, 'userBooks'>, QueryUserBooksArgs>({
            query: GET_USER_BOOKS,
            variables: { limit, offset },
            data: { userBooks: [...existingData.userBooks, book] },
          });
        }
      } catch (error) {}
    },
    onError: (error) => {
      notifications.show({
        id: `add-book-${book?.key || 'unknown'}-error-${error}`,
        message: error.message,
      });
    },
    onCompleted: () => {
      notifications.show({
        id: `add-book-${book?.key || 'unknown'}-success`,
        message: 'Book added to library',
      });
    },
  });
};

export const useBookDetails = (key: string): BookInput | null => {
  const client = useApolloClient();

  try {
    const data = client.readQuery<Pick<Query, 'book'>>({ query: GET_BOOK, variables: { key } });
    if (data?.book) {
      const { key, title, authors, coverIds } = data.book;
      return {
        key,
        title,
        authors,
        coverId: coverIds?.[0] || 0,
      };
    }
    return null;
  } catch (error) {
    return null;
  }
};
