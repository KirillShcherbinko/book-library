import type { ErrorLike } from '@apollo/client';
import type { OperationVariables } from '@apollo/client';
import type { RefetchFunction } from '@apollo/client/react/internal';
import { Button, Stack, Text } from '@mantine/core';

type TErrorMessageProps<
  TData = unknown,
  TVariables extends OperationVariables = OperationVariables,
> = {
  error: ErrorLike;
  refetch: RefetchFunction<TData, TVariables>;
};

export const ErrorMessage = <TData, TVariables extends OperationVariables>({
  error,
  refetch,
}: TErrorMessageProps<TData, TVariables>) => {
  return (
    <Stack align="center" gap={8}>
      <Text c="var(--mantine-color-light-7)">{error.message}</Text>
      <Button variant="transparent" onClick={() => refetch()}>Retry</Button>
    </Stack>
  );
};
