import { Stack, Text, Title } from '@mantine/core';

import { AuthForm } from '@/features/auth-form';

export const LoginPage = () => {
  return (
    <Stack align="center" gap={32}>
      <Stack gap={8}>
        <Title component="h3" order={3}>
          Welcome back!
        </Title>
        <Text c="gray-4">You can log into your account first to read many interesting books!</Text>
      </Stack>
      <AuthForm />
    </Stack>
  );
};
