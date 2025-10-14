import { useMutation } from '@apollo/client/react';
import { notifications } from '@mantine/notifications';

import { ADD_BOOK } from '@/entities/book';

import type { Mutation, MutationAddBookArgs } from '@/shared';

export const useAddBookToLibrary = (key: string) => {
  return useMutation<Pick<Mutation, 'addBook'>, MutationAddBookArgs>(ADD_BOOK, {
    onError: (error) => {
      notifications.show({
        id: `add-book-${key}-error-${error}`,
        message: error.message,
      });
    },
    onCompleted: () => {
      notifications.show({
        id: `add-book-${key}-success`,
        message: 'Book added to library',
      });
    },
  });
};
