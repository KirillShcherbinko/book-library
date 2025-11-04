import { print } from 'graphql';

import { ApolloLink, CombinedGraphQLErrors, Observable } from '@apollo/client';
import { ErrorLink } from '@apollo/client/link/error';

import { authStore } from '../model/store';
import { REFRESH } from './queries';

////////// Извлекаем новый Access token //////////
const fetchAccessToken = async () => {
  authStore.setLoading(true);

  const { VITE_BASE_URL } = import.meta.env;
  const result = await fetch(`${VITE_BASE_URL}/`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: print(REFRESH) }),
  });

  if (!result.ok) {
    throw new Error('Fetcing access token failed');
  }

  const data = await result.json();
  const accessToken = data?.data?.refresh?.accessToken;

  if (!accessToken) {
    throw new Error('No access token returned from refresh mutation');
  }

  return accessToken;
};

////////// Дожидаемся завершения извлечения токена и продолжаем поток //////////
const waitForPromise = (
  operation: ApolloLink.Operation,
  forward: ApolloLink.ForwardFunction,
  refreshPromise: Promise<string | null>,
) => {
  return new Observable<ApolloLink.Result>((observer) => {
    // Неважно получили токен или нет, всё равно продолжим работу
    refreshPromise.finally(() => forward(operation).subscribe(observer));
    return () => {};
  });
};

////////// Ловим ошибку авторизации //////////
export const errorLink = new ErrorLink(({ error, operation, forward }) => {
  if (
    CombinedGraphQLErrors.is(error) &&
    error.errors.some((error) => error.extensions?.code === 'UNAUTHORIZED')
  ) {
    return new Observable((observer) => {
      (async () => {
        try {
          // Получаем новый токен
          const newAccessToken = await fetchAccessToken();

          if (!newAccessToken) {
            throw new Error('Refresh failed');
          }

          authStore.setAccessToken(newAccessToken);

          // Закидываем полученные данные в контекст
          operation.setContext(({ headers = {} }) => ({
            headers: {
              ...headers,
              Authorization: `Bearer ${newAccessToken}`,
            },
          }));

          // Обновили токен и перенаправили через него поток
          forward(operation).subscribe({
            next: (result) => observer.next(result),
            error: (error) => observer.error(error),
            complete: () => observer.complete(),
          });
        } catch (error) {
          observer.error(error);
        } finally {
          authStore.setLoading(false);
        }
      })();

      return () => {};
    });
  }
});

////////// Закидываем access token с заголовками в контекст //////////
export const authLink = new ApolloLink((operation, forward) => {
  const accessToken = authStore.getAccessToken();
  authStore.setLoading(false);

  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      Authorization: `Bearer ${accessToken}`,
    },
  }));

  return forward(operation);
});

////////// Устанавливаем access token при первом рендере //////////
export const refreshLink = new ApolloLink((operation, forward) => {
  // Получаем данные
  const refreshPromise = authStore.getRefreshPromise();
  const isValid = authStore.isValid();

  // Ждём заверешения промиса, если мы не в первый раз запускаем приложение
  if (refreshPromise !== null) {
    return waitForPromise(operation, forward, refreshPromise);
  }

  // Запускаем приложение в первый раз и устанавливаем промис
  if (!isValid) {
    const newRefreshPromise: Promise<string | null> = (async () => {
      try {
        const newAccessToken = await fetchAccessToken();
        authStore.setAccessToken(newAccessToken);
        return newAccessToken;
      } catch (error) {
        authStore.clear();
        return null;
      } finally {
        authStore.setLoading(false);
      }
    })();

    // Устанавливаем то, что у нас получилось
    authStore.setRefreshPromise(newRefreshPromise);
    return waitForPromise(operation, forward, newRefreshPromise);
  }

  // Всё установлено => идём дальше
  return forward(operation);
});
