import { observer } from 'mobx-react-lite';

import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

import { AppShell, type AppShellHeaderProps, Button } from '@mantine/core';

import { authStore } from '@/entities/user';

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
      {children}
      <Button variant="transparent" onClick={onLogin} loading={isLoading}>
        {isAuthenticated ? 'Logout' : 'Login'}
      </Button>
    </AppShell.Header>
  );
});
