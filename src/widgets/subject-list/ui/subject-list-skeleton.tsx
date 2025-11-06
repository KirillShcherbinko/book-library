import { Group, Skeleton, Stack } from '@mantine/core';

import { SubjectCardSkeleton } from '@/entities/subject';

import Style from './subject-list.module.css';

export const SubjectListSkeleton = () => {
  return (
    <Stack gap={12} align="start" className={Style.SubjectList}>
      <Skeleton w={150} h={24} radius="md" animate />
      <Group className={Style.SubjectListSkeleton} align="start" wrap="nowrap">
        {Array.from({ length: 8 }).map((_, index) => (
          <SubjectCardSkeleton key={index} />
        ))}
      </Group>
    </Stack>
  );
};
