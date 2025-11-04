import { observer } from 'mobx-react-lite';

import { useNavigate } from 'react-router-dom';

import { Button, Group } from '@mantine/core';

import { authStore } from '@/entities/user';

import { LogoutButton } from '@/features/logout-button';

export const HeaderButtons = observer(() => {
  const navigate = useNavigate();

  const isAuthenticated = authStore.isValid();
  const isLoading = authStore.isLoading();

  const onLogin = () => navigate('/auth/login');
  const onRegister = () => navigate('/auth/register');

  return isAuthenticated ? (
    <LogoutButton />
  ) : (
    <Group gap={12}>
      <Button variant="default" radius="md" onClick={onRegister} loading={isLoading}>
        Register
      </Button>
      <Button variant="filled" radius="md" onClick={onLogin} loading={isLoading}>
        Login
      </Button>
    </Group>
  );
});
