import { Stack, Text, Title } from '@mantine/core';

import { AuthForm } from '@/features/auth-form';

export const RegisterPage = () => {
  return (
    <Stack align="center" gap={32}>
      <Stack gap={8}>
        <Title component="h3" order={3}>
          Create your account
        </Title>
        <Text c="gray-4">Create a new account so you can read lots of interesting books!</Text>
      </Stack>
      <AuthForm />
    </Stack>
  );
};
