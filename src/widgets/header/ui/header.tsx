import { observer } from 'mobx-react-lite';

import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

import { AppShell, type AppShellHeaderProps, Avatar, Button } from '@mantine/core';

import { authStore } from '@/entities/user';

import Style from './header.module.css';

type THeaderProps = {
  props?: AppShellHeaderProps;
  children: ReactNode;
};

export const Header = observer(({ children, props }: THeaderProps) => {
  const navigate = useNavigate();
  const isAuthenticated = authStore.isValid();

  const onLogin = () => navigate('/auth/login');

  return (
    <AppShell.Header pos="sticky" withBorder={false} className={Style.Header} {...props}>
      {children}
      {isAuthenticated ? (
        <Avatar size={32} />
      ) : (
        <Button variant="filled" onClick={onLogin}>
          Login
        </Button>
      )}
    </AppShell.Header>
  );
});
