import { FormProvider, useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, PasswordInput } from '@mantine/core';
import { IconLock, IconMail } from '@tabler/icons-react';

import { type TUserSchema, userSchema } from '@/entities/user';

import { tokenManager } from '@/shared';

import { useAuth } from '../api/hooks';

export const AuthForm = () => {
  const location = useLocation();

  const form = useForm<TUserSchema>({
    resolver: zodResolver(userSchema),
    defaultValues: { email: '', password: '' },
  });

  const { handleSubmit, register, formState } = form;

  const { submit, loading } = useAuth();

  const onSubmit = async (formValues: TUserSchema) => {
    const { email, password } = formValues;
    const data = await submit({ email, password });
    tokenManager.set(data?.accessToken || null);
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input.Wrapper label="Email">
          <Input
            id="email"
            error={formState.errors.email?.message}
            leftSection={<IconMail size={20} />}
            disabled={loading}
            {...register('email')}
          />
        </Input.Wrapper>
        <PasswordInput
          id="password"
          label="Password"
          error={formState.errors.password?.message}
          leftSection={<IconLock size={20} />}
          disabled={loading}
          {...register('password')}
        />
        <Button type="submit">{location.pathname.includes('login') ? 'Login' : 'Register'}</Button>
      </form>
    </FormProvider>
  );
};
