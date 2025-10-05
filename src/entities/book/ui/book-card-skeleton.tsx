import { Skeleton, Stack } from '@mantine/core';

export const BookCardSkeleton = () => {
  return (
    <Stack gap={8} maw={192} w="100%">
      <Skeleton w={198} h={276} radius="md" animate />
      <Skeleton w={198} h={18} radius="md" animate />
      <Skeleton w={198} h={18} radius="md" animate />
      <Skeleton w={100} h={18} radius="md" animate />
    </Stack>
  );
};
