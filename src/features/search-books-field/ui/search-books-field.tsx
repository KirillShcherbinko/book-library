import { bookStore } from "@/entities/book";
import { TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { observer } from "mobx-react-lite";
import type { ChangeEvent } from "react";

export const SearchBooksField = observer(() => {
  const searchQuery = bookStore.getSearchQuery();
      
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    bookStore.setSearchQuery(event.target.value)
  }

  return (
    <TextInput
      radius="lg"
      size="md"
      placeholder="Search books..."
      leftSection={<IconSearch size={18} stroke={1.5} />}
      value={searchQuery}
      onChange={handleChange}
      maw={968}
      w="100%"
    />
  );
});
