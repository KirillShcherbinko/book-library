import type React from 'react';

import { Title } from '@mantine/core';
import * as TablerIcons from '@tabler/icons-react';

import Style from './subject-card.module.css';

type TSubjectCardProps = {
  title: string;
  icon: string;
};

export const SubjectCard = ({ title, icon }: TSubjectCardProps) => {
  const SubjectIcon = TablerIcons[icon as keyof typeof TablerIcons] as React.ElementType;

  return (
    <div className={Style.Card}>
      <Title component="h5" order={5}>
        {title}
      </Title>
      {SubjectIcon && <SubjectIcon size={32} bg="--mantine-color-gray-4" radius={1000} />}
    </div>
  );
};
