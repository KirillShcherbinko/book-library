import { type UseFormSetError } from 'react-hook-form';
import { useLocation } from 'react-router-dom';

import { CombinedGraphQLErrors, type ErrorLike } from '@apollo/client';
import { useMutation } from '@apollo/client/react';
import { notifications } from '@mantine/notifications';

import { LOGIN, REGISTER } from '@/entities/user';

import type { AuthResponse, Mutation, MutationLoginArgs, MutationRegisterArgs } from '@/shared';

const handleError = (
  error: ErrorLike,
  action: 'login' | 'register',
  setError: UseFormSetError<MutationLoginArgs | MutationRegisterArgs>,
) => {
  console.log(error.message);
  if (
    CombinedGraphQLErrors.is(error) &&
    error.errors.some((error) => error.message.toLowerCase().includes('user'))
  ) {
    setError('email', { message: error.message });
  } else if (
    CombinedGraphQLErrors.is(error) &&
    error.errors.some((error) => error.message.toLowerCase().includes('password'))
  ) {
    setError('password', { message: error.message });
  } else {
    notifications.show({
      id: `${action}-error`,
      message: error.message,
    });
  }
};

export const useAuth = (setError: UseFormSetError<MutationLoginArgs | MutationRegisterArgs>) => {
  const location = useLocation();
  const action = location.pathname.includes('login') ? 'login' : 'register';

  const [login, { loading: loginLoading, error: loginError }] = useMutation<
    Pick<Mutation, 'login'>,
    MutationLoginArgs
  >(LOGIN, { onError: (error) => handleError(error, 'login', setError) });

  const [register, { loading: registerLoading, error: registerError }] = useMutation<
    Pick<Mutation, 'register'>,
    MutationRegisterArgs
  >(REGISTER, { onError: (error) => handleError(error, 'register', setError) });

  const submit = async (
    variables: MutationLoginArgs | MutationRegisterArgs,
  ): Promise<AuthResponse | undefined> => {
    if (action === 'login') {
      const result = await login({ variables: variables as MutationLoginArgs });
      return result.data?.login;
    } else {
      const result = await register({ variables: variables as MutationRegisterArgs });
      return result.data?.register;
    }
  };

  return {
    submit,
    loading: action === 'login' ? loginLoading : registerLoading,
    error: action === 'login' ? loginError : registerError,
  };
};
