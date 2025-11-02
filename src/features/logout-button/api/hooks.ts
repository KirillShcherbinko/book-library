import { useNavigate } from 'react-router-dom';

import { useMutation } from '@apollo/client/react';
import { notifications } from '@mantine/notifications';

import { LOGOUT, authStore } from '@/entities/user';

import type { Mutation } from '@/shared';

export const useLogout = () => {
  const navigate = useNavigate();

  return useMutation<Pick<Mutation, 'logout'>>(LOGOUT, {
    onError: (error) => {
      notifications.show({
        id: `logout-error-${error}`,
        message: error?.message,
      });
    },
    onCompleted: () => {
      authStore.clear();
      navigate('/auth/login');
    },
  });
};
