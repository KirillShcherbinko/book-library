import { observer } from 'mobx-react-lite';

import { type ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import {
  AppShell,
  type AppShellHeaderProps,
  Burger,
  Divider,
  Drawer,
  Group,
  Stack,
  useMantineTheme,
} from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';

import { HeaderButtons } from './header-buttons';
import { HeaderLogo } from './header-logo';
import Style from './header.module.css';

type THeaderProps = {
  props?: AppShellHeaderProps;
  children: ReactNode;
};

export const Header = observer(({ children, props }: THeaderProps) => {
  const location = useLocation();
  const [opened, { toggle, close }] = useDisclosure(false);

  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  useEffect(() => {
    close();
  }, [location.pathname]);

  return (
    <AppShell.Header pos="sticky" withBorder={false} className={Style.Header} {...props}>
      {isMobile ? (
        <>
          <HeaderLogo />
          <Burger opened={opened} onClick={toggle} aria-label="Toggle navigation" />
          <Drawer opened={opened} onClose={close} title="Navigation">
            <Stack gap={20}>
              {children}
              <Divider />
              <HeaderButtons />
            </Stack>
          </Drawer>
        </>
      ) : (
        <>
          <Group gap={16}>
            <HeaderLogo />
            {children}
          </Group>
          <HeaderButtons />
        </>
      )}
    </AppShell.Header>
  );
});
