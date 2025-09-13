import type { ReactNode } from 'react';

import { AppShell } from '@mantine/core';

type THeaderProps = {
  children: ReactNode;
};

export const Header = ({ children }: THeaderProps) => {
  return (
    <AppShell.Header pos="sticky" withBorder={false}>
      {children}
    </AppShell.Header>
  );
};
