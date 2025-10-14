import type React from 'react';
import { useNavigate } from 'react-router-dom';

import { Title } from '@mantine/core';
import * as TablerIcons from '@tabler/icons-react';

import Style from './subject-card.module.css';

type TSubjectCardProps = {
  title: string;
  icon: string;
};

export const SubjectCard = ({ title, icon }: TSubjectCardProps) => {
  const navigate = useNavigate();

  const SubjectIcon = TablerIcons[icon as keyof typeof TablerIcons] as React.ElementType;

  const handleClick = () =>
    navigate(`/books/${title.toLocaleLowerCase().replace(' ', '_')}`);

  return (
    <div className={Style.Card} onClick={handleClick}>
      <Title component="h5" order={5}>
        {title}
      </Title>
      {SubjectIcon && <SubjectIcon size={32} bg="--mantine-color-gray-4" radius={1000} stroke={1.5}/>}
    </div>
  );
};
