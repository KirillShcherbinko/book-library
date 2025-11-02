import { observer } from 'mobx-react-lite';

import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, PasswordInput, Stack } from '@mantine/core';
import { IconLock, IconMail } from '@tabler/icons-react';

import {
  MAX_PASSWORD_LENGTH,
  MIN_PASSWORD_LENGTH,
  type TUserSchema,
  userSchema,
} from '@/entities/user';
import { authStore } from '@/entities/user';

import { useAuth } from '../api/hooks';
import Style from './auth-form.module.css';

export const AuthForm = observer(() => {
  const location = useLocation();
  const navigate = useNavigate();

  const { handleSubmit, register, formState, setError } = useForm<TUserSchema>({
    resolver: zodResolver(userSchema),
    defaultValues: { email: '', password: '' },
  });

  const { submit, loading } = useAuth(setError);

  const onSubmit = async (formValues: TUserSchema) => {
    const { email, password } = formValues;
    const data = await submit({ email, password });

    authStore.setAccessToken(data?.accessToken || null);
    navigate('/library');
  };

  return (
    <form className={Style.Form} onSubmit={handleSubmit(onSubmit)}>
      <Stack gap={8}>
        <Input.Wrapper label="Email" error={formState.errors.email?.message}>
          <Input
            id="email"
            placeholder="example@mail.com"
            error={!!formState.errors.email}
            leftSection={<IconMail size={20} stroke={1.2} />}
            disabled={loading}
            radius="md"
            {...register('email')}
          />
        </Input.Wrapper>
        <PasswordInput
          id="password"
          label="Password"
          placeholder={`Length between ${MIN_PASSWORD_LENGTH} and ${MAX_PASSWORD_LENGTH}`}
          error={formState.errors.password?.message}
          leftSection={<IconLock size={20} stroke={1.2} />}
          disabled={loading}
          radius="md"
          {...register('password')}
        />
      </Stack>

      <Button type="submit" radius="md">
        {location.pathname.includes('login') ? 'Login' : 'Register'}
      </Button>
    </form>
  );
});
