import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client';

import { authLink, errorLink, refreshLink } from '@/entities/user';

const httpLink = new HttpLink({
  uri: import.meta.env.VITE_BASE_URL,
  credentials: 'include',
});

export const client = new ApolloClient({
  link: ApolloLink.from([errorLink, refreshLink, authLink, httpLink]),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          booksBySubject: {
            keyArgs: ['subject', 'limit'],
          },
        },
      },
    },
  }),
});
