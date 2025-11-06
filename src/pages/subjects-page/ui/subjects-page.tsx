import { useNavigate } from 'react-router-dom';

import { useQuery } from '@apollo/client/react';
import { Anchor, Badge, Group, Stack, Text } from '@mantine/core';

import { ErrorMessage } from '@/entities/error';
import { GET_ALL_SUBJECTS } from '@/entities/subject';

import { LoaderLayout, type Subject } from '@/shared';

import Style from './subjects-page.module.css';

export const SubjectsPage = () => {
  const navigate = useNavigate();
  const { data, loading, error, refetch } = useQuery<{ subjects: Subject[] }>(GET_ALL_SUBJECTS);

  if (loading) return <LoaderLayout />;
  if (error) return <ErrorMessage error={error} refetch={refetch} />;
  if (!data) return <Text c="var(--mantine-color-light-7)">No results</Text>;

  return (
    <Stack gap={24} maw={1024} w="100%" p={24}>
      {data?.subjects.map((subject) => (
        <Stack gap={12} key={subject.title}>
          <Anchor
            c="var(--mantine-color-light-9)"
            underline="hover"
            size="xl"
            fz="h3"
            fw={700}
            href={`books/${subject.title}`}
          >
            {subject.title}
          </Anchor>
          <Group gap={8}>
            {subject.subjects.map((subSubject) => (
              <Badge
                key={subSubject}
                variant="default"
                className={Style.Badge}
                onClick={() => navigate(`books/${subSubject}`)}
                fw={600}
              >
                {subSubject}
              </Badge>
            ))}
          </Group>
        </Stack>
      ))}
    </Stack>
  );
};
