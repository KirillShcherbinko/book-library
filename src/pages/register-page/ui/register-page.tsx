import { Stack, Text, Title } from '@mantine/core';

import { AuthForm } from '@/features/auth-form';

export const RegisterPage = () => {
  return (
    <Stack align="start" gap={32} w="100%">
      <Stack gap={8}>
        <Title component="h1" order={1}>
          Create your account
        </Title>
        <Text c="var(--mantine-color-light-7)" fz={18}>
          Create a new account so you can read lots of interesting books!
        </Text>
      </Stack>
      <AuthForm />
    </Stack>
  );
};
