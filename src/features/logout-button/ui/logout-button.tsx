import { observer } from 'mobx-react-lite';

import { Button } from '@mantine/core';

import { authStore } from '@/entities/user';

import { useLogout } from '../api/hooks';

export const LogoutButton = observer(() => {
  const [logout, { loading: logoutLoading }] = useLogout();
  const refreshLoading = authStore.isLoading();

  return (
    <Button
      variant="filled"
      radius="md"
      onClick={() => logout()}
      loading={logoutLoading || refreshLoading}
    >
      Logout
    </Button>
  );
});
