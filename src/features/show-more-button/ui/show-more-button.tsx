import { useNavigate } from 'react-router-dom';

import { ActionIcon, type ActionIconProps, type PolymorphicComponentProps } from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';

type TShowMoreButtonProps = PolymorphicComponentProps<'button', ActionIconProps> & {
  route: string;
};

export const ShowMoreButton = ({ route, ...props }: TShowMoreButtonProps) => {
  const navigate = useNavigate();

  return (
    <ActionIcon {...props} variant="default" radius={1000} onClick={() => navigate(route)}>
      <IconArrowRight size={64} />
    </ActionIcon>
  );
};
