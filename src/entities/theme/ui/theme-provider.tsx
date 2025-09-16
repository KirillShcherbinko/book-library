import type { ReactNode } from 'react';

import { MantineProvider } from '@mantine/core';

import { theme } from '../config/theme';

type TThemeProviderProps = {
  children: ReactNode;
};

export const ThemeProvider = ({ children }: TThemeProviderProps) => {
  return <MantineProvider theme={theme}>{children}</MantineProvider>;
};
