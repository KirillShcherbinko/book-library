import { Skeleton } from '@mantine/core';

import Style from './subject-card.module.css';

export const SubjectCardSkeleton = () => {
  return <Skeleton className={Style.CardSkeleton} animate />;
};
