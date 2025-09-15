import { Group, Skeleton } from '@mantine/core';

export const BookListSkeleton = () => {
  return (
    <Group justify="center" gap={20}>
      {Array.from({ length: 6 }).map((_, index) => (
        <Skeleton key={`skeleton-${index}`} w={90} h={60} radius={24} p="12px 24px" animate />
      ))}
    </Group>
  );
};
