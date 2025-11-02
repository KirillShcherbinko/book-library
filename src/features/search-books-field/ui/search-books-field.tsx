import { observer } from 'mobx-react-lite';

import { type ChangeEvent, useEffect, useState } from 'react';

import { TextInput } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { IconSearch } from '@tabler/icons-react';

import { bookStore } from '@/entities/book';

import { DEBOUNCE_TIME } from '../model/consts';

export const SearchBooksField = observer(() => {
  const [inputValue, setInputValue] = useState(bookStore.getSearchQuery());
  const [debouncedValue] = useDebouncedValue(inputValue, DEBOUNCE_TIME);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.currentTarget.value);
  };

  useEffect(() => {
    bookStore.setSearchQuery(debouncedValue);
    bookStore.setOffset(0);
    bookStore.setBooksNumber(bookStore.getLimit('feed'));
  }, [debouncedValue]);

  return (
    <TextInput
      radius="md"
      size="md"
      placeholder="Search books..."
      leftSection={<IconSearch size={18} stroke={1.5} />}
      value={inputValue}
      onChange={handleChange}
      maw={968}
      w="100%"
    />
  );
});
