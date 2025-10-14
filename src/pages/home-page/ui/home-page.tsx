import { useQuery } from '@apollo/client/react';
import { Loader, Stack, Title } from '@mantine/core';

import { GET_POPULAR_BOOKS_SUBJECTS } from '@/entities/subject';

import { BookList } from '@/widgets/book-list';
import { SubjectList } from '@/widgets/subject-list';

export const HomePage = () => {
  const {
    data: { popularBooksSubjects: subjects } = {},
    loading,
    error,
  } = useQuery<{ popularBooksSubjects: string[] }>(GET_POPULAR_BOOKS_SUBJECTS);

  if (loading) return <Loader />;
  if (error) return <>{error.message}</>;
  if (!subjects) return <>No data</>;

  return (
    <Stack gap="lg" maw={1280} w="100%">
      <SubjectList />
      {subjects.map((subject) => (
        <Stack key={subject} gap="md">
          <Title component="h3" order={3}>
            {subject}
          </Title>
          <BookList variant="scroll" type="subject" subject={subject} />
        </Stack>
      ))}
    </Stack>
  );
};
