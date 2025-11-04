import { Carousel } from '@mantine/carousel';
import { Group } from '@mantine/core';

import { SubjectCardSkeleton } from '@/entities/subject';

import Style from './subject-list.module.css';

export const SubjectListSkeleton = () => {
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
      <Group align="start">
        {Array.from({ length: 8 }).map((_, index) => (
          <Carousel.Slide key={index}>
            <SubjectCardSkeleton />
          </Carousel.Slide>
        ))}
      </Group>
    </Carousel>
  );
};
