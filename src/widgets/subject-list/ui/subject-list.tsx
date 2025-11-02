import { useQuery } from '@apollo/client/react';
import { Carousel } from '@mantine/carousel';
import { Text } from '@mantine/core';

import { ErrorMessage } from '@/entities/error';
import { GET_BASIC_SUBJECTS, SubjectCard } from '@/entities/subject';

import { ShowMoreButton } from '@/features/show-more-button';

import type { Subject } from '@/shared';

import Style from './subject-list.module.css';
import { SubjectListSkeleton } from './subject-list-skeleton';

export const SubjectList = () => {
  const { data, loading, error, refetch } = useQuery<{ subjects: Subject[] }>(GET_BASIC_SUBJECTS);

  if (loading) return <SubjectListSkeleton />;
  if (error) return <ErrorMessage error={error} refetch={refetch} />;
  if (!data) return <Text c="var(--mantine-color-light-7)">No results</Text>;

  return (
    <Carousel
      classNames={{ controls: Style.Controls, control: Style.Control }}
      slideGap={16}
      slideSize="auto"
      controlSize={40}
      emblaOptions={{
        dragFree: true,
        containScroll: 'trimSnaps',
        watchDrag: true,
      }}
    >
      {data.subjects.map(({ title, icon }) => (
        <Carousel.Slide key={title}>
          <SubjectCard title={title} icon={icon} />
        </Carousel.Slide>
      ))}
      <Carousel.Slide key="subject more" className={Style.ShowMoreButton}>
        <ShowMoreButton route="/subjects" size={48} p={12} />
        <Text>{`Show more subjects`}</Text>
      </Carousel.Slide>
    </Carousel>
  );
};
