import { observer } from 'mobx-react-lite';

import { useNavigate } from 'react-router-dom';

import { Button } from '@mantine/core';

import { authStore } from '@/entities/user';

import type { BookInput } from '@/shared';

import { useAddBookToLibrary } from '../api/hooks';

type TAddBookToLibraryProps = {
  urlKey: string;
  title: string;
  authors: string[];
  coverId?: number;
};

export const AddBookToLibraryButton = observer(
  ({ urlKey, title, authors, coverId }: TAddBookToLibraryProps) => {
    const navigate = useNavigate();

    const book: BookInput = {
      key: urlKey,
      title,
      authors,
      coverId,
    };

    const [addButton, { loading }] = useAddBookToLibrary(urlKey);

    const isAuthenticated = authStore.isValid();
    const handleClick = async () => {
      if (isAuthenticated) {
        console.log(book);
        await addButton({ variables: { book } });
      } else {
        navigate('/auth/login');
      }
    };

    return (
      <Button variant="filled" onClick={handleClick} loading={loading} w="100%">
        Add to library
      </Button>
    );
  },
);
