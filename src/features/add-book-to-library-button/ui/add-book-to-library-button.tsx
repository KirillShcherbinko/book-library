import { observer } from 'mobx-react-lite';

import { useNavigate } from 'react-router-dom';

import { Button } from '@mantine/core';
import { notifications } from '@mantine/notifications';

import { authStore } from '@/entities/user';

import type { BookInput } from '@/shared';

import { useAddBookToLibrary, useBookDetails } from '../api/hooks';

type TAddBookToLibraryProps = {
  urlKey: string;
};

export const AddBookToLibraryButton = observer(({ urlKey }: TAddBookToLibraryProps) => {
  const navigate = useNavigate();

  const book: BookInput | null = useBookDetails(urlKey);
  const [addBook, { loading, error }] = useAddBookToLibrary(book);

  const isAuthenticated = authStore.isValid();
  const handleClick = async () => {
    if (!book) {
      notifications.show({
        id: `add-book-${urlKey}-error-${error}`,
        message: error?.message,
      });
      return;
    }

    if (isAuthenticated) {
      await addBook({ variables: { book } });
    } else {
      navigate('/auth/login');
    }
  };

  return (
    <Button variant="filled" onClick={handleClick} loading={loading} radius="md">
      Add to library
    </Button>
  );
});
