import { Anchor, Group, Stack, Text, Title } from '@mantine/core';

import { AuthForm } from '@/features/auth-form';

export const LoginPage = () => {
  return (
    <Stack align="start" gap={32} w="100%">
      <Stack gap={8} align="start">
        <Title component="h1" order={1}>
          Welcome back!
        </Title>
        <Text c="var(--mantine-color-light-7)" fz={18}>
          You can log into your account first to read many interesting books!
        </Text>
      </Stack>
      <AuthForm />
      <Group w="100%" justify="center">
        <Text ta="center">
          Don't have an account? <Anchor href="/auth/register">Register here</Anchor>
        </Text>
      </Group>
    </Stack>
  );
};
