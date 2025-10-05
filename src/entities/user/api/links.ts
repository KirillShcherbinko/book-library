import { print } from 'graphql';

import { ApolloLink, CombinedGraphQLErrors, Observable } from '@apollo/client';
import { ErrorLink } from '@apollo/client/link/error';

import { authStore } from '../model/store';
import { REFRESH } from './queries';

const fetchAccessToken = async () => {
  const result = await fetch('/', {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: print(REFRESH) }),
  });

  if (!result.ok) {
    throw new Error('Fetcing access token failed');
  }

  return (await result.json()) as { refresh: { accessToken: string } };
};

export const errorLink = new ErrorLink(({ error, operation, forward }) => {
  if (
    CombinedGraphQLErrors.is(error) &&
    error.errors.some((error) => error.extensions?.code === 'UNAUTHORIZED')
  ) {
    return new Observable((observer) => {
      (async () => {
        try {
          const data = await fetchAccessToken();
          const newAccessToken = data.refresh.accessToken;

          if (!newAccessToken) throw new Error('Refresh failed');

          authStore.set(newAccessToken);

          operation.setContext(({ headers = {} }) => ({
            headers: {
              ...headers,
              Authorization: `Bearer ${newAccessToken}`,
            },
          }));

          forward(operation).subscribe({
            next: (result) => observer.next(result),
            error: (err) => observer.error(err),
            complete: () => observer.complete(),
          });
        } catch (error) {
          observer.error(error);
        }
      })();

      return () => {};
    });
  }
});

export const authLink = new ApolloLink((operation, forward) => {
  const accessToken = authStore.get();

  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      Authorization: `Bearer ${accessToken}`,
    },
  }));

  return forward(operation);
});
