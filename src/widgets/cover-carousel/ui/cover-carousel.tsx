import { Carousel } from '@mantine/carousel';
import { Image } from '@mantine/core';
import { IconBookOff } from '@tabler/icons-react';

import Style from './cover-carousel.module.css';

import classNames from 'classnames';

const { VITE_COVER_API_BASE_URL } = import.meta.env;

type TCoverCarouselProps = {
  coverIds?: number[];
};

export const CoverCarousel = ({ coverIds }: TCoverCarouselProps) => {
  return coverIds && coverIds.length ? (
    <Carousel
      classNames={{
        root: Style.Carousel,
        control: Style.Control,
        indicator: Style.Indicator,
      }}
      withIndicators={!!coverIds && coverIds.length > 0}
      slideSize="100%"
      slideGap={16}
      emblaOptions={{
        containScroll: 'trimSnaps',
        loop: true,
      }}
    >
      {coverIds?.map((coverId, index) => (
        <Carousel.Slide key={coverId} className={Style.Cover}>
          <Image
            src={`${VITE_COVER_API_BASE_URL}/${coverId}-M.jpg`}
            alt={`Book cover ${index + 1}`}
            radius="md"
            className={Style.Image}
          />
        </Carousel.Slide>
      ))}
    </Carousel>
  ) : (
    <div className={classNames(Style.Cover, Style.NoCover)}>
      <IconBookOff size={40} stroke={1.5} />
    </div>
  );
};
