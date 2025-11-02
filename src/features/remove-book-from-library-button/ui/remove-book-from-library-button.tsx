import { Button } from '@mantine/core';

import { useRemoveFromLibrary } from '../api/hooks';

type TRemoveBookFromLibraryButtonProps = {
  urlKey: string;
};

export const RemoveBookFromLibraryButton = ({ urlKey }: TRemoveBookFromLibraryButtonProps) => {
  const [removeBook, { loading }] = useRemoveFromLibrary(urlKey);
  const handleClick = async () => await removeBook({ variables: { bookKey: urlKey } });

  return (
    <Button variant="filled" loading={loading} onClick={handleClick}>
      Remove from library
    </Button>
  );
};
