import { observer } from 'mobx-react-lite';

import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

import { AppShell, type AppShellHeaderProps, Button, Group, Image } from '@mantine/core';

import { authStore } from '@/entities/user';

import { LogoutButton } from '@/features/logout-button';

import { LibraryLogo } from '@/shared';

import Style from './header.module.css';

type THeaderProps = {
  props?: AppShellHeaderProps;
  children: ReactNode;
};

export const Header = observer(({ children, props }: THeaderProps) => {
  const navigate = useNavigate();

  const isAuthenticated = authStore.isValid();
  const isLoading = authStore.isLoading();

  const onLogin = () => navigate('/auth/login');

  return (
    <AppShell.Header pos="sticky" withBorder={false} className={Style.Header} {...props}>
      <Group gap="md">
        <Image
          w={128 / 3}
          h={32}
          src={LibraryLogo}
          alt="Library logo"
          onClick={() => navigate('/')}
        />
        {children}
      </Group>
      {isAuthenticated ? (
        <LogoutButton />
      ) : (
        <Button variant="transparent" onClick={onLogin} loading={isLoading}>
          Login
        </Button>
      )}
    </AppShell.Header>
  );
});
