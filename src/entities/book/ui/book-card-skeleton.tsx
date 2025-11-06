import { Skeleton, Stack } from '@mantine/core';

import Style from './book.module.css';

export const BookCardSkeleton = () => {
  return (
    <Stack gap={8} className={Style.Book}>
      <Skeleton className={Style.Cover} radius="md" animate bd="none"/>
      <Skeleton w="100%" h={18} radius="md" animate />
      <Skeleton w="100%" h={18} radius="md" animate />
      <Skeleton w="60%" h={18} radius="md" animate />
    </Stack>
  );
};
