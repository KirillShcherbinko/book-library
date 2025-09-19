import { useQuery } from '@apollo/client/react';
import { Carousel } from '@mantine/carousel';
import { Loader } from '@mantine/core';

import { GET_BASIC_SUBJECTS, SubjectCard } from '@/entities/subject';

import type { Subject } from '@/shared';

import Style from './subject-list.module.css';

export const SubjectList = () => {
  const { data, loading, error } = useQuery<{ subjects: Subject[] }>(GET_BASIC_SUBJECTS);

  if (loading) return <Loader />;
  if (error) return <>{error.message}</>;
  if (!data?.subjects) return <>No data</>;

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
        <Carousel.Slide>
          <SubjectCard title={title} icon={icon} />
        </Carousel.Slide>
      ))}
    </Carousel>
  );
};
